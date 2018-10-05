$( document ).ready(function() {
    refreshBookList();
    
    function refreshBookList(){
        $.ajax({
            url: "http://localhost:8282/books",
            type: "GET",
            data: "",
            dataType: "json",
        }).done(function(books){
            var bookList = $("#book-list");
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
        
        return titleDiv;
    }
    
    function getDesctiprionDiv(){
        var decriptionDiv  = $("<div class='decription'>");
        return decriptionDiv;
    }
    
    
});