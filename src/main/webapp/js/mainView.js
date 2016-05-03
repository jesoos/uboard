
function addTodayDate(){
	var toDateText = document.getElementById("fromDate");
//	if(toDateText.value == ''){
		var fdt = new Date();
		toDateText.value = fdt.getFullYear() + "-" + ('0'+(fdt.getMonth()+1)).slice(-2) + "-" + ('0'+(fdt.getDate())).slice(-2);
//	}
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
//	if(toDateText.value == ''){
		var fdt = new Date();
		toDateText.value = fdt.getFullYear() + "-" + ('0'+(fdt.getMonth()+1)).slice(-2) + "-" + ('0'+(fdt.getDate())).slice(-2);
//	}
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
//	var fromDate = new Date(document.getElementById("fromDate").value);
//	var toDate = document.getElementById("toDate");
//	fromDate.setMonth(fromDate.getMonth() + 1);
//	toDate.value=fromDate.getFullYear() + "-" + ('0'+(fromDate.getMonth()+1)).slice(-2) + "-" + ('0'+(fromDate.getDate())).slice(-2);
}

function month(){
	addTodayDate2();
	var toDate = new Date(document.getElementById("toDate").value);
	var fromDate = document.getElementById("fromDate");
	toDate.setMonth(toDate.getMonth()-1);
	fromDate.value=toDate.getFullYear() + "-" + ('0'+(toDate.getMonth()+1)).slice(-2) + "-" + ('0'+(toDate.getDate())).slice(-2);
}

//페이지 스크립트
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