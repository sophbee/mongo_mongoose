
$("#scraper").on("click", function() {
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "/scraped"
    }).then (function(data) {
        // console.log('data', data);
        alert(`"There were ${data.length} articles added!"`);
        for (var i = 0; i < data.length; i++) {
            // console.log(data);
            $("#articles").append(`
                <div class="card">
                    <div class="card-body">
                        <a href="${data[i].url}">
                            <h5>${data[i].headline}</h5>
                            <p id="snippet">${data[i].summary}</p>
                        </a>

                        <button type="button" class="btn btn-primary" id="saved">Save Article</button>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#noteModal">Add Notes</button>

                        <div class="modal fade" id="noteModal" tabindex="-1" role="dialog" aria-labelledby="noteModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="noteModalLabel">Notes</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <textarea placeholder="Add new notes here" rows="4" cols="56"></textarea>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        };
    });
});


$(document).ready(function() {
    $.ajax({
        method: "GET",
        url: "/api/articles"
    }).then (function(data) {
        for (var i = 0; i < data.length; i++) {
            // console.log(data);
            $("#articles").append(`
                <div class="card">
                    <div class="card-body" data-id="${data[i]._id}">
                        <a href="${data[i].url}">
                            <h5>${data[i].headline}</h5>
                            <p id="snippet">${data[i].summary}</p>
                        </a>

                        <button type="button" class="btn btn-primary" id="saved" data-id="${data[i]._id}">Save Article</button>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#noteModal">Add Notes</button>

                        <div class="modal fade" id="noteModal" tabindex="-1" role="dialog" aria-labelledby="noteModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="noteModalLabel">Notes</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <textarea placeholder="Add new notes here" rows="4" cols="56"></textarea>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        };
    });

    $("#saved").on("click", function() {
        event.preventDefault();
        var thisId = $(this).attr("data-id");
        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        }).then (function(data) {
            console.log(data);
            $("#notes").empty();
            $("#notes").append(`
                <div class="card">
                    <div class="card-body" data-id="${data._id}">
                        <a href="${data.url}">
                            <h5>${data.headline}</h5>
                            <p id="snippet">${data.summary}</p>
                        </a>

                        <button type="button" class="btn btn-primary" id="saved" data-id="${data._id}">Save Article</button>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#noteModal">Add Notes</button>

                        <div class="modal fade" id="noteModal" tabindex="-1" role="dialog" aria-labelledby="noteModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="noteModalLabel">Notes</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <textarea placeholder="Add new notes here" rows="4" cols="56"></textarea>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `)
        })
    })
});


//     $(document).on("click", "#addnote", function() {
//         $("#notes").empty();
//         var thisId = $(this).attr("data-id");

//         $.ajax({
//             method: "GET",
//             url: "/articles/" + thisId
//         })
//         .then(function(data) {
//             console.log(data);
//             $("#notes").append("<h2>" + data.headline + "</h2>");
//             $("#notes").append("<input id='headlineinput' name ='headline'>");
//             $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//             $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
//         })
//     })
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