var app = getApp();
var common = require('../../common/js/common.js');
var config = require('../../common/js/config.js');
var fly = require('../../common/js/flyio');

Page({
  data: {
    url: config.url,
    imgUrl: config.imgUrl,
    web_type: ['企业官网', '品牌网站', '外贸网站', '营销型网站', '电商网站', '多语言版本网站', '微官网', '小程序官网', '宣传推广页', '… …'],
    web_end: ['PC端', '手机（浏览器）端', 'IPAD（浏览器）端', '微信公众号', '微信小程序', 'APP(android端、iOS端)']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})