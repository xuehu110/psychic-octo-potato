// pages/index/index.js
/**
 * 首页页面
 * 展示用户发布的内容列表，支持下拉刷新、上拉加载更多、预览图片和删除内容等功能
 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    contentList: [],    // 内容列表数据
    loading: false,     // 是否正在加载数据
    page: 1,           // 当前页码
    pageSize: 10,      // 每页数据条数
    hasMore: true      // 是否还有更多数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.loadContent()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   * 重置列表数据并重新加载
   */
  onPullDownRefresh: function () {
    this.setData({
      contentList: [],
      page: 1,
      hasMore: true
    })
    this.loadContent()
  },

  /**
   * 页面上拉触底事件的处理函数
   * 加载更多数据
   */
  onReachBottom: function () {
    if (this.data.hasMore && !this.data.loading) {
      this.loadContent()
    }
  },

  /**
   * 加载内容列表
   * 从云数据库获取内容列表数据，支持分页加载
   */
  loadContent: function () {
    if (this.data.loading) return
    
    this.setData({ loading: true })
    wx.cloud.database().collection('content')
      .orderBy('createTime', 'desc')
      .skip((this.data.page - 1) * this.data.pageSize)
      .limit(this.data.pageSize)
      .get()
      .then(res => {
        const newList = this.data.contentList.concat(res.data)
        this.setData({
          contentList: newList,
          page: this.data.page + 1,
          hasMore: res.data.length === this.data.pageSize,
          loading: false
        })
      })
      .catch(err => {
        console.error('加载内容失败：', err)
        this.setData({ loading: false })
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        })
      })
  },

  /**
   * 跳转到编辑页面
   * 用于创建新的内容
   */
  goToEdit: function () {
    wx.navigateTo({
      url: '/pages/edit/edit'
    })
  },

  /**
   * 预览图片
   * @param {Object} e - 事件对象，包含当前图片和图片列表信息
   */
  previewImage: function (e) {
    const { current, urls } = e.currentTarget.dataset
    wx.previewImage({
      current,
      urls
    })
  },

  /**
   * 删除内容
   * @param {Object} e - 事件对象，包含要删除的内容ID和图片列表
   */
  deleteContent: function (e) {
    const { id, imageList } = e.currentTarget.dataset
    wx.showModal({
      title: '提示',
      content: '确定要删除这条内容吗？',
      success: res => {
        if (res.confirm) {
          // 删除云数据库中的内容
          wx.cloud.database().collection('content').doc(id).remove()
            .then(() => {
              // 删除云存储中的图片
              if (imageList && imageList.length > 0) {
                wx.cloud.deleteFile({
                  fileList: imageList
                })
              }
              // 更新列表
              const newList = this.data.contentList.filter(item => item._id !== id)
              this.setData({ contentList: newList })
              wx.showToast({
                title: '删除成功'
              })
            })
            .catch(err => {
              console.error('删除失败：', err)
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              })
            })
        }
      }
    })
  }
})