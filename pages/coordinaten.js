//new
function coordinaten(){

 // Create the search box and link it to the UI element.
 var input = document.getElementById('pac-input');
 var searchBox = new google.maps.places.SearchBox(input);
 map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

 // Bias the SearchBox results towards current map's viewport.
 map.addListener('bounds_changed', function() {
   searchBox.setBounds(map.getBounds());
 });


}
        