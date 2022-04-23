window.onload = () => {
    const products = [];
    const selproduct = document.getElementById('selproduct');
    fetch('/api/FoodStock/GetAllProducts', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json()
    ).then(data => {
        for (let i = 0; i < data.length; i++) products.push(data[i]);
        for (let i = 0; i < products.length; i++) {
            const option = document.createElement('option');
            option.value = products[i].id;
            option.innerText = "(" + products[i].id + ") " + products[i].name + " - " + (products[i].isInStock ? "" : "Not ") + "In Stock";
            selproduct.querySelector("#cat" + products[i].category).appendChild(option);
        }
    }).catch(error => {
        console.log(error);
    });
};

const selectedproduct = document.getElementById('selproduct');
const delprod = document.getElementById('delprod');
const savebutton = document.getElementById('savebutton');
const outofstockcheckbox = document.getElementById('outofstock');
const category = document.getElementById('category');
const idfield = document.getElementById('id');
const namefield = document.getElementById('name');
const changestockbutton = document.getElementById('changestockbutton');
const subcategoryfield = document.getElementById('subcategory');

selectedproduct.onchange = () => {
    fetch('/api/FoodStock/GetProduct?id=' + selectedproduct.value, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json()
    ).then(data => {
        idfield.value = data.id;
        namefield.value = data.name;
        outofstockcheckbox.checked = !data.isInStock;
        category.value = data.category;
        subcategoryfield.value = data.secondCategory;
    }).catch(error => {
        console.log(error);
    });

    delprod.disabled = false;
    savebutton.disabled = false;
    outofstockcheckbox.disabled = false;
    category.disabled = false;
    namefield.disabled = false;
    changestockbutton.disabled = false;
    idfield.disabled = false;
    subcategoryfield.disabled = false;
}


delprod.onclick = () => {
    fetch('/api/FoodStock/DeleteProduct?productId=' + selectedproduct.value, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(data => {
        if(data.status == 200) {
            document.write(`
            <html lang="en">
                <head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="/uistyle.css"><link rel="shortcut icon" type="image/png" href="/assets/burger.png"/><title>Produkt gelöscht</title></head>
                <body><img onclick="document.location = '/orders'" src="/assets/ui/orders.png" width="40px" height="40px" id="homeicon">
                    <h1 style="text-decoration: underline; text-align: center; margin-top: 70px; margin-bottom: 60px;">Produkt erfolgreich gelöscht</h1>
                    <button class="btn" onclick="document.location='/orders'">Zurück</button></body>
            </html>`);
        }
    }).catch(error => {
        console.log(error);
    });
};

changestockbutton.onclick = () => {
    if (changestockbutton.classList.contains("markasinstockbutton")) {
        changestockbutton.classList.remove("markasinstockbutton");
        changestockbutton.classList.add("markasoutofstockbutton");
        changestockbutton.innerText = "Markieren als 'Auf Lager'";
        changeStockStatus(true);
    } else if (changestockbutton.classList.contains("markasoutofstockbutton")) {
        changestockbutton.classList.remove("markasoutofstockbutton");
        changestockbutton.classList.add("markasinstockbutton");
        changestockbutton.innerText = "Markieren als 'Nicht auf Lager'";
        changeStockStatus(false);
    }
}


function changeStockStatus(instock) {
    fetch('/api/FoodStock/SetProductInStock/' + instock + '?productId=' + selectedproduct.value, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(data => {
        if(data.status == 200) {
            document.write(`
            <html lang="en">
                <head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="/uistyle.css"><link rel="shortcut icon" type="image/png" href="/assets/burger.png"/><title>Produkt gelöscht</title></head>
                <body><img onclick="document.location = '/orders'" src="/assets/ui/orders.png" width="40px" height="40px" id="homeicon">
                    <h1 style="text-decoration: underline; text-align: center; margin-top: 70px; margin-bottom: 60px;">Produkt erfolgreich als 'Nicht auf Lager' makiert</h1>
                    <button class="btn" onclick="document.location='/orders'">Zurück</button></body>
            </html>`);
        }
    }).catch(error => {
        console.log(error);
    });

}


document.getElementById('orderform').onsubmit = (e) => {
    e.preventDefault();
    fetch('/api/FoodStock/UpdateProduct?id=' + selectedproduct.value, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: idfield.value,
            name: namefield.value,
            isInStock: !outofstockcheckbox.checked,
            category: category.value,
            secondcategory: subcategoryfield.value
        })
    }).then(data => {
        if(data.status == 200) {
            document.write(`<html lang="en">
            <head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/uistyle.css"><link rel="shortcut icon" type="image/png" href="/assets/burger.png"/><title>Produkt gelöscht</title></head>
            <body><img onclick="document.location = '/orders'" src="/assets/ui/orders.png" width="40px" height="40px" id="homeicon">
                <h1 style="text-decoration: underline; text-align: center; margin-top: 70px; margin-bottom: 60px;">Produkt erfolgreich geändert</h1>
                <button class="btn" onclick="document.location='/orders'">Zurück</button></body>
        </html>`);
        }
    }).catch(error => {
        console.log(error);
    });
}


document.onkeyup = (event) => {
    if (event.key == "Escape") document.location = "/orders";
}