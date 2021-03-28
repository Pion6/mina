import { request } from '../../request/index.js'
//Page Object
Page({
  data: {
    swiperList:[],
    catesList:[],
    floorList:[]
  },
  //options(Object)
  onLoad: function(options){
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  // 轮播图数据
  getSwiperList(){
    var that = this;
    request({ url: '/home/swiperdata'})
    .then(res =>{
      console.log(res);
      that.setData({
        swiperList:res
      })
    })
  },
  // 获取分类导航数据
  getCatesList(){
    var that = this;
    request({ url: '/home/catitems'})
    .then(res =>{
      console.log(res);
      that.setData({
        catesList:res
      })
    })
  },
  // 获取楼层数据
  getFloorList(){
    var that = this;
    request({ url: '/home/floordata'})
    .then(res =>{
      console.log(res);
      that.setData({
        floorList:res
      })
    })
  }
});