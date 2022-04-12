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

const selproduct = document.getElementById('selproduct');
const delprod = document.getElementById('delprod');

delprod.onclick = () => {
    console.log(selproduct.value);
    fetch('/api/FoodStock/DeleteProduct?id=' + selproduct.value, {
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
                    <link rel="stylesheet" href="/uistyle.css"><link rel="shortcut icon" type="image/png" href="./media/burger.png"/><title>Produkt gelöscht</title></head>
                <body><img onclick="document.location = '/orders'" src="/orders/media/orders.png" width="40px" height="40px" id="homeicon">
                    <h1 style="text-decoration: underline; text-align: center; margin-top: 70px; margin-bottom: 60px;">Produkt erfolgreich gelöscht</h1>
                    <button class="btn" onclick="document.location='/orders'">Zurück</button></body>
            </html>`);
        }
    }).catch(error => {
        console.log(error);
    });
};


document.onkeyup = (event) => {
    if (event.key == "Escape") document.location = "/orders";
}