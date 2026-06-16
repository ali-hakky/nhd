(function(){
  const form=document.querySelector('.product-form');
  if(!form)return;
  const variantData=JSON.parse(form.dataset.variants||'[]');
  const priceEl=document.querySelector('.product-price-main');
  const addBtn=form.querySelector('[type="submit"]');
  const idInput=form.querySelector('[name="id"]');

  function getSelectedOptions(){
    const opts=[];
    form.querySelectorAll('.variant-fieldset').forEach(fs=>{
      const active=fs.querySelector('.variant-opt.active');
      if(active) opts.push(active.textContent.trim());
    });
    return opts;
  }

  function findVariant(opts){
    return variantData.find(v=>{
      return opts.every((o,i)=>v['option'+(i+1)]===o);
    });
  }

  function updateVariant(){
    const opts=getSelectedOptions();
    const variant=findVariant(opts);
    if(!variant)return;
    idInput.value=variant.id;
    // Update price
    if(priceEl){
      let html='';
      if(variant.compare_at_price && variant.compare_at_price>variant.price){
        html+='<span class="was">'+formatMoney(variant.compare_at_price)+'</span>';
      }
      html+=formatMoney(variant.price);
      priceEl.innerHTML=html;
    }
    // Update button
    if(addBtn){
      if(variant.available){
        addBtn.disabled=false;
        addBtn.textContent=addBtn.dataset.addLabel||'Add to cart';
      }else{
        addBtn.disabled=true;
        addBtn.textContent='Sold out';
      }
    }
    // Update URL
    const url=new URL(window.location);
    url.searchParams.set('variant',variant.id);
    history.replaceState(null,'',url.toString());

    // Update gallery main image if variant has featured_image
    if(variant.featured_image){
      const mainImg=document.querySelector('.product-gallery .main-image img');
      if(mainImg) mainImg.src=variant.featured_image.src;
    }
  }

  function formatMoney(cents){
    return Shopify.formatMoney?Shopify.formatMoney(cents):'£'+(cents/100).toFixed(2);
  }

  // Variant option click
  form.addEventListener('click',function(e){
    const opt=e.target.closest('.variant-opt');
    if(!opt||opt.classList.contains('unavailable'))return;
    opt.closest('.variant-options').querySelectorAll('.variant-opt').forEach(o=>o.classList.remove('active'));
    opt.classList.add('active');
    updateVariant();
  });

  // Product page thumbnail click
  document.addEventListener('click',function(e){
    const thumb=e.target.closest('.product-gallery .thumb');
    if(!thumb)return;
    document.querySelectorAll('.product-gallery .thumb').forEach(t=>t.classList.remove('active'));
    thumb.classList.add('active');
    const img=thumb.querySelector('img');
    const main=document.querySelector('.product-gallery .main-image img');
    if(img&&main) main.src=img.src.replace(/&width=\d+/,'&width=900');
  });

  // Product tabs
  document.addEventListener('click',function(e){
    const tabBtn=e.target.closest('.product-tabs-nav button');
    if(!tabBtn)return;
    const tabs=tabBtn.closest('.product-tabs');
    tabs.querySelectorAll('.product-tabs-nav button').forEach(b=>b.classList.remove('active'));
    tabBtn.classList.add('active');
    tabs.querySelectorAll('.product-tab-panel').forEach(p=>p.classList.add('hidden'));
    const target=tabs.querySelector('#'+tabBtn.dataset.tab);
    if(target) target.classList.remove('hidden');
  });

  // Enquire redirect
  const enquireBtn=form.querySelector('[data-enquire-url]');
  if(enquireBtn){
    enquireBtn.addEventListener('click',function(e){
      e.preventDefault();
      window.location.href=enquireBtn.dataset.enquireUrl;
    });
  }

  // Init: select variant from URL or first available
  const urlParams=new URLSearchParams(window.location.search);
  const variantId=urlParams.get('variant');
  if(variantId){
    const v=variantData.find(v=>String(v.id)===variantId);
    if(v){
      const opts=[v.option1,v.option2,v.option3].filter(Boolean);
      form.querySelectorAll('.variant-fieldset').forEach((fs,i)=>{
        if(opts[i]){
          fs.querySelectorAll('.variant-opt').forEach(o=>{
            o.classList.toggle('active',o.textContent.trim()===opts[i]);
          });
        }
      });
    }
  }
  updateVariant();
})();
