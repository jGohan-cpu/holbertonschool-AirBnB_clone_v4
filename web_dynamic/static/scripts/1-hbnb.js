#!/usr/bin/node
// This is the shebang line, which tells the system that this file should be run using Node.js.

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

        $('.amenities h4').text(Object.values(amenityIds).join(', '));
        // Selects the h4 element inside the element with class 'amenities', and sets its text content to the comma-separated list of amenity names stored in the 'amenityIds' object.
    });
});
