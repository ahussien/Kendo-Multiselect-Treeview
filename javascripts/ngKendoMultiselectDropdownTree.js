/**
 * Created by ahg on 12/27/2014.
 */
'use strict';

angular.module('ngKendoMultiselectDropdownTree', [])

    .filter('getCol', function() {
        return function(items, row) {
            return items && items.map(function(item) {
                    return item[row];
                }).join(',');
        }
    }).directive('focusMe', [
        '$timeout', '$parse', function($timeout, $parse) {
            return {
                link: function(scope, element, attrs) {

                    var model = $parse(attrs.focusMe);
                    scope.$watch(model, function(value) {
                        var x = scope.clickedEle;
                        if (value === true) {
                            $timeout(function() {
                                element[0].focus();
                            });
                        }
                    });
                    element.bind('blur', function() {
                        scope.$apply(model.assign(scope, false));
                    });
                }
            };
        }
    ])

    .directive('multiselectDropdownTree', function() {
        return {
            restrict: 'AE',
            scope: {
                options: '=options',
                tags: '=ngModel'
            },
            replace: true,
            templateUrl: 'template.html',
            controller: [
                '$scope', '$attrs', '$element', '$http', '$filter', function($scope, $attrs, $element, $http, $filter) {
                    $scope.KendoUiExt = $scope.KendoUiExt || {};

                    $scope.getTextField = function(tag) {
                        return tag[$scope.options.dataTextField];
                    };

                    $scope.add = function(id, name) {
                        var tag = {};
                        tag[$scope.options.dataTextField] = name;
                        tag[$scope.options.dataValueField] = id;

                        $scope.tags.push(tag);
                        $scope.$apply();
                    };

                    $scope.remove = function(index) {
                        $scope.tags.splice(index, 1);
                    };

                    $scope.showTree = function() {
                        $scope.KendoUiExt.MultiSelectTreeView.showTree();
                    };

                    $scope.closeTree = function() {
                        $scope.KendoUiExt.MultiSelectTreeView.closeTree();
                    };

                    $scope.init = function() {
                        this._uid = new Date().getTime();
                        $element.after(kendo.format("<div id='extTreeView{0}' class='k-ext-treeview' style='z-index:1;'/>", 2014));

                        $scope.KendoUiExt.MultiSelectTreeView = function() {
                            var _dropdown = null;

                            var load = function() {

                                var dropDownTreeView = $(kendo.format("#extTreeView{0}", 2014)).
                                    kendoExtMultiSelectTreeView({ treeview: $scope.options.treeview }).
                                    data("kendoExtMultiSelectTreeView");

                                _dropdown = dropDownTreeView;

                                dropDownTreeView.bind("select", function(e) {
                                    var node = e.sender._treeview._current;
                                    var dataItem = e.sender._treeview.dataItem(node);
                                    var selectedFolderId = dataItem.id;
                                    console.log(dataItem);
                                    $scope.add(dataItem.id, dataItem[$scope.options.treeview.dataTextField]);
                                });
                            };

                            var unload = function() {
                            };

                            var showTree = function() {
                                _dropdown.showTree($element, $element.position().top + $element.height(), $element.position().left);
                            };

                            var closeTree = function() {
                                _dropdown.closeTree();
                            };

                            return {
                                load: load,
                                unload: unload,
                                showTree: showTree,
                                closeTree: closeTree
                            };
                        }();

                        $scope.KendoUiExt.MultiSelectTreeView.load();
                    };

                    $scope.init();
                }
            ]
        };
    });
