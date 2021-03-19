function recalculateCartCounter() {
	let currentCartData = JSON.parse(localStorage.getItem('cart'));

	if (currentCartData == null) {
		currentCartData = [];
	}

	totalItems = 0;

	if (currentCartData.length >= 1) {
		currentCartData.forEach(element => {
			totalItems += parseInt(element.quantity);
		});
	}

	document.querySelector('#stockCounter').textContent = totalItems;
}
