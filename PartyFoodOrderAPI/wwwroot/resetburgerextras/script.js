const selectall = document.getElementById('selectall');
const selextra = document.getElementById('selextra');

window.onload = () => {
    const extras = [];
    fetch('/api/BurgerExtras/GetAll', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json()
    ).then(data => {
        for (let i = 0; i < data.length; i++) extras.push(data[i]);
        for (let i = 0; i < extras.length; i++) {
            const option = document.createElement('option');
            option.value = extras[i].id;
            option.innerText = extras[i].consumerName;
            selextra.appendChild(option);
        }
    }).catch(error => {
        console.log(error);
    });
};

selectall.onchange = () => {
    if (selectall.checked) selextra.disabled = true;
    else selextra.disabled = false;
};

const form = document.getElementById('orderform');
form.onsubmit = (event) => {
    event.preventDefault();
    const selorderid = selextra.value;
    let url = '/api/BurgerExtras/Delete?id=' + selorderid;
    if (selectall.checked) url = '/api/BurgerExtras/DeleteAll';
    fetch(url, {
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
                    <link rel="stylesheet" href="/uistyle.css"><link rel="shortcut icon" type="image/png" href="/assets/burger.png"/><title>Burgerextras zurückgesetzt</title></head>
                <body><img onclick="document.location = '/orders'" src="/assets/ui/orders.png" width="40px" height="40px" id="homeicon">
                    <h1 style="text-decoration: underline; text-align: center; margin-top: 70px; margin-bottom: 60px;">Burgerextras erfolgreich zurückgesetzt</h1>
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