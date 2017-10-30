$(function(){
    //滑动导航
    var mySwiper1 = new Swiper('#header',{
        freeMode : true,
        slidesPerView : 'auto',
        freeModeSticky : true ,
    });
    //创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,刷新列表数据;
    var mescroll = new MeScroll("mescroll", {
        //上拉加载的配置项
        up: {
            callback: getListData, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
            noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
            empty: {
                icon: "../res/img/mescroll-empty.png", //图标,默认null
                tip: "暂无相关数据~", //提示
                btntext: "去逛逛 >", //按钮,默认""
                btnClick: function(){//点击按钮的回调,默认null
                    alert("点击了按钮,具体逻辑自行实现");
                }
            },
            clearEmptyId: "dataList" //相当于同时设置了clearId和empty.warpId; 简化写法;默认null
        }
    });

    /*初始化菜单*/
    var pdType=0;//全部商品0; 奶粉1; 面膜2; 图书3;
    $(".swiper-wrapper .swiper-slide").click(function(){
        var i=$(this).attr("i");
        if(pdType!=i) {
            //更改列表条件
            pdType=i;
            $(".swiper-wrapper .nav-active").removeClass("nav-active");
            $(this).addClass("nav-active");
            //重置列表数据
            mescroll.resetUpScroll();
        }
    })

    /*联网加载列表数据  page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    function getListData(page){
        //联网加载数据
        console.log("pdType="+pdType+", page.num="+page.num);
        getListDataFromNet(pdType, page.num, page.size, function(data){
            //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            console.log("data.length="+data.length);
            mescroll.endSuccess(data.length);//传参:数据的总数; mescroll会自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
            //设置列表数据
            setListData(data);
        }, function(){
            //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endErr();
        });
    }

    /*设置列表数据*/
    function setListData(data){
        var listDom=document.getElementById("dataList");
        for (var i = 0; i < data.length; i++) {
            var pd=data[i];

            var str=`
                    <div class="goods-wrapper-item">
                        <div class="goods-wrapper-item-title">
                            <div class="goods-wrapper-item-title-left">
                                <img src="images/m1.png" class="img-responsive">
                                <h1>张小黑家的面包店</h1>
                            </div>
                            <p class="goods-wrapper-item-title-distance">距离您1.2km</p>
                        </div>
                        <div class="avatar-list">
                            <div class="avatar-list-img"><img src="images/li1.png" alt="" class="img-responsive"></div>
                            <div class="avatar-list-info">
                                <div class="avatar-list-info-top">
                                    <p class="avatar-list-info-title">下午茶时光（万达广场）<span class="gray">已抢215件</span></p>
                                    <p class="avatar-list-info-price"><span class="gray">仅售68元，价值339元下午茶套餐一份！</span></p>
                                </div>
                                <div class="avatar-list-info-bottom">
                                    <p><span class="avatar-list-info-bottom-price">￥68</span><span class="gray">￥339.00</span></p>
                                    <p class="goods-wrapper-item-title-distance goods-wrapper-item-mark">限时购</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            var liDom=document.createElement("div");
            liDom.innerHTML=str;
            listDom.appendChild(liDom);
        }
    }

    /*联网加载列表数据*/
    function getListDataFromNet(pdType,pageNum,pageSize,successCallback,errorCallback) {
        //延时一秒,模拟联网
        setTimeout(function () {
//              	$.ajax({
//		                type: 'GET',
//		                url: 'xxx',
//		                url: 'xxx?pdType='+pdType+'&num='+pageNum+'&size='+pageSize,
//		                dataType: 'json',
//		                success: function(data){
            var data=pdlist1; // 模拟数据: ../res/pdlist1.js
            var listData=[];

            //pdType 全部商品0; 奶粉1; 面膜2; 图书3;
            if(pdType==0){
                //全部商品 (模拟分页数据)
                for (var i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
                    if(i==data.length) break;
                    listData.push(data[i]);
                }

            }else if(pdType==1){
                //奶粉
                for (var i = 0; i < data.length; i++) {
                    if (data[i].pdName.indexOf("奶粉")!=-1) {
                        listData.push(data[i]);
                    }
                }

            }else if(pdType==2){
                //面膜
                for (var i = 0; i < data.length; i++) {
                    if (data[i].pdName.indexOf("面膜")!=-1) {
                        listData.push(data[i]);
                    }
                }

            }else if(pdType==3){
                //图书
                for (var i = 0; i < data.length; i++) {
                    if (data[i].pdName.indexOf("图书")!=-1) {
                        listData.push(data[i]);
                    }
                }
            }

            //回调
            successCallback(listData);
//		                },
//		                error: errorCallback
//		            });
        },1000)
    }

    //禁止PC浏览器拖拽图片,避免与下拉刷新冲突;如果仅在移动端使用,可删除此代码
    document.ondragstart=function() {return false;}
});
