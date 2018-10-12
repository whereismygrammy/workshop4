$( document ).ready(function() {
    var bookList = $("#book-list");
    
    bookList.on("click", "div.title", showDescription)
    
    bookList.on("click", "a.delbook", handleDeleteBook)

    var addBookForm = $("#add-book-form");
        
    addBookForm.on("submit", submitAddBook);
    
    refreshBookList();
    
    function refreshBookList(){
        function renderBookListProxy(books){
            var bookList = $("#book-list");
            renderBookList(bookList, books);
    }
    
    genericSendRequest("http://localhost:8080/books", "GET", "", renderBookListProxy);

    }

    
    function renderBookList(renderingPoint, arrBooks){
        renderingPoint.empty();
        
        for(var i = 0; i < arrBooks.length; i++){
            var titleDiv = getTitleDiv(arrBooks[i]);
            var desctiprionDiv = getDesctiprionDiv(arrBooks[i]);

            renderingPoint.append(titleDiv);
            renderingPoint.append(desctiprionDiv);
        }
    }
    
    function getTitleDiv(bookObj){
        var titleDiv = $("<div class='title'>");
        titleDiv.text(bookObj.title);
        titleDiv.data("book-id", bookObj.id)
        
        var delLink = $("<a class='delbook'>");
        delLink.text(" delete");
        titleDiv.append(delLink);
        
        return titleDiv;
    }
    
    function getDesctiprionDiv(){
        var decriptionDiv  = $("<div class='description'>");
        return decriptionDiv;
    }
    
    function showDescription (){
        
        var bookId = $(this).data("book-id");
        var descriptionRenderingPoint = $(this).next("div.description");
        
        function renderDescriptionProxy(book) {
            renderDescription(descriptionRenderingPoint, book);
        }
        
    genericSendRequest("http://localhost:8080/books/" + bookId, "GET", "", renderDescriptionProxy);

    }
    
    function renderDescription(renderingPoint, book){
        renderingPoint.empty();
        
        var authorP = $("<p>")
        authorP.text("Author: " + book.author)
        
        var isbnP = $("<p>")
        isbnP.text("ISBN: " + book.isbn)
        
        var typeP = $("<p>")
        typeP.text("Type: " + book.type)
        
        var publisherP = $("<p>")
        publisherP.text("Publisher: " + book.publisher)
        
        renderingPoint.append(authorP);
        renderingPoint.append(isbnP);
        renderingPoint.append(typeP);
        renderingPoint.append(publisherP);
        
    }
    
    function submitAddBook(event){

        var newBook = {
            title: this.elements.title.value,
            author: this.elements.author.value,
            isbn: this.elements.isbn.value,
            type: this.elements.type.value,
            publisher: this.elements.publisher.value,
        }
        
        genericSendRequest("http://localhost:8080/books", "POST", JSON.stringify(newBook), refreshBookList);

        event.preventDefault();
        return false;
        
    }
    
    function handleDeleteBook(event){
        var bookId = $(this).parent().data("book-id");
        event.stopPropagation();
    

        genericSendRequest("http://localhost:8080/books/" + bookId, "DELETE", "", refreshBookList);
    }
    
    
    function genericSendRequest(url, method, data, handleSuccessFn){        
        $.ajax({
            url: url,
            type: method,
            data: data,
            contentType:"application/json; charset=utf-8",
            dataType: "json",
        }).done(handleSuccessFn).fail(function(xhr,status,err){
            console.log("Err", xhr,status,err);
        })
        
    }
});
