let subcategories = []; // Array of subcategories

window.onload = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var type = urlParams.get('type')
    var title = document.getElementById('title');
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
            type = '';
            break;
    }

    // Get Products from API
    fetch('/api/FoodStock/GetAllProducts/' + type, {
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
            const orderbuttonreplacement = document.createElement('p');
            entry.classList.add('menu-item');
            headding.innerText = products[i].name;
            description.innerText = products[i].description;
            description.style.wordBreak = "break-word";
            image.src = products[i].imageUrl;
            image.alt = products[i].name;
            image.style.width = "200px";
            image.style.marginTop = "15px";
            image.style.borderRadius = "10px";
            orderbutton.classList.add('menuoverviewbtn')
            orderbutton.classList.add('btn')
            orderbutton.innerText = 'Bestellen';
            orderbuttonreplacement.style.fontStyle = "italic";
            orderbuttonreplacement.style.color = "aqua";
            orderbuttonreplacement.style.marginBottom = "10px";
            orderbuttonreplacement.innerText = 'Nur Selbstbedienung';
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
            
            if (products[i].imageUrl != null && products[i].imageUrl != "") {
                entry.appendChild(image);
            }
            entry.appendChild(description);
            if (products[i].isSelfService) entry.appendChild(orderbuttonreplacement);  
            else entry.appendChild(orderbutton);
            if (products[i].subCategory != null && products[i].subCategory != "") {
                const subcategory = createSubCategory(products[i].subCategory);
                subcategory.appendChild(entry);
                continue;
            }
            document.getElementById('body').prepend(entry);
        }
        if (products.length == 0) {
            const entry = document.createElement('div');
            const headding = document.createElement('h3');
            const description = document.createElement('p');
            entry.classList.add('menu-item');
            headding.innerText = "Keine Produkte vorhanden";
            description.innerText = "Die verfügbaren Produkte dieser Kategorie wurden wahrscheinlich noch nicht hinzugefügt.\n Bitte versuchen Sie es später noch einmal.";
            description.style.marginBottom = "10px";
            entry.appendChild(headding);
            entry.appendChild(description);
            document.getElementById('body').appendChild(entry);
        }
    }).catch(error => {
        console.log(error);
    });

};

function createSubCategory(name) {
    if (subCategoryExists(name)) return getSubCategory(name);   
    let element = document.createElement('div');
    let heading = document.createElement('h2');
    heading.innerText = name;
    heading.id = name;
    heading.classList.add("label");
    element.value = "subcategory-" + name;
    element.appendChild(heading);
    document.getElementById('body').appendChild(element);
    subcategories.push(element);
    return element;
}

function subCategoryExists(name) {
    for (let i = 0; i < subcategories.length; i++) {
        if (subcategories[i].value == "subcategory-" + name) return true;
    }
    return false;
}

function getSubCategory(name) {
    for (let i = 0; i < subcategories.length; i++) {
        if (subcategories[i].value == "subcategory-" + name) return subcategories[i];
    }
    return null;
}