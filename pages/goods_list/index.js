// pages/goods_list/index.js
import { request } from '../../request/index.js';
import rgeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList:[]
  },
  // 接口参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodsList();
  },
  // 获取商品列表数据
  async getGoodsList(){
    const res=await request({url:"/goods/search",data:this.QueryParams});
    // 获取总条数
    this.totalPages=Math.ceil(res.total/this.QueryParams.pagesize);
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })
  },
  // 标题点击事件 从子组件传递过来
  handletabItemChange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i) => {
      i===index?v.isActive=true:v.isActive=false;
    });
    this.setData({
      tabs
    })
  },
  // 页面上滑，滚动条触底时间
  onReachBottom(){
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '没有数据啦~~',
        image: '../../icons/nodata.png'
      })
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  }
})