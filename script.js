const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let formCurr = document.querySelector(".from select");
let toCurr = document.querySelector("#to");
let masg = document.querySelector(".masg");
const addExchangeRate = async () => {
  let amount = document.querySelector("form input");
  let amval = amount.value;
  if (amval === "" || amval < 1) {
    alert("Please enter a valid amount");
  }

  const api = `${BASE_URL}/${formCurr.value.toLowerCase()}.json`;
  let responce = await fetch(api);
  let data = await responce.json();
  let rate = data[formCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let result = amval * rate;
  result = Math.round(result);
  masg.innerHTML = `${amval} ${formCurr.value} convert to ${toCurr.value} = ${result} ${toCurr.value} `;
};
for (const select of dropdowns) {
  for (const Currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerHTML = Currcode;
    newoption.value = Currcode;

    if (select.name === "from" && Currcode === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "to" && Currcode === "PKR") {
      newoption.selected = "selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}
const updateFlag = (event) => {
  let currCode = event.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = event.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  addExchangeRate();
});

window.addEventListener("load", async () => {
  addExchangeRate();
});
