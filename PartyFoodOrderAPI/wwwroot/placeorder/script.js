window.onload = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get('type')
    const product = urlParams.get('product')
    const title = document.getElementById('title');
    switch(type) {
        case '1':
            title.innerText = "Getränk bestellen";
            break;
        case '2':
            title.innerText = "Kuchen bestellen";
            break;
        case '3':
            title.innerText = "Sonstiges bestellen";
            break;
        default:
            break;
    }

    const selproduct = document.getElementById('product');
    const products = [];

    fetch('/api/FoodStock/GetProduct/?id=' + product, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json()
    ).then(data => {
        selproduct.innerText = data.name;
        selproduct.setAttribute('value', data.id);
    }).catch(error => {
        console.log(error);
    });
};

document.getElementById("count").addEventListener("input", function() {
    document.getElementById("countdisplay").innerHTML = this.value;
});
document.getElementById("orderform").onsubmit = (event) => {
    event.preventDefault();
    fetch("/api/FoodOrder/AddFoodOrder", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'name' : document.getElementById("name").value,
                    'product' : document.getElementById("product").getAttribute("productid"),
                    'count' : document.getElementById("count").value,
                    'comment' : document.getElementById("comment").value,
                }),  
            }).then(response => response.json())
            .then(data => {
                if (data.status == 400) {
                    console.log(data.errors)
                    document.getElementById("errorlabel").innerHTML = "Folgender Fehler ist während der Bearbeitung deiner Bestellung aufgetreten: <br><strong><u>" + data.errors[Object.keys(data.errors)[0]] + "</u></strong><br>Bitte melde dich bei uns, damit wir diesen Fehler beheben können.";
                } else {
                    document.getElementById("errorlabel").innerText = "";
                    jsondata = JSON.parse(data);
                    document.write(`
                    <html lang="de">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="stylesheet" type="text/css" href="/uistyle.css">
                        <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap" rel="stylesheet">
                        <link rel="icon" href="/burger.png">
                        <title>Bestellung Erfolgreich</title>
                    </head>
                    <body>
                        <svg onclick="document.location = '/'" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="40px" height="40px" id="homeicon"><path d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"/></svg>
                        <h1 style="margin-top: 70px; margin-bottom: 60px;">` + jsondata.message + `</h1>
                        <p class="label" style="text-align: center; font-size: 150%">Deine Bestellung war erfolgreich. Das Produkt wird sobald es fertig ist zugestellt 😉.</p>
                        <p class="label" style="text-align: center; font-size: 150%">Du kannst nun zurück zur <a href="/" style="color: white;">Startseite</a> gehen um noch etwas zu bestellen oder dieses Fenster schließen.</p>
                        <br><br>
                        <h2>Bestellübersicht:</h2>
                        <p class="label" style="font-size: 150%">Name: ` + jsondata.name + `</p>
                        <p class="label" style="font-size: 150%">Produkt: ` + jsondata.product + `</p>
                        <p class="label" style="font-size: 150%">Anzahl: ` + jsondata.count + `</p>
                        <p class="label" style="font-size: 150%">Kommentar: ` + jsondata.comment + `</p>
                        <button class="btn" style="width: 300px; max-width: 80%; margin-bottom: 30px;" onclick="document.location = '/'">Zurück zur Startseite</button>
                    </body>
                    </html>
                    `);
                    window.scrollTo(0, 0);
                }
            }).catch(error => document.getElementById("errorlabel").innerText = "Der folgende Fehler ist während der Bearbeitung deiner Bestellung aufgetreten: " +  error);
}