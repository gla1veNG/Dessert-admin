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
exports.Feedback = Feedback;
