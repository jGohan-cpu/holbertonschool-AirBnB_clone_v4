#!/usr/bin/node
amenity_dict = {}
amenity_list = []

$(document).ready(function() {
    $('input:checkbox').change(function() {
    if ($(this).is(':checked')) {
        console.log("CHECKED")
        amenity_id = $(this).data("id")
        amenity_name = $(this).data("name")
        amenity_dict[amenity_name] = amenity_id
        console.log(amenity_dict)
        amenity_list = Object.getOwnPropertyNames(amenity_dict)
        console.log(amenity_list.toString())
        if (amenity_list.length !== 0) {
            $("#amenity_list").text(amenity_list.toString())
        } else {
            $("#amenity_list").text('\xa0')
        }
        

    } else {
        console.log("UNCHECKED")
        amenity_id = $(this).data("id")
        amenity_name = $(this).data("name")
        delete amenity_dict[amenity_name]
        console.log(amenity_dict)
        amenity_list = Object.getOwnPropertyNames(amenity_dict)
        console.log(amenity_list.toString())
        if (amenity_list.length !== 0) {
            $("#amenity_list").text(amenity_list.toString())
        } else {
            $("#amenity_list").text('\xa0')
        }
    }
})});