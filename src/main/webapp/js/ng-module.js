/*---------------------ng (start)----------------------------------------------------*/
var app = angular.module('myApp', ['easypiechart', 'infinite-scroll', 'ui.bootstrap', 'ngRoute'])

.directive('onFinishRender', function ($timeout) {
//	alert('onFinishRender');
	return {
	    restrict: 'A',
	    link: function (scope, element, attr) {
	        if (scope.$last === true) {
	            $timeout(function () {
	                scope.$emit(attr.onFinishRender);
	            });
	        }
	    }
	}})
//		.directive('myRepeatDirective', function() {
//			  return function(scope, element, attrs) {
//			    angular.element(element).css('color','blue');
//			    if (scope.$last){
//			      //window.alert("im the last!");
//			      tbodyRepeat();
//			    }
//			  };
//			})
	;

app.directive('iCheck', function($timeout) {
    return {
      link: function(scope, element, attrs) {
        return $timeout(function() {
          return !$(element).iCheck ? "" : $(element).iCheck({
        	  checkboxClass: 'icheckbox_minimal', // 체크박스 class
              radioClass: 'iradio_minimal', // 라디오 class
              increaseArea: '20%' // 클릭 영역 증가수치
          });
        });
      }
    };
  });

app.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
            	buttonText: "Select date",
    			dayNamesMin : [ "S", "M", "T", "W", "T", "F", "S" ],
    			monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
    			dateFormat : "yy-mm-dd",
    			firstDay : 0,
                onSelect: function (date) {
                	$(element).addClass('inp-date1');
//                	angular.element(this.el).addClass('inp-date1');
                    scope.date = date;
                    scope.$apply();
                }
            });
        }
    };
});

app.directive('currencyInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
        
            ngModelCtrl.$render = function() {
	        	if(ngModelCtrl.$viewValue == undefined){
	                return false;
	              }
	            if(ngModelCtrl.$viewValue != ''){
	                var pattern = /(\d{4})(\d{2})(\d{2})/;
	                var  tempdate = new  Date(ngModelCtrl.$viewValue.replace(pattern, '$1-$2-$3'));
	                $element.val($filter('date')(tempdate, "yyyy-MM-dd"))
	            }
	            if(ngModelCtrl.$viewValue == '' || ngModelCtrl.$viewValue == null){
	            	$element.val('')
	            }
            }
            

        }
        
    }
})





//	function doGetFunc($scope, $http) {
//  $http.get("${pageContext.request.contextPath}/web/selectAllUnitTaskList.json")
//  .then(function (response) {$scope.result = response.data.resultList;});
//	}

app.filter('resultDateFormat', function dateFormat($filter){
	  return function(text){
		  	if(text == undefined || text == '') return '';
		    var pattern = /(\d{4})(\d{2})(\d{2})/;
		    var  tempdate = new Date(text.replace(pattern, '$1-$2-$3'));
		    return $filter('date')(tempdate, "yyyy.MM.dd");  
		  }
		});

app.filter('taskDateFormat', function dateFormat($filter){
	  return function(text){
		  	if(text == undefined || text == '') return '';
		    var pattern = /(\d{4})(\d{2})(\d{2})/;
		    var  tempdate = new Date(text.replace(pattern, '$1-$2-$3'));
		    return $filter('date')(tempdate, "MM.dd");  
		  }
		});

app.filter('regDateFormat', function dateFormat($filter){
	  return function(text){
		  	if(text == undefined || text == '') return '';
		    var pattern = /(\d{4})(\d{2})(\d{2})/;
		    var tempdate = new Date(text.replace(/-/g, "/").replace(pattern, '$1-$2-$3'));
		    return $filter('date')(tempdate, "yyyy-MM-dd");  
		  }
		});

app.filter('numberFixedLen', function () {
    return function (n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        num = ''+num;
        while (num.length < len) {
            num = '0'+num;
        }
        return num;
    };
});

app.filter('start', function () {
    return function (input, start) {
        if (!input || !input.length) { return; }
        start = +start;
        return input.slice(start);
    };
});

app.filter('notiDateFormat', function dateFormat($filter){
	  return function(text){
		  	if(text == undefined) return '';
		    var pattern = /(\d{4})(\d{2})(\d{2})/;
		    var  tempdate = new Date(text.replace(pattern, '$1-$2-$3'));
		    return $filter('date')(tempdate, "yy.MM.dd");  
		  }
		});

app.filter('highlight', function($sce) {
	    return function(text, phrase) {
	    		
	      if (phrase){
	    	  var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
	    	  regExp.test(phrase) ? phrase = '\\'+phrase : phrase;
	    	  text = text.replace(new RegExp('('+phrase+')', 'gi'),
	        '<span class="highlighted">$1</span>')
	      }
	      return $sce.trustAsHtml(text)
	    };
});


app.factory('searchUserListQeury', function() {
//    var data = {};
//    data.searchUserListQeury = "";
    var data = "";
    return data;
});

app.directive('focusMe', function($timeout) {
	  return function(scope, element, attrs) {
	      $timeout(function() {
	        element[0].focus();
	      });
	    };
	});

app.directive('krInput', [ '$parse', function($parse) {
    return {
        priority : 2,
        restrict : 'A',
        compile : function(element) {
            element.on('compositionstart', function(e) {
                e.stopImmediatePropagation();
            });
        },
    };
} ]);

app.factory('redirectInterceptor', function($q,$location,$window){
    return  {
        // optional method
        'request': function(config) {
          // do something on success
          return config;
        },
    // optional method
   'requestError': function(rejection) {
      // do something on error
      if (canRecover(rejection)) {
        return responseOrNewPromise
      }
      return $q.reject(rejection);
    },

    // optional method
    'response': function(response) {
      // do something on success
      return response;
    },

    // optional method
   'responseError': function(rejection) {
      // do something on error
	   if (rejection.status === 401 || rejection.status === 403) {
		   alert("세션이 만료되었습니다.");
		   $window.location.href = $location.absUrl();
		   return
	   }
//      if (canRecover(rejection)) {
//        return responseOrNewPromise
//      }
      return $q.reject(rejection);
    }
  }
});

app.config(['$httpProvider',function($httpProvider) {
	$httpProvider.defaults.headers.common['AJAX'] = true;
    $httpProvider.interceptors.push('redirectInterceptor');
}]); 


//app.service('ngJsonExportExcel0', function () {
//
//});
app.service('ngJsonExportExcel', function () {
//    return {
//        restrict: 'AE',
//        scope: {
//            data : '=',
//            filename: '=?',
//            reportFields: '=',
//            tabIndex : '=?'
//        },
//        link: function (scope, element) {
	this.func = function(scope){
            scope.filename = !!scope.filename ? scope.filename : 'export-excel';

            var fields = [];
            var header = [];

            angular.forEach(scope.reportFields, function(field, key) {
                if(!field || !key) {
                    throw new Error('error json report fields');
                }

                fields.push(key);
                header.push(field);
            });

//            element.bind('click', function() {
            var bodyData = _bodyData();
            var strData = _convertToExcel(bodyData);

            var blob = new Blob([strData], {type: "text/plain;charset=utf-8"});

            return saveAs(blob, [scope.filename + '.csv']);
//            });

            function _bodyData() {
            	
                var data = scope.data;
                var body = "";
                angular.forEach(data, function(dataItem) {
                    var rowItems = [];

                    angular.forEach(fields, function(field) {
                        if(field.indexOf('.')) {
                            field = field.split(".");
                            var curItem = dataItem;

                            // deep access to obect property
                            angular.forEach(field, function(prop){
                                if (curItem !== null && curItem !== undefined) {
                                    curItem = curItem[prop];
                                }
                            });

                            data = curItem;
                        }
                        else {
                            data = dataItem[field];
                        }

                        var fieldValue = data !== null ? data : ' ';

                        if (fieldValue !== undefined && angular.isObject(fieldValue)) {
                            fieldValue = _objectToString(fieldValue);
                        }

                        rowItems.push(fieldValue);
                    });

                    body += rowItems.toString() + '\n';
                });

                return body;
            }

            function _convertToExcel(body) {
                return header + '\n' + body;
            }

            function _objectToString(object) {
                var output = '';
                angular.forEach(object, function(value, key) {
                    output += key + ':' + value + ' ';
                });

                return '"' + output + '"';
            }
//        }
//    };
	}
});

