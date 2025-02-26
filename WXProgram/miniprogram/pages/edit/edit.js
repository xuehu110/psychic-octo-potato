// pages/edit/edit.js
/**
 * 编辑页面
 * 用于创建新的内容或编辑已有内容，支持文本输入和图片上传
 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    text: '',          // 文本内容
    imageList: [],     // 图片列表
    editId: null,      // 编辑内容的ID，新建时为null
    isSubmitting: false // 是否正在提交数据
  },

  /**
   * 生命周期函数--监听页面加载
   * @param {Object} options - 页面参数，包含id表示编辑模式
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({ editId: options.id })
      this.loadContent(options.id)
    }
  },

  /**
   * 加载已有内容
   * 从云数据库获取要编辑的内容数据
   * @param {string} id - 内容ID
   */
  loadContent: function (id) {
    wx.cloud.database().collection('content').doc(id).get()
      .then(res => {
        this.setData({
          text: res.data.text,
          imageList: res.data.imageList || []
        })
      })
      .catch(err => {
        console.error('加载内容失败：', err)
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        })
      })
  },

  /**
   * 输入文字内容
   * @param {Object} e - 输入事件对象
   */
  onInput: function (e) {
    this.setData({
      text: e.detail.value
    })
  },

  /**
   * 选择图片
   * 从相册或相机选择图片并上传到云存储
   * 最多支持9张图片
   */
  chooseImage: function () {
    const remainCount = 9 - this.data.imageList.length
    if (remainCount <= 0) {
      wx.showToast({
        title: '最多上传9张图片',
        icon: 'none'
      })
      return
    }

    wx.chooseImage({
      count: remainCount,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // 上传图片到云存储
        const uploadTasks = res.tempFilePaths.map(filePath => {
          return wx.cloud.uploadFile({
            cloudPath: `${Date.now()}-${Math.floor(Math.random() * 1000)}.${filePath.match(/\.\w+$/)[0]}`,
            filePath
          })
        })

        Promise.all(uploadTasks)
          .then(results => {
            const newImageList = this.data.imageList.concat(
              results.map(res => res.fileID)
            )
            this.setData({ imageList: newImageList })
          })
          .catch(err => {
            console.error('上传图片失败：', err)
            wx.showToast({
              title: '上传图片失败',
              icon: 'none'
            })
          })
      }
    })
  },

  /**
   * 删除图片
   * 从云存储和本地数据中删除指定图片
   * @param {Object} e - 事件对象，包含要删除的图片索引
   */
  deleteImage: function (e) {
    const index = e.currentTarget.dataset.index
    const imageList = this.data.imageList
    const deletedFileId = imageList[index]

    // 从云存储中删除
    wx.cloud.deleteFile({
      fileList: [deletedFileId]
    })

    // 更新数据
    imageList.splice(index, 1)
    this.setData({ imageList })
  },

  /**
   * 预览图片
   * @param {Object} e - 事件对象，包含当前图片信息
   */
  previewImage: function (e) {
    const { current } = e.currentTarget.dataset
    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },

  /**
   * 保存内容
   * 将文本和图片内容保存到云数据库
   * 支持新建和更新两种模式
   */
  saveContent: function () {
    if (this.data.isSubmitting) return
    if (!this.data.text.trim() && this.data.imageList.length === 0) {
      wx.showToast({
        title: '请输入内容或上传图片',
        icon: 'none'
      })
      return
    }

    this.setData({ isSubmitting: true })
    const db = wx.cloud.database()
    const data = {
      text: this.data.text,
      imageList: this.data.imageList,
      updateTime: db.serverDate()
    }

    const promise = this.data.editId
      ? db.collection('content').doc(this.data.editId).update({ data })
      : db.collection('content').add({
          data: {
            ...data,
            createTime: db.serverDate()
          }
        })

    promise
      .then(() => {
        wx.showToast({ title: '保存成功' })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      })
      .catch(err => {
        console.error('保存失败：', err)
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      })
      .finally(() => {
        this.setData({ isSubmitting: false })
      })
  }
})