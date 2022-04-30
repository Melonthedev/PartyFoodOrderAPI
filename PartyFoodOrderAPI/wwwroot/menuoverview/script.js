window.onload = () => {

    // Get Products from API
    fetch('/api/FoodStock/GetAllProducts', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json()
    ).then(data => {
        const products = [];
        for (let i = 0; i < data.length; i++) products.push(data[i]);
        for (let i = 0; i < products.length; i++) {
            const entry = document.createElement('div');
            const headding = document.createElement('h3');
            const image = document.createElement('img');
            const description = document.createElement('p');
            const orderbutton = document.createElement('button');
            entry.classList.add('menu-item');
            headding.innerText = products[i].name;
            description.innerText = products[i].description;
            description.style.wordBreak = "break-word";
            image.src = products[i].imageUrl;
            image.alt = products[i].name;
            image.style.width = "200px";
            image.style.marginTop = "15px";
            image.style.borderRadius = "10px";
            orderbutton.classList.add('btn')
            orderbutton.classList.add('menuoverviewbtn')
            orderbutton.innerText = 'Bestellen';
            orderbutton.onclick = () => {
                document.location = '/placeorder?type=' + products[i].category + '&product=' + products[i].id;
            }
            if (!products[i].isInStock) {
                const outofstockheadding = document.createElement('h3');
                outofstockheadding.innerText = " Momentan nicht auf Lager";
                entry.appendChild(headding);
                entry.appendChild(outofstockheadding);
                headding.style.textDecorationLine = "line-through";
                orderbutton.disabled = true;
                entry.style.boxShadow = "0px 0px 10px red";
            } else {
                entry.appendChild(headding);
            }
            
            if (products[i].imageUrl != null) {
                entry.appendChild(image);
            }
            entry.appendChild(description);
            entry.appendChild(orderbutton);
            document.getElementById('body').appendChild(entry);
        }
        if (products.length == 0) {
            const entry = document.createElement('div');
            const headding = document.createElement('h3');
            const description = document.createElement('p');
            entry.classList.add('menu-item');
            headding.innerText = "Keine Produkte vorhanden";
            description.innerText = "Die verfügbare Produkte wurden wahrscheinlich noch nicht hinzugefügt.\n Bitte versuchen Sie es später noch einmal.";
            description.style.marginBottom = "10px";
            entry.appendChild(headding);
            entry.appendChild(description);
            document.getElementById('body').appendChild(entry);
        }
    }).catch(error => {
        console.log(error);
    });

};