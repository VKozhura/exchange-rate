const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

//fetch exchange rate and updating the DOM
function calculate() {
	const currency_one = currencyEl_one.value;
	const currency_two = currencyEl_two.value;

	fetch(`https://v6.exchangerate-api.com/v6/9ddabc6493b0e948439f3363/latest/${currency_one}`)
		.then((response) => response.json())
		.then((data) => {
			const rate = data.conversion_rates[currency_two];
			rateEl.textContent = `1${currency_one} = ${rate} ${currency_two}`;
			amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
		});
}

// Event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
	const temp = currencyEl_one.value;
	currencyEl_one.value = currencyEl_two.value;
	currencyEl_two.value = temp;
	calculate();
});

calculate();
