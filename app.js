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

  //ADD error handling for if they pick the same currency2
  if (cur1.toLowerCase() === cur2.toLowerCase()) {
    var err = document.getElementsByClassName('error')[0];
    err.innerHTML = '<p>Error, currencies cannot be the same.</p>';
    return false;
  } else {
    var err = document.getElementsByClassName('error')[0];
    err.innerHTML = '';
  }

  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      displayResults(JSON.parse(this.responseText));
      displayTable(JSON.parse(this.responseText));
      document.getElementById('results').scrollIntoView({block: "end", behavior: "smooth"});
      console.log(document.getElementsByClassName('backToTop')[0]);
      document.getElementsByClassName('backToTop')[0].innerHTML = '<a href="#">Back to Top</a>';
    }
  };
  req.open('GET', url);
  req.send();

  function displayResults(data) {
    var rate = data.rates[cur2];
    var convertedAmount = amount * rate;
    var results = document.getElementById('results');

    var newHtml = '<div><h3>Results</h3>';
    newHtml += '<p>' + amount + ' ' + data.base
        + ' = ' + convertedAmount + ' ' + cur2 + '</p>';
    newHtml += '<p>Exchange Rate: ' + rate + '</p>';
    newHtml += '<p>Data as of: ' + data.date + '</p></div>';

    results.innerHTML = newHtml;
  }

  function displayTable(data) {
    var allData = document.getElementById('exchdata');
    var newHtml = '<table><tr><th>Currency Name</th><th>Abbreviation</th>';
    newHtml += '<th>1 '+ data.base + '</th>';
    newHtml += '<th>' + data.base + ' (inverse)</th></tr>';

    for (var i = 0; i < currAbrev.length; i++) {
      if (data.rates[currAbrev[i]]) {
        newHtml += '<tr><td>' + currName[currAbrev[i]] + '</td>';
        newHtml += '<td>' + currAbrev[i] + '</td>';
        newHtml += '<td>' + data.rates[currAbrev[i]] + '</td>';
        newHtml += '<td>' + (1 / data.rates[currAbrev[i]]).toFixed(5) + '</td></tr>';
      }
    }

    newHtml += '</table>';
    allData.innerHTML = newHtml;
  }

  return true;
}
