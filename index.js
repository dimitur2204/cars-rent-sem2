const numberOfPeople = document.getElementById("number-of-people").value;
const numberOfSuitcases = document.getElementById("number-of-suitcases").value;

const form = document.getElementById("search-form");

function carBuilder(car) {
	return `
    <section class="card">
        <section class="car-image-heading">
            <img
                src="${car.imageUrl}"
                alt="Image of a car"
                class="car-icon"
            />
            <h1>${car.model}</h1>
        </section>
        <p class="card-text">
            ${car.description}
        </p>
        <section class="book">
            <span class="price">DKK ${car.price}</span>
            <button>Book now</button>
        </section>
    </section>
    `;
}

form.addEventListener("submit", function submitHandler() {});
