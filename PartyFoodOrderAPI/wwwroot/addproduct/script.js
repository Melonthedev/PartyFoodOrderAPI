document.getElementById("orderform").onsubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("Name", document.getElementById("name").value);
    formData.append("Category", document.getElementById("category").value);
    formData.append("IsInStock", !document.getElementById("outofstock").checked);
    formData.append("SubCategory", document.getElementById("secondcategory").value);
    formData.append("Description", document.getElementById("description").value);
    formData.append("IsSelfService", document.getElementById("isselfservice").checked);

    if (document.getElementById('imageFile').files.length > 0) {
        formData.append('Image', document.getElementById('imageFile').files[0]);
    } else {
        formData.append("ImageUrl", document.getElementById("imageurl").value);
    }

    fetch("/api/FoodStock/AddProduct", {
        method: 'POST',
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
                <body><img onclick="document.location = '/orders'" src="/assets/ui/orders.png" width="40px" height="40px" id="homeicon"><h1 style="margin-top: 70px; margin-bottom: 60px;">Erfolgreich hinzugefügt!</h1><p class="label" style="text-align: center; font-size: 150%">Dein Produkt wurde erfolgreich der Datenbank hinzugefügt.</p><p class="label" style="text-align: center; font-size: 150%"><a href="/orders" style="color: white;">Zurück zur Bestellübersicht</a></p></body>
            </html>
            `);
        }
    }).catch(error => {
        document.getElementById("errorlabel").innerText = "Der folgende Fehler ist während der Bearbeitung deiner Anfrage aufgetreten: " +  error + "\nBitte vergewissere dich, dass die ID deines Produktes noch nicht existiert.";
        console.error(error);
    });
}

document.onkeyup = (event) => {
    if (event.key == "Escape") document.location = "/orders";
}

document.getElementById('imageFile').onchange = (event) => {
    if (event.target.files.length <= 0) {
        document.getElementById("imageurl").value = "";
        document.getElementById("imageurl").disabled = false;
    } else {
        document.getElementById("imageurl").value = "";
        document.getElementById("imageurl").disabled = true;
    }
}