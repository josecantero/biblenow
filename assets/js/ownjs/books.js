let params = new URLSearchParams(location.search);
//var contract = params.get('contrato');
var book = [];
var covenantID = params.get('covenant');
var bookID = params.get('id');
var chapterID = params.get('chapter');
let covenantURL = "books.html?covenant=";


var apiURL = "https://script.google.com/macros/s/AKfycbxhdZ_-KCVEYizm6-lK10RjZKSU4WJaaOwZ6e_YR5Qu2rGGgWy3M-t7FGSnlQSU3DLs/exec?";


let apiURLID = apiURL + "id=" + bookID + "&" + "covenant=" + covenantID + "&" + "chapter=" + chapterID;



if(parseInt(bookID) >= 1){
    fetch(apiURLID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then(response => bookVerse(response));
}else{
    fetch(apiURLID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then(response => bookList(response));
}


function bookList(booksJSON){
    setTitle(covenantID);
    
    bookULList = document.getElementById("bookULList");
    
    cargandoLIbros = document.getElementById("cargando-libros");
    cargandoLIbros.remove();
    
    booksJSON["data"].forEach(book => {
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
        linkButton = document.createElement("a"); linkButton.setAttribute("href","book.html?id="+book['id']+"&chapter="+1); linkButton.setAttribute("class", "btn btn-default btn-44 shadow-sm");
        iButton = document.createElement("i"); iButton.setAttribute("class","bi bi-arrow-up-right-circle");
        linkButton.appendChild(iButton);
        divButton.appendChild(linkButton);
        divRow.appendChild(divButton);
        
        
        lista.appendChild(divRow)
        bookULList.appendChild(lista);
    })
}

function bookVerse(bookVersesJSON){
    console.log(bookVersesJSON);
    versesListUL = document.getElementById("verseList");
    bookName = ""
    id = 0;
    bookVersesJSON["data"].forEach(verse =>{
        if(id == 0)
        {
            id = id + 1;
            bookName = verse["modern_name"];
            chaptersUl = document.getElementById("chapters");
            bChapters = verse["chapters"];
            for(chapt = 1; chapt <= bChapters; chapt++){
                console.log("capítulo "+chapt);
                liChapter = document.createElement("li"); liChapter.setAttribute("style","padding:10px; display: flex; text: center;")
                ahrefNextChapter = document.createElement("a"); ahrefNextChapter.setAttribute("href","#"); ahrefNextChapter.innerHTML = "Capítulo " + chapt;
                liChapter.appendChild(ahrefNextChapter);
                chaptersUl.appendChild(liChapter);
            }
        }
        else{
            if(id == 1){
                bookNameH6 = document.getElementById("BookName"); bookNameH6.innerHTML = "Capítulo " + verse["chapter"];
                bookTitleH5 = document.getElementById("BookTitle"); bookTitleH5.innerHTML = bookName;
                id = id + 1;    
            }
            verseLI = document.createElement("li"); verseLI.setAttribute("class","list-group-item");
            divAvatar = document.createElement("div"); divAvatar.setAttribute("class","avatar avatar-15 border-success rounded-circle");
        
            verseParagraph = document.createElement("p");
            verseNumSpan = document.createElement("span"); verseNumSpan.setAttribute("class","verseNum text-color-theme"); verseNumSpan.innerHTML = verse["verse"]+" ";
            verseTextSmall = document.createElement("smaall"); verseTextSmall.setAttribute("class","Verse text-muted"); verseTextSmall.innerHTML= verse["text"];

            verseParagraph.appendChild(verseNumSpan); verseParagraph.appendChild(verseTextSmall);
            
            verseLI.appendChild(divAvatar); verseLI.appendChild(verseParagraph);
            
            versesListUL.appendChild(verseLI);
        }
        
    });
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