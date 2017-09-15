$(document).ready(function() {

	//--------------------------------获取地址上的ID-------------------------------------
	//console.log(getQueryString("goodsID"))
	var id = getQueryString("goodsID")
	bjpDetail(id)
	users()
})
//---------------------------渲染数据----------------------------------------------
function bjpDetail(id) {
	$.ajax({
		type: "get",
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		url: urly("admin/bjpDetail.json"),
		data: {
			id: id
		},
		async: true,
		dataType: "json",
		success: function(data) {
			console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					$(".title").html(data.data.title)
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
//---------------------------用户id----------------------------------------------
function users() {
	$.ajax({
		type: "get",
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		url: urlz("admin/users.action"),
		data: {
			start: 0,
			size: 1000
		},
		async: true,
		dataType: "json",
		success: function(data) {
			console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					console.log(data.data.objs)
					var array = data.data.objs
					//对数组对象进行排序（从小到大）
					var compare = function(prop) {
						return function(obj1, obj2) {
							var val1 = obj1[prop];
							var val2 = obj2[prop];
							if(!isNaN(Number(val1)) && !isNaN(Number(val2))) {
								val1 = Number(val1);
								val2 = Number(val2);
							}
							if(val1 < val2) {
								return -1;
							} else if(val1 > val2) {
								return 1;
							} else {
								return 0;
							}
						}
					}
					array.sort(compare("id")) //调用

					$(".users_id").setTemplateElement("template");
					$(".users_id").processTemplate(array); //规格参数

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

//-------------------------------点击评论-------------------------------------------------------------
function affirm() {
	var bid = getQueryString("goodsID")
	var arr_uids = new Array()
	var score = $('input:radio[name="score"]:checked').val();
	var content =$("textarea").val()
    //获取多选的用户ID
	$("input:checkbox[name='usersId']:checked").each(function() {
		if($(this).val().length !== 0) {
			arr_uids.push($(this).val());
		}
	});
    $(".checkbox_users").val(arr_uids.join(';'))
    var uids= $(".checkbox_users").val()
//  console.log(uids)
//  console.log(score)
//  console.log(content)
    
	if($(".checkbox_users").val() == '') {
		alert("请选择要评价的用户")
	} else {
		$.ajax({
			type: "get",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			url: urly("admin/comment.json"),
			data: {
				bid: bid,
				uids: uids,
				score: score,
				content:content
//              oid:oid

			},
			async: true,
			dataType: "json",
			success: function(data) {
				console.log(data)
				switch(JSON.stringify(data.code)) {
					case '"A00000"':
						alert("发布成功")
						window.location.href = "commodity.html"
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

}