# MapSpotlight

Draw attention to specific markers on the map by darkening the map and "spotlighting" those markers. The visual impact is quite something.

The SpotlightLayer is supported for these map libraries. Simply load up the appropriate _.js_ file as needed.

* Google Maps
* Leaflet

The best way to get started, is to grab the release and/or peruse the _examples_ folder.


# Constructor and Options

The constructor and supported options, may vary depending on your map library. Attempts are made to keep it consistent, but future features may prove specific to one library.

_**fillColor**_ 

The color of the canvas to black out the map. Default is _rgba(0,0,0,0.5)_

You probably should use a RGBA code to keep finer control over the opacity, e.g. _rgba(0, 0, 0, 0.25)_, but if you like a completely solid blackout then _#rrggbb_ or _rgb(r,g,b)_ formats may be used as well.

_**punchRadius**_

The radius (pixels) of the white "holes" punched into the blackout, in order to form the spotlights. Default is 20.

_**punchOffset**_

A pair of offsets (pixels) for shifting the punchout circles, shifting them up/own and left/right. This is useful for markers whose anchor is not the center of the icon, or which are otherwise asymmetric. Default is _[0,0]_ for no offset.

The values are for X and Y. A positive X shifts the punchout to the right, and a positive Y shifts the punchout downward; negative values shift left and up.

_**map**_

Optional; Google only. If supplied, the SpotlightLayer will call setMap() to connect itself to the specified map.


# Methods

_**draw()**_

Redraw/refresh the display of the canvas fill and the punchouts.

_**addLatLng(latlng, redraw?)**_

Given a LatLng object (whatever map library you're using) add that spot as a punchout.

Optional _redraw_ parameter will trigger _draw()_ after adding the new feature.

_**addMarker(marker, redraw?)**_

Given a Marker object (whatever map library you're using), extract the LatLng and add that spot as a punchout.

Optional _redraw_ parameter will trigger _draw()_ after adding the new feature.

_**addXY(lat, lon, redraw?)**_

Given a numeric latitude and longitude, construct a LatLng and add that spot as a punchout.

Optional _redraw_ parameter will trigger _draw()_ after adding the new feature.

_**empty()**_

Clear all punchouts, then hide the canvas so the map is not completely blacked out.


# Credits

Written by Greg Allensworth @ GreenInfo Network.

Inspired by a gist by Tristen, originally for ModestMaps.

http://modestmaps.com/examples/spotlight.html
https://gist.github.com/tristen/2689194
