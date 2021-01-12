let items = [];

function draw() {
    let str = "";

    for (let i = 0; i < items.length; i++) {
        if (items[i].action === "marked") {
            str += `
					<tr>
						<td class="lineThrough">${items[i].item}</td>
						<td> <input class="btnMark" type="button" name="boughtItem" value="Mark as buyed" onclick="markAsBuyed(${i});"></td>
					</tr>
					`
        } else {
            str += `
					<tr>
						<td class="onList">${items[i].item}</td>
						<td><input class="btnMark" type="button" name="boughtItem" value="Mark as buyed" onclick="markAsBuyed(${i});"></td>
					</tr>
					`
        }
    }
    
    document.querySelector(".tbodyField").innerHTML = str;
}

function adauga() {
    let item = document.querySelector("[name='item']").value;

    items.push({ "item": item });
    document.querySelector("#listField").classList.remove("hidden");
    draw();
    document.querySelector("form").reset();
}

function markAsBuyed(idx) {
    for (let i = 0; i < items.length; i++) {
        if (i === idx) {
            items[i].action = "marked";
        }
    }
    draw();
}

function compareAsc(a, b) {
    if (a.item < b.item) {
        return -1;
    }
    if (a.item > b.item) {
        return 1;
    }
    return 0;
}

function compareDesc(a, b) {
    if (a.item > b.item) {
        return -1;
    }
    if (a.item < b.item) {
        return 1;
    }
    return 0;
}

function sortAsc() {
    items.sort(compareAsc);
    draw();
}

function sortDesc() {
    items.sort(compareDesc);
    draw();
}
