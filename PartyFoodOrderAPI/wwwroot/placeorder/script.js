window.onload = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const type = urlParams.get('type')
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

    fetch('/api/FoodStock/GetAllProducts/' + type, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(response => response.json()
    ).then(data => {
        for (let i = 0; i < data.length; i++) products.push(data[i]);
        for (let i = 0; i < products.length; i++) {
            console.log(products[i]);
            const option = document.createElement('option');
            option.value = products[i].id;
            option.innerText = products[i].name;
            if (!products[i].isInStock) {
                option.append(" (Nicht auf Lager)");
                option.disabled = true;
            }
            let secondCategory = document.getElementById("category-" + products[i].secondCategory);
            if (products[i].secondCategory != null) {
                if (secondCategory == null) {
                    secondCategory = document.createElement('optgroup');
                    secondCategory.label = products[i].secondCategory;
                    secondCategory.id = "category-" + products[i].secondCategory;
                    selproduct.appendChild(secondCategory);
                }
                secondCategory.appendChild(option);
                continue;
            }
            selproduct.appendChild(option);
        }
    }).catch(error => {
        console.log(error);
    });
};