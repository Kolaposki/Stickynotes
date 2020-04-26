// Use Strict Mode
"use strict";

(function stickyNotes() {

    /*
    ---------------------------
        Functions
    ---------------------------
    */

    // Define a function to get link parameter
    function getParam(query) {
        var param = {};
        var link = window.location.search;
        link = link.replace('?', '');
        var divide = link.split('&').forEach(function (variable) {
            var half = variable.split('=');
            param[half[0]] = half[1];
        });

        if (param[query]) {
            return param[query];
        } else {
            return '';
        }
    }

    // Vue Instances
    var header = new Vue({
        el: '#header',
        data: {
            isHashtag: getParam('search')
        }
    });


    var addNote = new Vue({
        el: '#notes',
        components: {
            'sticky-notes': httpVueLoader('../components/multiNotes.vue'),
            'shared-note': httpVueLoader('../components/sharedNote.vue')
        }
    });

})();


/**
 $(".pencil").click(function () {
        // $("#jr").startsWith()
        // when the pencil is clicked. Enable editing of the note and show the mark button
        $(this).removeAttr('class').addClass("no-display");
        $("#update_btn").removeAttr('class').addClass("marker btn btn-lg");

        $("#desc").removeAttr('class').addClass("");
        $("#desc_p").addClass("no-display");

        $("#new_title").removeAttr('class').addClass("");
        $("#title-head").addClass("no-display");
    });


 let idCount = 0;
 $('div').each(function () {
        $(this).attr('id', 'q'+ idCount);
        idCount++;
    });

 // Select id that starts from pencil-
 $("[id^=pencil-]").click(function () {
        let id = $(this).data('id');
        // $("#jr").startsWith()
        // when the pencil is clicked. Enable editing of the note and show the mark button
        $(this).removeAttr('class').addClass("no-display");
        $("[id^=update_btn-]").removeAttr('class').addClass("marker btn btn-lg");

        $("[id^=desc-]").removeAttr('class').addClass("");
        $("[id^=desc_p-]").addClass("no-display");

        $("[id^=new_title-]").removeAttr('class').addClass("");
        $("[id^=title-head-]").addClass("no-display");
    });
 **/


