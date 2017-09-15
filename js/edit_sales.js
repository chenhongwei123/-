$(document).ready(function() {

	//--------------------------------获取地址上的ID-------------------------------------
	//console.log(getQueryString("goodsID"))
	var id = getQueryString("goodsID")
	bjpDetail(id)
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
					console.log(data.data.title)
					$(".title").html(data.data.title)
					var jsondata1 = data.data.formats
					//console.log(JSON.stringify(jsondata1))
					$("#tbody1").setTemplateElement("template");
					$("#tbody1").processTemplate(jsondata1); //规格参数
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

//---------------------------点击选择规格id----------------------------------------------------------
function reva_norms(id) {
	console.log(id)
	$(".fid").val(id)
}
//-------------------------------点击修改-------------------------------------------------------------
function edit_sales() {
	var bid = getQueryString("goodsID")
	var fid = $(".fid").val()
	var num = $(".sales").val()
	if($(".sales").val() == '') {
		alert("请填写销量！！！")
	} else {
		$.ajax({
			type: "get",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			url: urly("admin/salesEdit.json"),
			data: {
				bid: bid,
				fid: fid,
				num: num

			},
			async: true,
			dataType: "json",
			success: function(data) {
				console.log(data)
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

}