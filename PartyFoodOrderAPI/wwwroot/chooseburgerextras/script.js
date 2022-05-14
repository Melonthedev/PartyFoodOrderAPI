window.onload = () => {
    console.log(document.cookie)
    if (document.cookie.includes('alreadychoosenalreadychoosen')) {
        document.write('<head><title>Schon Ausgewählt</title><link rel="icon" href="/burger.png"><link rel="stylesheet" type="text/css" href="/uistyle.css"></head><body><h1 style="margin-top: 40px">Du hast bereits deine Burgerextras ausgewählt</h1><button style="margin-top: 40px" class="btn" onclick="document.location = `/`">Zurück</button></body>');
        return;
    }
}

document.getElementById('form').onsubmit = (event) => {
    event.preventDefault();
    fetch('/api/BurgerExtras/Choose', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            consumerName: document.getElementById('name').value,
            egg: document.getElementById('checkegg').checked,
            bacon: document.getElementById('checkbacon').checked,
        }),
    }).then(data => {
        if (data.status == 200) {
            document.cookie = 'alreadychoosenalreadychoosen=true';
            document.write('<head><title>Auswahl Erfolgreich</title><link rel="icon" href="/burger.png"><link rel="stylesheet" type="text/css" href="/uistyle.css"></head><body><h1 style="margin-top: 40px">Deine Burgerextras wurden erfolgreich ausgewählt</h1><button style="margin-top: 40px" class="btn" onclick="document.location = `/`">Zurück</button></body>');
        }
    }).catch(error => {
        console.log(error);
    });
}