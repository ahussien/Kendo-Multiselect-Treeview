/**
 * Created by ahg on 12/27/2014.
 */
angular.module('app', ['ngKendoMultiselectDropdownTree'])
    .controller('TestController', function($scope){

        var serviceRoot = "http://demos.telerik.com/kendo-ui/service";
        var homogeneous = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                    url: serviceRoot + "/Employees",
                    dataType: "jsonp"
                }
            },
            schema: {
                model: {
                    id: "EmployeeId",
                    hasChildren: "HasEmployees"
                }
            }
        });


        $scope.categoriesMultiSelectOptions = {
            placeholder: "Select a value...",
            output: "FullName",
            treeview: {
                dataSource: homogeneous,
                dataTextField: "FullName"
            },
            dataValueField: "EmployeeId",
            dataTextField: "FullName"

        };


        $scope.categories =  [
            { FullName: "Chang", EmployeeId: 2 },
            { FullName: "Uncle Bob's Organic Dried Pears", EmployeeId: 7 }
        ];
    });