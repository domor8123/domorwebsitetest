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

function custom_template(obj){
    var data = $(obj.element).data();
    var text = $(obj.element).text();
    if(data && data['img_src']){
        img_src = data['img_src'];
        template = $("<div class = \"row\" ><div class = \"col-md-12\"><img src=\"" + img_src + "\" /><p text-align:center;\">" + text + "</p></div></div>");
        return template;
    }
}
var options = {
'templateSelection': custom_template,
'templateResult': custom_template,
}
$('#item-options').select2(options);
$('.select2-container--default .select2-selection--single');
