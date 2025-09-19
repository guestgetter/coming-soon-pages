HighLevel (LeadConnector) v2 Integration
=======================================

What this does
---------------
- Creates/updates a contact in HighLevel from the coming‑soon page without exposing secrets.
- Step 1 saves email; Step 2 enriches: phone (E.164), dateOfBirth (YYYY‑MM‑DD), favorites (custom field optional).

Files
-----
- templates/jewish-mothers-deli/api/highlevel.js — serverless function (Vercel) that talks to HL v2.
- templates/jewish-mothers-deli/index.html — client form and enrichment step.

Required env vars (Vercel → Project → Settings → Environment Variables)
-----------------------------------------------------------------------
- GHL_ACCESS_TOKEN: OAuth/Private Integration token with contacts.write on the sub‑account
- GHL_LOCATION_ID: HighLevel Location ID (used on create)
- GHL_FAVORITE_FIELD_ID (optional): Custom field id for favorites text

API flow (exact)
----------------
1) Create/Upsert: POST https://services.leadconnectorhq.com/contacts/
   Headers: Authorization: Bearer <token>, Version: 2021-07-28, Content-Type: application/json
   Body: { email, firstName?, phone?, locationId, source, tags[], dateOfBirth? }

2) Enrich existing contact: Look up id from step 1 response. Then PUT https://services.leadconnectorhq.com/contacts/{id}
   Body: { phone (E.164 only), dateOfBirth (YYYY‑MM‑DD), firstName? }
   Notes: Do NOT send locationId on PUT (HL returns 422 if included).

Field rules
-----------
- phone: send strict E.164 (+15551234567). Client normalizes; server double‑normalizes.
- dateOfBirth: send YYYY‑MM‑DD.
- favorites: sent via customFields only if GHL_FAVORITE_FIELD_ID is set.

Debugging
---------
- Client shows a temporary 10s debug of the API response after enrichment.
- Server echoes debugSent and returns verifiedContact via GET /contacts/{id} after update.

Common errors
-------------
- 422 property locationId should not exist → remove locationId from PUT payload.
- 404 Cannot PATCH /contacts/{id} → use PUT for updates.

Deploy & test
-------------
- Push to a branch; Vercel Preview will auto‑build. Submit step 1 then step 2.

