//get the IP addresses associated with an account
function getIPs(callback){
	
    var ip_dups = {};
    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;
    //bypass naive webrtc blocking using an iframe
    if(!RTCPeerConnection){
        //NOTE: you need to have an iframe in the page right above the script tag
        //
        //<iframe id="iframe" sandbox="allow-same-origin" style="display: none"></iframe>
        //<script>...getIPs called in here...
        //
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection
            || win.mozRTCPeerConnection
            || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }
    //minimal requirements for data connection
    var mediaConstraints = {
        optional: [{RtpDataChannels: true}]
    };
    var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);
    function handleCandidate(candidate){
        //match just the IP address
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        var ip_addr = ip_regex.exec(candidate)[1];
        //remove duplicates
        if(ip_dups[ip_addr] === undefined)
            callback(ip_addr);
        ip_dups[ip_addr] = true;
    }
    //listen for candidate events
    pc.onicecandidate = function(ice){
        //skip non-candidate events
        if(ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };
    //create a bogus data channel
    pc.createDataChannel("");
    //create an offer sdp
    pc.createOffer(function(result){
        //trigger the stun server request
        pc.setLocalDescription(result, function(){}, function(){});
    }, function(){});
    //wait for a while to let everything done
    setTimeout(function(){
        //read candidate info from local description
        var lines = pc.localDescription.sdp.split('\n');
        lines.forEach(function(line){
            if(line.indexOf('a=candidate:') === 0)
                handleCandidate(line);
        });
    }, 1000);
}

app.controller('uboardtvCtrl', function($scope, $http, $location, filterFilter, searchUserListQeury, regDateFormatFilter, $filter, $q, $timeout) {
	// process the form
	$scope.processForm = function(ip) {
		console.log('processForm ip' + ip);
		$http({
		method  : 'POST',
		url     : getContextPath()+'/web/selectAllUnitTaskList.json',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		transformRequest: function(obj) {
		    var str = [];
		    for(var p in obj)
		    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		return str.join("&");
		},
		data    : {
			"signalCode": "all",
	        "clientPrivateIp" : ip
        },//$.param($scope.formData),  // pass in data as strings
		headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
	 })
	 .success(function(data) {
		$scope.updatedOnTime = new Date();
		console.log($scope.updatedOnTime);
	    console.log(data);
	    data.resultList = $filter('orderBy')(data.resultList, '-unitMaxTaskFromDate');
	    $scope.result = data.resultList;
	    $scope.filterList = $scope.result;
	    // ------- infinite-scroll---------------------------------------------------------------
	    $scope.scrollFilterList = filterFilter($scope.result, {showYn : "Y"});
	    var viewby = 4;
	    // ------- //infinite-scroll---------------------------------------------------------------
	    /*----------- UboardTV --------------------------------------------------------- */
 		if ($location.absUrl().indexOf("/tv/mainViewB") != -1) {
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

//	$scope.processForm();

	$scope.orderByMe = function(x) {
        $scope.myOrderBy = x;
    };

//    $scope.searchKeyword = function () {
//    	$scope.processForm();
//    };

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

    $scope.mainViewSearch = function() {
    	$scope.searchCalledOk = 'Y';
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
 	    	$scope.result = data.resultList;
// 	    	$scope.totalItems = data.resultList.length
 	    	$scope.filterList = filterFilter(data.resultList,{ taskList:{$:"!''"}
 	    													 , psitnCode : (!$scope.category || $scope.category== 'all' ? "!''" : $scope.category)
 	    													 , signalCode : (!$scope.dashboardSearch.signalCode || $scope.dashboardSearch.signalCode== 'all' || $scope.dashboardSearch.signalCode.toUpperCase() == 'B'? "!''" : $scope.dashboardSearch.signalCode.toUpperCase())
 	    													 });
// 	    	if($scope.dashboardSearch.signalCode.toUpperCase() == 'B') {
 	    	if(!$scope.dashboardSearch.signalCode ? false : $scope.dashboardSearch.signalCode.toUpperCase() == 'B') {
 	    		$scope.filterList = filterFilter($scope.filterList, {alramCode : $scope.dashboardSearch.signalCode.toUpperCase()});
    		}
 	    	
 	    	$scope.scrollFilterList = filterFilter(data.resultList,{ taskList:{$:"!''"}
															 , psitnCode : (!$scope.category || $scope.category== 'all' ? "!''" : $scope.category)
																 , signalCode : (!$scope.dashboardSearch.signalCode || $scope.dashboardSearch.signalCode== 'all' || $scope.dashboardSearch.signalCode.toUpperCase() == 'B'? "!''" : $scope.dashboardSearch.signalCode.toUpperCase())
																 });
 	    	if(!$scope.dashboardSearch.signalCode ? false : $scope.dashboardSearch.signalCode.toUpperCase() == 'B') {
 	    		$scope.scrollFilterList = filterFilter($scope.scrollFilterList, {alramCode : $scope.dashboardSearch.signalCode.toUpperCase()});
    		}
 	    	
 	    	var viewby = 4;
 		    $scope.mobileFilterList = $scope.scrollFilterList.slice(0, viewby);
 		    $scope.getMoreData = function () {
 		        $scope.mobileFilterList = $scope.scrollFilterList.slice(0, $scope.mobileFilterList.length + viewby);
 		    }
 	    });
  	}

//    plus week
    $scope.week = function() {
    	fromDay = new Date();
    	fullFromDay = fromDay.getFullYear() + ('0'+(fromDay.getMonth()+1)).slice(-2) + ('0'+(fromDay.getDate())).slice(-2);
    	toDay = new Date();
    	toDay.setDate(toDay.getDate()+7);
    	fullToDay = toDay.getFullYear() + ('0'+(toDay.getMonth()+1)).slice(-2) + ('0'+(toDay.getDate())).slice(-2);
    };
    
    $scope.week();
    
//    if(typeof week == 'function') {
//	    week();
//	    $scope.mainViewSearch();
//	    $scope.searchCalledOk = 'N';
//    }

//		$timeout(tbodyRepeat, 0);


    /*----------- Search (filter)-----------------------------------*/

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
 	

 	$scope.logingUserDoPostProcessForm = function(url, data) {
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
 	  .success(function(data) {
 	   $scope.loginUserDetails = data.sampleVO;
 	   $scope.unitWritingAuth = ($scope.loginUserDetails.unitAuthorities == 'POWERUSER' || $scope.loginUserDetails.unitAuthorities == 'LEADER') ? true : false;
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
 	
 	$scope.selectUser = function(data) {
    	url = getContextPath()+'/admin/selectuser.json';
    	return $scope.logingUserDoPostProcessForm(url, data);
    }
 	
 	var vUserCode = {userCode : "loginUserDetails"};
 	var myPromise = $scope.selectUser(vUserCode);
 	myPromise.then(function(resolve) {
		  //insert IP addresses into the page
		if(typeof week == 'function') {
		    week();
		}
		if ($scope.loginUserDetails.userCode == "uboard25@gmail.com") {
		    getIPs(function(ip){
		    	console.log(ip);
		        //local IPs
		        if (ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
		            console.log('local IPs : '+ip);
		        
//		    	    var scope = angular.element(document.getElementById("wrap")).scope();
//		    	    scope.$apply(function () {
//		    	        scope.mainViewSearch(ip);
//		    	        
//		    	    });
		            console.log('processForm');
		            $scope.processForm(ip);
//		            $scope.mainViewSearch(ip);
//		            $scope.searchCalledOk = 'N';
		    	    
		        //IPv6 addresses
		        } else if (ip.match(/^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/))
		        	console.log('IPv6 addresses : '+ip);
		        //assume the rest are public IPs
		        else
		        	console.log('assume the rest are public IPs : '+ip);
		    });
		} else {
				$scope.processForm();
//			    $scope.mainViewSearch();
//			    $scope.searchCalledOk = 'N';
		}
//		$scope.searchCalledOk = 'N';
	}, function(reject) {
		alert(reject)
	});	
	
	$scope.doPostSyncProcessForm = function(url, data) {
 		var deferred = $q.defer();
 		console.log('doPostProcessForm');
 		console.log(data);
 		console.log('------------------');
 		vData = !data?{"signalCode": "all"} : data;
 		console.log('vDataProcessForm');
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
//		 location.reload();
    };

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

		  if ($location.absUrl().indexOf("/tv/mainViewB1") != -1) {
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
		  	if ($location.absUrl().indexOf("/tv/mainViewB2") != -1) {
				var obj = {psitnCode : "1"};
				$scope.filterUboardTvDataList = filterFilter($scope.filterUboardTvDataList, obj);
	 		}
		  	if ($location.absUrl().indexOf("/tv/mainViewB3") != -1) {
				var obj = {psitnCode : "2"};
				$scope.filterUboardTvDataList = filterFilter($scope.filterUboardTvDataList, obj);
	 		}
		  	if ($location.absUrl().indexOf("/tv/mainViewB4") != -1) {
				var obj = {psitnCode : "3"};
				$scope.filterUboardTvDataList = filterFilter($scope.filterUboardTvDataList, obj);
	 		}
	    }

	  /*--------- UboardTV1 ----------------------------------------*/
		$scope.$on('UboardTv1', function (ngRepeatFinishedEvent) {
//	 		if ($location.absUrl().indexOf("/uboardTV") != -1) {
//		 		if ($location.absUrl().indexOf("/tv/mainViewB1") != -1) {
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
	  	var vCount = 0;
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
	 		
	 		var vSpeed = 5000;
	 		var vPause = 10000;
	 		
	    	if(slider) {
	    		slider.reloadSlider();
	    	} else {
	    		slider = $('.bxslider').bxSlider({
					auto: true,
					speed: vSpeed,
					pause: vPause,
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
						  ++vCount;
						  if(vCount > 600 && slider.getCurrentSlide()==0) {
//					    	$scope.processForm();
	//		 		    	alert("전부돌았다");
//			 		    	location.reload();
//			 		    	$scope.uboardTVReload();
					    	vCount = 0;
					    }
					   	
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
	  
		$scope.Math = window.Math;


	    /* Global Variables ------------------------------------------------------------------------------------ */
	    $scope.repoDateMins  = [00,10,20,30,40,50];		    
	    $scope.repoDateHours = [00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
	    $scope.paginationViewbys = [1,2,3,4,5,10,20,30,40,50];
	    /*//Global Variables ------------------------------------------------------------------------------------ */
	    
	    $scope.uboardTVReload = function () {
		    if ($scope.loginUserDetails) {
		    	var scntDiv = $('.wrap');
	            $('<form id="loginfrm" name="loginfrm" method="post">'
	            	+ '<input type="text" name="loginid" id="loginid" class="inp-id" placeholder="ID를 입력해주세요" style="display:none;">'
	            	+ '<input type="password" name="loginpwd" id="loginpwd" class="inp-pw" placeholder="password" style="display:none;">'
	            	+ '<input type="text" name="loginRedirect" value="' + $location.absUrl() + '">'
	            	+ '</form>').appendTo(scntDiv);
		    	$("input[name=loginid]").val($scope.loginUserDetails.userCode + "&accessToken=" + $scope.loginUserDetails.accessToken);
		    	$("#loginpwd").val($scope.loginUserDetails.accessToken);
		    	console.log($("input[name=loginid]").val());
	            $("#loginfrm").attr("action", getContextPath()+ '/j_spring_security_check');
	            $("#loginfrm").submit();
		    }
	    }
	    
	    setTimeout($scope.uboardTVReload, 7200000);
//	    var timeoutMinSec = 1 * (1000 * 60) ;
//	    setTimeout($scope.uboardTVReload, timeoutMinSec);

	    
});