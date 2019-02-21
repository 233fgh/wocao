var rightbtn = document.getElementsByClassName("rightj")[0];
var leftbtn  = document.getElementsByClassName("leftj")[0];
var ind = 0,timer=null,flag=true,autoTimer=null,z=0;
var list = document.getElementsByClassName("tu")[0];
var lis  = list.children;
var tab = document.getElementsByClassName("tab")[0].children;
var box = document.getElementsByClassName("lunbo")[0];
var one = document.getElementsByClassName("one")[0];
			
			
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
			// 切换到过渡页面
			$(".one>li").on("click",function(){
				console.log(this.getAttribute("ind"))
//				console.log(this.ind)
				location.href="qiehuanye.html?="+this.getAttribute("ind")+"#="+location.hash.split("=")[1];
			})
			console.log($(".second>li>b").text())
//			点击轮播图底下的的切换按钮
			for(var w =0 ;w<tab.length;w++){
				tab[w].ind=w;
				tab[w].onclick=function(){
					console.log(this.ind)
					list.style.left=(-1350)*this.ind+'px';
				}
			}
			//自动轮播
			autoTimer = setInterval(move,5000);
			
//			鼠标移入  轮播停止  清空autoTimer定时器
			box.addEventListener('mouseenter',function(){
				clearInterval(autoTimer);
			})
			box.addEventListener('mouseleave',function(){
				autoTimer = setInterval(move,5000);
			})			
			//左按钮
			leftbtn.addEventListener('click',move,false)
			
			//右按钮
			rightbtn.addEventListener('click',function(){
				if(flag){
					flag=false;
					if(ind==0){
						ind=lis.length-1;
						list.style.left=(-1350)*ind+'px';
					}
					ind--;
					timer = setInterval(function(){
						var curleft = parseInt(getStyle(list,'left'));
						
						if(curleft==(-1350*ind)){
							flag=true;
							clearInterval(timer)
							
						}else{
							list.style.left=curleft+25+'px';
						}
					},20)	
			    }	
			})
			
            function move(){
			    if(flag){
			    	flag=false;
					ind++;
					timer = setInterval(function(){
						//获取当前ul的left值
						var curleft = parseInt(getStyle(list,'left'));
						//判断是否走到了目标位置  走到了就清空定时器
						//每次走到目标位置之后  判断现在显示的这一张是不是最后一张
						if(curleft==(-1350*ind)){
							//如果是 就回到第一张
							if(ind==lis.length-1){
								ind=0;
								list.style.left=0+'px';
							}
							flag=true;
							clearInterval(timer);
						}else{
							//否则就继续移动
							list.style.left=curleft-25+'px';
						}
					},20)
				}
 			}
            
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