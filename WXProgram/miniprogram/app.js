// app.js

/**
 * 小程序主应用程序
 * 负责应用的初始化、全局数据管理和用户信息处理
 */
App({
  /**
   * 应用初始化函数
   * 在小程序启动时执行，进行云开发初始化和全局数据设置
   */
  onLaunch: function () {
    // 检查是否支持云开发能力
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      // 初始化云开发环境
      wx.cloud.init({
        env: '', // 使用默认环境
        traceUser: true  // 是否记录用户访问记录，用于统计分析
      })
    }

    // 初始化全局数据
    this.globalData = {
      userInfo: null,      // 用户信息对象
      isAuthenticated: false  // 用户是否已认证
    }
  },

  /**
   * 获取用户信息
   * @param {Function} cb - 获取用户信息后的回调函数
   */
  getUserInfo: function(cb) {
    const that = this
    // 如果已经有用户信息，直接返回
    if (this.globalData.userInfo) {
      typeof cb === 'function' && cb(this.globalData.userInfo)
    } else {
      // 调用微信接口获取用户信息
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success: (res) => {
          that.globalData.userInfo = res.userInfo
          that.globalData.isAuthenticated = true
          typeof cb === 'function' && cb(res.userInfo)
        },
        fail: (err) => {
          console.error('获取用户信息失败：', err)
        }
      })
    }
  }
})