/**
 * Created by ahg on 12/27/2014.
 */
angular.module('app', ['ngKendoMultiselectDropdownTree'])
    .controller('TestController', function($scope){

        var dataSource = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                    url: "http://demos.telerik.com/kendo-ui/service/Employees",
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
                dataSource: dataSource,
                dataTextField: "FullName"
            },
            dataValueField: "ID",
            dataTextField: "Name"
        };

        $scope.categories =  [
            { Name: "Chang", ID: 2 },
            { Name: "Uncle Bob's Organic Dried Pears", ID: 7 }
        ];
    });