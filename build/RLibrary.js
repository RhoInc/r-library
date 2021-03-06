(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.RLibrary = factory());
}(this, (function () { 'use strict';

/* -----------------------------------------------------
 Takes an array of metadata object (see sample input) and
 a valid css selector (`parentDiv`)  and renders divs
 styled for for the example gallery (see sample output)

Sample Input for `meta`:
	[
		{
			"id":"0001-density-lattice",
			"title": "Custom Density Plot Example"
			"repository":"lattice",
			"technology":"R",
			"url":"/0001-density-lattice",
			"thumbnail":"default", //or "placeholder"
			"description":"This is a sweet description"
		},
		... //add more objects here as desired
	]

Sample Output rendered to DOM (one per object in meta:
<div class="media-tile">
    <a href="./examples/0001-density-lattice">
        <img src="./examples/0001-density-lattice/thumbnail.png" width="300" height="200" alt="0001-density-lattice">
    </a>
    <a href="./examples/0001-density-lattice" class="text-wrap">
        <p>
            <span class="media-title">Custom Density Plot Example</span>
        </p>
    </a>
</div>
   ---------------------------------------------------- */

function buildExampleList(meta, parentElement) {
    var parentDiv = d3.select(parentElement);
    var wrap = parentDiv.append("div").attr("class", "media-list");
    var items = wrap.selectAll("div").data(meta).enter().append("div").attr("class", "media-tile");

    //append image
    items.append("a").attr("href", function (d) {
        return "./examples/" + d.dir;
    }).append("img").attr({
        width: 300,
        height: 200,
        alt: function alt(d) {
            return d.id;
        },
        src: function src(d) {
            return "./examples/" + d.dir + "/thumb.png";
        }
    });

    //append text title
    items.append("a").attr("class", "text-wrap").attr("href", function (d) {
        return d.url;
    }).append("p").append("span").attr("class", "media-title").text(function (d) {
        return d.package.label;
    });
}

var index = {
  buildExampleList: buildExampleList
};

return index;

})));
