"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_init = require("../../Acc-config/init.js");
const AccConfig_media = require("../../Acc-config/media.js");
const _sfc_main = {
  __name: "banner",
  setup(__props) {
    const show = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      getBannner();
    });
    const data = common_vendor.reactive({
      banner_data: [],
      banner_cover: ""
    });
    const { banner_data, banner_cover } = common_vendor.toRefs(data);
    async function getBannner() {
      let DB = await AccConfig_init.inIt();
      let res = await DB.database().collection("banner").get();
      data.banner_data = res.data;
    }
    async function upImage() {
      const local = await new AccConfig_media.Upload().image();
      common_vendor.wx$1.showLoading({ title: "正在上传", mask: true });
      const res = await new AccConfig_media.Upload().cloud(local[0].tempFilePath);
      data.banner_cover = res;
      common_vendor.wx$1.hideLoading();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(banner_data).length > 0
      }, common_vendor.unref(banner_data).length > 0 ? {} : {}, {
        b: common_vendor.f(common_vendor.unref(banner_data), (item, index, i0) => {
          return {
            a: item.banner_cover,
            b: index
          };
        }),
        c: common_vendor.unref(banner_data).length === 0
      }, common_vendor.unref(banner_data).length === 0 ? {} : {}, {
        d: common_vendor.o(($event) => show.value = true),
        e: common_vendor.o(($event) => show.value = false),
        f: common_vendor.unref(banner_cover) === ""
      }, common_vendor.unref(banner_cover) === "" ? {
        g: common_vendor.o(upImage)
      } : {}, {
        h: common_vendor.unref(banner_cover),
        i: common_vendor.unref(banner_cover) != ""
      }, common_vendor.unref(banner_cover) != "" ? {
        j: common_vendor.o(($event) => banner_cover.value = "")
      } : {}, {
        k: show.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-beaa2a87"], ["__file", "E:/Dessert/Dessert-admin/pages/banner-admin/banner.vue"]]);
wx.createPage(MiniProgramPage);
