var rightbtn = document.getElementsByClassName("rightj")[0];
var leftbtn  = document.getElementsByClassName("leftj")[0];
var ind = 0,timer=null,flag=true,autoTimer=null,z=0;
var list = document.getElementsByClassName("tu")[0];
var one = document.getElementsByClassName("one")[0];
var com = [];
var total = Number(0);
var Num = 0;
//			循环遍历数组data 渲染手机部分图片
			for(var w = 0 ;w<data.length;w++){
//				创建li
				var liss = document.createElement("li");
//				把ind属性绑定在li里面
				liss.setAttribute("ind",data[w].ind)
//				把li放进ul里面
				one.appendChild(liss)
//				判断是不是最后一个，最后一个样式不一样
				if(w==data.length-1){
//					创建i和span的节点
					var is = document.createElement("i");
					var sps = document.createElement("span");
					
					sps.innerText=data[w]["pic-name"]
//					把i标签和span标签放进li标签中
					liss.appendChild(is)
					liss.appendChild(sps)
					
				}else{
//				创建img节点
				var imgs = document.createElement("img");
				imgs.src=data[w].pic;
//				把img节点放进li中
				liss.appendChild(imgs)
//				创建一个p标签
				var ps = document.createElement("p");
				liss.appendChild(ps);
				ps.innerText=data[w]["pic-name"];					
				}

			}
			// 点击手机栏的切换到下一个页面
			$(".one>li").on("click",function(){
				console.log(this.getAttribute("ind"))
//				console.log(this.ind)
				location.href="qiehuanye.html?="+this.getAttribute("ind");
			})
			
			
            
//			一键置顶特效
			$(".fix>.xid").on("click",function(){
				tarm = setInterval(function(){
//					没10毫秒减150
					window.scrollBy(0,-150);
//					当距离页面小于0时清空定时器
					if(document.documentElement.scrollTop+document.body.scrollTop<=0){
//						清空定时器
						clearInterval(tarm);
					}
				},100)
			})
			
			//轮播图的下面的切换切换
			$(".second>li").hover(function(){
				$(this).find(".ips").eq(0).animate({"height":"200px"},300);
				
//				左箭头点击效果
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
				
				//右箭头点击效果
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
			//当轮播图片增加的时候增加底面的切换能在页面居中
			$(".tu").css("width",function(){
				return $(".tu>li").length*1349
			})
			
			$(".tab").css("width",function(){
				return ($(".tu>li").length)*42
			})
			
			// 渲染数据
			for(propert in localStorage){
				if(localStorage.hasOwnProperty(propert)){
					var lis = document.createElement("li")
					$(".goods").append(lis)
					var jj = JSON.parse(localStorage.getItem(propert))
					console.log(jj)
					for(i=0;i<6;i++){
						var ps = document.createElement("p");
						lis.appendChild(ps)
						if(i==0){
							$(ps).css({
								"background":jj.pic,
								"background-size":"100px 100px"
							});
						};
						if(i==1){
							$(ps).text(function(n,ele){
								return jj.tel+"("+jj.edition+" "+jj.telcolor+")"
							})
						};
						if(i==2){
							$(ps).text(function(n,ele){
								return "￥"+jj.price
							})
						};
						if(i==3){
							$(ps).html("<input type=number min=1 />");
							$(ps).children().val(jj.number);
							Num = Num+jj.number;
							// 改变总商品数量
							$("#showp>p>span").text(Num);
						};
						if(i==4){
							$(ps).text(function(n,ele){
								return "￥"+(jj.price)*(jj.number)
							});
						};
						if(i==5){
							$(ps).html("<i></i>");
							// console.log($(ps).children())
							$(ps).children().eq(0).attr("propert",propert);
							// console.log($(ps).children().eq(0).attr("propert"))
							$(ps).children().on("click",function(){
								var remo = $(this).attr("propert");
								localStorage.removeItem(remo);
								$(this).parents("li").css({
									"display":"none"
								})
								location.href="buycar.html";
							})
						};
					};
				};
			};
			// 当input的值改变时绑定事件
			$(".goods input").on("change",function(){
				// 改变价格的数量
				var num = Number($(this).val());
				var pric = Number($(this).parent().siblings().eq(2).text().match(/[0-9]{3,6}/)[0]);
				// console.log(pric)
				total = num*pric;
				Num = 0;
				Num = Num+num;
				// 改变当前商品的总价格
				var p5 = $(this).parent().siblings().eq(3);
				p5.text(function(ind,text){
					return "￥"+total
				})
				// 计算总价格
				var sibi = $(this).parents().eq(1).siblings();
					$(sibi).each(function(ind,ele){
					// console.log(parseInt($(ele).children().eq(3).children().val()))
					var nums = parseInt($(ele).children().eq(3).children().val());
					Num = Num+nums
					// 改变总商品数量
					$("#showp>p>span").text(Num)
					var sibitext = parseInt(ele.children[4].innerText.match(/[0-9]{3,6}/)[0]);
					total = total+sibitext;
					$(".jiezhang>span").text(function(ind,text){
						return "￥"+total
					});
				});
				var ipropert = $(this).parents().eq(0).siblings().children().eq(0).attr("propert");
				var obj = JSON.parse(localStorage.getItem(ipropert))
				console.log(obj)
				var inof = {
					"tel":obj.tel,
					"number":num,
					"telcolor":obj.telcolor,
					"edition":obj.edition,
					"price":obj.price,
					"pic":obj.pic
				}
				localStorage.setItem(ipropert,JSON.stringify(inof))
			});
			// 初始化不含运费的总价格total
			$(".goods>li").each(function(){
				total = total+parseInt($(this).children().eq(4).text().match(/[0-9]{3,6}/)[0]);
				$(".jiezhang>span").text(function(ind,text){
					return "￥"+total
				});	
			});
			// 点击继续购物返回首页
			$(".jieshu>span:eq(0)").on("click",function(){
				location.href="sy.html"
			})
			// 点击立即结算
			$(".jieshu>span:eq(1)").on("click",function(){
				confirm("您的商品总价格￥"+total)
			})
			
			// 用户登陆显示
			$(".second>li>b").text(location.hash.split("=")[1])