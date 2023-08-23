const cartItems = document.getElementById("cart-items");

let totalQuantity = 0,
	totalPrice = 0,
	fixedPrice = 0;

for (const [key, value] of Object.entries(localStorage)) {
	let parsedObj = {};
	try {
		parsedObj = JSON.parse(value);
	} catch (err) {
		console.error(err.message);
		continue;
	}

	const tr = document.createElement("tr");

	totalQuantity += Number(parsedObj["quantity"]);
	totalPrice += Number(parsedObj["price"]);
	fixedPrice = totalPrice.toFixed(2);

	for (const [key, value] of Object.entries(parsedObj)) {
		const td = document.createElement("td");
		td.textContent = value;

		tr.appendChild(td);
		cartItems.appendChild(tr);
	}
}

const rowValues = ["Total:", fixedPrice, totalQuantity];

const tr = document.createElement("tr");

rowValues.forEach((value) => {
	const td = document.createElement("td");
	td.textContent = value;
	tr.appendChild(td);
});

cartItems.appendChild(tr);

function clearCart() {
	localStorage.clear();
	window.location.href = "/cart-items.html";
}
