

    (function( jQuery ){
  var $module = jQuery('#m-1682498763387').children('.module');
  $module.gfV3Product();
})( window.GemQuery || jQuery );
  
    
  
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1682500799278').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1682506196483').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    
  
    (function( jQuery ){
  var $module = jQuery('#m-1682498763317').children('.module');
  $module.gfV3ProductCartButton({ onItemAdded: function(data) {}});
})( window.GemQuery || jQuery );
  
    
  
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1682509243548').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1685627557488').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function(jQuery) {
    var $module = jQuery('#m-1682498763350').children('.module');
    $module.gfV3ProductPrice({
        displayCurrency: true
    });
})(window.GemQuery || jQuery);
  (function( jQuery ){
  // var $module = jQuery('#m-1679325869592').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
    
  
    (function(jQuery) {
    var $module = jQuery('#m-1682498763324').children('.module');
    $module.gfV3ProductPrice({
        displayCurrency: true
    });
})(window.GemQuery || jQuery);
  
    (function( jQuery ){
  // var $module = jQuery('#m-1683636253052').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  (function(jQuery) {
  var $module = jQuery('#m-1682498763297').children('.module');
  var swatchText = $module.attr('data-swatch-text') != undefined ? $module.attr('data-swatch-text') : '1';
  $module.gfV3ProductSwatches({
    swatchText: swatchText,
    onSwatchSelected: function(variant, $swatch) {}
  });
})(window.GemQuery || jQuery);(function(jQuery) {
  var $module = jQuery('#m-1682498763296').children('.module');
  var swatchText = $module.attr('data-swatch-text') != undefined ? $module.attr('data-swatch-text') : '1';
  $module.gfV3ProductSwatches({
    swatchText: swatchText,
    onSwatchSelected: function(variant, $swatch) {
      document.dispatchEvent(new CustomEvent('variant:change', {
        detail : {
          variant: variant
        }
      }));
    }
  });
})(window.GemQuery || jQuery);(function( jQuery ){
  var $module = jQuery('#m-1685698825968').children('.module');


if($('.gempage-editing').length < 1){
  
  function formatDay(day){
    var fday;
    
    if(day == 1 || day == 21 || day == 31){
      fday = day + 'st';
    }else if(day == 2 || day == 22){
      fday = day + 'nd';
    }else if(day == 3 || day == 23){
      fday = day + 'rd';
    }else{
      fday = day + 'th'
    }
    return fday;
  }
  
      //debug
      var debug = 0;
      //
  
  var $wrapper = $module.find('.gp_custom-shipping-time');
  var $countdownElm = $module.find('.gp_custom-countdown');
  var $hourElm = $module.find('.gp_hour');
  var $minutesElm = $module.find('.gp_minutes');
  var $todayElm = $module.find('.gp_custom-today');
  var $todayP2Elm = $module.find('.gp_custom-today-p2');
  
  var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  
  utc = 1;
 
 
 function addDate(plus){
  
    //Add today
    var today = new Date();
    today.setUTCHours(today.getUTCHours() + utc)
    
    today.setUTCDate(today.getUTCDate() + plus);
    
    
        //debug
        today.setUTCDate(today.getUTCDate() + debug);
        console.log("Debug [today]: " + today.toUTCString() + utc);
        //
        
    if(today.getUTCDay() == 0 || today.getUTCDay() == 6){
      $module.find('.gp_custom-shipping-time').addClass('gp-hide');
    }else{
      $module.find('.gp_custom-shipping-time').removeClass('gp-hide');
    }
    
    var todayP = 0; 
    
    
    if(today.getUTCDay() == 0){
      today.setUTCDate(today.getUTCDate() + 1);
      todayP = 1;
    }else if(today.getUTCDay() == 6){
      today.setUTCDate(today.getUTCDate() + 2);
      todayP = 2;
    } 
  
    $todayElm.html(weekday[today.getUTCDay()] + ' ' + formatDay(today.getUTCDate()) + ' ' + month[today.getUTCMonth()])
    
    
    //Add today + 2
    var todayP2 = new Date();
    todayP2.setUTCHours(todayP2.getUTCHours() + utc)
    today.setUTCDate(today.getUTCDate() + plus);
    
    todayP2.setUTCDate(todayP2.getUTCDate() + 2);
    
        //debug
        todayP2.setUTCDate(todayP2.getUTCDate() + debug);
        console.log("Debug [today + 2]: " + todayP2.toUTCString()+ utc);
        //
    
    
    todayP2.setUTCDate(todayP2.getUTCDate() + todayP);
    if(todayP2.getUTCDay() == 0){
      todayP2.setUTCDate(todayP2.getUTCDate() + 1);
    }else if(todayP2.getUTCDay() == 6){
      todayP2.setUTCDate(todayP2.getUTCDate() + 2);
    } 
    $todayP2Elm.html(weekday[todayP2.getUTCDay()] + ' ' + formatDay(todayP2.getUTCDate()) + ' ' + month[todayP2.getUTCMonth()])
  
  }
  
  addDate(0);

  
  //Add countdown
  
  function setCountdown(){
    var now = new Date();
    now.setUTCHours(now.getUTCHours() + utc);
    var a  = now.getUTCHours() * 60 + now.getUTCMinutes();
    var b = 14 * 60;
    
    if(a < b){
      var c = b - a;
      $hourElm.text(Math.floor(c / 60));
      $minutesElm.text(c % 60);
    }else{
      var c = b + (24 * 60) - a;
      $hourElm.text(Math.floor(c / 60));
      $minutesElm.text(c % 60);
    }
    
    if(a < b){
      addDate(0);
    }else{
      addDate(1);
    }
 
  }

  interval = setInterval( function() {
    setCountdown()  
  }, 60000);
  
  setCountdown();
  
 
  //Check variant out stock
  var $product = $module.closest('[data-label="Product"]').children('.module');
    if ($product.length == 0) {
        $product = $module.closest('[data-icon="gpicon-product"]').children('.module');
    }
    if ($product.data('gfv3product') != undefined) {
      var selectedVariant = $product.data('gfv3product').getVariant();
      triggerChangeVariant(selectedVariant)
    }

  var currentWrapProductId = $module.closest('[data-label="Product"]').attr('id');
  
  function changeVariantFunction(variant){
    triggerChangeVariant(variant)
  }
    
  if (window.GEMSTORE) {
      window.GEMSTORE.subscribe("product-"+currentWrapProductId+"-variant", changeVariantFunction);
  }
  
  function triggerChangeVariant(variant){
    if(variant.available){
      $wrapper.addClass('gp_show');
    }else{
      $wrapper.removeClass('gp_show');
    }
    
    var quantity = $module.find('.gf-variant-' + variant.id).attr('data-inventory_quantity');
    if(quantity <= 0){
      $wrapper.removeClass('gp_show');
    }
    
  }
  
}

})( window.GemQuery || jQuery );
    (function( jQuery ){
  // var $module = jQuery('#m-1682500864127').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function( jQuery ){
  // var $module = jQuery('#m-1682498763259').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function( jQuery ){
  try {
    var $module = jQuery('#m-1682498763320').children('.module');
    var single = $module.attr('data-single');
    var openDefault = $module.attr('data-openDefault');
    var openTab = $module.attr('data-openTab');
    var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';

    if(openDefault == 0 || openDefault == '0') {
      openTab = '0';
    }

    $module.gfAccordion({
      single: single,
      openTab: openTab,
      mode: mode,
      onChanged: function() {	
        // Fix (P) Desc read more bug	
        $module.find('.module-wrap[data-label="(P) Description"]').each(function(index, el) {	
          if (jQuery(el).children('.module').data('gfv3productdesc') != undefined) {	
            jQuery(el).children(".module").data("gfv3productdesc").initReadMore();	
          }	
        })	
      }
    });

    var borderColor = $module.attr('data-borderColor');
    var borderSize = $module.attr('data-borderSize');

    $module.children('[data-accordion]').children('[data-control]').css('border-bottom', borderSize + ' solid ' + borderColor);
    $module.children('[data-accordion]').children('[data-content]').children().css('border-bottom', borderSize + ' solid ' + borderColor);
  } catch(err) {}
})( window.GemQuery || jQuery );
  
    
  
    (function( jQuery ){
  var $module = jQuery('#m-1682498763250').children('.module');
  $module.gfV3ProductDesc();
})( window.GemQuery || jQuery );
  
    
  (function( jQuery ){
  // var $module = jQuery('#m-1682498763323').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1682498763252').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    
  
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1683636292980').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    
  
    (function( jQuery ){
  // var $module = jQuery('#m-1682501084243').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  
    (function( jQuery ){
  // var $module = jQuery('#m-1684939133388').children('.module');
  // You can add custom Javascript code right here.
})( window.GemQuery || jQuery );
  window.__gfFlowActions = []; window.__gfFlowActions.push([{"source":{"id":"#m-1685627557488"},"events":[{"key":"click"}],"targets":[{"id":"#m-1685627557488","actions":[{"key":"scrollToId","type":2,"data":{"delay":0,"duration":500,"marginTop":30}}]}]}]);window.__gfFlowActions.push([{"source":{"id":"#m-1683636253052"},"events":[{"key":"click"}],"targets":[{"id":"#e-1682498763325","actions":[{"key":"scrollToId","type":2,"data":{"delay":0,"duration":500,"marginTop":30}}],"rename":"Text Block: #e-1682498763325"}]},{"source":{"id":"#m-1683636253052"},"events":[{"key":"scroll-into-view"}],"targets":[{"id":"#m-1683636292980","actions":[{"key":"show","type":2,"data":{"delay":0,"duration":500}}],"rename":"Liquid: #m-1683636292980"}]}]); window.__gfV1FlowActions.init();