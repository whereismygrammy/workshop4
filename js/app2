$( document ).ready(function() {
    var bookList = $("#book-list");
    
    bookList.on("click", "div.title", showDescription)
    
    bookList.on("click", "a.delbook", handleDeleteBook)

    var addBookForm = $("#add-book-form");
        
    addBookForm.on("submit", submitAddBook);
    
    refreshBookList();
    
    function refreshBookList(){
        $.ajax({
            url: "http://localhost:8282/books",
            type: "GET",
            data: "",
            dataType: "json",
        }).done(function(books){
            
            renderBookList(bookList, books);
        }).fail(function(xhr,status,err){
            console.log("Err", xhr,status,err);
        })
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
        
        $.ajax({
            url: "http://localhost:8282/books/" + bookId,
            type: "GET",
            data: "",
            dataType: "json",
        }).done(function(book){    
            renderDescription(descriptionRenderingPoint, book);
        }).fail(function(xhr,status,err){
            console.log("Err", xhr,status,err);
        })
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
        
        $.ajax({
            url: "http://localhost:8282/books/",
            type: "POST",
            data: JSON.stringify(newBook),
            contentType:"aplication/json; charset=utf-8",
            dataType: "json",
        }).done(function(book){    
            refreshBookList();
        }).fail(function(xhr,status,err){
            console.log("Err", xhr,status,err);
        })
        
        event.preventDefault();
        return false;
        
    }
    
    function handleDeleteBook(event){
        var bookId = $(this).parent().data("book-id");
        event.stopPropagation();
    
        $.ajax({
            url: "http://localhost:8282/books/" + bookId,
            type: "DELETE",
            data: "",
            contentType:"aplication/json; charset=utf-8",
            dataType: "json",
        }).done(function(book){    
            refreshBookList();
        }).fail(function(xhr,status,err){
            console.log("Err", xhr,status,err);
        })
        
    }
    
});