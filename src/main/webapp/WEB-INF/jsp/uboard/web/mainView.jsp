<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/security/tags" %>
<!-- 이 방식으로는 안됨 --------------------------------------------- -->
<%-- <% pageContext.setAttribute("newLine", "\n"); %> --%>
<%-- <jsp:scriptlet>
    pageContext.setAttribute("cr", "\r");
    pageContext.setAttribute("lf", "\n");
    pageContext.setAttribute("crlf", "\r\n");
</jsp:scriptlet> --%>
<!-- ------------------------------------------------------------ -->
<c:set var="newLine" value="\n" />
<%
  /**
  * @Class Name : egovSampleList.jsp
  * @Description : Sample List 화면
  * @Modification Information
  *
  *   수정일         수정자                   수정내용
  *  -------    --------    ---------------------------
  *  2009.02.01            최초 생성
  *
  * author 실행환경 개발팀
  * since 2009.02.01
  *
  * Copyright (C) 2009 by MOPAS  All right reserved.
  */
%>
<!doctype html>
<html>
<head>
	<title>UBoard-Web</title>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- 	<meta name="apple-mobile-web-app-capable" content="yes" /> -->
<!--     <meta names="apple-mobile-web-app-status-bar-style" content="black-translucent" /> -->
	<!--  favicon favilite -->
    <link rel="shortcut icon" href="${pageContext.request.contextPath}/img/icon_180.png">
    <link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/img/Android_02.png">
	<link rel="apple-touch-icon-precomposed" href="${pageContext.request.contextPath}/img/iOS_02.png" />
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="${pageContext.request.contextPath}/img/iOS_02.png" />
	<link rel="apple-touch-icon-precomposed" sizes="76x76" href="${pageContext.request.contextPath}/img/apple-touch-icon-76x76.png" />
	<link rel="apple-touch-icon-precomposed" sizes="152x152" href="${pageContext.request.contextPath}/img/apple-touch-icon-152x152.png" />
	<link rel="apple-touch-icon-precomposed" sizes="167x167" href="${pageContext.request.contextPath}/img/apple-touch-icon-167x167.png" />
	<!--  //favicon favilite -->
	
<!-- 	<link  rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"> -->
<%--   <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.10/angular.js"></script> --%>
<!--   <link data-require="bootstrap-css@3.1.1" data-semver="3.1.1" rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" /> -->
<%--   <script data-require="angular.js@1.3.0" data-semver="1.3.0" src="https://code.angularjs.org/1.3.0/angular.js"></script> --%>
<%--   <script data-require="jquery@*" data-semver="2.0.3" src="http://code.jquery.com/jquery-2.0.3.min.js"></script> --%>
<%--   <script data-require="bootstrap@3.1.1" data-semver="3.1.1" src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script> --%>

<%-- 	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/bootstrap.min-3.1.1.css"> --%>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/common.css" />
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.8.3.min.js"></script>
<%-- 	<script src="${pageContext.request.contextPath}/js/angular-1.2.10.min.js"></script>	 --%>
	<script src="${pageContext.request.contextPath}/js/angular-1.4.8.min.js"></script>	
	<script src="${pageContext.request.contextPath}/js/angular-route-1.4.8.min.js"></script>		
	<script src="${pageContext.request.contextPath}/js/ui-bootstrap-tpls-0.11.0.js"></script>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/pie-chart.js" ></script> --%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/icheck.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-module.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-dataCtrl.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-PaginationCtrl.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/FileSaver.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/mainView.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/angular.easypiechart.min.js"></script>
	<%-- <script defer src="${pageContext.request.contextPath}/js/common.js"></script> --%>
	<script src="${pageContext.request.contextPath}/js/ng-infinite-scroll-1.2.2.min.js"></script>
	<script>
		var ctx = "${pageContext.request.contextPath}"
		function getContextPath() { return ctx;	}
		var urlList = [  "${pageContext.request.contextPath}/tv/mainViewB1.do"
		            ,"${pageContext.request.contextPath}/tv/mainViewB2.do"
		            ,"${pageContext.request.contextPath}/tv/mainViewB3.do"
		            ,"${pageContext.request.contextPath}/tv/mainViewB4.do"
		            ];
		function openTvWindows() { for( i in urlList) window.open (urlList[i]);	}
	</script>
</head>
<body>
<div class="wrap" id="wrap" ng-app="myApp" ng-controller="dataCtrl">
	<div class="header">
		<div class="box-login">
			<div class="box-log">
				<button class="txt-name" onclick=openTvWindows() ng-show="loginUserDetails.unitAuthorities == 'POWERUSER'">TV Page&nbsp;&nbsp;</button>
				<button class="txt-name" onclick="location.href='${pageContext.request.contextPath}/admin/mainView.do'">Admin Page&nbsp;&nbsp;</button>
				<span class="button-alarm">
<%-- 					<button class="ico-new" ng-show="filterNotificationList.length!=0"><span class="screen-out">new</span></button> --%>
					<button class="ico-new" ng-show="newNotificationList.length!=0"><span class="screen-out">new</span></button>
					<button><span class="screen-out">new</span></button>
				</span>
				<span class="txt-name">
					{{loginUserDetails.userName}}
<%-- 					<s:authentication property="name"/> --%>
				</span>
				<button class="btn-logout" onclick="location.href='${pageContext.request.contextPath}/j_spring_security_logout'">
					<!-- <span class="screen-out">log-out</span> -->
				</button>
			</div>
			<!-- 2016-02-23 수정 -->
			<div class="layer-alarm" style="display:none">
				<p class="tit-notice1">알림</p>
				<div class="box-alarm">
					<ul class="lst-alarm">
						<li ng-repeat="noti in filterNotificationList">
							<dl class="dls-alarm">
								<dt>{{noti.notiCreateDate|notiDateFormat}}<br><button class="btn-trash" ng-click="deleteNotification(noti)" ><span class="screen-out">휴지통</span></button></dt>
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
				<button class="btn-x" ng-click="updateNotification()"><span class="screen-out">닫기</span></button>
			</div>
			<!-- //2016-02-23 수정 -->			
		</div>
		<h1><img src="${pageContext.request.contextPath}/img/tit_condition.png" alt="프로젝트 추진 현황 B:보고사항있음, G:진행상태 양호, Y: 이슈해소 진행 중, R : 이슈발생"></h1>
	</div>

	<div class="wrap-main">
		<!-- 검색 요소 -->
		<div class="box-search">
			<!-- 2016-03-30 수정 -->
			<table cellpadding="0" cellspacing="0" summary="search" class="tbl-admin">						
					<colgroup>
						<col width="318">
						<col width="304">
						<col width="398">
						<col width="100">
					</colgroup>											
					<tbody>
						<tr>
							<th>시그널</th>
							<th class="bd-l">
								날짜
								<button class="btn-week" onClick="javascript:week();"><span class="screen-out">일주일</span></button>
								<button class="btn-month" onClick="javascript:month();"><span class="screen-out">한달</span></button>
							</th>
							<th class="bd-l">키워드</th>
							<th rowspan="2" class="searchs">								
								<button class="btn-search1" ng-click="mainViewSearch()"><span class="screen-out">검색</span></button>	
							</th>
						</tr>
						<tr>							
							<td>
								<input type="radio" name="signalCode" id="type1" ng-model="searchRadio" value="all"><label for="type1" class="lab_rad-first">전체</label>
								<input type="radio" name="signalCode" id="type2" ng-model="searchRadio" value="b"><label for="type2" class="lab_rad">B</label>
								<input type="radio" name="signalCode" id="type3" ng-model="searchRadio" value="g"><label for="type3" class="lab_rad">G</label>
								<input type="radio" name="signalCode" id="type4" ng-model="searchRadio" value="y"><label for="type4" class="lab_rad">Y</label>
								<input type="radio" name="signalCode" id="type5" ng-model="searchRadio" value="r"><label for="type5" class="lab_rad-last">R</label>
							</td>
							<td class="bd-l">
								<input type="text" name="fromDate" id="fromDate" class="inp-date datepicker"> ~
								<input type="text" name="toDate" id="toDate" class="inp-date datepicker">
							</td>
							<td class="bd-l">
								<select name="searchCondition" id="searchCondition" class="slc-search">
									<option value="all" ng-model="search.select">전체</option>
									<option value="unit" ng-model="search.select">Unit</option>
									<option value="task" ng-model="search.select">Task</option>
									<option value="leader" ng-model="search.select">Leader</option>
									<option value="captain" ng-model="search.select">Captain</option>
								</select>
								<input type="text" name="searchKeyword" id="searchKeyword" class="inp-search" ng-model="query" kr-input/>
							</td>
						</tr>
					</tbody>
				</table>
				<!-- //2016-03-30 수정 -->
		</div>
<!-- 		<div class="box-search-result" style="display:block"> -->
<%-- 			<span class="txt-result1">&lsquo;15.12.01 ~ 15.12.30&rsquo;</span> 기간에 해당하는 <span class="txt-result1">&lsquo;전체&rsquo;</span> 시그널의 <span class="txt-result1">&lsquo;추천 Tip&rsquo;</span>으로 <span class="txt-result2">2건</span>의 검색 결과가 있습니다.{{searchRadio}} --%>
<!-- 		</div> -->
		<!-- //검색 요소 -->
		<div class="wrap-contents">
			<!-- 리스트 GNB -->
			<div class="gnb">
				<ul class="lst-gnb">
					<li class="active"><a ng-click="tab(0)" class="first">전체</a></li>
					<li><a ng-click="tab(1)">한화생명</a></li>
					<li><a ng-click="tab(2)">그룹</a></li>
					<li><a ng-click="tab(3)">센터</a></li>
<!-- 					<li><a ng-click="tab(4)">DP</a></li> -->
				</ul>
			</div>
			<!-- //리스트 GNB -->
			<!-- 리스트 -->
<!-- 			<div class="box-list" ng-controller="PaginationCtrl"> -->
			<div class="box-list" >
								<!-- NG-TEST -->

				<div id="list5" class="box-lists">
<!-- 				<div id="list5" class="box-lists" style="display:none"> -->
					<table cellpadding="0" cellspacing="0" summary="프로젝트 현황" class="tbl-menu">
						<colgroup>
							<col width="8%" />
							<col width="36%" />
							<col width="9%" />
							<col width="9%" />
							<col width="24%" />
							<col width="14%" />
						</colgroup>
						<thead>
							<tr>
								<th>소속</th>
								<th>Unit</th>
								<th>Progress</th>
								<th>Signal</th>
								<th>Leader / Captain</th>
								<th>Schedule</th>
							</tr>
						</thead>
						<!--<tbody ng-repeat="x in result | filter:searchTest">-->
						<tbody class="tbodyrepeat" >
								<tr ng-repeat-start="x in filterList | start: (currentPage - 1) * itemsPerPage | limitTo: itemsPerPage" on-finish-render='ngRepeatFinished'>
								<td>{{x.psitnName}}</td>
<%-- 								<td class="unit"><span ng-class="x.alramCode == '' ? '' : 'ico-b'"></span><span ng-bind-html="x.unitName|highlight:query"></span><button ng-class=" isUnFold[index] ? 'btn-up btn-down' : 'btn-up'" ng-click="toggleFolding(index)"><span class="screen-out">펼침 닫힘버튼</span></button></td> --%>
								<td class="unit"><span ng-class="x.alramCode == '' ? '' : 'ico-b'"></span><span ng-bind-html="x.unitName|highlight:query"></span><button class="btn-up"><span class="screen-out">펼침 닫힘버튼</span></button></td>
								<td>
<!-- 								 <div class="pie-title-center demo-pie-1" data-percent="{{x.progress}}"> -->
								 <div class="pie-title-center demo-pie-1" easypiechart options="options" percent="x.progress">
								 	<span class="pie-value"></span>
								 </div>
								</td>
								<td>
									<span class="ico-{{x.signalCode|lowercase}}"></span>
								</td>
								<td class="leader">
									<div class="po-r clefix">
										<span class="txt-leader-l clefix">
											<span class="fl txt-leader-ls"><span ng-bind-html="x.leader|highlight:query"></span></span>
											<span class="ico_{{x.leaderStateCode}} fl"></span>
											<span class="fl">{{x.leaderStateCode=="state4" || x.leaderStateCode=="state5" ? (x.leaderStateFrom | taskDateFormat) + " ~ " + (x.leaderStateTo | taskDateFormat) : (x.leaderStateCode=="state1" ? "" : x.leaderStateTime)}}</span>
											<div class="layer-contact">
												<p class="tit-layer-leader">리더 정보</p>
												<div class="contact-sub">
													<span class="tit-contact">{{x.leader}}</span>
													<span class="email">{{x.leaderEmail}}</span>
													<span class="tel">{{x.leaderTel}}</span>
												</div>
												<button class="btn-x"><span class="screen-out">닫기</span></button>
											</div>
										</span><br>
										<span class="txt-leader-c clefix">
											<span class="fl txt-leader-cs"><span ng-bind-html="x.captain|highlight:query"></span></span>
											<span class="ico_{{x.captainStateCode}} fl"></span>
											<span class="fl">{{x.captainStateCode=="state4" || x.captainStateCode=="state5" ? (x.captainStateFrom | taskDateFormat) + " ~ " + (x.captainStateTo | taskDateFormat) : (x.captainStateCode=="state1" ? "" : x.captainStateTime)}}</span>
											<div class="layer-contact">
												<p class="tit-layer-leader">캡틴 정보</p>							
												<div class="contact-sub">
													<span class="tit-contact">{{x.captain}}</span>
													<span class="email">{{x.captainEmail}}</span>
													<span class="tel">{{x.captainTel}}</span>
												</div>
												<button class="btn-x"><span class="screen-out">닫기</span></button>
											</div>
										</span>

									</div>
								</td>
								<td>{{x.fromDate | resultDateFormat}}~<br>{{x.toDate | resultDateFormat}}</td>
							</tr>

								<tr style="display:none" ng-repeat-end>
<!-- 								<tr ng-repeat-end ng-show="isUnFold[index]"> -->
								<td colspan="6" class="sublist" >
									<table cellpadding="0" cellspacing="0" summary="프로젝트 현황" class="tbl-menu1">
										<colgroup>
											<col width="5%" />
											<col width="39%"/>
											<col width="9%" />
											<col width="9%" />
											<col width="24%" />
											<col width="14%" />
										</colgroup>
										<tbody>
<!-- 											<tr class="dis_end" ng-repeat="y in x.taskList"> -->
											<tr ng-repeat="y in x.taskList" ng-class="y.progress==100 ? 'dis_end' : ''">
												<td class="firsts">
													<div class="po-r">
														<span class="ico-b1" ng-show="y.alramCode == 'B' && y.progress != '100'"></span>
													</div>
												</td>
												<td class="unit">
													<span ng-class="y.progress==100 || (y.issueText == '' && y.alramCode != 'B') ? '' : 'txt-links'"><span ng-bind-html="y.taskName|highlight:query"></span></span>
													<div class="layer-notice" style="display:none">
															<p class="tit-notice-teamname">{{x.unitName}}</p>
															<p class="tit-notice-titles">{{y.taskName}}</p>
															<div class="layer-notice-boxs">
																<p class="tit-notice" ng-hide="y.issueText == ''">Issue</p>
																<div class="box-issues" ng-hide="y.issueText == ''">
																	{{y.issueText}}
																</div>
																<p class="tit-notice" ng-show="y.alramCode == 'B'">보고사항</p>
																<div class="box-notice" ng-show="y.alramCode == 'B'">
																	<table cellpadding="0" cellspacing="0" summary="보고사항" class="tbl-notice">
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
													<div class="pie-title-center demo-pie-2" easypiechart options="options2" percent="y.progress">
													 	<span class="pie-value"></span>
													 </div>
												</td>
												<td>
													<div class="po-r">
														<span class="ico-{{y.signalCode|lowercase}}s" ng-hide="{{y.progress}} == '100'"></span>
														<div class="layer-issue">
															<p class="tit-notice">issue</p>
															<div class="issue-sub">
																<div class="txt-issue">
																	{{y.issueText}}
																</div>
															</div>
															<button class="btn-x"><span class="screen-out">닫기</span></button>
														</div>
														<span ng-show="{{y.progress}} == '100'">완료</span>														
													</div>
												</td>
												<td class="leader">
													<div class="po-r">
														<span class="fl mR5 txt-team" ng-repeat="z in y.userList | filter:{repYn : 'Y'}"><span ng-bind-html="z.userName|highlight:query"></span></span>
														<span class="ico_{{z.userStateCode}}s fl" ng-repeat="z in y.userList | filter:{repYn : 'Y'}" ng-hide="{{y.progress}} == '100'"></span>
														<span class="fl" ng-repeat="z in y.userList | filter:{repYn : 'Y'}" ng-hide="{{y.progress}} == '100'">{{z.userStateCode=="state4" || z.userStateCode=="state5" ? (z.userStateFrom | taskDateFormat) + "-" + (z.userStateTo | taskDateFormat) : (z.userStateCode=="state1" ? "" : z.userStateTime)}}</span>
														<br>
														<span class="teams" ng-hide="y.userList.length <= 1">팀원 {{y.userList.length-1  | numberFixedLen:2}}명</span>
														<div ng-class="y.progress==100 ? '' : 'layer-member'" style="display:none">
															<p class="tit-clerk">담당자 정보</p>
															<div class="member-sub">
																<ul class="list-member">
																	<li ng-repeat="z in y.userList | filter:{repYn : 'Y'}">
																		<dl class="dls-member">
																			<dt class="readers">
																				{{z.userName}}
																			</dt>
																			<dd><span class="email">{{z.userEmail}}</span></dd>
																			<dd><span class="tel">{{z.userTel}}</span></dd>
																		</dl>
																	</li>
																	<li ng-repeat="z in y.userList | filter:{repYn : 'N'}">
																		<dl class="dls-member">
																			<dt>{{z.userName}}</dt>
																			<dd><span class="email">{{z.userEmail}}</span></dd>
																			<dd><span class="tel">{{z.userTel}}</span></dd>
																		</dl>
																	</li>
																</ul>
															</div>
															<button class="btn-x"><span class="screen-out">닫기</span></button>												
														</div>
													</div>
												</td>
												<td>{{y.fromDate | taskDateFormat}} ~ {{y.toDate | taskDateFormat}}</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>


						</tbody>
					</table>
				</div>

				<!-- //NG-TEST -->
			View <select ng-model="viewby" ng-change="setItemsPerPage(viewby)" class="slc-view"  ng-options="v for v in paginationViewbys"></select> records at a time.
						<div class="wrap-paging">
							<div class="box-paging">
								<!-- 			<pagination total-items="result.length" ng-model="currentPage" ng-change="pageChanged()" class="" items-per-page="itemsPerPage" boundary-links="true" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></pagination> -->
<!-- 								<pagination total-items="result.length" ng-model="currentPage" -->
<!-- 									ng-change="pageChanged()"  -->
<!-- 									items-per-page="itemsPerPage" boundary-links="true" -->
<!-- 									previous-text="&lsaquo;" next-text="&rsaquo;" -->
<!-- 									first-text="&laquo;" last-text="&raquo;"></pagination> -->
								<pagination total-items="filterList.length" ng-model="currentPage"
									ng-change="pageChanged()" 
									items-per-page="itemsPerPage" boundary-links="true" rotate="false" num-pages="numPages" max-size="maxSize"
									previous-text="&lsaquo;" next-text="&rsaquo;"
									first-text="&laquo;" last-text="&raquo;"></pagination>
									
<!--             <pagination total-items="filterList.length" items-per-page="pageSize" ng-model="currentPage" max-size="5" class="pagination-sm"></pagination> -->
							</div>
							<div class="box-print">
								<button class="btn-excel" ng-click="excelExport()"></button>
							</div>
						</div>
<!-- 						<pre>The selected page no: {{currentPage}}</pre> -->
<!-- 	    <button class="btn btn-info" ng-click="setPage(1)">Set current page to: 1</button> -->
<!-- 			<hr /> -->
<!-- 	    <h4>Pager</h4> -->
<!-- 	    <pager total-items="result.length" ng-model="currentPage" items-per-page="itemsPerPage"></pager> -->
<!-- 	    <hr /> -->
<!-- 	    <h4>Limit the maximum visible buttons</h4> -->
<!-- 	    <pagination total-items="result.length" ng-model="currentPage" max-size="maxSize" class="pagination-sm" boundary-links="true" items-per-page="itemsPerPage"></pagination> -->
<!-- 	    <pagination total-items="result.length" ng-model="currentPage" max-size="maxSize" class="pagination-sm" boundary-links="true" rotate="false" num-pages="numPages" items-per-page="itemsPerPage"></pagination> -->
<!-- 	    <pre>Page: {{currentPage}} / {{numPages}}</pre> -->

			<!-- //리스트 -->
		</div>
	</div>
</div>
<div id="backgroundPopup" style="display:none"></div>
</body>
</html>
