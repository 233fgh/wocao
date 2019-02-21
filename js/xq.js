var rightbtn = document.getElementsByClassName("rightj")[0];
var leftbtn  = document.getElementsByClassName("leftj")[0];
var one = document.getElementsByClassName("one")[0];
var telname = "";
var colorname = "";
var pril = "";
var edition = "";

// 获取?号值
var sear = location.search.split("=")[1];
console.log(sear)
// 获取到手机型号的id值
var obj = data2[sear];
// console.log(data2[sear])			
//	循环遍历数组data 渲染手机部分图片
	for(var w = 0 ;w<data.length;w++){
//		创建li
		var liss = document.createElement("li");
//		把ind属性绑定在li里面
		liss.setAttribute("ind",data[w].ind);
//		把li放进ul里面
		one.appendChild(liss)
//		判断是不是最后一个，最后一个样式不一样
		if(w==data.length-1){
//			创建i和span的节点
			var is = document.createElement("i");
			var sps = document.createElement("span");
			
			sps.innerText=data[w]["pic-name"];
//			把i标签和span标签放进li标签中
			liss.appendChild(is);
			liss.appendChild(sps);
			
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
		};
		//获取手机名字
		if(data[w].ind==sear){
			telname = data[w]["pic-name"]
			$(".zhongl>span:eq(0)").text(function(n,text){
				return text+" "+data[w]["pic-name"]
			});
		};
	}
	
// 切换到切换页
	$(".one>li").on("click",function(){
		location.href="qiehuanye.html?="+this.getAttribute("ind");
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
		
//	右箭头点击效果
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
//	滚动条滚动绑定事件
	window.onscroll=function(){
		console.log(getScroll().y)
		if(getScroll().y>58){
			if ($(".xidia").hasClass("fixd")==false) {
				$(".xidia").addClass("fixd")
				$(".xidia").animate({"height":"60","opacity":"1"},100)
			}
		}else{
			$(".xidia").animate({"height":"0","opacity":"0"},100,function(){
				$(".xidia").removeClass("fixd")
			})
		}
		// 当滚动到一定位置固定左边图片
		if(getScroll().y>188&&getScroll().y<588){
			if($(".pic").hasClass("fixed2")==false)(
				$(".pic").addClass("fixed2")
			);
		}else if($(".pic").hasClass("fixed2")==true){
			$(".pic").removeClass("fixed2")
		};
		// 判定左边图片区是否加margin-top这个类
		if(getScroll().y>588){
			if($(".pic").hasClass("martop")==false)(
				$(".pic").addClass("martop")
			);
		}else if($(".pic").hasClass("martop")==true){
				$(".pic").removeClass("martop")
		};
	}
	// 回到首页
	$(".second>li>span").on("click",function(){
		location.href="login.html"
	})
	// 遍历obj对象
	for(property in obj){
		console.log(property)
		// 创建color的li和li的内容
		var lis = document.createElement("li");
		$(".telpic").eq(0).append(lis);
		lis.innerText=property;
	}
	// 渲染页面第一张图片
	// 第一张图片的名字 自执行函数(function(){}());   和(function(){})();不推荐
	(function(){
		var name = $(".telpic").eq(0).children().eq(0).text();
		// 初始化版本内容
		createEdi(name)
		// 循环小图的地址创建li
		var shuz = obj[name].pic;
		$(shuz).each(function(e){
			var lis = document.createElement("li");
			// 给小图片加上点击事件
			$(lis).on("click",function(){
				$(".sorpic").children().css({
					"border":" 1px solid #D7D7D7"
				})
				this.style.border="1px solid #fb1515";
				var backgr =  $(this).css("background")
				$(".bigpic").css({
					"background":backgr
				})
			})
			$(".sorpic").append(lis);
			$(lis).css({
				"background":"transparent url("+$(shuz)[e]+") no-repeat center",
				"background-size":"cover"
			});
		});
		// 给大图加上背景
		$(".bigpic").css({
			"background":"transparent url("+shuz[0]+") no-repeat center",
			"background-size":"cover"
		});
		
	}())
	// 初始化吸顶的手机样式和价格
	$(".xidii>span:eq(1)").text(function(n,text){
		console.log(text)
		return telname+" "+$(".telpic").eq(0).children().eq(0).text()+" "+$(".telpic").eq(1).children().eq(0).text()+" "+$(".telpicthr>li>p").text()
	})
	colorname = " "+$(".telpic").eq(0).children().eq(0).text()
	// 初始化"购买商品右边的价格"
	$(".zhongl>span:eq(1)").text(function(){
		return  " "+$(".telpicthr>li>p").text()
	})
	
	// 当点击选择颜色时改变大图片的内容
	$(".telpic").eq(0).children().on("click",function(){
		// 清空样式
		clearborder(".telpic")
		// 改变边框样式
		$(this).css({
			"border":"1px #fb1515 solid"
		})
		// 改变吸顶的样式
		xidiname(telname+" "+$(this).text()+" "+obj[$(this).text()].edition[0]+" ￥"+obj[$(this).text()].price[0])
		//改变"购买商品右边的价格"
		var pri1 = obj[$(this).text()].price[0]
		console.log(obj[$(this).text()].price[0])
		$(".zhongl>span:eq(1)").text(function(){
			return " ￥"+pri1
		})
		// 创建版本的li
		createEdi($(this).text())
		// 获取到小图片的图片地址数组
		var arr = obj[$(this).text()].pic;
		// 清空ul里面的li
		$(".sorpic").children().detach()
		
		// 循环图片地址
		for(var i=0;i<arr.length;i++){
			console.log(arr[i])
			// 创建装图片的li标签
			var lis = document.createElement("li");
			
			// 给小图片加上点击事件
			$(lis).on("click",function(){
				$(".sorpic").children().css({
					"border":" 1px solid #D7D7D7"
				})
				this.style.border="1px solid #fb1515";
				var backgr =  $(this).css("background")
				$(".bigpic").css({
					"background":backgr
				})
			})
			
			// 把图片放进li得背景里面
			$(lis).css({
				"background":"transparent url("+arr[i]+") no-repeat center",
				"background-size":"cover"
			})
			// 把li放进ul里面
			$(".sorpic").append(lis);
			// 当li得下标为1时把li得背景放进大得div里面
			if(i==0){
				$(".bigpic").css({
					"background":"transparent url("+arr[i]+") no-repeat center",
					"background-size":"cover"
				})
			}
		}
	})
	// 创建一个方法创建edition版本的li
	function createEdi(color){
		// 清空版本
		$(".telpic").eq(1).children().detach()
		var col = color
		var edi = obj[color].edition
		console.log(col)
		var i = -1;
		$(edi).each(function(e){
			var lis = document.createElement("li");
			$(".telpic").eq(1).append(lis);
			$(lis).text(edi[e]);
			i++
			if(i==0){
				$(".telpicthr>li>p").text("￥"+obj[col].price[i])
			}
			// 当点击颜色时渲染pro的文本
			$(".pro").text(function(ind,ele){
				return telname+" "+col+" "+$(".telpic").eq(1).children().eq(0).text()
			})
			console.log($(".telpicthr>li:eq(0)>p").text())
			// 改变底下的价格
			$(".price>span").text(function(ind,ele){
				return $(".telpicthr>li:eq(0)>p").text()
			})
			lis.ind=e
			// 绑定edition的点击事件
			$(lis).on("click",function(){
				$(".telpic").eq(1).children().each(function(){
					$(this).css({
						"border":"1px #e9e9e9 solid"
					})
				})
				$(this).css({
					"border":"1px #fb1515 solid"
				})
				var pril = obj[col].price[this.ind];
				// 全局变量edition
				edition = this.innerText;
				// 改变配件套餐的价格
				$(".telpicthr>li>p").text("￥"+pril);
				//改变"购买商品右边的价格"
				$(".zhongl>span:eq(1)").text(function(){
					return " "+pril
				})
				xidiname(telname+" "+col+" "+edition+" "+pril);
				console.log($(".pro"));
				$(".pro").text(function(ind,ele){
					return telname+" "+colorname+" "+edition
				})
				$(".price>span").text(function(ind,ele){
					return "￥ "+pril
				})
				
			})
		})	
	}
	
	
	// 渲染数据
	$(".pro").text(function(ind,ele){
		return telname+" "+colorname+" "+$(".telpic").eq(1).children().eq(0).text()
	})
	
	// 点击吸顶导航的立即购买跳转购物车页面
	$(".xidi>span").on("chick",function(){
		loaction.herf="buycar.html"
	})
	// 点击底部的立即购买跳转购物车页面
	$(".buy>p").on("chick",function(){
		loaction.herf="buycar.html"
	})
	$(data).each(function(e){
		if(e<6){
			var lis = document.createElement("li");
			$(lis).text(data[e]["pic-name"]);
			
			if(data[e]["pic-name"]==telname){
				$(".yyul").append(lis)
				$(lis).css({"border-bottom":"2px solid #F52F00"})
			}else{
				$(".yyul").append(lis)
			}
			$(lis).on("click",function(){
				location.href="xq.html?="+data[e].ind
			})
		}
	})
	// 点击顶部立即购买跳转购物车页面
	$(".xidii>span:eq(0)").on("click",function(){
		var ino = $(this).siblings("span").text().split(" ");
		console.log(ino)
		var inoff = parseInt(ino[3].match(/\d{1,6}/));
		if(localStorage.getItem(ino[0]+" "+ino[1]+" "+ino[2])==null){
			var inof = {
				"tel":ino[0],
				"number":1,
				"telcolor":ino[1],
				"edition":ino[2],
				"price":inoff,
				"pic":$(".sorpic>li:eq(0)").css("background")
			}
			localStorage.setItem(ino[0]+" "+ino[1]+" "+ino[2],JSON.stringify(inof))
			location.href="buycar.html?="+sear+"#="+location.hash.split("=")[1]
		}else{
			// 商品获取数量 商品＋1
			var num = JSON.parse(localStorage.getItem(ino[0]+" "+ino[1]+" "+ino[2])).number+1
			var inof = {
				"tel":ino[0],
				"number":num,
				"telcolor":ino[1],
				"edition":ino[2],
				"price":inoff,
				"pic":$(".sorpic>li:eq(0)").css("background")
			}
			localStorage.setItem(ino[0]+" "+ino[1]+" "+ino[2],JSON.stringify(inof))
			location.href="buycar.html?="+sear+"#="+location.hash.split("=")[1]
		}
	})
	// 点击底部立即购买跳转购物车页面
	$(".buy>p").on("click",function(){
		var ino = $(".xidii>span:eq(1)").text().split(" ");
		var inoff = parseInt(ino[3].match(/\d{1,6}/))
		
		if(localStorage.getItem(ino[0]+" "+ino[1]+" "+ino[2])==null){
			var inof = {
				"tel":ino[0],
				"number":1,
				"telcolor":ino[1],
				"edition":ino[2],
				"price":inoff,
				"pic":$(".sorpic>li:eq(0)").css("background")
			}
			localStorage.setItem(ino[0]+" "+ino[1]+" "+ino[2],JSON.stringify(inof))
			location.href="buycar.html?="+sear+"#="+location.hash.split("=")[1]
		}else{
			// 商品获取数量 商品＋1
			var num = JSON.parse(localStorage.getItem(ino[0]+" "+ino[1]+" "+ino[2])).number+1
			var inof = {
				"tel":ino[0],
				"number":num,
				"telcolor":ino[1],
				"edition":ino[2],
				"price":inoff,
				"pic":$(".sorpic>li:eq(0)").css("background")
			}
			localStorage.setItem(ino[0]+" "+ino[1]+" "+ino[2],JSON.stringify(inof))
			location.href="buycar.html?="+sear+"#="+location.hash.split("=")[1]
		}
	})
	
	// 清空边框样式的方法
	function clearborder(par){
		// 清空li的边框的颜色
		$(par).eq(0).children().each(function(){
			$(this).css({
				"border":"1px #e9e9e9 solid"
			})
		})
	}
	// 吸顶的名字的方法
	function xidiname(name){
		$(".xidii>span:eq(1)").text(" ")
		$(".xidii>span:eq(1)").text(function(n,text){
			return (name+" "+text).trim()
		});
	}
	
	// 切换到登录页面
	console.log($(".second>li>span"))
	$(".second>li>span").on("click",function(){
		location.href="login.html"
	})
	
	// 用户登陆显示
	$(".second>li>b").text(location.hash.split("=")[1])
	
	// 点击购物车前往购物车页面
	$(".second>li:eq(10)").on("click",function(){
		location.href="buycar.html";
	})