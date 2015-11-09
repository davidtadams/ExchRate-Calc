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

var currName = {
  AUD: "Australia Dollar",
  BGN: "Bulgaria Lev",
  BRL: "Brazil Real",
  CAD: "Canada Dollar",
  CHF: "Swiss Franc",
  CNY: "China Yuan",
  CZK: "Czech Koruna",
  DKK: "Denmark Krone",
  EUR: "Euro",
  GBP: "UK Pound",
  HKD: "Hong Kong Dollar",
  HRK: "Croatia Kuna",
  HUF: "Hungary Forint",
  IDR: "Indoesia Rupiah",
  ILS: "Israel Shekel",
  INR: "Inda Rupee",
  JPY: "Japan Yen",
  KRW: "Korea Won",
  MXN: "Mexico Peso",
  MYR: "Malaysia Ringgit",
  NOK: "Norway Krone",
  NZD: "New Zealand Dollar",
  PHP: "Philippines Peso",
  PLN: "Poland Zloty",
  RON: "Romania New Leu",
  RUB: "Russia Ruble",
  SEK: "Sweden Krona",
  SGD: "Singapore Dollar",
  THB: "Thailand Baht",
  TRY: "Turkey Lira",
  USD: "USA Dollar",
  ZAR: "South Africa Rand"
};

var currAbrev = [
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "RUB",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR"
];

function formSubmit() {
  var amount = document.getElementById('inputAmount').value;
  var cur1 = document.getElementById('currency1').value;
  var cur2 = document.getElementById('currency2').value;
  var url = 'https://api.fixer.io/latest?base=' + cur1;

  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      displayResults(JSON.parse(this.responseText));
      displayTable(JSON.parse(this.responseText));
    }
  };
  req.open('GET', url);
  req.send();

  function displayResults(data) {
    var rate = data.rates[cur2];
    var convertedAmount = amount * rate;
    var results = document.getElementById('results');

    var newHtml = '<h3>Results:</h3><p>Data as of: '
      + data.date + '</p><p>Exchange Rate: '
      + rate + '</p>';
    newHtml += '<p>' + amount + ' '
      + data.base + ' = ' + convertedAmount + ' '
      + cur2 + '</p>';
    results.innerHTML = newHtml;
  }

  function displayTable(data) {
    var allData = document.getElementById('exchdata');
    var newHtml = '<table><tr><th>Currency Name</th><th>Abbreviation</th><th>1 '
      + data.base + '</th><th>'
      + data.base + ' (inverse)</th></tr>';

    for (var i = 0; i < currAbrev.length; i++) {
      if (data.rates[currAbrev[i]]) {
        newHtml += '<tr><td>' + currName[currAbrev[i]]
          + '</td><td>' + currAbrev[i]
          + '</td><td>' + data.rates[currAbrev[i]]
          + '</td><td>' + (1 / data.rates[currAbrev[i]]).toFixed(5)
          + '</td></tr>';
      }
    }

    newHtml += '</table>';
    allData.innerHTML = newHtml;
  }
}
