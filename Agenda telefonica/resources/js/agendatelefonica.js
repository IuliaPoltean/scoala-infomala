let indexEditare = -1;

let contacts = [
    {
        "nume": "Daniel",
        "telefon": "0749381631"
    },
    {
        "nume": "Antonia",
        "telefon": "0749381610"
    }
];

function draw() {
    indexEditare = -1;
    let str = "";

    for (let i = 0; i < contacts.length; i++) {
        str += `
        <tr>
            <td> ${contacts[i].nume}</td>
            <td> ${contacts[i].telefon}</td>
            <td> <img class="edit" src="icons/editIcon.png" onclick="edit(${i});" /></td>
            <td> <img class="delete" src="icons/deleteIcon.png" onclick="del(${i});" /></td>
        </tr>
        `
    }

    document.querySelector(".tableField tbody").innerHTML = str;
    document.querySelector("form").reset();
}

function edit(idx) {
    let contact = contacts[idx];
    document.querySelector("[name='nume']").value = contact.nume;
    document.querySelector("[name='telefon']").value = contact.telefon;
    indexEditare = idx;
}

function saveEdit() {
    let contact = contacts[indexEditare];

    contact.nume = document.querySelector("[name='nume']").value;
    contact.telefon = document.querySelector("[name='telefon']").value;
    draw();
}

function saveData() {
    if (validateData() === false) {
        return;
    }

    if (indexEditare !== -1) {
        saveEdit();
    } else {
        adauga();
    }
}

function del(idx) {
    if (confirm(`Are you sure you want to delete ${contacts[idx].nume}?`)) {
        contacts.splice(idx, 1);
        draw();
    }
}

function adauga() {
    let nume = document.querySelector("[name='nume']").value;
    let telefon = document.querySelector("[name='telefon']").value;

    contacts.push({
        "nume": nume,
        "telefon": telefon
    });
    draw();
}

function validateData() {
    let nume = document.querySelector("[name='nume']").value;
    let telefon = document.querySelector("[name='telefon']").value;

    if (nume === "" || telefon === "") {
        return false;
    }

    if (isNaN(telefon)) {
        alert("The number you introduced is invalid");
        return false;
    }

    return true;
}

function onKey(elem, e) {
    console.log(e.which);
    var code = e.keyCode || e.which;
    if (code == 13) {
        e.preventDefault();
        return false;
    }
}