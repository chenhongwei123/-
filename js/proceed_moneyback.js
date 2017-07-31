$(document).ready(function() {
	console.log(getQueryString("goodsID"))
	var id = getQueryString("goodsID")
	//	refund(1251)
	refund(id)
	//-------------------------------同意退款------------------------------------------------
	$(".btn_agree").click(function() {
		swal({
				title: "确定退款申请?",
				text: "",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes",
				closeOnConfirm: false
			},
			function() {
				dispose(id, 1)
			});

	})
	//--------------------------------拒绝退款申请--------------------------------------------

	$(".btn_nomoney").click(function() {
		swal({
				title: "确定拒绝买家的退款申请?",
				text: "",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes",
				closeOnConfirm: false
			},
			function() {
				dispose(id, 3)
			});

	})
	//-------------------------------联系买家------------------------------------------------
	$(".btn_contact").click(function() {
		var mobile = $("#mobile").val()
		alert("联系电话：" + mobile)

	})

	//------------------------------同意退货----------------------------------------------
	$(".btn_yes").click(function() {
		//alert("11")
		var address=$('.address').val()
		if(address.length==0) {
			alert("请填写收货地址给买家")
		} else {
			
			dispose(id, 2)
		}

	})
	//---------------------------拒绝-------------------------------- 
	$(".btn_no").click(function() {
		swal({
				title: "是否确定拒绝退货申请?",
				text: "",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes",
				closeOnConfirm: false
			},
			function() {
				dispose(id, 4)
				//alert('111')
			});
	})
})
//------------------------订单详情-------------------------------
function refund(id) {
	$.ajax({
		type: "get",
		url: urly("admin/refund.json"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		dataType: "json",
		data: {
			"id": id
		},
		success: function(data) {
			console.log(data)
			console.log(data.data.state)
			var state = data.data.state
			switch(JSON.stringify(data.code)) {
				case '"A00000"':

					if(state == 5) {
						$(".T_1").css("display", "block")
						$(".T_type1").css("display", "block")
					} else if(state == 7) {
						$(".T_2").css("display", "block")
						$(".T_type2").css("display", "block")
					} else if(state == 8) {
						$(".T_3").css("display", "block")
						$(".T_type3").css("display", "block")
					}else if(state == 9) {
						$(".T_4").css("display", "block")
						$(".T_type4").css("display", "block")
					}

					//-------------倒计时处理--------------------------------------------
					var time = parseInt(data.data.createTime) + 24 * 60 * 60 * 1000 * 5
					var timer = setInterval(show, 100);

					function show() {
						$(".count_down").html(getTime(time))
						$("i").html(getTime(time))
					}
					//申请时间
					$(".timer").html(formatDate(data.data.createTime))
					//卖家同意退款时间
					$(".timerx").html(formatDate(data.data.agreeTime))
					//联系电话
					$("#mobile").val(data.data.mobile)
					
					
					
					//模版渲染
					var jsondata = data.data;
					$("#tbody1").setTemplateElement("template");
					$("#tbody1").processTemplate(jsondata);

					break;
				default:
					alert("请求失败")
					console.log(data.code)

			}

		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			console.log("请求失败" + XmlHttpRequest.responseText);
			console.log("请求失败" + XMLHttpRequest.status);
			console.log("请求失败" + XMLHttpRequest.readyState);
			console.log("请求失败" + textStatus);
			if(textStatus == "parsererror") {
				window.location.href = "../login.html"
			}
		}
	});
}
//--------------------------------订单处理-------------------------------------------
function dispose(id, type, address) {
	$.ajax({
		type: "get",
		url: urly("admin/handleOrder.json"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		dataType: "json",
		data: {
			"id": id,
			"type": type,
			"address": address
		},
		success: function(data) {
			console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					alert("操作成功")
					//location.reload()
					break;
				default:
					alert("请求失败")
					console.log(data.code)
			}
		},
		error: function(XmlHttpRequest, textStatus, errorThrown) {
			console.log("请求失败" + XmlHttpRequest.responseText);
			console.log("请求失败" + XMLHttpRequest.status);
			console.log("请求失败" + XMLHttpRequest.readyState);
			console.log("请求失败" + textStatus);
			if(textStatus == "parsererror") {
				window.location.href = "../login.html"
			}
		}
	});
}