<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib  prefix="s" uri="http://www.springframework.org/security/tags" %>

<!DOCTYPE html>
<html lang="ko">
<head>
	<title>UBoard-Mobile</title>	
	<meta charset='UTF-8' />	
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
	
	<!--  favicon favilite -->
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/img/icon_180.png">
    <link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/img/Android_02.png">
	<link rel="apple-touch-icon-precomposed" href="${pageContext.request.contextPath}/img/iOS_02.png" />
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="${pageContext.request.contextPath}/img/iOS_02.png" />
	<link rel="apple-touch-icon-precomposed" sizes="120x120" href="${pageContext.request.contextPath}/img/apple-touch-icon-120x120.png" />
	<link rel="apple-touch-icon-precomposed" sizes="180x180" href="${pageContext.request.contextPath}/img/apple-touch-icon-180x180.png" />
	<!--  //favicon favilite -->
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/mobile/css/common.css" />
	<script src="${pageContext.request.contextPath}/mobile/js/jquery-1.11.3.min.js"></script>
	<script src="${pageContext.request.contextPath}/mobile/js/iscroll.js"></script>	
	<script src="${pageContext.request.contextPath}/js/angular-1.4.8.min.js"></script>	
	<script src="${pageContext.request.contextPath}/js/angular-route-1.4.8.min.js"></script>		
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/icheck.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/ng-module.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-dataCtrl.js"></script>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-regCtrl.js"></script> --%>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-PaginationCtrl.js"></script> --%>
<%-- 	<script src="${pageContext.request.contextPath}/js/ng-ctrl.js"></script> --%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/FileSaver.js"></script>
	<script src="${pageContext.request.contextPath}/mobile/js/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/angular.easypiechart.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/ui-bootstrap-tpls-0.11.0.js"></script>
	<script src="${pageContext.request.contextPath}/js/ng-infinite-scroll-1.2.2.min.js"></script>	
	<script>
		var ctx = "${pageContext.request.contextPath}"
		function getContextPath(){
 		   return ctx;
		}
		
		function addTodayDate(){
			var toDateText = document.getElementById("fromDate");
//			if(toDateText.value == ''){
				var fdt = new Date();
				toDateText.value = fdt.getFullYear() + "-" + ('0'+(fdt.getMonth()+1)).slice(-2) + "-" + ('0'+(fdt.getDate())).slice(-2);
//			}
		}

		function plusWeek(){
			addTodayDate();
			var toDate = new Date(document.getElementById("fromDate").value);
			var fromDate = document.getElementById("toDate");
			toDate.setDate(toDate.getDate()+7);
			fromDate.value=toDate.getFullYear() + "-" + ('0'+(toDate.getMonth()+1)).slice(-2) + "-" + ('0'+(toDate.getDate())).slice(-2);
		}

		function addTodayDate2(){
			var toDateText = document.getElementById("toDate");
//			if(toDateText.value == ''){
				var fdt = new Date();
				toDateText.value = fdt.getFullYear() + "-" + ('0'+(fdt.getMonth()+1)).slice(-2) + "-" + ('0'+(fdt.getDate())).slice(-2);
//			}
		}

		function week(){
			addTodayDate2();
			var toDate = new Date(document.getElementById("toDate").value);
			var fromDate = document.getElementById("fromDate");
			toDate.setDate(toDate.getDate()-7);
			fromDate.value=toDate.getFullYear() + "-" + ('0'+(toDate.getMonth()+1)).slice(-2) + "-" + ('0'+(toDate.getDate())).slice(-2);
		}


		function plusMonth(){
			addTodayDate();
			var toDate = new Date(document.getElementById("fromDate").value);
			var fromDate = document.getElementById("toDate");
			toDate.setMonth(toDate.getMonth()+1);
			fromDate.value=toDate.getFullYear() + "-" + ('0'+(toDate.getMonth()+1)).slice(-2) + "-" + ('0'+(toDate.getDate())).slice(-2);
//			var fromDate = new Date(document.getElementById("fromDate").value);
//			var toDate = document.getElementById("toDate");
//			fromDate.setMonth(fromDate.getMonth() + 1);
//			toDate.value=fromDate.getFullYear() + "-" + ('0'+(fromDate.getMonth()+1)).slice(-2) + "-" + ('0'+(fromDate.getDate())).slice(-2);
		}

		function month(){
			addTodayDate2();
			var toDate = new Date(document.getElementById("toDate").value);
			var fromDate = document.getElementById("fromDate");
			toDate.setMonth(toDate.getMonth()-1);
			fromDate.value=toDate.getFullYear() + "-" + ('0'+(toDate.getMonth()+1)).slice(-2) + "-" + ('0'+(toDate.getDate())).slice(-2);
		}
	</script>
</head>
<body>
	<section class="wrap" ng-app="myApp" ng-controller="dataCtrl">
		<!-- 타이틀 -->
		<header class="header">
			<div class="box-header1">
				<div class="box-log">
					<button class="btn-alarm" ng-show="NotificationList.length!=0">
<%-- 						<span class="ico-new" ng-show="filterNotificationList.length!=0"><span class="screen-out">new</span></span> --%>
						<span class="ico-new" ng-show="newNotificationList.length!=0"><span class="screen-out">new</span></span>
					</button>
					<span class="txt-name">
						{{loginUserDetails.userName}}
<%-- 						<s:authentication property="name"/> --%>
					</span>
					<button class="btn-logout" onclick="location.href='${pageContext.request.contextPath}/mobile/spring_logout'">
						<span class="screen-out">log-out</span>
					</button>
				</div>
			</div>
			<div class="box-header2">
				<button class="btn-signal"><span class="screen-out">signal icon</span></button>
				<h1 class="tit-h1"><img src="${pageContext.request.contextPath}/mobile/img/tit_header.png" alt=""></h1>
				<button class="btn-search"><span class="screen-out">검색</span></button>
			</div>
		</header>
		<!-- //타이틀 -->
		<div class="wrap-con">
			<!-- 항목 선택 -->
			<div class="box-rad" style="display:none">
				<input type="radio" name="signalCode" id="rad1" ng-model="searchRadio" value="all"><label for="rad1" class="inp-rad">전체</label>
				<input type="radio" name="signalCode" id="rad2" ng-model="searchRadio" value="b"><label for="rad2" class="inp-rad">B</label>
				<input type="radio" name="signalCode" id="rad3" ng-model="searchRadio" value="g"><label for="rad3" class="inp-rad">G</label>
				<input type="radio" name="signalCode" id="rad4" ng-model="searchRadio" value="y"><label for="rad4" class="inp-rad">Y</label>
				<input type="radio" name="signalCode" id="rad5" ng-model="searchRadio" value="r"><label for="rad5" class="inp-rad">R</label>
			</div>
			<!-- //항목 선택 -->
			<!-- 검색 -->
			<div class="wrap-search" style="display:none">
				<div class="box-search1">
					<span class="txt-date">날짜</span>
					<input type="date" name="fromDate" id="fromDate" class="inp-date"> ~
					<input type="date" name="toDate" id="toDate" class="inp-date">
				</div>
				<div class="box-search2">
					<select name="searchCondition" id="searchCondition" class="slc-search">
						<option value="all" ng-model="search.select">전체</option>
						<option value="unit" ng-model="search.select">Unit</option>
						<option value="task" ng-model="search.select">Task</option>
						<option value="leader" ng-model="search.select">Leader</option>
						<option value="captain" ng-model="search.select">Captain</option>
					</select>
					<input type="text" name="searchKeyword" id="searchKeyword" class="inp-search" ng-model="query" kr-input/>
					<button class="btn-search1" ng-click="mainViewSearch()">검색</button>
				</div>
			</div>
<!-- 			<div class="box-search-result" style="display:none"> -->
<%-- 				<span class="txt-result1">&lsquo;15.12.01 ~ 15.12.30&rsquo;</span> 기간에 해당하는 <span class="txt-result1">&lsquo;전체&rsquo;</span> 시그널의 <span class="txt-result1">&lsquo;추천 Tip&rsquo;</span>으로 <span class="txt-result2">2건</span>의 검색 결과가 있습니다. --%>
<!-- 			</div> -->
			<div class="layer-alarm" style="display:none">
				<!-- 2016-03-08 수정 -->
				<p class="tit-notice1">알림</p>
				<!-- //2016-03-08 수정 -->
				<div class="box-alarm" id="wrapper">
					<div class="scroller">
						<ul class="lst-alarm">
							<li ng-repeat="noti in filterNotificationList">
								<dl class="dls-alarm">
									<dt>{{noti.notiCreateDate|notiDateFormat}}<br><button class="btn-trash" ng-click="deleteNotification(noti)"><span class="screen-out">휴지통</span></button></dt>
									<dd>
										<p class="txt-orange">{{noti.notiDesc}}</p>
										<p class="txt-unitname">[{{noti.notiPsitnName}}] {{noti.notiUnitName}}</p>
										<p class="txt-detail-task">{{noti.notiTaskName}}</p>
										<p class="txt-dates">일정 : {{noti.notiTaskFromDate|notiDateFormat}}~{{noti.notiTaskToDate|notiDateFormat}}</p>
									</dd>
								</dl>
							</li>
						</ul>						
					</div>
				</div>
				<button class="btn-x2" ng-click="updateNotification()"><span class="screen-out">닫기</span></button>
			</div>
			<!-- //검색 -->
			<!-- gnb -->
			<nav class="gnb">
				<ul class="lis-gnb">
					<li class="active"><a ng-click="tab(0)">전체</a></li>
					<li><a ng-click="tab(1)">한화생명</a></li>
					<li><a ng-click="tab(2)">그룹</a></li>
					<li><a ng-click="tab(3)">센터</a></li>
<!-- 					<li><a ng-click="tab(4)">DP</a></li> -->
				</ul>
			</nav>
			<!-- //gnb -->
			<!-- 전체 -->
			<div class="wrap-list" infinite-scroll="getMoreData()">
				<article class="box-menu-list" ng-repeat="x in mobileFilterList" on-finish-render='ngRepeatFinished'>
					<p class="menu-date">{{x.fromDate | resultDateFormat}}~{{x.toDate | resultDateFormat}}</p>					
					<div class="box-menu">
						<div class="box-menu-sub">	
							<table cellpadding="0" cellspacing="0" summary="프로젝트 현황" class="tbl-menu">
								<colgroup>
									<col width="74%" />
									<col width="13%" />
									<col width="13%" />
								</colgroup>						
								<tbody>
									<tr>
										<td class="detail"><span ng-class="x.alramCode == '' ? '' : 'ico-b'">[{{x.psitnName}}] <span ng-bind-html="x.unitName|highlight:query"></span></span></td>
										<td>
											<div class="progress-radial progress-{{x.progress == 100 ? x.progress : (x.progress >= 90 ? '90' : Math.ceil(x.progress/10)*10)}}">
										    <div class="overlay">{{x.progress}}%</div>
										  </div>
										</td>
										<td>											
											<button class="ico-{{x.signalCode|lowercase}}"></button>
										</td>
									</tr>
								</tbody>
							</table>						
						</div>
						<div class="box-menu-sub1">
							<div class="box-leader">
								<div class="box-leader-sub1">
									<dl class="dls-leader">
										<dt class="txt-reader"><span>L</span><span class="txt-leader-name"><span class="highlightcolor" ng-bind-html="x.leader|highlight:query"></span></span></dt>
										<dd class="rest-txt"><span class="ico-{{x.leaderStateCode}}"><span class="screen-out">재실</span></span></dd>
<!-- 										<dd><a href="mailto:{{x.leaderEmail}}" class="btn-mail"></a></dd> -->
<!-- 										<dd class="second"><a href="tel:{{x.leaderTel}}" class="btn-tel"></a></dd> -->
									</dl>
<%-- 									<p class="box-state"><span class="ico-{{x.leaderStateCode}} fl"></span><span class="fl">오전 | 오후</span></p> --%>
									
								</div>
								<div class="box-leader-sub1">
									<dl class="dls-leader">
										<dt class="txt-reader"><span>C</span><span class="txt-leader-name"><span class="highlightcolor" ng-bind-html="x.captain|highlight:query"></span></span></dt>
										<dd class="rest-txt1"><span class="ico-{{x.captainStateCode}}"><span class="screen-out">반차</span></span></span></dd>
<!-- 										<dd><a href="mailto:{{x.captainEmail}}" class="btn-mail"></a></dd> -->
<!-- 										<dd class="second"><a href="tel:{{x.captainTel}}" class="btn-tel"></a></dd> -->
									</dl>
<%-- 									<p class="box-state"><span class="ico-{{x.captainStateCode}} fl"></span><span class="fl">오전 | 오후</span></p> --%>
								</div>
								
								<div class="layer-leaders" style="display:none">
									<p class="tit-notice">리더 및 캡틴 정보</p>
									<div class="layer-box-leaders">
										<dl class="dls-leaders">
											<dt><span>L</span><span class="txt-leader-name1">{{x.leader}}</span></dt>
											<dd class="second">
												<p class="box-state1">
													<span class="ico-{{x.leaderStateCode}}_b fl"></span>
													<span class="fl">{{x.leaderStateCode=="state4" || x.leaderStateCode=="state5" ? (x.leaderStateFrom | taskDateFormat) + " ~ " + (x.leaderStateTo | taskDateFormat) : (x.leaderStateCode=="state1" ? "" : x.leaderStateTime)}}</span>
												</p>
											</dd>
											<dd>
												<a href="mailto:{{x.leaderEmail}}" class="btn-mail"></a>
												<a href="tel:{{x.leaderTel}}" class="btn-tel"></a>
											</dd>
										</dl>
										<dl class="dls-leaders">
											<dt><span>C</span><span class="txt-leader-name1">{{x.captain}}</span></dt>
											<dd class="second">
												<p class="box-state1">
													<span class="ico-{{x.captainStateCode}}_b fl"></span>
													<span class="fl">{{x.captainStateCode=="state4" || x.captainStateCode=="state5" ? (x.captainStateFrom | taskDateFormat) + " ~ " + (x.captainStateTo | taskDateFormat) : (x.captainStateCode=="state1" ? "" : x.captainStateTime)}}</span>
												</p>
											</dd>
											<dd>
												<a href="mailto:{{x.captainEmail}}" class="btn-mail"></a>
												<a href="tel:{{x.captainTel}}" class="btn-tel"></a>
											</dd>
										</dl>
									</div>
									<button class="btn-x"><span class="screen-out">닫기</span></button>
								</div>
								
							</div>
							<div class="box-list-sub" style="display:none">
								<table cellpadding="0" cellspacing="0" summary="프로젝트 현황" class="tbl-menu1">
									<colgroup>
										<col width="6%" />
										<col width="68%" />
										<col width="13%" />
										<col width="13%" />
									</colgroup>						
									<tbody>
										<tr ng-repeat="y in x.taskList" ng-class="y.progress==100 ? 'dis_end' : ''">
											<td class="first">
												<span class="ico-b1" ng-show="y.alramCode == 'B' && y.progress != '100'"></span>
											</td>
											<td class="detail">
												<a href="javascript:;" ng-class="y.progress!=100 ? 'txt-under' : ''"><span ng-bind-html="y.taskName|highlight:query"></span></a>
												<span class="txt-dates">{{y.fromDate | taskDateFormat}}~{{y.toDate | taskDateFormat}}</span>
												<div class="layer-notice" style="display:none">
													<p class="notice-titles1">[{{x.unitName}}]</p>
													<p class="notice-titles2">{{y.taskName}}</p>
													<div class="box-notice">
														<div class="scroller">
															<div class="layer-member">
																<p class="tit-notice">담당자 정보</p>
																<div class="member-sub">
																	<dl class="dls-leaders" ng-repeat="z in y.userList | filter:{repYn : 'Y'}">
																		<dt><span class="txt-leader-name2">{{z.userName}}</span></dt>
																		<dd class="second">
																			<p class="box-state1">
																				<span class="ico-{{z.userStateCode}}_b fl"></span>
																				<span class="fl">{{z.userStateCode=="state4" || z.userStateCode=="state5" ? (z.userStateFrom | taskDateFormat) + " ~ " + (z.userStateTo | taskDateFormat) : (z.userStateCode=="state1" ? "" : z.userStateTime)}}</span>
																			</p>
																		</dd>
																		<dd>
																			<a href="mailto:{{z.userEmail}}" class="btn-mail"></a>
																			<a href="tel:{{z.userTel}}" class="btn-tel"></a>
																		</dd>
																	</dl>
																	<dl class="dls-leaders" ng-repeat="z in y.userList | filter:{repYn : 'N'}">
																		<dt><span class="txt-leader-name3">{{z.userName}}</span></dt>
																		<dd class="second">
																			<p class="box-state1">
																				<span class="ico-{{z.userStateCode}}_b fl"></span>
																				<span class="fl">{{z.userStateCode=="state4" || z.userStateCode=="state5" ? (z.userStateFrom | taskDateFormat) + " ~ " + (z.userStateTo | taskDateFormat) : (z.userStateCode=="state1" ? "" : z.userStateTime)}}</span>
																			</p>
																		</dd>
																		<dd>
																			<a href="mailto:{{z.userEmail}}" class="btn-mail"></a>
																			<a href="tel:{{z.userTel}}" class="btn-tel"></a>
																		</dd>
																	</dl>
																</div>															
															</div>	
															<p class="tit-notice" ng-hide="y.issueText == ''">Issue</p>
															<div class="issue-sub" ng-hide="y.issueText == ''">
																{{y.issueText}} 
															</div>
															<p class="tit-notice" ng-show="y.alramCode == 'B'">보고사항</p>
															<table cellpadding="0" cellspacing="0" summary="보고사항" class="tbl-notice" ng-show="y.alramCode == 'B'">
																<colgroup>
																	<col width="20%" />
																	<col width="80%" />
																</colgroup>
																<tbody>
																	<tr>
																		<th>보고일시</th>
																		<td>
																			<div class="clefix">
																				<span class="fl mR5">{{y.repoDate|resultDateFormat}} {{y.repoDateHour}}시 {{y.repoDateMin}}분</span>
																				<span ng-class="y.confirmYn=='Y' ? 'ico-ok' : ''" class="fl"><span class="screen-out">확정</span></span>
																			</div>
																		</td>
																	</tr>
																	<tr>
																		<th>보고자</th>
																		<td>{{y.repoUserCode}}</td>
																	</tr>
																	<tr>
																		<th>참석자</th>
																		<td>{{y.repoMembers}}</td>
																	</tr>
																	<tr>
																		<th>보고내용</th>
																		<td>{{y.repoDesc}}</td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>
													<button class="btn-x"><span class="screen-out">닫기</span></button>
												</div>	
											</td>
											<td>
												<div class="progress-radial progress-{{y.progress == 100 ? y.progress : (y.progress >= 90 ? '90' : Math.ceil(y.progress/10)*10)}}">
												    <div class="overlay">{{y.progress}}%</div>
												  </div>
											</td>
											<td>
												<button class="ico-{{y.signalCode|lowercase}}s"></button>
											</td>
										</tr>
									</tbody>
								</table>						
							</div>
						</div>
						<div class="box-task">
							<button class="btn-task">
								Task <span class="ico-down"></span>
							</button>
						</div>
					</div>
				</article>
				<div class="box-menu" ng-show="lastScrollView" style="color:#fff; text-align:center; padding-bottom:0px;">마지막 리스트입니다.</div>
			</div>
			<!-- //전체 -->
		</div>
	</section>
	<div class="layer-signal">
		<img src="${pageContext.request.contextPath}/mobile/img/guide.png" alt="">
		<button class="btn-x1"><span class="screen-out">닫기</span></button>
	</div>
	<div id="backgroundPopup1" style="display:none"></div>
	<div id="backgroundPopup2" style="display:none"></div>
	<div id="backgroundPopup" style="display:none"></div>
	
</body>
</html>




