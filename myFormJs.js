angular.module('BlankApp', ['ngMaterial', 'ui.bootstrap'])
    .controller('AppCtrl', function ($scope, $http) {
        $scope.myDate = new Date();
        $scope.user = {};
        $scope.user.contacts = [{}];
        $scope.minDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 2,
            $scope.myDate.getDate());

        $scope.maxDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() + 2,
            $scope.myDate.getDate());
        $scope.items = [{}];

        //add div
        $scope.add = function () {
            $scope.user.contacts.push({});
        }
        $scope.onlyWeekendsPredicate = function (date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        };
        $scope.submitForm = function (user) {
            console.log(user);
            $http.post("http://localhost:1337/form/save", user).success(function (data, status) {
                result = data;
            }).error(function () {
                console.log("err");
            });
        }
    })
    .controller('viewCtrl', function ($scope, $http, $timeout) {
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;
        $scope.pagination.pagesize = 10;
        $scope.data = [];
        $scope.manyContacts = '';
        $http.post("http://localhost:1337/form/getLimited", $scope.pagination).success(function (data, status) {


            $scope.data = data.data.data;
            for (var i = 0; i < $scope.data.length; i++) {
                $scope.manyContacts = '';
                // console.log($scope.data[i]);
                for (var j = 0; j < $scope.data[i].contacts.length; j++) {
                    if ($scope.manyContacts == '') {
                        $scope.manyContacts = $scope.data[i].contacts[j].number;
                    } else {
                        $scope.manyContacts = $scope.manyContacts + ", " + $scope.data[i].contacts[j].number;

                    }
                }
            }

            console.log($scope.data);

        }).error(function () {
            console.log("err");
        });


        // $scope.data = [{
        //     "name": "Bell",
        //     "id": "K0H 2V5"
        // }, {
        //     "name": "Bell",
        //     "id": "K0H 2V5"
        // }, {
        //     "name": "Octavius",
        //     "id": "X1E 6J0"
        // }, {
        //     "name": "Geraldine",
        //     "id": "O9K 2M3"
        // }, {
        //     "name": "Hakeem",
        //     "id": "S5P 3P6"
        // }];

        $timeout(function () {
            $scope.totalItems = $scope.data.length;
            console.log($scope.totalItems);
        }, 1000);

        $scope.currentPage = 4;
        $scope.itemsPerPage = 5;
        $scope.maxSize = 5; //Number of pager buttons to show

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
        };

        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first paghe
        }
    });