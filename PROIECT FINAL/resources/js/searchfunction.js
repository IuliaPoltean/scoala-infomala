function searchProduct() {
	let productListHtml = document.querySelectorAll(".product")
    let searchedFor = document.querySelector("#search").value;
    for(let i=0;i<productList.length;i++) {
		if(productList[i]===null) {
            continue;
        }
        if(!productList[i].name.includes(searchedFor)){
            productListHtml[i].classList.add("hidden");
        } else {
			productListHtml[i].classList.remove("hidden");
		}

    }
}