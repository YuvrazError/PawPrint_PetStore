const form = document.getElementById("buyer-form");

async function handleSubmit(event) {
	event.preventDefault();
	let totalQuantity = 0,
		totalPrice = 0;

	const data = new FormData(event.target);

	for (const [key, value] of Object.entries(localStorage)) {
        const prodInformation = JSON.parse(value);
		try {
			data.append(
				key,
				`Product Name: ${prodInformation.prodName}, Price: $_${+prodInformation.price}, Quantity: ${prodInformation.quantity}`
			);
			totalPrice += Number(prodInformation.price);
			totalQuantity += Number(prodInformation.quantity);
		} catch (err) {
			console.error(err.message);
			continue;
		}
	}

	data.append("Total Price:", `$_${totalPrice}`);
	data.append("Total Quantity:", totalQuantity);

	fetch(event.target.action, {
		method: form.method,
		body: data,
		headers: {
			Accept: "application/json",
		},
	})
		.then((response) => {
			if (response.ok) {
				alert("Thanks for your submission!");
				form.reset();
				localStorage.clear();
				window.location.href = "/";
			} else {
				response.json().then((data) => {
					if (Object.hasOwn(data, "errors")) {
						alert(data["errors"].map((error) => error["message"]).join(", "));
					} else {
						alert("Oops! There was a problem submitting your form");
					}
				});
			}
		})
		.catch((error) => {
			alert("Oops! There was a problem submitting your form");
		});
}
form.addEventListener("submit", handleSubmit);
