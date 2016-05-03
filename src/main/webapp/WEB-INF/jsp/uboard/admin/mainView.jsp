<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/security/tags" %>
<c:set var="newLine" value="\n" />
<!doctype html>
<html>
<head>
	<title>UBoard-Admin</title> 
	<meta charset="utf-8" />
	<!-- <meta charset="utf-8" /> -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/admin/css/common.css" />
	<script type="text/javascript" src="${pageContext.request.contextPath}/admin/js/jquery-1.8.3.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/angular-1.4.8.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/angular-route-1.4.8.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/pie-chart.js" ></script>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/admin/js/icheck.min.js"></script> --%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/admin/js/common.js"></script>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common.js"></script> --%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-module.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-dataCtrl.js"></script>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-regCtrl.js"></script> --%>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-PaginationCtrl.js"></script> --%>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-ctrl.js"></script> --%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/FileSaver.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/mainView.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/angular.easypiechart.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/ui-bootstrap-tpls-0.11.0.js"></script>
	<script src="${pageContext.request.contextPath}/js/ng-infinite-scroll-1.2.2.min.js"></script>
	<script>var ctx = "${pageContext.request.contextPath}"
			function getContextPath(){
	 		   return ctx;
			}
	</script>
</head>
<body ng-app="myApp" ng-controller="dataCtrl">
<div class="wrap">
	<!-- 2016-03-28 수정 -->
	<div class="header">		
		<h1 class="tit-admin">
			<a href="${pageContext.request.contextPath}/admin/mainView.do"><img src="${pageContext.request.contextPath}/admin/img/tit_admin.png" alt="프로젝트 현황판 관리자"></a>
			<button class="btn-manage" ng-click="btnManage()"><span class="screen-out">담당자관리</span></button>
		</h1>
		<div class="box-log">
			<button class="txt-name" onclick="location.href='${pageContext.request.contextPath}/web/mainView.do'">User Page&nbsp;&nbsp;</button>
			<span class="button-alarm">
				<button class="ico-new" ng-show="newNotificationList.length!=0"><span class="screen-out">new</span></button>
			</span>
			<span class="txt-name">
				{{loginUserDetails.userName}}
			</span>
			<button class="btn-logout" onclick="location.href='${pageContext.request.contextPath}/j_spring_security_logout'">
				<span class="screen-out">log-out</span>
			</button>
		</div>
	</div>
	<!-- //2016-03-28 수정 -->	
	<div class="wrap-main">
		<!-- 검색 요소 -->
		<div class="box-search">
			<div class="box-date-search">
				<table cellpadding="0" cellspacing="0" summary="search" class="tbl-admin">
					<!-- 2016-03-29 수정 -->	
					<colgroup>
						<col width="120">
						<col width="460">
						<col width="120">
						<col width="230">
						<col width="140">
						<col width="100">
					</colgroup>
					<!-- //2016-03-29 수정 -->
					<tbody>
						<tr>
							<th>소속</th>
							<td>
								<input type="radio" name="psitnCode" id="type1" value="all" ng-model="search.psitnCode" ng-value="all"> <label for="type1" class="lab_rad">전체</label>
								<input type="radio" name="psitnCode" id="type2" value="1" ng-model="search.psitnCode"> <label for="type2" class="lab_rad">한화생명</label>
								<input type="radio" name="psitnCode" id="type3" value="2" ng-model="search.psitnCode"> <label for="type3" class="lab_rad">그룹</label>
								<input type="radio" name="psitnCode" id="type4" value="3" ng-model="search.psitnCode"> <label for="type4" class="lab_rad">센터</label>
<!-- 								<input type="radio" name="psitnCode" id="type5" value="4" ng-click="tab(4)"><label for="type5" class="lab_rad">DP</label> -->
							</td>
							<th>Signal</th>
							<td>
							<!-- 2016-03-29 수정 -->
								<input type="radio" name="signalCode" id="mode1" value="all" ng-model="search.signalCode" ng-value="all"> <label for="mode1" class="lab_rad">전체</label>
								<input type="radio" name="signalCode" id="mode2" value="g" ng-model="search.signalCode" value="G"> <label for="mode2" class="lab_rad">G</label>
								<input type="radio" name="signalCode" id="mode3" value="y" ng-model="search.signalCode" value="Y"> <label for="mode3" class="lab_rad">Y</label>
								<input type="radio" name="signalCode" id="mode4" value="r" ng-model="search.signalCode" value="R"> <label for="mode4" class="lab_rad"> R</label>
							</td>
							<th>
								보고사항 있음
							</th>
							<td class="ta-c">
								<input type="checkbox" name="" id="noti" class="" ng-model="search.alramCode" ng-true-value="'B'" ng-false-value="''"><label for="noti" class="inp-chk">B</label>
							</td>
							<!-- //2016-03-29 수정 -->
						</tr>
						<tr>
							<th>날짜</th>
							<td>
								<input type="text" name="fromDate" id="fromDate" class="inp-date datepicker"> ~
								<input type="text" name="toDate" id="toDate" class="inp-date datepicker">
								<button class="btn-week" onClick="javascript:week();"><span class="screen-out">일주일</span></button>
								<button class="btn-month" onClick="javascript:month();"><span class="screen-out">한달</span></button>
							</td>
							<th>
								노출여부
							</th>
							<td colspan="3">
								<input type="radio" name="showYn" id="types1" ng-model="search.showYn" value="all" ng-value="all"> <label for="types1" class="lab_rad">전체</label>
								<input type="radio" name="showYn" id="types2" ng-model="search.showYn" value="Y"> <label for="types2" class="lab_rad">Y</label>
								<input type="radio" name="showYn" id="types3" ng-model="search.showYn" value="N"> <label for="types3" class="lab_rad">N</label>
							</td>
						</tr>
						<tr>
							<th>내용</th>
							<td colspan="5">
								<select name="searchCondition" id="searchCondition" class="slc-search">
									<option value="all" ng-model="search.select">전체</option>
									<option value="unit" ng-model="search.select">Unit</option>
									<option value="task" ng-model="search.select">Task</option>
									<option value="leader" ng-model="search.select">Leader</option>
									<option value="captain" ng-model="search.select">Captain</option>
								</select>
								<input type="text" name="searchKeyword" id="searchKeyword" class="inp-search" ng-model="query" kr-input>
								<button class="btn-search" ng-click="adminSearch()"><span class="screen-out">검색</span></button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- //검색 요소 -->
		<div class="wrap-contents">
			<div class="box-contents">
				<p class="box-slc-count">
				<select ng-model="viewby" ng-change="setItemsPerPage(viewby)" class="slc-count" ng-options="v+'개씩 보기' for v in paginationViewbys">
				</select>
				</p>
				<table cellpadding="0" cellspacing="0" summary="현황판결과" class="tbl-admin1">
					<colgroup>
						<col width="60">
						<col width="100">
						<col width="350">
						<col width="70">
						<col width="70">
						<col width="70">
						<col width="80">
						<col width="180">
						<col width="100">
						<col width="80">
					</colgroup>
					<thead>
						<tr>
							<th>No.</th>
							<th>소속</th>
							<th>Unit</th>
							<th>Signal</th>
							<th>Leader</th>
							<th>Captain</th>
							<th>노출여부</th>
							<th>Schedule</th>
							<th>수정 일자</th>
							<th>수정</th>
						</tr>
					</thead>
					<tbody>
<!-- 						<tr ng-repeat="(index, x) in filterList | start: (currentPage - 1) * itemsPerPage | limitTo: itemsPerPage | orderBy:'-idUnit'" on-finish-render> -->
						<tr ng-repeat="(index, x) in filterList | start: (currentPage - 1) * itemsPerPage | limitTo: itemsPerPage" on-finish-render>
							<td>{{index+1 +(currentPage - 1) * itemsPerPage}}</td>
							<td>{{x.psitnName}}</td>
							<td class="unit">{{x.unitName}}</td>
<!-- 							<td class="unit">{{x.unitName}} [{{x.taskList.length}}]</td> -->
							<td><span class="txt-{{x.signalCode | lowercase}}">{{x.signalCode}}</span></td>
							<td>{{x.leader}}</td>
							<td>{{x.captain}}</td>
							<td>{{x.showYn}}</td>
							<td>{{x.fromDate | resultDateFormat}}~{{x.toDate | resultDateFormat}}</td>
							<td>{{x.updatedDate | regDateFormat}}</td>
<%-- 							<td><button class="btn-modify" ng-click="goDetail(x.idUnit)"><span class="screen-out">수정</span></button></td> --%>
<%-- 							<td><button class="btn-modify" ng-click="$location.path('${pageContext.request.contextPath}/admin/unitRegister.do')"><span class="screen-out">수정</span></button></td> --%>
							<td><button class="btn-modify" ng-click="redirect(x.idUnit)"><span class="screen-out">수정</span></button></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="box-print">
<%-- 				<a href="javascript:;" class="btn-list"><span class="screen-out">보고사항 리스트</span></a> --%>
				<a href="unitRegister.do" class="btn-add" ng-show="unitWritingAuth"><span class="screen-out">신규 등록</span></a>
				<button style="float:left" ng-hide="true" ng-json-export-excel data="filterList" report-fields="{psitnName: '소속', unitName: 'Unit', progress: '진행률(%)', signalCode: 'Signal', leader: 'Leader', captain: 'captain', fromDate: 'fromDate', toDate: 'toDate'}" filename="'HPD-data'">Export Excel</button>
			</div>
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
					</div>
				</div>
		</div>
	</div>
</div>
<!-- 보고사항 리스트 -->
<div class="layer-notice" style="display:none">
	<div class="layer-title-box">
		<h4 class="tit-notice"><span>보고사항</span> 리스트</h4>
		<button class="btn-layer-x"><span class="screen-out">닫기</span></button>
	</div>
	<div class="box-layer-body">
		<table cellpadding="0" cellspacing="0" summary="보고사항" class="tbl-admin1 mB20">
			<colgroup>
				<col width="60">
				<col width="90">
				<col width="190">
				<col width="80">
				<col width="80">
				<col width="360">
				<col width="100">
				<col width="60">
			</colgroup>
			<thead>
				<tr>
					<th>No.</th>
					<th>소속</th>
					<th>Unit</th>
					<th>보고자</th>
					<th>참석자</th>
					<th>보고내용</th>
					<th>보고일시</th>
					<th>확정</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="(index ,report) in filterReportList  | start: (reportListCurrentPage - 1) * reportListItemsPerPage | limitTo: reportListItemsPerPage">
					<td>{{index+1}}</td>
					<td>{{report.psitnName}}</td>
					<td class="unit">{{report.unitName}}</td>
					<td>{{report.userName}}</td>
					<td>{{report.repoMembers}}</td>
					<td>{{report.repoDesc}}</td>
<!-- 					<td>{{report.repoDate | taskDateFormat}} {{report.repoDateHour}}:{{report.repoDateMin}}</td> -->
					<td><span ng-class="report.confirmYn=='Y' ? '' : 'txt-under'" ng-click="getReportData(report.idReport)">{{report.repoDate | taskDateFormat}} {{report.repoDateHour}}:{{report.repoDateMin}}</span></td>
					<td><input type="checkbox" name="" id="" ng-model="report.confirmYn" ng-click="isReportConfirmSelected(report)" ng-true-value="'Y'" ng-false-value="'N'"></td>
					
				</tr>
			</tbody>
		</table>
<%-- 			View <select ng-model="reportListViewby" ng-change="reportListSetItemsPerPage(reportListViewby)" class="slc-view"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>10</option><option>20</option><option>30</option><option>40</option><option>50</option></select> records at a time. --%>
						<div class="wrap-paging">
							<div class="box-paging">
								<!-- 			<pagination total-items="result.length" ng-model="currentPage" ng-change="pageChanged()" class="" items-per-page="itemsPerPage" boundary-links="true" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></pagination> -->
<!-- 								<pagination total-items="result.length" ng-model="currentPage" -->
<!-- 									ng-change="pageChanged()"  -->
<!-- 									items-per-page="itemsPerPage" boundary-links="true" -->
<!-- 									previous-text="&lsaquo;" next-text="&rsaquo;" -->
<!-- 									first-text="&laquo;" last-text="&raquo;"></pagination> -->
								<pagination total-items="filterReportList.length" ng-model="reportListCurrentPage"
									ng-change="reportListPageChanged()" 
									items-per-page="reportListItemsPerPage" boundary-links="true" rotate="false" num-pages="numPages" max-size="reportListMaxSize"
									previous-text="&lsaquo;" next-text="&rsaquo;"
									first-text="&laquo;" last-text="&raquo;"></pagination>
							</div>
						</div>		
		<!-- 보고사항 리스트 페이징 -->
<!-- 		<div  class="wrap-paging"> -->
<!-- 			<div class="box-paging"> -->
<!-- 				<a href="#" class="btn-prev2"></a> -->
<!-- 				<a href="#" class="btn-prev1"></a> -->
<!-- 				<a href="#">1</a> -->
<!-- 				<a href="#" class="on">2</a> -->
<!-- 				<a href="#">3</a> -->
<!-- 				<a href="#">4</a> -->
<!-- 				<a href="#">5</a> -->
<!-- 				<a href="#" class="btn-next1"></a> -->
<!-- 				<a href="#" class="btn-next2"></a> -->
<!-- 			</div> -->
<!-- 		</div> -->
		<!-- //보고사항 리스트 페이징 -->
	</div>
</div>
<!-- //보고사항 리스트 -->
<!-- 담당자 리스트 -->
<div class="layer-member" style="display:none">
	<div class="layer-title-box">
		<h4 class="tit-notice"><span>담당자</span> 리스트</h4>
		<button class="btn-layer-x"><span class="screen-out">닫기</span></button>
	</div>
	<div class="box-layer-body">
		<div>
			<table cellpadding="0" cellspacing="0" class="tbl-admin2" summary="담당자 검색">
				<colgroup>
					<col width="150">
					<col width="350">
					<col width="110">
				</colgroup>
				<tbody>
					<tr>
						<td>
							<select name="" id="searchUserListCondition" class="slc-search">
								<option value="all">전체</option>
								<option value="userName">이름</option>
							</select>
						</td>
						<td class="search">
							<input type="text" name="searchUserListQeury" id="searchUserListQeury" class="inp-search1" ng-model="searchUserListQeury" kr-input>
						</td>
						<td class="search">
							<button class="btn-search1"><span class="screen-out">검색</span></button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<table cellpadding="0" cellspacing="0" summary="보고사항" class="tbl-admin1">
			<colgroup>
<%-- 				<col width="70"> --%>
				<col width="80">
				<col width="160">
				<col width="170">
				<col width="120">
				<col width="70" ng-show="loginUserDetails.unitAuthorities == 'POWERUSER'||loginUserDetails.unitAuthorities == 'LEADER'">				
			</colgroup>
			<thead>
				<tr>
<!-- 					<th>확정</th> -->
					<th>이름</th>
					<th>페이스북 ID</th>
					<th>이메일</th>
					<th>핸드폰</th>
					<th ng-show="loginUserDetails.unitAuthorities == 'POWERUSER'||loginUserDetails.unitAuthorities == 'LEADER'">리더권한</th>					
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="u in filterUserList | filter: searchUserFilter | start: (userListCurrentPage - 1) * userListItemsPerPage | limitTo: userListItemsPerPage" ">
					<td><span class="open" ng-click="getUserData(u.idUser)">{{u.userName}}</span></td>
					<td>{{u.userCode}}</td>
					<td>{{u.userEmail}}</td>
					<td>{{u.userTel}}</td>
					<td ng-show="loginUserDetails.unitAuthorities == 'POWERUSER'||loginUserDetails.unitAuthorities == 'LEADER'">{{u.unitAuthorities == 'POWERUSER' ? 'POWERUSER' : ''}} <input type="checkbox" ng-model="u.unitAuthorities" ng-true-value="'LEADER'" ng-false-value="'LEADER_DELETE'" ng-hide="u.unitAuthorities == 'POWERUSER'" ng-click="leaderCheck(u)"></td>			
				</tr>
			</tbody>
		</table>
		<div class="box-print mB10">
			<button class="btn-add1"><span class="screen-out">신규 등록</span></button>
<%-- 			<button class="btn-ok"><span class="screen-out">확인</span></button> --%>
		</div>

<%-- 			View <select ng-model="userListViewby" ng-change="userListSetItemsPerPage(userListViewby)" class="slc-view"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>10</option><option>20</option><option>30</option><option>40</option><option>50</option></select> records at a time. --%>
						<div class="wrap-paging">
							<div class="box-paging">
								<!-- 			<pagination total-items="result.length" ng-model="currentPage" ng-change="pageChanged()" class="" items-per-page="itemsPerPage" boundary-links="true" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></pagination> -->
<!-- 								<pagination total-items="result.length" ng-model="currentPage" -->
<!-- 									ng-change="pageChanged()"  -->
<!-- 									items-per-page="itemsPerPage" boundary-links="true" -->
<!-- 									previous-text="&lsaquo;" next-text="&rsaquo;" -->
<!-- 									first-text="&laquo;" last-text="&raquo;"></pagination> -->
								<pagination total-items="(filterUserList | filter: searchUserFilter).length" ng-model="userListCurrentPage"
									ng-change="userListPageChanged()" 
									items-per-page="userListItemsPerPage" boundary-links="true" rotate="false" num-pages="numPages" max-size="userListMaxSize"
									previous-text="&lsaquo;" next-text="&rsaquo;"
									first-text="&laquo;" last-text="&raquo;"></pagination>
							</div>
						</div>
	</div>
</div>
<!-- //담당자 리스트 -->
<!-- 담당자 신규등록 -->
<div class="layer-member-add" style="display:none">
	<div class="layer-title-box">
		<h4 class="tit-notice"><span>담당자</span> 신규등록</h4>
		<button class="btn-layer-x1"><span class="screen-out">닫기</span></button>
	</div>
	<div class="box-layer-body">
		<div class="box-slc-count">
			<button class="btn-plus" ng-click="add()"><span class="screen-out">추가</span></button>
		</div>
		<table cellpadding="0" cellspacing="0" summary="담당자 추가" class="tbl-admin1" id="member-add">
			<colgroup>
				<col width="70">
				<col width="80">
				<col width="160">
				<col width="170">
				<col width="120">
			</colgroup>
			<thead>
				<tr>
					<th></th>
					<th>이름</th>
					<th>페이스북 ID</th>
					<th>이메일</th>
					<th>핸드폰</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="newUser in newUser">
					<td><button class="btn-delete" ng-click="remove($index)"><span class="screen-out">삭제</span></button></td>
					<td><input type="text" name="" id="" class="inp-members" ng-model="newUser.userName"></td>
					<td><input type="text" name="" id="" class="inp-members" ng-model="newUser.userCode"></td>
					<td><input type="text" name="" id="" class="inp-members" ng-model="newUser.userEmail"></td>
					<td><input type="text" name="" id="" class="inp-members" ng-model="newUser.userTel"></td>
				</tr>
			</tbody>
		</table>
		<div class="box-btn-center">
			<button class="btn-save" ng-click="insertUserList(newUser)"><span class="screen-out">저장</span></button>
			<button class="btn-cancel"><span class="screen-out">취소</span></button>
		</div>
	</div>
</div>
<!-- //담당자 신규등록 -->
<!-- 담당자 정보수정 -->
<div class="layer-member-modi" style="display:none">
	<div class="layer-title-box">
		<h4 class="tit-notice"><span>담당자</span> 정보수정</h4>
		<button class="btn-layer-x1"><span class="screen-out">닫기</span></button>
	</div>
	<div class="box-layer-body">
	<div style="font-size: 11px;" ng-show="userData.loginDate != null">마지막 로그인 일시 : {{userData.loginDate}}</div>
		<table cellpadding="0" cellspacing="0" summary="담당자 추가" class="tbl-admin1">
			<colgroup>
				<col width="100">
				<col width="170">
				<col width="180">
				<col width="120">
			</colgroup>
			<thead>
				<tr>
					<th>이름</th>
					<th>페이스북 ID</th>
					<th>이메일</th>
					<th>핸드폰</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input type="text" name="" id="" class="inp-members" value="" ng-model="userData.userName"></td>
<!-- 					<td><input type="text" name="" id="" class="inp-members" value="214061" ng-model="userData.userCode" readonly></td> -->
					<td>{{userData.userCode}}</td>
					<td><input type="text" name="" id="" class="inp-members" value="" ng-model="userData.userEmail"></td>
					<td><input type="text" name="" id="" class="inp-members" value="" ng-model="userData.userTel"></td>
				</tr>
			</tbody>
		</table>
		<div class="box-btn-center">
			<button class="btn-delete1"  ng-click="deleteUser(userData)"><span class="screen-out">삭제</span></button>
			<button class="btn-save" ng-click="updateUser(userData)"><span class="screen-out">저장</span></button>
			<button class="btn-cancel"><span class="screen-out">취소</span></button>
		</div>
	</div>
</div>
<!-- //담당자 정보수정 -->
<!-- 보고일시 -->
<div class="layer-notice-time" style="display:none">
	<div class="layer-title-box">
		<h4 class="tit-notice"><span>보고일시</span></h4>
		<button class="btn-layer-x1"><span class="screen-out">닫기</span></button>
	</div>
	<div class="box-layer-body">
		<div>
<!-- 			<input type="text" name="" id="" class="inp-date2 datepicker mR10"  ng-model="reportData.repoDate" jqdatepicker> -->
			<input type="text" name="reportDataDate" id="reportDataDate" class="inp-date2 mR10"  ng-model="reportData.repoDate" jqdatepicker>
			<select name="" id="" class="slc-time mR5" ng-model="reportData.repoDateHour" ng-options="v for v in repoDateHours">
			</select>
			<select name="" id="" class="slc-time" ng-model="reportData.repoDateMin" ng-options="v for v in repoDateMins">
			</select>
		</div>
		<div class="box-btn-center">
			<button class="btn-ok" ng-click="setReportDate(reportData)"><span class="screen-out">확인</span></button>
		</div>
	</div>
</div>
<!-- //보고일시 -->
<!-- 2016-02-23 수정 -->
<div class="layer-alarm" style="display:none">
	<div class="layer-title-box">
		<h4 class="tit-notice"><span>알림</span></h4>
		<button class="btn-layer-x" ng-click="updateNotification()"><span class="screen-out">닫기</span></button>
	</div>
	<div class="box-alarm">
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
<!-- //2016-02-23 수정 -->
<div id="backgroundPopup" style="display:none"></div>
<div id="backgroundPopup1" style="display:none"></div>
<script type="text/javascript">
// 페이지 스크립트
 $(function(){
	if ( $(".FnTab").length != 0 ){
		var tab1 = new Fn_tab(".FnTab");
		tab1.show(0);
	}
	if ($(".datepicker").prop("tagName") == "DIV"){
		var cal = $(".datepicker").datepicker({
			dayNamesMin : [ "S", "M", "T", "W", "T", "F", "S" ],
			monthNames: [ "<em>1</em> January", "<em>2</em> February", "<em>3</em> March", "<em>4</em> April", "<em>5</em> May", "<em>6</em> June", "<em>7</em> July", "<em>8</em> August", "<em>9</em> September", "<em>10</em> October", "<em>11</em> November", "<em>12</em> December" ],
			dateFormat : "yy-mm-dd",
			firstDay : 0,
			onSelect : function(dateText, inst){
				alert(dateText);
			}
		});
	}
});

</script>
</body>
</html>
