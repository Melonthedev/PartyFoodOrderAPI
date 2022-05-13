window.onload = () => {
    console.log(document.cookie)
    if (document.cookie.includes('alreadychoosenalreadychoosen')) {
        document.write('<head><link rel="stylesheet" type="text/css" href="/uistyle.css"></head><body><h1 style="margin-top: 40px">Du hast bereits deine Burgerextras ausgewählt</h1><button style="margin-top: 40px" class="btn" onclick="document.location = `/`">Zurück</button></body>');
        return;
    }
}

document.getElementById('form').onsubmit = (event) => {
    event.preventDefault();
    fetch('/api/FoodOrder/BurgerExtras', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            egg: document.getElementById('check-egg').checked,
            bacon: document.getElementById('echeck-bacon').checked,
        }),
    }).then(data => {
        if (data.status == 200) {
            document.cookie = 'alreadychoosenalreadychoosen=true';
            document.write('<head><link rel="stylesheet" type="text/css" href="/uistyle.css"></head><body><h1 style="margin-top: 40px">Deine Burgerextras wurden erfolgreich ausgewählt</h1><button style="margin-top: 40px" class="btn" onclick="document.location = `/`">Zurück</button></body>');
        }
    }).catch(error => {
        console.log(error);
    });
}