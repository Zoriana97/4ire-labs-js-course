let exchangeCurrency;

let exchangeCurrencyRate;

let currencyAmount;

let exchangeResult;

let requiredCurrency;

let requiredCurrencyRate;

let doExchange = true;


let usd = 1;

let uah = 27;

let eur = 0.86;

let pln = 3.97;

let czh = 22.04;


while(doExchange) {
    while(!exchangeCurrencyRate) {
        exchangeCurrency = String(prompt('Enter the name of the currency you want to exchange (usd, uah, eur, pln, czh)')).toLowerCase();
        if(exchangeCurrency === 'usd') {
            exchangeCurrencyRate = usd;
        }   else if(exchangeCurrency === 'uah') {
            exchangeCurrencyRate = uah;
        }   else if (exchangeCurrency === 'eur') {
            exchangeCurrencyRate = eur;
        }   else if(exchangeCurrency === 'pln') {
            exchangeCurrencyRate = pln;
        }   else if(exchangeCurrency === 'czh') {
            exchangeCurrencyRate = czh;
        }   else {
            alert('Please enter one of currencies: usd, uah, eur, pln, czh');
        }
    }

    while(!currencyAmount) {
        currencyAmount = +prompt('Enter the amount of currency you need to exchange');
        if(currencyAmount <= 0 || Number.isNaN(currencyAmount)) {
            alert('Amount of currency must be more than 0');
            currencyAmount = null;
        }
    }

    while(!requiredCurrencyRate) {
        requiredCurrency = String(prompt('Enter the name of the currency you want to get (usd, uah, eur, pln, czh)')).toLowerCase();
        if(requiredCurrency === 'usd') {
            requiredCurrencyRate = usd;
        }   else if(requiredCurrency === 'uah') {
            requiredCurrencyRate = uah;
        }   else if (requiredCurrency === 'eur') {
            requiredCurrencyRate = eur;
        }   else if(requiredCurrency === 'pln') {
            requiredCurrencyRate = pln;
        }   else if(requiredCurrency === 'czh') {
            requiredCurrencyRate = czh;
        }   else {
            alert('Please enter one of currencies: usd, uah, eur, pln, czh');
        }
    }

    exchangeResult = currencyAmount * (requiredCurrencyRate / exchangeCurrencyRate);

    alert(`Exchange result: ${currencyAmount} ${exchangeCurrency.toUpperCase()} -> ${exchangeResult.toFixed(2)} ${requiredCurrency.toUpperCase()}`);

    doExchange = confirm('Do you want to exchange currencies again?');

    exchangeCurrencyRate = null;

    currencyAmount = null;

    requiredCurrencyRate = null;
}
