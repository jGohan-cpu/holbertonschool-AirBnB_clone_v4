#!/usr/bin/node
// This is the shebang line, which tells the system that this file should be run using Node.js.

function printPlace(obj) {
    // This function takes an object as an argument and appends a new article element to the element with class 'places' using template literals.

    $('.places').append(`
        <article>
            <div class="title_box">
                <h2>${obj.name}</h2>
                <div class="price_by_night">$${obj.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${obj.max_guest} Guests</div>
              <div class="number_rooms">${obj.number_rooms} Bedrooms</div>
              <div class="number_bathrooms">${obj.number_bathrooms} Bathrooms</div>
            </div>
            <div class="description">
                ${obj.description}
            </div>
        </article>`);
}

$(document).ready(function () {
    // This is a jQuery function that waits for the document to be fully loaded before executing the code inside.

    const amenityIds = {};
    // Declaring an empty object 'amenityIds' that will store the selected amenity IDs and their corresponding names.

    $('input[type=checkbox]').change(function () {
        // This is a jQuery event listener that waits for a change event on any checkbox input element.

        const amenityId = $(this).data('id');
        // This retrieves the value of the 'data-id' attribute of the checkbox that triggered the event, and stores it in the 'amenityId' variable.

        const amenityName = $(this).data('name');
        // This retrieves the value of the 'data-name' attribute of the checkbox that triggered the event, and stores it in the 'amenityName' variable.

        if ($(this).prop('checked')) {
            // If the checkbox is checked...

            amenityIds[amenityId] = amenityName;
            // ...add the amenity ID and name to the 'amenityIds' object.
        } else {
            // If the checkbox is unchecked...

            delete amenityIds[amenityId];
            // ...remove the amenity ID and name from the 'amenityIds' object.
        }
    

        $('.amenityFilter h4').text(Object.values(amenityIds).join(', '));
        // Selects the h4 element inside the element with class 'amenityFilter', and sets its text content to the comma-separated list of amenity names stored in the 'amenityIds' object.
    });
})

    $('button').click(function () {
        // This is a jQuery event listener that waits for a click event on any button element.

        if (Object.keys(amenityIds).length !== 0) {
            // If there are selected amenities...

            $('.places').text('');
            // Clears the text content of the element with class 'places'.

            $.ajax({
                // This is a jQuery AJAX request.

                type: 'POST',
                // Specifies the type of request.

                url: 'http://0.0.0.0:5001/api/v1/places_search/',
                // Specifies the URL to send the request to.

                contentType: "application/json; charset=utf-8",
                // Specifies the content type of the request.

                data: JSON.stringify({}),
                // Specifies the data to send with the request.

                success: function (data) {
                    // Assuming you want to sort the places by name, for example
                    data.sort((a, b) => a.name.localeCompare(b.name));
                
                    // Now, iterate through the sorted data and use the printPlace function to render each place
                    data.forEach(place => printPlace(place));
                }
            })
        }
    })
