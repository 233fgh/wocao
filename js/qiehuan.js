var rightbtn = document.getElementsByClassName("rightj")[0];
var leftbtn  = document.getElementsByClassName("leftj")[0];
var one = document.getElementsByClassName("one")[0];
			
//	循环遍历数组data 渲染手机部分图片
	for(var w = 0 ;w<data.length;w++){
//		创建li
		var liss = document.createElement("li");
//		把ind属性绑定在li里面
		liss.setAttribute("ind",data[w].ind)
//		把li放进ul里面
		one.appendChild(liss)
//		判断是不是最后一个，最后一个样式不一样
		if(w==data.length-1){
//			创建i和span的节点
			var is = document.createElement("i");
			var sps = document.createElement("span");
			
			sps.innerText=data[w]["pic-name"];
//			把i标签和span标签放进li标签中
			liss.appendChild(is)
			liss.appendChild(sps)
			
		}else{
//		创建img节点
		var imgs = document.createElement("img");
		imgs.src=data[w].pic;
//		把img节点放进li中
		liss.appendChild(imgs)
//		创建一个p标签
		var ps = document.createElement("p");
		liss.appendChild(ps);
		ps.innerText=data[w]["pic-name"];					
		}
	
//		获取?号后面的摄取值
		var arr = location.search.split("=")[1];

//			console.log(data[w]["ind"])
//		判断ind值与摄取值是不是一样
		if (data[w]["ind"]==arr) {
//			渲染数据
			$(".deta2>a").text(data[w]["pic-name"])			
		}
		
		
	}
	$(".one>li").on("click",function(){
		console.log(this.getAttribute("ind"))
		console.log(this.ind)
		location.href="qiehuanye.html?="+this.getAttribute("ind")+"#="+location.hash.split("=")[1];
	})
	
	

//	一键置顶特效
	$(".fix>.xid").on("click",function(){
		tarm = setInterval(function(){
//			没10毫秒减150
			window.scrollBy(0,-150);
//			当距离页面小于0时清空定时器
			if(document.documentElement.scrollTop+document.body.scrollTop<=0){
//				清空定时器
				clearInterval(tarm);
			}
		},100)
	})
	
	//轮播图的下面的切换切换
	$(".second>li").hover(function(){
		$(this).find(".ips").eq(0).animate({"height":"200px"},300);
		
//		左箭头点击效果
		$(this).find("span").eq(0).on("click",function(){
			if($(this).siblings("ul").css("left")!="35px"){
				z--;
				$(this).siblings("ul").css("left",(-1260*z)+"px")
				if(z<=0){
					$(this).siblings("ul").css("left","35px")
				}
				
			}
			console.log(z)
		})
		
//		右箭头点击效果
		$(this).find("span").eq(1).on("click",function(){
			if(parseInt($(this).siblings("ul").css("left"))<=(1260*2+35)){
				z++;
				if(z<=2){
					$(this).siblings("ul").css("left",(-1260)*z+"px");
				}else{
					z--;
					$(this).siblings("ul").css("left",(-1260)*z+"px");
				}						
			}

			console.log(z)
		})
		
	},function(){
		$(this).find(".ips").eq(0).stop(true)
		$(this).find(".ips").eq(0).animate({"height":"0px"},100);
	})
	
	window.onscroll=function(){
		
		if (pageYOffset>56) {
			if ($(".deta1").hasClass(" fixd")==false) {
				$(".deta1").addClass("fixd")
			}
		} 
		
		if (pageYOffset<56) {
			if ($(".deta1").hasClass("fixd")==true) {
				$(".deta1").removeClass("fixd")
			}
		} 
		console.log(pageYOffset)
		if (pageYOffset>1200&&pageYOffset<1500) {
			$(".te3>h1").animate({"height":"42","opacity":"1"},1000)
			$(".te3>p:eq(0)").animate({"height":"21","opacity":"1"},1500)
			$(".te3 img").animate({"height":"130","opacity":"1"},2000)
			$(".te3>p:eq(1)").animate({"height":"16","opacity":"1"},2500)
			$(".te3>p:eq(2)").animate({"height":"16","opacity":"1"},2500)
			$(".te3>p:eq(3)").animate({"height":"16","opacity":"1"},2500)
		}
	}

	//立即购买的点击跳转页面
	$(".deta2>span").on("click",function(){
		var val = location.search.split("=")[1]
		// console.log(val)
		location.href="xq.html?="+val+"#="+location.hash.split("=")[1]
	})
	// 跳转到登录页面
	$(".second>li>span").on("click",function(){
		location.href="login.html";
	})	
	// 用户登陆显示
	$(".second>li>b").text(location.hash.split("=")[1])
	// 点击购物车前往购物车页面
	$(".second>li:eq(10)").on("click",function(){
		location.href="buycar.html";
	})