# Store Setup Guide

Do these once, in this order, after the theme is uploaded. Everything here is
**store data** configured in the Shopify admin (it cannot live inside theme
files).

## 1. Create collections

**Products → Collections → Create collection.** Use these exact handles so the
theme's default links (menus, category grid, “view all” buttons) work:

| Title | Handle | Type | Condition |
| --- | --- | --- | --- |
| Seating | `seating` | Automated | Product tag is equal to `seating` |
| Tables | `tables` | Automated | Product tag is equal to `tables` |
| Consoles | `consoles` | Automated | Product tag is equal to `consoles` |
| Stools | `stools` | Automated | Product tag is equal to `stools` |
| Beds & Headboards | `beds` | Automated | Product tag is equal to `beds` |
| Accessories | `accessories` | Automated | Product tag is equal to `accessories` |
| New In | `new-in` | Automated | Product tag is equal to `new-in` |

The handle is auto-generated from the title — for **Beds & Headboards** edit the
handle to `beds`, and **New In** to `new-in`, to match the table above.

> Using **Automated** collections + the tags already in the CSV means products
> file themselves into the right collection automatically.

## 2. Create the product metafields

Before importing, create the metafield definitions so the CSV columns map
correctly. See **[`metafields.md`](metafields.md)**. (Skip only if you don't want
the structured dimensions / lead-time data — the import still works without it.)

## 3. Import products

**Products → Import → Add file →** select
[`products_import.csv`](products_import.csv) → **Upload and continue**.

The file contains 28 products (39 rows). Two are multi-variant, as required:

- **The X Stool Collection** (`x-stool`) — one product, option **Fabric**:
  GP & J Baker · Zoffany · Colefax & Fowler · Chinoiserie · Paisley.
- **The Butler's Stand** (`butlers-stand`) — one product, option **Colour**:
  Sky Blue · Royal Burgundy · Olive Green · Mustard · Copper · Citrine.

(The Hamptons Armchair is also set up with an **Edition** variant as an example.)

Products import as **Draft** with placeholder GBP prices and stock — review
prices, then set each to **Active** when ready. “Enquire” pieces are priced 0
and tagged `enquire`; set your own prices or leave them as enquiry-only.

## 4. Add product images

Open each product and upload your own photography under **Media**. Products and
sections show a neutral placeholder graphic until an image is added, so the site
looks tidy in the meantime. Homepage section images (hero, story, about, etc.)
are set in **Online Store → Customize** via each section's image picker.

## 5. Build the menus

See **[`menus.md`](menus.md)** to create the `main-menu` (with dropdowns) and the
three footer menus.

## 6. Customize

**Online Store → Customize.** Every section is editable — text, images, blocks,
order. Set your real links on the hero buttons, “view all” links, etc. Theme
colours and page width live under **Theme settings → Brand colours / Layout**.

## 7. Create the Contact page

**Online Store → Pages → Add page**, title “Contact” (or “Bespoke & Enquiries”).
In the template dropdown choose **page.contact**. This powers the Enquire flow.
