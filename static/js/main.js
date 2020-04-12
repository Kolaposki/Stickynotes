$(document).ready(function () {
    let $noteForm = $('.myNoteForm');
    $noteForm.submit(function (event) {
        event.preventDefault();
        let $formData = $noteForm.serialize();
        let $thisURL = $noteForm.attr('data-url');
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
            console.log(data.message);
            let $noteTitle = data.title;
            let $noteDescription = data.description;
            let $noteBG = data.background_color;

            console.log($noteTitle);
            console.log($noteDescription);
            console.log($noteBG);

            $("#bg").removeAttr('class').addClass("single-note add-note white");
            $noteForm[0].reset();

            let $context = '<div class="col-md-4 col-sm-6">\n' +
                '                            <form method="post">\n' +
                '\n' +
                '                                <input id="id_background_color" type="hidden" name="background_color" value="white">\n' +
                '\n' +
                '\n' +
                '                                <div id="bg" class="single-note white">\n' +
                '\n' +
                '                                    \n' +
                '\n' +
                '                                        <span class="notDone">\n' +
                '                                        <label class="my-checkbox">\n' +
                '                                            <input type="checkbox" value="note.is_done" name="is_done" id="id_is_done-74">\n' +
                '                                            <i class="checked fa-check-square fas"></i>\n' +
                '                                            <i class="unchecked fa-check-square far"></i>\n' +
                '                                        </label>\n' +
                '                                    </span>\n' +
                '                                    \n' +
                '\n' +
                '\n' +
                '\n' +
                '\n' +
                '                                    \n' +
                '                                        <h2 id="title-head-74" class="">heko </h2>\n' +
                '                                    \n' +
                '\n' +
                '                                    <input id="new_title-74" class="no-display" name="title" type="text" maxlength="20" placeholder="Type a title ..." value="heko">\n' +
                '\n' +
                '                                    <small>Last update: April 12, 2020, 7:02 p.m.</small>\n' +
                '\n' +
                '                                    <hr>\n' +
                '\n' +
                '                                    \n' +
                '                                        <p class="" id="desc_p-74">sm.sf</p>\n' +
                '                                    \n' +
                '\n' +
                '                                    <textarea class="no-display" id="desc-74" name="description">sm.sf</textarea>\n' +
                '\n' +
                '\n' +
                '                                    <div class="meta">\n' +
                '                                        <button id="update_btn-74" class="no-display" type="submit" name="update_btn">\n' +
                '                                            <i class="fas fa-check"></i>\n' +
                '                                        </button>\n' +
                '\n' +
                '                                        <span id="pencil-74"><i class="fas fa-pencil-alt"></i></span>\n' +
                '                                        <span id="palette-74" class="no-display"><i class="fas fa-palette"></i></span>\n' +
                '                                        <span><i class="far fa-trash-alt"></i></span>\n' +
                '                                        <span><i class="fas fa-expand"></i></span>\n' +
                '                                        <span><i class="fas fa-link"></i></span>\n' +
                '                                    </div>\n' +
                '\n' +
                '                                    <div id="allColor-74" class="colors">\n' +
                '                                        <div id="circle_blue-74" class="circle blue"></div>\n' +
                '                                        <div id="circle_yellow-74" class="circle yellow"></div>\n' +
                '                                        <div id="circle_red-74" class="circle red"></div>\n' +
                '                                        <div id="circle_purple-74" class="circle purple"></div>\n' +
                '                                        <div id="circle_green-74" class="circle green"></div>\n' +
                '                                        <div id="circle_white-74" class="circle whiteCircle"></div>\n' +
                '                                    </div>\n' +
                '                                    <div class="copied">\n' +
                '                                        link is copied !\n' +
                '                                    </div>\n' +
                '\n' +
                '                                </div>\n' +
                '                            </form>\n' +
                '                        </div>';

            $('.all-notes').prepend('<div class="container">{{ $noteTitle }}</div><br>' + $noteTitle +
                '<div class="container"> </div><br>'+ $noteDescription+
                '<div class="container"></div><br>'+$noteBG+'')
        }


        function handleError(ThrowError) {
            console.log(ThrowError);
        }
    });
});