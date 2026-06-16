(function(){
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
      .then(r=>r.json())
      .then(data=>{
        const html=data['cart-drawer'];
        if(!html)return;
        const tmp=document.createElement('div');
        tmp.innerHTML=html;
        const newBody=tmp.querySelector('.cart-body');
        const newFoot=tmp.querySelector('.cart-foot');
        const newCount=tmp.querySelector('[data-cart-count]');
        if(newBody) document.querySelector('.cart-body').innerHTML=newBody.innerHTML;
        if(newFoot){
          const foot=document.querySelector('.cart-foot');
          if(foot) foot.innerHTML=newFoot.innerHTML;
          foot?.classList.toggle('hidden',!newFoot.innerHTML.trim());
        }
        if(newCount){
          document.querySelectorAll('[data-cart-count]').forEach(el=>{
            el.textContent=newCount.textContent;
            el.classList.toggle('hidden',newCount.textContent==='0');
          });
        }
      })
      .catch(console.error);
  }

  // Add to cart (from product page form or any form with action /cart/add)
  document.addEventListener('submit',function(e){
    const form=e.target;
    if(!form.matches('form[action="/cart/add"]'))return;
    e.preventDefault();
    const data=new FormData(form);
    fetch('/cart/add.js',{method:'POST',body:data})
      .then(r=>{
        if(!r.ok)throw new Error('Add to cart failed');
        return r.json();
      })
      .then(()=>openCart())
      .catch(err=>{
        console.error(err);
        alert('Could not add to cart. Please try again.');
      });
  });

  // Quantity change (delegated)
  document.addEventListener('click',function(e){
    const btn=e.target.closest('[data-qty-change]');
    if(!btn)return;
    const key=btn.dataset.key;
    const delta=parseInt(btn.dataset.qtyChange,10);
    const input=btn.closest('.cart-qty')?.querySelector('input');
    if(!input)return;
    const newQty=Math.max(0,parseInt(input.value,10)+delta);
    input.value=newQty;
    fetch('/cart/change.js',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id:key,quantity:newQty})
    }).then(()=>refreshCart()).catch(console.error);
  });

  // Remove item
  document.addEventListener('click',function(e){
    const btn=e.target.closest('[data-remove-key]');
    if(!btn)return;
    e.preventDefault();
    fetch('/cart/change.js',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({id:btn.dataset.removeKey,quantity:0})
    }).then(()=>refreshCart()).catch(console.error);
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
      document.body.style.overflow='hidden';
    }
    if(e.target.closest('.mobile-nav-close')){
      document.querySelector('.mobile-nav')?.classList.remove('open');
      document.body.style.overflow='';
    }
  });

  // Expose openCart globally for product form
  window.NHD={openCart:openCart,refreshCart:refreshCart};
})();
