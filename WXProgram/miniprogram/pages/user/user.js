// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: '',
      nickName: '',
      introduction: '',
      gender: '',
      ageGroup: '',
      interests: '',
      occupation: ''
    },
    showInfoModal: false,
    genderArray: ['男', '女', '其他'],
    ageGroupArray: ['18岁以下', '18-25岁', '26-35岁', '36-45岁', '46岁以上']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 加载用户信息
    this.loadUserInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 加载用户信息
  loadUserInfo() {
    // TODO: 从服务器或本地存储加载用户信息
    // 这里暂时使用模拟数据
    const userInfo = {
      avatarUrl: '/images/default-avatar.png',
      nickName: '测试用户',
      introduction: '这是一个测试简介',
      gender: 0,
      ageGroup: '26-35岁',
      interests: '阅读、旅行',
      occupation: '工程师'
    };
    this.setData({
      userInfo
    });
  },

  // 显示用户信息模态框
  showUserInfoModal() {
    this.setData({
      showInfoModal: true
    });
  },

  // 隐藏用户信息模态框
  hideUserInfoModal() {
    this.setData({
      showInfoModal: false
    });
  },

  // 修改头像
  changeAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        this.setData({
          'userInfo.avatarUrl': tempFilePath
        });
        // TODO: 上传头像到服务器
      }
    });
  },

  // 编辑用户信息
  editUserInfo(e) {
    const type = e.currentTarget.dataset.type;
    const title = type === 'nickname' ? '修改昵称' : '修改简介';
    const content = this.data.userInfo[type] || '';

    wx.showModal({
      title,
      content,
      editable: true,
      success: (res) => {
        if (res.confirm && res.content) {
          this.setData({
            [`userInfo.${type}`]: res.content
          });
          // TODO: 保存到服务器
        }
      }
    });
  },

  // 性别选择器变化事件
  bindGenderChange(e) {
    this.setData({
      'userInfo.gender': parseInt(e.detail.value)
    });
  },

  // 年龄段选择器变化事件
  bindAgeGroupChange(e) {
    this.setData({
      'userInfo.ageGroup': this.data.ageGroupArray[e.detail.value]
    });
  },

  // 兴趣爱好输入事件
  bindInterestsInput(e) {
    this.setData({
      'userInfo.interests': e.detail.value
    });
  },

  // 职业输入事件
  bindOccupationInput(e) {
    this.setData({
      'userInfo.occupation': e.detail.value
    });
  },

  // 保存用户信息
  saveUserInfo() {
    // TODO: 保存用户信息到服务器
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
    this.hideUserInfoModal();
  }
})