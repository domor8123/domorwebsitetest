function initPayPalButton() {
    var shipping = 0;
    var itemOptions = document.querySelector("#smart-button-container #item-options");
var quantity = parseInt(1);
var quantitySelect = document.querySelector("#smart-button-container #quantitySelect");
if (!isNaN(quantity)) {
  quantitySelect.style.visibility = "visible";
}
var orderDescription = "Domor's Little Shop \n Please email me with a script or ideas of option choosen. My email is domor8123@gmail.com. ";
if(orderDescription === '') {
  orderDescription = 'Item';
}
paypal.Buttons({
  style: {
    shape: 'pill',
    color: 'blue',
    layout: 'vertical',
    label: 'paypal',
    
  },
  onClick: (data) => {
    // fundingSource = "venmo"
    fundingSource = data.fundingSource

    // Use this value to determine what funding source was used to pay
    // Update your confirmation pages and notifications from "PayPal" to "Venmo"
  },
  createOrder: function(data, actions) {
    var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value;
    var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price"));
    var tax = (0 === 0) ? 0 : (selectedItemPrice * (parseFloat(0)/100));
    if(quantitySelect.options.length > 0) {
      quantity = parseInt(quantitySelect.options[quantitySelect.selectedIndex].value);
    } else {
      quantity = 1;
    }

    tax *= quantity;
    tax = Math.round(tax * 100) / 100;
    var priceTotal = quantity * selectedItemPrice + parseFloat(shipping) + tax;
    priceTotal = Math.round(priceTotal * 100) / 100;
    var itemTotalValue = Math.round((selectedItemPrice * quantity) * 100) / 100;

    return actions.order.create({
      purchase_units: [{
        description: orderDescription,
        amount: {
          currency_code: 'USD',
          value: priceTotal,
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: itemTotalValue,
            },
            shipping: {
              currency_code: 'USD',
              value: shipping,
            },
            tax_total: {
              currency_code: 'USD',
              value: tax,
            }
          }
        },
        items: [{
          name: selectedItemDescription,
          unit_amount: {
            currency_code: 'USD',
            value: selectedItemPrice,
          },
          quantity: quantity
        }]
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      window.location.replace("./OrderInformation");
    });
  },
  onError: function(err) {
    console.log(err);
  },
}).render('#paypal-button-container');
}
initPayPalButton();


jQuery().ready(function() {   
    /* Custom select design */     
    jQuery('.drop-down').append('<div class="button"></div>');     
    jQuery('.drop-down').append('<ul class="select-list"></ul>');     
    jQuery('.drop-down select option').each(function() {   
    var bg = jQuery(this).css('background-image');     
    jQuery('.select-list').append('<li class="clsAnchor"><span value="' + jQuery(this).val() + '" class="' + jQuery(this).attr('class') + '" style=background-image:' + bg + '>' + jQuery(this).text() + '</span></li>');    
    });     
    jQuery('.drop-down .button').html('<span style=background-image:' + jQuery('.drop-down select').find(':selected').css('background-image') + '>' + jQuery('.drop-down select').find(':selected').text() + '</span>' + '<a href="javascript:void(0);" class="select-list-link">Arrow</a>');    
    jQuery('.drop-down ul li').each(function() {    
    if (jQuery(this).find('span').text() == jQuery('.drop-down select').find(':selected').text()) {   
    jQuery(this).addClass('active');        
    }       
    });      
    jQuery('.drop-down .select-list span').on('click', function() 
    {           
    var dd_text = jQuery(this).text();   
    var dd_img = jQuery(this).css('background-image');  
    var dd_val = jQuery(this).attr('value');    
    jQuery('.drop-down .button').html('<span style=background-image:' + dd_img + '>' + dd_text + '</span>' + '<a href="javascript:void(0);" class="select-list-link">Arrow</a>');       
    jQuery('.drop-down .select-list span').parent().removeClass('active');     
    jQuery(this).parent().addClass('active');      
    $('.drop-down select[name=options]').val( dd_val );  
    $('.drop-down .select-list li').slideUp();      
    });        
    jQuery('.drop-down .button').on('click','a.select-list-link', function() 
    {       
    jQuery('.drop-down ul li').slideToggle();   
    });      
    /* End */        
    }); 