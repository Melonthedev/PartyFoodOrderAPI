window.onload = () => {
    const selorder = document.getElementById('selorder');
    const orders = [];

    fetch('/api/FoodOrder/GetFoodOrder?method=all', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json()
    ).then(data => {
        for (let i = 0; i < data.length; i++) orders.push(data[i]);
        for (let i = 0; i < orders.length; i++) {
            const option = document.createElement('option');
            var customerGroup = document.getElementById("group-" + orders[i].consumerName);
            if (customerGroup == null) {
                customerGroup = document.createElement('optgroup');
                customerGroup.label = orders[i].consumerName;
                customerGroup.id = "group-" + orders[i].consumerName;
                selorder.appendChild(customerGroup);
            }
            option.value = orders[i].id;
            option.innerText = orders[i].count + "x " + orders[i].orderedProduct.name + " (ID: " + orders[i].id + ") " + (orders[i].markedAsFinished ? " (erledigt)" : "");
            customerGroup.appendChild(option);
        }
    }).catch(error => {
        console.log(error);
    });
};

const form = document.getElementById('orderform');
form.onsubmit = (event) => {
    event.preventDefault();
    const selorderid = document.getElementById('selorder').value;
    fetch('/api/FoodOrder/DeleteFoodOrder?orderId=' + selorderid, {
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
                    <link rel="stylesheet" href="/uistyle.css"><link rel="shortcut icon" type="image/png" href="/assets/burger.png"/><title>Bestellung gelöscht</title></head>
                <body><img onclick="document.location = '/orders'" src="/assets/ui/orders.png" width="40px" height="40px" id="homeicon">
                    <h1 style="text-decoration: underline; text-align: center; margin-top: 70px; margin-bottom: 60px;">Bestellung erfolgreich gelöscht</h1>
                    <button class="btn" onclick="document.location='/orders'">Zurück</button></body>
            </html> `);
        }

    }).catch(error => {
        console.log(error);
    });
};

document.onkeyup = (event) => {
    if (event.key == "Escape") document.location = "/orders";
}