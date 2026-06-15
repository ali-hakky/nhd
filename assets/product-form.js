/* ============================================================
   Product variant selection.
   Reads variant data from a JSON script tag, updates the hidden
   variant id, price, availability and the add-to-cart button.
   ============================================================ */
(function () {
  'use strict';

  function init(root) {
    var dataEl = root.querySelector('[data-variant-json]');
    if (!dataEl) return;
    var variants = JSON.parse(dataEl.textContent);
    var optionInputs = root.querySelectorAll('[data-option-index]');
    var idInput = root.querySelector('input[name="id"]');
    var submit = root.querySelector('[data-add-button]');
    var priceEl = root.querySelector('[data-price]');
    var wasEl = root.querySelector('[data-compare-price]');
    var saveEl = root.querySelector('[data-save]');
    var enquire = root.dataset.enquireMode === 'true';
    var enquireUrl = root.dataset.enquireUrl || '';

    function selectedOptions() {
      var opts = [];
      optionInputs.forEach(function (input) {
        if (input.type === 'radio') {
          if (input.checked) opts[parseInt(input.dataset.optionIndex, 10)] = input.value;
        } else {
          opts[parseInt(input.dataset.optionIndex, 10)] = input.value;
        }
      });
      return opts;
    }

    function findVariant(opts) {
      return variants.find(function (v) {
        return v.options.every(function (o, i) { return o === opts[i]; });
      });
    }

    function fmt(cents) {
      return (window.NHD && window.NHD.money) ? window.NHD.money(cents) : '£' + (cents / 100).toFixed(2);
    }

    function update() {
      var opts = selectedOptions();
      var variant = optionInputs.length ? findVariant(opts) : variants[0];

      // visual selected state
      root.querySelectorAll('.variant-pill').forEach(function (pill) {
        var radio = pill.querySelector('input');
        if (radio) pill.classList.toggle('on', radio.checked);
      });

      // refresh the "selected value" labels next to each option name
      opts.forEach(function (val, i) {
        var lbl = root.querySelector('[data-selected-' + i + ']');
        if (lbl) lbl.textContent = val;
      });

      if (!variant) {
        if (submit) { submit.disabled = true; submit.textContent = 'Unavailable'; }
        return;
      }
      if (idInput) idInput.value = variant.id;

      if (priceEl) priceEl.textContent = fmt(variant.price);
      if (wasEl) {
        if (variant.compare_at_price && variant.compare_at_price > variant.price) {
          wasEl.textContent = fmt(variant.compare_at_price); wasEl.style.display = '';
          if (saveEl) { saveEl.style.display = ''; }
        } else { wasEl.style.display = 'none'; if (saveEl) saveEl.style.display = 'none'; }
      }

      if (submit) {
        if (enquire) {
          submit.disabled = false;
          submit.textContent = root.dataset.enquireLabel || 'Enquire';
        } else if (!variant.available) {
          submit.disabled = true; submit.textContent = 'Sold out';
        } else {
          submit.disabled = false; submit.textContent = root.dataset.addLabel || 'Add to cart';
        }
      }

      // Update URL without reload for shareable variant links
      if (history.replaceState && variant.id) {
        var url = new URL(window.location.href);
        url.searchParams.set('variant', variant.id);
        history.replaceState({}, '', url.toString());
      }
    }

    optionInputs.forEach(function (input) {
      input.addEventListener('change', update);
    });

    // Enquire mode: redirect to contact instead of adding to cart
    if (enquire && enquireUrl) {
      var form = root.querySelector('form[data-product-form]');
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var opts = selectedOptions();
          var variant = optionInputs.length ? findVariant(opts) : variants[0];
          var q = '?product=' + encodeURIComponent(root.dataset.productTitle || '');
          if (variant) q += '&variant=' + encodeURIComponent(variant.title);
          window.location.href = enquireUrl + q;
        }, true);
      }
    }

    update();
  }

  document.querySelectorAll('[data-product-root]').forEach(init);
})();
