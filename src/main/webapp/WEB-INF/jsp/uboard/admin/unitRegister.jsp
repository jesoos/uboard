<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="http://www.springframework.org/security/tags" %>
<% 
    String idUnit = request.getParameter("idUnit");
%>

<!doctype html>
<html>
<head>
	<title>UBoard-Admin</title>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/admin/css/common.css" />
	<script type="text/javascript" src="${pageContext.request.contextPath}/admin/js/jquery-1.8.3.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/angular-1.4.8.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/angular-route-1.4.8.min.js"></script>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/admin/js/icheck.min.js"></script>	 --%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/admin/js/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-module.js"></script>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-dataCtrl.js"></script> --%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-regCtrl.js"></script>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-PaginationCtrl.js"></script> --%>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-ctrl.js"></script> --%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/FileSaver.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/mainView.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/angular.easypiechart.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/ui-bootstrap-tpls-0.11.0.js"></script>
	<script src="${pageContext.request.contextPath}/js/ng-infinite-scroll-1.2.2.min.js"></script>
	<c:set var="registerFlag" value="${empty sampleVO.id ? '등록' : '수정'}"/>
</head>
<script>var ctx = "${pageContext.request.contextPath}"
			function getContextPath(){
	 		   return ctx;
			}
</script>
<script type="text/javascript">
    var getIdUnit = "<%= idUnit %>";
    if(getIdUnit == 'null')
    	getIdUnit = '';
</script>
<script>
$(document).ready(function (){
    $("#listbtn").click(function(){
        $(location).attr('href',"${pageContext.request.contextPath}/admin/mainView.do");
    });
    $("#btn-cancel").click(function(){
        $(location).attr('href',"${pageContext.request.contextPath}/admin/mainView.do");
    });
});
</script>
<body ng-app="myApp" ng-controller="regCtrl">
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
			<!-- 2016-03-29 수정 -->
		<div class="box-search mB10">		
			<h2 class="tit-unit" style="display:inline;">Unit 상세 정보</h2>
			<span style="font-size:11px" ng-show="x.updatedUser">최종 수정 : {{x.updatedUser}} [{{x.updatedDate}}]</span>
		</div>
		<!-- //2016-03-29 수정 -->
		<div class="wrap-contents">		
			<div class="box-contents">				
				<table cellpadding="0" cellspacing="0" summary="연황판결과" class="tbl-admin1">
					<colgroup>
						<col width="150">
						<col width="210">
						<col width="295">
						<col width="210">
						<col width="295">
					</colgroup>				
					<tbody>
						<tr>
							<th>소속</th>
							<td colspan="4" class="unit">
								<select name="" id="" class="slc-task1" ng-model="x.psitnCode">
									<option value="1">한화생명</option>
									<option value="2">그룹</option>
									<option value="3">센터</option>
<!-- 									<option value="4">DP</option> -->
								</select>
							</td>							
						</tr>
						<tr>
							<th>Unit</th>
							<td colspan="4" class="unit"><input type="text" name="unitName" id="unitName" value="" class="inp-task-long" ng-model="x.unitName" kr-input></td>
						</tr>
						<tr>
							<th class="bd-b">날짜</th>
							<td colspan="4" class="unit bd-b">
								<input type="text" name="" id="xfromDate" class="inp-date datepicker" ng-model="x.fromDate" jqdatepicker> ~
								<input type="text" name="" id="xtoDate" class="inp-date datepicker" ng-model="x.toDate" jqdatepicker>
<!-- 								<input type="text" name="" id="xtoDate" class="inp-date datepicker" value="{{x.fromDate | regDateFormat}}"> -->
							</td>
						</tr>
						<tr>
							<th>Leader</th>
							<td class="bd-r">
								<input type="text" name="leader" id="leader" class="inp-task1" ng-model="x.leader" ng-click="userPopUp(x.leader,'leader')">
							</td>
							<td class="bd-r">
								<span class="mR10">H.P</span><input type="text" name="leaderTel" id="leaderTel" class="inp-task2" ng-model="x.leaderTel" readonly>
							</td>
							<td colspan="2">
								<span class="mR10">E-mail</span><input type="text" name="" id="" class="inp-task2" ng-model="x.leaderEmail" readonly>
							</td>
						</tr>
						<tr>
							<th rowspan="2" class="bd-b">상태</th>
							<td class="bd-r" colspan="2">
								<input type="radio" name="leaderStateCode" ng-model="x.leaderStateCode" value="state1" id="room1-1" ng-click="unitLeaderState(x.leaderStateCode)"> <label for="room1-1" class="lab_rad">재실</label>
								<input type="radio" name="leaderStateCode" ng-model="x.leaderStateCode" value="state2" id="room2-1" ng-click="unitLeaderState(x.leaderStateCode)"> <label for="room2-1" class="lab_rad">반차</label>
								<input type="radio" name="leaderStateCode" ng-model="x.leaderStateCode" value="state3" id="room2-2" ng-click="unitLeaderState(x.leaderStateCode)"> <label for="room2-2" class="lab_rad">외근</label>
							</td>							
							<td colspan="2">
								<input type="radio" name="leaderStateCode" ng-model="x.leaderStateCode" value="state4" id="room3-1" ng-click="unitLeaderState(x.leaderStateCode)"> <label for="room3-1" class="lab_rad">출장</label>
								<input type="radio" name="leaderStateCode" ng-model="x.leaderStateCode" value="state5" id="room3-2" ng-click="unitLeaderState(x.leaderStateCode)"> <label for="room3-2" class="lab_rad">휴가</label>
							</td>
						</tr>
						<tr>
							<td class="bd-r bd-b" colspan="2">
								<input type="radio" class="leaderStateTime" id="leaderStateTime1" name="leaderStateTime" ng-model="x.leaderStateTime" value="오전" ng-disabled="!(x.leaderStateCode == 'state2'||x.leaderStateCode == 'state3')"><label for="leaderStateTime1" class="inp-chk1">오전</label>
								<input type="radio" class="leaderStateTime" id="leaderStateTime2" name="leaderStateTime" ng-model="x.leaderStateTime" value="오후" ng-disabled="!(x.leaderStateCode == 'state2'||x.leaderStateCode == 'state3')"><label for="leaderStateTime2" class="inp-chk1">오후</label>
								<input type="radio" class="leaderStateTime" id="leaderStateTime3" name="leaderStateTime" ng-model="x.leaderStateTime" value="종일" ng-disabled="!(x.leaderStateCode == 'state2'||x.leaderStateCode == 'state3')"><label for="leaderStateTime3" class="inp-chk1">종일</label>
							</td>
							<td colspan="2" class="bd-b">
								<input type="text" name="" id="xleaderStateFrom" class="inp-date leaderStateDate" currency-input ng-model="x.leaderStateFrom" ng-disabled="!(x.leaderStateCode == 'state4'||x.leaderStateCode == 'state5')" jqdatepicker> ~ <input type="text" name="" id="xleaderStateTo" class="inp-date leaderStateDate" currency-input ng-model="x.leaderStateTo" ng-disabled="!(x.leaderStateCode == 'state4'||x.leaderStateCode == 'state5')" jqdatepicker>
							</td>
						</tr>
						<tr>
							<th>Captain</th>
							<td class="bd-r">
								<input type="text" name="captain" id="captain" class="inp-task1" ng-model="x.captain" ng-click="userPopUp(x.captain,'captain')">
							</td>
							<td class="bd-r">
								<span class="mR10">H.P</span><input type="text" name="captainTel" id="captainTel" class="inp-task2" ng-model="x.captainTel" readonly>
							</td>
							<td colspan="2">
								<span class="mR10">E-mail</span><input type="text" name="" id="" class="inp-task2" ng-model="x.captainEmail" readonly>
							</td>
						</tr>
						<tr>
							<th rowspan="2" class="bd-b">상태</th>
							<td class="bd-r" colspan="2">
								<input type="radio" name="captainStateCode" ng-model="x.captainStateCode" value="state1" id="room1-2" ng-click="unitCaptainState(x.captainStateCode)"> <label for="room1-2" class="lab_rad">재실</label>
								<input type="radio" name="captainStateCode" ng-model="x.captainStateCode" value="state2" id="room2-3" ng-click="unitCaptainState(x.captainStateCode)"> <label for="room2-3" class="lab_rad">반차</label>
								<input type="radio" name="captainStateCode" ng-model="x.captainStateCode" value="state3" id="room2-4" ng-click="unitCaptainState(x.captainStateCode)"> <label for="room2-4" class="lab_rad">외근</label>	
							</td>							
							<td colspan="2">
								<input type="radio" name="captainStateCode" ng-model="x.captainStateCode" value="state4" id="room3-3" ng-click="unitCaptainState(x.captainStateCode)"> <label for="room3-3" class="lab_rad">출장</label>
								<input type="radio" name="captainStateCode" ng-model="x.captainStateCode" value="state5" id="room3-4" ng-click="unitCaptainState(x.captainStateCode)"> <label for="room3-4" class="lab_rad">휴가</label>	
							</td>
						</tr>
						<tr>
							<td class="bd-r bd-b" colspan="2">
								<input type="radio" class="captainStateTime" id="captainStateTime1" name="captainStateTime" ng-model="x.captainStateTime" value="오전" id="" ng-disabled="!(x.captainStateCode == 'state2'||x.captainStateCode == 'state3')"><label for="captainStateTime1" class="inp-chk1">오전</label>
								<input type="radio" class="captainStateTime" id="captainStateTime2" name="captainStateTime" ng-model="x.captainStateTime" value="오후" id="" ng-disabled="!(x.captainStateCode == 'state2'||x.captainStateCode == 'state3')"><label for="captainStateTime2" class="inp-chk1">오후</label>
								<input type="radio" class="captainStateTime" id="captainStateTime3" name="captainStateTime" ng-model="x.captainStateTime" value="종일" id="" ng-disabled="!(x.captainStateCode == 'state2'||x.captainStateCode == 'state3')"><label for="captainStateTime3" class="inp-chk1">종일</label>
							</td>
							<td colspan="2" class="bd-b">
								<input type="text" name="" id="xcaptainStateFrom" class="inp-date captainStateDate" currency-input="" ng-model="x.captainStateFrom" currency-input="" ng-disabled="!(x.captainStateCode == 'state4'||x.captainStateCode == 'state5')" jqdatepicker> ~ <input type="text" name="" id="xcaptainStateTo" class="inp-date captainStateDate" ng-model="x.captainStateTo"  currency-input="" ng-disabled="!(x.captainStateCode == 'state4'||x.captainStateCode == 'state5')" jqdatepicker>
							</td>
						</tr>
						
						<tr>
							<th>담당자</th>
<!-- 							<td colspan="4" class="unit"><input type="text" name="" id="" value="김한화; 김한화; 김한화" class="inp-task-long" ng-model="x.unitPartner" ng-click="userPopUp('', 'unitPartner')"></td> -->
							<td colspan="4" class="unit">
								<div style="float:left" ng-repeat="checkUser in checkUserList">
								    <input type="text" ng-model="checkUser.userName" style="width:50px;border:0;height: 30px" readonly>
								    <button class="btn-x-unitpartner" ng-click="removeUnitPartner($index)">
								    	<span class="screen-out">[X]</span>
								    </button>
								</div>
								<button class="btn-add2" ng-click="userPopUp('', 'unitPartner')">
									<span class="screen-out">추가</span>
								</button>
  							</td>
						</tr>
						<tr>
							<th>노출여부</th>
							<td colspan="4" class="unit">
								<input type="radio" id="showN" name="showYn" ng-model="x.showYn" value="Y"> <label for="showN" class="lab_rad">Y</label>
								<input type="radio" id="showY" name="showYn" ng-model="x.showYn" value="N"> <label for="showY" class="lab_rad">N</label>	
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="box-print">
				<button id="btn-save1" class="btn-save1" ng-click="updateUnit(x, checkUserList);" ng-hide="getIdUnit.length == 0 || !(unitWritingAuth || unitModifiyingAuth)"><span class="screen-out">변경내용 저장</span></button>
				<button id="btn-save2" class="btn-save2" ng-click="insertUnit(x, checkUserList);" ng-hide="getIdUnit.length > 0 || !(unitWritingAuth || unitModifiyingAuth)"><span class="screen-out">저장</span></button>
				<button id="btn-cancel" class="btn-cancel"><span class="screen-out">취소</span></button>
<%-- 				<button class="btn-delete" ng-hide="getIdUnit.length == 0 || !(unitWritingAuth || unitModifiyingAuth)" ng-click="deleteUnit(x.idUnit, x.unitCode);"><span class="screen-out">삭제</span></button> --%>
			</div>
			<br>
			<!-- Task -->
			<div ng-hide="getIdUnit == ''">
				<div class="box-search mB10">		
					<h2 class="tit-unit" style="display:inline;">Task</h2>
<%-- 					<span style="margin-left:100px;">노출여부:  --%>
					<span style="margin-left:10px;"> 노출여부: 
						<input type="radio" name="taskShowYn" id="taskShowYn" ng-model="taskShowYn" value="all"> <label for="taskShowYn" class="lab_rad">전체</label>
						<input type="radio" name="taskShowYn" id="taskShowY" ng-model="taskShowYn" value="Y"> <label for="taskShowY" class="lab_rad">Y</label>
						<input type="radio" name="taskShowYn" id="taskShowN" ng-model="taskShowYn" value="N"> <label for="taskShowN" class="lab_rad">N</label>
					</span>
<%-- 					<button class="btn-plus1" onclick="location.href='${pageContext.request.contextPath}/admin/taskRegister.do'"><span class="screen-out">+</span></button>			 --%>
					<button class="btn-plus1" ng-click="newTaskInsert()" ng-hide="(taskShowYn == 'Y' && (x.taskList | filter:{showYn : 'Y'}).length == 0) || (taskShowYn == 'N' && (x.taskList | filter:{showYn : 'N'}).length == 0)"><span class="screen-out">+</span></button>			
				</div>
				<table cellpadding="0" cellspacing="0" summary="TASK" class="tbl-admin3 mB10">
					<colgroup>
						<col width="150">
						<col width="50">
						<col width="540">
						<col width="200">
						<col width="80">
						<col width="140">
					</colgroup>				
					<tbody>
						<tr ng-repeat="y in x.taskList | filter:{showYn : taskShowYn == 'all' ? $ : taskShowYn }">
							<th>내용 <span class="txt-{{y.signalCode | lowercase}}">{{y.signalCode}}</span></th>
							<td class="right-a"><span class="txt-b" ng-hide="!y.alramCode">B</span></td>							
							<td class="task">{{y.taskName}} ({{y.progress}}%)</td>
							<td class="date">{{y.fromDate | resultDateFormat}}~{{y.toDate | resultDateFormat}}</td>
							<td class="name" ng-repeat="z in y.userList | filter:{repYn : 'Y'}">{{z.userName}}</td>
							<td><button class="btn-modify1" ng-click="taskReg(y.idTask)"><span class="screen-out">수정</span></button>
<!-- 							<button ng-click="deleteTask(y)">[삭제]</button> -->
							</td>
						</tr>		
						<tr ng-show="x.taskList.length == 0">
							<th>{{testId}}소속</th>
							<td></td>
							<td class="task" colspan="4">등록된 Task 정보가 없습니다. 세부업무를 1개 이상 등록해주세요</td>
						</tr>
						<tr ng-show="x.taskList.length != 0 && taskShowYn == 'Y' && (x.taskList | filter:{showYn : 'Y'}).length == 0">
							<th>{{testId}}소속</th>
							<td></td>
							<td class="task" colspan="4">노출되는 Task가 없습니다.</td>
						</tr>
						<tr ng-show="x.taskList.length != 0 && taskShowYn == 'N' && (x.taskList | filter:{showYn : 'N'}).length == 0">
							<th>{{testId}}소속</th>
							<td></td>
							<td class="task" colspan="4">노출되지 않는 Task가 없습니다.</td>
						</tr>
					</tbody>
				</table>
				<div class="box-print mB20">
					<button id="listbtn" class="btn-list1"><span class="screen-out">목록</span></button>
				</div>
			</div>
			<!-- //Task -->
			<!-- task 입력 -->
			<div id="modifyTaskLayer" class="layer-task" style="display:none;">
				<div class="layer-title-box">
					<h5 class="tit-task">[{{x.unitName}}]</h4>
					<h4 class="tit-notice1"><span>Task</span> 상세 정보</h4>
					<button class="btn-layer-x"><span class="screen-out">닫기</span></button>
				</div>
				<div class="box-layer-body">
					<table cellpadding="0" cellspacing="0" summary="연황판결과" id="addTaskTb" class="tbl-admin1">
						<colgroup>
							<col width="150">
							<col width="150">
							<col width="250">
							<col width="150">
							<col width="75">
							<col width="130">
							<col width="90">
						</colgroup>				
						<tbody>
							<tr>
								<th>Task</th>
								<td colspan="6" class="unit"><input type="text" name="" id="" ng-model="y.taskName" class="inp-task-long" kr-input></td>
							</tr>
							<tr>
								<th>일정</th>
								<td class="unit" colspan="2">
									<input type="text" name="" id="modifyYFromDate" class="inp-date" ng-model="y.fromDate" jqdatepicker> ~
									<input type="text" name="" id="modifyYToDate" class="inp-date" ng-model="y.toDate" jqdatepicker>
<!-- 									<input type="text" name="" id="" class="inp-date datepicker" value="{{y.toDate | regDateFormat}}"> -->
								</td>
								<th>
									진행율
								</th>
								<td colspan="3" class="left-a">
									<input type="text" name="" id="" class="inp-task3" ng-model="y.progress"> %
								</td>
							</tr>
							<tr>
								<th>Signal</th>
								<td class="unit" colspan="2">
<%-- 									<input type="radio" name="signalCode" ng-model="y.signalCode" value="B" id="sig1" ng-click="signalClick('B')"><label for="sig1" class="mR20"><span class="txt-b">B</span></label> --%>
									<input type="radio" ng-model="y.signalCode" value="G" id="sig2" ng-click="signalClick('G')"><label for="sig2" class="mR20"><span class="txt-g">G</span></label>
									<input type="radio" ng-model="y.signalCode" value="Y" id="sig3" ng-click="signalClick('Y')"><label for="sig3" class="mR20"><span class="txt-y">Y</span></label>
									<input type="radio" ng-model="y.signalCode" value="R" id="sig4" ng-click="signalClick('R')"><label for="sig4" class="mR20"><span class="txt-r">R</span></label>
								</td>
								<th>
									보고사항있음
								</th>
								<td colspan="3" class="left-a">
									<input type="checkbox" name="" id="b1" ng-model="y.alramCode" ng-true-value="'B'" ng-false-value="''" ng-click="alramCodeClick()"><label for="b1" class="inp-chk">B</label>
								</td>
							</tr>
							<tr>
								<th>Issue</th>
								<td colspan="6" class="unit">
									<textarea name="" id="" cols="30" rows="10" class="txta-issue" ng-model="y.issueText" ng-disabled="!(y.signalCode == 'Y' || y.signalCode == 'R')"></textarea>
								</td>
							</tr>
							<tr>
								<th>보고 상세 내용</th>
								<td colspan="6" class="sub-t">
									<table cellspacing="0" cellspacing="0" class="tbl-admin4" summary="보고 상세">
										<colgroup>
											<col width="150">
											<col width="720">
										</colgroup>
										<tbody>
											<tr>
												<th>보고 일시</th>
												<td>
													<input type="text" name="" id="modifyYRepoDate" class="inp-date" ng-model="y.repoDate" jqdatepicker ng-disabled="!y.alramCode">
													<select name="" id="" class="slc-time mR5" ng-model="y.repoDateHour" ng-disabled="!y.alramCode" ng-options="v for v in repoDateHours">
													</select>
													<select name="" id="" class="slc-time" ng-model="y.repoDateMin" ng-disabled="!y.alramCode" ng-options="v for v in repoDateMins">
													</select>
												</td>
											</tr>
											<tr>
												<th>보고자</th>
												<td>
													<input type="text" name="" id="" class="inp-task-long" ng-model="y.repoUserCode" ng-disabled="!y.alramCode">
												</td>
											</tr>
											<tr>
												<th>참석자</th>
												<td>
													<input type="text" name="" id="" class="inp-task-long" ng-model="y.repoMembers" ng-disabled="!y.alramCode">
												</td>
											</tr>
											<tr>
												<th>보고내용</th>
												<td>
													<input type="text" name="" id="" class="inp-task-long" ng-model="y.repoDesc" ng-disabled="!y.alramCode">
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
<!-- 							<tr ng-repeat-start="z in y.userList | filter:{repYn : 'Y'}"> -->
							<tr>
								<th rowspan="{{taskPatnerList.length + 3}}">
									담당자 정보<br>
									<button class="btn-add2" ng-click="addTaskPatnerList()"><span class="screen-out">추가</span></button>
								</th>
								<td class="bd-r unit" colspan="2">
									<span class="mR10">대표</span>
									<select name="" id="" class="slc-task2 mR10" ng-model="z" ng-change="selectChangeY(z)"  ng-options="cu.userName for cu in checkUserList">
										<option value="" ng-model="z.userName" ng-show="!z">{{z.userName}}</option>
									</select>
									<span class="mR10">H.P</span><input type="text" name="" id="" class="inp-task5" ng-model="z.userTel" readonly>
								</td>
								<td colspan="4">
									<span class="mR10">E-mail</span> <input type="text" name="" id="" class="inp-task2" ng-model="z.userEmail" readonly>  
								</td>
							</tr>
							<tr>
								<th rowspan="2" class="statements">상태</th>
								<td colspan="2" class="bd-r unit">
									<input type="radio" ng-model="z.userStateCode" value="state1" id="rooms1-1" ng-click="taskUserState(z.userStateCode)"><label for="rooms1-1" class="lab_rad mR10">재실</label>
									<input type="radio" ng-model="z.userStateCode" value="state2" id="rooms1-2" ng-click="taskUserState(z.userStateCode)"><label for="rooms1-2" class="lab_rad mR10">반차</label>
									<input type="radio" ng-model="z.userStateCode" value="state3" id="rooms1-3" ng-click="taskUserState(z.userStateCode)"><label for="rooms1-3" class="lab_rad mR10">외근</label>
								</td>
								<td colspan="3">
									<input type="radio" ng-model="z.userStateCode" value="state4" id="rooms1-4" ng-click="taskUserState(z.userStateCode)"><label for="rooms1-4" class="lab_rad">출장</label>
									<input type="radio" ng-model="z.userStateCode" value="state5" id="rooms1-5" ng-click="taskUserState(z.userStateCode)"><label for="rooms1-5" class="lab_rad">휴가</label>
								</td>
							</tr>
							<tr>
<!-- 							<tr ng-repeat-end> -->
								<td class="bd-r unit po-r" colspan="2">
									<input type="radio" class="userStateTime" value="오전" id="rooms2-1" ng-model="z.userStateTime" ng-disabled="!(z.userStateCode == 'state2'||z.userStateCode == 'state3')"><label for="rooms2-1" class="inp-chk1">오전</label>
									<input type="radio" class="userStateTime" value="오후" id="rooms2-2" ng-model="z.userStateTime" ng-disabled="!(z.userStateCode == 'state2'||z.userStateCode == 'state3')"><label for="rooms2-2" class="inp-chk1">오후</label>
									<input type="radio" class="userStateTime" value="종일" id="rooms2-3" ng-model="z.userStateTime" ng-disabled="!(z.userStateCode == 'state2'||z.userStateCode == 'state3')"><label for="rooms2-3" class="inp-chk1">종일</label>	
								</td>
								<td colspan="3" class="po-r">
									<input type="text" name="repUserStateFrom" id="modifyRepUserStateFrom" class="inp-date userStateDate" currency-input ng-model="z.userStateFrom" disabled="!(z.userStateCode == 'state4'||z.userStateCode == 'state5')" jqdatepicker> ~ <input type="text" name="repUserStateTo" id="modifyRepUserStateTo" class="inp-date userStateDate" currency-input ng-model="z.userStateTo" disabled="!(z.userStateCode == 'state4'||z.userStateCode == 'state5')" jqdatepicker>
								</td>
							</tr>
							<tr ng-repeat="tpl in taskPatnerList">
<!-- 							<tr> -->
								<td colspan="5" class="bd-r unit">
									<span class="mR5">담당</span>
<%-- 									<select name="" id="" class="slc-task2 mR10" ng-model="tpl" ng-change="selectChange([$index])" ng-options="cu.userName for cu in checkUser"> --%>
									<select name="" id="" class="slc-task2 mR10" ng-model="tpl" ng-change="selectChange([$index])" ng-options="cu.userName for cu in checkUserList">
<%-- 									<select name="" id="" class="slc-task2 mR10"> --%>
<!-- 										<option value="" ng-repeat="zRepN in checkUser" ng-model="zRepN.userName">{{zRepN.userName}}</option> -->
										<option value="" ng-model="tpl.userName" ng-show="!tpl">{{tpl.userName}}</option>
									</select>
									<span class="mR5">H.P</span><input type="text" name="" id="" class="inp-task1 mR20" ng-model="tpl.userTel" readonly>
									<span class="mR5">E-mail</span><input type="text" name="" id=""  class="inp-task2" ng-model="tpl.userEmail" readonly>  
<!-- 									<input type="text" name="" id=""  class="inp-task2" ng-bind="tpl.userCode=select.userCode" ng-model="tpl.userCode" hidden>   -->
<%-- 									<span class="mR5">E-mail</span> <input type="text" name="" id="" class="inp-task4 mR10"> @ <input type="text" name="" id="" class="inp-task6">   --%>
<%-- 									<select name="" id="" class="slc-task3"> --%>
<!-- 										<option value="">직접입력</option>	 -->
<%-- 									</select>						 --%>
								</td>
								<td>
<!-- 									<button class="btn-delete" ng-click="deleteUser(z)"> -->
									<button class="btn-delete" ng-click="removeTaskPatnerList($index)">
										<span class="screen-out">삭제</span>
									</button>
								</td>
							</tr>
							<tr>
								<th>노출여부</th>
								<td colspan="6" class="unit">
									<input type="radio" id="updateTaskShowY" name="" ng-model="y.showYn" value="Y"> <label for="updateTaskShowY" class="lab_rad">Y</label>
									<input type="radio" id="updateTaskShowN" name="" ng-model="y.showYn" value="N"> <label for="updateTaskShowN" class="lab_rad">N</label>	
								</td>
							</tr>
						</tbody>
					</table>
					<div class="box-btn-center mB20">
					<button class="btn-save1" ng-click="updateTask(y, z, taskPatnerList);"><span class="screen-out">변경 후 저장</span></button>
<%-- 					<button class="btn-delete" ng-click="deleteTask(x.idUnit, x.unitCode, y.idTask, y.taskCode);"><span class="screen-out">삭제</span></button> --%>
<%-- 						<button class="btn-save2" ng-click="insertTask(y)"><span class="screen-out">저장</span></button> --%>
					</div>
				</div>
			</div>
			<!-- //task 입력 -->
			<!-- Add task 입력 -->
			<div id="addTaskLayer" class="layer-task" style="display:none;">
				<div class="layer-title-box">
					<h5 class="tit-task">[{{x.unitName}}]</h4>
					<h4 class="tit-notice1"><span>Task</span> 상세 정보</h4>
					<button class="btn-layer-x"><span class="screen-out">닫기</span></button>
				</div>
				<div class="box-layer-body">
					<table cellpadding="0" cellspacing="0" summary="연황판결과" id="addTaskTb" class="tbl-admin1">
						<colgroup>
							<col width="150">
							<col width="150">
							<col width="250">
							<col width="150">
							<col width="75">
							<col width="130">
							<col width="90">
						</colgroup>				
						<tbody>
							<tr>
								<th>Task</th>
								<td colspan="6" class="unit"><input type="text" name="" id="" ng-model="y.taskName" class="inp-task-long" kr-input/></td>
							</tr>
							<tr>
								<th>일정</th>
								<td class="unit" colspan="2">
									<input type="text" name="" id="addYFromDate" class="inp-date" ng-model="y.fromDate" jqdatepicker> ~
									<input type="text" name="" id="addYToDate" class="inp-date" ng-model="y.toDate" jqdatepicker>
<!-- 									<input type="text" name="" id="" class="inp-date datepicker" value="{{y.toDate | regDateFormat}}"> -->
								</td>
								<th>
									진행율
								</th>
								<td colspan="3" class="left-a">
									<input type="text" name="" id="" class="inp-task3" ng-model="y.progress"> %
								</td>
							</tr>
							<tr>
								<th>Signal</th>
								<td class="unit" colspan="2">
<%-- 									<input type="radio" name="signalCode" ng-model="y.signalCode" value="B" id="sig5" ng-click="signalClick('B')"><label for="sig5" class="mR20"><span class="txt-b">B</span></label> --%>
									<input type="radio" name="signalCode" ng-model="y.signalCode" value="G" id="sig6" ng-click="signalClick('G')"><label for="sig6" class="mR20"><span class="txt-g">G</span></label>
									<input type="radio" name="signalCode" ng-model="y.signalCode" value="Y" id="sig7" ng-click="signalClick('Y')"><label for="sig7" class="mR20"><span class="txt-y">Y</span></label>
									<input type="radio" name="signalCode" ng-model="y.signalCode" value="R" id="sig8" ng-click="signalClick('R')"><label for="sig8" class="mR20"><span class="txt-r">R</span></label>
								</td>
								<th>
									보고사항있음
								</th>
								<td colspan="3" class="left-a">
									<input type="checkbox" name="" id="b1" ng-model="y.alramCode" ng-true-value="'B'" ng-false-value="''" ng-click="alramCodeClick()"><label for="b1" class="inp-chk">B</label>
								</td>
							</tr>
							<tr>
								<th>Issue</th>
								<td colspan="6" class="unit">
									<textarea name="" id="" cols="30" rows="10" class="txta-issue" ng-model="y.issueText" ng-disabled="!(y.signalCode == 'Y' || y.signalCode == 'R')"></textarea>
								</td>
							</tr>
							<tr>
								<th>보고 상세 내용</th>
								<td colspan="6" class="sub-t">
									<table cellspacing="0" cellspacing="0" class="tbl-admin4" summary="보고 상세">
										<colgroup>
											<col width="150">
											<col width="720">
										</colgroup>
										<tbody>
											<tr>
												<th>보고 일시</th>
												<td>
													<input type="text" name="" id="addYRepoDate" class="inp-date2 mR20" ng-model="y.repoDate" jqdatepicker ng-disabled="!y.alramCode">
													<select name="" id="" class="slc-time mR5" ng-model="y.repoDateHour" ng-disabled="!y.alramCode" ng-options="v for v in repoDateHours">
													</select>
													<select name="" id="" class="slc-time" ng-model="y.repoDateMin" ng-disabled="!y.alramCode" ng-options="v for v in repoDateMins">
													</select>
												</td>
											</tr>
											<tr>
												<th>보고자</th>
												<td>
													<input type="text" name="" id="" class="inp-task-long" ng-model="y.repoUserCode" ng-disabled="!y.alramCode">
												</td>
											</tr>
											<tr>
												<th>참석자</th>
												<td>
													<input type="text" name="" id="" class="inp-task-long" ng-model="y.repoMembers" ng-disabled="!y.alramCode">
												</td>
											</tr>
											<tr>
												<th>보고내용</th>
												<td>
													<input type="text" name="" id="" class="inp-task-long" ng-model="y.repoDesc" ng-disabled="!y.alramCode">
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr>
								<th rowspan="{{taskPatnerList.length + 3}}">
									담당자 정보<br>
									<button class="btn-add2" ng-click="addTaskPatnerList()"><span class="screen-out">추가</span></button>
								</th>
								<td class="bd-r unit" colspan="2">
									<span class="mR10">대표</span>
									<select name="" id="" class="slc-task2 mR10" ng-model="z" ng-change="selectChangeY(z)"  ng-options="cu.userName for cu in checkUserList">
										<option value="" ng-model="z.userName" ng-show="!z">{{z.userName}}</option>
									</select>
									<span class="mR10">H.P</span><input type="text" name="" id="" class="inp-task5" ng-model="z.userTel" readonly>
								</td>
								<td colspan="4">
									<span class="mR10">E-mail</span> <input type="text" name="" id="" class="inp-task2" ng-model="z.userEmail" readonly>  
								</td>
								
							</tr>
							<tr>
								<th rowspan="2" class="statements">상태</th>
								<td>
									<input type="radio" name="userStateCode" ng-model="z.userStateCode" value="state1" id="rooms3-1" ng-click="taskUserState(z.userStateCode)"><label for="rooms3-1" class="lab_rad mR10">재실</label>
									<input type="radio" name="userStateCode" ng-model="z.userStateCode" value="state2" id="rooms3-2" ng-click="taskUserState(z.userStateCode)"><label for="rooms3-2" class="lab_rad mR10">반차</label>
									<input type="radio" name="userStateCode" ng-model="z.userStateCode" value="state3" id="rooms3-3" ng-click="taskUserState(z.userStateCode)"><label for="rooms3-3" class="lab_rad mR10">외근</label>
								</td>
								<td colspan="3">
									<input type="radio" name="userStateCode" ng-model="z.userStateCode" value="state4" id="rooms3-4" ng-click="taskUserState(z.userStateCode)"><label for="rooms3-4" class="lab_rad">출장</label>
									<input type="radio" name="userStateCode" ng-model="z.userStateCode" value="state5" id="rooms3-5" ng-click="taskUserState(z.userStateCode)"><label for="rooms3-5" class="lab_rad">휴가</label>
								</td>
							</tr>
							<tr>
								<td class="bd-r unit po-r" colspan="2">
									<input type="radio" class="userStateTime" value="오전" name="" id="rooms4-1" ng-model="z.userStateTime" ng-disabled="!(z.userStateCode == 'state2'||z.userStateCode == 'state3')"><label for="rooms4-1" class="inp-chk1">오전</label>
									<input type="radio" class="userStateTime" value="오후" name="" id="rooms4-2" ng-model="z.userStateTime" ng-disabled="!(z.userStateCode == 'state2'||z.userStateCode == 'state3')"><label for="rooms4-2" class="inp-chk1">오후</label>
									<input type="radio" class="userStateTime" value="종일" name="" id="rooms4-3" ng-model="z.userStateTime" ng-disabled="!(z.userStateCode == 'state2'||z.userStateCode == 'state3')"><label for="rooms4-3" class="inp-chk1">종일</label>	
								</td>
								<td colspan="3" class="po-r">
									<input type="text" name="repUserStateFrom" id="repUserStateFrom" class="inp-date userStateDate" currency-input ng-model="z.userStateFrom" disabled="!(z.userStateCode == 'state4'||z.userStateCode == 'state5')" jqdatepicker> ~ <input type="text" name="repUserStateTo" id="repUserStateTo" class="inp-date userStateDate" currency-input ng-model="z.userStateTo" disabled="!(z.userStateCode == 'state4'||z.userStateCode == 'state5')" jqdatepicker>
								</td>
							</tr>
							<tr ng-repeat="tpl in taskPatnerList">
<!-- 							<tr> -->
								<td colspan="5" class="bd-r unit">
									<span class="mR5">담당</span>
<%-- 									<select name="" id="" class="slc-task2 mR10" ng-model="tpl" ng-change="selectChange([$index])" ng-options="cu.userName for cu in checkUser"> --%>
									<select name="" id="" class="slc-task2 mR10" ng-model="tpl" ng-change="selectChange([$index])" ng-options="cu.userName for cu in checkUserList">
<%-- 									<select name="" id="" class="slc-task2 mR10"> --%>
<!-- 										<option value="" ng-repeat="zRepN in checkUser" ng-model="zRepN.userName">{{zRepN.userName}}</option> -->
										<option value="" ng-model="tpl.userName" ng-show="!tpl">{{tpl.userName}}</option>
									</select>
									<span class="mR5">H.P</span><input type="text" name="" id="" class="inp-task1 mR20" ng-model="tpl.userTel" readonly>
									<span class="mR5">E-mail</span><input type="text" name="" id=""  class="inp-task2" ng-model="tpl.userEmail" readonly>  
<!-- 									<input type="text" name="" id=""  class="inp-task2" ng-bind="tpl.userCode=select.userCode" ng-model="tpl.userCode" hidden>   -->
<%-- 									<span class="mR5">E-mail</span> <input type="text" name="" id="" class="inp-task4 mR10"> @ <input type="text" name="" id="" class="inp-task6">   --%>
<%-- 									<select name="" id="" class="slc-task3"> --%>
<!-- 										<option value="">직접입력</option>	 -->
<%-- 									</select>						 --%>
								</td>
								<td>
<!-- 									<button class="btn-delete" ng-click="deleteUser(z)"> -->
									<button class="btn-delete" ng-click="removeTaskPatnerList($index)">
										<span class="screen-out">삭제</span>
									</button>
								</td>
							</tr>
<!-- 							<tr> -->
<!-- 								<th>노출여부</th> -->
<!-- 								<td colspan="6" class="unit"> -->
<!-- 									<input type="radio" id="insertTaskShowY" name="" ng-model="y.showYn" value="Y"> <label for="insertTaskShowY" class="lab_rad">Y</label> -->
<!-- 									<input type="radio" id="insertTaskShowN" name="" ng-model="y.showYn" value="N"> <label for="insertTaskShowN" class="lab_rad">N</label>	 -->
<!-- 								</td> -->
<!-- 							</tr> -->
						</tbody>
					</table>
					<div class="box-btn-center mB20">
					<!-- 						<button class="btn-save1" ng-click="updateTask(y)"><span class="screen-out">변경 후 저장</span></button> -->
<%-- 						<button class="btn-save2" ng-click="insertTask(y); insertTM(z); insertTaskPartner(z)"><span class="screen-out">저장</span></button> --%>
<%-- 						<button class="btn-save2" ng-click="insertTask(y); insertTM(z); insertM(taskPatnerList);"><span class="screen-out">저장</span></button> --%>
						<button class="btn-save2" ng-click="insertTask(y,z,taskPatnerList);"><span class="screen-out">저장</span></button>
<!-- 						{{taskPatnerList | json}} -->
					</div>
				</div>
			</div>
			<!-- //task 입력 -->
		</div>
	</div>
</div>
<!-- <div   ng-controller="dataCtrl"> ng dataCtrl (Start) -->
<div class="layer-member" style="display:none">
	<div class="layer-title-box">
		<h4 class="tit-notice"><span>담당자</span> 리스트</h4>
		<button class="btn-layer-x" ng-click="selectUserListReset()"><span class="screen-out">닫기</span></button>
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
				<col width="70" ng-hide="inputUserType == ''">
				<col width="80">
				<col width="160">
				<col width="170">
				<col width="120">
				<col width="70" ng-show="(loginUserDetails.unitAuthorities == 'POWERUSER'||loginUserDetails.unitAuthorities == 'LEADER') && inputUserType == ''">
			</colgroup>
			<thead>
				<tr>
					<th ng-hide="inputUserType == ''">확정</th>
					<th>이름</th>
					<th>페이스북 ID</th>
					<th>이메일</th>
					<th>핸드폰</th>
					<th ng-show="(loginUserDetails.unitAuthorities == 'POWERUSER'||loginUserDetails.unitAuthorities == 'LEADER') && inputUserType == ''">리더권한</th>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="u in filterUserList | filter: searchUserFilter | start: (userListCurrentPage - 1) * userListItemsPerPage | limitTo: userListItemsPerPage" ">
<!-- 					<td ng-show="" ><input type="radio" name="" id="" value="" ng-model="leaderCaptainSelected"></td> -->
					<td ng-hide="inputUserType == ''"><input type="checkbox" name="" id="" ng-model="u.userCheckBox"  ng-click="inputUserType == 'leader' || inputUserType == 'captain' ? selectedUserOK():''"></td>
					<td><span class="open" ng-click="getUserData(u.idUser)">{{u.userName}}</span></td>
					<td>{{u.userCode}}</td>
					<td>{{u.userEmail}}</td>
					<td>{{u.userTel}}</td>
					<td ng-show="(loginUserDetails.unitAuthorities == 'POWERUSER'||loginUserDetails.unitAuthorities == 'LEADER') && inputUserType == ''">{{u.unitAuthorities == 'POWERUSER' ? 'POWERUSER' : ''}} <input type="checkbox" ng-model="u.unitAuthorities" ng-true-value="'LEADER'" ng-false-value="'LEADER_DELETE'" ng-hide="u.unitAuthorities == 'POWERUSER'" ng-click="leaderCheck(u)"></td>
				</tr>
			</tbody>
		</table>
		<div class="box-print mB10">
			<button class="btn-add1" ng-hide="inputUserType == 'leader' || inputUserType == 'captain' || inputUserType == 'unitPartner'"><span class="screen-out">신규 등록</span></button>
			<button class="btn-ok" ng-click="selectedUserOK()" ng-hide="inputUserType == ''"><span class="screen-out">확인</span></button>
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
<!-- 					<td><input type="text" name="" id="" class="inp-members" value="214061" ng-model="userData.userCode"></td> -->
					<td>{{userData.userCode}}</td>
					<td><input type="text" name="" id="" class="inp-members" value="onsure@asdf.com" ng-model="userData.userEmail"></td>
					<td><input type="text" name="" id="" class="inp-members" value="010-0000-0000" ng-model="userData.userTel"></td>
				</tr>
			</tbody>
		</table>
		<div class="box-btn-center">
			<button class="btn-delete1"  ng-click="deleteUser(userData);"><span class="screen-out">삭제</span></button>
			<button class="btn-save" ng-click="updateUser(userData);"><span class="screen-out">저장</span></button>
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
			<input type="text" name="" id="" class="inp-date2 datepicker mR10">
			<select name="" id="" class="slc-time mR5">
				<option value="">00</option>
			</select>
			<select name="" id="" class="slc-time">
				<option value="">00</option>
			</select>
		</div>
		<div class="box-btn-center">
			<button class="btn-ok-y"><span class="screen-out">삭제</span></button>
		</div>
	</div>
</div>
<!-- 2016-02-23 수정 -->
<div class="layer-alarm" style="display:none">
	<div class="layer-title-box">
		<h4 class="tit-notice"><span>알림</span> 리스트</h4>
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