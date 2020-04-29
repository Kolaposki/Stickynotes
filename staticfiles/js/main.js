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
            $("#descPara-" + $note_pk + "").toggleClass('').toggleClass('no-display');
            $("#desc-" + $note_pk + "").toggleClass('').toggleClass('no-display');

            //SUBMIT AJAX UPDATE FORM HERE
            UpdateForm($note_pk)
        });

        $(document).on("click", "#expand-" + $note_pk + "", function () {
            $("#descPara-" + $note_pk + "").toggleClass('').toggleClass("expand");
        });

        $(document).on("click", "#palette-" + $note_pk + "", function () {
            $("#allColor-" + $note_pk + "").toggleClass('colors').toggleClass("colors openDivs");
        });


        $(document).on("click", "#doneMarker-" + $note_pk + "", function (myevent1) {
            $(this).attr('class', 'no-display');
            $("#new_title-" + $note_pk + "").attr('class', '');
            $("#desc-" + $note_pk + "").attr('class', '');
            $("#descPara-" + $note_pk + "").attr('class', 'no-display');
            $("#id_is_done-" + $note_pk + "").prop('unchecked');
            $("#id_is_done-" + $note_pk + "").val("False");
            AppendMarker(myevent1, "" + $note_pk + "");

        });


        $(document).on("click", "#id_is_done-" + $note_pk + "", function (myevent2) {
            if ($(this).prop('checked')) {
                $(this).val("True");
                $("#new_title-" + $note_pk + "").attr('class', 'isDone');
                $("#desc-" + $note_pk + "").attr('class', 'isDone');
                $("#descPara-" + $note_pk + "").attr('class', 'no-display');
                $("#doneCheck-" + $note_pk + "").val("True");

                AppendMarker(myevent2, "" + $note_pk + "");

            }
            if ($(this).prop('unchecked')) {
                $(this).val("False");
                $("#new_title-" + $note_pk + "").attr('class', '');
                $("#desc-" + $note_pk + "").attr('class', '');
                $("#doneCheck-" + $note_pk + "").val("False");
                $("#descPara-" + $note_pk + "").attr('class', 'no-display');

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

        $(document).on("click", "#link-" + $note_pk + "", function () {
            console.log("Link clciked");
            $("#copied-" + $note_pk + "").attr('class', 'copied openDivs');
            $('#copied-' + $note_pk + "").fadeOut(800, function () {
                $('#copied-' + $note_pk + "").fadeIn(300);
                $("#copied-" + $note_pk + "").attr('class', 'copied');
            });
        });
    }

    function handleSuccess(data) {

        if (data) {
            $("#bg").attr("class", "single-note add-note white");
            $("#noteCreator").load(" #noteCreator > *");
        }
        $noteForm[0].reset();
        $(".all-notes").load(" .all-notes > *"); // Reload all notes

        console.log(data.message);
        console.log("Note link: ", data.note_link);
        /**
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

         // storageCollector($note_pk, $noteTitle, $noteDescription, $noteBG, $date_added, $is_done);
         // let $allNotes = JSON.parse(localStorage.getItem('notes'));
         // console.log($allNotes);
         */
        let $note_pk = data.note_pk;

        onClickActions($note_pk);
        let clipboard_$note_pk = new ClipboardJS('#link-' + $note_pk + '');
        clipboard_$note_pk.on('success', function (e) {
            //console.log(e);
            console.log("Link copied");
            //console.info('Action:', e.action);
            console.info('Text that was copied:', e.text);
            //console.info('Trigger:', e.trigger);
            //e.clearSelection();
        });

        clipboard_$note_pk.on('error', function (e) {
            console.log(e);
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
            console.log("Error occured while Link copying");

        });


    }

    function handleError(ThrowError) {
        console.log("An error occurred while trying to create the note");
        console.log(ThrowError);
    }
});

/**
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
 function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}


 $(document).on("click", "#searchBtn", function (event) {
    console.log("Search button clicked");
    event.preventDefault();
    let $searchFomr = $('#searchForm');
    let $formData = $searchFomr.serialize();

    $.ajax({
        method: 'GET',
        url: '',
        data: $formData,
        success: handleSuccess,
        error: handleError,
    });

    function handleSuccess(data) {

        if (data) {
            // $("#noteCreator").load(" #noteCreator > *");
            console.log(data.message);
            console.log("Searching for: ", data.query);
        }
    }

    function handleError(ThrowError) {
        console.log("An error occurred while trying to create the note");
        console.log(ThrowError);
    }
});
 **/