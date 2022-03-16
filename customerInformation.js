(function customerInformationPageIIFE() {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop),
	});
	const getInputs = () => Array.from(document.querySelectorAll("form input"));

	const render = () => {
		const carEl = document.getElementById("car-name");
		const accTotalEl = document.getElementById("acc-total");
		const pickUpEl = document.getElementById("pick-up");
		const handInEl = document.getElementById("hand-in");
		const daysEl = document.getElementById("days");
		const pickUpDate = new Date(window.localStorage.getItem("pickUpDate"));
		const handInDate = new Date(window.localStorage.getItem("handInDate"));
		const acc = JSON.parse(window.localStorage.getItem("accessories"));
		var timeDiff = handInDate.getTime() - pickUpDate.getTime();
		var dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));
		carEl.innerHTML = params.name;
		daysEl.innerHTML = `Rental days: ${dayDiff}`;
		pickUpEl.innerHTML = `Pick up date: ${pickUpDate.toDateString()}`;
		handInEl.innerHTML = `Hand in date: ${handInDate.toDateString()}`;
		accTotalEl.innerHTML = `Accessories total ${acc.reduce(
			(acc, curr) => acc + curr.price,
			0
		)}DKK`;
	};

	const inputListener = () => {
		//
	};

	const registerListeners = () => {
		const inputs = getInputs();
		inputs.forEach((i) => {
			i.addEventListener("change", inputListener);
		});
	};

	const init = () => {
		registerListeners();
		render();
	};

	init();
})();
