# Product Metafields

The product page and product cards display structured details (dimensions, lead
time, etc.) from product **metafields** in the `custom` namespace.

Create these under **Settings → Custom data → Products → Add definition**. The
`products_import.csv` columns are named to match them, so once the definitions
exist the import populates them automatically.

| Name | Namespace and key | Type | Used for |
| --- | --- | --- | --- |
| Dimensions | `custom.dimensions` | Single line text | Spec row + card dimensions line |
| Lead time | `custom.lead_time` | Single line text | Spec row + card lead-time line |
| Materials | `custom.materials` | Single line text | Card material line + product subtitle |
| Order type | `custom.order_type` | Single line text | Spec row (e.g. “Pre-order only”) |
| Badge | `custom.badge` | Single line text | Card badge style: `new`, `best`, `pre`, `lim`, `sold` |
| Badge label | `custom.badge_label` | Single line text | Card badge text (e.g. “Bestseller”) |
| CTA label | `custom.cta_label` | Single line text | Card / product button text |
| Care | `custom.care` | Multi-line text | “Care & Materials” accordion on product page |
| Enquire only | `custom.enquire_only` | True / false (boolean) | Switches the product to the Enquire flow |

> Tip: if you'd rather not use metafields, you can drive the homepage entirely
> from the **manual Product blocks** already configured in the theme editor —
> the metafields only matter for live collection/product pages.

## The Enquire flow
A product becomes “enquire only” (button reads **Enquire about this piece**,
price shows **Price on enquiry**) when **any** of these is true:
- `custom.enquire_only` = `true`, **or**
- the product has the tag `enquire`, **or**
- the product price is 0.

The button links to your Contact page (`page.contact` template) with the product
name and selected variant pre-filled in the enquiry message.
