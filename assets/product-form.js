(function(){
  var form=document.querySelector('.product-form');
  if(!form)return;
  var variantData=JSON.parse(form.dataset.variants||'[]');
  var priceEl=document.querySelector('.product-price-main');
  var addBtn=form.querySelector('[type="submit"]');
  var idInput=form.querySelector('[name="id"]');

  function getSelectedOptions(){
    var opts=[];
    form.querySelectorAll('.variant-fieldset').forEach(function(fs){
      var active=fs.querySelector('.variant-opt.active');
      if(active) opts.push(active.textContent.trim());
    });
    return opts;
  }

  function findVariant(opts){
    return variantData.find(function(v){
      return opts.every(function(o,i){return v['option'+(i+1)]===o});
    });
  }

  function updateVariant(){
    var opts=getSelectedOptions();
    var variant=findVariant(opts);
    if(!variant)return;
    idInput.value=variant.id;

    if(priceEl){
      var html='';
      if(variant.compare_at_price && variant.compare_at_price>variant.price){
        html+='<span class="was">'+formatMoney(variant.compare_at_price)+'</span>';
      }
      html+=formatMoney(variant.price);
      priceEl.innerHTML=html;
    }

    if(addBtn){
      if(variant.available){
        addBtn.disabled=false;
        addBtn.textContent=addBtn.dataset.addLabel||'Add to cart';
      }else{
        addBtn.disabled=true;
        addBtn.textContent='Sold out';
      }
    }

    var url=new URL(window.location);
    url.searchParams.set('variant',variant.id);
    history.replaceState(null,'',url.toString());

    if(variant.featured_image){
      var mainImg=document.querySelector('.product-gallery .main-image img');
      if(mainImg){
        var imgUrl=variant.featured_image.src;
        if(imgUrl){
          mainImg.src=imgUrl.replace(/(\.\w+)\?/,'$1?')+(/\?/.test(imgUrl)?'&':'?')+'width=900';
          mainImg.srcset='';
        }
      }
    }

    updateAvailability(opts,variant);
  }

  function updateAvailability(selectedOpts,currentVariant){
    var fieldsets=form.querySelectorAll('.variant-fieldset');
    fieldsets.forEach(function(fs,index){
      fs.querySelectorAll('.variant-opt').forEach(function(opt){
        var testOpts=selectedOpts.slice();
        testOpts[index]=opt.textContent.trim();
        var matchingVariant=findVariant(testOpts);
        if(matchingVariant && matchingVariant.available){
          opt.classList.remove('unavailable');
        } else if(matchingVariant && !matchingVariant.available){
          opt.classList.add('unavailable');
        } else {
          opt.classList.remove('unavailable');
        }
      });
    });
  }

  function formatMoney(cents){
    return Shopify.formatMoney?Shopify.formatMoney(cents):'£'+(cents/100).toFixed(2);
  }

  // Variant option click
  form.addEventListener('click',function(e){
    var opt=e.target.closest('.variant-opt');
    if(!opt||opt.classList.contains('unavailable'))return;
    opt.closest('.variant-options').querySelectorAll('.variant-opt').forEach(function(o){o.classList.remove('active')});
    opt.classList.add('active');
    updateVariant();
  });

  // Product page thumbnail click
  document.addEventListener('click',function(e){
    var thumb=e.target.closest('.product-gallery .thumb');
    if(!thumb)return;
    document.querySelectorAll('.product-gallery .thumb').forEach(function(t){t.classList.remove('active')});
    thumb.classList.add('active');
    var img=thumb.querySelector('img');
    var main=document.querySelector('.product-gallery .main-image img');
    if(img&&main){
      var src=img.src;
      src=src.replace(/[?&]width=\d+/g,'');
      src+=(src.indexOf('?')>-1?'&':'?')+'width=900';
      main.src=src;
      main.srcset='';
    }
  });

  // Product tabs
  document.addEventListener('click',function(e){
    var tabBtn=e.target.closest('.product-tabs-nav button');
    if(!tabBtn)return;
    var tabs=tabBtn.closest('.product-tabs');
    tabs.querySelectorAll('.product-tabs-nav button').forEach(function(b){b.classList.remove('active')});
    tabBtn.classList.add('active');
    tabs.querySelectorAll('.product-tab-panel').forEach(function(p){p.classList.add('hidden')});
    var target=tabs.querySelector('#'+tabBtn.dataset.tab);
    if(target) target.classList.remove('hidden');
  });

  // Enquire redirect
  var enquireBtn=form.querySelector('[data-enquire-url]');
  if(enquireBtn){
    enquireBtn.addEventListener('click',function(e){
      e.preventDefault();
      window.location.href=enquireBtn.dataset.enquireUrl;
    });
  }

  // Quantity buttons on product page
  document.addEventListener('click',function(e){
    var btn=e.target.closest('.product-qty-btn');
    if(!btn) return;
    var input=btn.closest('.product-qty').querySelector('input');
    if(!input) return;
    var val=parseInt(input.value,10)||1;
    if(btn.dataset.action==='minus') val=Math.max(1,val-1);
    else val=val+1;
    input.value=val;
  });

  // Init: select variant from URL or first available
  var urlParams=new URLSearchParams(window.location.search);
  var variantId=urlParams.get('variant');
  if(variantId){
    var v=variantData.find(function(v){return String(v.id)===variantId});
    if(v){
      var opts=[v.option1,v.option2,v.option3].filter(Boolean);
      form.querySelectorAll('.variant-fieldset').forEach(function(fs,i){
        if(opts[i]){
          fs.querySelectorAll('.variant-opt').forEach(function(o){
            o.classList.toggle('active',o.textContent.trim()===opts[i]);
          });
        }
      });
    }
  }
  updateVariant();
})();
