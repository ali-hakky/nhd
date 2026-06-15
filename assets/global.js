/* ============================================================
   Nazly Habib Design — theme javascript
   Cart drawer, mobile nav, product gallery, variant selection.
   Vanilla JS, no dependencies.
   ============================================================ */
(function () {
  'use strict';

  var money = function (cents) {
    if (window.NHD && window.NHD.formatMoney) return window.NHD.formatMoney(cents);
    return '£' + (cents / 100).toFixed(2);
  };

  /* ---------- Cart drawer ---------- */
  var CartDrawer = {
    el: null,
    open: function () {
      this.el = this.el || document.getElementById('CartDrawer');
      if (!this.el) return;
      this.el.classList.add('open');
      document.body.style.overflow = 'hidden';
    },
    close: function () {
      if (!this.el) return;
      this.el.classList.remove('open');
      document.body.style.overflow = '';
    },
    refresh: function () {
      var self = this;
      return fetch(window.Shopify.routes.root + 'cart?section_id=cart-drawer', { credentials: 'same-origin' })
        .then(function (r) { return r.text(); })
        .then(function (html) {
          var doc = new DOMParser().parseFromString(html, 'text/html');
          var fresh = doc.getElementById('CartDrawer');
          var current = document.getElementById('CartDrawer');
          if (fresh && current) {
            current.innerHTML = fresh.innerHTML;
            current.dataset.itemCount = fresh.dataset.itemCount;
            updateCartCount(parseInt(fresh.dataset.itemCount, 10) || 0);
          }
          self.el = document.getElementById('CartDrawer');
        });
    }
  };
  window.CartDrawer = CartDrawer;

  function updateCartCount(count) {
    document.querySelectorAll('[data-cart-count]').forEach(function (n) {
      n.textContent = count;
      n.style.display = count > 0 ? '' : 'none';
    });
  }

  /* ---------- Add to cart ---------- */
  function addToCart(form, button) {
    var formData = new FormData(form);
    if (button) { button.disabled = true; button.dataset.label = button.textContent; button.textContent = 'Adding…'; }
    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/javascript' },
      body: formData
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        if (!res.ok) { alert(res.data.description || 'Could not add to cart.'); return; }
        return CartDrawer.refresh().then(function () { CartDrawer.open(); });
      })
      .catch(function () { alert('Something went wrong. Please try again.'); })
      .finally(function () {
        if (button) { button.disabled = false; button.textContent = button.dataset.label || 'Add to cart'; }
      });
  }

  /* ---------- Change line quantity ---------- */
  function changeCartLine(line, quantity) {
    var drawer = document.getElementById('CartDrawer');
    if (drawer) drawer.classList.add('cart-loading');
    fetch(window.Shopify.routes.root + 'cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ line: line, quantity: quantity })
    })
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        updateCartCount(cart.item_count);
        return CartDrawer.refresh();
      })
      .finally(function () { if (drawer) document.getElementById('CartDrawer') && document.getElementById('CartDrawer').classList.remove('cart-loading'); });
  }

  /* ---------- Delegated events ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-cart-open]');
    if (t) { e.preventDefault(); CartDrawer.refresh().then(function () { CartDrawer.open(); }); return; }

    if (e.target.closest('[data-cart-close]') || e.target.classList.contains('cart-overlay')) {
      CartDrawer.close(); return;
    }

    var rm = e.target.closest('[data-cart-remove]');
    if (rm) { e.preventDefault(); changeCartLine(parseInt(rm.dataset.line, 10), 0); return; }

    var qb = e.target.closest('[data-qty-change]');
    if (qb) {
      e.preventDefault();
      var line = parseInt(qb.dataset.line, 10);
      var dir = parseInt(qb.dataset.qtyChange, 10);
      var cur = parseInt(qb.dataset.current, 10) || 0;
      var next = Math.max(0, cur + dir);
      if (line) { changeCartLine(line, next); }
      else { // product page stepper
        var input = qb.parentNode.querySelector('input[name="quantity"]');
        if (input) input.value = Math.max(1, (parseInt(input.value, 10) || 1) + dir);
      }
      return;
    }

    // Mobile nav
    if (e.target.closest('[data-mobile-nav-open]')) { e.preventDefault(); document.getElementById('MobileNav').classList.add('open'); document.body.style.overflow = 'hidden'; return; }
    if (e.target.closest('[data-mobile-nav-close]') || e.target.classList.contains('mobile-nav')) {
      var mn = document.getElementById('MobileNav'); if (mn) { mn.classList.remove('open'); document.body.style.overflow = ''; } return;
    }
  });

  document.addEventListener('submit', function (e) {
    var form = e.target.closest('form[data-product-form]');
    if (form) {
      e.preventDefault();
      addToCart(form, form.querySelector('[type="submit"]'));
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { CartDrawer.close(); var mn = document.getElementById('MobileNav'); if (mn) mn.classList.remove('open'); document.body.style.overflow = ''; }
  });

  /* ---------- Product gallery ---------- */
  document.addEventListener('click', function (e) {
    var th = e.target.closest('.gallery-thumb');
    if (!th) return;
    var gallery = th.closest('.product-gallery');
    var main = gallery.querySelector('.gallery-main img');
    if (main) { main.src = th.dataset.full; main.srcset = ''; }
    gallery.querySelectorAll('.gallery-thumb').forEach(function (x) { x.classList.remove('on'); });
    th.classList.add('on');
  });

  window.NHD = window.NHD || {};
  window.NHD.money = money;
})();
