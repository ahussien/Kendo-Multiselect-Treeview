/// <version>2013.04.14</version>
/// <summary>Works with the Kendo UI 2013 Q1 and jQuery 1.9.1</summary>

(function (kendo, $) {
    kendo.arrays = {
        /// <signature>
        ///   <summary>
        ///   Extend the kendo namespace with additional functions.
        ///   </summary>
        /// </signature>

        find: function (array, criteria) {
            /// <signature>
            ///   <summary>Find a JSON Object in an array.</summary>
            ///   <param name="array" type="Array">Array of JSON objects.</param>
            ///   <param name="criteria" type="Object">
            ///     Criteria to find the JSON Object.
            ///     - attr: the name of the JSON attribute to search on.
            ///     - value: the value of to find.
            ///   </param>
            ///   <returns type="JSON Object or null if not found" />
            /// </signature>

            var result = null;
            $.each(array, function (idx, item) {
                if (item[criteria.attr] != undefined) {
                    if (item[criteria.attr].toString() == criteria.value) {
                        result = item;
                        return false;
                    }
                }
            });
            return result;
        },

        findAll: function (array, criteria) {
            /// <signature>
            ///   <summary>Find a JSON Object in an array.</summary>
            ///   <param name="array" type="Array">Array of JSON objects.</param>
            ///   <param name="criteria" type="Object">
            ///     Criteria to find the JSON Objects.
            ///     - attr: the name of the JSON attribute to search on.
            ///     - value: the value of to find.
            ///   </param>
            ///   <returns type="JSON Objects or null if not found" />
            /// </signature>

            var results = [];
            $.each(array, function (idx, item) {
                if (item[criteria.attr] != undefined) {
                    if (item[criteria.attr].toString() == criteria.value) {
                        results.push(item);
                    }
                }
            });
            return results.length == 0 ? null : results;
        }
    };
    /*
     *
     * ExtMultiSelectTreeView
     *
     */

    var ExtMultiSelectTreeView = kendo.ui.Widget.extend({
        _uid: null,
        _treeview: null,
        _dropdown: null,

        init: function (element, options) {
            var that = this;
            kendo.ui.Widget.fn.init.call(that, element, options);
            that._uid = new Date().getTime();

          //  $(element).append(kendo.format("<input id='extDropDown{0}' class='k-ext-dropdown'/>", that._uid));
            $(element).append(kendo.format("<div id='extTreeView{0}' class='k-ext-treeview' style='z-index:1;'/>", that._uid));

            //// Create the dropdown.
            //that._dropdown = $(kendo.format("#extDropDown{0}", that._uid)).kendoMultiSelect({
            //    dataSource: [{ text: "", value: "" }],
            //    dataTextField: "text",
            //    dataValueField: "value",
            //    open: function (e) {
            //        //to prevent the dropdown from opening or closing. A bug was found when clicking on the dropdown to 
            //        //"close" it. The default dropdown was visible after the treeview had closed.
            //        e.preventDefault();
            //        // If the treeview is not visible, then make it visible.
            //        if (!$treeviewRootElem.hasClass("k-custom-visible")) {
            //            // Position the treeview so that it is below the dropdown.
            //            $treeviewRootElem.css({
            //                "top": $dropdownRootElem.position().top + $dropdownRootElem.height(),
            //                "left": $dropdownRootElem.position().left
            //            });
            //            // Display the treeview.
            //            $treeviewRootElem.slideToggle('fast', function () {
            //                that._dropdown.close();
            //                $treeviewRootElem.addClass("k-custom-visible");
            //            });
            //        }
            //    }
            //}).data("kendoMultiSelect");

            //if (options.dropDownWidth) {
            //    that._dropdown._inputWrapper.width(options.dropDownWidth);
            //}

            //var $dropdownRootElem = $(that._dropdown.element).closest("div.k-multiselect");

            // Create the treeview.
            that._treeview = $(kendo.format("#extTreeView{0}", that._uid)).kendoTreeView(options.treeview).data("kendoTreeView");
            that._treeview.bind("select", function (e) {
                // When a node is selected, display the text for the node in the dropdown and hide the treeview.
                //  $dropdownRootElem.find("span.k-input").text($(e.node).children("div").text());

                //that.trigger("select", e);

                $treeviewRootElem.slideToggle('fast', function () {
                    $treeviewRootElem.removeClass("k-custom-visible");
                    that.trigger("select", e);
                });
            });

            var $treeviewRootElem = $(that._treeview.element).closest("div.k-treeview");

            // Hide the treeview.
            $treeviewRootElem
                .css({
                    "border": "1px solid #DADADA",
                    "display": "none",
                    "position": "absolute",
                    "background-color": "white"
                });

            $(document).click(function (e) {
                // Ignore clicks on the treetriew.
                if ($(e.target).closest("div.k-treeview").length == 0) {
                    // If visible, then close the treeview.
                    if ($treeviewRootElem.hasClass("k-custom-visible")) {
                        $treeviewRootElem.slideToggle('fast', function () {
                            $treeviewRootElem.removeClass("k-custom-visible");
                        });
                    }
                }
            });
        },

        dropDownList: function () {
            return this._dropdown;
        },

        treeview: function () {
            return this._treeview;
        },
        showTree: function (element,top,left) {
          //  var $dropdownRootElem = $(this._dropdown.element).closest("div.k-multiselect");
            var $treeviewRootElem = $(this._treeview.element).closest("div.k-treeview");
            if (!$treeviewRootElem.hasClass("k-custom-visible")) {
                // Position the treeview so that it is below the dropdown.
                $treeviewRootElem
                   .width($(element).parent().width()-2)
                   .css({
                    "top": top,
                    "left": left
                   });
              
                // Display the treeview.
                $treeviewRootElem.slideToggle('fast', function () {
                    //  this._dropdown.close();
                    $treeviewRootElem.addClass("k-custom-visible");
                });
            }
        },
        closeTree: function () {
            //var $treeviewRootElem = $(this._treeview.element).closest("div.k-treeview");
            //if ($treeviewRootElem.hasClass("k-custom-visible")) {
            //    $treeviewRootElem.slideToggle('fast', function () {
            //        $treeviewRootElem.removeClass("k-custom-visible");
            //    });
            //}
        },

        options: {
            name: "ExtMultiSelectTreeView"
        }
    });
    kendo.ui.plugin(ExtMultiSelectTreeView);

})(window.kendo, window.kendo.jQuery);
