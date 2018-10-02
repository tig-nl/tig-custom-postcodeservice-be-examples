$( function() {

    $( "#streetName" ).prop( "disabled", true );

    var memPostalcode;
    var memCity;

    $('#zipCodeZone').autocomplete({
        delay: 1000,
        source: function( request, response ) {
            $.ajax( {
                url: "postcode-be.php",
                data: {
                    zipcodezone: request.term
                },
                dataType: "json",
                success: function( data ) {
                    var selectBoxArr = new Array();
                    $.each(data, function(key, value) {
                        selectBoxArr.push(data[key].postcode + ' - ' + data[key].plaats);
                    });

                    response(selectBoxArr);
                }
            },'json');
        },
        minLength: 1,
        select: function( event, ui ) {
            selectedResult = ui.item.value;
            var spliteSelectedResult = selectedResult.split(' - ');
            memPostalcode = spliteSelectedResult[0];
            memCity = spliteSelectedResult[1];
            $( "#streetName" ).prop( "disabled", false );
        }
    });


    $('#streetName').autocomplete({
        delay: 1000,
        source: function( request, response ) {
            $.ajax( {
                url: "postcode-be.php?zipcode=" + memPostalcode + "&city=" + memCity,
                data: {
                    street: request.term
                },
                dataType: "json",
                success: function( data ) {
                    var selectBoxStreetArr = new Array();

                    $.each(data, function(key, value) {
                        selectBoxStreetArr.push(data[key].straat);
                    });
                    response(selectBoxStreetArr);
                }
            } );
        },
        minLength: 1,
        select: function( event, ui ) {

        }
    });

    $('#zipcodezone').blur(function() {
        if ($(this).val().length === 0) {
            $( "#streetName" ).prop( "disabled", true );
        }
    });

});