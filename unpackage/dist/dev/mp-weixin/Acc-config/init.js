"use strict";
const common_vendor = require("../common/vendor.js");
let inIt = function() {
  return new Promise(async (resolve, reject) => {
    var res = new common_vendor.wx$1.cloud.Cloud({
      //用户端 AppID
      resourceAppid: "wxd3af48f8163d0a51",
      //用户端环境 ID
      resourceEnv: "dessert-user-2gv61nata72c4681"
    });
    await res.init();
    await res.callFunction({
      name: "cloudbase_auth",
      data: {}
    });
    resolve(res);
  });
};
exports.inIt = inIt;
