# Creating the Product Fields (Metafields)

These extra fields hold the dimensions, lead time and other details that show on
each product page. You create each one **once**, and then the product import
fills them in automatically.

Go to **Settings → Custom data → Products**, then click
**Add definition** for each field below.

For every definition you need three things: the **Name**, the **Namespace and
key** (this must match *exactly* — copy it carefully), and the **Type**.

| Name | Namespace and key | Type |
| --- | --- | --- |
| Dimensions | `custom.dimensions` | Single line text |
| Lead time | `custom.lead_time` | Single line text |
| Materials | `custom.materials` | Multi-line text |
| Badge | `custom.badge` | Single line text |
| Badge label | `custom.badge_label` | Single line text |
| CTA label | `custom.cta_label` | Single line text |
| Order type | `custom.order_type` | Single line text |
| Enquire only | `custom.enquire_only` | True or false (boolean) |
| Care | `custom.care` | Multi-line text |

### How to add one

1. **Settings → Custom data → Products → Add definition**.
2. **Name:** type the name from the table (e.g. "Dimensions").
3. Click **Select** next to *Namespace and key* and set it to the value in the
   table (e.g. `custom.dimensions`). Remove any auto-suggested suffix so it
   matches exactly.
4. **Type:** choose the type from the table.
5. **Save**.
6. Repeat for all nine.

### What each field does

- **Dimensions** — the size line on the product card and page (e.g.
  "W65 × H83 × D65 cm").
- **Lead time** — e.g. "2–3 days delivery" or "Pre-order 3–4 weeks".
- **Materials** — short description line shown on the card.
- **Badge** — controls the little corner tag style. Use one of: `new`, `best`,
  `pre`, `lim`, `sold`. (Leave empty for none.)
- **Badge label** — the text inside that tag, e.g. "Bestseller", "Pre-order".
- **CTA label** — the button text, e.g. "Add to cart", "Pre-order", "Enquire".
- **Order type** — `in-stock`, `pre-order`, or `enquire` (for your own
  reference).
- **Enquire only** — set **true** for bespoke pieces. When true (or when a
  product is tagged `enquire`, or priced £0), the product shows an **Enquire**
  button that goes to your Contact page instead of adding to cart.
- **Care** — optional care instructions shown on the product page.

> These names line up with the column headers in `products_import.csv`, so once
> the definitions exist, importing fills them in for you. If you create them
> *after* importing, just re-import the same CSV to backfill the values.
