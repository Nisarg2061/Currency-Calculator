const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("#msg");
const btn = document.querySelector("form button");

for( let select of dropdowns) {
  for (currCode in countryList) {
    let newOptn = document.createElement("option");
    newOptn.innerText = currCode;
    newOptn.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOptn.selected = "selected";
      let countyCode = countryList[currCode];
      let newSrc = `https://flagsapi.com/${countyCode}/flat/64.png`
      let img = select.parentElement.querySelector("img");
      img.src = newSrc;
    }
    if (select.name === "to" && currCode === "INR") {
      newOptn.selected = "selected";
      let countyCode = countryList[currCode];
      let newSrc = `https://flagsapi.com/${countyCode}/flat/64.png`
      let img = select.parentElement.querySelector("img");
      img.src = newSrc;
    }
    select.append(newOptn)
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countyCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countyCode}/flat/64.png`
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExcRate = async () => {
  let ammount = document.querySelector("form input");
  let amtVal = ammount.value;
  if (amtVal === "" || amtVal < 1){
    amtVal = 1;
    amtVal.value = "1";
  }
  newUrl = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
  let resp = await fetch(newUrl);
  let data = await resp.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalamt = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalamt.toFixed(2)} ${toCurr.value}`
}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExcRate();
});

window.addEventListener("load", () => {
  updateExcRate();
});

