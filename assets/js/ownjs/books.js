book = [];
fetch('https://script.google.com/macros/s/AKfycbyuPrRdlGM0t7XpgVUfFNLhMvaNTvsWqHu4LJbc-kLtesZh_3KhzPWuibouZaPYIQ11/exec?id=0', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
   .then(response => response.json())
   .then(response => bookList(response));



function bookList(booksJSON){
    
    bookULList = document.getElementById("bookULList");
    console.log(booksJSON["data"]);
    booksJSON["data"].forEach(book => {
        //console.log(book["chapters"]);
        lista = document.createElement("li"); lista.setAttribute("class","list-group-item");
        divRow = document.createElement("div"); divRow.setAttribute("class","row");
    
        //avatar
        divColAvatar = document.createElement("div"); divColAvatar.setAttribute("class","col-auto");
        divAvatar = document.createElement("div"); divAvatar.setAttribute("class","avatar avatar-50 shadow rounded-10");
        imgAvatar = document.createElement("img"); imgAvatar.setAttribute("src", book["wallpaper_url"]);
        divAvatar.appendChild(imgAvatar);
        divColAvatar.appendChild(divAvatar);
        divRow.appendChild(divColAvatar);

        //book
        divColBook = document.createElement("div"); divColBook.setAttribute("class","col align-self-center ps-0");
        pBookName = document.createElement("p"); pBookName.setAttribute("class","text-color-theme mb-0"); pBookName.innerHTML = book["modern_name"];
        pBookInfo = document.createElement("p"); pBookInfo.setAttribute("class","text-muted size-12"); pBookInfo.innerHTML = "Capítulos: "+book["chapters"]+" - Versículos: "+book["verses"];
        pBookName.appendChild(pBookInfo);
        divColBook.appendChild(pBookName);
        divRow.appendChild(divColBook);

        //link to book
        divButton = document.createElement("div"); divButton.setAttribute("class","col-auto");
        linkButton = document.createElement("a"); linkButton.setAttribute("href","LINK A BOOK CON ID BOOK"); linkButton.setAttribute("class", "btn btn-default btn-44 shadow-sm");
        iButton = document.createElement("i"); iButton.setAttribute("class","bi bi-arrow-up-right-circle");
        linkButton.appendChild(iButton);
        divButton.appendChild(linkButton);
        divRow.appendChild(divButton);

        lista.appendChild(divRow)
        bookULList.appendChild(lista);


    })

    

    
    
    console.log(divRow); 
    
}

/*
<li class="list-group-item">
    <div class="row">
        <div class="col-auto">
            <div class="avatar avatar-50 shadow rounded-10 ">
                <img src="assets/img/company4.jpg" alt="">
            </div>
        </div>
        <div class="col align-self-center ps-0">
            <p class="text-color-theme mb-0">Zomato</p>
            <p class="text-muted size-12">Food</p>
        </div>
        <div class="col align-self-center text-end">
            <p class="mb-0">-25.00</p>
            <p class="text-muted size-12">Debit Card 4545</p>
        </div>
    </div>
</li>
*/