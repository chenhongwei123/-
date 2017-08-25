//$(function() {
$(document).ready(function() {
	orders()
	orders_paging()
	//----------------------------------------------订单状态---------------------------------------------------

	$(".sele1").on("change", function() {

		$("#dishpageval").val(0)
		$("#change").text(1)

		if($("#dishpageval").val() == 0) {
			//	      			console.log("0")
			$("#PrevPage").attr("disabled", true);
		} //菜品列表分页相关

		var statex = state_str($(".sele1").val())
		localStorage.setItem("state", statex)
		state = JSON.parse(localStorage.getItem("state"))
		orders(state)
		orders_paging(state)

	})

	//----------------------------------------------订单进行查询-----------------------------------------------------
	$("#searchOrder").on("click", function() {
		var keyword = $(".wd1").val()
		orders('', keyword)
		orders_paging()
	})
})

function orders(state, keyword) {
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
			"size": 10,
			"state": state,
			"keyword": keyword
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
}
//---------------------------------------------------全部列表分页----------------------------------------------
function orders_paging(state) {

	$("#dishpageval").val(0)
	$("#change").text(1)

	if($("#dishpageval").val() == 0) {
		//	      			console.log("0")
		$("#PrevPage").attr("disabled", true);
	} //菜品列表分页相关
	$("#NextPage").unbind().click(function() {
		//console.log(state)
		$("#change").text(1)
		$("#PrevPage").removeAttr("disabled");
		var dishstart = ($("#dishpageval").val() - 0) + 10;
		$.ajax({
			type: "get",
			url: urly("admin/orders.json"),
			data: {

				"start": dishstart,
				"size": 10,
				"state": state
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {
				//				console.log(data)
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

	$("#PrevPage").unbind().click(function() {
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
				"size": 10,
				"state": state
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
}
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
	} else if(str == "点击下拉显示需要搜索的类型") {
		return ' '
	}
}
//----------------------------------------------数据存储本地-----------------------------------------------
function btn_href(id) {
	console.log(id)
	window.location.href="datails.html?goodsID=" +encodeURI(id);
//	var id = $(e.target.parentNode.parentNode.children[0]).val()
//	var name = $(e.target.parentNode.parentNode.children[15]).val()
//	var mobile = $(e.target.parentNode.parentNode.children[13]).val()
//	var sn = $(e.target.parentNode.parentNode.children[20]).val()
//	var createTime = $(e.target.parentNode.parentNode.children[5]).val()
//	var img = $(e.target.parentNode.parentNode.children[11]).val()
//	var title = $(e.target.parentNode.parentNode.children[22]).val()
//	var label = $(e.target.parentNode.parentNode.children[12]).val()
//	var state = $(e.target.parentNode.parentNode.children[21]).val()
//	var money = $(e.target.parentNode.parentNode.children[14]).val()
//	var num = $(e.target.parentNode.parentNode.children[16]).val()
//	var amount = $(e.target.parentNode.parentNode.children[2]).val()
//	var address = $(e.target.parentNode.parentNode.children[1]).val()
//	var fare = $(e.target.parentNode.parentNode.children[8]).val()
//	var express = $(e.target.parentNode.parentNode.children[7]).val()
//	var code = $(e.target.parentNode.parentNode.children[4]).val()
//	var remark = $(e.target.parentNode.parentNode.children[17]).val()
//	var str1 = '{"id":"' + id + '","name":"' + name + '","mobile":"' + mobile + '","sn":"' + sn + '","createTime":"' + createTime + '","img":"' + img + '","title":"' + title + '","label":"' + label + '","state":"' + state + '","money":"' + money + '","num":"' + num + '","amount":"' + amount + '","address":"' + address + '","fare":"' + fare + '","express":"' + express + '", "code":"' + code + '","remark":"' + remark + '"}'
//	localStorage.setItem('click_Storage', str1)
} 
function btn_href2(id) {
	console.log(id)
	window.location.href="send-out.html?goodsID=" +encodeURI(id);
} 

//----------------------------订单状态类型转换-------------------------------------------------
function state_o(e) {
	switch(e) {
		case 0:
			return '待支付'
			break;

		case 1:
			return '待发货'
			break;
		case 2:
			return '待收货'
			break;
		case 3:
			return '待评价'
			break;
		case 4:
			return '已完成'
			break;
		case 5:
			return '申请退款(待发货)'
			break;
		case 6:
			return '申请退款(待收货)'
			break;
		case 7:
			return '退款中'
			break;
		case 8:
			return '退款完成'
			break;
		case 9:
			return '申请退货(待收货)'
			break;
		case 10:
			return '申请退货(待发货)'
			break;
		case 11:
			return '申请退货(已收货)'
			break;
		case 12:
			return '退货中(待买家发货)'
			break;
		case 13:
			return '退货中(待卖家收货)'
			break;
		case 14:
			return '退货退款完成'
			break;
		case 15:
			return '拒绝退款(待发货)'
			break;
		case 16:
			return '拒绝退款(待收货)'
			break;
		case 17:
			return '拒绝退货(待收货)'
			break;
		case 18:
			return '拒绝退货(待评价)'
			break;
		case 19:
			return '拒绝退货(已收货)'
			break;
		case 20:
			return '取消退款(待发货)'
			break;
		case 21:
			return '取消退款(待收货)'
			break;
		case 22:
			return '取消退货(待收货)'
			break;
		case 23:
			return '取消退货(待评价)'
			break;
		case 24:
			return '取消退货(已收货)'
			break;
	};
}