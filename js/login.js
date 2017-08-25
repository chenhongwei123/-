$(document).ready(function() {
	/**
	 * 页面一开始加载时候用户框会聚焦
	 */
	$('#mobile').focus();
	/*****************************/

	/**
	 * 失焦判断
	 */
	$('input').blur(function() {
		$(".spa").css('color', '#FF4364'); //设置提示字体为红色

		/**
		 * 判断手机号
		 */
		if($(this).is('#mobile')) { //进行手机号的判断
			var ph = /^1[3|5|7|8][0-9]{9}$/
			if($("#mobile").val() != '') {
				if(!(ph.test($('#mobile').val()))) { //使用test()正则验证函数验证输入是否符合售价好规范
					$(".spa1").text('啊哦,手机号输错啦肿么办T~T');
					$(this).css('border', '1px solid #FF4364'); //边框变红
					return false;
				} else if(ph) {
					$(".spa1").text('');
					return true;
				}
			} else {
				$(".spa1").text('');
			}
		}

	});
	/**
	 * 判断密码
	 */
	//使用ajax判断密码是否符合
	//      if($("input").is('#pwd')){ //判断密码
	// alert($.md5($('#pwd').val()));
	//  function Save(){
	$(".btn-default").on("click", function() {

		$.ajax({
			type: 'get',
			//				http://admin.honganjk.com/admin/login.action
			url: urlx("admin/login.action"),
			data: {
				'mobile': $('#mobile').val(), //获取手机号
				'pwd': $.md5($('#pwd').val()) //获取MD5加密后的密码

			},
			dataType: "json",
			async: "true",
			success: function(data) {
				//alert("11111")
				console.log(data.data)
				switch(JSON.stringify(data.code)) {
					case '"A00000"':

						$.cookie('code', data.data.code);
						$.cookie('token', data.data.token);
						$.cookie("name", $('#mobile').val(), {
							expires: 1
						})
						document.location.href = "html/order.html"
						//alert("登录成功")
						$('.alert-warning').css('display', 'none');
						break;
						//case '"A00001"':
						//alert(data.msg)
						// $('.alert-warning').attr('display', 'block');
						//$('#warning-content').text(data.msg);
						//$('.alert-warning').fadeIn();
						//	break;
					default:
						//alert(data.msg)
						//						console.log(data.msg)
						$('.alert-warning').css('display', 'block');
						$('.alert-warning').fadeIn();
						$('#warning-content').html(data.msg);
				}

			},
			error: function(data, e) {
				alert(data.responseText)
			}
		});
	});
});

//--------------------登录环境转换----------------------------
function urlx(url) {
	//开发环境
//	var str = "http://admindev.honganjk.com/" + url
//	return str

	//生产环境
		var str = "http://admin.honganjk.com/" + url
		return str

}