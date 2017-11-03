/*
 *下拉刷新和上拉加载js
 *
1.引用mescroll.css和mescroll.js; 引用自定义的mescroll-option.css和mescroll-option.js,并检查相关图片路径是否引用正确;

2.拷贝以下布局结构
<div id="mescroll" class="mescroll"> // id可修改,但class不能改;另外mescroll的height: 100%,所以父布局要有高度,否则无法触发上拉加载.
	//滑动区域的内容,如:<ul>列表数据</ul> ...
</div>

3.创建MeScroll对象,内部已默认开启下拉刷新
var mescroll = initMeScroll("mescroll", {
//	down:{
//		auto: true, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
//		callback: function() {
//			mescroll.resetUpScroll();//下拉刷新的回调,默认重置上拉加载列表为第一页
//		}
//	},
	up: {
//		auto: false, //是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
		callback: getListData, //上拉回调,此处可简写; 相当于 callback: function (page) { getListData(page); }
	}
});

function getListData(page){
	$.ajax({
        type: 'GET',
        url: 'xxxxxx?num='+page.num+"&size="+page.size,
        dataType: 'json',
        success: function(data){
        	//联网成功的回调,隐藏下拉刷新和上拉加载的状态;(参数:当前页数据的总数)
			mescroll.endSuccess(data.length);//如果传了参数,mescroll会自动判断列表若无任何数据,则提示空;列表无下一页数据,则提示无更多数据;如果不传参数则仅隐藏加载中的状态
			//设置列表数据
			//setListData(data);
        },
        error: function(data){
        	//联网失败的回调,隐藏下拉刷新和上拉加载的状态;
	        mescroll.endErr();
        }
    });
}

其他常用方法:
1.主动触发下拉刷新 mescroll.triggerDownScroll();
2.主动触发上拉加载 mescroll.triggerUpScroll();
3.重置列表 mescroll.resetUpScroll();
4.滚动列表到指定位置 mescroll.scrollTo(y); (y=0回到列表顶部;如需滚动到列表底部,可设置y很大的值,比如y=99999);
5.获取下拉刷新的配置 mescroll.optDown;
6.获取上拉加载的配置 mescroll.optUp;
7.锁定下拉刷新 mescroll.lockDownScroll(isLock); (isLock=ture,null锁定;isLock=false解锁)
8.锁定上拉加载 mescroll.lockUpScroll(isLock); (isLock=ture,null锁定;isLock=false解锁)
**/

function initMeScroll(mescrollId, options) {
    //下拉刷新的布局内容
    let htmlContent = '<p class="downwarp-tip">↓ 下拉刷新 ↓</p>';
    htmlContent += '<img class="downwarp-progress" src="option/mescroll-progress.png"/>';
    htmlContent += '<img class="downwarp-slogan" src="option/mescroll-slogan.png"/>';

    //上拉加载中的布局
    let htmlLoading = '<img class="upwarp-progress mescroll-rotate" src="option/mescroll-progress.png"/><img class="upwarp-slogan" src="option/mescroll-slogan.png"/>';
    //无数据的布局
    let htmlNodata = '<img class="upwarp-nodata" src="option/mescroll-nodata.png"/>';

    //自定义的配置 (以下注释部分等同于mescroll本身的默认配置,这里贴出来是为了便于理解,实际项目可直接删除)
    let myOption={
        down:{
            htmlContent: htmlContent, //布局内容
//			inited: function(mescroll, downwarp) {
//				//初始化完毕的回调,可缓存dom
//				mescroll.downTipDom = downwarp.getElementsByClassName("downwarp-tip")[0];
//				mescroll.downProgressDom = downwarp.getElementsByClassName("downwarp-progress")[0];
//			},
            inOffset: function(mescroll) {
                //进入指定距离范围内那一刻的回调
                mescroll.downTipDom.innerHTML = "↓ 下拉刷新 ↓";
                mescroll.downProgressDom.classList.remove("mescroll-rotate");
            },
            outOffset: function(mescroll) {
                //下拉超过指定距离那一刻的回调
                mescroll.downTipDom.innerHTML = "↑ 释放更新 ↑";
            },
//			onMoving: function(mescroll, rate, downHight) {
//				//下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
//				var progress = 360 * rate;
//				mescroll.downProgressDom.style.webkitTransform = "rotate(" + progress + "deg)";
//				mescroll.downProgressDom.style.transform = "rotate(" + progress + "deg)";
//			},
//			showLoading: function(mescroll) {
//				//触发下拉刷新的回调
//				mescroll.downTipDom.innerHTML = "加载中 ...";
//				mescroll.downProgressDom.classList.add("mescroll-rotate");
//			}
        },
        up:{
            htmlLoading: htmlLoading, //上拉加载中的布局
            htmlNodata: htmlNodata, //无数据的布局
//			showLoading: function(mescroll, upwarp) {
//				//上拉加载中.. mescroll.upProgressDom.style.display = "block" 不通过此方式显示,因为ios快速滑动到底部,进度条会无法及时渲染
//				upwarp.innerHTML = mescroll.optUp.htmlLoading;
//			},
//			showNoMore: function(mescroll, upwarp) {
//				//无更多数据
//				upwarp.innerHTML = mescroll.optUp.htmlNodata;
//			},
            empty: {
                icon: "option/mescroll-empty.png", //空布局的图标
                tip: "亲,暂无相关商品~",
                btntext: "去逛逛 >", //按钮,默认""
                btnClick: function(){//点击按钮的回调,默认null
                    alert("点击了按钮,具体逻辑自行实现");
                }
            },
            toTop: {
                src: "option/mescroll-totop.png" //回到顶部按钮的图片路径
            }
        }
    };

    //加入自定义的默认配置
    options=MeScroll.extend(options,myOption);

    //创建MeScroll对象
    return new MeScroll(mescrollId,options);
}

//首页配置

$(function(){
    //创建MeScroll对象
    let mescroll = initMeScroll("mescroll", {
        up: {
            clearEmptyId:"dataList",
            isBoth: true, //上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认false,两者不可同时触发; 这里为了演示改为true,不必等列表加载完毕才可下拉;
            callback: getListData, //上拉加载的回调
        }
    });

    /*初始化菜单*/
    let pdType=0;//全部商品0; 奶粉1; 图书2;
    $(".menu-bar-li").click(function(){
        let i=$(this).attr("i");
        i= parseInt(i);
        if(pdType !== i) {
            //更改列表条件
            pdType=i;
            $(".menu-bar .menu-bar-active").removeClass("menu-bar-active");
            $('.limit-bar').eq(i).addClass('limit-bar-show').siblings('div').removeClass('limit-bar-show');
            $(this).addClass("menu-bar-active");
            //重置列表数据
            mescroll.resetUpScroll();
        }
    });

    /*联网加载列表数据  page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */

    function getListData(page){
        //联网加载数据
        console.log("pdType="+pdType+", page.num="+page.num);
        getListDataFromNet(pdType, page.num, page.size, function(data){
            //联网成功的回调,隐藏上拉加载的状态
            console.log("data.length="+data.length);
            mescroll.endSuccess(data.length);//传参:数据的总数; mescroll会自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
            //设置列表数据
            setListData(data);
        }, function(){
            //联网失败的回调,隐藏上拉加载的状态
            mescroll.endErr();
        });
    }
    var j=0;
    /*设置列表数据*/
    function setListData(data){

        let listDom=document.getElementById("dataList");
        for (let i = 0; i < data.length; i++) {
            let pd=data[i];
            j=j+1;
               //优惠券可用
            if(pdType==1 && pd.pdif){
                var str=`<div class="goods-wrapper-item cg-coupon">
                <div class="avatar-list">
                    <div class="avatar-list-img"><img src="images/li1.png" alt="" class="img-responsive"></div>
                    <div class="avatar-list-info">
                        <div class="avatar-list-info-top">
                            <p class="avatar-list-info-title cg-coupon-title">张小黑的面包店<span class="avatar-list-info-gray">1.2km</span></p>
                        </div>
                        <div class="avatar-list-info-bottom cg-coupon-bottom">
                        	<div class="cg-coupon-bottom-price">
                        		<p><span class="avatar-list-info-bottom-price">68</span>元购物券<span class="avatar-list-info-gray">满30元可用</span></p>
                            <p class="goods-wrapper-item-title-distance goods-wrapper-item-mark checked">立即使用</p>
                        	</div>
                        	<p class="expiry-date">
                        		<span>有效期至：2017-12-12</span>
                        		<span>195493人已领</span>
                        	</p>
                        </div>
                    </div>
                </div>
            </div>`;
            }else if(pdType==1){
                //立即领取优惠券
                var str=`<div class="goods-wrapper-item cg-coupon">
             
                <div class="avatar-list">
                    <div class="avatar-list-img"><img src="images/li1.png" alt="" class="img-responsive"></div>
                    <div class="avatar-list-info">
                        <div class="avatar-list-info-top">
                            <p class="avatar-list-info-title cg-coupon-title">${pd.storeName}<span class="avatar-list-info-gray">1.2km</span></p>
                        </div>
                        <div class="avatar-list-info-bottom cg-coupon-bottom">
                        	<div class="cg-coupon-bottom-price">
                        		<p><span class="avatar-list-info-bottom-price">${pd.parValue}</span>元购物券<span class="avatar-list-info-gray">满${pd.attainAmount}元可用</span></p>
                            <p class="goods-wrapper-item-title-distance goods-wrapper-item-mark">立即领取</p>
                        	</div>
                        	<p class="expiry-date">
                        		<span>有效期至：${pd.effectiveEndAt}</span>
                        		<span>${pd.getNumber}人已领</span>
                        	</p>


                        </div>
                    </div>
                </div>
            </div>`;
            }else if(pdType==0){
                //限时购

                var str=`
                    <div class="goods-wrapper-item">
                <div class="goods-wrapper-item-title">
                    <div class="goods-wrapper-item-title-left">
                        <img src="images/m1.png" class="img-responsive">
                        <h1>${pd.storeName}</h1>
                    </div>
                    <p class="goods-wrapper-item-title-distance">距离您1.2km</p>
                </div>
                <div class="avatar-list">
                    <div class="avatar-list-img"><img src=${pd.image} alt="" class="img-responsive"></div>
                    <div class="avatar-list-info">
                        <div class="avatar-list-info-top">
                            <p class="avatar-list-info-title">${pd.name}<span class="avatar-list-info-gray">已抢${pd.saleNumber}件</span></p>
                            <p class="avatar-list-info-price"><span class="avatar-list-info-gray">${pd.slogan}</span></p>
                        </div>
                        <div class="avatar-list-info-bottom">
                            <p><span class="avatar-list-info-bottom-price">￥${pd.price}</span><span class="avatar-list-info-gray">￥${pd.originalPrice}</span></p>
                            <p class="goods-wrapper-item-title-distance goods-wrapper-item-mark">限时购</p>
                        </div>
                    </div>
                </div>
                <div class="goods-wrapper-item-bottom">
                    <p class="avatar-list-info-gray count-down" id="countDown${j}"></p>
                </div>
            </div>
                    `;
            }else if(pdType==2 && pd.isGiving=='免单团'){
                var str=`<div class="goods-wrapper-item">
                <div class="goods-wrapper-item-title">
                    <div class="goods-wrapper-item-title-left">
                        <img src="images/m1.png" class="img-responsive">
                        <h1>${pd.storeName}</h1>
                    </div>
                    <p class="goods-wrapper-item-title-distance">距离您1.2km</p>
                </div>
                <div class="avatar-list">
                    <div class="avatar-list-img"><img src=${pd.image} alt="" class="img-responsive"></div>
                    <div class="avatar-list-info">
                        <div class="avatar-list-info-top">
                            <p class="avatar-list-info-title">${pd.name}<span class="avatar-list-info-gray">已团${pd.saleNumber}件</span></p>
                            <p class="avatar-list-info-price"><span class="avatar-list-info-gray">${pd.slogan}</span></p>
                        </div>
                        <div class="avatar-list-info-bottom">
                            <p><span class="avatar-list-info-bottom-price">￥${pd.price}</span><span class="avatar-list-info-gray">￥${pd.originalPrice}</span></p>
                            <p class="goods-wrapper-item-title-distance goods-wrapper-item-mark yellow">免单团</p>
                        </div>
                    </div>
                </div>
            </div>`;
            }else if(pdType==2 && pd.isGiving=='特价团'){
                var str=`<div class="goods-wrapper-item">
                <div class="goods-wrapper-item-title">
                    <div class="goods-wrapper-item-title-left">
                        <img src="images/m1.png" class="img-responsive">
                        <h1>${pd.storeName}</h1>
                    </div>
                    <p class="goods-wrapper-item-title-distance">距离您1.2km</p>
                </div>
                <div class="avatar-list">
                    <div class="avatar-list-img"><img src=${pd.image} alt="" class="img-responsive"></div>
                    <div class="avatar-list-info">
                        <div class="avatar-list-info-top">
                            <p class="avatar-list-info-title">${pd.name}<span class="avatar-list-info-gray">已团${pd.saleNumber}件</span></p>
                            <p class="avatar-list-info-price"><span class="avatar-list-info-gray">${pd.slogan}</span></p>
                        </div>
                        <div class="avatar-list-info-bottom">
                            <p><span class="avatar-list-info-bottom-price">￥${pd.price}</span><span class="avatar-list-info-gray">￥${pd.originalPrice}</span></p>
                            <p class="goods-wrapper-item-title-distance goods-wrapper-item-mark green">特价团</p>
                        </div>
                    </div>
                </div>
            </div>`;
            }


            var liDom=document.createElement("div");


            liDom.innerHTML=str;

            listDom.appendChild(liDom);
            //活动倒计时
            if(pdType===0 ){
                var timer= function (json){
                        if(json.currentTime){
                            var now=new Date();
                            var year=now.getFullYear();//返回年份（4位数字）
                            var month=now.getMonth()+1;//返回月份（0-11，所以+1）
                            var day=now.getDate();//返回某天（1-31）
                            var h=now.getHours();//返回小时（0-23）
                            var m=now.getMinutes();//返回分钟（0-59）
                            var s=now.getSeconds();//返回秒数（0-59）


                            var weekday=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
                            // document.getElementById(json.objId).innerHTML=year+'年'+month+'月'+day+'日'+weekday[now.getDay()]+' '+h+':'+m+':'+s;
                            setTimeout(function(){timer(json)},100);
                        }else{
                            var endtime=new Date(json.endtime);//结束时间
                            var nowtime = new Date();//当前时间
                            var lefttime=parseInt((endtime.getTime()-nowtime.getTime())/1000); //计算差的秒数
                            //一天24小时 一小时60分钟 一分钟60秒
                            d=parseInt(lefttime/3600/24);
                            h=parseInt((lefttime/3600)%24);
                            m=parseInt((lefttime/60)%60);
                            s=parseInt(lefttime%60);
                            //补O
                            h=h<10?'0'+h:h;
                            m=m<10?'0'+m:m;
                            s=s<10?'0'+s:s;
                            document.getElementById(json.objId).innerHTML=`距离结束还剩 <span>${d}</span>:<span>${h}</span>:<span>${m}</span>:<span>${s}</span>`;
                            if(lefttime>0){setTimeout(function(){timer(json)},500);}
                        }
                    }


                timer({
                    currentTime:true,
                    objId:'thisTime'
                })

                timer({
                    objId:'countDown'+j,
                    endtime:pd.endedAt
                })

            }else {

            }


        }
    }

    /*联网加载列表数据*/
    function getListDataFromNet(pdType,pageNum,pageSize,successCallback,errorCallback) {
        //延时一秒,模拟联网
        setTimeout(function () {
            let URL= '';
            switch(pdType)
            {
                case 0 :
                    //限时抢购
                    URL='http://test.cc/user/v1/products/time';
                    break;
                case 1 :
                    //优惠券
                    URL='http://test.cc/user/v1/coupons';
                    break;
                case 2 :
                    URL='http://test.cc/user/v1/products/free';
                //拼团抢购
            }

             	$.ajax({
		                type: 'GET',
		                url: URL,
		                // url: 'xxx?pdType='+pdType+'&num='+pageNum+'&size='+pageSize,
		                dataType: 'json',
		                success: function(data){
		                    console.log(data);
            // var data=pdlist1; // 模拟数据: ../res/pdlist1.js
            var listData=[];
            //pdType 全部商品0; 奶粉1; 图书2;
            if(pdType==0){
                //全部商品 (模拟分页数据)
                for (var i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
                    if(i==data.length) break;
                    listData.push(data[i]);
                }
            }else if(pdType==1){
                //奶粉

                for (var i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
                    if(false) break;
                    listData.push(data[i]);
                }

            }else if(pdType==2){
                //图书
                for (var i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
                    if(i==data.length) break;
                    listData.push(data[i]);
                }
            }

            //回调
            successCallback(listData);
		                },
		                error: errorCallback
		            });
        },500)
    }

    //禁止PC浏览器拖拽图片,避免与下拉刷新冲突;如果仅在移动端使用,可删除此代码
    document.ondragstart=function() {return false;}
});

