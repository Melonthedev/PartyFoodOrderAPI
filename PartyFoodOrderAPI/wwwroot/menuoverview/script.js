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
            image.src = products[i].imageUrl;
            image.alt = products[i].name;
            image.style.width = "200px";
            image.style.borderRadius = "10px";
            orderbutton.classList.add('btn')
            orderbutton.classList.add('menuoverviewbtn')
            orderbutton.innerText = 'Bestellen';
            orderbutton.onclick = () => {
                document.location = '/placeorder?type=' + products[i].category + '&product=' + products[i].id;
            }
            entry.appendChild(headding);
            if (products[i].imageUrl != null) {
                entry.appendChild(image);
            }
            entry.appendChild(description);
            entry.appendChild(orderbutton);
            document.getElementById('body').appendChild(entry);
        }
    }).catch(error => {
        console.log(error);
    });

};