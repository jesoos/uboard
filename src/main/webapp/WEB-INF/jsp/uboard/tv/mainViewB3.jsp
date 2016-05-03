<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
	<title>그룹</title>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/uboardTV/css/common.css" />	
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/uboardTV/js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/uboardTV/js/pie-chart.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/uboardTV/js/jquery.bxslider.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/uboardTV/js/common.js"></script>
<!-- Publishing 이후 추가  -->
	<script src="${pageContext.request.contextPath}/js/angular-1.4.8.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/angular-route-1.4.8.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-module.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-uboardtvCtrl.js"></script>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-regCtrl.js"></script> --%>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-PaginationCtrl.js"></script> --%>
<%-- 	<script type="text/javascript" src="${pageContext.request.contextPath}/js/ng-ctrl.js"></script> --%>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/angular.easypiechart.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/ui-bootstrap-tpls-0.11.0.js"></script>
	<script src="${pageContext.request.contextPath}/js/ng-infinite-scroll-1.2.2.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/FileSaver.js"></script>
	<script>var ctx = "${pageContext.request.contextPath}"
			function getContextPath(){
	 		   return ctx;
			}
	</script>
<!-- //Publishing 이후 추가  -->
</head>
<body>
<div class="wrap" ng-app="myApp" ng-controller="uboardtvCtrl">
	<div class="wrap-main">
		<div class="wrap-contents">			
			<!-- 리스트 -->
			<div class="box-list">
				<!-- 전체 -->
				<h1 class="tit-h1">그룹</h1>
				<div id="list0" class="box-lists">
					<div class="box-contents">
						<div class="gnb-tv">
							<span class="gnb1"><img src="${pageContext.request.contextPath}/resources/uboardTV/img/th1.png" alt="Unit"></span>
							<span class="gnb2"><img src="${pageContext.request.contextPath}/resources/uboardTV/img/th2.png" alt="Progress"></span>
							<span class="gnb3"><img src="${pageContext.request.contextPath}/resources/uboardTV/img/th3.png" alt="Signal"></span>
							<span class="gnb4"><img src="${pageContext.request.contextPath}/resources/uboardTV/img/th4.png" alt="Leader / Captain"></span>
							<span class="gnb5"><img src="${pageContext.request.contextPath}/resources/uboardTV/img/th5.png" alt="Schedule"></span>
						</div>
						<ul class="bxslider">
							<li ng-repeat="(indexW, w) in filterUboardTvDataList | limitTo : (filterUboardTvDataList.length-1) / uboardTvViewby + 1" on-finish-render="UboardTv2">
								<ul class="list-units">
									<li ng-repeat="(index, x) in filterUboardTvDataList |start: (indexW) * uboardTvViewby  | limitTo: uboardTvViewby">
										<div class="box-list-contents">
											<span class="con1">
												<i ng-class="x.alramCode == '' ? '' : 'ico-b'"></i>
												<span class="txt-">{{x.unitName}}</span>
											</span>
											<span class="con2">
												 <div class="pie-title-center demo-pie-1" data-percent="{{x.progress}}">
												 	<span class="pie-value"></span> 
												 </div>
											</span>
											<span class="con3">
												<span class="ico-{{x.signalCode|lowercase}}"></span>	
											</span>
											<span class="con4">
												<span class="txt-leader-l clefix">
													<span class="fl txt-orange"><img src="${pageContext.request.contextPath}/resources/uboardTV/img/txt_l.png" alt="L"></span>
													<span class="fl txt-leader-ls">{{x.leader}}</span>
													<span class="ico_{{x.leaderStateCode}} fl"></span>
													<span class="fl">{{x.leaderStateCode=="state4" || x.leaderStateCode=="state5" ? (x.leaderStateFrom | taskDateFormat) + " ~ " + (x.leaderStateTo | taskDateFormat) : (x.leaderStateCode=="state1" ? "&nbsp;&nbsp;&nbsp;&nbsp;" : x.leaderStateTime)}}</span>
												</span>
												<span class="txt-leader-c clefix">
													<span class="fl txt-orange"><img src="${pageContext.request.contextPath}/resources/uboardTV/img/txt_c.png" alt="C"></span>
													<span class="fl txt-leader-ls">{{x.captain}}</span>
													<span class="ico_{{x.captainStateCode}} fl"></span>
													<span class="fl">{{x.captainStateCode=="state4" || x.captainStateCode=="state5" ? (x.captainStateFrom | taskDateFormat) + " ~ " + (x.captainStateTo | taskDateFormat) : (x.captainStateCode=="state1" ? "&nbsp;&nbsp;&nbsp;&nbsp;" : x.captainStateTime)}}</span>
												</span>
											</span>
											<span class="con5">
													{{x.fromDate | resultDateFormat}} ~ {{x.toDate | resultDateFormat}}
											</span>
										</div>
									</li>
<!-- 									<li> -->
<!-- 										<div class="box-list-contents"> -->
<!-- 											<span class="con1"> -->
<!-- 												<span class="txt-">핀테크 JV 설립 TF</span> -->
<!-- 											</span> -->
<!-- 											<span class="con2"> -->
<!-- 												 <div class="pie-title-center demo-pie-1" data-percent="20"> -->
<!-- 												 	<span class="pie-value"></span>  -->
<!-- 												 </div> -->
<!-- 											</span> -->
<!-- 											<span class="con3"> -->
<!-- 												<span class="ico-r"></span>	 -->
<!-- 											</span> -->
<!-- 											<span class="con4"> -->
<!-- 												<span class="txt-leader-l clefix"> -->
<!-- 													<span class="fl txt-orange">L</span> -->
<!-- 													<span class="fl txt-leader-ls">강리더</span> -->
<!-- 													<span class="ico_state1 fl"></span> -->
<!-- 													<span class="fl"></span> -->
<!-- 												</span> -->
<!-- 												<span class="txt-leader-c clefix"> -->
<!-- 													<span class="fl txt-orange">C</span> -->
<!-- 													<span class="fl txt-leader-ls">강캡틴</span> -->
<!-- 													<span class="ico_state4 fl"></span> -->
<!-- 													<span class="fl">11.24 ~ 11.25</span> -->
<!-- 												</span> -->
<!-- 											</span> -->
<!-- 											<span class="con5"> -->
<!-- 													2015.12.09 ~ 2015.12.24 -->
<!-- 											</span> -->
<!-- 										</div> -->
<!-- 									</li> -->
<!-- 									<li> -->
<!-- 										<div class="box-list-contents"> -->
<!-- 											<span class="con1"> -->
<!-- 												<i class="ico-b"></i> -->
<!-- 												<span class="txt-">e-보험추진팀 온슈어 개편 프로젝트</span> -->
<!-- 											</span> -->
<!-- 											<span class="con2"> -->
<!-- 												 <div class="pie-title-center demo-pie-1" data-percent="80"> -->
<!-- 												 	<span class="pie-value"></span>  -->
<!-- 												 </div> -->
<!-- 											</span> -->
<!-- 											<span class="con3"> -->
<!-- 												<span class="ico-g"></span>	 -->
<!-- 											</span> -->
<!-- 											<span class="con4"> -->
<!-- 												<span class="txt-leader-l clefix"> -->
<!-- 													<span class="fl txt-orange">L</span> -->
<!-- 													<span class="fl txt-leader-ls">강리더</span> -->
<!-- 													<span class="ico_state2 fl"></span> -->
<!-- 													<span class="fl">오후</span> -->
<!-- 												</span> -->
<!-- 												<span class="txt-leader-c clefix"> -->
<!-- 													<span class="fl txt-orange">C</span> -->
<!-- 													<span class="fl txt-leader-ls">강캡틴</span> -->
<!-- 													<span class="ico_state1 fl"></span> -->
<!-- 													<span class="fl"></span> -->
<!-- 												</span> -->
<!-- 											</span> -->
<!-- 											<span class="con5"> -->
<!-- 													2015.12.09 ~ 2015.12.24 -->
<!-- 											</span> -->
<!-- 										</div> -->
<!-- 									</li> -->
<!-- 									<li> -->
<!-- 										<div class="box-list-contents"> -->
<!-- 											<span class="con1"> -->
<!-- 												<i class="ico-b"></i> -->
<!-- 												<span class="txt-">e-보험추진팀 온슈어 개편 프로젝트</span> -->
<!-- 											</span> -->
<!-- 											<span class="con2"> -->
<!-- 												 <div class="pie-title-center demo-pie-1" data-percent="60"> -->
<!-- 												 	<span class="pie-value"></span>  -->
<!-- 												 </div> -->
<!-- 											</span> -->
<!-- 											<span class="con3"> -->
<!-- 												<span class="ico-g"></span>	 -->
<!-- 											</span> -->
<!-- 											<span class="con4"> -->
<!-- 												<span class="txt-leader-l clefix"> -->
<!-- 													<span class="fl txt-orange">L</span> -->
<!-- 													<span class="fl txt-leader-ls">강리더</span> -->
<!-- 													<span class="ico_state5 fl"></span> -->
<!-- 													<span class="fl">11.24 ~ 11.25</span> -->
<!-- 												</span> -->
<!-- 												<span class="txt-leader-c clefix"> -->
<!-- 													<span class="fl txt-orange">C</span> -->
<!-- 													<span class="fl txt-leader-ls">강캡틴</span> -->
<!-- 													<span class="ico_state3 fl"></span> -->
<!-- 													<span class="fl">오전</span> -->
<!-- 												</span> -->
<!-- 											</span> -->
<!-- 											<span class="con5"> -->
<!-- 													2015.12.09 ~ 2015.12.24 -->
<!-- 											</span> -->
<!-- 										</div> -->
<!-- 									</li> -->
								</ul>
							</li>
<!-- 							<li> -->
<!-- 								<ul class="list-units"> -->
<!-- 									<li> -->
<!-- 										<div class="box-list-contents"> -->
<!-- 											<span class="con1"> -->
<!-- 												<i class="ico-b"></i> -->
<!-- 												<span class="txt-">[P.2]e-보험추진팀 온슈어 개편 프로젝트</span> -->
<!-- 											</span> -->
<!-- 											<span class="con2"> -->
<!-- 												 <div class="pie-title-center demo-pie-1" data-percent="30"> -->
<!-- 												 	<span class="pie-value"></span>  -->
<!-- 												 </div> -->
<!-- 											</span> -->
<!-- 											<span class="con3"> -->
<!-- 												<span class="ico-y"></span>	 -->
<!-- 											</span> -->
<!-- 											<span class="con4"> -->
<!-- 												<span class="txt-leader-l clefix"> -->
<!-- 													<span class="fl txt-orange">L</span> -->
<!-- 													<span class="fl txt-leader-ls">강리더</span> -->
<!-- 													<span class="ico_state5 fl"></span> -->
<!-- 													<span class="fl">11.24 ~ 11.25</span> -->
<!-- 												</span> -->
<!-- 												<span class="txt-leader-c clefix"> -->
<!-- 													<span class="fl txt-orange">C</span> -->
<!-- 													<span class="fl txt-leader-ls">강캡틴</span> -->
<!-- 													<span class="ico_state1 fl"></span> -->
<!-- 													<span class="fl"></span> -->
<!-- 												</span> -->
<!-- 											</span> -->
<!-- 											<span class="con5"> -->
<!-- 													2015.12.09 ~ 2015.12.24 -->
<!-- 											</span> -->
<!-- 										</div> -->
<!-- 									</li> -->
<!-- 									<li> -->
<!-- 										<div class="box-list-contents"> -->
<!-- 											<span class="con1"> -->
<!-- 												<span class="txt-">핀테크 JV 설립 TF</span> -->
<!-- 											</span> -->
<!-- 											<span class="con2"> -->
<!-- 												 <div class="pie-title-center demo-pie-1" data-percent="20"> -->
<!-- 												 	<span class="pie-value"></span>  -->
<!-- 												 </div> -->
<!-- 											</span> -->
<!-- 											<span class="con3"> -->
<!-- 												<span class="ico-r"></span>	 -->
<!-- 											</span> -->
<!-- 											<span class="con4"> -->
<!-- 												<span class="txt-leader-l clefix"> -->
<!-- 													<span class="fl txt-orange">L</span> -->
<!-- 													<span class="fl txt-leader-ls">강리더</span> -->
<!-- 													<span class="ico_state1 fl"></span> -->
<!-- 													<span class="fl"></span> -->
<!-- 												</span> -->
<!-- 												<span class="txt-leader-c clefix"> -->
<!-- 													<span class="fl txt-orange">C</span> -->
<!-- 													<span class="fl txt-leader-ls">강캡틴</span> -->
<!-- 													<span class="ico_state4 fl"></span> -->
<!-- 													<span class="fl">11.24 ~ 11.25</span> -->
<!-- 												</span> -->
<!-- 											</span> -->
<!-- 											<span class="con5"> -->
<!-- 													2015.12.09 ~ 2015.12.24 -->
<!-- 											</span> -->
<!-- 										</div> -->
<!-- 									</li> -->
<!-- 									<li> -->
<!-- 										<div class="box-list-contents"> -->
<!-- 											<span class="con1"> -->
<!-- 												<i class="ico-b"></i> -->
<!-- 												<span class="txt-">e-보험추진팀 온슈어 개편 프로젝트</span> -->
<!-- 											</span> -->
<!-- 											<span class="con2"> -->
<!-- 												 <div class="pie-title-center demo-pie-1" data-percent="80"> -->
<!-- 												 	<span class="pie-value"></span>  -->
<!-- 												 </div> -->
<!-- 											</span> -->
<!-- 											<span class="con3"> -->
<!-- 												<span class="ico-g"></span>	 -->
<!-- 											</span> -->
<!-- 											<span class="con4"> -->
<!-- 												<span class="txt-leader-l clefix"> -->
<!-- 													<span class="fl txt-orange">L</span> -->
<!-- 													<span class="fl txt-leader-ls">강리더</span> -->
<!-- 													<span class="ico_state2 fl"></span> -->
<!-- 													<span class="fl">오후</span> -->
<!-- 												</span> -->
<!-- 												<span class="txt-leader-c clefix"> -->
<!-- 													<span class="fl txt-orange">C</span> -->
<!-- 													<span class="fl txt-leader-ls">강캡틴</span> -->
<!-- 													<span class="ico_state1 fl"></span> -->
<!-- 													<span class="fl"></span> -->
<!-- 												</span> -->
<!-- 											</span> -->
<!-- 											<span class="con5"> -->
<!-- 													2015.12.09 ~ 2015.12.24 -->
<!-- 											</span> -->
<!-- 										</div> -->
<!-- 									</li> -->
<!-- 									<li> -->
<!-- 										<div class="box-list-contents"> -->
<!-- 											<span class="con1"> -->
<!-- 												<i class="ico-b"></i> -->
<!-- 												<span class="txt-">e-보험추진팀 온슈어 개편 프로젝트</span> -->
<!-- 											</span> -->
<!-- 											<span class="con2"> -->
<!-- 												 <div class="pie-title-center demo-pie-1" data-percent="60"> -->
<!-- 												 	<span class="pie-value"></span>  -->
<!-- 												 </div> -->
<!-- 											</span> -->
<!-- 											<span class="con3"> -->
<!-- 												<span class="ico-g"></span>	 -->
<!-- 											</span> -->
<!-- 											<span class="con4"> -->
<!-- 												<span class="txt-leader-l clefix"> -->
<!-- 													<span class="fl txt-orange">L</span> -->
<!-- 													<span class="fl txt-leader-ls">강리더</span> -->
<!-- 													<span class="ico_state5 fl"></span> -->
<!-- 													<span class="fl">11.24 ~ 11.25</span> -->
<!-- 												</span> -->
<!-- 												<span class="txt-leader-c clefix"> -->
<!-- 													<span class="fl txt-orange">C</span> -->
<!-- 													<span class="fl txt-leader-ls">강캡틴</span> -->
<!-- 													<span class="ico_state3 fl"></span> -->
<!-- 													<span class="fl">오전</span> -->
<!-- 												</span> -->
<!-- 											</span> -->
<!-- 											<span class="con5"> -->
<!-- 													2015.12.09 ~ 2015.12.24 -->
<!-- 											</span> -->
<!-- 										</div> -->
<!-- 									</li> -->
								</ul>
							</li>
						</ul>
					</div>
				</div>				
			</div>
			<!-- //리스트 -->			
		</div>
		Updated on {{updatedOnTime}}
	</div>
</div>
<div id="backgroundPopup" style="display:none"></div>
</body>
</html>