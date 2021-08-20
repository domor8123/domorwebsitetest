function paypal5sfw() {
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
          //toogle function when div is shown or it duplicates
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
    targetDiv = document.getElementById(id);
    if (targetDiv.style.display !== "none") {
        removepaypal("paypal-buttons paypal-buttons-context-iframe paypal-buttons-label-paypal paypal-buttons-layout-vertical");
        targetDiv.style.display = "none";
      } 
    else {  
        paypal5sfw();
        targetDiv.style.display = "block";
        removepaypal("paypal-buttons paypal-buttons-context-iframe paypal-buttons-label-paypal paypal-buttons-layout-vertical");
      }
}
function removepaypal(ClassName){
    targetDiv = document.getElementsByClassName(ClassName)[0]; 
    targetDiv.remove();
}
