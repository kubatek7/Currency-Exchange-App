fetch('http://api.nbp.pl/api/exchangerates/tables/A/')
    .then(res => res.json())
    .then(data => {
        let currencies = data[0].rates;
        let exchangeRates = [];
        for (let i=0; i<currencies.length;i++){
            exchangeRates.push(currencies[i].code);
        }
        // console.log(currencies);
        $("#input3" ).autocomplete({
            source: exchangeRates
        });
    });

// Show div on button click 

function pageChange(pageNo) {

    let page1 = document.getElementById("page1");
    let page2 = document.getElementById("page2");
    let page3 = document.getElementById("page3");

    if (pageNo === 1 ) {
        page1.style.display = "block";
        page2.style.display = "none";
        page3.style.display = "none";
    }
    else if (pageNo === 2) {
        page1.style.display = "none";
        page2.style.display = "block";
        page3.style.display = "none";
    }
    else{
        page1.style.display = "none";
        page2.style.display = "none";
        page3.style.display = "block";
    }
}

// Currency calculation -based on PLN exchange rate to asking currency

function calculate(){
    let amountOwned = document.getElementById("input2").value;
    let currencyWanted = document.getElementById("input3").value;
    let url = `http://api.nbp.pl/api/exchangerates/rates/A/${currencyWanted}/?format=json`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        let exachangeRate = data.rates[0].mid;
        let amountExchanged = amountOwned/exachangeRate;
        document.getElementById("input4").value = amountExchanged.toFixed(2);
    })
}
