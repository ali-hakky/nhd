# Nazly Habib Design — Shopify Theme

A custom **Online Store 2.0** Shopify theme for *Nazly Habib Design*, a Cairo &
London studio making handcrafted rattan, wicker and upholstered furniture.

The theme follows Shopify's modern (Dawn-style) architecture — JSON templates,
section groups, fully editable sections/blocks in the theme editor — and is
styled to match the brand: Cormorant Garamond + Jost typography on a soft
Wedgwood-blue & porcelain-white palette.

```
Colour palette
  #FAFAF8  page background        #7BA7BC  soft blue
  #EAF2F6  light blue             #4E7F96  deep blue (CTAs)
  #A8C8D8  mid blue               #DDE8EC  borders
```

## What's included

### Storefront pages
| Page | Template | Section |
| --- | --- | --- |
| Homepage | `templates/index.json` | 17 editable sections (below) |
| Product | `templates/product.json` | `main-product` — gallery, variants, dimensions, lead time, Add to cart / Enquire |
| Collection | `templates/collection.json` | `main-collection` — banner, sort, product grid, pagination |
| Cart page | `templates/cart.json` | `main-cart` (the slide-out **cart drawer** works site-wide) |
| Contact / Enquiry | `templates/page.contact.json` | `main-contact` — enquiry form, auto-fills product name |
| Search | `templates/search.json` | `main-search` |
| All collections | `templates/list-collections.json` | `main-list-collections` |
| Blog / Article | `templates/blog.json`, `article.json` | |
| 404 / Password / Gift card | `404.json`, `password.liquid`, `gift_card.liquid` | |
| Customer accounts | `templates/customers/*.liquid` | login, register, account, orders, addresses, reset/activate |

### Homepage sections (all editable in **Online Store → Customize**)
Announcement bar · Sticky header with mega-menu dropdowns · Split hero ·
Animated ticker · Category grid · New Arrivals · Story panel · Seating ·
**X Stool Collection (with fabric tabs)** · Painted Side Tables · Product
Spotlight · Consoles · Butler's Stands & Trays · More Tables · About Nazly ·
Testimonials · Instagram strip · Policies strip · Newsletter.

Every product grid uses the reusable **Product grid** section, which can either
show a live **collection** or hold **manual product cards** (used out of the box
so the homepage matches the design before the catalogue is built). Add / remove
/ reorder cards, tabs and sections freely in the editor.

### Theme assets
The 43 design images are bundled in `assets/` (e.g. `hero-1.jpg`,
`new-amalfi.png`) and used as the default imagery. Replace them in the editor
with `image_picker` settings on every section, or swap the asset files.

## Installing the theme

**Option A — Shopify CLI (recommended)**
```bash
shopify theme push --unpublished      # upload as a draft
shopify theme dev                     # local preview with hot reload
```

**Option B — ZIP upload**
```bash
# from the repo root, zip the theme files (not the repo itself)
zip -r nazly-habib-design.zip assets config layout locales sections snippets templates
```
Then in Shopify admin: **Online Store → Themes → Add theme → Upload ZIP**.

> The `setup/` folder and this README are **not** part of the theme — leave them
> out of the ZIP (the command above already excludes them).

## Store setup (data that lives in Shopify, not the theme)

Collections, products, variants and menus are store records, so they can't ship
inside theme files. Follow **[`setup/SETUP_GUIDE.md`](setup/SETUP_GUIDE.md)** to:

1. Create the 6 collections + “New In”.
2. Import the catalogue from **[`setup/products_import.csv`](setup/products_import.csv)** —
   this includes the **X Stool** as one product with **fabric variants**
   (GP & J Baker, Zoffany, Colefax & Fowler, Chinoiserie, Paisley) and the
   **Butler's Stand** as one product with **colour variants** (Sky Blue, Royal
   Burgundy, Olive Green, Mustard, Copper, Citrine), exactly as specified.
3. Create the product metafields (dimensions, lead time, etc.) — see
   **[`setup/metafields.md`](setup/metafields.md)**.
4. Build the navigation + footer menus — see
   **[`setup/menus.md`](setup/menus.md)**.

## How the “Enquire” flow works
Made-to-order pieces (price on enquiry) are flagged with the `enquire` tag or a
`custom.enquire_only` metafield of `true`. Their product page shows
**“Enquire about this piece”** instead of Add to cart, linking to the Contact
page with the product (and chosen variant) pre-filled in the message.

## Tech notes
- No build step, no dependencies — vanilla Liquid + CSS + JS.
- Cart drawer uses the Cart AJAX API + Section Rendering API (`global.js`).
- Variant selection (`product-form.js`) updates price, availability and the
  add-to-cart button, and keeps a shareable `?variant=` URL.
- Brand colours and max page width are editable under **Theme settings**.
