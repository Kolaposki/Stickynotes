$(document).on("click", "#create_btn", function (event) {
    event.preventDefault();
    let $noteForm = $('#createNote');
    let $formData = $noteForm.serialize();
    let $thisURL = $noteForm.attr('data-url') || window.location();


    $.ajax({
        method: 'POST',
        url: $thisURL,
        data: $formData,
        success: handleSuccess,
        error: handleError,
    });

    function onClickActions($note_pk) {

        DeleteNote($note_pk);// to delete a newly created note without refreshing the page

        $(document).on("click", "#pencil-" + $note_pk + "", function () {
            $(this).removeAttr('class').addClass("no-display");
            $("#update_btn-" + $note_pk + "").removeAttr('class').addClass("mark btn btn-lg");

            $("#desc-" + $note_pk + "").prop("readonly", false);
            $("#new_title-" + $note_pk + "").prop("readonly", false);

            $("#palette-" + $note_pk + "").removeAttr('class').addClass("");

            UpdateForm($note_pk)
        });


        $(document).on("click", "#palette-" + $note_pk + "", function () {
            $("#allColor-" + $note_pk + "").toggleClass('colors').toggleClass("colors openDivs");
        });


        $(document).on("click", "#doneMarker-" + $note_pk + "", function (myevent1) {
            $(this).attr('class', 'd-none');
            $("#new_title-" + $note_pk + "").attr('class', '');
            $("#desc-" + $note_pk + "").attr('class', '');
            $("#id_is_done-" + $note_pk + "").prop('unchecked');
            $("#id_is_done-" + $note_pk + "").val("False");
            AppendMarker(myevent1, "" + $note_pk + "");

        });


        $(document).on("click", "#id_is_done-" + $note_pk + "", function (myevent2) {
            if ($(this).prop('checked')) {
                $(this).val("True");
                $("#new_title-" + $note_pk + "").attr('class', 'isDone');
                $("#desc-" + $note_pk + "").attr('class', 'isDone');
                $("#doneCheck-" + $note_pk + "").val("True");

                AppendMarker(myevent2, "" + $note_pk + "");

            }
            if ($(this).prop('unchecked')) {
                $(this).val("False");
                $("#new_title-" + $note_pk + "").attr('class', '');
                $("#desc-" + $note_pk + "").attr('class', '');
                $("#doneCheck-" + $note_pk + "").val("False");

            }
        });


        // Color Toggles
        $(document).on("click", "#circle_yellow-" + $note_pk + "", function () {
            $(this).removeAttr('class').addClass("circle yellow selected");

            $("#circle_blue-" + $note_pk + "").removeAttr('class').addClass("circle blue");
            $("#circle_red-" + $note_pk + "").removeAttr('class').addClass("circle red");
            $("#circle_green-" + $note_pk + "").removeAttr('class').addClass("circle green");
            $("#circle_purple-" + $note_pk + "").removeAttr('class').addClass("circle purple");
            $("#circle_white-" + $note_pk + "").removeAttr('class').addClass("circle whiteCircle");


            $("#bg-" + $note_pk + "").removeAttr('class').addClass("single-note add-note yellow");
            $("#id_background_color-" + $note_pk + "").val("yellow");
        });

        $(document).on("click", "#circle_blue-" + $note_pk + "", function () {
            $(this).removeAttr('class').addClass("circle blue selected");

            $("#circle_yellow-" + $note_pk + "").removeAttr('class').addClass("circle yellow");
            $("#circle_red-" + $note_pk + "").removeAttr('class').addClass("circle red");
            $("#circle_green-" + $note_pk + "").removeAttr('class').addClass("circle green");
            $("#circle_purple-" + $note_pk + "").removeAttr('class').addClass("circle purple");
            $("#circle_white-" + $note_pk + "").removeAttr('class').addClass("circle whiteCircle");


            $("#bg-" + $note_pk + "").removeAttr('class').addClass("single-note add-note blue");
            $("#id_background_color-" + $note_pk + "").val("blue");
        });

        $(document).on("click", "#circle_red-" + $note_pk + "", function () {
            $(this).removeAttr('class').addClass("circle red selected");

            $("#circle_blue-" + $note_pk + "").removeAttr('class').addClass("circle blue");
            $("#circle_yellow-" + $note_pk + "").removeAttr('class').addClass("circle yellow");
            $("#circle_green-" + $note_pk + "").removeAttr('class').addClass("circle green");
            $("#circle_purple-" + $note_pk + "").removeAttr('class').addClass("circle purple");
            $("#circle_white-" + $note_pk + "").removeAttr('class').addClass("circle whiteCircle");


            $("#bg-" + $note_pk + "").removeAttr('class').addClass("single-note add-note red");
            $("#id_background_color-" + $note_pk + "").val("red");

        });

        $(document).on("click", "#circle_green-" + $note_pk + "", function () {
            $(this).removeAttr('class').addClass("circle green selected");

            $("#circle_blue-" + $note_pk + "").removeAttr('class').addClass("circle blue");
            $("#circle_yellow-" + $note_pk + "").removeAttr('class').addClass("circle yellow");
            $("#circle_red-" + $note_pk + "").removeAttr('class').addClass("circle red");
            $("#circle_purple-" + $note_pk + "").removeAttr('class').addClass("circle purple");
            $("#circle_white-" + $note_pk + "").removeAttr('class').addClass("circle whiteCircle");


            $("#bg-" + $note_pk + "").removeAttr('class').addClass("single-note add-note green");
            $("#id_background_color-" + $note_pk + "").val("green");
        });

        $(document).on("click", "#circle_purple-" + $note_pk + "", function () {

            $(this).removeAttr('class').addClass("circle purple selected");

            $("#circle_blue-" + $note_pk + "").removeAttr('class').addClass("circle blue");
            $("#circle_yellow-" + $note_pk + "").removeAttr('class').addClass("circle yellow");
            $("#circle_green-" + $note_pk + "").removeAttr('class').addClass("circle green");
            $("#circle_red-" + $note_pk + "").removeAttr('class').addClass("circle red");
            $("#circle_white-" + $note_pk + "").removeAttr('class').addClass("circle whiteCircle");


            $("#bg-" + $note_pk + "").removeAttr('class').addClass("single-note add-note purple");
            $("#id_background_color-" + $note_pk + "").val("purple");
        });

        $(document).on("click", "#circle_white-" + $note_pk + "", function () {
            $(this).removeAttr('class').addClass("circle white selected");

            $("#circle_blue-" + $note_pk + "").removeAttr('class').addClass("circle blue");
            $("#circle_yellow-" + $note_pk + "").removeAttr('class').addClass("circle yellow");
            $("#circle_green-" + $note_pk + "").removeAttr('class').addClass("circle green");
            $("#circle_purple-" + $note_pk + "").removeAttr('class').addClass("circle purple");
            $("#circle_red-" + $note_pk + "").removeAttr('class').addClass("circle red");


            $("#bg-" + $note_pk + "").removeAttr('class').addClass("single-note add-note white");
            $("#id_background_color-" + $note_pk + "").val("white");
        });
    }

    function storageCollector($pk, $title, $description, $bg_color, $date, $is_done) {
        //localStorage.clear();
        let $notesDict = {
            'pk': $pk,
            'title': $title,
            'description': $description,
            'bg_color': $bg_color,
            'date': $date,
            'is_done': $is_done
        };


        let $initialNotesInMemory = JSON.parse(localStorage.getItem('notes')) || []; // create empty list if no localstorage
        $initialNotesInMemory.push($notesDict);
        localStorage.setItem('notes', JSON.stringify($initialNotesInMemory));
    }

    function handleSuccess(data) {

        if (data) {
            $("#noteCreator").load(" #noteCreator > *");

        }

        console.log(data.message);
        let $noteTitle = data.title;
        let $noteDescription = data.description;
        let $noteBG = data.background_color;
        let $note_pk = data.note_pk;
        let $username = data.username;
        let $is_done = data.is_done;
        let $date_added = data.date_added;


        console.log("title: " + $noteTitle);
        console.log("desc: " + $noteDescription);
        console.log("bg color: " + $noteBG);
        console.log("pk: " + $note_pk);
        console.log("username: " + $username);

        storageCollector($note_pk, $noteTitle, $noteDescription, $noteBG, $date_added, $is_done);
        let $allNotes = JSON.parse(localStorage.getItem('notes'));
        console.log($allNotes);
        $noteForm[0].reset();
        $(".all-notes").load(" .all-notes > *");

        onClickActions($note_pk);

    }

    function handleError(ThrowError) {
        console.log("An error occurred while trying to create the note");
        console.log(ThrowError);
    }
});

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}