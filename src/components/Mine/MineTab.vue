<template>
  <div class="wrapper">
    <!-- <div class="identity-wrapper">
      <div class="identity">
        <p>我是买家</p>
        <i class="iconfont icon-zhuanhuan"></i>
        <p>我是卖家</p>
      </div>
      <div class="data">
        <ul>
          <li>
            <span class="number">{{isLogin?userinfo.coupon:0}}</span>
            <span class="desc">优惠券</span>
          </li>
          <li>
            <span class="number">￥{{isLogin?userinfo.envelopes:0}}</span>
            <span class="desc hongbao">红包</span>
          </li>
          <li>
            <span class="number">{{isLogin?userinfo.credit:0}}</span>
            <span class="desc">信用额度</span>
          </li>
        </ul>
      </div>
    </div> -->
    <div class="tab">
      <div class="tab-item" @click.stop="toOrderFn()">
        <i class="iconfont icon-icon_dindgan"></i>
        <span>我的订单</span>
      </div>
      <div class="tab-item">
        <i class="iconfont icon-gongdan"></i>
        <span>我租到的</span>
      </div>
      <div class="tab-item">
        <i class="iconfont icon-aixin"></i>
        <span>收藏关注</span>
      </div>
      <div class="tab-item">
        <i class="iconfont icon-shequ"></i>
        <span>我的社区</span>
      </div>
    </div>
    <div class="order" v-show="dt_isShowOrder">
      <div @click.stop='toBackMineFn' class="order-header"><i class="iconfont icon-back"></i><span>我的订单</span></div>
      <div class="order-body">
        <div class="order-body-item" v-for="(item,index) in orderList" :key="index">
          <ul class="order-body-item-header-two">
            <li>订单编号</li>
            <li>下单时间</li>
          </ul>
          <ul class="order-body-item-list-two" >
            <li>{{item[0].order_id}}</li>
            <li>{{item[0].order_time}}</li>
          </ul>
          <ul class="order-body-item-header-two">
            <li>订单状态</li>
            <li>操作</li>
          </ul>
          <ul class="order-body-item-list-two" >
            <li>{{item[0].state}}</li>
            <li>
              <span v-if="item[0].state == '配送中'" class="order-confirm" @click.stop="orderConfirmFn(item)">确认收货</span>
              <span v-else-if="item[0].state == '待发货'" class="order-confirm" @click.stop="orderCancelFn(item)">取消订单</span>
              <span v-else class="order-finish" @click.stop='toCommentPageFn(item)'>去评价</span>
            </li>
          </ul>
          <ul class="order-body-item-header">
            <li>商品名称</li>
            <li>商品价格</li>
            <li>商品数量</li>
          </ul>
          <div class="order-body-item-last" v-for="(itema,indexa) in item" :key="indexa">
            <ul class="order-body-item-list" >
              <li>{{item[indexa].cakename}}</li>
              <li>{{item[indexa].cakeprice}}</li>
              <li>{{item[indexa].cakenum}}</li>
            </ul>
          </div>
          <div class="order-total-price">总金额：{{handleTotalPriceFn(item)}}</div>
        </div>
      </div>
    </div>
    <div class="comment" v-show="dt_isShowComment">
      <div @click.stop='toBackMineFn' class="comment-header"><i class="iconfont icon-back"></i><span>我的评价</span></div>
      <div class="comment-body" v-if='!isAllcomment'>
        <div class="comment-body-item" v-for="(item) in commentList" :key="item.id" v-show="!item.isComment">
          <div class="comment-body-item-name">商品名称：{{item.cakename}}</div>
          <textarea id='commentvalue' name="" cols="57" rows="10" class="comment-body-item-conetnt" placeholder="来评价这款商品吧～～～"></textarea>
          <div class="comment-confirm" @click="toConfirmCommentFn(item)">确定评价</div>
        </div>
      </div>
      <div class="comment-body-no" v-else></div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import {
  mapState,
} from 'vuex';
import {
  findData,
  updateData,
  update
 } from '@/services';

export default {
  name: 'minetab',
  data(){
    return{
      //是否显示订单页面
      dt_isShowOrder:false,
      //是否显示评价页面
      dt_isShowComment:false,
      orderList:[],
      //评价列表
      commentList:[],
      //该订单下是否全部评论完
      isAllcomment: false,
    }
  },
  computed: {
    ...mapState(['userinfo', 'isLogin',]),
  },
  mounted(){
  },
  methods: {
    //该订单是否全部评论完毕
    handleIsAllCommentFn(){
      this.isAllComment = this.commentList.every(item => {
        return item.isComment === true;
      });
      console.log('222',this.isAllComment)
    },
    //随机订单id
    fcreateRandomId() {
       return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
    },
    //确定评价
    toConfirmCommentFn(item){
      console.log(item,document.getElementById('commentvalue').value)
      let userInfo = JSON.parse(window.localStorage.getItem('user-token')) || {};
      if(!document.getElementById('commentvalue').value){
        Toast("评价内容不能为空")
      }else{
        let obj = {};
        obj.info=item.id;
		    obj.type='_id';
        this.$ajax.find(obj).then(data => {
          let curData = [];
          if(data.status === 200 && data.data.res_code ===1){
            curData = data.data.res_body.data[0];
            let commentArr = curData.comment;
            let commentNew = {};
            commentNew.id = this.fcreateRandomId();
            commentNew.content = document.getElementById('commentvalue').value;
            commentNew.user_name = userInfo.name;
            commentArr.unshift(commentNew)
            this.$ajax.update({_id:item.id,comment:JSON.stringify(commentArr)}).then(data => {
              if(data.status === 200 && data.data.res_code ===1){
                let name = JSON.parse(window.localStorage.getItem('user-token')).name;
                findData({name,level:0}).then((data)=>{
                  console.log(data)
                  if(data.data.res_code ==  1){
                    var arr=data.data.res_body.data[0].cake;
                    console.log(arr)
                    for(var i=0;i<arr.length;i++){
                      if(arr[i].length >1 ){
                        for(let a = 0; a<arr[i].length;a++){
                          if(arr[i][a].order_id == item.order_id){
                            arr[i][a].isComment = true;
                          }
                        }
                      }else{
                        if(arr[i][0].order_id == item.order_id){
                          arr[i][0].isComment = true;
                        }
                      }
                      
                    }
                    let cake = JSON.stringify(arr);
                    window.localStorage.setItem('order', cake);
                    updateData({name:name,cake:cake,level:0}).then((data)=>{
                      console.log('修改订单状态',data);
                      if(data.data.res_code === 1){
                        Toast('评论成功');
                        item.isComment = true;
                      }else{
                        Toast('评论失败');
                      }
                    });

                  }
                });
              }else{
                Toast('评论失败')
              }
            });
          }else{
            Toast('网络错误')
          }
        })
      }
    },
    //显示评价页面
    toCommentPageFn(item){
      this.commentList = item;
      this.isAllComment = this.commentList.every(function(item) {
        return item.isComment == true;
      });
      if(this.isAllComment ){
        Toast('该订单已经评论完毕！！！');
        return;
      }
      this.dt_isShowOrder = false;
      this.dt_isShowComment = true;
      //this.handleIsAllCommentFn();
      console.log('评价商品数组',item,this.isAllComment)
    },
    //取消订单
    orderCancelFn(item){
      console.log('取消收货>>>',item)
      let name = JSON.parse(window.localStorage.getItem('user-token')).name;
      findData({name,level:0}).then((data)=>{
        if(data.data.res_code ==  1){
          console.log('订单',data.data.res_body.data[0].cake);
          let arr=data.data.res_body.data[0].cake;
          arr = arr.filter(itemNow => {
            return itemNow[0].order_id !== item[0].order_id;
          })
          console.log(arr)
          let cake = JSON.stringify(arr);
          window.localStorage.setItem('order', cake);
          updateData({name:name,cake:cake,level:0}).then((data)=>{
            if(data.data.res_code === 1){
              Toast('取消订单成功');
              this.orderList = arr;
            }else{
              Toast('取消订单失败');
            }
          });

        }
      });
    },
    //确认收货
    orderConfirmFn(item){
      console.log('确认收货>>>',item)
      let name = JSON.parse(window.localStorage.getItem('user-token')).name;
      let state = '已完成';
      findData({name,level:0}).then((data)=>{
        console.log(data)
        if(data.data.res_code ==  1){
          console.log('订单',data.data.res_body.data[0].cake);
          var arr=data.data.res_body.data[0].cake;
          for(var i=0;i<arr.length;i++){
            if(arr[i].length >1 ){
              for(let a = 0; a<arr[i].length;a++){
                if(arr[i][a].order_id == item[0].order_id){
                  arr[i][a].state = state;
                }
              }
            }else{
              if(arr[i][0].order_id == item[0].order_id){
                arr[i][0].state = state;
              }
            }
            
          }
          let cake = JSON.stringify(arr);
          window.localStorage.setItem('order', cake);
          updateData({name:name,cake:cake,level:0}).then((data)=>{
            console.log('修改订单状态',data);
            if(data.data.res_code === 1){
              Toast('确认收货成功');
              item[0].state = '已完成';
            }else{
              Toast('确认收货失败');
            }
          });

        }
      });
    },
    //计算单个订单总金额
    handleTotalPriceFn(arr){
      let totalPrice = 0;
      arr.map((item,index) => {
        totalPrice = totalPrice + item.cakeprice*item.cakenum;
      })
      return totalPrice;
    },
    //返回我的页面
    toBackMineFn(){
      this.dt_isShowOrder = false;
      this.dt_isShowComment = false;
    },
    //订单
    toOrderFn(){
      if(!this.isLogin){
        Toast('请先登录')
        return;
      } 
      this.dt_isShowOrder = true;
      this.orderList = JSON.parse(window.localStorage.getItem('order'))
    }
  }
};

</script>

<style lang="scss" scoped>
.wrapper{
  // height: 33%;
  margin-bottom: 10px;
  .identity-wrapper{
    // height: 57%;
    background-color:white;
    .data{
      // height: 50%;
      ul{
        height: 100%;
        display: flex;
        align-items: center;
        li{
          border-left: 1px solid #e6e6e6;
          width: calc(100%/3);
          height: 30%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          span.desc{
            font-size: 14px;
            &.hongbao{
              color: #fc655e;
            }
          }
        }
      }
    }
    .identity{
      border-bottom: 1px solid #e6e6e6;
      height: 50%;
      line-height: 64px;
      display: flex;
      p{
        text-align: center;
        width: calc((100%-16px)/2);
      }
      i.iconfont{
        color: #a6a6a6;
      }
    }
  }
  .tab{
    display: flex;
    height:34%;
    justify-content: space-around;
    margin-top: 2.5%;
    background-color:white;
    &-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i.iconfont{
        font-size: 24px;
      }
      span{
        font-size: 14px;
      }
    }
  }
}
.order{
  z-index: 100;
  position: fixed;
  background: #fff;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &-header{
    border-bottom: 1px solid #e6e6e6;
    height: 50px;
    line-height: 50px;
    position: relative;
    span{
      width: 100px;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    .icon-back{
      float: left;
      margin-left: 10px;
    }
  }
  &-body{
    font-size: 14px;
    height: 100%;
    overflow-y: auto;
    color: #322418;
    padding-bottom: 150px;
    &-item{
      margin-bottom: 10px;
      border-bottom: 1px #322418 solid;
      &-header{
        &-two{
          height: 40px;
          line-height: 40px;
          background: #e6e6e6;
          li{
            float: left;
            width: 180px;
            text-align: center;
          }
        }
        height: 40px;
        line-height: 40px;
        background: #e6e6e6;
        li{
          float: left;
          width: 125px;
          text-align: center;
        }
      }
      &-list{
        &-two{
          border-bottom: 1px solid #e6e6e6;
          font-size: 12px;
          height: 30px;
          line-height: 30px;
          li{
            text-align: center;
            float: left;
            width: 180px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
        border-bottom: 1px solid #e6e6e6;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        li{
          text-align: center;
          float: left;
          width: 125px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
.order-total-price{
  font-size: 14px;
  border-bottom: 1px solid #e6e6e6;
  height: 30px;
  line-height: 30px;
  padding-left: 260px;
}
.order-confirm{
  color: #fc655e;
  display: inline-block;
  text-align: center;
  width: 60px;
  height: 20px;
  line-height: 20px;
  border-radius: 5px;
  border: 1px solid #fc655e;
}
.order-finish{
  color: green;
  display: inline-block;
  text-align: center;
  width: 60px;
  height: 20px;
  line-height: 20px;
  border-radius: 5px;
  border: 1px solid green;
}
.comment{
  padding-left: 10px;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #efefef;
  &-header{
    border-bottom: 1px solid #e6e6e6;
    height: 50px;
    line-height: 50px;
    position: relative;
    span{
      width: 100px;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    .icon-back{
      float: left;
      margin-left: 10px;
    }
  }
  &-body{
    padding-top: 10px;
    &-item{
      padding-bottom:50px; 
      &-name{
        margin-bottom: 10px;
      }
    }
    .comment-confirm{
      width: 80px;
      height: 30px;
      color: white;
      background: #fc655e;
      text-align: center;
      line-height: 30px;
      border-radius: 5px;
      float: right;
      margin-right: 10px;
    }
  }
}
</style>
