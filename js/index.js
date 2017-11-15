// function setListData(data){
    //
    //     let listDom=document.getElementById("dataList");
    //     for (let i = 0; i < data.length; i++) {
    //         let pd=data[i];
    //         j=j+1;
    //            //优惠券可用
    //         if(this.pdType==0 && pd.pdif){
    //             var str=`<div class="goods-wrapper-item cg-coupon">
    //             <div class="avatar-list">
    //                 <div class="avatar-list-img"><img src="images/li1.png" alt="" class="img-responsive"></div>
    //                 <div class="avatar-list-info">
    //                     <div class="avatar-list-info-top">
    //                         <p class="avatar-list-info-title cg-coupon-title">{{message}}<span class="avatar-list-info-gray">1.2km</span></p>
    //                     </div>
    //                     <div class="avatar-list-info-bottom cg-coupon-bottom">
    //                     	<div class="cg-coupon-bottom-price">
    //                     		<p><span class="avatar-list-info-bottom-price">68</span>元购物券<span class="avatar-list-info-gray">满30元可用</span></p>
    //                         <p class="goods-wrapper-item-title-distance goods-wrapper-item-mark checked">立即使用</p>
    //                     	</div>
    //                     	<p class="expiry-date">
    //                     		<span>有效期至：2017-12-12</span>
    //                     		<span>195493人已领</span>
    //                     	</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>`;
    //         }else if(this.pdType==0){
    //             //立即领取优惠券
    //             var str=`<div class="goods-wrapper-item cg-coupon">
    //
    //             <div class="avatar-list">
    //                 <div class="avatar-list-img"><img src="images/li1.png" alt="" class="img-responsive"></div>
    //                 <div class="avatar-list-info">
    //                     <div class="avatar-list-info-top">
    //                         <p class="avatar-list-info-title cg-coupon-title">${pd.storeName}<span class="avatar-list-info-gray">1.2km</span></p>
    //                     </div>
    //                     <div class="avatar-list-info-bottom cg-coupon-bottom">
    //                     	<div class="cg-coupon-bottom-price">
    //                     		<p><span class="avatar-list-info-bottom-price">${pd.parValue}</span>元购物券<span class="avatar-list-info-gray">满${pd.attainAmount}元可用</span></p>
    //                         <p class="goods-wrapper-item-title-distance goods-wrapper-item-mark">立即领取</p>
    //                     	</div>
    //                     	<p class="expiry-date">
    //                     		<span>有效期至：${pd.effectiveEndAt}</span>
    //                     		<span>${pd.getNumber}人已领</span>
    //                     	</p>
    //
    //
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>`;
    //         }else if(this.pdType==1){
    //             //限时购
    //
    //             var str=`
    //                 <div class="goods-wrapper-item">
    //             <div class="goods-wrapper-item-title">
    //                 <div class="goods-wrapper-item-title-left">
    //                     <img src="images/m1.png" class="img-responsive">
    //                     <h1>${pd.storeName}</h1>
    //                 </div>
    //                 <p class="goods-wrapper-item-title-distance">距离您1.2km</p>
    //             </div>
    //             <div class="avatar-list">
    //                 <div class="avatar-list-img"><img src=${pd.image} alt="" class="img-responsive"></div>
    //                 <div class="avatar-list-info">
    //                     <div class="avatar-list-info-top">
    //                         <p class="avatar-list-info-title">${pd.name}<span class="avatar-list-info-gray">已抢${pd.saleNumber}件</span></p>
    //                         <p class="avatar-list-info-price"><span class="avatar-list-info-gray">${pd.slogan}</span></p>
    //                     </div>
    //                     <div class="avatar-list-info-bottom">
    //                         <p><span class="avatar-list-info-bottom-price">￥${pd.price}</span><span class="avatar-list-info-gray">￥${pd.originalPrice}</span></p>
    //                         <p class="goods-wrapper-item-title-distance goods-wrapper-item-mark">限时购</p>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div class="goods-wrapper-item-bottom">
    //                 <p class="avatar-list-info-gray count-down" id="countDown${j}"></p>
    //             </div>
    //         </div>
    //                 `;
    //         }else if(this.pdType==2 && pd.typeText=='免单团'){
    //             var str=`<div class="goods-wrapper-item">
    //             <div class="goods-wrapper-item-title">
    //                 <div class="goods-wrapper-item-title-left">
    //                     <img src="images/m1.png" class="img-responsive">
    //                     <h1>${pd.storeName}</h1>
    //                 </div>
    //                 <p class="goods-wrapper-item-title-distance">距离您1.2km</p>
    //             </div>
    //             <div class="avatar-list">
    //                 <div class="avatar-list-img"><img src=${pd.image} alt="" class="img-responsive"></div>
    //                 <div class="avatar-list-info">
    //                     <div class="avatar-list-info-top">
    //                         <p class="avatar-list-info-title">${pd.name}<span class="avatar-list-info-gray">已团${pd.saleNumber}件</span></p>
    //                         <p class="avatar-list-info-price"><span class="avatar-list-info-gray">${pd.slogan}</span></p>
    //                     </div>
    //                     <div class="avatar-list-info-bottom">
    //                         <p><span class="avatar-list-info-bottom-price">￥${pd.price}</span><span class="avatar-list-info-gray">￥${pd.originalPrice}</span></p>
    //                         <p class="goods-wrapper-item-title-distance goods-wrapper-item-mark yellow">免单团</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>`;
    //         }else if(this.pdType==2 && pd.typeText=='特价团'){
    //             var str=`<div class="goods-wrapper-item">
    //             <div class="goods-wrapper-item-title">
    //                 <div class="goods-wrapper-item-title-left">
    //                     <img src="images/m1.png" class="img-responsive">
    //                     <h1>${pd.storeName}</h1>
    //                 </div>
    //                 <p class="goods-wrapper-item-title-distance">距离您1.2km</p>
    //             </div>
    //             <div class="avatar-list">
    //                 <div class="avatar-list-img"><img src=${pd.image} alt="" class="img-responsive"></div>
    //                 <div class="avatar-list-info">
    //                     <div class="avatar-list-info-top">
    //                         <p class="avatar-list-info-title">${pd.name}<span class="avatar-list-info-gray">已团${pd.saleNumber}件</span></p>
    //                         <p class="avatar-list-info-price"><span class="avatar-list-info-gray">${pd.slogan}</span></p>
    //                     </div>
    //                     <div class="avatar-list-info-bottom">
    //                         <p><span class="avatar-list-info-bottom-price">￥${pd.price}</span><span class="avatar-list-info-gray">￥${pd.originalPrice}</span></p>
    //                         <p class="goods-wrapper-item-title-distance goods-wrapper-item-mark green">特价团</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>`;
    //         }
    //
    //
    //         var liDom=document.createElement("div");
    //
    //
    //         liDom.innerHTML=str;
    //
    //         listDom.appendChild(liDom);
    //         //活动倒计时
    //         if(this.pdType===0 ){
    //             var timer= function (json){
    //                     if(json.currentTime){
    //                         var now=new Date();
    //                         var year=now.getFullYear();//返回年份（4位数字）
    //                         var month=now.getMonth()+1;//返回月份（0-11，所以+1）
    //                         var day=now.getDate();//返回某天（1-31）
    //                         var h=now.getHours();//返回小时（0-23）
    //                         var m=now.getMinutes();//返回分钟（0-59）
    //                         var s=now.getSeconds();//返回秒数（0-59）
    //
    //
    //                         var weekday=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
    //                         // document.getElementById(json.objId).innerHTML=year+'年'+month+'月'+day+'日'+weekday[now.getDay()]+' '+h+':'+m+':'+s;
    //                         setTimeout(function(){timer(json)},100);
    //                     }else{
    //                         var endtime=new Date(json.endtime);//结束时间
    //                         var nowtime = new Date();//当前时间
    //                         var lefttime=parseInt((endtime.getTime()-nowtime.getTime())/1000); //计算差的秒数
    //                         //一天24小时 一小时60分钟 一分钟60秒
    //                         d=parseInt(lefttime/3600/24);
    //                         h=parseInt((lefttime/3600)%24);
    //                         m=parseInt((lefttime/60)%60);
    //                         s=parseInt(lefttime%60);
    //                         //补O
    //                         h=h<10?'0'+h:h;
    //                         m=m<10?'0'+m:m;
    //                         s=s<10?'0'+s:s;
    //                         document.getElementById(json.objId).innerHTML=`距离结束还剩 <span>${d}</span>:<span>${h}</span>:<span>${m}</span>:<span>${s}</span>`;
    //                         if(lefttime>0){setTimeout(function(){timer(json)},500);}
    //                     }
    //                 }
    //
    //
    //             timer({
    //                 currentTime:true,
    //                 objId:'thisTime'
    //             })
    //
    //             timer({
    //                 objId:'countDown'+j,
    //                 endtime:pd.endedAt
    //             })
    //
    //         }else {
    //
    //         }
    //
    //
    //     }
    // }
var app= new Vue({
    el:'#mescroll',
    data: {
        message: 'Hello Vue.js!',
        pdType:0,
        URL:'',
        listData:[]
    },
    methods: {
        getListDataFromNet:function (pageNum,pageSize,successCallback,errorCallback) {
            setTimeout(()=>{
                switch(this.pdType)
                {
                    case 1 :
                        //限时抢购
                        this.URL='http://test.mihutime.com/user/v1/products/time';
                        break;
                    case 0 :
                        //优惠券
                        this.URL='http://test.mihutime.com/user/v1/coupons';
                        break;
                    case 2 :
                        this.URL='http://test.mihutime.com/user/v1/products/free';
                    //拼团抢购
                }
                console.log(this.URL)
                $.ajax({
                    type: 'GET',
                    url: this.URL,
                    dataType: 'json',
                    success: function(data){
                        console.log(data);
                        //this.pdType 全部商品0; 奶粉1; 图书2;
                        if(this.pdType==0){
                            //全部商品 (模拟分页数据)
                            for (var i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
                                if(i==data.length) break;
                                app.$data.listData.push(data[i]);
                            }
                        }else if(this.pdType==1){
                            //奶粉

                            for (var i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
                                if(false) break;
                                app.$data.listData.push(data[i]);
                            }

                        }else if(this.pdType==2){
                            //图书
                            for (var i = (pageNum-1)*pageSize; i < pageNum*pageSize; i++) {
                                if(i==data.length) break;
                                app.$data.listData.push(data[i]);
                            }
                        }
                        //回调
                        successCallback(data);
                    },
                    error: errorCallback
                });
            },500)
        },
       getListData:function (page){
            //联网加载数据
            console.log("this.pdType="+this.pdType+", page.num="+page.num);
            this.getListDataFromNet(page.num, page.size, function(data){
                //联网成功的回调,隐藏上拉加载的状态
                console.log("data.length="+data.length);
                mescroll.endSuccess(data.length);//传参:数据的总数; mescroll会自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
                //设置列表数据
                app.$data.listData=data;
            }, function(){
                //联网失败的回调,隐藏上拉加载的状态
                mescroll.endErr();
            });
       },
       initMeScroll:function (mescrollId, options) {
        let htmlContent = '<p class="downwarp-tip">↓ 下拉刷新 ↓</p>';
        htmlContent += '<img class="downwarp-progress" src="option/mescroll-progress.png"/>';
        htmlContent += '<img class="downwarp-slogan" src="option/mescroll-slogan.png"/>';
        let htmlLoading = '<img class="upwarp-progress mescroll-rotate" src="option/mescroll-progress.png"/><img class="upwarp-slogan" src="option/mescroll-slogan.png"/>';
        let htmlNodata = '<img class="upwarp-nodata" src="option/mescroll-nodata.png"/>';
        let myOption={
            down:{
                htmlContent: htmlContent, //布局内容
                inOffset: function(mescroll) {
                    mescroll.downTipDom.innerHTML = "↓ 下拉刷新 ↓";
                    mescroll.downProgressDom.classList.remove("mescroll-rotate");
                },
                outOffset: function(mescroll) {
                    mescroll.downTipDom.innerHTML = "↑ 释放更新 ↑";
                },
            },
            up:{
                htmlLoading: htmlLoading, //上拉加载中的布局
                htmlNodata: htmlNodata, //无数据的布局
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
        options=MeScroll.extend(options,myOption);
        return new MeScroll(mescrollId,options);
        }

    },
    mounted(){
        mescroll = this.initMeScroll("mescroll", {
            up: {
                isBoth: true, //上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认false,两者不可同时触发; 这里为了演示改为true,不必等列表加载完毕才可下拉;
                callback: this.getListData, //上拉加载的回调
            }
        });
        $(".menu-bar-li").click(function(){
            let i=$(this).attr("i");
            i= parseInt(i);
            if(app.$data.pdType !== i) {
                //更改列表条件
                app.$data.pdType=i;
                $(".menu-bar .menu-bar-active").removeClass("menu-bar-active");
                $('.limit-bar').eq(i).addClass('limit-bar-show').siblings('div').removeClass('limit-bar-show');
                $(this).addClass("menu-bar-active");
                //重置列表数据
                mescroll.resetUpScroll();
            }
        });}
})

