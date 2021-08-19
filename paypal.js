function initPayPalButton() {
    toggle_visibility('paypal5SFW');
    if (targetDiv.style.display !== "none") {
        targetDiv.style.display = "none";
    }
    else {
        targetDiv.style.display = "inline-block";
    }
    paypal.Buttons({
      style: {
        shape: 'pill',
        color: 'blue',
        layout: 'vertical',
        label: 'paypal',
        
      },

      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{"description":"This is a paypal button","amount":{"currency_code":"USD","value":5}}]
        });
      },

      onApprove: function(data, actions) {
        return actions.order.capture().then(function(orderData) {
          
          // Full available details
          console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

          // Show a success message within this page, e.g.
          const element = document.getElementById('paypal-button-container');
          element.innerHTML = '';
          element.innerHTML = '<h3>Thank you for your payment!</h3>';

          // Or go to another URL:  actions.redirect('thank_you.html');
          
        });
      },

      onError: function(err) {
        console.log(err);
      }
    }).render('#paypal-button-container');
  }
  function toggle_visibility(id) {
    document.getElementById(id).style.display = (document.getElementById(id).style.display !== "none") ? "none" : "block";
}