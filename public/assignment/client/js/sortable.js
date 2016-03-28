/**
 * Created by guhan on 3/26/16.
 */
$(function() {
    $( "#sortable" ).sortable({
        update: function (event, ui) {
            console.log(ui);
        }
    });
    $( "#sortable" ).disableSelection();
});