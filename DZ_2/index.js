

let exchangeCurrency;

let exchangeCurrencyRate;

let currencyAmount;

let exchangeResult;

let requiredCurrency;

let requiredCurrencyRate;

let doExchange = true;



let currencyRateUSD = {
   usd: 1,
   uah: 27,
   eur: 0.86,
   pln: 3.97,
   czh: 22.04 
};


while(doExchange) {
    while(!exchangeCurrencyRate) {
        exchangeCurrency = prompt('Enter the name of the currency which you want to exchange');
        exchangeCurrencyRate = currencyRateUSD[String(exchangeCurrency).toLowerCase()];
        if(!exchangeCurrencyRate) {
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
        requiredCurrency = prompt('Enter the name of the currency you want to get');
        requiredCurrencyRate = currencyRateUSD[String(requiredCurrency).toLowerCase()];
        if(!requiredCurrencyRate) {
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






