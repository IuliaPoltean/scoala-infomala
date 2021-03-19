// Adding the products to the home page

let url = "https://final-project-1edb8-default-rtdb.firebaseio.com/products/"

let productList = {};
let editIndex = -1;
let sizeSelected = null;

async function getProductsToFrontend() {
	const response = await fetch(url + ".json");
	productList = await response.json();
	if (productList === null) {
		productList = {};
	}

	frontendListDraw();
}

function frontendListDraw() {
	let str = "";
	for (let [id, product] of Object.entries(productList)) {
		let imageUrl = "https://gfsstore.com/wp-content/themes/gfsstore.com/images/no_image_available.png";

		if (product.image) {
			imageUrl = product.image;
		}

		str += `
			<div class="productBox">
				<div class="product">
					<div class="productGrid">
						<div class="productImages"><img src ='${imageUrl}' /></div>
						<div class="overlay">
							<a href="details.html?productId=${id}" class="icon">
								<i class="fa fa-eye"></i>
							</a>
						</div>
					</div>
					<div class="desc">
						<h3><a href="details.html?productId=${id}">${product.name}</a></h3>
						<span class="price">$${product.price}</span>
					</div>
				</div>
			</div>
        `
	}
	document.querySelector(".gridContainer").innerHTML = str;

	recalculateCartCounter();
}

async function frontendDetailsDraw() {
	let productId = getParameterByName("productId");

	const response = await fetch(url + '/' + productId + ".json");
	product = await response.json();

	document.querySelector(".name").innerHTML = product.name;
	document.querySelector(".price").innerHTML = '$' + product.price;
	document.querySelector(".description").innerHTML = product.description;

	document.querySelector(".sizeChoose").innerHTML = determineSizeString(product);

	let imageUrl = "https://gfsstore.com/wp-content/themes/gfsstore.com/images/no_image_available.png";
	if (product.image) {
		imageUrl = product.image;
	}

	document.querySelector(".swiper-wrapper").innerHTML = `<div class="swiper-slide"><img src="${imageUrl}" /></div>`;

	document.querySelectorAll('.sizeButton').forEach(item =>
		item.addEventListener("click", event => {
			sizeSelected = event.target.value;
		})
	);

	recalculateCartCounter();
}

function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

async function addToCart() {

	let validation = validate();
	validation.then(response => {
		let quantity = document.getElementById('quantity').value;
		let productId = getParameterByName("productId");
		let size = sizeSelected;

		let currentCartData = JSON.parse(localStorage.getItem('cart'));

		if (currentCartData == null) {
			currentCartData = [];
		}

		currentCartData.push({
			productId: productId,
			size: size,
			quantity: quantity
		});

		localStorage.setItem('cart', JSON.stringify(currentCartData));

		// Toast message
		btnAddToCartToast();

		// Update cart icon
		recalculateCartCounter();
		sizeSelected = null;

	}).catch(err => {
		
		alert(err);
	});
}

function btnAddToCartToast() {
	let x = document.getElementById("toastMessageAddToCart");
	x.className = "show";
	setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

async function validate() {
	let productId = getParameterByName("productId");

	const response = await fetch(url + '/' + productId + ".json");
	product = await response.json();

	if (product == null) {
		throw new Error("Inexistent product");
	}

	let validSizes = ['xs', 's', 'm', 'l', 'xl',]
	let size = sizeSelected;
	if (!validSizes.includes(size)) {
		throw new Error("Invalid size. Please select a size!");
	}

	let quantity = document.getElementById('quantity').value;
	switch (size) {
		case 'xs':
			dbQuantity = product.stock.xs;
			break;
		case 's':
			dbQuantity = product.stock.s;
			break;
		case 'm':
			dbQuantity = product.stock.m;
			break;
		case 'l':
			dbQuantity = product.stock.l;
			break;
		case 'xl':
			dbQuantity = product.stock.xl;
			break;
	}

	if (parseInt(quantity) > parseInt(dbQuantity)) {
		throw new Error("The amount exceeds stock size");
	}
	Promise.resolve();
}

function determineSizeString(product) {
	let sizeString = ''

	if (product.stock?.xs <= 0) {
		sizeString += `<button disabled class="sizeButton lineThrough" value="xs" title='OUT OF STOCK'>XS</button>`
	} else {
		sizeString += `<button class="sizeButton" value="xs" title='In stock: ${product.stock?.xs}'>XS</button>`
	}

	if (product.stock?.s <= 0) {
		sizeString += `<button disabled class="sizeButton lineThrough" value="s" title='OUT OF STOCK'>S</button>`
	} else {
		sizeString += `<button class="sizeButton" value="s" title='In stock: ${product.stock?.s}'>S</button>`
	}

	if (product.stock?.m <= 0) {
		sizeString += `<button disabled class="sizeButton lineThrough" value="m" title='OUT OF STOCK'>M</button>`
	} else {
		sizeString += `<button class="sizeButton" value="m" title='In stock: ${product.stock?.m}'>M</button>`
	}

	if (product.stock?.l <= 0) {
		sizeString += `<button disabled class="sizeButton lineThrough" value="l" title='OUT OF STOCK'>L</button>`
	} else {
		sizeString += `<button class="sizeButton" value="l" title='In stock: ${product.stock?.l}'>L</button>`
	}

	if (product.stock?.xl <= 0) {
		sizeString += `<button disabled class="sizeButton lineThrough" value="xl" title='OUT OF STOCK'>XL</button>`
	} else {
		sizeString += `<button class="sizeButton" value="xl" title='In stock: ${product.stock?.xl}'>XL</button>`
	}

	return sizeString;
}

// recuce 

// dbconnect
// edit id
//  - 5 size . xl

//  save db