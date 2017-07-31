//$(function() {
$(document).ready(function() {
	//---------------------------------------------浏览订单----------------------------------------------
	$.ajax({
		type: "get",
		url: urly("admin/orders.json"),
		async: true,
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		dataType: "json",

		data: {
			"start": 0,
			"size": 10
		},
		success: function(data) {
			console.log(data)
			var jsondata = data.data.objs;
			$("#collect").html(data.data.total)
			$("#turnover").html(data.data.turnover)
			$("#orderCount").html(data.data.count)
			// console.log(jsondata)
			$("#tbody1").setTemplateElement("template");
			$("#tbody1").processTemplate(jsondata);

			//-----------------分页状态-----------------------
			$("#PrevPage").attr("disabled", true);
			$("#NextPage").attr("disabled", true);

			if(JSON.stringify(data.data.total) < 10) {
				$("#NextPage").attr("disabled", true);
			} else {
				$("#NextPage").removeAttr("disabled");
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

	//---------------------------------------------------全部列表分页----------------------------------------------
	if($("#dishpageval").val() == 0) {
		//	      			console.log("0")
		$("#PrevPage").attr("disabled", true);
	} //菜品列表分页相关

	$("#NextPage").click(function() {

		$("#change").text(1)
		$("#PrevPage").removeAttr("disabled");
		var dishstart = ($("#dishpageval").val() - 0) + 10;
		$.ajax({
			type: "get",
			url: urly("admin/orders.json"),
			data: {

				"start": dishstart,
				"size": 10
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {
				console.log(data)
				var jsondata = data.data.objs;

				$("#tbody1").setTemplateElement("template");
				$("#tbody1").processTemplate(jsondata);

				$("#dishpageval").val(dishstart);
				$("#change").text($("#dishpageval").val() / 10 + 1)

				if(JSON.stringify(data.data.total) - 10 <= $("#dishpageval").val()) {
					$("#NextPage").attr('disabled', true);
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
	}); //下一页

	$("#PrevPage").click(function() {
		var dishstart = $("#dishpageval").val() - 10;
		$("#NextPage").removeAttr("disabled");
		if(dishstart < 0) {
			return dishstart = 0;
		}
		$.ajax({
			type: "get",
			url: urly("admin/orders.json"),
			data: {

				"start": dishstart,
				"size": 10
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {
				var jsondata = data.data.objs;

				$("#tbody1").setTemplateElement("template");
				$("#tbody1").processTemplate(jsondata);

				$("#dishpageval").val(dishstart);
				$("#change").text($("#dishpageval").val() / 10 + 1)
				if(dishstart == 0) {
					$("#PrevPage").attr("disabled", true);
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
	}); //上一页

	//----------------------------------------------订单状态---------------------------------------------------

	$(".sele1").on("change", function() {
		//alert("111")
		//	$("#tbody1").empty($tr)
		console.log(state_str($(".sele1").val()))
		$("#change1").text(1)
		$("#dishpageval1").val(0);
		$("#Paging").css("display", "none")
		$("#Paging1").css("display", "block")
		if($("#dishpageval1").val() == 0) {
			//	      			console.log("0")
			$("#PrevPage1").attr("disabled", true);
		} //菜品列表分页相关

		$.ajax({
			type: "get",
			url: urly("admin/orders.json"),
			async: true,
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},

			dataType: "json",

			data: {
				"state": state_str($(".sele1").val()),
				"start": 0,
				"size": 10
			},
			success: function(data) {
				console.log(data)
				var jsondata = data.data.objs;

				$("#tbody1").setTemplateElement("template");
				$("#tbody1").processTemplate(jsondata);

				$("#PrevPage1").attr("disabled", true);
				$("#NextPage1").attr("disabled", true);

				if(JSON.stringify(data.data.total) < 10) {
					$("#NextPage1").attr("disabled", true);
				} else {
					$("#NextPage1").removeAttr("disabled");
				}
			}
		});
	})
	//---------------------------------------------------根据状态来列表分页----------------------------------------------
	$("#NextPage1").click(function() {
		//	$("#tbody1").empty($tr)
		$("#PrevPage1").removeAttr("disabled");
		var dishstart1 = ($("#dishpageval1").val() - 0) + 10;
		$.ajax({
			type: "get",
			url: urly("admin/orders.json"),
			data: {
				"state": state_str($(".sele1").val()),
				"start": dishstart1,
				"size": 10,
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {

				var jsondata = data.data.objs;

				$("#tbody1").setTemplateElement("template");
				$("#tbody1").processTemplate(jsondata);

				$("#dishpageval1").val(dishstart1);
				$("#change1").text($("#dishpageval1").val() / 10 + 1)

				if(JSON.stringify(data.data.total) - 10 <= $("#dishpageval1").val()) {
					$("#NextPage1").attr('disabled', true);
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
	}); //下一页

	$("#PrevPage1").click(function() {
		//	$("#tbody1").empty($tr)
		var dishstart1 = $("#dishpageval1").val() - 10;
		$("#NextPage1").removeAttr("disabled");
		if(dishstart1 < 0) {
			return dishstart1 = 0;
		}
		$.ajax({
			type: "get",
			url: urly("admin/orders.json"),
			data: {
				"state": state_str($(".sele1").val()),
				"start": dishstart1,
				"size": 10
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {

				console.log(dishstart1)
				var jsondata = data.data.objs;

				$("#tbody1").setTemplateElement("template");
				$("#tbody1").processTemplate(jsondata);

				$("#dishpageval1").val(dishstart1);
				$("#change1").text($("#dishpageval1").val() / 10 + 1)
				if(dishstart1 == 0) {
					$("#PrevPage1").attr("disabled", true);
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
	}); //上一页

	//----------------------------------------------订单进行查询-----------------------------------------------------
	$("#searchOrder").on("click", function() {
		$("#dishpageval").val(0);
		$("#Paging").css("display", "none")
		$("#Paging1").css("display", "none")
		$("#change").text(1)
		$.ajax({
			type: "get",
			url: urly("admin/orders.json"),
			data: {
				"keyword": $(".wd1").val(),
				"start": 0,
				"size": 100
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {

				var jsondata = data.data.objs;

				$("#tbody1").setTemplateElement("template");
				$("#tbody1").processTemplate(jsondata);

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

	})

	//------------------------------------------------------状态类型处理-------------------------------------------------
	function state_str(str) {
		if(str == "待付款") {
			return 0
		} else if(str == "待发货") {
			return 1
		} else if(str == "已完成") {
			return 2
		} else if(str == "退货/退款") {
			return 3
		}
	}
})

//----------------------------------------------数据存储本地-----------------------------------------------
function click_Storage(e) {
	var id = $(e.target.parentNode.parentNode.children[0]).val()
	var name = $(e.target.parentNode.parentNode.children[15]).val()
	var mobile = $(e.target.parentNode.parentNode.children[13]).val()
	var sn = $(e.target.parentNode.parentNode.children[20]).val()
	var createTime = $(e.target.parentNode.parentNode.children[5]).val()
	var img = $(e.target.parentNode.parentNode.children[11]).val()
	var title = $(e.target.parentNode.parentNode.children[22]).val()
	var label = $(e.target.parentNode.parentNode.children[12]).val()
	var state = $(e.target.parentNode.parentNode.children[21]).val()
	var money = $(e.target.parentNode.parentNode.children[14]).val()
	var num = $(e.target.parentNode.parentNode.children[16]).val()
	var amount = $(e.target.parentNode.parentNode.children[2]).val()
	var address = $(e.target.parentNode.parentNode.children[1]).val()
	var fare = $(e.target.parentNode.parentNode.children[8]).val()
	var express = $(e.target.parentNode.parentNode.children[7]).val()
	var code = $(e.target.parentNode.parentNode.children[4]).val()
	var remark = $(e.target.parentNode.parentNode.children[17]).val()
	var str1 = '{"id":"' + id + '","name":"' + name + '","mobile":"' + mobile + '","sn":"' + sn + '","createTime":"' + createTime + '","img":"' + img + '","title":"' + title + '","label":"' + label + '","state":"' + state + '","money":"' + money + '","num":"' + num + '","amount":"' + amount + '","address":"' + address + '","fare":"' + fare + '","express":"' + express + '", "code":"' + code + '","remark":"' + remark + '"}'
	localStorage.setItem('click_Storage', str1)
}
