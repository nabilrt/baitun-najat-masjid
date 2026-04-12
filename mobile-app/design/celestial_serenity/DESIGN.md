# Design System Document: A Vision of Serenity

## 1. Overview & Creative North Star: "The Celestial Anchor"
This design system is built to transcend the utility of a standard application, moving into the realm of a digital sanctuary. Our Creative North Star is **"The Celestial Anchor."** 

We reject the rigid, boxy constraints of traditional mobile apps. Instead, we embrace a layout that feels fluid, intentional, and grounded. By utilizing asymmetrical white space, overlapping editorial elements, and a high-contrast typographic scale, we create a sense of "Spiritual Breathing Room." The goal is to guide the user’s soul, not just their thumb. Every screen should feel like looking at a clear night sky—vast, calm, and perfectly ordered.

---

## 2. Colors: Tonal Depth & The Absence of Lines
Our palette is a study in atmospheric blues. We utilize depth and light to create hierarchy rather than structural noise.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. We define boundaries through "Tonal Partitioning." Use the shift from `surface` to `surface-container-low` to signify a change in context. Lines create tension; color shifts create flow.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like fine, semi-transparent paper stacked upon a marble slab.
- **Base:** `surface` (#f7f9fc) for global backgrounds.
- **Level 1:** `surface-container-low` (#f2f4f7) for secondary content areas.
- **Level 2:** `surface-container-highest` (#e0e3e6) for interactive elements like cards.
- **Floating:** `surface-container-lowest` (#ffffff) for high-importance modals or pop-ups.

### The "Glass & Gradient" Rule
To evoke the spiritual nature of the masjid, use **Glassmorphism** for floating headers or navigation bars. Apply `surface` at 70% opacity with a `20px` backdrop blur. 
**Signature Texture:** For primary CTAs and Hero backgrounds, use a linear gradient from `primary` (#002446) to `primary-container` (#1a3a5f) at a 135-degree angle. This adds "soul" and prevents the deep blues from feeling flat or heavy.

---

## 3. Typography: The Editorial Voice
We pair the timeless authority of a Serif with the modern clarity of a Sans-Serif to create a "Modern Heritage" feel.

- **Display & Headlines (Noto Serif):** Use these for prayer times, mosque names, and Quranic verses. The high-contrast serif evokes a sense of tradition and sacredness.
- **Title & Body (Plus Jakarta Sans):** Use these for functional labels, descriptions, and settings. The geometric nature of Jakarta Sans ensures modern readability even at small scales.

**Scale Philosophy:** Don't be afraid of the `display-lg` (3.5rem). In a spiritual context, a single word (like "Fajr") should carry weight and presence, surrounded by ample negative space.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to "lift" objects; we use light to "reveal" them.

- **The Layering Principle:** Depth is achieved by "stacking." Place a `surface-container-lowest` (#ffffff) card on a `surface-container` (#eceef1) background. The subtle contrast creates a natural lift without the "dirtiness" of a standard drop shadow.
- **Ambient Shadows:** For floating elements (e.g., a "Donate" FAB), use a custom shadow: `0px 12px 32px rgba(0, 36, 70, 0.08)`. Note the tint: we use a low-opacity `primary` color instead of black to keep the shadows feeling "airy."
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (#c3c6cf) at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Fluid Primitives

### Buttons & CTAs
- **Primary:** Gradient fill (`primary` to `primary-container`), `md` (12px) roundedness. Typography: `title-sm` (White).
- **Secondary:** Surface-tinted. No border. Use `secondary-container` with `on-secondary-container` text.
- **Tertiary:** Text-only using `primary` color. High padding (16px) to ensure a large hit-state without visual clutter.

### Prayer Time Cards
- **Structure:** No dividers. Use vertical white space (`spacing-xl`) to separate times.
- **Active State:** The "Current Prayer" should use the `secondary_fixed` (#c7e7ff) background with a soft `primary` glow to highlight its importance.

### Input Fields & Search
- **Styling:** Soft-filled containers (`surface-container-high`) rather than outlined boxes. 
- **Focus:** On focus, the container shifts to `surface-container-lowest` with a "Ghost Border" of `primary` at 20%.

### Lists & Collections
- **Rule:** Forbid the use of divider lines. Separate list items using a subtle shift in background color on hover/tap, or simply use `16px` of vertical breathing room.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use asymmetrical layouts (e.g., a headline aligned left with a subheader offset to the right).
- **Do** allow content to "bleed" off the edges in carousels to suggest infinite scale.
- **Do** use `display-sm` for numbers (like prayer times) to make them feel like art pieces.

### Don’t:
- **Don’t** use pure black (#000000). Use `primary` (#002446) for your darkest tones to maintain the "Midnight" theme.
- **Don’t** use sharp 90-degree corners. Everything must feel "honed" and "softened" like a river stone.
- **Don’t** crowd the interface. If you think you need more features, you probably need more white space.
- **Don’t** use 100% opaque borders. They act as "visual fences" that disrupt the serene flow of the application.

---

## 7. Signature Element: The "Najat" Glow
To create a premium feel unique to this system, any "Active" or "Live" element (like a live stream indicator or current prayer) should feature a subtle "pulse" animation using `secondary_fixed_dim` (#9fcced) with a 40% blur radius. This mimics the soft glow of a mosque lamp.