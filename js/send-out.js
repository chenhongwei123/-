$(document).ready(function() {
	var str = localStorage.getItem('click_Storage');
	var arr = JSON.parse(str);
	console.log(arr)
	$(".sennd_number").setTemplateElement("template");
	$(".sennd_number").processTemplate(arr);
	var id = arr.id

	$(".send-out").on("click", function() {
		var code = $(".inputcode").val()
		var express = $(".inputexpress").val()
		var address = $(".address").val()
		if(address.toString().length == 0) {
			alert("请输入运单号")
		} else if(code.toString().length == 0) {
			alert("请输入发货地址")
		} else {
			dispose(id, express, code,address)
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