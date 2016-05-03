app.controller('regCtrl', function($scope, $http, $location, filterFilter, searchUserListQeury, resultDateFormatFilter, regDateFormatFilter, taskDateFormatFilter, $filter, $q, $timeout) {
	$scope.getIdUnit = getIdUnit;
	if (!$scope.getIdUnit) {
		$scope.x = 	{psitnCode : "1", showYn : "Y", leaderStateCode : "state1", captainStateCode : "state1"};
		$scope.y ="";
	}
	
	$scope.taskShowYn = 'Y';
	
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
	$scope.selectAllUnitTaskList = function(){
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
			data    : {"signalCode": "all", "idUnit":getIdUnit, "showYn": "all"},//$.param($scope.formData),  // pass in data as strings
		 })
		  .success(function(data) {
			if (data.resultList) {
//				data.resultList = $filter('orderBy')(data.resultList, '-unitMaxTaskFromDate');
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
				    $scope.x.taskList[i].repoDate = !$scope.x.taskList[i].repoDate? "" : regDateFormatFilter($scope.x.taskList[i].repoDate);
				    
//				    for (var f =0; f < $scope.x.taskList[i].userList.length; f++) {
//	//			    	$scope.x.taskList[i].userList[f].userStateFrom = regDateFormatFilter($scope.x.taskList[i].userList[f].userStateFrom);
//	//				    $scope.x.taskList[i].userList[f].userStateTo = regDateFormatFilter($scope.x.taskList[i].userList[f].userStateTo);
//				    }
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
		  });
	};
	$scope.selectAllUnitTaskList();
	
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
			data    : {"unitCode": getIdUnit},//$scope.x.unitCode},
		 })
		 .success(function(data) {
			 $scope.checkUserList = data.selectUnitPartnerUserList;
			 $scope.resultCheckUser = filterFilter(data.selectUnitPartnerUserList, {idUnitPartner : "!''"});
//			 $scope.resultCheckUser = data.selectUnitPartnerUserList;
		 });
	    
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
	 		var deferred = $q.defer();
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
//	 			console.log('insertData');
//	 			console.log(data.sampleVO.idUnit);
	 			$scope.idUnitSuccess = data.sampleVO.idUnit;
//	 			$scope.insertUnitPartner($scope.insertUnitPartnerData, data.sampleVO.idUnit);
//	 			window.location = getContextPath()+'/admin/unitRegister.do?idUnit='+data.sampleVO.idUnit;	

	 		}
	 	    if (!data.success) {
	 	      // if not successful, bind errors to error variables
	 /*     	      $scope.errorName = data.errors.name;
	 	      $scope.errorSuperhero = data.errors.superheroAlias; */
	 	    } else {
	 	      // if successful, bind success message to message
	 /*     	      $scope.message = data.message; */
	 	    }
	 	 	   deferred.resolve(data.sampleVO.idUnit);
	 	  })
	 	  .error(function(data,status,headers,config){
            //reject the promise
            deferred.reject('ERROR');
	 	  });
	 	  
	 	 return deferred.promise;
	 	}
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
	    	data.fromDate = document.getElementById("xfromDate").value.toString().split("-").join("");
	    	data.toDate = document.getElementById("xtoDate").value.toString().split("-").join("");
	    	$scope.dateValidation(data.fromDate, data.toDate);
	    	data.psitnName = data.psitnCode == 1 ? "한화생명" : (data.psitnCode == 2 ? "그룹" : "센터");
	 		$scope.insertUnitPartnerData = data2;
	    	for(var i in data2) {
	    		data["partnerList["+i +"].userCode"] = data2[i].userCode;
			};

	 		if(!data) {
	 			alert("담당자를 입력바랍니다.");
	 		}
	 		if(!data.unitName) {
	 			alert("제목을 입력바랍니다.");
	 			return;
	 		}
	 		
	 		if(!data.fromDate || !data.toDate) {
	 			alert("날짜를 입력바랍니다.");
	 			return;
	 		}
	 		
	 		if(!data.leaderCode) {
	 			alert("리더를 입력바랍니다.");
	 			return;
	 		}
	 		
	 		if(!data.captainCode) {
	 			alert("캡틴을 입력바랍니다.");
	 			return;
	 		}
	 		
	 		if($scope.dateValidation(data.fromDate, data.toDate) == true){
		 		var obj = {userCode : data.leaderCode };
//		     	$scope.userData = filterFilter($scope.user, obj, true);
//		     	$scope.userData = $scope.userData[0];
				leaderDataList = filterFilter($scope.user, obj, true);
				leaderData = leaderDataList[0];
				leaderData.userStateCode = data.leaderStateCode;
				data.leaderStateFrom = document.getElementById("xleaderStateFrom").value.toString().split("-").join("");
				leaderData.userStateFrom = data.leaderStateFrom;
				data.leaderStateTo = document.getElementById("xleaderStateTo").value.toString().split("-").join("");
				leaderData.userStateTo = data.leaderStateTo;
				leaderData.userStateTime = data.leaderStateTime
				var obj = {userCode : data.captainCode };
				captainDataList = filterFilter($scope.user, obj, true);
				captainData = captainDataList[0];
				captainData.userStateCode = data.captainStateCode;
				data.captainStateFrom = document.getElementById("xcaptainStateFrom").value.toString().split("-").join("");
				captainData.userStateFrom = data.captainStateFrom;
				data.captainStateTo = document.getElementById("xcaptainStateTo").value.toString().split("-").join("");
				captainData.userStateTo = data.captainStateTo;
				captainData.userStateTime = data.captainStateTime;
 			}
 
	 		var myPromise = $scope.doPostProcessForm(url, data);
	 		myPromise
	 			.then(function(resolve) {
					$scope.successAlert();
					window.location = getContextPath()
							+ '/admin/unitRegister.do?idUnit='
							+ $scope.idUnitSuccess;
				}, function(reject) {
					alert(reject)
				});
	 		
//	 		var myPromise = $scope.doPostProcessForm(url, data);
//	 		myPromise
//	 			.then(function(resolve) {
//	 				$scope.idUnitSuccess = resolve;
//	 				$scope.insertUnitPartner($scope.insertUnitPartnerData, $scope.idUnitSuccess);
////	 				var myPromise = $scope.updateUser(leaderData);
//			 		myPromise
//			 		.then(function(resolve) {
////			 			var myPromise = $scope.updateUser(captainData);
//			 			myPromise
//			 			.then(function(resolve) {
//			 				$scope.successAlert();
//				 			window.location = getContextPath()+'/admin/unitRegister.do?idUnit='+$scope.idUnitSuccess;
////				 			$timeout(function () {
////				 				
////				 				var url = getContextPath()+'/admin/unitRegister.do?idUnit='+$scope.idUnitSuccess;
////				 				return $location.path(url).replace()
////				 				}
////				 				,3000);
//				 		}, function(reject) {
//				 			
//				 		});
//			 			
//			 		}, function(reject) {
//			 			
//			 		});
//	    	}, function(reject) {
//	    		alert(reject)
//	    	});
 			
	    }

	    $scope.updateUnit = function(data, data2) {
	    	url = getContextPath()+'/admin/updatejson.json';
	    	$scope.idUnitSuccess = getIdUnit;
	    	console.log('updateUnit---------');
	 		console.log(data);
	    	data.fromDate = document.getElementById("xfromDate").value.toString().split("-").join("");
	    	data.toDate = document.getElementById("xtoDate").value.toString().split("-").join("");
	    	$scope.dateValidation(data.fromDate, data.toDate);
	    	data.psitnName = data.psitnCode == 1 ? "한화생명" : (data.psitnCode == 2 ? "그룹" : "센터");
	 		$scope.insertUnitPartnerData = data2;
	 		
	    	for(var i in data2) {
	    		data["partnerList["+i +"].userCode"] = data2[i].userCode;
			};
			
	 		if(!data2) {
	 			alert("담당자를 입력바랍니다.");
	 		}
	 		if(!data.unitName) {
	 			alert("제목을 입력바랍니다.");
	 			return;
	 		}
	 		
	 		if(!data.fromDate || !data.toDate) {
	 			alert("날짜를 입력바랍니다.");
	 			return;
	 		}
	 		
	 		if(!data.leaderCode) {
	 			alert("리더를 입력바랍니다.");
	 			return;
	 		}
	 		
	 		if(!data.captainCode) {
	 			alert("캡틴을 입력바랍니다.");
	 			return;
	 		}	 		

	 		if($scope.dateValidation(data.fromDate, data.toDate) == true){
		 		var obj = {userCode : data.leaderCode };
//		     	$scope.userData = filterFilter($scope.user, obj, true);
//		     	$scope.userData = $scope.userData[0];
				leaderDataList = filterFilter($scope.user, obj, true);
				leaderData = leaderDataList[0];
				leaderData.userStateCode = data.leaderStateCode;
				data.leaderStateFrom = document.getElementById("xleaderStateFrom").value.toString().split("-").join("");
				leaderData.userStateFrom = data.leaderStateFrom;
				data.leaderStateTo = document.getElementById("xleaderStateTo").value.toString().split("-").join("");
				leaderData.userStateTo = data.leaderStateTo;
				leaderData.userStateTime = data.leaderStateTime
				var obj = {userCode : data.captainCode };
				captainDataList = filterFilter($scope.user, obj, true);
				captainData = captainDataList[0];
				captainData.userStateCode = data.captainStateCode;
				data.captainStateFrom = document.getElementById("xcaptainStateFrom").value.toString().split("-").join("");
				captainData.userStateFrom = data.captainStateFrom;
				data.captainStateTo = document.getElementById("xcaptainStateTo").value.toString().split("-").join("");
				captainData.userStateTo = data.captainStateTo;
				captainData.userStateTime = data.captainStateTime;
 			}
 			
	 		var myPromise = $scope.doPostProcessForm(url, data);
	 		myPromise
 			.then(function(resolve) {
 				$scope.successAlert();
	 			window.location = getContextPath()+'/admin/unitRegister.do?idUnit='+$scope.idUnitSuccess;
//	 			$timeout(function () {
//	 				
//	 				var url = getContextPath()+'/admin/unitRegister.do?idUnit='+$scope.idUnitSuccess;
//	 				return $location.path(url).replace()
//	 				}
//	 				,3000);
			}, function(reject) {
				alert(reject)
			});
//	 		myPromise
//	 			.then(function(resolve) {
////	 				$scope.insertUnitPartner($scope.insertUnitPartnerData, $scope.idUnitSuccess);
////	 				var myPromise = $scope.updateUser(leaderData);
//			 		myPromise
//			 		.then(function(resolve) {
////			 			var myPromise = $scope.updateUser(captainData);
//			 			myPromise
//			 			.then(function(resolve) {
//			 				$scope.successAlert();
//				 			window.location = getContextPath()+'/admin/unitRegister.do?idUnit='+$scope.idUnitSuccess;
////				 			$timeout(function () {
////				 				
////				 				var url = getContextPath()+'/admin/unitRegister.do?idUnit='+$scope.idUnitSuccess;
////				 				return $location.path(url).replace()
////				 				}
////				 				,3000);
//				 		}, function(reject) {
//				 			
//				 		});
//			 			
//			 		}, function(reject) {
//			 			
//			 		});
//	    	}, function(reject) {
//	    		alert(reject)
//	    	});
 			
	 		
//	 		if($scope.dateValidation(data.fromDate, data.toDate) == true){
//	 			$scope.doPostProcessForm(url, data);
//	 			
//	 			if (data.leaderCode) {
//			 		var obj = {userCode : data.leaderCode };
//	//		     	$scope.userData = filterFilter($scope.user, obj, true);
//	//		     	$scope.userData = $scope.userData[0];
//					leaderDataList = filterFilter($scope.user, obj, true);
//					leaderData = leaderDataList[0];
//					leaderData.userStateCode = data.leaderStateCode;
//					leaderData.userStateFrom = document.getElementById("xleaderStateFrom").value.toString().split("-").join("");
//					leaderData.userStateTo = document.getElementById("xleaderStateTo").value.toString().split("-").join("");
//					leaderData.userStateTime = data.leaderStateTime
//					$scope.updateUser(leaderData);
//	 			}
//	 			if (data.captainCode) {
//					var obj = {userCode : data.captainCode };
//					captainDataList = filterFilter($scope.user, obj, true);
//					captainData = captainDataList[0];
//					captainData.userStateCode = data.captainStateCode;
//					captainData.userStateFrom = document.getElementById("xcaptainStateFrom").value.toString().split("-").join("");
//					captainData.userStateTo = document.getElementById("xcaptainStateTo").value.toString().split("-").join("");
//					captainData.userStateTime = data.captainStateTime
//					$scope.updateUser(captainData);
//	 			}
//	 		}
	    	
	    }

	/*------------------------------------------------------------------------------------------------------*/

	    // insertTask set data
	    $scope.insertTask = function(data, insertTMData, taskPatnerList) {
	    	url = getContextPath()+'/admin/inserttask.json';
	    	$scope.idUnitSuccess = getIdUnit;
	    	data.idUnit = getIdUnit;
	    	data.fromDate = document.getElementById("addYFromDate").value.toString().split("-").join("");
	    	data.toDate = document.getElementById("addYToDate").value.toString().split("-").join("");
	    	data.unitCode = $scope.x.unitCode;
	    	data.taskCode = $scope.x.taskList.length + 1;
	    	data.repoDate = document.getElementById("addYRepoDate").value.toString().split("-").join("");
	    	
//	    	$scope.dateValidation(data.fromDate, data.toDate);
//	 		$scope.insertUnitPartnerData = data2;
	 		if(!data.taskName) {
	 			alert("제목을 입력바랍니다.");
	 			return;
	 		}
	 		
	 		if(!data.fromDate || !data.toDate) {
	 			alert("날짜를 입력바랍니다.");
	 			return;
	 		}

	 		if(!data.signalCode) {
	 			alert("Signal을 입력바랍니다.");
	 			return;
	 		}

	 		if(!data.progress) {
	 			alert("진행율을 입력바랍니다.");
	 			return;
	 		}
	 		
	    	if(!insertTMData.userCode) {
	    		alert("담당자 대표 정보를 입력 바랍니다.");
	    		return;
	    	}
	    	
	    	if(data.alramCode == 'B'){
	    		if(data.repoDesc == '' || data.repoDesc == null){
	    			alert("보고내용을 입력 바랍니다.");
		    		return;
	    		}
	    	}

	    	// add update 별도 작업 필요
//	    	data.idReport = '2';
	    	
//	    	$scope.doPostProcessForm(url, data);
//	    	console.log(data);
//	    	$scope.insertReport(data);
	    	
	    	data.firstPartnerIdUser    = insertTMData.idUser;
	    	data.firstPartnerUserCode  = insertTMData.userCode;
	    	data.firstPartnerStateCode = insertTMData.userStateCode;
	    	data.firstPartnerStateFrom = (!(insertTMData.userStateCode == 'state4'||insertTMData.userStateCode == 'state5')) ? "" : document.getElementById("repUserStateFrom").value.toString().split("-").join("");
	    	data.firstPartnerStateTo   = (!(insertTMData.userStateCode == 'state4'||insertTMData.userStateCode == 'state5')) ? "" : document.getElementById("repUserStateTo").value.toString().split("-").join("");
	    	data.firstPartnerStateTime = insertTMData.userStateTime;

	    	for(var i in taskPatnerList) {
	    		data["partnerList["+i +"].userCode"] = taskPatnerList[i].userCode;
			};

	 		var myPromise = $scope.doPostProcessForm(url, data);
	 		myPromise
	 			.then(function(resolve) {
	 				$scope.successAlert();
		 			window.location = getContextPath()+'/admin/unitRegister.do?idUnit='+$scope.idUnitSuccess;
	    	}, function(reject) {
	    		alert(reject)
	    	});	    
//			
//	 		var myPromise = $scope.doPostProcessForm(url, data);
//	 		myPromise
//	 			.then(function(resolve) {
////	 				$scope.idUnitSuccess = resolve;
////	 				$scope.insertUnitPartner($scope.insertUnitPartnerData, $scope.idUnitSuccess);
//	 				$scope.insertM(taskPatnerList);
//	 				var myPromise = $scope.insertReport(data);
//			 		myPromise
//			 		.then(function(resolve) {
//			 			insertTMData.repYn = 'Y';
//			 			insertTMData.unitCode = $scope.x.unitCode;
//				    	insertTMData.taskCode = $scope.y.taskCode;
//			 			var myPromise = $scope.insertTaskPartner(insertTMData);
//			 			myPromise
//			 			.then(function(resolve) {
//					    	var obj = {userCode : insertTMData.userCode };
//					    	userDataList = filterFilter($scope.user, obj, true);
//					    	userData = userDataList[0];
//					    	userData.userStateCode = insertTMData.userStateCode;
//					    	userData.userStateFrom =(!(insertTMData.userStateCode == 'state4'||insertTMData.userStateCode == 'state5')) ? "" : document.getElementById("repUserStateFrom").value.toString().split("-").join("");
//					    	userData.userStateTo = (!(insertTMData.userStateCode == 'state4'||insertTMData.userStateCode == 'state5')) ? "" : document.getElementById("repUserStateTo").value.toString().split("-").join("");
//					    	userData.userStateTime = insertTMData.userStateTime		
//					    	var myPromise = $scope.updateUser(userData);
//				 			myPromise
//				 			.then(function(resolve) {
//				 				$scope.successAlert();
//					 			window.location = getContextPath()+'/admin/unitRegister.do?idUnit='+$scope.idUnitSuccess;
//	//				 			$timeout(function () {
////				 				
////				 				var url = getContextPath()+'/admin/unitRegister.do?idUnit='+$scope.idUnitSuccess;
////				 				return $location.path(url).replace()
////				 				}
////				 				,3000);
//				 			}, function(reject) {
//					 			
//					 		});
//				 		}, function(reject) {
//				 			
//				 		});
//			 			
//			 		}, function(reject) {
//			 			
//			 		});
//	    	}, function(reject) {
//	    		alert(reject)
//	    	});	    
	    }

	    // updateTask set data
	    $scope.updateTask = function(data, insertTMData, taskPatnerList) {
	    	url = getContextPath()+'/admin/updatetask.json';
	    	$scope.idUnitSuccess = getIdUnit;
	    	data.fromDate = document.getElementById("modifyYFromDate").value.toString().split("-").join("");
	    	data.toDate = document.getElementById("modifyYToDate").value.toString().split("-").join("");
//	    	data.unitCode = $scope.x.unitCode;
//	    	data.taskCode = $scope.x.taskList.length + 1;
	    	data.repoDate = document.getElementById("modifyYRepoDate").value.toString().split("-").join("");
	    	
//	    	$scope.dateValidation(data.fromDate, data.toDate);
//	 		$scope.insertUnitPartnerData = data2;
	 		if(!data.taskName) {
	 			alert("제목을 입력바랍니다.");
	 			return;
	 		}
	 		
	 		if(!data.fromDate || !data.toDate) {
	 			alert("날짜를 입력바랍니다.");
	 			return;
	 		}
	 		
	 		if(!data.progress) {
	 			alert("진행율을 입력바랍니다.");
	 			return;
	 		}
	 		
	    	if(!insertTMData.userCode) {
	    		alert("담당자 대표 정보를 입력 바랍니다.");
	    		return;
	    	}
	    	
	    	if(data.alramCode == 'B'){
	    		if(data.repoDesc == '' || data.repoDesc == null){
	    			alert("보고내용을 입력 바랍니다.");
		    		return;
	    		}
	    	}

	    	data.firstPartnerIdUser    = insertTMData.idUser;
	    	data.firstPartnerUserCode  = insertTMData.userCode;
	    	data.firstPartnerStateCode = insertTMData.userStateCode;
	    	data.firstPartnerStateFrom = (!(insertTMData.userStateCode == 'state4'||insertTMData.userStateCode == 'state5')) ? "" : document.getElementById("modifyRepUserStateFrom").value.toString().split("-").join("");
	    	data.firstPartnerStateTo   = (!(insertTMData.userStateCode == 'state4'||insertTMData.userStateCode == 'state5')) ? "" : document.getElementById("modifyRepUserStateTo").value.toString().split("-").join("");
	    	data.firstPartnerStateTime = insertTMData.userStateTime;

	    	for(var i in taskPatnerList) {
	    		data["partnerList["+i +"].userCode"] = taskPatnerList[i].userCode;
			};
	    	
	    	// add update 별도 작업 필요
//	    	data.idReport = '2';
	    	
//	    	$scope.doPostProcessForm(url, data);
//	    	console.log(data);
//	    	$scope.insertReport(data);
	    	
	 		var myPromise = $scope.doPostProcessForm(url, data);
	 		myPromise
	 			.then(function(resolve) {
				 				$scope.successAlert();
					 			window.location = getContextPath()+'/admin/unitRegister.do?idUnit='+$scope.idUnitSuccess;
	    	}, function(reject) {
	    		alert(reject)
	    	});	    	    	
	 		
//	 		var myPromise = $scope.doPostProcessForm(url, data);
//	 		myPromise
//	 			.then(function(resolve) {
////	 				$scope.idUnitSuccess = resolve;
////	 				$scope.insertUnitPartner($scope.insertUnitPartnerData, $scope.idUnitSuccess);
//	 				$scope.insertM(taskPatnerList);
//	 				var myPromise = $scope.updateReport(data);
//			 		myPromise
//			 		.then(function(resolve) {
//			 			insertTMData.repYn = 'Y';
//			 			insertTMData.unitCode = $scope.x.unitCode;
//				    	insertTMData.taskCode = $scope.y.taskCode;
//			 			var myPromise = $scope.updateTaskPartner(insertTMData);
//			 			myPromise
//			 			.then(function(resolve) {
//					    	var obj = {userCode : insertTMData.userCode };
//					    	userDataList = filterFilter($scope.user, obj, true);
//					    	userData = userDataList[0];
//					    	userData.userStateCode = insertTMData.userStateCode;
//					    	userData.userStateFrom =(!(insertTMData.userStateCode == 'state4'||insertTMData.userStateCode == 'state5')) ? "" : document.getElementById("repUserStateFrom").value.toString().split("-").join("");
//					    	userData.userStateTo = (!(insertTMData.userStateCode == 'state4'||insertTMData.userStateCode == 'state5')) ? "" : document.getElementById("repUserStateTo").value.toString().split("-").join("");
//					    	userData.userStateTime = insertTMData.userStateTime		
//					    	var myPromise = $scope.updateUser(userData);
//				 			myPromise
//				 			.then(function(resolve) {
//				 				$scope.successAlert();
//					 			window.location = getContextPath()+'/admin/unitRegister.do?idUnit='+$scope.idUnitSuccess;
//	//				 			$timeout(function () {
////				 				
////				 				var url = getContextPath()+'/admin/unitRegister.do?idUnit='+$scope.idUnitSuccess;
////				 				return $location.path(url).replace()
////				 				}
////				 				,3000);
//				 			}, function(reject) {
//					 			
//					 		});
//				 		}, function(reject) {
//				 			
//				 		});
//			 			
//			 		}, function(reject) {
//			 			
//			 		});
//	    	}, function(reject) {
//	    		alert(reject)
//	    	});	    	    	

//	    	data.fromDate = document.getElementById("modifyYFromDate").value.toString().split("-").join("");
//	    	data.toDate = document.getElementById("modifyYToDate").value.toString().split("-").join("");
//	    	data.repoDate = document.getElementById("repoDate").value.toString().split("-").join("");
//	    	$scope.doPostProcessForm(url, data);
//	    	 $scope.deleteReport(data);
//	    	 $scope.updateReport(data);
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

	 // insertReport set data
	    $scope.insertReport = function(data) {
	    	url = getContextPath()+'/admin/insertreport.json';
	    	return $scope.doPostProcessForm(url, data);
	    }


	    // updateReport set data
	    $scope.updateReport = function(data) {
	    	url = getContextPath()+'/admin/updatereport.json';
	    	return $scope.doPostProcessForm(url, data);
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
		     
		 		var myPromise = $scope.doPostProcessForm(url, data);
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
		     	var myPromise = $scope.doPostProcessForm(url, data);
		 		myPromise
		 			.then(function(resolve) {
		 				$scope.successAlert();
//		 				$scope.newUser = [{}];
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
		     	var myPromise = $scope.doPostProcessForm(url, data);
		     	myPromise
	 			.then(function(resolve) {
	 				$scope.successAlert();
//	 				$scope.newUser = [{}];
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
		    	$scope.inputUserType = "";
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
		  			$scope.userListSetPage(1);
		  			$scope.searchUserFilter = obj;
//		           $scope.filterUserList = filterFilter($scope.filterUserList, obj);

//		           $scope.currentPage = 1;
		 //
//		           /*-------------------- 검색 후 펼치기 ----------------------- */
//		           $('.btn-up').addClass("btn-down");
//		           $('.btn-up').parent().parent().next().show();
//		           /*-------------------- 검색 후 펼치기 ----------------------- */
		       });		     
		     
		    $scope.userPopUp = function (term, inputUserType) {
		    	if(inputUserType=='leader' && !$scope.unitWritingAuth ) {
		    		alert("변경권한이 없습니다.");
		    		return
		    	}
	    	    var wh = window.innerHeight-200;
	    	    var wh1 = window.innerHeight;

//	    	    $('.btn-manage').trigger('click');
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
	    		$( "#searchUserListQeury" ).focus();
		    }
		    
//		    $scope.checkUser = [];
		    $scope.removeUnitPartner = function(index) {
		        $scope.checkUserList.splice(index, 1);
		      };
		    
		    $scope.selectUserListReset = function() {
		    	for(var i in $scope.filterUserList){
		    		$scope.filterUserList[i].userCheckBox = 'false';
		    	}
		    }
		      
		     $scope.selectedUserOK = function() {
//		    	$scope.userListSetPage(1);
	    	   	var obj = {userCheckBox : true };
	    	   	var selectedUserList = filterFilter($scope.filterUserList, obj, true);
	    	   	
	    	   	if (!selectedUserList.length){
	    	   		alert('확정된 유저가 없습니다');
	    	   		return;
	    	   	}
	    	   	
	    	   	
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
		    		 $scope.x["leaderIdUser"] = userData.idUser;
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
			    		 $scope.x["captainIdUser"] = userData.idUser;
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
			    		 $scope.z["idUser"] = userData.idUser;
			    		 $scope.z["userCode"] = userData.userCode;
				    	 $scope.z["userName"] = userData.userName;
				    	 $scope.z["userTel"] = userData.userTel;
				    	 $scope.z["userEmail"] = userData.userEmail;
				    	 $scope.z["userStateCode"] = userData.userStateCode;
				    	 $scope.z["userStateFrom"] = userData.userStateFrom;
				    	 $scope.z["userStateTo"] = userData.userStateTo;
			    	 }
	    	   } else if  ($scope.inputUserType == 'unitPartner') {
	    		   
	    		   for(i in $scope.checkUserList){
			    		for(f in selectedUserList){
			    			if($scope.checkUserList[i].userCode == selectedUserList[f].userCode){
			    				alert('이미 등록된 유저가 있습니다');
			    				return;
			    			}
			    		}
			    	}
	    		   
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
	    	   $('.layer-member').hide();
	    	   disablePopup();
		     }		     
		     
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
			    	if(!idUnit) 
			    		{
			    			alert("데이터의 문제로 담당자를 저장할 수 없습니다.");
			    			return;
			    		}
			    	var vResultCheckUserList = $scope.resultCheckUser; 
			    	for(var i in vResultCheckUserList) {
			    		vResultCheckUserList[i].unitCode = idUnit;
			    		$scope.deleteUnitPartner (vResultCheckUserList[i]);
			    	}
			    	url = getContextPath()+'/admin/insertunitpartner.json';
//					console.log(idUnit);
//    		    	console.log('insertUnitPartner-------');
//    		    	console.log(data);
//			    	console.log('-------------');
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
			    	return $scope.doPostProcessForm(url, data);
			    }
			    $scope.updateTaskPartner = function(data) {
			    	url = getContextPath()+'/admin/updatetaskpartner.json';
			    	return $scope.doPostProcessForm(url, data);
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
			 	   $scope.unitWritingAuth = ($scope.loginUserDetails.unitAuthorities == 'POWERUSER' || $scope.loginUserDetails.unitAuthorities == 'LEADER'  || $scope.loginUserDetails.unitAuthorities == 'CAPTAIN') ? true : false;
			 	   $scope.unitModifiyingAuth = ($scope.loginUserDetails.unitAuthorities != 'MEMBER') ? true : false; 
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


			    $scope.taskReg = function(idTask){
//			    	$('.layer-task').attr('ng-repeat', 'y in x.taskList |  filter:{idTask : addTaskId}');

//			    	$scope.addTaskId = idTask;
//			    	if(idTask != null)
			        var obj = {idTask : idTask };
			        $scope.x.filterTaskList = filterFilter($scope.x.taskList, obj, true);
			        $scope.y = $scope.x.filterTaskList[0];
			        var filterTaskCode = $scope.x.filterTaskList[0].taskCode;
			        $scope.taskPatnerList = filterFilter($scope.x.filterTaskList[0].userList, {taskCode : filterTaskCode}, true);
			        $scope.z = filterFilter($scope.taskPatnerList, {repYn : 'Y'}, true)[0];
			        $scope.z = !$scope.z ? {} : $scope.z;
			        $scope.idTaskPartnerRepY = !$scope.z.idTaskPartner? null : $scope.z.idTaskPartner;  
			        $scope.resultTaskPartnerList = filterFilter($scope.taskPatnerList, {repYn : 'N'}, true);
			        $scope.taskPatnerList = filterFilter($scope.taskPatnerList, {repYn : 'N'}, true);
//			        console.log($scope.taskPatnerList);
			    };

			    // task 닫기 버튼시 데이터 리플래
//			    $scope.taskCancle = function(){
//			    	 $scope.selectAllUnitTaskList();
//			    }


			    $scope.newTaskInsert = function(){
			    	$scope.y = {signalCode : "G", showYn: "Y"};
			    	$scope.z = {userStateCode : "state1", userStateFrom : "", userStateTo : ""};
			    	$scope.taskPatnerList = [{}];
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
			    		 $scope.y.issueText = ''; // 임시 조치 signal G 선택시 이슈 내용 지움 
			    		 $(".txta-issue").val('').attr("readonly",true).attr("disabled",true); //입력불가
			    	}
			    }

//			    $scope.alramCodeClick('y.alramCode', function (term) {
			    	$scope.alramCodeClick = function () {
			    	if($scope.y.alramCode != 'B') {
			    		$("#modifyYRepoDate").val('');
			    		$("#addYRepoDate").val('');
			    		$scope.y.repoDate = '';
			    		$scope.y.repoDateHour = '';
			    		$scope.y.repoDateMin = '';
			    		$scope.y.repoUserCode = '';
			    		$scope.y.repoMembers = '';
			    		$scope.y.repoDesc = '';
			    	}
			    }
//			    	);
			    $scope.unitLeaderState = function(code){
			    	console.log(code);
			    	if(code == 'state2' || code == 'state3'){
			    		$(".leaderStateTime").attr("disabled",false).attr("readonly",false); //입력가능
			    		$(".leaderStateDate").val('').attr("readonly",true).attr("disabled",true); //입력불가
			    	} else if(code == 'state4' || code == 'state5') {
			    		$scope.x.leaderStateTime = ''; // 임시 조치
			    		$(".leaderStateTime").attr("checked", false).attr("readonly",false).attr("disabled",true); //입력불가
			    		$(".leaderStateDate").attr("disabled",false).attr("readonly",false); //입력가능
			    	} else{
			    		$scope.x.leaderStateTime = ''; // 임시 조치
			    		$(".leaderStateTime").attr("checked", false).attr("readonly",false).attr("disabled",true); //입력불가
			    		$(".leaderStateDate").val('').attr("readonly",true).attr("disabled",true); //입력불가
			    	}	
			    }

			    $scope.unitCaptainState = function(code){
			    	if(code == 'state2' || code == 'state3'){
			    		$(".captainStateTime").attr("disabled",false).attr("readonly",false); //입력가능
			    		$(".captainStateDate").val('').attr("readonly",true).attr("disabled",true); //입력불가
			    	} else if(code == 'state4' || code == 'state5') {
			    		$scope.x.captainStateTime = ''; // 임시 조치
			    		$(".captainStateTime").attr("checked", false).attr("readonly",false).attr("disabled",true); //입력불가
			    		$(".captainStateDate").attr("disabled",false).attr("readonly",false); //입력가능
			    	} else{
			    		$scope.x.captainStateTime = ''; // 임시 조치
			    		$(".captainStateTime").attr("checked", false).attr("readonly",false).attr("disabled",true); //입력불가
			    		$(".captainStateDate").val('').attr("readonly",true).attr("disabled",true); //입력불가
			    	}	
			    }

			    $scope.taskUserState = function(code){
			    	if(code == 'state2' || code == 'state3'){
			    		$(".userStateTime").attr("disabled",false).attr("readonly",false); //입력가능
			    		$(".userStateDate").val('').attr("readonly",true).attr("disabled",true); //입력불가
			    	} else if(code == 'state4' || code == 'state5') {
			    		$scope.z.userStateTime = ''; // 임시 조치
			    		$(".userStateTime").attr("checked", false).attr("readonly",false).attr("disabled",true); //입력불가
			    		$(".userStateDate").attr("disabled",false).attr("readonly",false); //입력가능
			    	} else{
			    		$scope.z.userStateTime = ''; // 임시 조치
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
			    	var totalMember = $scope.taskPatnerList.length + 1; 
			    	if(totalMember >= $scope.checkUserList.length){
			    		alert('담당자 초과');
			    		return false;
			    	}
			    	else
			    		$scope.taskPatnerList.push({});
			    };

			    $scope.selectChangeY = function(changeData) {
			    	$scope.z = changeData;
			    	if($scope.idTaskPartnerRepY != null){
			    		$scope.z.idTaskPartner = $scope.idTaskPartnerRepY;
			    	}
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
			    };
			    /*----------- userListPaginationDemoCtrl -----------------------------------*/


			    /* Global Variables ------------------------------------------------------------------------------------ */
			    $scope.repoDateMins = [00,10,20,30,40,50];		    
			    $scope.repoDateHours = [00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
			    /*//Global Variables ------------------------------------------------------------------------------------ */
			    
			    $scope.deleteTask = function (idUnit, unitCode, idTask,taskCode) {
			    	console.log(idUnit +',' + unitCode +',' + idTask +',' + taskCode);	
//			    	if (confirm("[ " + taskData.taskName +" ] Task를 정말 삭제하시겠습니까??") != true) return;
//			    	
//			    	url = getContextPath()+'/admin/deletetask.json';
//			    	
//			 		var myPromise = $scope.doPostProcessForm(url, taskData);
//			 		myPromise
//			 			.then(function(resolve) {
//						 				$scope.successAlert();
//							 			window.location = getContextPath()+'/admin/unitRegister.do?idUnit='+$scope.idUnitSuccess;
//			    	}, function(reject) {
//			    		alert(reject)
//			    	});	    	    			    	

			    }
			    
			    
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
			    /* 알림기능 ------------------------------------------------------------------------------------------- */  

			 	$scope.doPostProcessFormNoti = function(url, data) {
			 		vData = !data?{"signalCode": "all"} : data;
			 		console.log(vData);
			 	  $http({
			 	  method  : 'POST',
			 	  url     : url,
			 	  data    : vData,//$.param($scope.formData),  // pass in data as strings
//			 	  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
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
//			    	url = getContextPath()+'/web/deleteNotification.json';
//			 		var myPromise = $scope.doPostSyncProcessForm(url, data);
//			 		myPromise
//			 			.then(function(resolve) {
//			 			    $scope.doPostProcessFormNoti(getContextPath()+'/web/selectNotificationList.json', {confirmYn : ''});
//			    	}, function(reject) {
//			    		alert(reject)
//			    	});
			    }
			    
//			    $http({
//					  method: 'GET',
//					  url: getContextPath()+'/web/selectNotificationList.json',
//					}).then(function successCallback(response) {
//						$scope.NotificationList = response.data.NotificationList;
//						$scope.filterNotificationList = $scope.NotificationList;
//					  }, function errorCallback(response) {
//				});
			
			    $scope.updateNotification = function() {
			    	if(!$scope.newNotificationList.length) return;
			    	$scope.doUpdateNotification('Y', "");
			    }
			    /*//알림기능 ------------------------------------------------------------------------------------------- */			    
});
/*---------------------ng (end)----------------------------------------------------*/