
**Task:**
Redo the `@coming-soon-pages/index.html` into a **full responsive frontend** using **Vite + React + TypeScript + Chakra UI**.
Incorporate all **SEO tags** and **High-Level integrations** from the original `@coming-soon-pages/index.html`.
The design must reflect a **warm, sophisticated, and welcoming aesthetic**, perfect for a **traditional Jewish deli with a modern, elegant presentation**.

---

## 🎨 Styling Guidelines

### Fonts

* **Primary Font:** `'Inter', sans-serif` (weights: 300, 400, 500)
* **Secondary Font:** `'Playfair Display', serif` (weights: 400, 600, italic)

### Color Palette

* **Warm Cream (#fbe7cc):** Background base
* **Dark Brown (#6f3e13):** Primary text, taglines
* **Medium Brown (#8a542e):** Highlights, accents, buttons
* **Light Brown (#5D5A54):** Description text
* **Neutral Shades:**

  * White: `rgba(255, 255, 255, 0.7)` (form backgrounds)
  * Light Gray: `#E5E1DC` (input borders)
  * Black: `rgba(0, 0, 0, 0.15)` (shadows)

### Background & Texture

* Base: Warm cream with subtle brown overlays
* Patterns: Layered gradients, grid lines, and grain texture
* Effects: **Glassmorphism** for forms (`backdrop-filter: blur(10px)`)
* Shadows: Soft, warm-toned shadows
* Animations: Staggered fade-in transitions

### Typography Scale

* **Tagline:** 1.5rem → 1.2rem (desktop → mobile)
* **Description:** 1.1rem → 1rem
* **Form Title:** 1.3rem
* **Form Subtitle:** 0.95rem
* **Inputs / Labels:** 1rem
* **Location / Details:** 0.95rem
* **Line Heights:** tagline = 1.4, description = 1.6

---

## 📐 Layout & Wireframes

### 1. **Homepage**

**Hero Section**

* **Layout:** Full-width background (warm cream + subtle gradient)
* **Content (2 columns):**

  * Left: Deli tagline in *Playfair Display* serif, warm gold-brown
  * Right: Hero image (food photography, softly shadowed)
* **Button:** Rounded, medium brown, hover → darker shade + subtle scale

**Featured Dishes Section**

* **Layout:** 3-column grid
* **Component:** Custom card replacement (not generic) → “Menu Slabs”

  * Dish photo framed in glassmorphic box
  * Name in serif, description in light sans-serif
  * Price aligned right, gold accent
* **Hover Effect:** Subtle lift + shadow warmth

**Our Story Section**

* **Layout:** Split-screen

  * Left: Sepia-toned deli interior image
  * Right: Text (warm serif headline + sans-serif description)
  * Divider: thin gold-brown line

**Reservations Form**

* **Layout:** Glassmorphic centered card
* **Inputs:** Custom styled (rounded, warm borders, shadowed focus state)
* **CTA:** Medium brown button with subtle hover glow

---

### 2. **Cuisine Pages (Deli Cuisine)**

**Hero Banner**

* Background: Themed (ripple, ember, wheat motif)
* Headline: Gold serif text overlaid with subtle shadow

**Chef’s Specialties Menu (Menu-Style List, not cards)**

* Dish Name (bold serif) | Price (right-aligned gold)
* Description italicized, under dish name
* Divider: thin motif line (waves, embers, wheat depending on cuisine)

**Chef’s Highlight Dish**

* Spotlight box with embossed frame and chef signature

**Cuisine Gallery**

* Masonry grid of dishes (2x3 asymmetric layout)
* Hover animations: ripple/ember/spiral depending on cuisine

---

### 3. **About Page**

**Section 1: Story Timeline**

* Vertical timeline component (custom Chakra styling)
* Milestones framed with serif headers, sans-serif body

**Section 2: Team Spotlight**

* Grid of chefs/staff
* Each card: Polaroid-style photo with shadow + name in Playfair serif

---

### 4. **Contact Page**

**Form Section**

* Glassmorphic form box centered
* Fields: Name, Email, Message
* Input style: Rounded, warm cream background, subtle borders

**Location Section**

* Map embed styled with grain overlay
* Address + contact info in serif typography

---

## 📱 Responsiveness

* **Mobile-first design**
* Breakpoints: `480px`, `768px`, `968px`, `1200px`
* **Mobile Adjustments:**

  * Collapse grids → vertical stack
  * Hero sections → background image behind centered text
  * Forms → full-width, single column

---

## 🔍 SEO & Integrations

* Pull **all meta, OG, Twitter card tags** from `@index.html`
* Ensure `title`, `description`, `schema markup`, and structured data remain
* Integrate analytics / high-level APIs already present in `@index.html`

---

👉 This version ensures you get:

* **Precise implementation guide** (not vague “cards”)
* **Wireframe breakdowns per section/page**
* **Responsive strategy**
* **Design fidelity to your deli brand aesthetic**

---

D