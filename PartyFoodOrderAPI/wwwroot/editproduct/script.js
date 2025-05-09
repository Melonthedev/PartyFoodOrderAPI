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
const selfservicecheckbox = document.getElementById('isselfservice');
const category = document.getElementById('category');
const namefield = document.getElementById('name');
const changestockbutton = document.getElementById('changestockbutton');
const subcategoryfield = document.getElementById('subcategory');
const imageurlfield = document.getElementById('imageurl');
const imagefilefield = document.getElementById('imageFile');
const descriptionfield = document.getElementById('description');

selectedproduct.onchange = () => {
    fetch('/api/FoodStock/GetProduct?id=' + selectedproduct.value, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json()
    ).then(data => {
        namefield.value = data.name;
        outofstockcheckbox.checked = !data.isInStock;
        selfservicecheckbox.checked = data.isSelfService;
        category.value = data.category;
        subcategoryfield.value = data.subCategory;
        imageurlfield.value = data.imageUrl;
        descriptionfield.value = data.description;
        if (!data.isInStock) {
            changestockbutton.setAttribute('instock', 'false');
            changestockbutton.innerText = "Markieren als 'Auf Lager'";
        } else {
            changestockbutton.setAttribute('instock', 'true');
            changestockbutton.innerText = "Markieren als 'Nicht auf Lager'";
        }
    }).catch(error => {
        console.log(error);
    });

    delprod.disabled = false;
    savebutton.disabled = false;
    outofstockcheckbox.disabled = false;
    selfservicecheckbox.disabled = false;
    category.disabled = false;
    namefield.disabled = false;
    changestockbutton.disabled = false;
    subcategoryfield.disabled = false;
    imageurlfield.disabled = false;
    imagefilefield.disabled = false;
    descriptionfield.disabled = false;
}


delprod.onclick = () => {
    fetch('/api/FoodStock/DeleteProduct?productId=' + selectedproduct.value, {
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
                    <h1 style="text-decoration: underline; text-align: center; margin-top: 70px; margin-bottom: 60px;">Produkt erfolgreich gelöscht</h1>
                    <button class="btn" onclick="document.location='/orders'">Zurück</button></body>
            </html>`);
        }
    }).catch(error => {
        console.log(error);
    });
};

changestockbutton.onclick = () => {
    if (changestockbutton.getAttribute('instock') == 'true') {
        changestockbutton.setAttribute('instock', 'false');
        changestockbutton.innerText = "Markieren als 'Auf Lager'";
        changeStockStatus(false);
    } else {
        changestockbutton.setAttribute('instock', 'true');
        changestockbutton.innerText = "Markieren als 'Nicht auf Lager'";
        changeStockStatus(true);
    }
}


function changeStockStatus(instock) {
    fetch('/api/FoodStock/SetProductInStock/' + instock + '?productId=' + selectedproduct.value, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(data => {
        if(data.status == 200) {
            var query = instock ? "Auf Lager" : "Nicht auf Lager";
            document.write(`
            <html lang="en">
                <head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="/uistyle.css"><link rel="shortcut icon" type="image/png" href="/assets/burger.png"/><title>Produkt gelöscht</title></head>
                <body><img onclick="document.location = '/orders'" src="/assets/ui/orders.png" width="40px" height="40px" id="homeicon">
                    <h1 style="text-decoration: underline; text-align: center; margin-top: 70px; margin-bottom: 60px;">Produkt erfolgreich als '` + query + `' makiert</h1>
                    <button class="btn" onclick="document.location='/orders'">Zurück</button></body>
            </html>`);
        }
    }).catch(error => {
        console.log(error);
    });

}


document.getElementById('orderform').onsubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", namefield.value);
    formData.append("Category", category.value);
    formData.append("IsInStock", !outofstockcheckbox.checked);
    formData.append("SubCategory", subcategoryfield.value);
    formData.append("Description", descriptionfield.value);
    formData.append("IsSelfService", selfservicecheckbox.checked);

    if (document.getElementById('imageFile').files.length > 0) {
        formData.append('Image', document.getElementById('imageFile').files[0]);
    } else {
        formData.append("ImageUrl", imageurlfield.value);
    }


    fetch('/api/FoodStock/UpdateProduct?id=' + selectedproduct.value, {
        method: 'PATCH',
        body: formData
    }).then(response => {
        console.log(response);
        if (response.status != 200) response.text().then(async data => {
            console.log(data);
            var errors = JSON.parse(data).errors;
            var errorMessage = Object.values(errors)[0];
            console.log(errorMessage);
            document.getElementById("errorlabel").innerHTML = "Folgender Fehler ist während der Bearbeitung deiner Anfrage aufgetreten: <br><strong><u>" + errorMessage + "</u></strong><br>Bitte vergewissere dich, dass die ID deines Produktes noch nicht existiert.";
        });
        else {
            document.getElementById("errorlabel").innerText = "";
            document.write(`
            <html lang="de">
                <head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" type="text/css" href="/uistyle.css"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap" rel="stylesheet"><link rel="icon" href="/burger.png"><title>Erfolgreich</title></head>
                <body><img onclick="document.location = '/orders'" src="/assets/ui/orders.png" width="40px" height="40px" id="homeicon"><h1 style="margin-top: 70px; margin-bottom: 60px;">Erfolgreich geändert!</h1><p class="label" style="text-align: center; font-size: 150%">Produkt wurde erfolgreich bearbeitet.</p><p class="label" style="text-align: center; font-size: 150%"><a href="/orders" style="color: white;">Zurück zur Bestellübersicht</a></p></body>
            </html>
            `);
        }
    }).catch(error => {
        document.getElementById("errorlabel").innerText = "Der folgende Fehler ist während der Bearbeitung deiner Anfrage aufgetreten: " + error + "\nBitte vergewissere dich, dass die ID deines Produktes noch nicht existiert.";
        console.error(error);
    });
}


document.onkeyup = (event) => {
    if (event.key == "Escape") document.location = "/orders";
}