app.controller('dataCtrl', function($scope, $http, $location, filterFilter, searchUserListQeury, regDateFormatFilter, resultDateFormatFilter, $filter, $q, $timeout, ngJsonExportExcel) {
/*   function definition --------------------------------------------------------------------------*/
	

	/*   미사용  --------------------------------------------------------------------------*/
	
		/* 펼치기 접기 (단건, 다건) ------------------------------------------------*/
//    $scope.isUnFold = [];
//    $scope.toggleFolding = function(index) {
//        $scope.isUnFold[index] = $scope.isUnFold[index] === true ? false: true;
//    };
//    
//    $scope.allUnFolding = function() {
//    	for (var i = 0 ; i < $scope.filterList.length ; i++) {
//    		$scope.isUnFold[i] = true;		
//    	}
//    }
//    $scope.allFolding = function() {
//      	for (var i = 0 ; i < $scope.filterList.length ; i++) {
//      		$scope.isUnFold[i] = false;		
//      	}
//    } 
		/* // 펼치기 접기 (단건, 다건) ------------------------------------------------*/
	
//	$scope.doShowY = function() {
//		$scope.filterList = filterFilter($scope.filterList, {showYn : "Y", taskList:{$:"!''"}});
//		return true;
//	}
	
	
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
	
	
	/*   //미사용 --------------------------------------------------------------------------*/


	/*   미사용 (추정, 검토해 봐야 함) --------------------------------------------------------------------------*/
    $scope.searchKeyword = function () {
    	$scope.mainViewSearch();
    };
	/*   //미사용 (추정, 검토해 봐야 함) --------------------------------------------------------------------------*/
	
	
/*   //function definition --------------------------------------------------------------------------*/
	
	$scope.newUser = [{}];
    $scope.remove = function(index) {
        $scope.newUser.splice(index, 1);
      };
	$scope.add = function() {
		$scope.newUser.push({});
	};
	
	$scope.redirect = function(idUnit){
		  window.location = getContextPath()+'/admin/unitRegister.do?idUnit='+idUnit;
	}

	$scope.goDetail = function(idUnit) {
    	alert(idUnit);
      $location.url(/register/+idUnit);
//$location 서비스의 URL 서비스의 url 메소드를 이용하여 사용자 아이디에 해당하는 ‘user/사용자아이디’ URL로 이동한다.
    };

//	$scope.processForm();
//     $http.get("${pageContext.request.contextPath}/web/selectAllUnitTaskList.json")
//     .then(function (response) {$scope.result = response.data.resultList;});
    $scope.orderByMe = function(x) {
        $scope.myOrderBy = x;
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
    	$scope.searchCalledOk = 'Y';
    	$scope.currentPage = 1;
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
  		/* ng search -----------------------------------------------------------------------------*/
  		searchKeyword = '';  // 키워드로 sql 에서 검색해 오지 않고 전체를 무조건 가져 옴 
  		/*//ng search -----------------------------------------------------------------------------*/
  		$http({
 	        method: 'POST',
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
 	    	data.resultList = $filter('orderBy')(data.resultList, '-unitMaxTaskFromDate');
 	 		if ($location.absUrl().indexOf("/admin") != -1) {
 	 			$scope.result = data.resultList;
 	 		} else {
 	 			$scope.result = filterFilter(data.resultList, {showYn : "Y", taskList:{$:"!''"}});
 	 		}
 	    	
    	/* ng search -----------------------------------------------------------------------------*/
 	 		
			/* signal Search -------------------------------------------------------------------------*/
			$scope.filterList = filterFilter($scope.result
 	    									,{
 	    										psitnCode : (!$scope.category || $scope.category== 'all' ? "!''" : $scope.category)
											  , signalCode : (!$scope.dashboardSearch.signalCode || $scope.dashboardSearch.signalCode== 'all' || $scope.dashboardSearch.signalCode.toUpperCase() == 'B'? "!''" : $scope.dashboardSearch.signalCode.toUpperCase())
											 });
 	    	if(!$scope.dashboardSearch.signalCode ? false : $scope.dashboardSearch.signalCode.toUpperCase() == 'B') {
 	    		$scope.filterList = filterFilter($scope.filterList, {alramCode : $scope.dashboardSearch.signalCode.toUpperCase()});
    		}
 	    	/*//signal Search -------------------------------------------------------------------------*/
 	 		
 			/* query Search -------------------------------------------------------------------------*/
 	 		$scope.filterList = $scope.querySearch($scope.filterList, $scope.query);
// 	    	var term = $scope.query;
// 	        var obj = [];
// 			switch ($('#searchCondition').val()) {
//	 			case 'all':     obj =  term != '101' ? {psitnCode : $scope.category, $ : term} : {psitnCode : $scope.category, unitName : term};
//	 			break;
//	 			case 'unit':    obj = {psitnCode : $scope.category, unitName : term};
//	 			break;
//	 			case 'task':    obj = {psitnCode : $scope.category, taskList : {taskName : term}};
//	 			break;
//	 			case 'leader':  obj = {psitnCode : $scope.category, leader : term};
//	 			break;
//	 			case 'captain':	obj = {psitnCode : $scope.category, captain : term};
//	 			break;
// 			}
//			$scope.searchedResult = filterFilter($scope.result, obj);
			/*//query Search -------------------------------------------------------------------------*/

		/*//ng search -----------------------------------------------------------------------------*/ 	    	
 	    	// ------- mobileFilter ---------------------------------------------------------------
 	    	$scope.scrollFilterList = angular.copy($scope.filterList); 
 	    		
// 	    	$scope.scrollFilterList = filterFilter($scope.searchedResult,{ taskList:{$:"!''"}, showYn : "Y"
//															 , psitnCode : (!$scope.category || $scope.category== 'all' ? "!''" : $scope.category)
//																 , signalCode : (!$scope.dashboardSearch.signalCode || $scope.dashboardSearch.signalCode== 'all' || $scope.dashboardSearch.signalCode.toUpperCase() == 'B'? "!''" : $scope.dashboardSearch.signalCode.toUpperCase())
//																 });
// 	    	if(!$scope.dashboardSearch.signalCode ? false : $scope.dashboardSearch.signalCode.toUpperCase() == 'B') {
// 	    		$scope.scrollFilterList = filterFilter($scope.scrollFilterList, {alramCode : $scope.dashboardSearch.signalCode.toUpperCase()});
//    		}
 	    	// ------- //mobileFilter ---------------------------------------------------------------
 	    	
 		    // ------- infinite-scroll---------------------------------------------------------------
 	    	var viewby = 4;
// 	    	$scope.scrollFilterList = filterFilter($scope.scrollFilterList, {showYn : "Y"});
 		    $scope.mobileFilterList = $scope.scrollFilterList.slice(0, viewby);
 		    $scope.isScrollLast = false;
 		    $scope.lastScrollView = false;
 		    if($scope.mobileFilterList.length < 3)
 	 		    $scope.lastScrollView = true;
 		    $scope.getMoreData = function () {
// 		    	$scope.mobileFilterList = $scope.scrollFilterList.slice(0, $scope.mobileFilterList.length + viewby);
 		    	if($scope.isScrollLast) {
 		    		alert('마지막 리스트입니다.');
 		    		$scope.isScrollLast = false;
 		    	}
 		    	if(!$scope.lastScrollView){
 		    		$scope.mobileFilterList = $scope.scrollFilterList.slice(0, $scope.mobileFilterList.length + viewby);
 	 				 if($scope.mobileFilterList.length == $scope.scrollFilterList.length){
 	 					$scope.isScrollLast = true;
 	 					$scope.lastScrollView = true;
 	 				 }	
 		    	}
//// 		    	if($scope.mobileFilterList.length == $scope.scrollFilterList.length){
//	 					$scope.lastScrollView = true;
//	 			}
 				 
 			     	
 		    }
 		    // ------- //infinite-scroll---------------------------------------------------------------
 	    });
  	}


    $scope.adminSearch = function() {
    	var psitnCodes = document.getElementsByName("psitnCode");
    	var signalCodes = document.getElementsByName("signalCode");
    	var showYns = document.getElementsByName("showYn");

  		var fromDate = document.getElementById("fromDate").value.toString().split("-").join("");
  		var toDate = document.getElementById("toDate").value.toString().split("-").join("");
  		var searchCondition = document.getElementById("searchCondition").value;
  		var searchKeyword = document.getElementById("searchKeyword").value;

  		var arySrtDt = document.getElementById("fromDate").value.split("-"); // ex) 시작일자(2007-10-09)
        var aryEndDt = document.getElementById("toDate").value.split("-"); // ex) 종료일자(2007-12-05)

  		var startDt = new Date(Number(arySrtDt[0]),Number(arySrtDt[1])-1,Number(arySrtDt[2]));
        var endDt	= new Date(Number(aryEndDt[0]),Number(aryEndDt[1])-1,Number(aryEndDt[2]));
        resultDt	= Math.floor(endDt.valueOf()/(24*60*60*1000)- startDt.valueOf()/(24*60*60*1000));

        if(resultDt < 0 ){ alert("과거 날짜를 먼저 입력해주세요"); return false; }

  		var signalCode;
		for (var i = 0; i < signalCodes.length; i++) {
  		    if (signalCodes[i].checked) signalCode = signalCodes[i].value;
  		}
		if (signalCode == 'on') signalCode = 'all';
		$scope.dashboardSearch = { signalCode : signalCode };
  		
		var psitnCode;
		for (var i = 0; i < psitnCodes.length; i++) {
  		    if (psitnCodes[i].checked) psitnCode = psitnCodes[i].value;
  		}
		if (psitnCode == 'on') psitnCode = '';  
  		$scope.category = psitnCode;
  		
  		var showYn;
		for (var i = 0; i < showYns.length; i++) {
  		    if (showYns[i].checked) showYn = showYns[i].value;
  		}
		if (showYn == 'on') showYn = 'all';  
  		$scope.showYn = showYn;
  		
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
 	    	data.resultList = $filter('orderBy')(data.resultList, '-unitMaxTaskFromDate');
 	    	$scope.result = data.resultList;
// 	    	$scope.filterList = $scope.result;
 	    	$scope.filterList = filterFilter(data.resultList,{ psitnCode : (!$scope.category || $scope.category== 'all' ? "!''" : $scope.category)
			 , signalCode : (!$scope.dashboardSearch.signalCode || $scope.dashboardSearch.signalCode== 'all' || $scope.dashboardSearch.signalCode.toUpperCase() == 'B'? "!''" : $scope.dashboardSearch.signalCode.toUpperCase())
			 , showYn : (!$scope.showYn || $scope.showYn== 'all' ? "!''" : $scope.showYn == 'Y' ? 'Y' : 'N') 
 	    	});
 	    	$scope.filterList = $scope.querySearch($scope.filterList, $scope.query);
			//if($scope.dashboardSearch.signalCode.toUpperCase() == 'B') {
//			if(!$scope.dashboardSearch.signalCode ? false : $scope.dashboardSearch.signalCode.toUpperCase() == 'B') {
//				$scope.filterList = filterFilter($scope.filterList, {alramCode : $scope.dashboardSearch.signalCode.toUpperCase()});
//			}
 	    	if(document.getElementById("noti").checked == true){
 				var alramCode = 'B';
 				$scope.filterList = filterFilter($scope.filterList, {alramCode : alramCode});
 			}
 	    	
 	    });
  	}

    if(typeof week == 'function') {
	    week();
 		if ($location.absUrl().indexOf("/admin") != -1) {
 			$scope.adminSearch();
 		} else {
 			$scope.mainViewSearch();
 		}
	    $scope.searchCalledOk = 'N';
    }
    
//	    $scope.filter0 = function(product){
//	        return product.psitnCode == '1' || product.psitnCode == '3';
//	    };

	$scope.tab = function (tabIndex) {
		$scope.tabIndex = tabIndex;
		if ($('#type1').iCheck){
			$('#type1').iCheck('check');
		}
		
		if ($('#rad1').iCheck){
			$('#rad1').iCheck('check');
		}
		
		$scope.query = "";
	     if (tabIndex == 0){
		      	 $scope.category= "!''";
//		      	 $scope.processForm();
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
	     var obj = {psitnCode : $scope.category}
         
	     $scope.filterList = filterFilter($scope.result, obj);
         $scope.currentPage = 1;
	         
	     $scope.scrollFilterList = angular.copy($scope.filterList);
	     var viewby = 4;
	     
		 $scope.mobileFilterList = $scope.scrollFilterList.slice(0, viewby);
		 $scope.isScrollLast = false;
		 $scope.lastScrollView = false;
		 if($scope.mobileFilterList.length < 3)
 		    $scope.lastScrollView = true;
		 $scope.searchCalledOk = 'N';
//		 $scope.allFolding();
	        /*-------------------- 모두 닫기 ----------------------- */
	        $('.btn-up').removeClass("btn-down");
	        $('.btn-up').parent().parent().next().hide();
	        
	        /* 모바일 닫기 */
	        $('.ico-down').removeClass("ico-up");
	        $('.ico-down').parent().parent().parent().find('.box-menu-sub1').find('.box-list-sub').hide();
	        /*-------------------- 모두 닫기 ----------------------- */
	};

	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
	    //you also get the actual event object
	    //do stuff, execute functions -- whatever...
//	    alert("ng-repeat finished");
//		tbodyRepeat();
		
	    if($scope.searchCalledOk == 'Y') { 
	        /*-------------------- 검색 후 펼치기 ----------------------- */
	        $('.btn-up').addClass("btn-down");
	        $('.btn-up').parent().parent().next().show();
	        
	        /* 모바일 펼치기 */
	        $('.ico-down').addClass("ico-up");
	        $('.ico-down').parent().parent().parent().find('.box-menu-sub1').find('.box-list-sub').show();
	        /*-------------------- 검색 후 펼치기 ----------------------- */
//	        $scope.searchCalledOk = 'N';
	    }
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

	    
    $scope.orOperationFilter = function(filter) {
        return function(item) {
        	if ($scope.category != "!''" && $scope.category && item.psitnCode != $scope.category) return false;
    	    if (!$scope.query
            		|| (item.unitName.toLowerCase().indexOf($scope.query) != -1)
            		|| (item.leader.toLowerCase().indexOf($scope.query.toLowerCase()) != -1)
            		|| (item.captain.toLowerCase().indexOf($scope.query.toLowerCase()) != -1)){
            return true;
        	}
    		for (i=0; i < item.taskList.length;i++) {
            	if (item.taskList[i].taskName.toLowerCase().indexOf($scope.query.toLowerCase()) != -1){
            		return true;
            	}
    		}
        };  
      };
      
    $scope.querySearch = function (sourceArray, term) {
    	if (typeof term == "undefined") return sourceArray;
        var obj = [];
		switch ($('#searchCondition').val()) {
		case 'all':     obj = $scope.orOperationFilter({unitName : term, taskList : {taskName : term}, leader : term, captain : term});
		break;
		case 'unit':    obj = {psitnCode : $scope.category, unitName : term};
		break;
		case 'task':    obj = {psitnCode : $scope.category, taskList : {taskName : term}};
		break;
		case 'leader':  obj = {psitnCode : $scope.category, leader : term};
		break;
		case 'captain':	obj = {psitnCode : $scope.category, captain : term};
		break;
		}
	     $scope.currentPage = 1;
	     if (term != "") $scope.searchCalledOk = 'Y';

	     return filterFilter(sourceArray, obj);
    };
	    
     $scope.$watch('query', function (term) {
    	 $scope.filterList = $scope.querySearch($scope.result, term);
     });


     
   $scope.adminRadioCheckBoxSearch = function (searchArray) {
	   var obj = { psitnCode  : searchArray.psitnCode
			     , alramCode  : searchArray.alramCode
			     , signalCode : searchArray.signalCode
	   			 , showYn     : searchArray.showYn
	   			 }
	   $scope.currentPage = 1;
	   return filterFilter($scope.result, obj);
   }

   $scope.$watch('search.psitnCode', function (term) {
	   term = term == 'all' ? $ : term;
	   var searchArray = angular.copy($scope.search);
	   searchArray.psitnCode = term;
	   $scope.filterList = $scope.adminRadioCheckBoxSearch(searchArray);
	});

   $scope.$watch('search.alramCode', function (term) {
	   term = term != 'B' ? $ : term;
	   var searchArray = angular.copy($scope.search);
	   searchArray.alramCode = term;
	   $scope.filterList = $scope.adminRadioCheckBoxSearch(searchArray);
	});
   
   $scope.$watch('search.signalCode', function (term) {
	   term = term == 'all' ? $ : term;
	   var searchArray = angular.copy($scope.search);
	   searchArray.signalCode = term;
	   $scope.filterList = $scope.adminRadioCheckBoxSearch(searchArray);
	});
   
   $scope.$watch('search.showYn', function (term) {
	   term = term == 'all' ? $ : term;
	   var searchArray = angular.copy($scope.search);
	   searchArray.showYn = term;
	   $scope.filterList = $scope.adminRadioCheckBoxSearch(searchArray);
	});

/*------------ insertUnitTest & updateUnitTest ------------------------------------------------------------------------------------------------*/
 	// process the form
 	$scope.doPostProcessForm = function(url, data) {
 		vData = !data?{"signalCode": "all"} : data;
 		console.log(vData);
 	  $http({
 	  method  : 'POST',
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

 	    if (!data.success) {
 	    } else {
 	    }

 	  });
 	};

	$scope.userListRefresh = function () {
		$http({
			  method: 'GET',
			  url: getContextPath()+'/admin/adminuserjson.json'
			}).then(function successCallback(response) {
				$scope.user = response.data.AdminUserList;
				for(var i in $scope.user.length) {
					$scope.user[i]["userCheckBox"] = "";
				}
				$scope.filterUserList = $scope.user;
			  }, function errorCallback(response) {
		});
	}
	
	$scope.userListRefresh();

 	$scope.logingUserDoPostProcessForm = function(url, data) {
 		vData = !data?{"signalCode": "all"} : data;
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
 	   $scope.loginUserDetails = data.sampleVO;
 	   $scope.unitWritingAuth = ($scope.loginUserDetails.unitAuthorities == 'POWERUSER' || $scope.loginUserDetails.unitAuthorities == 'LEADER' || $scope.loginUserDetails.unitAuthorities == 'CAPTAIN')
 	   							&& $scope.loginUserDetails.userCode != "uboard25@gmail.com"
 	   							? true : false;
 	    if (!data.success) {
 	    } else {
 	    }

 	  });
 	};
 	

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
    }
    
    $scope.insertUserList = function(newUser) {
     	url = getContextPath()+'/admin/insertuserlist.json';
     	var data = {};
			for(var i in newUser) {
		 		if(!newUser[i].userName ||!newUser[i].userCode|| !newUser[i].userEmail || !newUser[i].userTel) {
		 			alert("입력값에 문제가 있습니다.확인 바랍니다.");
		 			return;
		 		}
	        var obj = {userCode : newUser[i].userCode };
	        var UserData = filterFilter($scope.user, obj, true);
	        if (UserData.length){ 
	        	alert(newUser[i].userCode +" 계정은 이미 등록된 사용자입니다.");
	        	return;
	        }
				data["partnerList["+i +"].userName"]  = newUser[i].userName;
				data["partnerList["+i +"].userCode"]  = newUser[i].userCode;
				data["partnerList["+i +"].userEmail"] = newUser[i].userEmail;
				data["partnerList["+i +"].userTel"]   = newUser[i].userTel;
			}
     
 		var myPromise = $scope.doPostSyncProcessForm(url, data);
 		myPromise
 			.then(function(resolve) {
 				$scope.successAlert();
 				$scope.newUser = [{}];
 				$scope.userListRefresh();
 				$('.layer-member-add').hide();
 				$('.layer-member-modi').hide();
 				$('.layer-notice-time').hide();
 		    		disablePopup1();	
    	}, function(reject) {
    		alert(reject)
    	});		     
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
    	var myPromise = $scope.doPostSyncProcessForm(url, data);
 		myPromise
 			.then(function(resolve) {
 				$scope.successAlert();
// 				$scope.newUser = [{}];
 				$scope.userListRefresh();
 				$('.layer-member-add').hide();
 				$('.layer-member-modi').hide();
 				$('.layer-notice-time').hide();
 		    		disablePopup1();	
    	}, function(reject) {
    		alert(reject)
    	});
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
    	var myPromise = $scope.doPostSyncProcessForm(url, data);
 		myPromise
 			.then(function(resolve) {
 				$scope.successAlert();
// 				$scope.newUser = [{}];
 				$scope.userListRefresh();
 				$('.layer-member-add').hide();
 				$('.layer-member-modi').hide();
 				$('.layer-notice-time').hide();
 		    		disablePopup1();	
    	}, function(reject) {
    		alert(reject)
    	});
    }
    
    $scope.leaderCheck = function(data) {
    	if(data.unitAuthorities == 'LEADER_DELETE')
    		data.unitAuthorities = '';
    	$scope.updateUser(data);
    }

    $scope.getUserData = function(idUser) {
    	var obj = {idUser : idUser };
    	$scope.userData = filterFilter($scope.user, obj, true);
    	$scope.userData = $scope.userData[0];
    }

    $scope.btnManage = function() {
    	$scope.userListSetPage(1);
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
// 			case 'task':    obj = {psitnCode : $scope.category, taskList : { $: term}};
// 			break;
// 			case 'leader':  obj = {psitnCode : $scope.category, leader : term};
// 			break;
// 			case 'captain':	obj = {psitnCode : $scope.category, captain : term};
// 			break;
 			}
// 			obj.push({psitnCode : $scope.category});
 			
 			$scope.userListSetPage(1);
  			$scope.searchUserFilter = obj;
// 			$scope.filterUserList = filterFilter($scope.user, obj);
          
          
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
  $scope.userListViewby = 5;
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
	
		$scope.Math = window.Math;

		/* 보고일시 ---------------------------------------------------------------------------------*/
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
    		$scope.updateReport(reportData);	    		
	    }
		
	    /*//보고사항 ---------------------------------------------------------------------------------*/		

	    /* Global Variables ------------------------------------------------------------------------------------ */
	    $scope.repoDateMins  = [00,10,20,30,40,50];		    
	    $scope.repoDateHours = [00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
	    $scope.paginationViewbys = [1,2,3,4,5,10,20,30,40,50];
	    /*//Global Variables ------------------------------------------------------------------------------------ */
	    
	 	$scope.doPostSyncProcessForm = function(url, data) {
	 		var deferred = $q.defer();
	 		vData = !data?{"signalCode": "all"} : data;
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
	 	  .success(function(data, status, headers, config, $timeout) {
	 		if (config.url == getContextPath()+'/admin/insertjson.json') {
	 			$scope.idUnitSuccess = data.sampleVO.idUnit;
	 		}
	 	    if (!data.success) {
	 	    } else {
	 	    }
 	 	   deferred.resolve(data.sampleVO.idUnit);
	 	  })
	 	  .error(function(data,status,headers,config){
            deferred.reject('ERROR');
	 	  });
	 	 return deferred.promise;
	 	}
	 	$scope.successAlert = function () {
			alert('처리가 완료되었습니다');
//			 location.reload();
	    };
	    
	    /* 알림기능 ------------------------------------------------------------------------------------------- */  

	 	$scope.doPostProcessFormNoti = function(url, data) {
	 		vData = !data?{"signalCode": "all"} : data;
	 	  $http({
	 	  method  : 'POST',
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
	 	  .success(function(data) {
				$scope.NotificationList = data.NotificationList;
				$scope.filterNotificationList = $scope.NotificationList;
		    	var obj = {confirmYn : 'N'};
		    	$scope.newNotificationList = filterFilter($scope.filterNotificationList, obj, true);
	 	    if (!data.success) {
	 	    } else {
	 	    }

	 	  });
	 	};	    
	    
	    $scope.doPostProcessFormNoti(getContextPath()+'/web/selectNotificationList.json', {confirmYn : 'D'});
	    
	    $scope.doUpdateNotification = function(vConfirmYn, vIdNotification) {
	    	data = {
	    			idUser : $scope.loginUserDetails.idUser,
	    			userCode: $scope.loginUserDetails.userCode, 
	    			confirmYn : vConfirmYn
	    			}
	    	if(vIdNotification) data.idNotification = vIdNotification;
	    	url = getContextPath()+'/web/updateNotification.json';
	 		var myPromise = $scope.doPostSyncProcessForm(url, data);
	 		myPromise
	 			.then(function(resolve) {
	 			    $scope.doPostProcessFormNoti(getContextPath()+'/web/selectNotificationList.json', {confirmYn : 'D'});
	    	}, function(reject) {
	    		alert(reject)
	    	});		   
	    }
	    
	    $scope.deleteNotification = function(data) {
	    	if (confirm("정말 삭제하시겠습니까??") != true) return;
	    	$scope.doUpdateNotification('D', data.idNotification);
	    	// 삭제를 하게 되면 오늘자 알림이 또 생성되므로 업데이트로 변경 
//	    	url = getContextPath()+'/web/deleteNotification.json';
//	 		var myPromise = $scope.doPostSyncProcessForm(url, data);
//	 		myPromise
//	 			.then(function(resolve) {
//	 			    $scope.doPostProcessFormNoti(getContextPath()+'/web/selectNotificationList.json', {confirmYn : 'D'});
//	    	}, function(reject) {
//	    		alert(reject)
//	    	});
	    }
	    
//	    $http({
//			  method: 'GET',
//			  url: getContextPath()+'/web/selectNotificationList.json',
//			}).then(function successCallback(response) {
//				$scope.NotificationList = response.data.NotificationList;
//				$scope.filterNotificationList = $scope.NotificationList;
//			  }, function errorCallback(response) {
//		});
	
	    $scope.updateNotification = function() {
	    	if(!$scope.newNotificationList.length) return;
	    	$scope.doUpdateNotification('Y', "");
	    }
	    /*//알림기능 ------------------------------------------------------------------------------------------- */
	    
	    /* excelExport method */
	    $scope.excelExport = function() {
	    	
        	/* json data 2 depth Converter */
        	var excelExportList = [];
        	var i = -1;
        	for (var unit in $scope.filterList) {
	        	i++;
	        	excelExportList[i] = {psitnName : '"' + $scope.filterList[unit].psitnName + '"'};
	        	excelExportList[i].unitName = '"' + $scope.filterList[unit].unitName + '"';
	        	excelExportList[i].progress = '"' + $scope.filterList[unit].progress + '"';
	        	excelExportList[i].signalCode = '"' + $scope.filterList[unit].signalCode + '"';
	        	excelExportList[i].leader = '"' + $scope.filterList[unit].leader + '"';
	        	excelExportList[i].captain = '"' + $scope.filterList[unit].captain + '"';
	        	excelExportList[i].fromDate = '"' + resultDateFormatFilter($scope.filterList[unit].fromDate) + '"';
	        	excelExportList[i].toDate = '"' + resultDateFormatFilter($scope.filterList[unit].toDate) + '"';
        	    for (var task in $scope.filterList[unit].taskList) {
        		    i++;
        		    excelExportList[i] = {psitnName : ""};
        		    excelExportList[i].unitName = '"' + $scope.filterList[unit].taskList[task].taskName + '"';
        		    excelExportList[i].progress = '"' + $scope.filterList[unit].taskList[task].progress + '"';
        		    excelExportList[i].signalCode = '"' + $scope.filterList[unit].taskList[task].signalCode + '"';
        		    for(var user in $scope.filterList[unit].taskList[task].userList){
        		    	if($scope.filterList[unit].taskList[task].userList[user].repYn == 'Y')
        		    		excelExportList[i].leader = !$scope.filterList[unit].taskList[task].userList[user].userName ? "":'"' + $scope.filterList[unit].taskList[task].userList[user].userName + '"';
        		    }
        		    excelExportList[i].captain = !$scope.filterList[unit].taskList[task].userList.length ? "" : '"' +($scope.filterList[unit].taskList[task].userList.length-1) + '"' +"명";
        		    excelExportList[i].fromDate = '"' +resultDateFormatFilter($scope.filterList[unit].taskList[task].fromDate) + '"';
        		    excelExportList[i].toDate = '"' +resultDateFormatFilter($scope.filterList[unit].taskList[task].toDate) + '"';
        	    }
        	}
        	/* //json data 2 depth Converter */
        	
            var dt = new Date();
			var month = dt.getMonth()+1;
			var day = dt.getDate();
			var year = dt.getFullYear();
			
			var tab = '';
			if($scope.tabIndex == undefined || $scope.tabIndex == '0')
				tab = '전체';
			if($scope.tabIndex == '1')
				tab = '한화생명';
			if($scope.tabIndex == '2')
				tab = '그룹';
			if($scope.tabIndex == '3')
				tab = '센터';
			
        	$scope.data = excelExportList;
	    	$scope.reportFields={psitnName: '소속', unitName: 'Unit/Task', progress: '진행률(%)', signalCode: 'Signal', leader: 'Leader/담당자대표', captain: 'Captain/팀원', fromDate: '시작일자', toDate: '종료일자'};
	    	$scope.filename= "Uboard_"+ tab + "_" + year + month + day;
	    	$scope.tabIndex='tabIndex';
	    	ngJsonExportExcel.func($scope);
	    }
	    /* //excelExport method */
});
