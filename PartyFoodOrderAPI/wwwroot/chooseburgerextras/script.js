
function alreadyChoosen(consumername) {
    fetch('/api/BurgerExtras/Get?consumerName=' + consumername, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json()).then(data => {
        return true;
    }).catch(error => {console.log(error);});
}


document.getElementById('form').onsubmit = (event) => {
    event.preventDefault();
    
}

document.getElementById('submit').onclick = () => {

    fetch('/api/BurgerExtras/Get?consumerName=' + document.getElementById('name').value, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json()).then(data => {
        if (data.status != 404) {
            document.write('<head><title>Schon Ausgewählt</title><link rel="icon" href="/burger.png"><link rel="stylesheet" type="text/css" href="/uistyle.css"></head><body><h1 style="margin-top: 40px">Du hast bereits deine Burgerextras ausgewählt</h1><p class="label">Wenn du noch einen weiteren Burger möchtest, schau gleich nochmal vorbei oder frag nach.</p><button style="margin-top: 40px" class="btn" onclick="document.location = `/`">Zurück</button></body>');
            return;
        }
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
                document.write('<head><title>Auswahl Erfolgreich</title><link rel="icon" href="/burger.png"><link rel="stylesheet" type="text/css" href="/uistyle.css"></head><body><h1 style="margin-top: 40px">Deine Burgerextras wurden erfolgreich ausgewählt</h1><button style="margin-top: 40px" class="btn" onclick="document.location = `/`">Zurück</button></body>');
            }
        }).catch(error => {
            console.log(error);
        }); 
    }).catch(error => {console.log(error);});


    
    
}