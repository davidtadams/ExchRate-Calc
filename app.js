/* All JS for Exchange Rate Calculator App */
/* using this API for the exchange rate data: http://fixer.io/ */
//https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/Sending_forms_through_JavaScript
//https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
//https://developer.mozilla.org/en-US/docs/Web/API/FormData

window.onload = function() {
  var form = document.getElementById('inputForm');
  form.addEventListener("submit", function(event) {
    formSubmit();
    event.preventDefault();
  })
}

function formSubmit() {
  var amount = document.getElementById('inputAmount').value;
  var cur1 = document.getElementById('currency1').value;
  var cur2 = document.getElementById('currency2').value;
  var url = 'https://api.fixer.io/latest?base=' + cur1;

  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      displayResults(JSON.parse(this.responseText));
    }
  };
  req.open('GET', url);
  req.send();

  function displayResults(data) {
    var rate = data.rates[cur2];
    var convertedAmount = amount * rate;
    var results = document.getElementById('results');
  }
}
