const main = document.getElementById("main-content");

const form = document.getElementById("search-form");

function carTemplateBuilder(cars, predicateFn) {
	return cars.filter(predicateFn).map(
		(car) =>
			`
    <section class="card">
        <section class="car-image-heading">
            <img
                src="${car.imageUrl}"
                alt="Image of a car"
                class="car-icon"
            />
            <h1>${car.name}</h1>
        </section>
        <p class="card-text">
            ${car.description}
        </p>
        <section class="book">
            <span class="price">DKK ${car.price}</span>
            <button>Book now</button>
        </section>
    </section>
    `
	);
}

form.addEventListener("submit", function submitHandler(event) {
	event.preventDefault();
	const numberOfPeople = document.getElementById("number-of-people").value;
	const numberOfSuitcases = document.getElementById(
		"number-of-suitcases"
	).value;

	fetch(
		"https://raw.githubusercontent.com/dimitur2204/cars-rent-sem2/main/cars.json"
	)
		.then((res) => res.json())
		.then((data) => {
			main.innerHTML = "";
			main.innerHTML = carTemplateBuilder(
				data,
				(car) =>
					car.seats >= numberOfPeople && car.suitcasesFit >= numberOfSuitcases
			);
		})
		.catch((err) => {
			main.innerHTML = err.message || err;
		});
});
