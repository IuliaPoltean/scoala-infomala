// Input Type Number Plus Minus Buttons 
// quantity box 

function wcqib_refresh_quantity_increments() {
    jQuery("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").each(function (a, b) {
        var c = jQuery(b);
        c.addClass("buttons_added"), c.children().first().before('<input type="button" value="-" class="minus" />'), c.children().last().after('<input type="button" value="+" class="plus" />')
    })
}
String.prototype.getDecimals || (String.prototype.getDecimals = function () {
    var a = this,
        b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0
}), jQuery(document).ready(function () {
    wcqib_refresh_quantity_increments()
}), jQuery(document).on("updated_wc_div", function () {
    wcqib_refresh_quantity_increments()
}), jQuery(document).on("click", ".plus, .minus", function () {
    var a = jQuery(this).closest(".quantity").find(".qty"),
        b = parseFloat(a.val()),
        c = parseFloat(a.attr("max")),
        d = parseFloat(a.attr("min")),
        e = a.attr("step");
    b && "" !== b && "NaN" !== b || (b = 0), "" !== c && "NaN" !== c || (c = ""), "" !== d && "NaN" !== d || (d = 0), "any" !== e && "" !== e && void 0 !== e && "NaN" !== parseFloat(e) || (e = 1), jQuery(this).is(".plus") ? c && b >= c ? a.val(c) : a.val((b + parseFloat(e)).toFixed(e.getDecimals())) : d && b <= d ? a.val(d) : b > 0 && a.val((b - parseFloat(e)).toFixed(e.getDecimals())), a.trigger("change")
});

// Page Layout

let url = "https://final-project-1edb8-default-rtdb.firebaseio.com/products/"

let cartList = {};
const tax = 9;
const shipping = 10;

async function drawShoppingCart() {
    cartList = JSON.parse(localStorage.getItem('cart'));

    if (cartList == null || cartList.length < 1) {
        document.getElementById('shoppingCartDataContainer').innerHTML = "Cosul tau de cumparaturi e gol!"
        return;
    }

    shoppingCartListDraw();
}

async function shoppingCartListDraw() {
    let str = "";
    let total = taxValue = grandTotal = 0;

    for (cartItem of cartList) {
        const response = await fetch(url + cartItem.productId + ".json")
        let product = await response.json();

        let imageUrl = "https://gfsstore.com/wp-content/themes/gfsstore.com/images/no_image_available.png";
        if (product.image) {
            imageUrl = product.image;
        }

        str += `
            <tr id="shoppingCartTableGrid">
                <div class="leftColumn">
                    <td class="productImages"><img src='${imageUrl}' /></td>
                    <td><a href="details.html?productId=${cartItem.productId}">${product.name}</a></td>
                </div>
                <div class="rightColumn">
                    <td>$${product.price}</td>
                    <td>${cartItem.size.toUpperCase()}</td>
                    <td>
                        <div class="quantity buttons_added">
                            <input type="button" value="-" class="minus"><input type="number" step="1" onchange="amountChanged(event, '${cartItem.productId}')"
                                min="1" max="" name="quantity" value="${cartItem.quantity}" title="Qty"
                                class="input-text qty text" size="4" pattern="" inputmode=""><input
                                type="button" value="+" class="plus" onchange="incrementAmount('${cartItem.productId}')">
                        </div>
                    </td>
                    <td>${product.price * cartItem.quantity}</td>
                    <td><button onclick="delProductShoppingCart('${cartItem.productId}')" class="shoppingCartDelBtn removeBtn"><i class="fa fa-trash"></i></button></td>
                </div>
            </tr>
        `

        total += product.price * cartItem.quantity;
    }

    taxValue = (total * tax) / 100;
    grandTotal = total + taxValue + shipping;

    document.querySelector("#shoppingCart tbody").innerHTML = str;
    document.querySelector("#cart-shipping").innerHTML = '$' + shipping;
    document.querySelector("#cart-tax").innerHTML = '$' + taxValue;
    document.querySelector("#cart-tax-percentage").innerHTML = 'Tax (' + tax + '%)';
    document.querySelector("#cart-total").innerHTML = '$' + grandTotal;

    document.querySelectorAll('.sizeButton').forEach(item =>
        item.addEventListener("click", event => {
            sizeSelected = event.target.value;
        })
    );

    recalculateCartCounter();
}

async function delProductShoppingCart(idx) {
    if (confirm(`Esti sigur ca vrei sa stergi productul?`)) {
        let currentCartData = JSON.parse(localStorage.getItem('cart'));

        for (let i = 0; i < currentCartData.length; i++) {
            if (currentCartData[i].productId == idx) {
                currentCartData.splice(i, 1)
            }
        }
        localStorage.setItem('cart', JSON.stringify(currentCartData));

        recalculateCartCounter();
        await drawShoppingCart();
    }

}

async function amountChanged(event, productId) {
    let currentQuantitySelected = event.target.value;

    let currentCartData = JSON.parse(localStorage.getItem('cart'));
    let validStock = false;

    for (let i = 0; i < currentCartData.length; i++) {
        if (currentCartData[i].productId == productId) {
            let validation = validateStock(productId, currentQuantitySelected, currentCartData[i].size);
            validation.then(response => {
                currentCartData[i].quantity = currentQuantitySelected;


                localStorage.setItem('cart', JSON.stringify(currentCartData));

                recalculateCartCounter();
                drawShoppingCart();
            }).catch(err => {
                
                alert(err);                
                drawShoppingCart();
            });
        }
    }
}

async function validateStock(productId, currentQuantitySelected, size) {
    const response = await fetch(url + '/' + productId + ".json");
    product = await response.json();

    if (product == null) {
        throw new Error("Inexistent product");
    }

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

    if (parseInt(currentQuantitySelected) > parseInt(dbQuantity)) {
        throw new Error("The amount exceeds stock size");
    }

    return true;
}




