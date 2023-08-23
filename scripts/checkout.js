function addToCart(prodName, price, button) {
	let productCount = button.previousElementSibling?.value?.split(".")[0];
	if (!productCount) return alert("Product count is required");

	if (Number(productCount) <= 0) {
		return alert("Quantity must be greater than 0");
	}

	localStorage.setItem(
		"product" + Date.now(),
		JSON.stringify({ prodName, price, quantity: productCount })
	);
	alert(`Item added successfully!`);
	window.location.href = "cart.html";
}