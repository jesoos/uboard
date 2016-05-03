<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
	<title>프로젝트 추진 현황</title>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/uboardTV/css/common.css" />	
	<link rel='stylesheet' type='text/css' href='${pageContext.request.contextPath}/resources/uboardTV/css/Nwagon.css' />
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/uboardTV/js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/uboardTV/js/pie-chart.js" ></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/uboardTV/js/common.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/resources/uboardTV/js/Nwagon.js"></script>
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
// 			var urlList = [
// 			            "${pageContext.request.contextPath}/uboardTV/mainViewB2.do"
// 			            ,"${pageContext.request.contextPath}/uboardTV/mainViewB3.do"
// 			            ,"${pageContext.request.contextPath}/uboardTV/mainViewB4.do"];
// 			function openTvWindows() { for( i in urlList) window.open (urlList[i]);	}
// 			openTvWindows();
	</script>
<!-- //Publishing 이후 추가  -->
</head>
<body>
<div class="wrap" ng-app="myApp" ng-controller="uboardtvCtrl">
	<div class="header">
		<h1><img src="${pageContext.request.contextPath}/resources/uboardTV/img/h1.png" alt="프로젝트 추진 현황 B:보고사항있음, G:진행상태 양호, Y: 이슈해소 진행 중, R : 이슈발생"></h1>
	</div>
	<div class="wrap-main">
		<div class="wrap-contents">			
			<div class="box-charts" ng-class="index%2==0 ? 'mR20' : ''" ng-repeat="(index, psitnSignal) in uTvUCountList | limitTo:4" on-finish-render="UboardTv1">
				<div class="box-charts-sub">
					<div class="box-charts-left">
						<div class="txt-total">{{psitnSignal.psitnName}} ({{psitnSignal.signalAll}}건)</div>
						<div>
							<ul class="list-chart">
								<li>
									<span class="ico-rb"></span>
									<span>{{psitnSignal.signalR == 0 ? "없음" : psitnSignal.signalR +"건"}}</span>
								</li>
								<li>
									<span class="ico-yb"></span>
									<span>{{psitnSignal.signalY == 0 ? "없음" : psitnSignal.signalY +"건"}}</span>
								</li>
								<li>
									<span class="ico-gb"></span>
									<span>{{psitnSignal.signalG == 0 ? "없음" : psitnSignal.signalG +"건"}}</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="box-charts-right">
						<div id="chart_d{{index+1}}"></div>
						<div class="bg_cover"></div>
					</div>
				</div>
			</div>
<!-- 			<div class="box-charts"> -->
<!-- 				<div class="box-charts-sub"> -->
<!-- 					<div class="box-charts-left"> -->
<!-- 						<div class="txt-total1">한화생명 (17건)</div> -->
<!-- 						<div> -->
<!-- 							<ul class="list-chart"> -->
<!-- 								<li> -->
<!-- 									<span class="ico-rb"></span> -->
<!-- 									<span>1건</span> -->
<!-- 								</li> -->
<!-- 								<li> -->
<!-- 									<span class="ico-yb"></span> -->
<!-- 									<span>3건</span> -->
<!-- 								</li> -->
<!-- 								<li> -->
<!-- 									<span class="ico-gb"></span> -->
<!-- 									<span>13건</span> -->
<!-- 								</li> -->
<!-- 							</ul> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 					<div class="box-charts-right"> -->
<!-- 						<div id="chart_d2"></div> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 			<div class="box-charts mR20"> -->
<!-- 				<div class="box-charts-sub"> -->
<!-- 					<div class="box-charts-left"> -->
<!-- 						<div class="txt-total1">그룹 (6건)</div> -->
<!-- 						<div> -->
<!-- 							<ul class="list-chart"> -->
<!-- 								<li> -->
<!-- 									<span class="ico-rb"></span> -->
<!-- 									<span>없음</span> -->
<!-- 								</li> -->
<!-- 								<li> -->
<!-- 									<span class="ico-yb"></span> -->
<!-- 									<span>1건</span> -->
<!-- 								</li> -->
<!-- 								<li> -->
<!-- 									<span class="ico-gb"></span> -->
<!-- 									<span>5건</span> -->
<!-- 								</li> -->
<!-- 							</ul> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 					<div class="box-charts-right"> -->
<!-- 						<div id="chart_d3"></div> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 			<div class="box-charts"> -->
<!-- 				<div class="box-charts-sub"> -->
<!-- 					<div class="box-charts-left"> -->
<!-- 						<div class="txt-total1">센터 (12건)</div> -->
<!-- 						<div> -->
<!-- 							<ul class="list-chart"> -->
<!-- 								<li> -->
<!-- 									<span class="ico-rb"></span> -->
<!-- 									<span>2건</span> -->
<!-- 								</li> -->
<!-- 								<li> -->
<!-- 									<span class="ico-yb"></span> -->
<!-- 									<span>없음</span> -->
<!-- 								</li> -->
<!-- 								<li> -->
<!-- 									<span class="ico-gb"></span> -->
<!-- 									<span>10건</span> -->
<!-- 								</li> -->
<!-- 							</ul> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 					<div class="box-charts-right"> -->
<!-- 						<div id="chart_d4"></div> -->
<!-- 					</div> -->
<!-- 				</div> -->
<!-- 			</div> -->
		</div>
		Updated on {{updatedOnTime}}
	</div>
</div>
</body>
<script>
	var optionsList = [];
	 optionsList[0] = {
		'dataset': {
			title: '프로젝트 추진 현황차트',
			values:[0, 0, 28],
			colorset: ['#e60012', '#ffb400', '#009944'],
			fields: ['R', 'Y', 'G']
		},
		'donut_width' : 73,  /* 도넛의 두께를 나타내는 값 */
		'core_circle_radius':67, /* 도넛의 중앙에 그려지는 원의 반지름 (파이차트의 경우 ‘0’) */
		'chartDiv': 'chart_d1',
		'chartType': 'donut',
		'chartSize': {width:280, height:280} /* chartSize */
	};
	 optionsList[1] = {
		'dataset': {
			title: '프로젝트 추진 현황차트',
			values:[1, 3, 13],
			colorset: ['#e60012', '#ffb400', '#009944'],
			fields: ['R', 'Y', 'G']
		},
		'donut_width' : 73,  /* 도넛의 두께를 나타내는 값 */
		'core_circle_radius':67, /* 도넛의 중앙에 그려지는 원의 반지름 (파이차트의 경우 ‘0’) */
		'chartDiv': 'chart_d2',
		'chartType': 'donut',
		'chartSize': {width:280, height:280} /* chartSize */
	};
	 optionsList[2] = {
		'dataset': {
			title: '프로젝트 추진 현황차트',
			values:[0, 1, 5],
			colorset: ['#e60012', '#ffb400', '#009944'],
			fields: ['R', 'Y', 'G']
		},
		'donut_width' : 73,  /* 도넛의 두께를 나타내는 값 */
		'core_circle_radius':67, /* 도넛의 중앙에 그려지는 원의 반지름 (파이차트의 경우 ‘0’) */
		'chartDiv': 'chart_d3',
		'chartType': 'donut',
		'chartSize': {width:280, height:280} /* chartSize */
	};
	 optionsList[3] = {
		'dataset': {
			title: '프로젝트 추진 현황차트',
			values:[2, 0, 10],
			colorset: ['#e60012', '#ffb400', '#009944'],
			fields: ['R', 'Y', 'G']
		},
		'donut_width' : 73,  /* 도넛의 두께를 나타내는 값 */
		'core_circle_radius':67, /* 도넛의 중앙에 그려지는 원의 반지름 (파이차트의 경우 ‘0’) */
		'chartDiv': 'chart_d4',
		'chartType': 'donut',
		'chartSize': {width:280, height:280} /* chartSize */
	};
//  Nwagon.chart(options);
// 	Nwagon.chart(options1);
// 	Nwagon.chart(options2);
// 	Nwagon.chart(options3);
</script>
</html>