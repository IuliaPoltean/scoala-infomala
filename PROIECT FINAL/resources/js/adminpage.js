let url = "https://final-project-1edb8-default-rtdb.firebaseio.com/products/"

//CRUD = Create, Read, Update, Delete;
let productList = {};
let editIndex = -1;

async function getProducts() {
    const response = await fetch(url + ".json");
    productList = await response.json();
    if (productList === null) {
        productList = {};
    }

    drawList();
}

function drawList() {
    let str = "";
    for (let [id, product] of Object.entries(productList)) {
        let imageUrl = "https://gfsstore.com/wp-content/themes/gfsstore.com/images/no_image_available.png";

        if (product.image) {
            imageUrl = product.image;
        }

        str += `
            <tr>    
                <td class="artifactColumn productImagesNEW"><img src ='${imageUrl}'></img></td>
                <td class="nameColumn">${product.name}</td>
                <td class="descriptionColumn">${product.description}</td>
                <td class="centerText priceColumn">$${product.price}</td>
                <td class="centerText stockColumn">
                    XS: ${product.stock.xs}<br />
                    S: ${product.stock.s}<br />
                    M: ${product.stock.m}<br />
                    L: ${product.stock.l}<br />
                    XL: ${product.stock.xl}<br />
                </td>
                <td class="artifactColumn"><button onclick="showEditForm('${id}')" class="adminBtn editBtn"><i class="fa fa-pencil"></i></button></td>
                <td class="artifactColumn"><button onclick="delProduct('${id}')" class="adminBtn removeBtn"><i class="fa fa-trash"></i></button></td>
            </tr>
        `
    }
    document.querySelector("#productList").innerHTML = str;

    recalculateCartCounter();
}

function showCreateForm() {
    document.getElementById("saveBtn").onclick = function() {saveProduct()};
    document.getElementById('formTitle').innerHTML = "Add Product";
    showForm();
}

function showEditForm(idx) {
    document.getElementById('formTitle').innerHTML = "Edit Product";
    document.getElementById("saveBtn").onclick = function() {updateProduct()};

    editIndex = idx;
    showForm();
    fillForm(productList[idx]);
}

function cancel() {
    editIndex = -1;
    document.querySelector("form").reset();

    hideForm();
}

function fillForm(productToEdit) {
    document.querySelector("[name='name']").value = productToEdit.name;
    document.querySelector("[name='description']").value = productToEdit.description;
    document.querySelector("[name='price']").value = productToEdit.price;
    document.querySelector("[name='image']").value = productToEdit.image;
    document.querySelector("[name='stock-xs']").value = productToEdit.stock.xs;
    document.querySelector("[name='stock-s']").value = productToEdit.stock.s;
    document.querySelector("[name='stock-m']").value = productToEdit.stock.m;
    document.querySelector("[name='stock-l']").value = productToEdit.stock.l;
    document.querySelector("[name='stock-xl']").value = productToEdit.stock.xl;
}

async function saveProduct() {
    if(!validate()){
        return;
    }

    let name = document.querySelector("[name='name']").value;
    let description = document.querySelector("[name='description']").value;
    let price = document.querySelector("[name='price']").value;
    let image = document.querySelector("[name='image']").value;
    let stock = {
        xs: document.querySelector("[name='stock-xs']").value,
        s: document.querySelector("[name='stock-s']").value,
        m: document.querySelector("[name='stock-m']").value,
        l: document.querySelector("[name='stock-l']").value,
        xl: document.querySelector("[name='stock-xl']").value
    }

    const response = await fetch(url + ".json", {
        method: "post",
        body: JSON.stringify({
            "name": name,
            "description": description,
            "price": price,        
            "stock": stock,
            "image": image,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    await response.json();

    await getProducts();
  
    hideForm();
}

async function updateProduct() {
    if(!validate()){
        return;
    }

    if (editIndex === -1) {
        return;
    }

    let name = document.querySelector("[name='name']").value;
    let description = document.querySelector("[name='description']").value;
    let price = document.querySelector("[name='price']").value;
    let image = document.querySelector("[name='image']").value;
    let stock = {
        xs: document.querySelector("[name='stock-xs']").value,
        s: document.querySelector("[name='stock-s']").value,
        m: document.querySelector("[name='stock-m']").value,
        l: document.querySelector("[name='stock-l']").value,
        xl: document.querySelector("[name='stock-xl']").value
    }
 
    const response = await fetch(url + editIndex + ".json", {
        method: "put",
        body: JSON.stringify({
            "name": name,
            "description": description,
            "price": price,      
            "stock": stock,
            "image": image,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    await response.json();
    await getProducts();

    cancel();
}

async function delProduct(idx) {
    if (confirm(`Esti sigur ca vrei sa stergi produsul ${productList[idx].name} ?`)) {
        const response = await fetch(url + idx + ".json", {
            method: "delete"
        });
        await response.json();

        await getProducts();
    }

}

function hideForm() {
    document.getElementById('formAddProduct').classList.add('hidden');
    document.getElementById('formAddProduct').classList.remove('show');

    document.getElementById('productListingContainer').classList.add('show');
    document.getElementById('productListingContainer').classList.remove('hidden');
}

function showForm() {
    document.getElementById('formAddProduct').classList.remove('hidden');
    document.getElementById('formAddProduct').classList.add('show');

    document.getElementById('productListingContainer').classList.remove('show');
    document.getElementById('productListingContainer').classList.add('hidden');
}

function validate(){
	let name = document.querySelector("[name='name']").value;
    let description = document.querySelector("[name='description']").value;
    let price = document.querySelector("[name='price']").value;    
    let xs = document.querySelector("[name='stock-xs']").value;
    let s = document.querySelector("[name='stock-s']").value;
    let m = document.querySelector("[name='stock-m']").value;
    let l = document.querySelector("[name='stock-l']").value;  
    let xl = document.querySelector("[name='stock-xl']").value;  
    let image = document.querySelector("[name='image']").value;

    if (name == null || name ===''){
        alert('Please fill out all fields. Thank you!');
        return false;
    }

    return true;
}

