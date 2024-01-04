"use strict";
const common_vendor = require("../common/vendor.js");
class Feedback {
  constructor(title, icon = "error") {
    this.title = title;
    this.icon = icon;
  }
  //消息提示框
  toast() {
    common_vendor.wx$1.showToast({
      title: this.title,
      icon: this.icon,
      mask: true,
      duration: 800
    });
  }
}
class Upload {
  constructor() {
  }
  // 上传本地图片
  image(count = 1, type = "image") {
    return new Promise((resolve, reject) => {
      common_vendor.wx$1.chooseMedia({
        count,
        mediaType: [type],
        sourceType: ["album"]
      }).then((res) => {
        resolve(res.tempFiles);
      }).catch((err) => {
        reject(err);
      });
    });
  }
  // 上传图片或者视频到云存储
  async cloud(route) {
    let imgion = route.lastIndexOf(".");
    route.slice(imgion);
    return new Promise((resolve, reject) => {
    });
  }
}
exports.Feedback = Feedback;
exports.Upload = Upload;
