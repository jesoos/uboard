app.controller('dataCtrl', function($scope, $http, $location, filterFilter, searchUserListQeury, regDateFormatFilter) {

//			$scope.reportList =
//					[
//						{
//						 idReport      : "1"
//						,psitnName     : "한화생명"
//						,unitName      : "Unit 명 입니다."
//						,userName      : "보고자"
//						,unitCode      : "1"
//						,taskCode      : "1"
//						,repoDate      : "20160302"
//						,repoDateHour  : "12"
//						,repoDateMin   : "40"
//						,repoUserCode  : "1234"
//						,repoMembers   : "김리더 외"
//						,repoDesc      : "보고내용입니다."
//						},
//					{
//						 idReport      : "1"
//						,psitnName     : "한화생명"
//						,unitName      : "Unit 명 입니다."
//						,userName      : "보고자"
//						,unitCode      : "1"
//						,taskCode      : "2"
//						,repoDate      : "20160302"
//						,repoDateHour  : "12"
//						,repoDateMin   : "40"
//						,repoUserCode  : "1234"
//						,repoMembers   : "김한화 외"
//						,repoDesc      : "보고내용입니다."
//						}
//					]
//			$scope.filterReportList = $scope.reportList;

	// process the form
	$scope.processForm = function() {
	  $http({
	  method  : 'POST',
//	  url     : '${pageContext.request.contextPath}/web/selectAllUnitTaskList.json',
	  url     : getContextPath()+'/web/selectAllUnitTaskList.json',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		transformRequest: function(obj) {
		    var str = [];
		    for(var p in obj)
		    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		    return str.join("&");
		},
// 	  data    : $.param($scope.formData),  // pass in data as strings
	  data    : {"signalCode": "all"},//$.param($scope.formData),  // pass in data as strings
	  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
	 })
	  .success(function(data) {
	    console.log(data);
	    $scope.result = data.resultList;
//	    $scope.totalItems = data.resultList.length
	    $scope.filterList = $scope.result;
	    // ------- infinite-scroll---------------------------------------------------------------
	    $scope.scrollFilterList = filterFilter($scope.result, {showYn : "Y"});
	    var viewby = 4;
	    $scope.results = $scope.scrollFilterList.slice(0, viewby);
	    $scope.getMoreData = function () {
	        $scope.results = $scope.scrollFilterList.slice(0, $scope.results.length + viewby);
	    }
	    // ------- //infinite-scroll---------------------------------------------------------------

	    /*----------- UboardTV --------------------------------------------------------- */
 		if ($location.absUrl().indexOf("/uboardTV/mainViewB") != -1) {
 			$scope.uboardTvGlobalFunction();
 		}
 		/*----------- //UboardTV --------------------------------------------------------- */
	    if (!data.success) {
	      // if not successful, bind errors to error variables
/*     	      $scope.errorName = data.errors.name;
	      $scope.errorSuperhero = data.errors.superheroAlias; */
	    } else {
	      // if successful, bind success message to message
/*     	      $scope.message = data.message; */
	    }
	  });
	};
	
	$scope.newUser = [{}];
    $scope.remove = function(index) {
        $scope.newUser.splice(index, 1);
      };
	$scope.add = function() {
		$scope.newUser.push({});
	};
	
	$scope.doShowY = function() {
		$scope.filterList = filterFilter($scope.filterList, {showYn : "Y", taskList:{$:"!''"}});
		return true;
	}
	$scope.redirect = function(idUnit){
		  window.location = getContextPath()+'/admin/unitRegister.do?idUnit='+idUnit;
	}

	$scope.goDetail = function(idUnit) {
    	alert(idUnit);
      $location.url(/register/+idUnit);
//$location 서비스의 URL 서비스의 url 메소드를 이용하여 사용자 아이디에 해당하는 ‘user/사용자아이디’ URL로 이동한다.
    };

	$scope.processForm();
//     $http.get("${pageContext.request.contextPath}/web/selectAllUnitTaskList.json")
//     .then(function (response) {$scope.result = response.data.resultList;});
    $scope.orderByMe = function(x) {
        $scope.myOrderBy = x;
    };

    $scope.searchKeyword = function () {
    	$scope.processForm();
    };

    $scope.search = {
            radio: 'all',
            select: 'unit'
          };
    $scope.options = {
  			barColor: '#f47320',
  	        trackColor: '#222222',
  	        lineCap: 'round',
  	        lineWidth:3,
  	        size:50,
  	        onStep: function (from, to, percent) {
  	        	angular.element(this.el).find('.pie-value').text(Math.round(percent) + '%');
  	        }
  	    };

    $scope.options2 = {
  			barColor: '#f47320',
  	        trackColor: '#222222',
  	        lineCap: 'round',
  	        lineWidth:3,
  	        size:40,
  	        onStep: function (from, to, percent) {
  	        	angular.element(this.el).find('.pie-value').text(Math.round(percent) + '%');

  	        }
  	    };

//	    $scope.sendCategory = function(category) {
//	        // How can I pass this value to ItemController?
//	         $scope.search =category.psitnCode;
//	    };

    $scope.mainViewSearch = function() {
  		var searchCondition = document.getElementById("searchCondition").value;
  		var searchKeyword = document.getElementById("searchKeyword").value;
  		var signalCodes = document.getElementsByName("signalCode");
  		var fromDate = document.getElementById("fromDate").value.toString().split("-").join("");
  		var toDate = document.getElementById("toDate").value.toString().split("-").join("");


  		var arySrtDt = document.getElementById("fromDate").value.split("-"); // ex) 시작일자(2007-10-09)
        var aryEndDt = document.getElementById("toDate").value.split("-"); // ex) 종료일자(2007-12-05)

  		var startDt = new Date(Number(arySrtDt[0]),Number(arySrtDt[1])-1,Number(arySrtDt[2]));
        var endDt	= new Date(Number(aryEndDt[0]),Number(aryEndDt[1])-1,Number(aryEndDt[2]));
        resultDt	= Math.floor(endDt.valueOf()/(24*60*60*1000)- startDt.valueOf()/(24*60*60*1000));

        if(resultDt < 0 ){ alert("과거 날짜를 먼저 입력해주세요"); return false; }

  		var signalCode;
  		if (signalCodes.length == '0')
  			signalCode = 'all';
  		else {
  			for (var i = 0; i < signalCodes.length; i++) {
  	  		    if (signalCodes[i].checked) signalCode = signalCodes[i].value;
  	  		}
  		}
  		$scope.dashboardSearch = { signalCode : signalCode };
  		searchKeyword = encodeURIComponent(searchKeyword);

  		$http({
 	        method: 'POST',
// 	        url: '${pageContext.request.contextPath}/web/selectAllUnitTaskList.json',
 	        url: getContextPath()+'/web/selectAllUnitTaskList.json',
 	        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
 	        transformRequest: function(obj) {
 	            var str = [];
 	            for(var p in obj)
 	            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
 	            return str.join("&");
 	        },
 	        data: {
 	        	"searchCondition": decodeURIComponent(searchCondition),
 	        	"searchKeyword": searchKeyword,
 	        	"fromDate": fromDate,
 	        	"toDate": toDate,
 	        	"signalCode": signalCode
 	        }
 	    }).success(function (data) {
 	    	$scope.result = data.resultList;
// 	    	$scope.totalItems = data.resultList.length
 	    	$scope.filterList = filterFilter(data.resultList,{ taskList:{$:"!''"}
 	    													 , psitnCode : (!$scope.category || $scope.category== 'all' ? "!''" : $scope.category)
 	    													 , signalCode : (!$scope.dashboardSearch.signalCode || $scope.dashboardSearch.signalCode== 'all' || $scope.dashboardSearch.signalCode.toUpperCase() == 'B'? "!''" : $scope.dashboardSearch.signalCode.toUpperCase())
 	    													 });
 	    	if($scope.dashboardSearch.signalCode.toUpperCase() == 'B') {
 	    		$scope.filterList = filterFilter($scope.filterList, {alramCode : $scope.dashboardSearch.signalCode.toUpperCase()});
    		}
			   	    	
 	         /*-------------------- 검색 후 펼치기 ----------------------- */
 	         $('.btn-up').addClass("btn-down");
 	         $('.btn-up').parent().parent().next().show();
 	         /*-------------------- 검색 후 펼치기 ----------------------- */
 	    });
  	}

    $scope.adminSearch = function() {
//    	var psitnCodes = document.getElementsByName("psitnCode");
//    	var signalCodes = document.getElementsByName("signalCode");

  		var fromDate = document.getElementById("fromDate").value.toString().split("-").join("");
  		var toDate = document.getElementById("toDate").value.toString().split("-").join("");
  		var searchCondition = document.getElementById("searchCondition").value;
  		var searchKeyword = document.getElementById("searchKeyword").value;

//  		if (signalCodes.length == '0')
//  			signalCode = 'all';
//  		var psitnCode;
//		for (var i = 0; i < psitnCodes.length; i++) {
//  		    if (psitnCodes[i].checked) psitnCode = psitnCodes[i].value;
//  		}
//
//  		var signalCode;
//		for (var i = 0; i < signalCodes.length; i++) {
//  		    if (signalCodes[i].checked) signalCode = signalCodes[i].value;
//  		}

  		searchKeyword = encodeURIComponent(searchKeyword);

  		$http({
 	        method: 'POST',
 	        url: getContextPath()+'/web/selectAllUnitTaskList.json',
// 	        url: getContextPath()+'/admin/selectAllUnitTaskList.json',
 	        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
 	        transformRequest: function(obj) {
 	            var str = [];
 	            for(var p in obj)
 	            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
 	            return str.join("&");
 	        },
 	        data: {
 	        	"searchCondition": decodeURIComponent(searchCondition),
 	        	"searchKeyword": searchKeyword,
 	        	"fromDate": fromDate,
 	        	"toDate": toDate,
// 	        	"signalCode": signalCode,
// 	        	"psitnCode": psitnCode
 	        }
 	    }).success(function (data) {
 	    	$scope.result = data.resultList;
 	    	$scope.filterList = $scope.result; 
 	    });
  	}

//	    $scope.filter0 = function(product){
//	        return product.psitnCode == '1' || product.psitnCode == '3';
//	    };

	$scope.tab = function (tabIndex) {
	     if (tabIndex == 0){
		      	 $scope.category= "";
		      	 $scope.processForm();
	     }
	     if (tabIndex == 1){
		       $scope.category='1';
		 }
	     if (tabIndex == 2){
		       $scope.category='2';
		 }
	     if (tabIndex == 3){
		       $scope.category='3';
		 }
	     if (tabIndex == 4){
		       $scope.category='4';
		 }
	     if (tabIndex == 5){
		       $scope.category='1';
		 }
//		     if (tabIndex == 2){
//		       $scope.orderProp = 'views';
//		     }
	       var obj = {psitnCode : $scope.category, taskList :{$:"!''"} }
	         $scope.filterList = filterFilter($scope.result, obj);
	         $scope.currentPage = 1;
	};

	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
	    //you also get the actual event object
	    //do stuff, execute functions -- whatever...
//	    alert("ng-repeat finished");
//		tbodyRepeat();
	});

//		$timeout(tbodyRepeat, 0);


    /*----------- Search (filter)-----------------------------------*/

	 function parseDate(input) {
  	  var parts = input.split('-');
  	  return new Date(parts[2], parts[1]-1, parts[0]);
  	}

  	app.filter("myfilter", function() {
  	  return function(items, from, to) {
  	        var df = parseDate(from);
  	        var dt = parseDate(to);
  	        var result = [];
  	        for (var i=0; i<items.length; i++){
  	            var tf = new Date(items[i].date1 * 1000),
  	                tt = new Date(items[i].date2 * 1000);
  	            if (tf > df && tt < dt)  {
  	                result.push(items[i]);
  	            }
  	        }
  	        return result;
  	  };
  	});

	    $scope.searchRadio = '';

	    
    /*----------- Search (filter)-----------------------------------*/

     $scope.$watch('query', function (term) {
       var obj = [];
			switch ($('#searchCondition').val()) {
			case 'all':     obj = {psitnCode : $scope.category, $ : term};
			break;
			case 'unit':    obj = {psitnCode : $scope.category, unitName : term};
			break;
			case 'task':    obj = {psitnCode : $scope.category, taskList : { $: term}};
			break;
			case 'leader':  obj = {psitnCode : $scope.category, leader : term};
			break;
			case 'captain':	obj = {psitnCode : $scope.category, captain : term};
			break;
			}
//			obj.push({psitnCode : $scope.category});
         $scope.filterList = filterFilter($scope.result, obj);
         $scope.currentPage = 1;

         /*-------------------- 검색 후 펼치기 ----------------------- */
         $('.btn-up').addClass("btn-down");
         $('.btn-up').parent().parent().next().show();
         /*-------------------- 검색 후 펼치기 ----------------------- */
     });

//     $scope.$watch('search.name', function (term) {
//         var obj = { name: term }
//
//         $scope.filterList = filterFilter($scope.list, obj);
//         $scope.currentPage = 1;
//     });

   $scope.$watch('search.showYn', function (term) {
	   term = term == 'all' ? $ : term;
	   var obj = { showYn : term }
	   $scope.filterList = filterFilter($scope.result, obj);
	   $scope.currentPage = 1;
	});


   $scope.$watch('search.psitnCode', function (term) {
	   term = term == 'all' ? $ : term;
	   var obj = { psitnCode : term }
	   $scope.filterList = filterFilter($scope.result, obj);
	   $scope.currentPage = 1;
	});

   $scope.$watch('search.alramCode', function (term) {
	   term = term != 'B' ? $ : term;
	   var obj = { alramCode : term }
	   $scope.filterList = filterFilter($scope.result, obj);
	   $scope.currentPage = 1;
	});
   
   $scope.$watch('search.signalCode', function (term) {
	   term = term == 'all' ? $ : term;
	   var obj = { signalCode : term }
	   $scope.filterList = filterFilter($scope.result, obj);
	   $scope.currentPage = 1;
	});
   
/*------------ insertUnitTest & updateUnitTest ------------------------------------------------------------------------------------------------*/
 	// process the form
 	$scope.doPostProcessForm = function(url, data) {
 		vData = !data?{"signalCode": "all"} : data;
 		console.log(vData);
 	  $http({
 	  method  : 'POST',
// 	  url     : '${pageContext.request.contextPath}/web/selectAllUnitTaskList.json',
// 	  url     : getContextPath()+'/web/selectAllUnitTaskList.json',
 	  url     : url,
 	  data    : vData,//$.param($scope.formData),  // pass in data as strings
// 	  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		 headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
		 transformRequest: function(obj) {
		 		var str = [];
		 		for(var p in obj)
		 		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		 		return str.join("&");
		 }
 	 })
 	  .success(function(data) {
 	    console.log(data);
 	    alert("정상적으로 처리되었습니다.");
// 	    $scope.result = data.resultList;
// 	    $scope.filterList = $scope.result;
// 	    $scope.results = $scope.result ? $scope.result.slice(0, 1) :"";
// 	    console.log($scope.results);
// 	    $scope.getMoreData = function () {
// 	        $scope.results = $scope.result.slice(0, $scope.results.length + 1);
// 	    }

 	    if (!data.success) {
 	      // if not successful, bind errors to error variables
 /*     	      $scope.errorName = data.errors.name;
 	      $scope.errorSuperhero = data.errors.superheroAlias; */
 	    } else {
 	      // if successful, bind success message to message
 /*     	      $scope.message = data.message; */
 	    }

 	   	$http({
			  method: 'GET',
			  //url: getContextPath()+'/web/userjson.json'
			  url: getContextPath()+'/admin/adminuserjson.json'
			}).then(function successCallback(response) {
			    // this callback will be called asynchronously
			    // when the response is available
				$scope.user = response.data.AdminUserList;
				for(var i in $scope.user.length) {
					$scope.user[i]["userCheckBox"] = "";
//					console.log($scope.user[i]);
				}
				$scope.filterUserList = $scope.user;
				console.log($scope.user);
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
		});

 	  });
 	};


 	$scope.logingUserDoPostProcessForm = function(url, data) {
 		vData = !data?{"signalCode": "all"} : data;
 		console.log(vData);
 	  $http({
 	  method  : 'POST',
 	  url     : url,
 	  data    : vData,//$.param($scope.formData),  // pass in data as strings
		 headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
		 transformRequest: function(obj) {
		 		var str = [];
		 		for(var p in obj)
		 		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		 		return str.join("&");
		 }
 	 })
 	  .success(function(data) {
 		 console.log("logingUserDoPostProcessForm");
 		  console.log(data);
 	    $scope.loginUserDetails = data.sampleVO;

 	    if (!data.success) {
 	    } else {
 	    }

 	  });
 	};
 	
 	
    $scope.insertUnit = function(data) {
    	url = getContextPath()+'/admin/insertjson.json';
//    	data =
//    	{
//				name:"asdf",
//				useYn:"Y",
//				description:"asdf",
//				regUser:"asdfasdf",
//				searchCondition:1,
//				searchKeyword:"",
//				pageIndex:1
//				,
//						psitnCode : "1",
//						psitnName : "psitnName",
//						unitCode : "1113",
//						unitName : "unitName",
//						leader : "leader",
//						captain : "captain",
//						fromDate : "19990102",
//						toDate : "19990102",
//						leaderCode : "123123",
//						captainCode : "123123",
//						showYn : "Y"
//    		  }
    	$scope.doPostProcessForm(url, data);
    }

    $scope.updateUnit = function(data) {
    	url = getContextPath()+'/admin/updatejson.json';
//    	data =
//    	{
//				name:"asdf",
//				useYn:"Y",
//				description:"asdf",
//				regUser:"asdfasdf",
//				searchCondition:1,
//				searchKeyword:"",
//				pageIndex:1
//				,
//						idUnit : 5,
//						psitnCode : "1",
//						psitnName : "psitnName",
//						unitCode : "1113",
//						unitName : "unitName",
//						leader : "리더11",
//						captain : "captain",
//						fromDate : "19990102",
//						toDate : "19990102",
//						leaderCode : "1072062",
//						captainCode : "1082074",
//						showYn : "Y"
//    	}
    	$scope.doPostProcessForm(url, data);
    }

/* insertTask & updateTask ------------------------------------------------------------------------------------------------------*/

    // insertTask set data
    $scope.insertTask = function(data) {
    	url = getContextPath()+'/admin/inserttask.json';
    	data =
    	{
				name:"asdf",
				useYn:"Y",
				description:"asdf",
				regUser:"asdfasdf",
				searchCondition:1,
				searchKeyword:"",
				pageIndex:1
				,
						unitCode : "10",
						taskCode : "1",
						taskName : "insert_taskName",
						progress : "70",
						signalCode : "Y",
						alramCode : "B",
						issueText : "alsdfjasldfjlasdf",
						fromDate : "20160220",
						toDate : "20160225",
						rprsnttvEmplNo : "eddy"
    		  }
    	$scope.doPostProcessForm(url, data);
    }

    // updateTask set data
    $scope.updateTask = function(data) {
    	url = getContextPath()+'/admin/updatetask.json';
    	data =
    	{
				name:"asdf",
				useYn:"Y",
				description:"asdf",
				regUser:"asdfasdf",
				searchCondition:1,
				searchKeyword:"",
				pageIndex:1
				,
						idTask : 9,
						unitCode : "1",
						taskCode : "1",
						taskName : "update_taskName",
						progress : "70",
						signalCode : "Y",
						alramCode : "B",
						issueText : "afjlajfdlasjdf",
						fromDate : "20160220",
						toDate : "20160225",
						rprsnttvEmplNo : "eddy"
    		  }
    	$scope.doPostProcessForm(url, data);
    }

/* selectUser, insertUser, updateUser, deleteUser ------------------------------------------------------------------------------------------------------*/

	// selectUser set data
    $scope.selectUser = function(data) {
    	url = getContextPath()+'/admin/selectuser.json';
//    	data =
//    	{
//				name:"asdf",
//				useYn:"Y",
//				description:"asdf",
//				regUser:"asdfasdf",
//				searchCondition:1,
//				searchKeyword:"",
//				pageIndex:1
//				,
//						idUser : 9
//						/*
//						userCode : "9999999",
//						userName : "eddy",
//						userEmail : "comeddy@naver.com",
//						userTel : "010-34356-1413",
//						userStateCode : "state2",
//						userStateFrom : "20160224",
//						userStateTo : "20160225",
//						userStateTime : "AM"
//						*/
//    		  }
//    	$scope.doPostProcessForm(url, data);
    	$scope.logingUserDoPostProcessForm(url, data);
    }
    
	var vUserCode = {userCode : "loginUserDetails"};
	$scope.selectUser(vUserCode);

    // insertUser set data
    $scope.insertUser = function(data) {
    	url = getContextPath()+'/admin/insertuser.json';
    	for(var i in data) {
     		data[i]["userStateCode"] = "state1";
     		data[i]["userStateCode"] = "state1";
     		data[i]["userStateFrom"]= "";
     		data[i]["userStateTo"]= "";
     		data[i]["userStateTime"]= "";
     		if(data[i].userCode != null)
     			$scope.doPostProcessForm(url, data[i]);
     		else
     			alert('아이디가 없습니다');
		};
//    	data =
//    	{
//				name:"asdf",
//				useYn:"Y",
//				description:"asdf",
//				regUser:"asdfasdf",
//				searchCondition:1,
//				searchKeyword:"",
//				pageIndex:1
//				,
//						userCode : "9999999",
//						userName : "oscar",
//						userEmail : "comeddy@naver.com",
//						userTel : "010-34356-1413",
//						userStateCode : "state2",
//						userStateFrom : "20160224",
//						userStateTo : "20160225"
//    		  }

//    	$scope.doPostProcessForm(url, data);
    }

    // updateUser set data
    $scope.updateUser = function(data) {
    	url = getContextPath()+'/admin/updateuser.json';
//    	data =
//    	{
//				name:"asdf",
//				useYn:"Y",
//				description:"asdf",
//				regUser:"asdfasdf",
//				searchCondition:1,
//				searchKeyword:"",
//				pageIndex:1
//				,
//						idUser : 10,
//						userCode : "9999999",
//						userName : "eddy",
//						userEmail : "comeddy@naver.com",
//						userTel : "010-34356-1413",
//						userStateCode : "state2",
//						userStateFrom : "20160224",
//						userStateTo : "20160225"
//    		  }
    	$scope.doPostProcessForm(url, data);
    }

    // deleteUser set data
    $scope.deleteUser = function(data) {
    	if (confirm("정말 삭제하시겠습니까??") != true) return;
    	url = getContextPath()+'/admin/deleteuser.json';
//    	data =
//    	{
//						idUser : 588
//						/*
//						userCode : "9999999",
//						userName : "eddy",
//						userEmail : "comeddy@naver.com",
//						usµerTel : "010-34356-1413",
//						userStateCode : "state2",
//						userStateFrom : "20160224",
//						userStateTo : "20160225"
//						*/
//    		  }
    	$scope.doPostProcessForm(url, data);
    }

    $scope.getUserData = function(idUser) {
    	var obj = {idUser : idUser };
    	$scope.userData = filterFilter($scope.user, obj, true);
    	$scope.userData = $scope.userData[0];
    }

    $scope.btnManage = function() {
    	$scope.searchUserListQeury = "";
    	$http({
  		  method: 'GET',
  		  url: getContextPath()+'/admin/adminuserjson.json'
  			}).then(function successCallback(response) {
  			$scope.user = response.data.AdminUserList;
  			$scope.filterUserList = $scope.user;
  			}, function errorCallback(response) {
  		  });
    	$scope.filterUserList = $scope.user;
    }

    /* selectReport, insertReport, updateReport, deleteReport ------------------------------------------------------------------------------------------------------*/

	// selectReport set data
    $scope.selectReport = function(data) {
    	url = getContextPath()+'/admin/selectreport.json';
//    	data =
//    	{
//				name:"asdf",
//				useYn:"Y",
//				description:"asdf",
//				regUser:"asdfasdf",
//				searchCondition:1,
//				searchKeyword:"",
//				pageIndex:1
//				,
//						idReport : 1
//    		  }
    	$scope.doPostProcessForm(url, data);
    }

    // insertReport set data
    $scope.insertReport = function(data) {
    	url = getContextPath()+'/admin/insertreport.json';
    	console.log(data);
    	data =
    	{
				name:"asdf",
				useYn:"Y",
				description:"asdf",
				regUser:"asdfasdf",
				searchCondition:1,
				searchKeyword:"",
				pageIndex:1
				,
						unitCode : "1",
						taskCode : "1",
						repoDate : "20160226",
						repoDateHour : "14",
						repoDateMin : "30",
						repoUserCode : "20160224",
						repoMembers : "프로젝트 전원",
                        repoDesc : "보고내용이 있습니다."
    		  }

    	$scope.doPostProcessForm(url, data);
    }


    // updateReport set data
    $scope.updateReport = function(data) {
    	url = getContextPath()+'/admin/updatereport.json';
    	$scope.doPostProcessForm(url, data);
    }

    // deleteReport set data
    $scope.deleteReport = function(data) {
    	url = getContextPath()+'/admin/deletereport.json';
//    	data =
//    	{
//		      			idReport : 1
//    	}
    	$scope.doPostProcessForm(url, data);
    }

    /* selectReport, insertReport, updateReport, deleteReport ------------------------------------------------------------------------------------------------------*/

	// selectReport set data
    $scope.selectReport = function(data) {
    	url = getContextPath()+'/admin/selectreport.json';
    	data =
    	{
				name:"asdf",
				useYn:"Y",
				description:"asdf",
				regUser:"asdfasdf",
				searchCondition:1,
				searchKeyword:"",
				pageIndex:1
//				,
//						idReport : 1
    		  }
    	$scope.doPostProcessForm(url, data);
    }

    // insertReport set data
    $scope.insertReport = function(data) {
    	url = getContextPath()+'/admin/insertreport.json';
    	console.log(data);
    	data =
    	{
				name:"asdf",
				useYn:"Y",
				description:"asdf",
				regUser:"asdfasdf",
				searchCondition:1,
				searchKeyword:"",
				pageIndex:1
				,
						unitCode : "1",
						taskCode : "1",
						repoDate : "20160226",
						repoDateHour : "14",
						repoDateMin : "30",
						repoUserCode : "20160224",
						repoMembers : "프로젝트 전원",
                        repoDesc : "보고내용이 있습니다."
    		  }

    	$scope.doPostProcessForm(url, data);
    }


    // updateReport set data
    $scope.updateReport = function(data) {
    	url = getContextPath()+'/admin/updatereport.json';
//    	data =
//    	{
//				name:"asdf",
//				useYn:"Y",
//				description:"asdf",
//				regUser:"asdfasdf",
//				searchCondition:1,
//				searchKeyword:"",
//				pageIndex:1
//				,
//	 					idReport : 1,
//				        unitCode : "2",
//                        taskCode : "2",
//                        repoDate : "20160226",
//                        repoDateHour : "20",
//                        repoDateMin : "30",
//                        repoUserCode : "20160224",
//                        repoMembers : "프로젝트 전원",
//                        repoDesc : "업데이트 보고내용이 있습니다."
//   		  }
    	$scope.doPostProcessForm(url, data);
    }

    // deleteReport set data
    $scope.deleteReport = function(data) {
    	url = getContextPath()+'/admin/deletereport.json';
//    	data =
//    	{
//		      			idReport : 1
//    	}
    	$scope.doPostProcessForm(url, data);
    }

    /*------------------------------------------------------------------------------------------------------*/


    $scope.$watch('searchUserListQeury', function (term) {
        var obj = [];
 			switch ($('#searchUserListCondition').val()) {
 			case 'all':     obj = {$ : term};
 			break;
 			case 'userName':    obj = {userName : term};
 			break;
// 			case 'task':    obj = {psitnCode : $scope.category, taskList : { $: term}};
// 			break;
// 			case 'leader':  obj = {psitnCode : $scope.category, leader : term};
// 			break;
// 			case 'captain':	obj = {psitnCode : $scope.category, captain : term};
// 			break;
 			}
// 			obj.push({psitnCode : $scope.category});
          $scope.filterUserList = filterFilter($scope.user, obj);
//          $scope.currentPage = 1;
//
//          /*-------------------- 검색 후 펼치기 ----------------------- */
//          $('.btn-up').addClass("btn-down");
//          $('.btn-up').parent().parent().next().show();
//          /*-------------------- 검색 후 펼치기 ----------------------- */
      });

//    $scope.searchUserListQeury = searchUserListQeury;


    /*----------- PaginationDemoCtrl -----------------------------------*/

  //$scope.data = [{"name":"Bell","id":"K0H 2V5"},{"name":"Octavius","id":"X1E 6J0"},{"name":"Alexis","id":"N6E 1L6"},{"name":"Colton","id":"U4O 1H4"},{"name":"Abdul","id":"O9Z 2Q8"},{"name":"Ian","id":"Q7W 8M4"},{"name":"Eden","id":"H8X 5E0"},{"name":"Britanney","id":"I1Q 1O1"},{"name":"Ulric","id":"K5J 1T0"},{"name":"Geraldine","id":"O9K 2M3"},{"name":"Hamilton","id":"S1D 3O0"},{"name":"Melissa","id":"H9L 1B7"},{"name":"Remedios","id":"Z3C 8P4"},{"name":"Ignacia","id":"K3B 1Q4"},{"name":"Jaime","id":"V6O 7C9"},{"name":"Savannah","id":"L8B 8T1"},{"name":"Declan","id":"D5Q 3I9"},{"name":"Skyler","id":"I0O 4O8"},{"name":"Lawrence","id":"V4K 0L2"},{"name":"Yael","id":"R5E 9D9"},{"name":"Herrod","id":"V5W 6L3"},{"name":"Lydia","id":"G0E 2K3"},{"name":"Tobias","id":"N9P 2V5"},{"name":"Wing","id":"T5M 0E2"},{"name":"Callum","id":"L9P 3W5"},{"name":"Tiger","id":"R9A 4E4"},{"name":"Summer","id":"R4B 4Q4"},{"name":"Beverly","id":"M5E 4V4"},{"name":"Xena","id":"I8G 6O1"},{"name":"Yael","id":"L1K 5C3"},{"name":"Stacey","id":"A4G 1S4"},{"name":"Marsden","id":"T1J 5J3"},{"name":"Uriah","id":"S9S 8I7"},{"name":"Kamal","id":"Y8Z 6X0"},{"name":"MacKensie","id":"W2N 7P9"},{"name":"Amelia","id":"X7A 0U3"},{"name":"Xavier","id":"B8I 6C9"},{"name":"Whitney","id":"H4M 9U2"},{"name":"Linus","id":"E2W 7U1"},{"name":"Aileen","id":"C0C 3N2"},{"name":"Keegan","id":"V1O 6X2"},{"name":"Leonard","id":"O0L 4M4"},{"name":"Honorato","id":"F4M 8M6"},{"name":"Zephr","id":"I2E 1T9"},{"name":"Karen","id":"H8W 4I7"},{"name":"Orlando","id":"L8R 0U4"},{"name":"India","id":"N8M 8F4"},{"name":"Luke","id":"Q4Y 2Y8"},{"name":"Sophia","id":"O7F 3F9"},{"name":"Faith","id":"B8P 1U5"},{"name":"Dara","id":"J4A 0P3"},{"name":"Caryn","id":"D5M 8Y8"},{"name":"Colton","id":"A4Q 2U1"},{"name":"Kelly","id":"J2E 2L3"},{"name":"Victor","id":"H1V 8Y5"},{"name":"Clementine","id":"Q9R 4G8"},{"name":"Dale","id":"Q1S 3I0"},{"name":"Xavier","id":"Z0N 0L5"},{"name":"Quynn","id":"D1V 7B8"},{"name":"Christine","id":"A2X 0Z8"},{"name":"Matthew","id":"L1H 2I4"},{"name":"Simon","id":"L2Q 7V7"},{"name":"Evan","id":"Z8Y 6G8"},{"name":"Zachary","id":"F4K 8V9"},{"name":"Deborah","id":"I0D 4J6"},{"name":"Carl","id":"X7H 3J3"},{"name":"Colin","id":"C8P 0O1"},{"name":"Xenos","id":"K3S 1H5"},{"name":"Sonia","id":"W9C 0N3"},{"name":"Arsenio","id":"B0M 2G6"},{"name":"Angela","id":"N9X 5O7"},{"name":"Cassidy","id":"T8T 0Q5"},{"name":"Sebastian","id":"Y6O 0A5"},{"name":"Bernard","id":"P2K 0Z5"},{"name":"Kerry","id":"T6S 4T7"},{"name":"Uriel","id":"K6G 5V2"},{"name":"Wanda","id":"S9G 2E5"},{"name":"Drake","id":"G3G 8Y2"},{"name":"Mia","id":"E4F 4V8"},{"name":"George","id":"K7Y 4L4"},{"name":"Blair","id":"Z8E 0F0"},{"name":"Phelan","id":"C5Z 0C7"},{"name":"Margaret","id":"W6F 6Y5"},{"name":"Xaviera","id":"T5O 7N5"},{"name":"Willow","id":"W6K 3V0"},{"name":"Alden","id":"S2M 8C1"},{"name":"May","id":"L5B 2H3"},{"name":"Amaya","id":"Q3B 7P8"},{"name":"Julian","id":"W6T 7I6"},{"name":"Colby","id":"N3Q 9Z2"},{"name":"Cole","id":"B5G 0V7"},{"name":"Lana","id":"O3I 2W9"},{"name":"Dieter","id":"J4A 9Y6"},{"name":"Rowan","id":"I7E 9U4"},{"name":"Abraham","id":"S7V 0W9"},{"name":"Eleanor","id":"K7K 9P4"},{"name":"Martina","id":"V0Z 5Q7"},{"name":"Kelsie","id":"R7N 7P2"},{"name":"Hedy","id":"B7E 7F2"},{"name":"Hakeem","id":"S5P 3P6"}];
  $scope.viewby = 4;
  //$scope.totalItems = $scope.data.length;
  //$scope.totalItems = 10;
  $scope.currentPage = 1;
  $scope.itemsPerPage = $scope.viewby;
  $scope.maxSize = 5; //Number of pager buttons to show

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.setItemsPerPage = function(num) {
  $scope.itemsPerPage = num;
  $scope.currentPage = 1; //reset to first paghe
  }
  /*----------- PaginationDemoCtrl -----------------------------------*/

  /*----------- userListPaginationDemoCtrl -----------------------------------*/

  //$scope.data = [{"name":"Bell","id":"K0H 2V5"},{"name":"Octavius","id":"X1E 6J0"},{"name":"Alexis","id":"N6E 1L6"},{"name":"Colton","id":"U4O 1H4"},{"name":"Abdul","id":"O9Z 2Q8"},{"name":"Ian","id":"Q7W 8M4"},{"name":"Eden","id":"H8X 5E0"},{"name":"Britanney","id":"I1Q 1O1"},{"name":"Ulric","id":"K5J 1T0"},{"name":"Geraldine","id":"O9K 2M3"},{"name":"Hamilton","id":"S1D 3O0"},{"name":"Melissa","id":"H9L 1B7"},{"name":"Remedios","id":"Z3C 8P4"},{"name":"Ignacia","id":"K3B 1Q4"},{"name":"Jaime","id":"V6O 7C9"},{"name":"Savannah","id":"L8B 8T1"},{"name":"Declan","id":"D5Q 3I9"},{"name":"Skyler","id":"I0O 4O8"},{"name":"Lawrence","id":"V4K 0L2"},{"name":"Yael","id":"R5E 9D9"},{"name":"Herrod","id":"V5W 6L3"},{"name":"Lydia","id":"G0E 2K3"},{"name":"Tobias","id":"N9P 2V5"},{"name":"Wing","id":"T5M 0E2"},{"name":"Callum","id":"L9P 3W5"},{"name":"Tiger","id":"R9A 4E4"},{"name":"Summer","id":"R4B 4Q4"},{"name":"Beverly","id":"M5E 4V4"},{"name":"Xena","id":"I8G 6O1"},{"name":"Yael","id":"L1K 5C3"},{"name":"Stacey","id":"A4G 1S4"},{"name":"Marsden","id":"T1J 5J3"},{"name":"Uriah","id":"S9S 8I7"},{"name":"Kamal","id":"Y8Z 6X0"},{"name":"MacKensie","id":"W2N 7P9"},{"name":"Amelia","id":"X7A 0U3"},{"name":"Xavier","id":"B8I 6C9"},{"name":"Whitney","id":"H4M 9U2"},{"name":"Linus","id":"E2W 7U1"},{"name":"Aileen","id":"C0C 3N2"},{"name":"Keegan","id":"V1O 6X2"},{"name":"Leonard","id":"O0L 4M4"},{"name":"Honorato","id":"F4M 8M6"},{"name":"Zephr","id":"I2E 1T9"},{"name":"Karen","id":"H8W 4I7"},{"name":"Orlando","id":"L8R 0U4"},{"name":"India","id":"N8M 8F4"},{"name":"Luke","id":"Q4Y 2Y8"},{"name":"Sophia","id":"O7F 3F9"},{"name":"Faith","id":"B8P 1U5"},{"name":"Dara","id":"J4A 0P3"},{"name":"Caryn","id":"D5M 8Y8"},{"name":"Colton","id":"A4Q 2U1"},{"name":"Kelly","id":"J2E 2L3"},{"name":"Victor","id":"H1V 8Y5"},{"name":"Clementine","id":"Q9R 4G8"},{"name":"Dale","id":"Q1S 3I0"},{"name":"Xavier","id":"Z0N 0L5"},{"name":"Quynn","id":"D1V 7B8"},{"name":"Christine","id":"A2X 0Z8"},{"name":"Matthew","id":"L1H 2I4"},{"name":"Simon","id":"L2Q 7V7"},{"name":"Evan","id":"Z8Y 6G8"},{"name":"Zachary","id":"F4K 8V9"},{"name":"Deborah","id":"I0D 4J6"},{"name":"Carl","id":"X7H 3J3"},{"name":"Colin","id":"C8P 0O1"},{"name":"Xenos","id":"K3S 1H5"},{"name":"Sonia","id":"W9C 0N3"},{"name":"Arsenio","id":"B0M 2G6"},{"name":"Angela","id":"N9X 5O7"},{"name":"Cassidy","id":"T8T 0Q5"},{"name":"Sebastian","id":"Y6O 0A5"},{"name":"Bernard","id":"P2K 0Z5"},{"name":"Kerry","id":"T6S 4T7"},{"name":"Uriel","id":"K6G 5V2"},{"name":"Wanda","id":"S9G 2E5"},{"name":"Drake","id":"G3G 8Y2"},{"name":"Mia","id":"E4F 4V8"},{"name":"George","id":"K7Y 4L4"},{"name":"Blair","id":"Z8E 0F0"},{"name":"Phelan","id":"C5Z 0C7"},{"name":"Margaret","id":"W6F 6Y5"},{"name":"Xaviera","id":"T5O 7N5"},{"name":"Willow","id":"W6K 3V0"},{"name":"Alden","id":"S2M 8C1"},{"name":"May","id":"L5B 2H3"},{"name":"Amaya","id":"Q3B 7P8"},{"name":"Julian","id":"W6T 7I6"},{"name":"Colby","id":"N3Q 9Z2"},{"name":"Cole","id":"B5G 0V7"},{"name":"Lana","id":"O3I 2W9"},{"name":"Dieter","id":"J4A 9Y6"},{"name":"Rowan","id":"I7E 9U4"},{"name":"Abraham","id":"S7V 0W9"},{"name":"Eleanor","id":"K7K 9P4"},{"name":"Martina","id":"V0Z 5Q7"},{"name":"Kelsie","id":"R7N 7P2"},{"name":"Hedy","id":"B7E 7F2"},{"name":"Hakeem","id":"S5P 3P6"}];
  $scope.userListViewby = 7;
  //$scope.totalItems = $scope.data.length;
  //$scope.totalItems = 10;
  $scope.userListCurrentPage = 1;
  $scope.userListItemsPerPage = $scope.userListViewby;
  $scope.userListMaxSize = 5; //Number of pager buttons to show

  $scope.userListSetPage = function (pageNo) {
    $scope.userListCurrentPage = pageNo;
  };

  $scope.userListPageChanged = function() {
    console.log('Page changed to: ' + $scope.userListCurrentPage);
  };

  $scope.userListSetItemsPerPage = function(num) {
  $scope.userListItemsPerPage = num;
  $scope.userListCurrentPage = 1; //reset to first paghe
  }
  /*----------- userListPaginationDemoCtrl -----------------------------------*/

	$http({
		  method: 'GET',
		  url: getContextPath()+'/admin/adminreportjson.json'
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
			$scope.reportList = response.data.AdminReportList;
			console.log(response);
			$scope.filterReportList = $scope.reportList;
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
	});  
	  /*----------- reportListPaginationDemoCtrl -----------------------------------*/

	  //$scope.data = [{"name":"Bell","id":"K0H 2V5"},{"name":"Octavius","id":"X1E 6J0"},{"name":"Alexis","id":"N6E 1L6"},{"name":"Colton","id":"U4O 1H4"},{"name":"Abdul","id":"O9Z 2Q8"},{"name":"Ian","id":"Q7W 8M4"},{"name":"Eden","id":"H8X 5E0"},{"name":"Britanney","id":"I1Q 1O1"},{"name":"Ulric","id":"K5J 1T0"},{"name":"Geraldine","id":"O9K 2M3"},{"name":"Hamilton","id":"S1D 3O0"},{"name":"Melissa","id":"H9L 1B7"},{"name":"Remedios","id":"Z3C 8P4"},{"name":"Ignacia","id":"K3B 1Q4"},{"name":"Jaime","id":"V6O 7C9"},{"name":"Savannah","id":"L8B 8T1"},{"name":"Declan","id":"D5Q 3I9"},{"name":"Skyler","id":"I0O 4O8"},{"name":"Lawrence","id":"V4K 0L2"},{"name":"Yael","id":"R5E 9D9"},{"name":"Herrod","id":"V5W 6L3"},{"name":"Lydia","id":"G0E 2K3"},{"name":"Tobias","id":"N9P 2V5"},{"name":"Wing","id":"T5M 0E2"},{"name":"Callum","id":"L9P 3W5"},{"name":"Tiger","id":"R9A 4E4"},{"name":"Summer","id":"R4B 4Q4"},{"name":"Beverly","id":"M5E 4V4"},{"name":"Xena","id":"I8G 6O1"},{"name":"Yael","id":"L1K 5C3"},{"name":"Stacey","id":"A4G 1S4"},{"name":"Marsden","id":"T1J 5J3"},{"name":"Uriah","id":"S9S 8I7"},{"name":"Kamal","id":"Y8Z 6X0"},{"name":"MacKensie","id":"W2N 7P9"},{"name":"Amelia","id":"X7A 0U3"},{"name":"Xavier","id":"B8I 6C9"},{"name":"Whitney","id":"H4M 9U2"},{"name":"Linus","id":"E2W 7U1"},{"name":"Aileen","id":"C0C 3N2"},{"name":"Keegan","id":"V1O 6X2"},{"name":"Leonard","id":"O0L 4M4"},{"name":"Honorato","id":"F4M 8M6"},{"name":"Zephr","id":"I2E 1T9"},{"name":"Karen","id":"H8W 4I7"},{"name":"Orlando","id":"L8R 0U4"},{"name":"India","id":"N8M 8F4"},{"name":"Luke","id":"Q4Y 2Y8"},{"name":"Sophia","id":"O7F 3F9"},{"name":"Faith","id":"B8P 1U5"},{"name":"Dara","id":"J4A 0P3"},{"name":"Caryn","id":"D5M 8Y8"},{"name":"Colton","id":"A4Q 2U1"},{"name":"Kelly","id":"J2E 2L3"},{"name":"Victor","id":"H1V 8Y5"},{"name":"Clementine","id":"Q9R 4G8"},{"name":"Dale","id":"Q1S 3I0"},{"name":"Xavier","id":"Z0N 0L5"},{"name":"Quynn","id":"D1V 7B8"},{"name":"Christine","id":"A2X 0Z8"},{"name":"Matthew","id":"L1H 2I4"},{"name":"Simon","id":"L2Q 7V7"},{"name":"Evan","id":"Z8Y 6G8"},{"name":"Zachary","id":"F4K 8V9"},{"name":"Deborah","id":"I0D 4J6"},{"name":"Carl","id":"X7H 3J3"},{"name":"Colin","id":"C8P 0O1"},{"name":"Xenos","id":"K3S 1H5"},{"name":"Sonia","id":"W9C 0N3"},{"name":"Arsenio","id":"B0M 2G6"},{"name":"Angela","id":"N9X 5O7"},{"name":"Cassidy","id":"T8T 0Q5"},{"name":"Sebastian","id":"Y6O 0A5"},{"name":"Bernard","id":"P2K 0Z5"},{"name":"Kerry","id":"T6S 4T7"},{"name":"Uriel","id":"K6G 5V2"},{"name":"Wanda","id":"S9G 2E5"},{"name":"Drake","id":"G3G 8Y2"},{"name":"Mia","id":"E4F 4V8"},{"name":"George","id":"K7Y 4L4"},{"name":"Blair","id":"Z8E 0F0"},{"name":"Phelan","id":"C5Z 0C7"},{"name":"Margaret","id":"W6F 6Y5"},{"name":"Xaviera","id":"T5O 7N5"},{"name":"Willow","id":"W6K 3V0"},{"name":"Alden","id":"S2M 8C1"},{"name":"May","id":"L5B 2H3"},{"name":"Amaya","id":"Q3B 7P8"},{"name":"Julian","id":"W6T 7I6"},{"name":"Colby","id":"N3Q 9Z2"},{"name":"Cole","id":"B5G 0V7"},{"name":"Lana","id":"O3I 2W9"},{"name":"Dieter","id":"J4A 9Y6"},{"name":"Rowan","id":"I7E 9U4"},{"name":"Abraham","id":"S7V 0W9"},{"name":"Eleanor","id":"K7K 9P4"},{"name":"Martina","id":"V0Z 5Q7"},{"name":"Kelsie","id":"R7N 7P2"},{"name":"Hedy","id":"B7E 7F2"},{"name":"Hakeem","id":"S5P 3P6"}];
	  $scope.reportListViewby = 7;
	  //$scope.totalItems = $scope.data.length;
	  //$scope.totalItems = 10;
	  $scope.reportListCurrentPage = 1;
	  $scope.reportListItemsPerPage = $scope.reportListViewby;
	  $scope.reportListMaxSize = 5; //Number of pager buttons to show

	  $scope.reportListSetPage = function (pageNo) {
	    $scope.reportListCurrentPage = pageNo;
	  };

	  $scope.reportListPageChanged = function() {
	    console.log('Page changed to: ' + $scope.reportListCurrentPage);
	  };

	  $scope.reportListSetItemsPerPage = function(num) {
	  $scope.reportListItemsPerPage = num;
	  $scope.reportListCurrentPage = 1; //reset to first paghe
	  }
	  /*----------- reportListPaginationDemoCtrl -----------------------------------*/
	
	  /*----------- UboardTV --------------------------------------------------------- */
	  $scope.filterUboardTvDataList ={};
	  $scope.uboardTvGlobalFunction = function () {
//		  console.log("/*--------- UboardTV1 ----------------------------------------*/");
		  $scope.uTvUCountList = [	 {psitnName : "전체"}
		  							,{psitnName : "한화생명"}
		  							,{psitnName : "그룹"}
		  							,{psitnName : "센터"}
		  						  ] ;
		  
//		  console.log($scope.uTvUCountList);
		  // 전체 Unit 별 R,Y,G
		  // 조건 : 노출 Y, Task 가 1건이라도 있는 Unit
		  $scope.uboardTvDataList = $scope.result;
		  var obj = {showYn : "Y", taskList:{$:"!''"}}; // data 를 가져올 때 showYn 이 Y 이고 Task 가 한 건이라도 있는 것만 가져 오도록 구현 (admin 인 경우는 예외처리하기)
		  $scope.filterUboardTvDataList = filterFilter($scope.uboardTvDataList, obj);

		  if ($location.absUrl().indexOf("/uboardTV/mainViewB1") != -1) {
			  var psitnCodeList = ["all","1","2","3"];
			  for (i in psitnCodeList) {
				  $scope.uTvUCountList[i].signalAll = $scope.uboardTvUnitCount("!", psitnCodeList[i]);
				  $scope.uTvUCountList[i].signalR = $scope.uboardTvUnitCount("R", psitnCodeList[i]);
				  $scope.uTvUCountList[i].signalY = $scope.uboardTvUnitCount("Y", psitnCodeList[i]);
				  $scope.uTvUCountList[i].signalG = $scope.uboardTvUnitCount("G", psitnCodeList[i]);
				  var chartValues = [0, 0, 0];
					chartValues[0] = $scope.uTvUCountList[i].signalR;
					chartValues[1] = $scope.uTvUCountList[i].signalY;
					chartValues[2] = $scope.uTvUCountList[i].signalG;
					for (j in chartValues) {
						optionsList[i].dataset.values[j]= chartValues[j];
						optionsList[i].dataset.values[j]= chartValues[j];
						optionsList[i].dataset.values[j]= chartValues[j];
						optionsList[i].dataset.values[j]= chartValues[j];
					}
			  }
		  }
		  	$scope.uboardTvViewby = 4;
		  	if ($location.absUrl().indexOf("/uboardTV/mainViewB2") != -1) {
				var obj = {psitnCode : "1"};
				$scope.filterUboardTvDataList = filterFilter($scope.filterUboardTvDataList, obj);
	 		}
		  	if ($location.absUrl().indexOf("/uboardTV/mainViewB3") != -1) {
				var obj = {psitnCode : "2"};
				$scope.filterUboardTvDataList = filterFilter($scope.filterUboardTvDataList, obj);
	 		}
		  	if ($location.absUrl().indexOf("/uboardTV/mainViewB4") != -1) {
				var obj = {psitnCode : "3"};
				$scope.filterUboardTvDataList = filterFilter($scope.filterUboardTvDataList, obj);
	 		}
	    }

	  /*--------- UboardTV1 ----------------------------------------*/
		$scope.$on('UboardTv1', function (ngRepeatFinishedEvent) {
//	 		if ($location.absUrl().indexOf("/uboardTV") != -1) {
//		 		if ($location.absUrl().indexOf("/uboardTV/mainViewB1") != -1) {
//					for (i in optionsList) {
//						Nwagon.chart(optionsList[i]);
//					}
//				}else {
//			 		pieChartBxSlider();
//				}
//			}
			for (i in optionsList) {
				Nwagon.chart(optionsList[i]);
			}
		});
	  
	  $scope.uboardTvUnitCount = function (vSignalCode, vPsitnCode) {
		  var obj = {signalCode : vSignalCode};
		  if(vPsitnCode != "all") obj["psitnCode"] = vPsitnCode;
		  var signalUnitCount = filterFilter($scope.filterUboardTvDataList, obj, true).length;
		  console.log(vSignalCode + " : " + signalUnitCount);
//		  var psitnCodeList = ["all","1","2","3"];
//		  for (i in psitnCodeList) {
//			  
//		  }
		  
		  return signalUnitCount;
	  }

	  /*--------- // UboardTV1 ----------------------------------------*/
	  
	  /*---------  UboardTV2~4 ----------------------------------------*/
	  	var slider = "";
		$scope.$on('UboardTv2', function (ngRepeatFinishedEvent) {
//	 		pieChartBxSlider();
	 		$('.demo-pie-1').pieChart({
	 		    barColor: '#f47320',
	 		    trackColor: '#222222',
	 		    lineCap: 'round',
	 		    lineWidth:12,
	 		    size:102,
	 		    onStep: function (from, to, percent) {
	 			 	      $(this.element).find('.pie-value').text(Math.round(percent) + '%');
	 		    }
	 		});
	 		
	    	if(slider) {
	    		slider.reloadSlider();
	    	} else {
	    		slider = $('.bxslider').bxSlider({
					auto: true,
					speed: 1000,
					pause: 5000,
					moveSlides: 1,
					controls: false,
					pager: true,
						pagerType: 'short'
						/* ajax 콜사용시 */
//						,onSliderLoad: function(){
//					    // do funky JS stuff here
//	//				    alert('Slider has finished loading. Click OK to continue!');
//					  }
					  ,onSlideAfter: function(){
					    // do mind-blowing JS stuff here
//					    if(slider.getCurrentSlide()==0) {
//					    	$scope.processForm();
//	//		 		    	alert("전부돌았다");
////			 		    	location.reload();
//					    }
					   	
	//		 		    alert('A slide has finished transitioning. Bravo. Click OK to continue!');
					  }
					  /* //ajax 콜사용시 */
				});
	    	}
		});

		$scope.uboardTvGlobalFunction2 = function () {

		}
	  /*--------- // UboardTV2~4 ----------------------------------------*/
	  
	  
	  
	  /*----------- //UboardTV --------------------------------------------------------- */
	  

		
		
		
		/*----------- Report --------------------------------------------------------- */

		
		$scope.isReportConfirmSelected = function (report) {
		    $scope.updateReport(report);
		}	
		
		
		
		/*----------- //Report --------------------------------------------------------- */
		


		/* 미사용 ----------------------------------------------------------------------------------------------------------- */	    
			    
//		    $scope.doSearch = function(item){
////			    $('input[name="signalCode"]').on('ifClicked', function (event) {
////			       // alert("You clicked " + this.value);
////			        $scope.searchRadio = this.value == 'all' ? '' : this.value;
////		    	});
		////
////				if (!$scope.searchRadio
////						|| (item.signalCode.toLowerCase().indexOf($scope.searchRadio.toLowerCase()) != -1)){
//					switch ($('#searchCondition').val()) {
//					case 'all':
//					    if (!$scope.query
//				        		|| (item.unitName.toLowerCase().indexOf($scope.query.toLowerCase()) != -1)
//				        		|| (item.leader.toLowerCase().indexOf($scope.query.toLowerCase()) != -1)
//				        		|| (item.captain.toLowerCase().indexOf($scope.query.toLowerCase()) != -1)){
//			            return true;
//			        	}
//						for (i=0; i < item.taskList.length;i++) {
//				        	if (item.taskList[i].issueText.toLowerCase().indexOf($scope.query.toLowerCase()) != -1){
//				        		return true;
//				        	}
//						}
//					break;
//					case 'unit':
//					    if (!$scope.query
//				        		|| (item.unitName.toLowerCase().indexOf($scope.query.toLowerCase()) != -1)){
//			            return true;
//					    }
//					break;
//					case 'issue':
//						for (i=0; i < item.taskList.length;i++) {
//				        	if (item.taskList[i].issueText.toLowerCase().indexOf($scope.query.toLowerCase()) != -1){
//				        		return true;
//				        	}
//						}
//					break;
//					case 'leader':
//						if (!$scope.query
//				        		|| (item.leader.toLowerCase().indexOf($scope.query.toLowerCase()) != -1)){
//			            return true;
//			        	}
//					break;
//					case 'captain':
//						if (!$scope.query
//				        		|| (item.captain.toLowerCase().indexOf($scope.query.toLowerCase()) != -1)){
//			            return true;
//			        	}
//					break;
//					}
////				}
//		        return false;
//		     };
		/* //미사용 ----------------------------------------------------------------------------------------------------------- */		
		$scope.Math = window.Math;

		/* 보고일시 ---------------------------------------------------------------------------------*/
		$scope.repoDateMins = [
		                "00"
		                ,"10"
		                ,"20"
		                ,"30"
		                ,"40"
		                ,"50"]
	    $scope.getReportData = function(idReport) {
	    	var obj = {idReport : idReport };
	    	$scope.reportData = filterFilter($scope.filterReportList, obj, true);
	    	$scope.reportData = $scope.reportData[0];
	    	$scope.reportData.repoDate = regDateFormatFilter($scope.reportData.repoDate);
	    }
	    $scope.setReportDate = function(reportData) {
	    	$scope.reportData.repoDate = document.getElementById("reportDataDate").value.toString().split("-").join("");
			$('.layer-member-add').hide();
			$('.layer-member-modi').hide();
			$('.layer-notice-time').hide();
	    		disablePopup1();	
    		$scope.updateReport(report);	    		
	    }
		
/*//보고사항 ---------------------------------------------------------------------------------*/		
		
		
})
     .filter('start', function () {
         return function (input, start) {
             if (!input || !input.length) { return; }
             start = +start;
             return input.slice(start);
         };
});


//var PaginationCtrl = function ($scope) {
function PaginationCtrl ($scope) {
/*----------- PaginationDemoCtrl -----------------------------------*/

//$scope.data = [{"name":"Bell","id":"K0H 2V5"},{"name":"Octavius","id":"X1E 6J0"},{"name":"Alexis","id":"N6E 1L6"},{"name":"Colton","id":"U4O 1H4"},{"name":"Abdul","id":"O9Z 2Q8"},{"name":"Ian","id":"Q7W 8M4"},{"name":"Eden","id":"H8X 5E0"},{"name":"Britanney","id":"I1Q 1O1"},{"name":"Ulric","id":"K5J 1T0"},{"name":"Geraldine","id":"O9K 2M3"},{"name":"Hamilton","id":"S1D 3O0"},{"name":"Melissa","id":"H9L 1B7"},{"name":"Remedios","id":"Z3C 8P4"},{"name":"Ignacia","id":"K3B 1Q4"},{"name":"Jaime","id":"V6O 7C9"},{"name":"Savannah","id":"L8B 8T1"},{"name":"Declan","id":"D5Q 3I9"},{"name":"Skyler","id":"I0O 4O8"},{"name":"Lawrence","id":"V4K 0L2"},{"name":"Yael","id":"R5E 9D9"},{"name":"Herrod","id":"V5W 6L3"},{"name":"Lydia","id":"G0E 2K3"},{"name":"Tobias","id":"N9P 2V5"},{"name":"Wing","id":"T5M 0E2"},{"name":"Callum","id":"L9P 3W5"},{"name":"Tiger","id":"R9A 4E4"},{"name":"Summer","id":"R4B 4Q4"},{"name":"Beverly","id":"M5E 4V4"},{"name":"Xena","id":"I8G 6O1"},{"name":"Yael","id":"L1K 5C3"},{"name":"Stacey","id":"A4G 1S4"},{"name":"Marsden","id":"T1J 5J3"},{"name":"Uriah","id":"S9S 8I7"},{"name":"Kamal","id":"Y8Z 6X0"},{"name":"MacKensie","id":"W2N 7P9"},{"name":"Amelia","id":"X7A 0U3"},{"name":"Xavier","id":"B8I 6C9"},{"name":"Whitney","id":"H4M 9U2"},{"name":"Linus","id":"E2W 7U1"},{"name":"Aileen","id":"C0C 3N2"},{"name":"Keegan","id":"V1O 6X2"},{"name":"Leonard","id":"O0L 4M4"},{"name":"Honorato","id":"F4M 8M6"},{"name":"Zephr","id":"I2E 1T9"},{"name":"Karen","id":"H8W 4I7"},{"name":"Orlando","id":"L8R 0U4"},{"name":"India","id":"N8M 8F4"},{"name":"Luke","id":"Q4Y 2Y8"},{"name":"Sophia","id":"O7F 3F9"},{"name":"Faith","id":"B8P 1U5"},{"name":"Dara","id":"J4A 0P3"},{"name":"Caryn","id":"D5M 8Y8"},{"name":"Colton","id":"A4Q 2U1"},{"name":"Kelly","id":"J2E 2L3"},{"name":"Victor","id":"H1V 8Y5"},{"name":"Clementine","id":"Q9R 4G8"},{"name":"Dale","id":"Q1S 3I0"},{"name":"Xavier","id":"Z0N 0L5"},{"name":"Quynn","id":"D1V 7B8"},{"name":"Christine","id":"A2X 0Z8"},{"name":"Matthew","id":"L1H 2I4"},{"name":"Simon","id":"L2Q 7V7"},{"name":"Evan","id":"Z8Y 6G8"},{"name":"Zachary","id":"F4K 8V9"},{"name":"Deborah","id":"I0D 4J6"},{"name":"Carl","id":"X7H 3J3"},{"name":"Colin","id":"C8P 0O1"},{"name":"Xenos","id":"K3S 1H5"},{"name":"Sonia","id":"W9C 0N3"},{"name":"Arsenio","id":"B0M 2G6"},{"name":"Angela","id":"N9X 5O7"},{"name":"Cassidy","id":"T8T 0Q5"},{"name":"Sebastian","id":"Y6O 0A5"},{"name":"Bernard","id":"P2K 0Z5"},{"name":"Kerry","id":"T6S 4T7"},{"name":"Uriel","id":"K6G 5V2"},{"name":"Wanda","id":"S9G 2E5"},{"name":"Drake","id":"G3G 8Y2"},{"name":"Mia","id":"E4F 4V8"},{"name":"George","id":"K7Y 4L4"},{"name":"Blair","id":"Z8E 0F0"},{"name":"Phelan","id":"C5Z 0C7"},{"name":"Margaret","id":"W6F 6Y5"},{"name":"Xaviera","id":"T5O 7N5"},{"name":"Willow","id":"W6K 3V0"},{"name":"Alden","id":"S2M 8C1"},{"name":"May","id":"L5B 2H3"},{"name":"Amaya","id":"Q3B 7P8"},{"name":"Julian","id":"W6T 7I6"},{"name":"Colby","id":"N3Q 9Z2"},{"name":"Cole","id":"B5G 0V7"},{"name":"Lana","id":"O3I 2W9"},{"name":"Dieter","id":"J4A 9Y6"},{"name":"Rowan","id":"I7E 9U4"},{"name":"Abraham","id":"S7V 0W9"},{"name":"Eleanor","id":"K7K 9P4"},{"name":"Martina","id":"V0Z 5Q7"},{"name":"Kelsie","id":"R7N 7P2"},{"name":"Hedy","id":"B7E 7F2"},{"name":"Hakeem","id":"S5P 3P6"}];
$scope.viewby = 4;
//$scope.totalItems = $scope.data.length;
//$scope.totalItems = 10;
$scope.currentPage = 1;
$scope.itemsPerPage = $scope.viewby;
$scope.maxSize = 5; //Number of pager buttons to show

$scope.setPage = function (pageNo) {
  $scope.currentPage = pageNo;
};

$scope.pageChanged = function() {
  console.log('Page changed to: ' + $scope.currentPage);
};

$scope.setItemsPerPage = function(num) {
$scope.itemsPerPage = num;
$scope.currentPage = 1; //reset to first paghe
}
/*----------- PaginationDemoCtrl -----------------------------------*/
}

app.controller('PaginationCtrl', PaginationCtrl);

//app.controller('registerCtrl',function($scope, $http, $routeParams, $location) {
//	//URL 매개변수 값을 가져오기 위한 $routeParams 서비스와 URL 이동을 위해 $location 서비스를 주입받는다.
//	    var id = $routeParams.idUnit;
//	//$routeProvider에서 정의한 :userId 매개변수 값을 $routeParams 서비스를 통하여 접근한다.
//	    var reqPromise = $http.get('sample-'+id+'.json');
//	//각 userId에 해당하는 데이터를 $http 서비스를 통하여 요청한다.
//
//	    reqPromise.success(function(data) {
//	      $scope.result = data;
//	    });
//
//	    reqPromise.error(function(data) {
//	      console.error("Ajax 에러 발생");
//	    });
//
//	    $scope.back = function() {
//	      $location.url('/home')
//	//사용자 상세 화면에서 뒤로가기 버튼을 클릭 시 해당 함수가 호출되며 이 때 $location서비스를 이용하여 브라우저 URL을 ‘userList’로 변경한다.
//	    };
//	});

//app.controller('registerCtrl',function($scope, $http, $routeParams, $location) {
//	alert('1');
//	//URL 매개변수 값을 가져오기 위한 $routeParams 서비스와 URL 이동을 위해 $location 서비스를 주입받는다.
//	    var id = $routeParams.idUnit;
//	//$routeProvider에서 정의한 :userId 매개변수 값을 $routeParams 서비스를 통하여 접근한다.
//	    var reqPromise = $http.get('sample-'+id+'.json');
//	//각 userId에 해당하는 데이터를 $http 서비스를 통하여 요청한다.
//
//	    reqPromise.success(function(data) {
//	      $scope.result = data;
//	    });
//
//	    reqPromise.error(function(data) {
//	      console.error("Ajax 에러 발생");
//	    });
//
//	    $scope.back = function() {
//	      $location.url('/home')
//	//사용자 상세 화면에서 뒤로가기 버튼을 클릭 시 해당 함수가 호출되며 이 때 $location서비스를 이용하여 브라우저 URL을 ‘userList’로 변경한다.
//	    };
//	});

//(function() {
//  function async_load(){

//    var s = document.createElement('script');
//    s.type = 'text/javascript';
//    s.async = true;
//    s.src = '${pageContext.request.contextPath}/js/mainView.js?version=${System.currentTimeMillis()}';
//    var x = document.getElementsByTagName('script')[0];
//    x.parentNode.insertBefore(s, x);

//  }
//  window.attachEvent ? window.attachEvent('onload', async_load) : window.addEventListener('load', async_load, false);
//})();



app.controller('regCtrl', function($scope, $http, $location, filterFilter, searchUserListQeury, resultDateFormatFilter, regDateFormatFilter, taskDateFormatFilter) {
	$scope.getIdUnit = getIdUnit;
	$scope.x = 	{psitnCode : "1"};
	$scope.y ="";
	$scope.userListRefresh = function () {
		$http({
			  method: 'GET',
			  url: getContextPath()+'/admin/adminuserjson.json'
			  //url: getContextPath()+'/admin/adminreportjson.json'
			}).then(function successCallback(response) {
			    // this callback will be called asynchronously
			    // when the response is available
				$scope.user = response.data.AdminUserList;
				for(var i in $scope.user.length) {
					$scope.user[i]["userCheckBox"] = "";
//					console.log($scope.user[i]);
				}
				$scope.filterUserList = $scope.user;
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
		});
	}
	
	$scope.userListRefresh();
	$http({
	  method  : 'POST',
	  url     : getContextPath()+'/web/selectAllUnitTaskList.json',
		headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
		transformRequest: function(obj) {
		    var str = [];
		    for(var p in obj)
		    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		    return str.join("&");
		},
	  data    : {"signalCode": "all", "idUnit":getIdUnit},//$.param($scope.formData),  // pass in data as strings
	 })
	  .success(function(data) {
		if (data.resultList) {
		    console.log(data);
		    $scope.result = data.resultList;
		    $scope.filterList = $scope.result;
		    $scope.x = !$scope.result? "" :$scope.result[0];
		    if($scope.result) {
			    $scope.x.fromDate = regDateFormatFilter($scope.x.fromDate);
			    $scope.x.toDate = regDateFormatFilter($scope.x.toDate);
//			    $scope.x.leaderStateFrom = regDateFormatFilter($scope.x.leaderStateFrom);
//			    $scope.x.leaderStateTo = regDateFormatFilter($scope.x.leaderStateTo);
//			    $scope.x.captainStateFrom = regDateFormatFilter($scope.x.captainStateFrom);
//			    $scope.x.captainStateTo = regDateFormatFilter($scope.x.captainStateTo);
		    }
		    $scope.y = !$scope.x.taskList? "" :$scope.x.taskList[0];
		    for (var i = 0; i < $scope.x.taskList.length; i++) {
		    	$scope.x.taskList[i].fromDate = regDateFormatFilter($scope.x.taskList[i].fromDate);
			    $scope.x.taskList[i].toDate = regDateFormatFilter($scope.x.taskList[i].toDate);
			    
			    for (var f =0; f < $scope.x.taskList[i].userList.length; f++) {
//			    	$scope.x.taskList[i].userList[f].userStateFrom = regDateFormatFilter($scope.x.taskList[i].userList[f].userStateFrom);
//				    $scope.x.taskList[i].userList[f].userStateTo = regDateFormatFilter($scope.x.taskList[i].userList[f].userStateTo);
			    }
	    	} 	
		    $scope.z = !$scope.y || !$scope.y.userList? "" :$scope.y.userList[0];
		    $scope.x.filterTaskList = $scope.x.taskList;
		}
	    if (!data.success) {
	      // if not successful, bind errors to error variables
/*     	      $scope.errorName = data.errors.name;
	      $scope.errorSuperhero = data.errors.superheroAlias; */
	    } else {
	      // if successful, bind success message to message
/*     	      $scope.message = data.message; */
	    	$scope.result = '';
	    }
	    if(getIdUnit != ''){
	    	if (data.resultList[0].taskList.length == 0){
	    		$scope.newTaskInsert();
	    		alert('등록된 Task 정보가 없습니다. 세부업무를 1개 이상 등록해주세요');
	    	}
	    }
	    
		$http({
			method  : 'POST',
			url : getContextPath()+'/admin/selectUnitpartneruserList.json',
			headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
			data    : {"unitCode": $scope.x.unitCode},
		 })
		 .success(function(data) {
			 $scope.checkUserList = data.selectUnitPartnerUserList;
			 $scope.resultCheckUser = filterFilter(data.selectUnitPartnerUserList, {idUnitPartner : "!''"});
//			 $scope.resultCheckUser = data.selectUnitPartnerUserList;
		 })
	    
	    $scope.newUser = [{}];
	    $scope.remove = function(index) {
	        $scope.newUser.splice(index, 1);
	      };
		$scope.add = function() {
			$scope.newUser.push({});
		};

	    /*------------ insertUnitTest & updateUnitTest ------------------------------------------------------------------------------------------------*/
	 	// process the form
	 	$scope.doPostProcessForm = function(url, data) {
	 		console.log('doPostProcessForm');
	 		console.log(data);
	 		console.log('------------------');
	 		vData = !data?{"signalCode": "all"} : data;
	 		console.log('vDataProcessForm');
	 		console.log(vData);
	 	  $http({
	 	  method  : 'POST',
//	 	  url     : '${pageContext.request.contextPath}/web/selectAllUnitTaskList.json',
//	 	  url     : getContextPath()+'/web/selectAllUnitTaskList.json',
	 	  url     : url,
	 	  data    : vData,//$.param($scope.formData),  // pass in data as strings
//	 	  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
			 headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
			 transformRequest: function(obj) {
			 		var str = [];
			 		for(var p in obj)
			 		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			 		return str.join("&");
			 }
	 	 })
	 	  .success(function(data, status, headers, config, $timeout) {
	 		if (config.url == getContextPath()+'/admin/insertjson.json') {
	 			console.log('insertData');
	 			console.log(data.sampleVO.idUnit);
	 			$scope.idUnitSuccess = data.sampleVO.idUnit;
	 			$scope.insertUnitPartner($scope.insertUnitPartnerData, $scope.idUnitSuccess);
	 			window.location = getContextPath()+'/admin/unitRegister.do?idUnit='+data.sampleVO.idUnit;	
	 		}
	 		console.log('success');
	 	    console.log(data);
	 	    console.log('------------------');
//	 	    $scope.result = data.resultList;
//	 	    $scope.filterList = $scope.result;
//	 	    $scope.results = $scope.result ? $scope.result.slice(0, 1) :"";
//	 	    console.log($scope.results);
//	 	    $scope.getMoreData = function () {
//	 	        $scope.results = $scope.result.slice(0, $scope.results.length + 1);
//	 	    }

	 	    if (!data.success) {
	 	      // if not successful, bind errors to error variables
	 /*     	      $scope.errorName = data.errors.name;
	 	      $scope.errorSuperhero = data.errors.superheroAlias; */
	 	    } else {
	 	      // if successful, bind success message to message
	 /*     	      $scope.message = data.message; */
	 	    }
	 	    
//	 	  $scope.userListRefresh();
	 	  
	 	  });
	 	};
	 	
	 	$scope.successAlert = function () {
			alert('처리가 완료되었습니다');
//			 location.reload();
	    };
	 	
	 	$scope.getIdUser = function(data) {
	 		var obj = {userCode : data };
	     	$scope.userData = filterFilter($scope.user, obj, true);
	     	$scope.userData = $scope.userData[0];
	     	return $scope.userData.idUser;
	 	};
	 	
	    $scope.insertUnit = function(data, data2) {
	    	url = getContextPath()+'/admin/insertjson.json';
//	    	data =
//	    	{
//					name:"asdf",
//					useYn:"Y",
//					description:"asdf",
//					regUser:"asdfasdf",
//					searchCondition:1,
//					searchKeyword:"",
//					pageIndex:1
//					,
//							psitnCode : "1",
//							psitnName : "psitnName",
//							unitCode : "1113",
//							unitName : data.unitName,
//							leader : data.leader,
//							captain : data.captain,
//							fromDate : data.fromDate,
//							toDate : data.toDate,
//							leaderCode : "123123",
//							captainCode : "123123",
//							showYn : "Y"
//	    		  }
	    	
//	    	leaderData = {
// 				idUser : $scope.getIdUser(data.leaderCode),
//				userCode : data.leaderCode,
//				userName : data.leader,
//				userEmail : data.leaderEmail,
//				userTel : data.leaderTel,
//				userStateCode : data.leaderStateCode,
////				userStateFrom : data.leaderStateFrom,
////				userStateTo : data.leaderStateTo,
//				userStateTime : data.leaderStateTime
//	 		};
//	 		captainData = {
//	 			idUser : $scope.getIdUser(data.captainCode),
//				userCode : data.captainCode,
//				userName : data.captain,
//				userEmail : data.captainEmail,
//				userTel : data.captainTel,
//				userStateCode : data.captainStateCode,
////				userStateFrom : data.captainStateFrom,
////				userStateTo : data.captainStateTo,
//				userStateTime : data.captainStateTime
//	 		};
	    	
//	 		leaderData.userStateFrom = document.getElementById("xleaderStateFrom").value.toString().split("-").join("");
//	 		leaderData.userStateTo = document.getElementById("xleaderStateTo").value.toString().split("-").join("");
//	 		captainData.userStateFrom = document.getElementById("xcaptainStateFrom").value.toString().split("-").join("");
//	 		captainData.userStateTo = document.getElementById("xcaptainStateTo").value.toString().split("-").join("");
	    	data.fromDate = document.getElementById("xfromDate").value.toString().split("-").join("");
	    	data.toDate = document.getElementById("xtoDate").value.toString().split("-").join("");
	    	$scope.dateValidation(data.fromDate, data.toDate);
	    	data.psitnName = data.psitnCode == 1 ? "한화생명" : (data.psitnCode == 2 ? "그룹" : "센터");
//	    	data.showYn = "Y";
	    	console.log('insertUnit---------');
	 		console.log(data);
	 		console.log('------------------');
	 		$scope.insertUnitPartnerData = data2;
	    	$scope.doPostProcessForm(url, data);   		 		
	    	
	 		if($scope.dateValidation(data.fromDate, data.toDate) == true){
	 			$scope.doPostProcessForm(url, data);
	 			if (!data.leaderCode) {
			 		var obj = {userCode : data.leaderCode };
	//		     	$scope.userData = filterFilter($scope.user, obj, true);
	//		     	$scope.userData = $scope.userData[0];
					leaderDataList = filterFilter($scope.user, obj, true);
					leaderData = leaderDataList[0];
					leaderData.userStateCode = data.leaderStateCode;
					leaderData.userStateFrom = document.getElementById("xleaderStateFrom").value.toString().split("-").join("");
					leaderData.userStateTo = document.getElementById("xleaderStateTo").value.toString().split("-").join("");
					leaderData.userStateTime = data.leaderStateTime
					$scope.updateUser(leaderData);
	 			}
	 			if (!data.captainCode) {
					var obj = {userCode : data.captainCode };
					captainDataList = filterFilter($scope.user, obj, true);
					captainData = captainDataList[0];
					captainData.userStateCode = data.captainStateCode;
					captainData.userStateFrom = document.getElementById("xcaptainStateFrom").value.toString().split("-").join("");
					captainData.userStateTo = document.getElementById("xcaptainStateTo").value.toString().split("-").join("");
					captainData.userStateTime = data.captainStateTime
					$scope.updateUser(captainData);
	 			}
	 		}
 			
	    }

	    $scope.updateUnit = function(data) {
	    	url = getContextPath()+'/admin/updatejson.json';
	    	console.log('updateUnit---------');
	 		console.log(data);

//	 		var fromDate = document.getElementById("xfromDate").value.toString().split("-").join("");
//	  		var toDate = document.getElementById("xtoDate").value.toString().split("-").join("");

//	  		$scope.data = data;
//	  		data = {
//	  				idUnit: getIdUnit,
//	  				psitnCode : data.psitnCode,
//	 				unitName : data.unitName,
//	 				fromDate : fromDate,
//	 				toDate : toDate,
//
//	 				fromDate : fromDate,
//	 				toDate : toDate,
//
//	 				showYn : data.showYn,
//
//	 				leader : data.leader,
//					leaderTel : data.leaderTel,
//					leaderEmail : data.leaderEmail,
//					leaderStateCode : data.leaderStateCode,
//
//					captain : data.captain,
//					captainTel : data.captainTel,
//					captainEmail : data.captainEmail,
//					captainStateCode : data.captainStateCode,
//
//
//					leaderCode : "123123",
//					captainCode : "123123",
//	 		}
	    	data.fromDate = document.getElementById("xfromDate").value.toString().split("-").join("");
	    	data.toDate = document.getElementById("xtoDate").value.toString().split("-").join("");
	    	data.psitnName = data.psitnCode == 1 ? "한화생명" : (data.psitnCode == 2 ? "그룹" : "센터");	
	 		console.log('------------------');
	 		
//	 		leaderData = {
// 				idUser : $scope.getIdUser(data.leaderCode),
//				userCode : data.leaderCode,
//				userName : data.leader,
//				userEmail : data.leaderEmail,
//				userTel : data.leaderTel,
//				userStateCode : data.leaderStateCode,
////				userStateFrom : data.leaderStateFrom,
////				userStateTo : data.leaderStateTo,
//				userStateTime : data.leaderStateTime
//	 		};
//	 		captainData = {
//	 			idUser : $scope.getIdUser(data.captainCode),
//				userCode : data.captainCode,
//				userName : data.captain,
//				userEmail : data.captainEmail,
//				userTel : data.captainTel,
//				userStateCode : data.captainStateCode,
////				userStateFrom : data.captainStateFrom,
////				userStateTo : data.captainStateTo,
//				userStateTime : data.captainStateTime
//	 		};
//	 		
//	 		leaderData.userStateFrom = document.getElementById("xleaderStateFrom").value.toString().split("-").join("");
//	 		leaderData.userStateTo = document.getElementById("xleaderStateTo").value.toString().split("-").join("");
//	 		captainData.userStateFrom = document.getElementById("xcaptainStateFrom").value.toString().split("-").join("");
//	 		captainData.userStateTo = document.getElementById("xcaptainStateTo").value.toString().split("-").join("");
	 		
	 		if($scope.dateValidation(data.fromDate, data.toDate) == true){
	 			$scope.doPostProcessForm(url, data);
	 			
	 			if (!data.leaderCode) {
			 		var obj = {userCode : data.leaderCode };
	//		     	$scope.userData = filterFilter($scope.user, obj, true);
	//		     	$scope.userData = $scope.userData[0];
					leaderDataList = filterFilter($scope.user, obj, true);
					leaderData = leaderDataList[0];
					leaderData.userStateCode = data.leaderStateCode;
					leaderData.userStateFrom = document.getElementById("xleaderStateFrom").value.toString().split("-").join("");
					leaderData.userStateTo = document.getElementById("xleaderStateTo").value.toString().split("-").join("");
					leaderData.userStateTime = data.leaderStateTime
					$scope.updateUser(leaderData);
	 			}
	 			if (!data.captainCode) {
					var obj = {userCode : data.captainCode };
					captainDataList = filterFilter($scope.user, obj, true);
					captainData = captainDataList[0];
					captainData.userStateCode = data.captainStateCode;
					captainData.userStateFrom = document.getElementById("xcaptainStateFrom").value.toString().split("-").join("");
					captainData.userStateTo = document.getElementById("xcaptainStateTo").value.toString().split("-").join("");
					captainData.userStateTime = data.captainStateTime
					$scope.updateUser(captainData);
	 			}
	 		}
	    	
	    }

	/*------------------------------------------------------------------------------------------------------*/

	    // insertTask set data
	    $scope.insertTask = function(data) {
	    	url = getContextPath()+'/admin/inserttask.json';
//	    	data =
//	    	{
//					name:"asdf",
//					useYn:"Y",
//					description:"asdf",
//					regUser:"asdfasdf",
//					searchCondition:1,
//					searchKeyword:"",
//					pageIndex:1
//					,
//							unitCode : "10",
//							taskCode : "1",
//							taskName : "insert_taskName",
//							progress : "70",
//							signalCode : "Y",
//							alramCode : "B",
//							issueText : "alsdfjasldfjlasdf",
//							fromDate : "20160220",
//							toDate : "20160225",
//							rprsnttvEmplNo : "eddy"
//	    		  }
	    	
	    	data.fromDate = document.getElementById("addYFromDate").value.toString().split("-").join("");
	    	data.toDate = document.getElementById("addYToDate").value.toString().split("-").join("");
	    	data.unitCode = $scope.x.unitCode;
	    	data.taskCode = $scope.x.taskList.length + 1;
	    	data.repoDate = document.getElementById("repoDate").value.toString().split("-").join("");
	    	// add update 별도 작업 필요
//	    	data.idReport = '2';
	    	
	    	$scope.doPostProcessForm(url, data);
	    	console.log(data);
	    	$scope.insertReport(data);
	    	
	    }

	    // updateTask set data
	    $scope.updateTask = function(data) {

	    	url = getContextPath()+'/admin/updatetask.json';
//	    	data =
//	    	{
//					name:"asdf",
//					useYn:"Y",
//					description:"asdf",
//					regUser:"asdfasdf",
//					searchCondition:1,
//					searchKeyword:"",
//					pageIndex:1
//					,
//							idTask : 9,
//							unitCode : "1",
//							taskCode : "1",
//							taskName : "update_taskName",
//							progress : "70",
//							signalCode : "Y",
//							alramCode : "B",
//							issueText : "afjlajfdlasjdf",
//							fromDate : "20160220",
//							toDate : "20160225",
//							rprsnttvEmplNo : "eddy"
//	    		  }
	    	data.fromDate = document.getElementById("modifyYFromDate").value.toString().split("-").join("");
	    	data.toDate = document.getElementById("modifyYToDate").value.toString().split("-").join("");
	    	data.repoDate = document.getElementById("repoDate").value.toString().split("-").join("");
	    	$scope.doPostProcessForm(url, data);
//	    	 $scope.deleteReport(data);
	    	 $scope.updateReport(data);
	    }

	    $scope.deleteUser = function(data) {
	    	if (confirm("정말 삭제하시겠습니까??") != true) return;
	    	url = getContextPath()+'/admin/deleteuser.json';
//	    	data =
//	    	{
//							idUser : 588
//							/*
//							userCode : "9999999",
//							userName : "eddy",
//							userEmail : "comeddy@naver.com",
//							usµerTel : "010-34356-1413",
//							userStateCode : "state2",
//							userStateFrom : "20160224",
//							userStateTo : "20160225"
//							*/
//	    		  }
	    	$scope.doPostProcessForm(url, data);
	    }

//	    $scope.$watch('x.leader', function (term) {
//	    	if (term) {
//	    		$scope.x.leader = searchUserListQeury;
//	    		$scope.userPopUp();
//	    	}
//	      });

//	    $scope.$watch('x.unitPartner', function (term) {
//	    	if (term) {
//	    		$scope.userPopUp();
//	    	}
//	      });
//
//	    $scope.$watch('z.userName', function (term) {
//	    	if (term) {
//	    		$scope.userPopUp();
//	    	}
//	      });

	 // insertReport set data
	    $scope.insertReport = function(data) {
	    	url = getContextPath()+'/admin/insertreport.json';
	    	console.log(data);
//	    	data =
//	    	{
//					name:"asdf",
//					useYn:"Y",
//					description:"asdf",
//					regUser:"asdfasdf",
//					searchCondition:1,
//					searchKeyword:"",
//					pageIndex:1
//					,
//							unitCode : "1",
//							taskCode : "1",
//							repoDate : "20160226",
//							repoDateHour : "14",
//							repoDateMin : "30",
//							repoUserCode : "20160224",
//							repoMembers : "프로젝트 전원",
//	                        repoDesc : "보고내용이 있습니다."
//	    		  }

	    	$scope.doPostProcessForm(url, data);
	    }


	    // updateReport set data
	    $scope.updateReport = function(data) {
	    	url = getContextPath()+'/admin/updatereport.json';
	    	$scope.doPostProcessForm(url, data);
	    }
	    
	    // deleteReport set data
	    $scope.deleteReport = function(data) {
	    	url = getContextPath()+'/admin/deletereport.json';
//	    	data =
//	    	{
//			      			idReport : 1
//	    	}
	    	$scope.doPostProcessForm(url, data);
	    }
	    

// 담당자 리스트 (start)-------------------------------------------------------------------

		 

		 /* selectUser, insertUser, updateUser, deleteUser ------------------------------------------------------------------------------------------------------*/

		 	// selectUser set data
		     $scope.selectUser = function(data) {
		     	url = getContextPath()+'/admin/selectuser.json';
		     	data =
		     	{
		 				name:"asdf",
		 				useYn:"Y",
		 				description:"asdf",
		 				regUser:"asdfasdf",
		 				searchCondition:1,
		 				searchKeyword:"",
		 				pageIndex:1
		 				,
		 						idUser : 9
		 						/*
		 						userCode : "9999999",
		 						userName : "eddy",
		 						userEmail : "comeddy@naver.com",
		 						userTel : "010-34356-1413",
		 						userStateCode : "state2",
		 						userStateFrom : "20160224",
		 						userStateTo : "20160225",
		 						userStateTime : "AM"
		 						*/
		     		  }
		     	$scope.doPostProcessForm(url, data);
		     }

		     // insertUser set data
		     $scope.insertUser = function(data) {
		     	url = getContextPath()+'/admin/insertuser.json';
     			for(var i in data) {
		     		data[i]["userStateCode"] = "state1";
		     		data[i]["userStateCode"] = "state1";
		     		data[i]["userStateFrom"]= "";
		     		data[i]["userStateTo"]= "";
		     		data[i]["userStateTime"]= "";
		     		if(data[i].userCode != null)
		     			$scope.doPostProcessForm(url, data[i]);
		     		else
		     			alert('아이디가 없습니다');
 				};
		 //    	data =
		 //    	{
		 //				name:"asdf",
		 //				useYn:"Y",
		 //				description:"asdf",
		 //				regUser:"asdfasdf",
		 //				searchCondition:1,
		 //				searchKeyword:"",
		 //				pageIndex:1
		 //				,
		 //						userCode : "9999999",
		 //						userName : "oscar",
		 //						userEmail : "comeddy@naver.com",
		 //						userTel : "010-34356-1413",
		 //						userStateCode : "state2",
		 //						userStateFrom : "20160224",
		 //						userStateTo : "20160225"
		 //    		  }

		     	
		     }

		     // updateUser set data
		     $scope.updateUser = function(data) {
//		     	url = getContextPath()+'/admin/updateuser.json';
//		 //    	data =
//		 //    	{
//		 //				name:"asdf",
//		 //				useYn:"Y",
//		 //				description:"asdf",
//		 //				regUser:"asdfasdf",
//		 //				searchCondition:1,
//		 //				searchKeyword:"",
//		 //				pageIndex:1
//		 //				,
//		 //						idUser : 10,
//		 //						userCode : "9999999",
//		 //						userName : "eddy",
//		 //						userEmail : "comeddy@naver.com",
//		 //						userTel : "010-34356-1413",
//		 //						userStateCode : "state2",
//		 //						userStateFrom : "20160224",
//		 //						userStateTo : "20160225"
//		 //    		  }
//		     	$scope.doPostProcessForm(url, data);
		     }

		     // deleteUser set data
		     $scope.deleteUser = function(data) {
		    	 if (confirm("정말 삭제하시겠습니까??") != true) return;
		     	url = getContextPath()+'/admin/deleteuser.json';
		 //    	data =
		 //    	{
		 //						idUser : 588
		 //						/*
		 //						userCode : "9999999",
		 //						userName : "eddy",
		 //						userEmail : "comeddy@naver.com",
		 //						usµerTel : "010-34356-1413",
		 //						userStateCode : "state2",
		 //						userStateFrom : "20160224",
		 //						userStateTo : "20160225"
		 //						*/
		 //    		  }
		     	$scope.doPostProcessForm(url, data);
		     }

		     $scope.getUserData = function(idUser) {
		     	var obj = {idUser : idUser };
		     	$scope.userData = filterFilter($scope.user, obj, true);
		     	$scope.userData = $scope.userData[0];
		     }

		     $scope.btnManage = function() {
		     	$scope.searchUserListQeury = "";
		    	$http({
		  		  method: 'GET',
		  		  url: getContextPath()+'/admin/adminuserjson.json'
		  			}).then(function successCallback(response) {
		  			$scope.user = response.data.AdminUserList;
		  			$scope.filterUserList = $scope.user;
		  			}, function errorCallback(response) {
		  		  });
		     	$scope.filterUserList = $scope.user;
		     }


		     
		     $scope.$watch('searchUserListQeury', function (term) {
		         var obj = [];
		  			switch ($('#searchUserListCondition').val()) {
		  			case 'all':     obj = {$ : term};
		  			break;
		  			case 'userName':    obj = {userName : term};
		  			break;
//		  			case 'task':    obj = {psitnCode : $scope.category, taskList : { $: term}};
//		  			break;
//		  			case 'leader':  obj = {psitnCode : $scope.category, leader : term};
//		  			break;
//		  			case 'captain':	obj = {psitnCode : $scope.category, captain : term};
//		  			break;
		  			}
//		  			obj.push({psitnCode : $scope.category});
		           $scope.filterUserList = filterFilter($scope.user, obj);
//		           $scope.currentPage = 1;
		 //
//		           /*-------------------- 검색 후 펼치기 ----------------------- */
//		           $('.btn-up').addClass("btn-down");
//		           $('.btn-up').parent().parent().next().show();
//		           /*-------------------- 검색 후 펼치기 ----------------------- */
		       });		     
		     
		    $scope.userPopUp = function (term, inputUserType) {
	    	    var wh = window.innerHeight-200;
	    	    var wh1 = window.innerHeight;

				$('.layer-member').show();
	    		if (wh1 < 840) {
	    			$('.layer-member > .box-layer-body').height(wh);
	    		}
	    		else{
	    			$('.layer-member > .box-layer-body').height('auto');
	    		}
	    		loadPopup();
	    		$scope.searchUserListQeury = term;
	    		$scope.inputUserType = inputUserType;
		    }
		    
//		     $scope.$watch('x.leaderStateCode', function () {
//		    	 console.log($scope.x.leaderStateCode);
//		     });

//		    $scope.checkUser = [];
		    $scope.removeUnitPartner = function(index) {
		        $scope.checkUserList.splice(index, 1);
		      };
		    
		    
		     $scope.selectedUserOK = function() {
	    	   	var obj = {userCheckBox : true };
	    	   	var selectedUserList = filterFilter($scope.filterUserList, obj, true);
	    	   	if (!selectedUserList.length) return;
//		    	 $scope.x = 
//		    	    {
//		    	        "idUser": 1,
//		    	        "userCode": "1072072",
//		    	        "userName": "김리더",
//		    	        "userEmail": "leader@hanwha.com",
//		    	        "userTel": "010-444-6666",
//		    	        "userStateCode": "state3",
//		    	        "userStateFrom": "20160201",
//		    	        "userStateTo": "20160203"
//		    	      };

//	    	   if (   ($scope.inputUserType == 'leader' 
//	    		   || $scope.inputUserType == 'captain'
//	    		   || $scope.inputUserType == 'rep'   )
//	    		   && selectedUserList.length > 1) {
//	    		   alert('한 명만 선택하세요');
//	    		   return;
//	    	   }	    	   	
	    	   
	    	   for (var i in selectedUserList) {
	    		   var userData = selectedUserList[i];
	    	   }

	    	   if ($scope.inputUserType == 'leader') {
	    		   $scope.inputUserType = "";
		    	 if (userData.userCheckBox) {
		    		 $scope.x["leaderCode"] = userData.userCode;
			    	 $scope.x["leader"] = userData.userName;
			    	 $scope.x["leaderTel"] = userData.userTel;
			    	 $scope.x["leaderEmail"] = userData.userEmail;
			    	 $scope.x["leaderStateCode"] = userData.userStateCode;
			    	 $scope.x["leaderStateFrom"] = userData.userStateFrom;
			    	 $scope.x["leaderStateTo"] = userData.userStateTo;
		    	 }
	    	   } else if  ($scope.inputUserType == 'captain') {
	    		   $scope.inputUserType = "";
			    	 if (userData.userCheckBox) {
			    		 $scope.x["captainCode"] = userData.userCode;
				    	 $scope.x["captain"] = userData.userName;
				    	 $scope.x["captainTel"] = userData.userTel;
				    	 $scope.x["captainEmail"] = userData.userEmail;
				    	 $scope.x["captainStateCode"] = userData.userStateCode;
				    	 $scope.x["captainStateFrom"] = userData.userStateFrom;
				    	 $scope.x["captainStateTo"] = userData.userStateTo;
			    	 }
	    	   } else if  ($scope.inputUserType == 'rep') {
	    		   $scope.inputUserType = "";
			    	 if (userData.userCheckBox) {
			    		 $scope.z["userCode"] = userData.userCode;
				    	 $scope.z["userName"] = userData.userName;
				    	 $scope.z["userTel"] = userData.userTel;
				    	 $scope.z["userEmail"] = userData.userEmail;
				    	 $scope.z["userStateCode"] = userData.userStateCode;
				    	 $scope.z["userStateFrom"] = userData.userStateFrom;
				    	 $scope.z["userStateTo"] = userData.userStateTo;
			    	 }
	    	   } else if  ($scope.inputUserType == 'unitPartner') {
	    		   $scope.inputUserType = "";
			    	 if (userData.userCheckBox) {
			    		 for (var i in selectedUserList) {
				    		   var userData = selectedUserList[i];
//			    		 $scope.x["captainCode"] = userData.userCode;
				    	 $scope.x["unitPartner"] = ($scope.x["unitPartner"] ? $scope.x["unitPartner"] : "") + userData.userName  + "; ";
//				    	 $scope.x["captainTel"] = userData.userTel;
//				    	 $scope.x["captainEmail"] = userData.userEmail;
//				    	 $scope.x["captainStateCode"] = userData.userStateCode;
//				    	 $scope.x["captainStateFrom"] = userData.userStateFrom;
//				    	 $scope.x["captainStateTo"] = userData.userStateTo;
				    	 selectedUserList[i].typeCode = 'M';
				    	 selectedUserList[i].unitCode = $scope.x.unitCode;
				    	 $scope.checkUserList.push(selectedUserList[i]);
			    	   }

			    	 }
	    	   }
	    	   
	    	   if ($scope.inputUserType != 'unitPartner') {
		    	   for (var i in selectedUserList) {
		    		   selectedUserList[i].userCheckBox = false;
		    	   }
	    	   }
//			  		$scope.data = data;
//			  		data = {
//			  				idUnit: getIdUnit,
//			  				psitnCode : data.psitnCode,
//			 				unitName : data.unitName,
//			 				fromDate : fromDate,
//			 				toDate : toDate,
		//
//			 				fromDate : fromDate,
//			 				toDate : toDate,
		//
//			 				showYn : data.showYn,
		//
//			 				leader : data.leader,
//							leaderTel : data.leaderTel,
//							leaderEmail : data.leaderEmail,
//							leaderStateCode : data.leaderStateCode,
		//
//							captain : data.captain,
//							captainTel : data.captainTel,
//							captainEmail : data.captainEmail,
//							captainStateCode : data.captainStateCode,
		//
		//
//							leaderCode : "123123",
//							captainCode : "123123",
//			 		}		    	 
		    	 
		     }

//			    $scope.leaderUserPopUp = function(term) {
//			    		$scope.userPopUp(term);
//			    }		     
		     
		     
// 담당자 리스트 (end)-------------------------------------------------------------------


/* 20160307 담당자 관련 추가 ----------------------------------------------------------------------------------*/
			    $scope.selectUnitPartnerUserList = function(data) {
			    	url = getContextPath()+'/admin/selectUnitpartneruserList.json';
			    	data =
			    	{
			    		  }
			    	data.unitCode = $scope.x.unitCode;
			    	$scope.doPostProcessForm(url, data);
			    }
			    $scope.insertUnitPartner = function(data, idUnit) {
			    	var vResultCheckUserList = $scope.resultCheckUser; 
			    	for(var i in vResultCheckUserList) {
			    		$scope.deleteUnitPartner (vResultCheckUserList[i]);
			    	}
			    	url = getContextPath()+'/admin/insertunitpartner.json';
					console.log(idUnit);
    		    	console.log('insertUnitPartner-------');
    		    	console.log(data);
			    	console.log('-------------');
			    	for(var i in data) {
			    		data[i].unitCode = idUnit;
		     			$scope.doPostProcessForm(url, data[i]);
					};
//			    	data =
//			    	{
//							unitCode : "1",
//							userCode: "12333334",
//							typeCode: "L" // L:리더, C:캡틴, M:담당자
//			    		  }
//			    	$scope.doPostProcessForm(url, data);
			    }
			    $scope.updateUnitPartner = function(data) {
			    	url = getContextPath()+'/admin/updateunitpartner.json';
//			    	data =
//			    	{
//			    			idUnitPartner : "2",	
//							unitCode : "1",
//							userCode: "12333334",
//							typeCode: "L" // L:리더, C:캡틴, M:담당자
//			    		  }
			    	$scope.doPostProcessForm(url, data);
			    }
			    $scope.deleteUnitPartner = function(data) {
			    	url = getContextPath()+'/admin/deleteunitpartner.json';
//			    	data =
//			    	{
//			    			idUnitPartner : "2"	
//			    		  }
			    	$scope.doPostProcessForm(url, data);
			    }
			    $scope.insertTaskPartner = function(data) {
			    	url = getContextPath()+'/admin/inserttaskpartner.json';
			    	console.log(data);
//			    	data =
//			    	{
//							unitCode : "1",
//							taskCode : "1",
//							userCode: "12333334",
//							repYn: "N"
//			    		  }
			    	$scope.doPostProcessForm(url, data);
			    }
			    $scope.updateTaskPartner = function(data) {
			    	url = getContextPath()+'/admin/updatetaskpartner.json';
//			    	data =
//			    	{
//			    			idTaskPartner : "3",	
//							unitCode : "1",
//							taskCode : "1",
//							userCode: "12333334",
//							repYn: "N" 
//			    		  }
			    	$scope.doPostProcessForm(url, data);
			    }
			    $scope.deleteTaskPartner = function(data) {
			    	url = getContextPath()+'/admin/deletetaskpartner.json';
//			    	data =
//			    	{
//			    			idTaskPartner : "2"
//			    		  }
			    	$scope.doPostProcessForm(url, data);
			    }

		     
/* //20160307 ----------------------------------------------------------------------------------*/		     

			    /* 20160311 ----------------------------------------------------------------------------------*/					    
			 	$scope.logingUserDoPostProcessForm = function(url, data) {
			 		vData = !data?{"signalCode": "all"} : data;
			 		console.log(vData);
			 	  $http({
			 	  method  : 'POST',
			 	  url     : url,
			 	  data    : vData,//$.param($scope.formData),  // pass in data as strings
					 headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
					 transformRequest: function(obj) {
					 		var str = [];
					 		for(var p in obj)
					 		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					 		return str.join("&");
					 }
			 	 })
			 	  .success(function(data) {
			 		 console.log("logingUserDoPostProcessForm");
			 		  console.log(data);
			 	    $scope.loginUserDetails = data.sampleVO;

			 	    if (!data.success) {
			 	    } else {
			 	    }

			 	  });
			 	};
			 	
			    $scope.selectUser = function(data) {
			    	url = getContextPath()+'/admin/selectuser.json';
//			    	data =
//			    	{
//							name:"asdf",
//							useYn:"Y",
//							description:"asdf",
//							regUser:"asdfasdf",
//							searchCondition:1,
//							searchKeyword:"",
//							pageIndex:1
//							,
//									idUser : 9
//									/*
//									userCode : "9999999",
//									userName : "eddy",
//									userEmail : "comeddy@naver.com",
//									userTel : "010-34356-1413",
//									userStateCode : "state2",
//									userStateFrom : "20160224",
//									userStateTo : "20160225",
//									userStateTime : "AM"
//									*/
//			    		  }
//			    	$scope.doPostProcessForm(url, data);
			    	$scope.logingUserDoPostProcessForm(url, data);
			    }
			    
				var vUserCode = {userCode : "loginUserDetails"};
				$scope.selectUser(vUserCode);			 	
				/* //20160311 ----------------------------------------------------------------------------------*/		

});
			    $scope.taskReg = function(idTask){
//			    	$('.layer-task').attr('ng-repeat', 'y in x.taskList |  filter:{idTask : addTaskId}');

//			    	$scope.addTaskId = idTask;
//			    	if(idTask != null)
			        var obj = {idTask : idTask };
			        $scope.x.filterTaskList = filterFilter($scope.x.taskList, obj, true);
			        console.log($scope.x.filterTaskList);
//			        switch ($scope.x.filterTaskList[0].signalCode) {
//			        case 'B' :
//			            $('#sig1').iCheck('check');
//			        break;
//			        case 'Y' :
//			            $('#sig3').iCheck('check');
//			        break;
//			        }
//			    	else
//			    		$scope.addTaskId = null;
			        var filterTaskCode = $scope.x.filterTaskList[0].taskCode;
			        $scope.taskPatnerList = filterFilter($scope.x.filterTaskList[0].userList, {taskCode : filterTaskCode}, true);
			        $scope.z = filterFilter($scope.taskPatnerList, {repYn : 'Y'}, true)[0];
			        $scope.z = !$scope.z ? {} : $scope.z; 
			        $scope.resultTaskPartnerList = filterFilter($scope.taskPatnerList, {repYn : 'N'}, true);
			        $scope.taskPatnerList = filterFilter($scope.taskPatnerList, {repYn : 'N'}, true);
			        console.log($scope.taskPatnerList);
			    };


			    $scope.newTaskInsert = function(){
			    	$scope.y = {};
			    	$scope.z = {};
			    	$scope.taskPatnerList = [{}]
			    	
			    	$('#addTaskLayer').show();
			    	var wh = window.innerHeight-200;
			        var wh1 = window.innerHeight;	
			        $( window ).resize(function(){
			        	wh = window.innerHeight-200;
			        	wh1 = window.innerHeight;	
			        });
			    	if (wh1 < 840) {
			    		$('#addTaskLayer > .box-layer-body').height(wh);
			    	}	
			    	else{
			    		$('#addTaskLayer > .box-layer-body').height('auto');
			    	}	
			    	loadPopup();
			    };

			    $scope.signalClick = function(signal){
			    	if(signal == 'Y' || signal == 'R'){
			    		 $(".txta-issue").attr("disabled",false).attr("readonly",false); //입력가능
			    	} else {
			    		 $(".txta-issue").val('').attr("readonly",true).attr("disabled",true); //입력불가
			    	}
			    }

			    $scope.unitLeaderState = function(code){
			    	console.log(code);
			    	if(code == 'state2' || code == 'state3'){
			    		$(".leaderStateTime").attr("disabled",false).attr("readonly",false); //입력가능
			    		$(".leaderStateDate").val('').attr("readonly",true).attr("disabled",true); //입력불가
			    	} else if(code == 'state4' || code == 'state5') {
			    		$(".leaderStateTime").attr("checked", false).attr("readonly",false).attr("disabled",true); //입력불가
			    		$(".leaderStateDate").attr("disabled",false).attr("readonly",false); //입력가능
			    	} else{
			    		$(".leaderStateTime").attr("checked", false).attr("readonly",false).attr("disabled",true); //입력불가
			    		$(".leaderStateDate").val('').attr("readonly",true).attr("disabled",true); //입력불가
			    	}	
			    }

			    $scope.unitCaptainState = function(code){
			    	if(code == 'state2' || code == 'state3'){
			    		$(".captainStateTime").attr("disabled",false).attr("readonly",false); //입력가능
			    		$(".captainStateDate").val('').attr("readonly",true).attr("disabled",true); //입력불가
			    	} else if(code == 'state4' || code == 'state5') {
			    		console.log($(".leaderStateTime").checked);
			    		$(".captainStateTime").attr("checked", false).attr("readonly",false).attr("disabled",true); //입력불가
			    		$(".captainStateDate").attr("disabled",false).attr("readonly",false); //입력가능
			    	} else{
			    		$(".captainStateTime").attr("checked", false).attr("readonly",false).attr("disabled",true); //입력불가
			    		$(".captainStateDate").val('').attr("readonly",true).attr("disabled",true); //입력불가
			    	}	
			    }

			    $scope.taskUserState = function(code){
			    	if(code == 'state2' || code == 'state3'){
			    		$(".userStateTime").attr("disabled",false).attr("readonly",false); //입력가능
			    		$(".userStateDate").val('').attr("readonly",true).attr("disabled",true); //입력불가
			    	} else if(code == 'state4' || code == 'state5') {
			    		$(".userStateTime").attr("checked", false).attr("readonly",false).attr("disabled",true); //입력불가
			    		$(".userStateDate").attr("disabled",false).attr("readonly",false); //입력가능
			    	} else{
			    		$(".userStateTime").attr("checked", false).attr("readonly",false).attr("disabled",true); //입력불가
			    		$(".userStateDate").val('').attr("readonly",true).attr("disabled",true); //입력불가
			    	}	
			    }

			    $scope.dateValidation = function(fromDate, toDate){
			    	var pattern = /(\d{4})(\d{2})(\d{2})/;
			    	var  fromDate = new Date(fromDate.replace(pattern, '$1,$2,$3'));
			    	var  toDate = new Date(toDate.replace(pattern, '$1,$2,$3'));
			    	
			    	var startDt = fromDate;
			    	var endDt	= toDate;
			    	
			    	resultDt	= Math.floor(endDt.valueOf()/(24*60*60*1000)- startDt.valueOf()/(24*60*60*1000));
			    	if(resultDt < 0 ){ 
			    		alert("과거 날짜를 먼저 입력해주세요");
			    		return false;
			    	}
			    	return true;
			    }


			    //$scope.taskPatnerList = [ { "idUnitPartner": 947, "unitCode": "909", "userCode": "1082074", "typeCode": "M", "userName": "최캡틴", "userEmail": "captain@1hanwha.com", "userTel": "010-4444-2222", "userStateCode": "state5", "userStateFrom": "20160203", "userStateTo": "20160204", "userStateTime": "undefined" }, { "idUnitPartner": 948, "unitCode": "909", "userCode": "1072065", "typeCode": "M", "userName": "박리더", "userEmail": "Email@hanwha.com", "userTel": "010-1110-0220", "userStateCode": "state4", "userStateFrom": "20160201", "userStateTo": "20160206", "userStateTime": "undefined" }, { "idUnitPartner": 949, "unitCode": "909", "userCode": "1092083", "typeCode": "M", "userName": "최한화", "userEmail": "Email1@hanwha.com", "userTel": "010-1110-0220", "userStateCode": "state4", "userStateFrom": "20160201", "userStateTo": "20160206" } ];
			    $scope.removeTaskPatnerList = function(index) {
			        $scope.taskPatnerList.splice(index, 1);
			      };

			    $scope.addTaskPatnerList = function() {
			    	console.log($scope.taskPatnerList.length);
			    	console.log($scope.checkUserList.length);
			    	if($scope.taskPatnerList.length >= $scope.checkUserList.length){
			    		alert('담당자 초과');
			    		return false;
			    	}
			    	else
			    		$scope.taskPatnerList.push({});
			    };

			    $scope.selectChange = function(index) {
			    	console.log(this.tpl.userCode);
			    	console.log(index);
			    	for(var i in $scope.taskPatnerList){
			    		if(index != i && $scope.taskPatnerList[i].userCode == this.tpl.userCode){
			    			this.tpl = {};
			    			alert('담당자 중복');
			    			return;
			    		}
			    	}
			    	$scope.taskPatnerList[index] = this.tpl;

			    };


			    $scope.optionChanged = function(){
			        console.debug(this.s.selectedOption);
			    }

			    $scope.insertTM = function(data) {
			    	data.repYn = 'Y';
			    	data.unitCode = $scope.x.unitCode;
			    	data.taskCode = $scope.y.taskCode;
			    	$scope.insertTaskPartner(data);

			    	var obj = {userCode : data.userCode };
			    	userDataList = filterFilter($scope.user, obj, true);
			    	userData = userDataList[0];
			    	userData.userStateCode = data.userStateCode;
			    	userData.userStateFrom =(!(data.userStateCode == 'state4'||data.userStateCode == 'state5')) ? "" : document.getElementById("repUserStateFrom").value.toString().split("-").join("");
			    	userData.userStateTo = (!(data.userStateCode == 'state4'||data.userStateCode == 'state5')) ? "" : document.getElementById("repUserStateTo").value.toString().split("-").join("");
			    	userData.userStateTime = data.userStateTime		
			    	$scope.updateUser(userData);
			    };

			    $scope.updateTM = function(data) {
			    	if(!data) {
			    		alert("담당자 대표 정보를 입력 바랍니다.");
			    		return;
			    	}
			    	if(!data.idTaskPartner) {
			    		$scope.insertTM(data);
			    		return;
			    	}
			    	data.repYn = 'Y';
			    	data.unitCode = $scope.x.unitCode;
			    	data.taskCode = $scope.y.taskCode;
			    	$scope.updateTaskPartner(data);

			    	var obj = {userCode : data.userCode };
			    	userDataList = filterFilter($scope.user, obj, true);
			    	userData = userDataList[0];
			    	userData.userStateCode = data.userStateCode;
			    	userData.userStateFrom = (!(data.userStateCode == 'state4'||data.userStateCode == 'state5')) ? "" : document.getElementById("repUserStateFrom").value.toString().split("-").join("");
			    	userData.userStateTo = (!(data.userStateCode == 'state4'||data.userStateCode == 'state5')) ? "" : document.getElementById("repUserStateTo").value.toString().split("-").join("");
			    	userData.userStateTime = data.userStateTime		
			    	$scope.updateUser(userData);
			    };			    
			    
			    $scope.insertM = function(data) {
			    	var resultTaskPartnerList = $scope.resultTaskPartnerList; 
			    	for(var i in resultTaskPartnerList) {
			    		$scope.deleteTaskPartner (resultTaskPartnerList[i]);
			    	}
			    	
//			    	data.repYn = 'N';
//			    	data.unitCode = $scope.x.unitCode;
//			    	data.taskCode = $scope.y.taskCode;			    	
			    	for(var i in data) {
			    		data[i].repYn = 'N';
			    		data[i].unitCode = $scope.x.unitCode;
			    		data[i].taskCode = $scope.y.taskCode;
			    		$scope.insertTaskPartner(data[i]);
			    	};
			    };




			    /*----------- userListPaginationDemoCtrl -----------------------------------*/

			    //$scope.data = [{"name":"Bell","id":"K0H 2V5"},{"name":"Octavius","id":"X1E 6J0"},{"name":"Alexis","id":"N6E 1L6"},{"name":"Colton","id":"U4O 1H4"},{"name":"Abdul","id":"O9Z 2Q8"},{"name":"Ian","id":"Q7W 8M4"},{"name":"Eden","id":"H8X 5E0"},{"name":"Britanney","id":"I1Q 1O1"},{"name":"Ulric","id":"K5J 1T0"},{"name":"Geraldine","id":"O9K 2M3"},{"name":"Hamilton","id":"S1D 3O0"},{"name":"Melissa","id":"H9L 1B7"},{"name":"Remedios","id":"Z3C 8P4"},{"name":"Ignacia","id":"K3B 1Q4"},{"name":"Jaime","id":"V6O 7C9"},{"name":"Savannah","id":"L8B 8T1"},{"name":"Declan","id":"D5Q 3I9"},{"name":"Skyler","id":"I0O 4O8"},{"name":"Lawrence","id":"V4K 0L2"},{"name":"Yael","id":"R5E 9D9"},{"name":"Herrod","id":"V5W 6L3"},{"name":"Lydia","id":"G0E 2K3"},{"name":"Tobias","id":"N9P 2V5"},{"name":"Wing","id":"T5M 0E2"},{"name":"Callum","id":"L9P 3W5"},{"name":"Tiger","id":"R9A 4E4"},{"name":"Summer","id":"R4B 4Q4"},{"name":"Beverly","id":"M5E 4V4"},{"name":"Xena","id":"I8G 6O1"},{"name":"Yael","id":"L1K 5C3"},{"name":"Stacey","id":"A4G 1S4"},{"name":"Marsden","id":"T1J 5J3"},{"name":"Uriah","id":"S9S 8I7"},{"name":"Kamal","id":"Y8Z 6X0"},{"name":"MacKensie","id":"W2N 7P9"},{"name":"Amelia","id":"X7A 0U3"},{"name":"Xavier","id":"B8I 6C9"},{"name":"Whitney","id":"H4M 9U2"},{"name":"Linus","id":"E2W 7U1"},{"name":"Aileen","id":"C0C 3N2"},{"name":"Keegan","id":"V1O 6X2"},{"name":"Leonard","id":"O0L 4M4"},{"name":"Honorato","id":"F4M 8M6"},{"name":"Zephr","id":"I2E 1T9"},{"name":"Karen","id":"H8W 4I7"},{"name":"Orlando","id":"L8R 0U4"},{"name":"India","id":"N8M 8F4"},{"name":"Luke","id":"Q4Y 2Y8"},{"name":"Sophia","id":"O7F 3F9"},{"name":"Faith","id":"B8P 1U5"},{"name":"Dara","id":"J4A 0P3"},{"name":"Caryn","id":"D5M 8Y8"},{"name":"Colton","id":"A4Q 2U1"},{"name":"Kelly","id":"J2E 2L3"},{"name":"Victor","id":"H1V 8Y5"},{"name":"Clementine","id":"Q9R 4G8"},{"name":"Dale","id":"Q1S 3I0"},{"name":"Xavier","id":"Z0N 0L5"},{"name":"Quynn","id":"D1V 7B8"},{"name":"Christine","id":"A2X 0Z8"},{"name":"Matthew","id":"L1H 2I4"},{"name":"Simon","id":"L2Q 7V7"},{"name":"Evan","id":"Z8Y 6G8"},{"name":"Zachary","id":"F4K 8V9"},{"name":"Deborah","id":"I0D 4J6"},{"name":"Carl","id":"X7H 3J3"},{"name":"Colin","id":"C8P 0O1"},{"name":"Xenos","id":"K3S 1H5"},{"name":"Sonia","id":"W9C 0N3"},{"name":"Arsenio","id":"B0M 2G6"},{"name":"Angela","id":"N9X 5O7"},{"name":"Cassidy","id":"T8T 0Q5"},{"name":"Sebastian","id":"Y6O 0A5"},{"name":"Bernard","id":"P2K 0Z5"},{"name":"Kerry","id":"T6S 4T7"},{"name":"Uriel","id":"K6G 5V2"},{"name":"Wanda","id":"S9G 2E5"},{"name":"Drake","id":"G3G 8Y2"},{"name":"Mia","id":"E4F 4V8"},{"name":"George","id":"K7Y 4L4"},{"name":"Blair","id":"Z8E 0F0"},{"name":"Phelan","id":"C5Z 0C7"},{"name":"Margaret","id":"W6F 6Y5"},{"name":"Xaviera","id":"T5O 7N5"},{"name":"Willow","id":"W6K 3V0"},{"name":"Alden","id":"S2M 8C1"},{"name":"May","id":"L5B 2H3"},{"name":"Amaya","id":"Q3B 7P8"},{"name":"Julian","id":"W6T 7I6"},{"name":"Colby","id":"N3Q 9Z2"},{"name":"Cole","id":"B5G 0V7"},{"name":"Lana","id":"O3I 2W9"},{"name":"Dieter","id":"J4A 9Y6"},{"name":"Rowan","id":"I7E 9U4"},{"name":"Abraham","id":"S7V 0W9"},{"name":"Eleanor","id":"K7K 9P4"},{"name":"Martina","id":"V0Z 5Q7"},{"name":"Kelsie","id":"R7N 7P2"},{"name":"Hedy","id":"B7E 7F2"},{"name":"Hakeem","id":"S5P 3P6"}];
			    $scope.userListViewby = 7;
			    //$scope.totalItems = $scope.data.length;
			    //$scope.totalItems = 10;
			    $scope.userListCurrentPage = 1;
			    $scope.userListItemsPerPage = $scope.userListViewby;
			    $scope.userListMaxSize = 5; //Number of pager buttons to show

			    $scope.userListSetPage = function (pageNo) {
			      $scope.userListCurrentPage = pageNo;
			    };

			    $scope.userListPageChanged = function() {
			      console.log('Page changed to: ' + $scope.userListCurrentPage);
			    };

			    $scope.userListSetItemsPerPage = function(num) {
			    $scope.userListItemsPerPage = num;
			    $scope.userListCurrentPage = 1; //reset to first paghe
			    };
			    /*----------- userListPaginationDemoCtrl -----------------------------------*/




});
/*---------------------ng (end)----------------------------------------------------*/
