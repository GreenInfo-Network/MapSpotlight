/**
 * MapSpotlight - Google Maps API version
 * https://github.com/greeninfo/MapSpotlight
 *
 * Greg Allensworth  (gregor@greeninfo.org)
 * Inspired by Tristen's spotlight.js for ModestMaps    http://modestmaps.com/examples/spotlight.html    https://gist.github.com/tristen/2689194
 */

/**
 *
 * PROTOTYPE AND CONSTRUCTOR STUFF
 * AND GOOGLE MAPS BARE MINIMUM
 *
 */
function SpotlightLayer(divid,options) {
    // save the ID of our container, and find our container in the DOM
    this.containerDivId = divid;
    this.container      = document.getElementById( this.containerDivId );
    if (! this.container) throw "SpotlightLayer: Failed to find stated container DIV: " + this.containerDivId;

    // our internal list of LatLng objects which act as the center of our punchouts
    this._latlngs = [];

    // configuration options
    this.options = {
        punchRadius : 20,                           // the width of holes to punch out
        fillColor : 'rgba(0, 0, 0, 0.5)'            // the color to fill the whole canvas, to darken it
    };
    for (var i in options) if (options.hasOwnProperty(i)) this.options[i] = options[i];

    // afterthought: if the 'map' option was given then they want us to bind to a map right now
    if (this.options.map) this.setMap( this.options.map );
}
SpotlightLayer.prototype = new google.maps.OverlayView();

SpotlightLayer.prototype.onAdd = function () {
    this.canvas = document.createElement('canvas');
    this.canvas.width           = this.container.scrollWidth;
    this.canvas.height          = this.container.scrollHeight;
    this.canvas.style.position  = 'absolute';
    this.canvas.style.top       = '0';
    this.canvas.style.left      = '0';
    this.container.appendChild(this.canvas);

    this.canvasContext = this.canvas.getContext("2d");

    // request a redraw
    this.draw();
};

SpotlightLayer.prototype.onRemove = function () {
    // simply remove ourselves from the container but don't destroy anything
    // they may want to add us back again without losing the prior state
    this.container.removeChild( this.canvas );
};

SpotlightLayer.prototype.draw = function () {
    // do we even exist yet? someone could assign markers and request a draw having never used setMap()
    if (! this.container || ! this.canvas || ! this.canvasContext) throw "SpotlightLayer: Cannot call draw() yet. Try setMap() first.";

    // refresh our width & height in case the map has changed size
    this.canvas.width           = this.container.scrollWidth;
    this.canvas.height          = this.container.scrollHeight;

    // start by filling in with all gray
    this.canvasContext.fillStyle                = this.options.fillColor;
    this.canvasContext.globalCompositeOperation = "source-over";

    this.canvasContext.beginPath();
    this.canvasContext.rect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.fill();

    // look over our dots and generate white punchouts, by transforming their latlng into pixel coordinates
    this.canvasContext.fillStyle                = "white";
    this.canvasContext.globalCompositeOperation = "destination-out";
    var overlayProjection                       = this.getProjection();
    var radius                                  = this.options.punchRadius;
    var twopi                                   = 2 * Math.PI;

    for (var i=0, l=this._latlngs.length; i<l; i++) {
        var ll = this._latlngs[i];
        var px = overlayProjection.fromLatLngToContainerPixel(ll);

        this.canvasContext.beginPath();
        this.canvasContext.arc(px.x, px.y, radius, 0, twopi, true);
        this.canvasContext.closePath();
        this.canvasContext.fill();
    }

    // yay for method chaining
    return this;
};

/**
 *
 * DATA MANAGEMENT
 * ADD AND CLEAR FEATURES
 *
 */

SpotlightLayer.prototype.empty = function () {
    // if we don't have a canvas yet, they tried to call this without assigning the SpotlightLayer to a map
    // that's not good, so pitch a fit
    if (! this.container || ! this.canvas || ! this.canvasContext) throw "SpotlightLayer: Cannot call empty() yet. Try setMap() first.";

    // empty the canvas
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // and clear our internal marker list
    this._latlngs = [];

    // yay for method chaining
    return this;
};

SpotlightLayer.prototype.addLatLng = function (latlng,redraw) {
    this._latlngs.push(latlng);
    if (redraw) this.draw();
    return this;
};
SpotlightLayer.prototype.addXY = function (lat,lng,redraw) {
    var latlng = new google.maps.LatLng(lat,lng);
    this.addLatLng(latlng);
    if (redraw) this.draw();
    return this;
};
SpotlightLayer.prototype.addMarker = function (marker,redraw) {
    var latlng = marker.getPosition();
    this.addLatLng(latlng);
    if (redraw) this.draw();
    return this;
};
