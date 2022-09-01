"use strict";

// markdown-it plugin for generating copy code button.
// It depends on preWrapper plugin.

/* eslint-disable max-len */
module.exports = function (md) {
  var fence = md.renderer.rules.fence;

  md.renderer.rules.fence = function () {
    var rawCode = fence.apply(void 0, arguments);
    var button = "\n    <button class=\"v-md-copy-code-btn\" type=\"button\">\n      <i>\n        <svg viewBox=\"64 64 896 896\" focusable=\"false\" data-icon=\"run\" width=\"1em\" height=\"1em\" fill=\"currentColor\" aria-hidden=\"true\">\n          <path d=\"M264.3 141.6l275.4 179.3 284 184.8c1 0.6 3.6 2.4 3.6 6.7 0 4.3-2.6 6.1-3.6 6.7L539.8 704 264.3 883.3c-0.2-1-0.3-2.1-0.3-3.5V145.1c0-1.3 0.2-2.5 0.3-3.5M262 66.2c-36.5 0-70 32.9-70 78.9v734.6c0 46 33.5 78.9 70 78.9 11.6 0 23.6-3.3 34.8-10.7L579 764.2l284-184.8c48.5-31.6 48.5-102.5 0-134.1L579 260.5 296.9 76.9c-11.3-7.3-23.2-10.7-34.9-10.7z\"></path>\n        </svg>\n      </i>\n    </button>";
    var finalCode = rawCode.replace('<!--beforeend-->', button + "<!--beforeend-->").replace('v-md-pre-wrapper', 'v-md-pre-wrapper copy-code-mode');
    return finalCode;
  };
};