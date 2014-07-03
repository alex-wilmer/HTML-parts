var ngAPI = angular.module('ngAPI', []);

ngAPI.controller('APIController', function ($scope, $http) {
	$scope.date = new Date();
 	$scope.city = 'Toronto';
 	$scope.getWeather = function (city) {
	  	$http
	  	.get('https://api.worldweatheronline.com/free/v1/weather.ashx?q=' 
	  		+ $scope.city + 
	  		'&format=json&num_of_days=5&key=707a8a94e3eb000ed78b12dff3007be26732de7c')
	  	.success(function(api) {
	  	$scope.days = [];
	  	for (var i=1;i<5;i++) {
	  		$scope.days[i] = {
	  			name: $scope.getDay($scope.date.getDay()+i),
	  			c: Math.floor(avgTemp(
		  				api.data.weather[i].tempMinC, 
		  				api.data.weather[i].tempMaxC)),
	  			f: Math.floor(avgTemp(
				  		api.data.weather[i].tempMinF, 
				  		api.data.weather[i].tempMaxF))
	  		}
	  	}
	    $scope.api = api.data;
	    });
	}
	$scope.getWeather($scope.city);

	//UTILITY
	$scope.number = 3;
	$scope.range = function(num) {
	    return new Array(num);   
	};

	function avgTemp (min, max) {
		min = parseInt(min); max = parseInt(max);
		return ((min + max) / 2) + 1;
	}

	$scope.getDay = function (number) {
		if (number == 0 || number == 7) { return 'Sunday'; }
		if (number == 1 || number == 8) { return 'Monday'; }
		if (number == 2 || number == 9) { return 'Tuesday'; }
		if (number == 3 || number == 10) { return 'Wednesday'; }
		if (number == 4) { return 'Thursday'; }
		if (number == 5) { return 'Friday'; }
		if (number == 6) { return 'Saturday'; }
	}
});
