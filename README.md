ngKendoMultiselectDropdownTree: AngularJS directive for Kendo UI
===========

A MultiSelect dropdown tree for kenod UI , the user can select one item from the tree and will be added to the input box

## Demo

See the live demo page [here](http://varyoo.github.io/ngTagEditor).

## Installation

Add the following files to your application:

CSS

```html
  <link rel="stylesheet" href="ngMultiselectDropdownTree.css" type="text/css"/>
    <link rel="stylesheet" href="http://cdn.kendostatic.com/2014.1.318/styles/kendo.common.min.css" type="text/css"/>
    <link rel="stylesheet" href="http://cdn.kendostatic.com/2014.1.318/styles/kendo.metro.min.css" type="text/css"/>
```

JS

```html
   <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
     <script type="text/javascript" src="http://cdn.jsdelivr.net/angularjs/1.2.17/angular.min.js"></script>
     <script type="text/javascript" src="http://cdn.kendostatic.com/2014.1.318/js/kendo.all.min.js"></script>
     <script type="text/javascript" src="kendo.ext.js"></script>
     <script type="text/javascript" src="ngKendoMultiselectDropdownTree.js"></script>
```

## Usage

### Basic usage
1. Add the directive tag to the html page and set the model and options
`<multiselect-dropdown-tree ng-model="categories" options="multiSelectOptions"></multiselect-dropdown-tree>`


2. Add the ngKendoMultiselectDropdownTree module to the main module and initialize the model
```javascript
var app = angular.module('app', ['ngKendoMultiselectDropdownTree']);
app.controller('TestController', function($scope, $http) {
	$scope.categories = [
	{"Name":"Chang","ID":2},
	{"Name":"Uncle Bob's Organic Dried Pears","ID":7},
	{"Name":"Janet Leverling","ID":3}]
});
   ```
3. configure the options
```javascript
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
   ```

```javascript
        $scope.categoriesMultiSelectOptions = {
            placeholder: "Select a value...",
            output: "FullName",
            treeview: {                  // this is Kendo UI tree settings, please visit Kendo docs for more information
                dataSource: dataSource,
                dataTextField: "FullName"
            },
            dataValueField: "ID",  // this representing the value field for tye model and this will be extracted from selected tree node Id
            dataTextField: "Name"  // this representing  the test field for the model and this will be be extracted  from selected tree node text
        };
```

```html
<form ng-controller="RandomController">
	<tag-editor ng-model="tags" output="name"></tag-editor>
</form>
```

## Exemple

See `demo.html`
