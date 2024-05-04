import { countryList } from "./countries.js";
const URL = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_hmfvQiPNQJ7u0SKD5Ypsf8x86pwHLU1BiEM3KdU2";
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


for (let select of dropdown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if (select.name == 'from' && currCode == 'USD') {
            newOption.selected = "selected";
        } else if (select.name == 'to' && currCode == 'INR') {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlags(evt.target);
    })
}

const updateFlags = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener(("click"), async (evt) => {
    evt.preventDefault();
    const msg = document.querySelector(".msg");
    let amount = document.querySelector("form input");
    let amtVal = amount.value;

    const URL_B = `${URL}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;
    let response = await fetch(URL_B);
    let data = await response.json();
    let finalData = data.data[toCurr.value].toFixed(2);
    console.log(finalData);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${amtVal * finalData} ${toCurr.value}`;
})



