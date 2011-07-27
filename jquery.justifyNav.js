// This software is licensed under the MIT License, http://www.opensource.org/licenses/mit-license.php
// Copyright (c) 2011 High Integrity Design, LLC.    http://www.highintegritydesign.com
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
// and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions
// of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
// TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
// CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.
// *************************************************************************************************************
//
// jquery.justifyNav.js plug-in
//
// calculate a margin-right that will equally space an arbitrary number of nav links
// to fill the width of the entire enclosing container.
// each <li> can have arbitrary width.
// algorithm:
// A = width of enclosing container
// B = width of all <li> elements added together
// C = A - B (total space available for spacing between list items)
// Margin right = C / (number of <li> elements - 1)
//
(function($) {
	$.fn.justifyNav = function() {
		return this.each(function() {
			var $this = $(this),
				$children = $this.children(),
				containerWidth = $this.width(),
				linksWidth = 0,
				count = $children.length;
			$children.each(function() {
				linksWidth += $(this).outerWidth();
			});

			// Don't give the last item or the 2nd to last item any right margin, then float the last item right. 
			// This will account for small errors in JQuery's calculation of the item widths. 
			// Otherwise the list can overflow the container!
			var linkSpacing = Math.floor((containerWidth - linksWidth) / (count - 1));
			$children
				.css('margin-right', linkSpacing + "px")
				.filter(":last")
					.css({"margin-right":0,"float":"right"})
					.prev()
						.css({"margin-right":0});
		});
	};
})(jQuery);
