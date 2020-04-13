$(document).ready(function () {
    let $noteForm = $('.myNoteForm');
    $noteForm.submit(function (event) {
        event.preventDefault();
        let $formData = $noteForm.serialize();
        let $thisURL = $noteForm.attr('data-url') || window.location();
        console.log($formData);
        console.log($thisURL);

        $.ajax({
            method: 'POST',
            url: $thisURL,
            data: $formData,
            success: handleSuccess,
            error: handleError,
        });


        function onClickActions($note_pk) {

            $(document).on("click", "#pencil-" + $note_pk + "", function () {
                $(this).removeAttr('class').addClass("no-display");
                $("#update_btn-" + $note_pk + "").removeAttr('class').addClass("marker btn btn-lg");

                $("#desc-" + $note_pk + "").removeAttr('class').addClass("");
                $("#desc_p-" + $note_pk + "").addClass("no-display");

                $("#new_title-" + $note_pk + "").removeAttr('class').addClass("");
                $("#title-head-" + $note_pk + "").addClass("no-display");

                $("#palette-" + $note_pk + "").removeAttr('class').addClass("");
            });

            $(document).on("click", "#palette-" + $note_pk + "", function () {
                $("#allColor-" + $note_pk + "").toggleClass('colors').toggleClass("colors openDivs");
            });

            $(document).on("click", "#id_is_done-" + $note_pk + "", function () {
                if ($(this).prop('checked')) {
                    $(this).val("True");
                    $("#title-head-" + $note_pk + "").removeAttr('class').addClass("isDone");
                    $("#desc_p-" + $note_pk + "").removeAttr('class').addClass("isDone")
                } else {
                    $(this).val("False");
                    $("#title-head-" + $note_pk + "").removeAttr('class').addClass("");
                    $("#desc_p-" + $note_pk + "").removeAttr('class').addClass("")
                }
            });

            $(document).on("click", "#doneMarker-" + $note_pk + "", function () {
                $(this).removeAttr('class').addClass("no-display");
                $("#title-head-" + $note_pk + "").removeAttr('class').addClass("");
                $("#desc_p-" + $note_pk + "").removeAttr('class').addClass("");
                $("#2doneMarker-" + $note_pk + "").removeAttr('class').addClass("notDone");
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


        function handleSuccess(data) {

            if (data) {
                $(".all-notes").load(" .all-notes > *");
            }

            console.log(data.message);
            let $noteTitle = data.title;
            let $noteDescription = data.description;
            let $noteBG = data.background_color;
            let $note_pk = data.note_pk;

            console.log("title: " + $noteTitle);
            console.log("desc: " + $noteDescription);
            console.log("bg color: " + $noteBG);
            console.log("pk: " + $note_pk);

            $("#bg").removeAttr('class').addClass("single-note add-note white");
            $noteForm[0].reset();

            onClickActions($note_pk)

        }

        function handleError(ThrowError) {
            console.log(ThrowError);
        }
    });
});


/**
// myUpdateNoteForm
$(document).ready(function () {
    let $updateNoteForm = $('.myUpdateNoteForm');

    $updateNoteForm.submit(function (event) {
        event.preventDefault();
        let $formData = $updateNoteForm.serialize();
        let $thisURL = $updateNoteForm.attr('data-url') || window.location();

        console.log($formData);
        console.log($thisURL);

        $.ajax({
            method: 'POST',
            url: $thisURL,
            data: $formData,
            success: handleSuccess,
            error: handleError,
        });

        function handleSuccess(data) {

            if (data) {
                $(".all-notes").load(" .all-notes > *");
            }

            console.log(data.message);
            console.log("Note id: "+data.pk);
        }

        function handleError(ThrowError) {
            console.log("AN ERROR OCCURRED WHILE UPDATING FORM !!")
            console.log(ThrowError);
        }
    });
});
 **/