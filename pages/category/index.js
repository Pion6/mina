// pages/category/index.js
import { request } from '../../request/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenu:[],
    rightContent:[],
    // 选中菜单
    currentIndex: 0,
    scrollTop: 0
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断本地存储中是否有旧数据且没有过期
    const Cates = wx.getStorageSync('cates');
    if(!Cates){
      this.getCates();
    }else{
      // 过期时间暂时设定为10s
      if(Date.now()-Cates.time>1000*1000){
        this.getCates();
      }else{
        this.Cates=Cates.data;
        let leftMenu=this.Cates.map(v=>v.cat_name);
        // 构造右侧的商品数据
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenu,
          rightContent
        })
      }
    }
  },
  // 获取分类数据
  getCates(){
    var that = this;
    request({ url: '/categories'})
    .then(res =>{
      console.log(res);
        this.Cates=res;
        // 接口数据存入本地存储中
        wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
        // 构造左侧的大菜单数据
        let leftMenu=this.Cates.map(v=>v.cat_name);
        // 构造右侧的商品数据
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenu,
          rightContent
        })
    })
  },
  // 左侧菜单点击事件
  handleItemTap(e){
    const { index } = e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop:0
    })
  }
})