angular.module('BlankApp', ['ngMaterial', 'ngMessages'])
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
    .controller('viewCtrl', function ($scope, $http) {
        console.log("view");
        $scope.pagination = {};
        $scope.pagination.pagenumber = 1;
        $scope.pagination.pagesize = 10;
        $http.post("http://localhost:1337/form/getLimited", $scope.pagination).success(function (data, status) {
            result = data;
            console.log(data);
        }).error(function () {
            console.log("err");
        });

    });