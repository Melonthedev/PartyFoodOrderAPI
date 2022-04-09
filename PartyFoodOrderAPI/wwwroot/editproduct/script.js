document.getElementById("orderform").onsubmit = (event) => {
    console.log(JSON.stringify({'Name' : document.getElementById("name").value,'Id' : document.getElementById("id").value,'Category' : document.getElementById("category").value}));
    event.preventDefault();
    fetch("/api/FoodStock/AddProduct", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'Name' : document.getElementById("name").value,
                    'Id' : document.getElementById("id").value,
                    'Category' : document.getElementById("category").value
                }),  
            }).then(data => {
                if (data.status == 400) {
                    try {
                        var response = data.json();
                        console.log(response.errors)
                        document.getElementById("errorlabel").innerHTML = "Folgender Fehler ist während der Bearbeitung deiner Bestellung aufgetreten: <br><strong><u>" + response.errors[Object.keys(response.errors)[0]] + "</u></strong><br>Bitte melde dich bei uns, damit wir diesen Fehler beheben können.";
                    } catch (error) {
                        console.log(data)
                        document.getElementById("errorlabel").innerHTML = "Folgender Fehler ist während der Bearbeitung deiner Bestellung aufgetreten: <br><strong><u>" + data + "</u></strong><br>Bitte melde dich bei uns, damit wir diesen Fehler beheben können.";
                    }
                } else {
                    document.getElementById("errorlabel").innerText = "";
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
                        <title>Erfolgreich</title>
                    </head>
                    <body>
                        <svg onclick="document.location = '/'" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="40px" height="40px" id="homeicon"><path d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"/></svg>
                        <h1 style="margin-top: 70px; margin-bottom: 60px;">Erfolgreich hinzugefügt!</h1>
                        <p class="label" style="text-align: center; font-size: 150%">Dein Produkt wurde erfolgreich der Datenbank hinzugefügt.</p>
                        <p class="label" style="text-align: center; font-size: 150%"><a href="/orders" style="color: white;">Zurück zur Bestellübersicht</a></p>
                    </body>
                    </html>
                    `);
                }
            }).catch(error => {
                document.getElementById("errorlabel").innerText = "Der folgende Fehler ist während der Bearbeitung deiner Bestellung aufgetreten: " +  error;
                console.error(error);
            });
}


document.onkeyup = (event) => {
    if (event.key == "Escape") document.location = "/orders";
}