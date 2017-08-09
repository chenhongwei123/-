$(document).ready(function() {

	//--------------------------------获取地址上的ID-------------------------------------
	//console.log(getQueryString("goodsID"))
	var id = getQueryString("goodsID")
	bjpDetail(id)
	var timer;
	clearTimeout(timer)
	timer = setTimeout(function() {
		zlid()
		ppid()
		gysid()
	}, 500)

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

	//--------------------获取图片地址-----------------------------------
	$(".btn_send").click(function() {
		//console.log($(".g_object").val())
		var fruit = new Array();
		var fruit2 = new Array();
		var user = {};
		var arrx = new Array();
		
		$(".banner input:hidden[name='fruit']").each(function() {
			if($(this).val().length !== 0) {
				fruit.push($(this).val());
			}
		});

		$(".banner2 input:hidden[name='fruit']").each(function() {
			if($(this).val().length !== 0) {
				fruit2.push($(this).val());
			}
		});

		$(".form-group input:hidden[name='g_object']").each(function() {

			if($(this).val().length !== 0) {
				arr = JSON.parse($(this).val())
				arrx.push(arr);
			} else {
				alert("规格未保存")
				
			}
		});
		user = arrx
		console.log(user)
		var name = $("#inputName").val()
		var type = getStr($("#sele_id").val(), '.')
		var brand = getStr($("#sele_id2").val(), '.')
		var supplier = getStr($("#sele_id3").val(), '.')
		var origin = $("#origin").val()
		var fare = $("#fare").val()
		var id = getQueryString("goodsID")
		//---------------------修改商品-----------------------------------
		$.ajax({
			type: "post",
			headers: {
				"code": $.cookie("code"),
				"token": $.cookie("token")
			},
			url: urly("admin/bjpEdit.json"),
			data: JSON.stringify({
				id: id,
				name: name,
				type: type,
				brand: brand,
				supplier: supplier,
				origin: origin,
				fare: fare,
				banners: fruit,
				details: fruit2,
				formats: user
			}),
			async: true,
			dataType: "json",
			contentType: "application/json;charset=utf-8", //转换成字符串形式发送
			success: function(data) {
				//console.log(data)
				switch(JSON.stringify(data.code)) {
					case '"A00000"':
						alert("修改成功")
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
})

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
	//	console.log(files)
	for(var i = 0; i < files.length; i++) {
		uploader({
			file: files[i],
			name: new Date().getTime(),
			token: imgtoken,
			dir: "dev",
			callback: function(percent, result) {
				if(percent == 100) {
					//					console.log(percent)
					//					console.log(result.url)
					$($img_name).val(result.url)
					$($upimg).attr('src', result.url)
					$(e.target).css("display", "none")
					$($delete_img).css("display", "block")
					var $upfile = ('<div class="upfile">' +
						'<div class="fileimgAccount">+</div>' +
						'<img class="upload-img img1">' +
						'<input type="file" class="file1" onchange="upfile(event)">' +
						'<input type="hidden" name="fruit" class="img_name"  value="" />' +
						'<a onclick="delete_img(event)" class="delete_img">删除</a>' +
						'</div>')
					$($banner).append($upfile);
				}

			}
		});
	}
}
//--------------------------------上传规格图片-------------------------------
function upfile2(e) {
	e = e || window.event;
	var uploader = uploadJSSDK;
	//alert("111")
	var $upimg = e.target.previousElementSibling
	var $img_name = e.target.nextElementSibling
	var $delete_img = e.target.nextElementSibling.nextElementSibling
	var $banner = e.target.parentNode.parentNode
	$($upimg).attr('src', "../img/jiazai0.gif")
	var files = e.target.files;
	//	console.log(files)
	for(var i = 0; i < files.length; i++) {
		uploader({
			file: files[i],
			name: new Date().getTime(),
			token: imgtoken,
			dir: "dev",
			callback: function(percent, result) {
				if(percent == 100) {
					//					console.log(percent)
					//					console.log(result.url)
					$($img_name).val(result.url)
					$($upimg).attr('src', result.url)
					$(e.target).css("display", "none")
					$($delete_img).css("display", "block")
					var $upfile = ('<div class="upfile">' +
						'<div class="fileimgAccount">+</div>' +
						'<img class="upload-img img1">' +
						'<input type="file" class="file1" onchange="upfile(event)">' +
						'<input type="hidden" name="fruit" class="img_name"  value="" />' +
						'<a onclick="delete_img(event)" class="delete_img">删除</a>' +
						'</div>')

				}

			}
		});
	}
}
//-------------------------------------删除---------------------------------	
function delete_img(e) {
	$(e.target).parent().remove()
}
//-------------------------------------删除2--------------------------------	
function delete_img2(e) {
	var $imgx = e.target.previousElementSibling.previousElementSibling.previousElementSibling
	var $file = e.target.previousElementSibling.previousElementSibling
	//	console.log(e.target.previousElementSibling.previousElementSibling)
	$($imgx).attr("src", "")
	$($file).css("display", "block")
	$(e.target).css("display", "none")
}
//-----------------------------------增加规格--------------------------------
function add_norms(e) {
	var $norms = e.target.parentNode
	//	console.log($norms)
	var $table = ('<div class="col-sm-12 col-sm-offset-2 col-md-offset-1">' +
		' <table class="table table-condensed " style="float: left;">' +
		'<thead>' +
		'<tr>' +
		'<th>图片</th>' +
		'<th>规格</th>' +
		'<th>价格</th>' +
		'<th>原价</th>' +
		'<th>库存</th>' +
		'<th>操作</th>' +
		'</tr>' +
		'</thead>' +
		'<tbody>' +
		'<tr>' +
		'<td>' +
		'<div class="upfile2">' +
		'<div class="fileimgAccount2">+</div>' +
		'<img class="upload-img2 img1">' +
		'<input type="file" class="file1" onchange="upfile2(event)">' +
		'<input type="hidden" name="fruit" class="img_name" value="" />' +
		'<a onclick="delete_img2(event)" class="delete_img2">删除</a>' +
		'</div>' +
		'</td>' +
		'<td>' +
		'<input type="text" class="g_name" value="" /><p>(如：100ml 100g 200kg)</p>' +
		'</td>' +
		'<td><input type="number" min="1" class="g_money"><p>(不能为0)</p></td>' +
		'<td><input type="number" min="1" class="g_price"><p>(不能为0)</p></td>' +
		'<td><input type="number" min="1" class="g_stock"><p>(不能为0)</p></td>' +
		'<td>' +
		'<div class="btn" onclick="btn_norms(event)">保存</div>' +
		'<div class="btn" style="display: none;" onclick="reva_norms(event)">修改</div>' +
		'<input type="hidden" name="g_object" class="g_object"/>' +
		'</td>' +
		'</tr>' +
		'</tbody>' +
		'</table>' +
		'</div>')
	$($norms).append($table);
}
//-----------------------------------确认规格--------------------------------
function btn_norms(e) {
	e = e || window.event;
	var xx = e.target.parentNode.parentNode.parentNode.parentNode
	var avatar = $(xx).find(".img_name").val()
	var name = $(xx).find(".g_name").val()
	var money = $(xx).find(".g_money").val()
	var price = $(xx).find(".g_price").val()
	var stock = $(xx).find(".g_stock").val()
	//console.log(typeof money)
	if(avatar == '') {
		alert("请上传规格图片")
	} else {
		if(name == '') {
			alert("请填写规格")
		} else {
			if(money == '') {
				alert("请填写价格")
			} else {
				if(price == '') {
					alert("请填写原价")
				} else {
					if(stock == '') {
						alert("请填写库存")
					} else {
						$(xx).find("input").css("border", "0")
						$(xx).find("input").attr('disabled', 'disabled')
						$(xx).find("a").css("display", "none")
						$(e.target.nextElementSibling).css("display", "block")
						$(e.target).css("display", "none")
						object_norms(avatar, name, money, price, stock, e)
					}
				}
			}
		}
	}

}
//-----------------------------------修改规格--------------------------------
function reva_norms(e) {
	var xx = e.target.parentNode.parentNode.parentNode.parentNode
	$(xx).find("input").css("border", "1px solid #000000")
	$(xx).find("input").attr('disabled', false)
	$(xx).find("a").css("display", "block")
	$(e.target.previousElementSibling).css("display", "block")
	$(e.target).css("display", "none")
}
//---------------------------------生成对象类型------------------------------
function object_norms(avatar, name, money, price, stock, e) {
	e = e || window.event;
	var obj = {
		avatar: avatar,
		name: name,
		money: money,
		price: price,
		stock: stock
	};
	//console.log(obj)
	//	console.log(e.target.nextElementSibling.nextElementSibling)
	var g_object = e.target.nextElementSibling.nextElementSibling
	$(g_object).val(JSON.stringify(obj))
	//console.log($(g_object).val())
} //---------------------------渲染数据----------------------------------------------
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

					$("#inputName").val(data.data.title) //标题
					$("#origin").val(data.data.origin) //发货地

					var $select = ("<option >" + data.data.supplier + "." + data.data.feature + "</option>")
					$("#sele_id3").append($select) //供货商名

					var $select = ("<option >" + data.data.brand + "." + data.data.brandName + "</option>")
					$("#sele_id2").append($select) //商品品牌

					var $select = ("<option >" + data.data.type + "." + data.data.typeName + "</option>")
					$("#sele_id").append($select) //商品种类

					var jsondata1 = data.data.formats
					//console.log(JSON.stringify(jsondata1))
					$("#tbody1").setTemplateElement("template");
					$("#tbody1").processTemplate(jsondata1); //规格参数
					//console.log($(".g_object").val())

					var jsondata2 = data.data.banners
					//console.log(jsondata2)
					$("#banner").setTemplateElement("template2");
					$("#banner").processTemplate(jsondata2); //banner图

					var jsondata3 = data.data.details
					//console.log(jsondata3)
					$("#banner2").setTemplateElement("template3");
					$("#banner2").processTemplate(jsondata3); //banner图

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
//---------------------------------获取供应商id------------------------------
function gysid() {
	$.ajax({
		type: "get",
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		url: urly("admin/supplys.json"),
		data: {
			"start": 0,
			"size": 100,
			"state": 1
		},
		async: true,
		dataType: "json",
		success: function(data) {
			//console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					var opti
					$.each(data.data.objs, function(index) {
						var $select = ("<option >" + data.data.objs[index].id + "." + data.data.objs[index].feature + "</option>")
						$("#sele_id3").append($select)
					})
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
//----------------------------------获取种类id-------------------------------
function zlid() {
	$.ajax({
		type: "get",
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		url: urly("admin/kinds.json"),
		data: {
			"start": 0,
			"size": 100,
			"state": 1
		},
		async: true,
		dataType: "json",
		success: function(data) {
			//console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					$.each(data.data.objs, function(index) {
						var $select = ("<option >" + data.data.objs[index].id + "." + data.data.objs[index].label + "</option>")
						$("#sele_id").append($select)
					})
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
//----------------------------------获取品牌id-------------------------------
function ppid() {
	$.ajax({
		type: "get",
		headers: {
			"code": $.cookie("code"),
			"token": $.cookie("token")
		},
		url: urly("admin/brands.json"),
		data: {
			"start": 0,
			"size": 100,
			"state": 1
		},
		async: true,
		dataType: "json",
		success: function(data) {
			//console.log(data)
			switch(JSON.stringify(data.code)) {
				case '"A00000"':
					$.each(data.data.objs, function(index) {
						var $select = ("<option >" + data.data.objs[index].id + "." + data.data.objs[index].label + "</option>")
						$("#sele_id2").append($select)
					})
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