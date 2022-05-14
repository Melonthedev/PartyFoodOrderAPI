function load() {
    let baconcontainer = document.getElementById('baconcontainer');
    let eggcontainer = document.getElementById('eggcontainer');
    let baconcount = 0;
    let eggcount = 0;
    let baconcountspan = document.getElementById('baconcount');
    let eggcountspan = document.getElementById('eggcount');
    fetch('/api/BurgerExtras/GetAll', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => {
        if (response.status == 200) {
            response.json().then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].bacon == true) {
                        baconcount++;
                        const entry = document.createElement('p');
                        entry.classList.add("label");
                        entry.innerText = data[i].consumerName;
                        baconcontainer.appendChild(entry);
                    } 
                    if (data[i].egg == true) {
                        eggcount++;
                        const entry = document.createElement('p');
                        entry.classList.add("label");
                        entry.innerText = data[i].consumerName;
                        eggcontainer.appendChild(entry);
                    } 
                }
                baconcountspan.innerText = baconcount;
                eggcountspan.innerText = eggcount;
            });
        } else console.log(response);
    }).catch(error => {
        console.log(error);
    });
}
document.onkeyup = (event) => {
    if (event.key == "Escape") document.location = "/orders";
}