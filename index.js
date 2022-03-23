(function indexPageIIFE() {
	const setLoader = (load) => {
		const loader = document.getElementById("loader");
		loader.style.visibility = load ? "initial" : "hidden";
	};
	const main = document.getElementById("main-content");
	const form = document.getElementById("search-form");

	function carTemplateBuilder({ cars }, predicateFn) {
		return cars.filter(predicateFn).map(
			(car) =>
				`
				<div class="card col p-0 m-2">
					<img src="${car.imageUrl}" class="card-img-top">
					<div class="card-body">
						<h5 class="card-title">${car.name}</h5>
						<p class="card-text">
						${car.description}</p>
						<a href="accesory.html?name=${car.name}&price=${car.price}" class="btn btn-primary">Book now</a>
					</div>
					</div>`
		);
	}

	form.addEventListener("submit", function submitHandler(event) {
		event.preventDefault();
		const numberOfPeople = document.getElementById("people").value;
		const numberOfSuitcases = document.getElementById("suitcases").value;
		const pickUpDate = document.getElementById("pickUp").value;
		const handInDate = document.getElementById("handIn").value;
		window.localStorage.setItem("handInDate", handInDate);
		window.localStorage.setItem("pickUpDate", pickUpDate);
		setLoader(true);
		fetch(
			"https://raw.githubusercontent.com/dimitur2204/cars-rent-sem2/main/cars.json"
		)
			.then((res) => res.json())
			.then((data) => {
				setLoader(false);
				main.innerHTML = "";
				main.innerHTML = carTemplateBuilder(
					{ cars: data, pickUpDate, handInDate },
					(car) =>
						car.seats >= numberOfPeople && car.suitcasesFit >= numberOfSuitcases
				);
			})
			.catch((err) => {
				setLoader(false);
				main.innerHTML = err.message || err;
			});
	});
})();
