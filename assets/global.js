(function(){
  var cartDrawerEnabled = true;
  try {
    var metaTag = document.querySelector('style');
    if (metaTag) {
      cartDrawerEnabled = getComputedStyle(document.documentElement).getPropertyValue('--cart-drawer') !== '0';
    }
  } catch(e) {}

  // Cart drawer toggle
  function openCart(){
    document.querySelector('.cart-overlay')?.classList.add('open');
    document.querySelector('.cart-drawer')?.classList.add('open');
    document.body.style.overflow='hidden';
    refreshCart();
  }
  function closeCart(){
    document.querySelector('.cart-overlay')?.classList.remove('open');
    document.querySelector('.cart-drawer')?.classList.remove('open');
    document.body.style.overflow='';
  }

  // Refresh cart drawer via Section Rendering API
  function refreshCart(){
    fetch('/?sections=cart-drawer')
      .then(function(r){return r.json()})
      .then(function(data){
        var html=data['cart-drawer'];
        if(!html)return;
        var tmp=document.createElement('div');
        tmp.innerHTML=html;
        var newBody=tmp.querySelector('.cart-body');
        var newFoot=tmp.querySelector('.cart-foot');
        var newCount=tmp.querySelector('[data-cart-count]');
        var curBody=document.querySelector('.cart-body');
        var curFoot=document.querySelector('.cart-foot');
        if(newBody&&curBody) curBody.innerHTML=newBody.innerHTML;
        if(newFoot&&curFoot){
          curFoot.innerHTML=newFoot.innerHTML;
          curFoot.classList.toggle('hidden',!newFoot.innerHTML.trim());
        }
        if(newCount){
          document.querySelectorAll('[data-cart-count]').forEach(function(el){
            el.textContent=newCount.textContent;
            el.classList.toggle('hidden',newCount.textContent==='0');
          });
        }
      })
      .catch(console.error);
  }

  // Add to cart (from product page form or any form with action /cart/add)
  document.addEventListener('submit',function(e){
    var form=e.target;
    if(!form.matches('form[action="/cart/add"]'))return;
    e.preventDefault();
    var btn=form.querySelector('[type="submit"]');
    var origText=btn?btn.textContent:'';
    if(btn){
      btn.disabled=true;
      btn.textContent='Adding…';
    }
    var data=new FormData(form);
    fetch('/cart/add.js',{method:'POST',body:data})
      .then(function(r){
        if(!r.ok) return r.json().then(function(d){throw new Error(d.description||'Add to cart failed')});
        return r.json();
      })
      .then(function(){
        if(btn){
          btn.textContent='Added ✓';
          setTimeout(function(){
            btn.disabled=false;
            btn.textContent=origText;
          },1500);
        }
        openCart();
      })
      .catch(function(err){
        console.error(err);
        if(btn){
          btn.disabled=false;
          btn.textContent=origText;
        }
        alert(err.message||'Could not add to cart. Please try again.');
      });
  });

  // Quantity change (delegated) — works in both cart drawer and cart page
  document.addEventListener('click',function(e){
    var btn=e.target.closest('[data-qty-change]');
    if(!btn)return;
    var key=btn.dataset.key;
    var delta=parseInt(btn.dataset.qtyChange,10);
    var input=btn.closest('.cart-qty')?.querySelector('input');
    if(!input)return;
    var newQty=Math.max(0,parseInt(input.value,10)+delta);
    input.value=newQty;
    fetch('/cart/change.js',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id:key,quantity:newQty})
    }).then(function(){
      refreshCart();
      // If on cart page, reload to reflect changes
      if(document.querySelector('.cart-page')){
        window.location.reload();
      }
    }).catch(console.error);
  });

  // Remove item
  document.addEventListener('click',function(e){
    var btn=e.target.closest('[data-remove-key]');
    if(!btn)return;
    e.preventDefault();
    fetch('/cart/change.js',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id:btn.dataset.removeKey,quantity:0})
    }).then(function(){
      refreshCart();
      if(document.querySelector('.cart-page')){
        window.location.reload();
      }
    }).catch(console.error);
  });

  // Cart icon click
  document.addEventListener('click',function(e){
    if(e.target.closest('[data-cart-toggle]')){
      e.preventDefault();
      openCart();
    }
    if(e.target.closest('.cart-close')||e.target.closest('.cart-overlay')){
      closeCart();
    }
  });

  // Mobile nav
  document.addEventListener('click',function(e){
    if(e.target.closest('.mobile-toggle')){
      document.querySelector('.mobile-nav')?.classList.add('open');
      document.querySelector('.mobile-nav-overlay')?.classList.add('open');
      document.body.style.overflow='hidden';
    }
    if(e.target.closest('.mobile-nav-close')||e.target.closest('.mobile-nav-overlay')){
      document.querySelector('.mobile-nav')?.classList.remove('open');
      document.querySelector('.mobile-nav-overlay')?.classList.remove('open');
      document.body.style.overflow='';
    }
  });

  // Mobile nav dropdown toggle
  document.addEventListener('click',function(e){
    var parent=e.target.closest('.mobile-nav-parent');
    if(!parent) return;
    var group=parent.closest('.mobile-nav-group');
    var children=group?.querySelector('.mobile-nav-children');
    if(!children) return;
    var isOpen=parent.getAttribute('aria-expanded')==='true';
    parent.setAttribute('aria-expanded',String(!isOpen));
    children.classList.toggle('open');
  });

  // Desktop dropdown — touch support
  document.addEventListener('click',function(e){
    var navItem=e.target.closest('.nav-item');
    if(!navItem) return;
    var dropdown=navItem.querySelector('.dropdown');
    if(!dropdown) return;
    if('ontouchstart' in window){
      var link=navItem.querySelector(':scope > a');
      if(link && e.target.closest('a')===link){
        if(!navItem.classList.contains('touch-open')){
          e.preventDefault();
          document.querySelectorAll('.nav-item.touch-open').forEach(function(item){
            item.classList.remove('touch-open');
          });
          navItem.classList.add('touch-open');
        }
      }
    }
  });

  // Close touch dropdowns when clicking elsewhere
  document.addEventListener('click',function(e){
    if(!e.target.closest('.nav-item')){
      document.querySelectorAll('.nav-item.touch-open').forEach(function(item){
        item.classList.remove('touch-open');
      });
    }
  });

  // Newsletter AJAX
  document.addEventListener('submit',function(e){
    var form=e.target;
    if(!form.matches('form[action*="contact#"]') && form.id!=='newsletter') return;
    if(!form.querySelector('[name="contact[tags]"][value="newsletter"]')) return;
    e.preventDefault();
    var btn=form.querySelector('button[type="submit"]');
    var origText=btn?btn.textContent:'';
    if(btn){
      btn.disabled=true;
      btn.textContent='Subscribing…';
    }
    fetch(form.action||'/contact',{
      method:'POST',
      body:new FormData(form),
      headers:{'Accept':'application/json'}
    }).then(function(r){
      if(btn){
        btn.textContent='Subscribed ✓';
        setTimeout(function(){
          btn.disabled=false;
          btn.textContent=origText;
        },3000);
      }
      form.querySelector('[type="email"]').value='';
    }).catch(function(){
      if(btn){
        btn.disabled=false;
        btn.textContent=origText;
      }
    });
  });

  // Expose globally
  window.NHD={openCart:openCart,refreshCart:refreshCart,closeCart:closeCart};
})();
