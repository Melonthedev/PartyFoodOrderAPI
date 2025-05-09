document.getElementById("orderform").onsubmit = (event) => {
    event.preventDefault();

    if (document.getElementById('imageFile').files.length > 0) {
        const formData = new FormData();
        formData.append('imageFile', document.getElementById('imageFile').files[0]);
        //uploadImage(formData);
        uploadImage(document.getElementById('imageFile').files[0]);
    }


    fetch("/api/FoodStock/AddProduct", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'Name' : document.getElementById("name").value,
            'Category' : document.getElementById("category").value,
            'IsInStock' : !document.getElementById("outofstock").checked,
            'SubCategory' : document.getElementById("secondcategory").value,
            'Description' : document.getElementById("description").value,
            'ImageUrl' : document.getElementById("imageurl").value,
            'IsSelfService' : document.getElementById("isselfservice").checked,
        })
    }).then(data => {
        if (data.status != 200) {
            console.log(data)
            document.getElementById("errorlabel").innerHTML = "Folgender Fehler ist während der Bearbeitung deiner Anfrage aufgetreten: <br><strong><u>" + data + "</u></strong><br>Bitte vergewissere dich, dass die ID deines Produktes noch nicht existiert.";
        } else {
            document.getElementById("errorlabel").innerText = "";
            document.write(`
            <html lang="de">
                <head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" type="text/css" href="/uistyle.css"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap" rel="stylesheet"><link rel="icon" href="/burger.png"><title>Erfolgreich</title></head>
                <body><img onclick="document.location = '/orders'" src="/assets/ui/orders.png" width="40px" height="40px" id="homeicon"><h1 style="margin-top: 70px; margin-bottom: 60px;">Erfolgreich hinzugefügt!</h1><p class="label" style="text-align: center; font-size: 150%">Dein Produkt wurde erfolgreich der Datenbank hinzugefügt.</p><p class="label" style="text-align: center; font-size: 150%"><a href="/orders" style="color: white;">Zurück zur Bestellübersicht</a></p></body>
            </html>
            `);
        }
    }).catch(error => {
        document.getElementById("errorlabel").innerText = "Der folgende Fehler ist während der Bearbeitung deiner Anfrage aufgetreten: " +  error + "\nBitte vergewissere dich, dass die ID deines Produktes noch nicht existiert.";
        console.error(error);
    });
}

document.onkeyup = (event) => {
    if (event.key == "Escape") document.location = "/orders";
}


function encodeImageFileAsURL(event) {
    event.preventDefault();
    var fileSelected;
    if (event.dataTransfer == null) {
        fileSelected = event.target.files;
    } else {
        fileSelected = event.dataTransfer.files;
    }
    if (fileSelected.length > 0) {
        var fileToLoad = fileSelected[0];
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result;
            document.getElementById("imageurl").value = srcData;
            document.getElementById("imageurl").disabled = true;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}

var dropZone = document.getElementById('imageurl');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', drop, false);

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

function drop(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	encodeImageFileAsURL(evt);
}

document.getElementById('imageFile').onchange = (event) => {
    //encodeImageFileAsURL(event);
    if (event.target.files.length <= 0) {
        document.getElementById("imageurl").value = "";
        document.getElementById("imageurl").disabled = false;
    } else {
        document.getElementById("imageurl").value = "";
        document.getElementById("imageurl").disabled = true;
    }
}

function uploadImage(image) {
    fetch("/api/ProductImage/UploadImage", {
        method: 'POST',
        headers: {
            'Accept': 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
        },
        body: image
    }).then(data => {
        console.log(data);
        console.log("success");
    }).catch(error => {
        console.error(error);
    });
}