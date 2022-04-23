const table = document.getElementById("orders");
    const burgerTable = document.getElementById("burgerorders");
    const orders = [];
    window.addEventListener("load", event => { runAutoRefreshTimer() });

    function runAutoRefreshTimer() {
        refreshFoodOrders(false);
        refreshBurgerOrders();
        setTimeout(refreshFoodOrders(true), 500);
        setInterval(() => {
            refreshFoodOrders(true); 
            refreshBurgerOrders();
            refreshOrderStatus();
        }, 10000);
    }

    function refreshOrderStatus() {
        orders.forEach(order => {
                if (order.isFinished()) {
                    finishOrder(order);
                    return;
                }
                let difference = Math.floor(new Date() / 1000) - order.getCreated();
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

    function refreshBurgerOrders() {
        if(!document.getElementById("reloadburgerorders").hasAttribute("click")) {
            document.getElementById("reloadburgerorders").setAttribute("click", "");
            setTimeout(() => document.getElementById("reloadburgerorders").removeAttribute("click"), 700);
        }
        Array.from(burgerTable.children[0].children).forEach(orderelement => {
            orderelement.classList.remove("new");
        });
        //refreshOrders("BurgerOrder")
    }

    function refreshOrders(route, refresh) {
        fetch("/api/FoodOrder/" + route + "?method=all", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()) //Response wird zu JSON umgewandelt
        .then(data => {
            for (i = 0; i < data.length; i++) { //Loop für jeden Eintrag in data                                                     
                let order = new FoodOrder( //FoodOrder object erstellen
                            data[i].orderId,  
                            data[i].consumerName, 
                            data[i].orderedProduct, 
                            data[i].count, 
                            data[i].created, 
                            data[i].markedAsFinished,
                            data[i].comment
                        );
                let orderAlreadyListed = false; //Ist die Order schon gelistet
                for (y = 0; y < orders.length; y++) {   //Loop für jede gelistete order                        
                    if (orders[y].getOrderId() == order.getOrderId()) {//Abgleichen der beiden ID's      
                        orderAlreadyListed = true;
                        if (order.isFinished()) finishOrder(orders[y]); //Wenn bestellungdata fertig ist, bestellung finished anzeigen lassen    
                    }
                }
                if (orderAlreadyListed) 
                    continue; //Wenn schon gelistet, zum nächsten data eintrag springen
                addOrder(order, refresh); //Ansonsten order den gelisteten orders hinzufügen
                if (order.isFinished()) finishOrder(order); //Wenn bestellungdata fertig ist, bestellung finished anzeigen lassen
            }
        })
        .catch(error => console.log(error));
        refreshOrderStatus();
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
        nrElement.textContent = order.getOrderId() !== " " ? order.getOrderId() : "?";
        nameElement.textContent = order.getName() !== " " ? order.getName() : "Unknown";
        productElement.textContent = order.getProduct() !== " " ? order.getProduct() : "Unknown";
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
        if(refresh == true) 
            trElement.classList.add("new");
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
        getCreated() { return this.created; }
        getDOMElement() { return this.DOMElement; }
        isFinished() { return this.finished; }
        getFinishButtonElement() { return this.finishButtonElement; }
        getComment() { return this.comment; }

        setDOMElement(DOMElement) { this.DOMElement = DOMElement; }
        setFinished(finished) { this.finished = finished; }
        setFinishButtonElement(finishButtonElement) { this.finishButtonElement = finishButtonElement; }
    }