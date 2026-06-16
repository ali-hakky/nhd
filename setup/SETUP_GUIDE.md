# Nazly Habib Design — Store Setup Guide

Welcome! This guide walks you through getting your new website live, step by
step, in plain English. You don't need any technical knowledge. Just follow the
steps in order. ☕

The website **design and layout are already done** inside the theme. What's left
is adding your *store data* (products, photos, menus) — these live in your
Shopify admin, not in the theme, so they have to be added once by hand.

> **Tip:** Keep this guide open in one tab and your Shopify admin
> (`admin.shopify.com`) in another.

---

## Step 1 — Upload the theme

1. In Shopify admin, go to **Online Store → Themes**.
2. Scroll to **Theme library**, click **Add theme → Upload ZIP file**.
3. Choose the `NHD-theme.zip` file and upload it.
4. When it appears in your library, click **⋯ → Preview** to look, or
   **Publish** when you're ready for it to go live.

*(If your store is connected to GitHub, the theme will already be there — just
publish it.)*

---

## Step 2 — Create your collections

Collections are the category pages (Seating, Tables, etc.). Go to
**Products → Collections → Create collection** and make these **seven**.

For each one: set the title, then under **Collection type** choose
**Automated**, and add the condition **Product tag → is equal to →** (the tag
below).

| Collection title | Web address (handle) | Tag to match |
| --- | --- | --- |
| Seating | `seating` | `seating` |
| Tables | `tables` | `tables` |
| Consoles | `consoles` | `consoles` |
| Stools | `stools` | `stools` |
| Beds & Headboards | `beds` | `beds` |
| Accessories | `accessories` | `accessories` |
| New In | `new-in` | `new-in` |

**Important:** The *handle* (web address) must match exactly, because the menus
and buttons in the theme link to them. Shopify creates the handle automatically
from the title — for **Beds & Headboards** change it to `beds`, and for
**New In** change it to `new-in`. You can edit the handle near the bottom of the
collection page under **Search engine listing → Edit**.

Because they're **Automated**, products tag themselves into the right collection
the moment you import them in the next step. Nothing manual needed. ✨

---

## Step 3 — Set up the product detail fields (metafields)

Your products carry extra info like dimensions and lead time. Open
**[metafields.md](metafields.md)** and follow it once to create these fields.

This takes about 5 minutes and only has to be done once. *(You can skip it, and
the import still works — you'll just lose the tidy dimensions/lead-time lines on
product pages.)*

---

## Step 4 — Import your products

1. Go to **Products → Import**.
2. Click **Add file** and choose **`products_import.csv`**.
3. Click **Upload and continue**, then **Import products**.

This loads all **28 products**, including the two with options:

- **The X Stool Collection** — one product, choice of **Fabric**:
  GP & J Baker · Zoffany · Colefax & Fowler · Chinoiserie · Paisley.
- **The Butler's Stand** — one product, choice of **Colour**:
  Sky Blue · Royal Burgundy · Olive Green · Mustard · Copper · Citrine.

Everything imports as **Draft** with sample GBP prices. The "Enquire" pieces
(bespoke ones) are priced at £0 on purpose — they show an **Enquire** button
instead of Add to Cart. Review prices, then switch each product to **Active**
when you're happy.

---

## Step 5 — Add your photos

The whole site shows neat placeholder graphics until you add real images, so it
always looks tidy. To add photos:

- **Product photos:** open a product → **Media** → upload. (You can drag several
  at once.)
- **Homepage photos** (hero, story, about, categories, Instagram): go to
  **Online Store → Themes → Customize**, click any section in the left list, and
  use its **image picker**. Changes save instantly.

You never touch code — every image is added through Shopify's normal screens.

---

## Step 6 — Build your menus

The top navigation and footer links come from menus. Open
**[menus.md](menus.md)** and follow it to build the **main menu** (with the
category dropdowns) and the **three footer menus**. ~10 minutes.

---

## Step 7 — Create the Contact / Enquiry page

This page powers the "Enquire" buttons.

1. Go to **Online Store → Pages → Add page**.
2. Title it **Contact** (or "Bespoke & Enquiries").
3. On the right, under **Theme template**, choose **page.contact**.
4. Save.

Your contact form, studio details and the enquiry flow now work. You can edit
the heading, intro text, email and phone in **Customize → Contact page**.

---

## Step 8 — Make it yours

In **Online Store → Themes → Customize** you can:

- Edit any text, image, or button in any section.
- Reorder, hide, or add sections (click **Add section**).
- Change brand colours and page width under **Theme settings**.

Everything you see on the page is editable here — no developer required.

---

## Quick checklist

- [ ] Theme uploaded / published
- [ ] 7 collections created (handles match the table)
- [ ] Metafields created (Step 3)
- [ ] Products imported
- [ ] Photos added to products + homepage
- [ ] Menus built (main + 3 footer)
- [ ] Contact page created with **page.contact** template
- [ ] Prices reviewed, products set to **Active**

That's it — you're live. If anything looks off, it's almost always a collection
handle or a menu link that doesn't match the table above. 💙
