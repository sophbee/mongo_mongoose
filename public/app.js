
$("#scraper").on("click", function() {
    $.ajax({
        method: "GET",
        url: "api/articles"
    }).then (function(data) {
        for (var i = 0; i < data.length; i++) {
            $("#articles").append(`
            <div class="card">
                <div class="card-body" data-id="${data[i]._id}>
                    <h5 class="card-title">${data[i].headline}</h5>
                    <p class="card-text">${data[i].summary}</p>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="notesModal"> <a href="${data[i].url}">Read more!</a></button>
                    <button type="button" class="btn btn-primary" id="addnote">Add a note</button>
                </div>
            </div>
            `);
        };
    });
});

    // $.getJSON("/api/articles", function(data) {
    //     for (var i = 0; i < data.length; i++) {
    //         $("#articles").append(`
    //         <div class="card">
    //             <div class="card-body" data-id="${data[i]._id}>
    //                 <h5 class="card-title">${data[i].headline}</h5>
    //                 <p class="card-text">${data[i].summary}</p>
    //                 <button type="button" class="btn btn-primary" data-toggle="modal" data-target="notesModal"> <a href="${data[i].url}">Read more!</a></button>
    //                 <button type="button" class="btn btn-primary" id="addnote">Add a note</button>
    //             </div>
    //         </div>
    //         `);
    //     }
    // });

// });



// When the add note button is clicked on...
// $(document).ready(function() {
//     $(document).on("click", "#addnote", function() {
//         $("#notes").empty();
//         var thisId = $(this).attr("data-id");
//         $.ajax({
//             method: "GET",
//             url: "/articles/" + thisId
//         })
//         .then (function(data) {
//             console.log(data);
            
//         });
//         $(".modal-body").val();
//     });
// });