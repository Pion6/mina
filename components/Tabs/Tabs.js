// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type: Array,
      value:[]
    }
  },
  data: {

  },
  methods: {
    handleItemTap(e){
      const {index}=e.currentTarget.dataset;
      this.triggerEvent("tabItemChange",{index})
    }
  }
})
