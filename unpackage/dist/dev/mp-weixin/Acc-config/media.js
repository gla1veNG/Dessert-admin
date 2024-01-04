"use strict";
const common_vendor = require("../common/vendor.js");
const AccConfig_init = require("./init.js");
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
    let eximg = route.slice(imgion);
    let cloudpath = `${Date.now()}-${Math.floor(Math.random(0, 1) * 1e7)}${eximg}`;
    let DB = await AccConfig_init.inIt();
    return new Promise((resolve, reject) => {
      DB.uploadFile({
        cloudPath: "media/" + cloudpath,
        filePath: route,
        //文件路径
        success: async (res) => {
          const res_url = await DB.getTempFileURL({ fileList: [res.fileID] });
          console.log(res_url);
          resolve(res_url.fileList[0].tempFileURL);
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  }
}
exports.Feedback = Feedback;
exports.Upload = Upload;
