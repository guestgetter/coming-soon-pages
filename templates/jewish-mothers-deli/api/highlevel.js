// Vercel Serverless Function: Proxy to HighLevel (LeadConnector) API v2
// Purpose: Create or update a contact securely without exposing credentials client-side.
// Env Vars required (set in Vercel Project Settings):
// - GHL_ACCESS_TOKEN: OAuth access token or Private Integration token with contact scopes
// - GHL_LOCATION_ID: HighLevel Location ID to attribute the contact
// - GHL_FAVORITE_FIELD_ID (optional): Custom field ID for "Favorite Jewish Deli Item"

function normalizePhone(input) {
    if (!input) return undefined;
    const raw = String(input).trim();
    const digits = raw.replace(/[^\d]/g, '');
    if (!digits) return undefined;
    // US/Canada default: add +1 for 10 digits
    if (digits.length === 10) return `+1${digits}`;
    if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
    if (/^\+\d{7,15}$/.test(raw)) return raw;
    return `+${digits}`;
}

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        // CORS preflight (same-origin on Vercel typically OK, but keep permissive within site)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const accessToken = process.env.GHL_ACCESS_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;
    const favoriteFieldId = process.env.GHL_FAVORITE_FIELD_ID; // optional

    if (!accessToken || !locationId) {
        return res.status(500).json({ error: 'Server not configured. Missing env vars.' });
    }

    try {
        const {
            firstName,
            email,
            phone,
            birthday, // YYYY-MM-DD (recommended)
            favoriteItem, // optional string
            tags,
            source
        } = req.body || {};

        if (!email && !phone) {
            return res.status(400).json({ error: 'Email or phone required' });
        }

        const normalizedPhone = normalizePhone(phone);
        const payload = {
            firstName: firstName || undefined,
            email: email || undefined,
            phone: normalizedPhone || undefined,
            locationId: locationId,
            source: source || 'Jewish Mothers Deli Coming Soon Page',
            tags: Array.isArray(tags) && tags.length ? tags : ['coming-soon', 'deli-signup', 'williamsburg']
        };

        if (birthday) {
            // Use dateOfBirth only (YYYY-MM-DD)
            payload.dateOfBirth = birthday;
        }

        const customFields = [];
        if (favoriteItem && favoriteFieldId) {
            customFields.push({ id: favoriteFieldId, value: favoriteItem });
        }
        if (customFields.length) {
            payload.customFields = customFields;
        }

        // Attempt create/upsert via v2
        const urlBase = 'https://services.leadconnectorhq.com';
        const createUrl = `${urlBase}/contacts/`;

        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            // Version header required by LeadConnector v2
            'Version': '2021-07-28',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        // Prefer upsert first to ensure updates merge to same contact
        const upsertUrl = `${urlBase}/contacts/upsert`;
        let response = await fetch(upsertUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            // Fallback to create, then lookup+patch
            let alt = await fetch(createUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload)
            });
            if (!alt.ok && email) {
                const lookupUrl = `${urlBase}/contacts/lookup?email=${encodeURIComponent(email)}`;
                const lookup = await fetch(lookupUrl, { headers });
                if (lookup.ok) {
                    const data = await lookup.json();
                    const contactId = data?.contact?.id || data?.contacts?.[0]?.id;
                    if (contactId) {
                        const patchUrl = `${urlBase}/contacts/${contactId}`;
                        alt = await fetch(patchUrl, {
                            method: 'PATCH',
                            headers,
                            body: JSON.stringify(payload)
                        });
                    }
                }
            }
            response = alt || response;
        }

        const text = await response.text();
        let json;
        try { json = text ? JSON.parse(text) : {}; } catch (_) { json = { raw: text }; }

        if (!response.ok) {
            return res.status(response.status).json({ error: 'HighLevel API error', details: json, debugSent: {
                email: payload.email,
                firstName: payload.firstName,
                phone: payload.phone,
                dateOfBirth: payload.dateOfBirth,
                locationId: payload.locationId,
                tags: payload.tags
            }});
        }

        // Optional verification: fetch the contact back to confirm fields saved
        let verifiedContact = null;
        if (email) {
            try {
                const lookupUrl = `${urlBase}/contacts/lookup?email=${encodeURIComponent(email)}`;
                const lookup = await fetch(lookupUrl, { headers });
                if (lookup.ok) {
                    verifiedContact = await lookup.json();
                }
            } catch (_) {}
        }

        return res.status(200).json({ ok: true, data: json, verifiedContact, debugSent: {
            email: payload.email,
            firstName: payload.firstName,
            phone: payload.phone,
            dateOfBirth: payload.dateOfBirth,
            locationId: payload.locationId,
            tags: payload.tags
        }});
    } catch (err) {
        return res.status(500).json({ error: 'Server error', details: String(err && err.message || err) });
    }
}



