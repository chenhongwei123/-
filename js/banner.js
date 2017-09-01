//$(function() {
$(document).ready(function() {
	banners()
	banners_paging()
	//-----------------------------------------验证阿里百川---------------------------------------
	$.ajax({
		type: "get",
		url: "https://bzapi.honganjk.com/common/getToken.action",
		data: {
			"key": "23384196",
			"secret": "7b484f801524af3bb7f6abb0dbe63459",
			"namespace": "hajk",
		},
		dataType: "json",
		success: function(data) {
			window.imgtoken = data.data;
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

function banners() {
	//---------------------------------------------浏览订单----------------------------------------------
	$.ajax({
		type: "get",
		url: urly("admin/banners.json"),
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
			//console.log(data)
			var jsondata = data.data.objs;
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
function banners_paging() {

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
			url: urly("admin/banners.json"),
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
			url: urly("admin/banners.json"),
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
}
//--------------------------------删除banner------------------------------------------------------
function btn_delete(id) {
	swal({
			title: "确定要删除吗?",
			text: "",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes",
			closeOnConfirm: false
		},
		function() {
			$.ajax({
				type: "get",
				url: urly("admin/delBanner.json"),
				data: {

					"id": id
				},
				dataType: "json",
				headers: {
					"code": $.cookie("code"),
					"token": $.cookie("token")
				},
				success: function(data) {
					switch(JSON.stringify(data.code)) {
						case '"A00000"':
							//swal("删除成功!", "", "success")
							alert("删除成功")
							location.reload()
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
		});

}
//-------------------------------修改banner------------------------------------------------------
function btn_modifier() {

	$.ajax({
		type: "get",
		url: urly("admin/editBanner.json"),
		data: {
			"id": $(".banner_id").val(),
			"img": $(".img_name").val()
		},
		dataType: "json",
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		success: function(data) {
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					alert("修改成功")
					location.reload()
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
//----------------------------处理数据-----------------------------------------
function btn_edit(e) {
	var $banner_data = e.target.previousElementSibling
	var arr = JSON.parse($($banner_data).val())
	//console.log(arr)

	$(".container-img").setTemplateElement("template2");
	$(".container-img").processTemplate(arr); //规格参数 
}
//--------------------------添加banner-------------------------------------------------
function btn_add() {
	
	if($(".img_name2").val() == '') {
		alert("请上传图片")
	} else {
		//console.log($(".img_name2").val())
		$.ajax({
			type: "get",
			url: urly("admin/addBanner.json"),
			data: {

				"img": $(".img_name2").val()
			},
			dataType: "json",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			success: function(data) {
				switch(JSON.stringify(data.code)) {
					case '"A00000"':
						alert("添加成功")
						location.reload()
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

//--------------------------------上传图片阿里百川---------------------------
function upfile(e) {
	e = e || window.event;
	var uploader = uploadJSSDK;
	//alert("111")
	var $upimg = e.target.previousElementSibling
	var $img_name = e.target.nextElementSibling
	var $delete_img = e.target.nextElementSibling.nextElementSibling
	var $banner = e.target.parentNode.parentNode
	$($upimg).attr('src', "../img/jiazai0.gif")
	var files = e.target.files;
	for(var i = 0; i < files.length; i++) {
		uploader({
			file: files[i],
			name: new Date().getTime(),
			token: imgtoken,
			dir: "dev",
			callback: function(percent, result) {
				if(percent == 100) {
					var now_url = result.url
					var new_url = now_url.replace('http', 'https')
					$($img_name).val(new_url)
					$($upimg).attr('src', new_url)
					$(e.target).css("display", "none")
					$($delete_img).css("display", "block")
				}
			}
		});
	}
}
//---------------------删除---------------------------------	
function delete_img(e) {
	$(e.target.previousElementSibling.previousElementSibling.previousElementSibling).attr('src', " ")
	$(e.target.previousElementSibling).attr('value', " ")
	$(e.target.previousElementSibling.previousElementSibling).css("display", "block")
	$(e.target).css("display", "none")
}