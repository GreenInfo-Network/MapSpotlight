var map, markers, sppotlight;

google.maps.event.addDomListener(window, 'load', function () {
    //
    // a simple starting place
    // a map with a bunch of national capitals marked out
    //
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 2,
        center: new google.maps.LatLng(0, 0)
    });

    markers = [];
    markers.push(   new google.maps.Marker({ title:'Ecuador: Quito', position:new google.maps.LatLng(-0.216666667,-78.5), map:map })   );
    markers.push(   new google.maps.Marker({ title:'El Salvador: San Salvador', position:new google.maps.LatLng(13.7,-89.2), map:map })   );
    markers.push(   new google.maps.Marker({ title:'Ethiopia: Addis Ababa', position:new google.maps.LatLng(9.033333333,38.7), map:map })   );
    markers.push(   new google.maps.Marker({ title:'Fiji: Suva', position:new google.maps.LatLng(-18.13333333,178.416667), map:map })   );
    markers.push(   new google.maps.Marker({ title:'French Polynesia: Papeete', position:new google.maps.LatLng(-17.53333333,-149.566667), map:map })   );
    markers.push(   new google.maps.Marker({ title:'Finland: Helsinki', position:new google.maps.LatLng(60.16666667,24.933333), map:map })   );
    markers.push(   new google.maps.Marker({ title:'Greenland: Nuuk', position:new google.maps.LatLng(64.18333333,-51.75), map:map })   );
    markers.push(   new google.maps.Marker({ title:'Greece: Athens', position:new google.maps.LatLng(37.98333333,23.733333), map:map })   );
    markers.push(   new google.maps.Marker({ title:'Honduras: Tegucigalpa', position:new google.maps.LatLng(14.1,-87.216667), map:map })   );
    markers.push(   new google.maps.Marker({ title:'Haiti: Port-au-Prince', position:new google.maps.LatLng(18.53333333,-72.333333), map:map })   );
    markers.push(   new google.maps.Marker({ title:'Hungary,Budapest:', position:new google.maps.LatLng(47.5,19.083333), map:map })   );
    markers.push(   new google.maps.Marker({ title:'Sierra Leone: Freetown', position:new google.maps.LatLng(8.483333333,-13.233333), map:map })   );
    markers.push(   new google.maps.Marker({ title:'Swaziland: Mbabane', position:new google.maps.LatLng(-26.31666667,31.133333), map:map })   );
    markers.push(   new google.maps.Marker({ title:'Switzerland: Bern', position:new google.maps.LatLng(46.91666667,7.466667), map:map })   );
    markers.push(   new google.maps.Marker({ title:'Sudan: Khartoum', position:new google.maps.LatLng(15.6,32.533333), map:map })   );

    //
    // the spotlight layer
    //
    spotlight = new SpotlightLayer('map-canvas', { map:map, punchRadius:25, punchOffset:[0,-25] });

    //
    // and now our big flashy demo
    //
    setTimeout(function () {
        for (var i in markers) {
            if (markers[i].title.substr(0,1) == 'E') {
                spotlight.addMarker( markers[i] );
            }
        }
        spotlight.draw();
    }, 1000);
    setTimeout(function () {
        spotlight.empty();
        for (var i in markers) {
            if (markers[i].title.substr(0,1) == 'F') {
                spotlight.addMarker( markers[i] );
            }
        }
        spotlight.draw();
    }, 3000);
    setTimeout(function () {
        spotlight.empty();
        for (var i in markers) {
            if (markers[i].title.substr(0,1) == 'G') {
                spotlight.addMarker( markers[i] );
            }
        }
        spotlight.draw();
    }, 5000);
    setTimeout(function () {
        spotlight.empty();
        for (var i in markers) {
            if (markers[i].title.substr(0,1) == 'H') {
                spotlight.addMarker( markers[i] );
            }
        }
        spotlight.draw();
    }, 5000);
    setTimeout(function () {
        spotlight.empty();
        for (var i in markers) {
            if (markers[i].title.substr(0,1) == 'S') {
                spotlight.addMarker( markers[i] );
            }
        }
        spotlight.draw();
    }, 7000);

    //
    // and we're done, just remove from the map
    //
    setTimeout(function () {
        spotlight.empty().setMap(null);
    }, 10000);
});
