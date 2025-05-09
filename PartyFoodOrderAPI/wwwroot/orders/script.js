const table = document.getElementById("orders");
const orders = [];

function runAutoRefreshTimer() {
    refreshFoodOrders(false);
    setTimeout(refreshFoodOrders(false), 500);
    setInterval(() => {
        refreshFoodOrders(true); 
        refreshOrderStatus();
    }, 10000);
}

function refreshOrderStatus() {
    orders.forEach(order => {
            if (order.isFinished()) {
                finishOrder(order);
                return;
            }
            let difference = new Date().getTime() / 1000 - new Date(order.getCreatedAt()).getTime() / 1000;
            if (order.getDOMElement() == null) return;
            if (difference >= 900) {
                order.getDOMElement().classList.add("waitinglong");
                order.getDOMElement().classList.remove("waitingshort");
            } else if (difference >= 300) order.getDOMElement().classList.add("waitingshort");
            else if (difference <= 50) order.getDOMElement().classList.add("new");
        });
}

function refreshFoodOrders(refresh) {
    if(!document.getElementById("reloadorders").hasAttribute("click")) {
        document.getElementById("reloadorders").setAttribute("click", "");
        setTimeout(() => document.getElementById("reloadorders").removeAttribute("click"), 600);
    }
    Array.from(table.children[0].children).forEach(orderelement => {
        orderelement.classList.remove("new");
    });
    refreshOrders("GetFoodOrder", refresh);
}

function refreshOrders(route, refresh) {
    fetch("/api/FoodOrder/" + route + "?method=all", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json()) //Response to JSON
    .then(data => {
        for (i = 0; i < data.length; i++) { //Loop for every entry in data                                                     
            let order = new FoodOrder( //create FoodOrder object 
                        data[i].id,  
                        data[i].consumerName, 
                        data[i].orderedProduct, 
                        data[i].count, 
                        data[i].createdAt, 
                        data[i].markedAsFinished,
                        data[i].comment
                    );
            let orderAlreadyListed = false; //is already listed flag
            for (y = 0; y < orders.length; y++) {   //Loop for every listed order                      
                if (orders[y].getOrderId() == order.getOrderId()) {//check id's      
                    orderAlreadyListed = true;
                    if (order.isFinished()) finishOrder(orders[y]); //if orderdata fertig is true, show bestellung as finished    
                }
            }
            if (orderAlreadyListed) 
                continue; //if already listed, skip
            addOrder(order, refresh); //else add order to list
            if (order.isFinished()) finishOrder(order); //if orderdata fertig is true, show bestellung as finished
        }
    })
    .catch(error => console.log(error));
    refreshOrderStatus();
}

function getProductName(id) {
    fetch("/api/FoodStock/GetProduct/?id=" + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json()) //Response to JSON
    .then(data => {
        return data[0].name;    
    })
    .catch(error => console.log(error));
}

function addOrder(order, refresh) {
    const trElement = document.createElement('tr');
    const nrElement = document.createElement('td');
    const nameElement = document.createElement('td');
    const productElement = document.createElement('td');
    const countElement = document.createElement('td');
    const commentElement = document.createElement('td');
    const erledigtElement = document.createElement('td');
    const buttonElement = document.createElement('button');
    nrElement.textContent = order.getOrderId() !== " " && order.getOrderId() != null ? order.getOrderId() : "?";
    nameElement.textContent = order.getName() !== " " ? order.getName() : "Unknown";
    productElement.textContent = order.getProduct().name;
    countElement.textContent = order.getCount() != 0 ? order.getCount() : "?";
    commentElement.textContent = order.getComment() !== null && order.getComment() !== " " ? order.getComment() : "/";
    commentElement.style.whiteSpace = "nowrap";
    buttonElement.textContent = "✔";
    buttonElement.classList.add("finishOrder");
    var handler = (event) => {
        fetch("/api/FoodOrder/MarkFoodOrderAsFinished/?orderId=" + order.getOrderId(), {
            method: 'POST'
        });
        refreshFoodOrders();
        buttonElement.disabled = true;
        buttonElement.style.backgroundColor = "gray";
    }
    buttonElement.addEventListener("click", handler, {once: true});
    erledigtElement.appendChild(buttonElement);
    if (order.isFinished()) {
        buttonElement.disabled = true;
        buttonElement.style.backgroundColor = "gray";
        buttonElement.removeEventListener("click", handler);
    }
    if(refresh == true) {
        trElement.classList.add("new");
        const notify = new Notification('Neue Bestellung!', {
            body: 'Neue Bestellung von ' + order.getName() + ': ' + order.getCount() + 'x ' + order.getProduct().name + '\n' + order.getComment(),
            icon: '/assets/burger.png'
        });
    }
    trElement.appendChild(nrElement);
    trElement.appendChild(nameElement);
    trElement.appendChild(productElement);
    trElement.appendChild(countElement);
    trElement.appendChild(commentElement)
    trElement.appendChild(erledigtElement);
    order.setDOMElement(trElement);
    order.setFinishButtonElement(buttonElement);
    table.children[0].children[0].insertAdjacentElement("afterEnd", trElement);
    orders.push(order);
    
}

function removeOrder(order) {
    order.getDOMElement().remove();
    orders.remove(order);
}

function finishOrder(order) {
    var element = order.getDOMElement();
    element.classList.add("finished");
    element.classList.remove("waitingshort");
    element.classList.remove("new");
    element.classList.remove("waitinglong");
    order.setFinished(true);
    order.getFinishButtonElement().disabled = true;
    order.getFinishButtonElement().style.backgroundColor = "gray";
}

class FoodOrder {
    constructor(orderId, name, product, count, created, finished, comment) {
        this.orderId = orderId;
        this.name = name;
        this.product = product;
        this.count = count;
        this.created = created;
        this.finished = finished;
        this.comment = comment;
    }
    getOrderId() { return this.orderId; }
    getName() { return this.name; }
    getProduct() { return this.product; }
    getCount() { return this.count; }
    getCreatedAt() { return this.created; }
    getDOMElement() { return this.DOMElement; }
    isFinished() { return this.finished; }
    getFinishButtonElement() { return this.finishButtonElement; }
    getComment() { return this.comment; }

    setDOMElement(DOMElement) { this.DOMElement = DOMElement; }
    setFinished(finished) { this.finished = finished; }
    setFinishButtonElement(finishButtonElement) { this.finishButtonElement = finishButtonElement; }
}

window.onload = async function() {
    let permission = await Notification.requestPermission();
    runAutoRefreshTimer();
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
                    if (data[i].bacon == true) 
                        baconcount++;
                    if (data[i].egg == true)
                        eggcount++;
                }
                baconcountspan.innerText = baconcount;
                eggcountspan.innerText = eggcount;
            });
        } else console.log(response);
    }).catch(error => {
        console.log(error);
    });
}