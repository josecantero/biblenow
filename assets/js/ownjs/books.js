let params = new URLSearchParams(location.search);
//var contract = params.get('contrato');
var book = [];
var covenantID = params.get('covenant');
var bookID = params.get('id');
var chapterID = params.get('chapter');
let covenantURL = "books.html?covenant=";


var apiURL = "https://script.google.com/macros/s/AKfycbz4IXi3Od3EqFShAYPiSY59Sxv6OTHQW6L1KxSir3uk-8fDqw02OGqeP2u-pXGZjILE/exec?";


let apiURLID = apiURL + "id=" + bookID + "&" + "covenant=" + covenantID + "&" + "chapter=" + chapterID;



setTitle(covenantID);

fetch(apiURLID, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
   .then(response => response.json())
   .then(response => bookList(response));



function bookList(booksJSON){
    
    bookULList = document.getElementById("bookULList");
    //console.log(booksJSON["data"]);
    cargandoLIbros = document.getElementById("cargando-libros");
    cargandoLIbros.remove();
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
        linkButton = document.createElement("a"); linkButton.setAttribute("href","#"); linkButton.setAttribute("class", "btn btn-default btn-44 shadow-sm");
        iButton = document.createElement("i"); iButton.setAttribute("class","bi bi-arrow-up-right-circle");
        linkButton.appendChild(iButton);
        divButton.appendChild(linkButton);
        divRow.appendChild(divButton);
        
        
        lista.appendChild(divRow)
        bookULList.appendChild(lista);
    })
}

function setTitle(covenantID){
    var title = document.getElementById('covenantTitle');
    var arrow = document.getElementById("arrow");
    var covenant = document.getElementById("covenant");
    

    if(covenantID == 0){
        title.innerHTML = "Antiguo Testamento";
        arrow.classList.remove("fa-chevron-left");
        arrow.classList.add("fa-chevron-right");
        covenant.setAttribute("href",covenantURL+"1"+"&id=0&chapter=0");
    }
    else
    {
        title.innerHTML = "Nuevo Testamento";
        arrow.classList.remove("fa-chevron-right");
        arrow.classList.add("fa-chevron-left");
        covenant.setAttribute("href",covenantURL+"0"+"&id=0&chapter=0");
    }
}