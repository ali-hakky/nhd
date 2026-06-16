# Building Your Menus

Menus control the navigation links. Go to **Online Store → Navigation** in your
Shopify admin. You'll build **four** menus.

> Do **Step 2** (collections) first, so the links have somewhere to point.

---

## 1. Main menu (top navigation with dropdowns)

Shopify already has a menu called **Main menu** (handle `main-menu`). Click it
and set it up like this. Each top item links to a collection; the indented items
under it are the dropdown.

- **Seating** → `/collections/seating`
  - Hamptons Armchair → `/products/bahamas-hampton`
  - Riviera Rattan → `/products/riviera-rattan`
  - Amalfi Grande Sofa → `/products/amalfi-grande`
  - Miniature Chair → `/products/miniature-chair`
  - View All Seating → `/collections/seating`
- **Tables** → `/collections/tables`
  - Coffee Tables → `/collections/tables`
  - Moroccan Side Table → `/products/moroccan-side-table`
  - Painted Side Tables → `/collections/tables`
  - The Sloan → `/products/the-sloan`
  - View All Tables → `/collections/tables`
- **Consoles** → `/collections/consoles`
  - Hortensia Console → `/products/mini-hortensia-console`
  - Boltons Console → `/products/boltons-console`
  - Burl Wood Console → `/products/burl-wood-console`
  - Marrakech Console → `/products/marrakech-console`
  - Upholstered Console → `/products/upholstered-console`
  - View All Consoles → `/collections/consoles`
- **Stools** → `/collections/stools`
  - X Stools — All Fabrics → `/products/x-stool`
  - Butler's Stands → `/products/butlers-stand`
  - Bobbin Bar Stools → `/products/bobbin-bar-stools`
  - View All Stools → `/collections/stools`
- **Beds** → `/collections/beds`
  - Regency Headboard → `/products/regency-headboard`
  - Bed Frames (Pre-order) → `/products/bed-frames`
- **Accessories** → `/collections/accessories`
  - Swoon Trays → `/products/swoon-lacquered-tray`
  - Bahamas Lantern → `/products/bahamas-lantern`
  - Arabesque Mirror → `/products/arabesque-mirror`
  - View All → `/collections/accessories`
- **New In** → `/collections/new-in`

### How to add a dropdown item

1. Click **Add menu item**.
2. Type the **Name** (e.g. "Riviera Rattan").
3. In **Link**, start typing and pick the product/collection, or paste the path.
4. Save.
5. To make it a dropdown child, **drag it slightly to the right** underneath its
   parent so it's indented. That's what turns it into a dropdown.

---

## 2. Footer menu — "Shop"

Create a **new menu**. Title: **Footer Shop**, handle **`footer-shop`**.

- Seating → `/collections/seating`
- Tables → `/collections/tables`
- Consoles → `/collections/consoles`
- Stools → `/collections/stools`
- Beds & Headboards → `/collections/beds`
- Accessories → `/collections/accessories`
- New In → `/collections/new-in`

## 3. Footer menu — "Studio"

New menu. Title: **Footer Studio**, handle **`footer-studio`**.

- About Nazly → `/pages/about`
- Bespoke Orders → `/pages/contact`
- Our Process → `/pages/about`
- Contact → `/pages/contact`

## 4. Footer menu — "Help"

New menu. Title: **Footer Help**, handle **`footer-help`**.

- Delivery Info → `/pages/delivery` *(create these pages or link where you like)*
- Returns Policy → `/pages/returns`
- Care Guide → `/pages/care`
- FAQs → `/pages/faqs`
- Privacy Policy → `/policies/privacy-policy`

> The handle is the important bit — the theme footer looks for `footer-shop`,
> `footer-studio` and `footer-help`. If you change a handle, also update it in
> **Customize → Footer** by re-picking the menu for that column.

---

### Note on handles

When you create a new menu, Shopify makes the handle from the title. Double-check
it matches (`footer-shop`, `footer-studio`, `footer-help`). You can see/edit the
handle in the menu's web address while editing it. If a footer column is empty on
the live site, it's almost always a handle mismatch — just open
**Customize → Footer** and re-select the correct menu for that column.
