var ngAPI = angular.module('ngAPI', []);

ngAPI.controller('APIController', function ($scope, $http) {
	$scope.date = new Date();
 	$scope.city = 'Toronto';
 	$http.get('codes.json').success(function(api){$scope.codes = api.codes;});
 	$scope.getForecast = function (city) {
	  	$http
	  	.get('https://api.worldweatheronline.com/free/v1/weather.ashx?q=' 
	  		+ $scope.city + 
	  		'&format=json&num_of_days=5&key=707a8a94e3eb000ed78b12dff3007be26732de7c')
	  	.success(function(api) {
		  	$scope.days = [];
		  	for (var i=1;i<5;i++) {
		  		$scope.days[i] = {
		  			name: $scope.DayString($scope.date.getDay()+i),
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
	$scope.getForecast($scope.city);

	//UTILITY
	$scope.number = 3;
	$scope.Range = function(num) {
	    return new Array(num);   
	};

	$scope.DayString = function (number) {
		if (number == 0 || number == 7) { return 'Sunday'; }
		if (number == 1 || number == 8) { return 'Monday'; }
		if (number == 2 || number == 9) { return 'Tuesday'; }
		if (number == 3 || number == 10) { return 'Wednesday'; }
		if (number == 4) { return 'Thursday'; }
		if (number == 5) { return 'Friday'; }
		if (number == 6) { return 'Saturday'; }
	}

	$scope.MonthString = function (number) {
		if (number == 0) { return 'January'; }
		if (number == 1) { return 'February'; }
		if (number == 2) { return 'March'; }
		if (number == 3) { return 'April'; }
		if (number == 4) { return 'May'; }
		if (number == 5) { return 'June'; }
		if (number == 6) { return 'July'; }
		if (number == 7) { return 'August'; }
		if (number == 8) { return 'September'; }
		if (number == 9) { return 'October'; }
		if (number == 10) { return 'November'; }
		if (number == 11) { return 'December'; }
	}

	function avgTemp (min, max) {
		min = parseInt(min); max = parseInt(max);
		return ((min + max) / 2) + 1;
	}
});
