// components/region_picker /regin_picker.js
/**
 * 省市二级联动
 * 可以使用其他二级联动
 */
// 传递getData约定格式；[{ id:'', name:'', list:[{id:'', name:''}] }];以id，name二级嵌套；list数组放子集
 const getData = [
   {
     id: 0,
     name: 'parent1',
     list: [
       {
         id: 1,
         name: 'child1'
       },
       {
        id: 2,
        name: 'child2'
      }
     ]
   },
   {
    id: 3,
    name: 'parent2',
    list: [
      {
        id: 4,
        name: 'child1'
      },
      {
       id: 5,
       name: 'child2'
     }
    ]
  }
 ]

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //获取二级数据
    getData:{
      type: Array,
      value: getData
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    multiArray: [[],[]],
    multiIndex: [0, 0],
  },

  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      this.setInitArr()
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
    created() {}
  },
  pageLifetimes: {
    show() {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化多列 设置显示的默认数据
    setInitArr(){
      let getData = this.data.getData;
      if(getData.length){
        let arr1 = this.formatArr(getData); // 获取父级name数组
        let arr2 = this.formatArr(getData[0].list); //获取第一个父级的子集name数组
        let multiArray = this.data.multiArray;

        multiArray[0] = arr1;
        multiArray[1] = arr2;
        this.setData({
          multiArray
        })
      }else{
        this.showModal('需要获取getData数据')
      }
    },

    //格式化数组，提取name,id返回对象格式数组
    formatArr(arr){
      let newArr = [];
      for(let i in arr){
        let temp = {};
        temp.id = arr[i].id;
        temp.name = arr[i].name;
        newArr.push(temp)
      }
      return newArr
    },

    bindPickerChange(e) {
      let multiArray = this.data.multiArray;
      let multiIndex = this.data.multiIndex;
      let data = []
      data[0] = multiArray[0][multiIndex[0]];
      data[1] = multiArray[1][multiIndex[1]];
      
      this.triggerEvent('confirm', data); // 把变动后的数组返回到父组件
    },
  
    bindColumnChange(e){
      let column = e.detail.column; // 当前滑动的列索引
      let index = e.detail.value; // 当前滑动的列中的位置索引
      let multiArray = this.data.multiArray;
      let multiIndex = this.data.multiIndex
      multiIndex[1]=0;
      if(column == 0){ // 滑动第一列
        let secondArr = this.findSecondArr(index); // 动态获取第一列对应的第二列数组
        console.log(index)
        console.log(this.data.multiIndex)
        
        multiArray[1] = secondArr;
        multiIndex[0] = index
        this.setData({
          multiArray,
          multiIndex
        })
      }else{ // 滑动第二列
        multiIndex[1] = index;
        this.setData({
          multiIndex
        })
      }
  
    },
  
    // 动态获取第二列数组
    findSecondArr(index){
      let getData = this.data.getData;
      return this.formatArr(getData[index].list)  // 简单来说 第二列不需要函数处理，基于稳定统一
    },

    // 模态框函数
    showModal(info){
      return wx.showModal({
        title: '提示',
        content: info,
        showCancel: false
      })
    }
    
  }
})
