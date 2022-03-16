const getCheckboxes = () =>
	Array.from(document.querySelectorAll('input[type="checkbox"]'));

const getQueryParams = () =>
	new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop),
	});

const render = () => {
	const params = getQueryParams();
	const totalEl = document.getElementById("total");
	const rentalCostEl = document.getElementById("rental-cost");
	const carEl = document.getElementById("car-name");
	const total = getTotal();
	totalEl.innerHTML = `TOTAL: ${total + Number(params.price)}DKK`;
	rentalCostEl.innerHTML = `Car rental cost: ${params.price}DKK`;
	carEl.innerHTML = params.name;
};

const checkboxesPricing = {
	secondDriver: 450,
	bigChildSeat: 95,
	roadsideAid: 320,
	babySeat: 100,
	smallChildSeat: 100,
	gpsNav: 250,
	snowChains: 188,
};

const getTotal = () => {
	const checkboxes = getCheckboxes();
	return checkboxes.reduce((acc, curr) => {
		if (curr.checked) {
			return acc + checkboxesPricing[curr.name];
		}
		return acc;
	}, 0);
};

const checkboxListener = () => {
	render();
};

const registerListeners = () => {
	const checkboxes = getCheckboxes();
	checkboxes.forEach((c) => {
		c.addEventListener("change", checkboxListener);
	});
};

const init = () => {
	registerListeners();
	render();
};

init();
