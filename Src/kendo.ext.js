/// <version>2013.04.14</version>
/// <summary>Works with the Kendo UI 2013 Q1 and jQuery 1.9.1</summary>
(function (kendo, $) {
    var ExtMultiSelectTreeView = kendo.ui.Widget.extend({
        _uid: null,
        _treeview: null,
        _dropdown: null,

        init: function (element, options) {
            var that = this;
            //init Kendo
            kendo.ui.Widget.fn.init.call(that, element, options);

            //Generate Unique ID
            that._uid = new Date().getTime();

            $(element).append(kendo.format("<div id='extTreeView{0}' class='k-ext-treeview' style='z-index:1;'/>", that._uid));

            // Create the treeview.
            that._treeview = $(kendo.format("#extTreeView{0}", that._uid)).kendoTreeView(options.treeview).data("kendoTreeView");
            that._treeview.bind("select", function (e) {
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
                    $treeviewRootElem.addClass("k-custom-visible");
                });
            }
        },

        closeTree: function () {
        },

        options: {
            name: "ExtMultiSelectTreeView"
        }
    });
    kendo.ui.plugin(ExtMultiSelectTreeView);

})(window.kendo, window.kendo.jQuery);
