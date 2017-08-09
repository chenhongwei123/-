$(document).ready(function() {

	//--------------------------------获取地址上的ID-------------------------------------
	var id = getQueryString("goodsID")
	console.log(id)
	orderDetail(id)

	$(".send-out").on("click", function() {
		var code = $(".inputcode").val()
		var express = $(".inputexpress").val()
		var address = $(".address").val()
		if(address.toString().length == 0) {
			alert("请输入运单号")
		} else if(code.toString().length == 0) {
			alert("请输入发货地址")
		} else {
			dispose(id, express, code, address)
		}
		console.log(id)
		console.log(code)
		console.log(express)
		//dispose(id,express,code)
	})
})
//--------------------------------订单处理-------------------------------------------
function dispose(id, express, code, address) {
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
			"type": 6,
			"express": express,
			"code": code,
			"address": address
		},
		success: function(data) {
			console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					alert("发货成功")
					//location.reload()
					window.history.go(-1)
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


//----------------数据渲染----------------------------
function orderDetail(id) {
	$.ajax({
		type: "get",
		url: urly("admin/orderDetail.json"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		dataType: "json",
		data: {
			id: id
		},
		success: function(data) {
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
//					console.log(data.data)
//					var arr = data.data
//					$(".buyer").setTemplateElement("template2");
//					$(".buyer").processTemplate(arr);
					var details = data.data.details
					$(".sennd_number").setTemplateElement("template");
					$(".sennd_number").processTemplate(details);
					break;
				default:
					alert(data.msg)
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