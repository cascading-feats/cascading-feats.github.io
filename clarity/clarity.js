$(document).ready(function() {
    // Automatically adjusting selector width based on the text width
    $("#image-selector1-temp-option").html($('#image-selector1 option:selected').text());
    $('#image-selector1').width($("#image-selector1-temp").width());
    $("#image-selector2-temp-option").html($('#image-selector2 option:selected').text());
    $('#image-selector2').width($("#image-selector2-temp").width());

    $('#image-selector1, #image-selector2').change(function() {
        $("#image-selector1-temp-option").html($('#image-selector1 option:selected').text());
        $('#image-selector1').width($("#image-selector1-temp").width());

        $("#image-selector2-temp-option").html($('#image-selector2 option:selected').text());
        $('#image-selector2').width($("#image-selector2-temp").width());

        var label1 = $('#image-selector1').val()
        var label2 = $('#image-selector2').val()
    })
})
