"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_answer = require("../../Acc-config/answer.js");
const AccConfig_media = require("../../Acc-config/media.js");
require("../../Acc-config/init.js");
const _sfc_main = {
  __name: "goods",
  setup(__props) {
    const priceinv = common_vendor.reactive({ price: "", stock: "" });
    const { price, stock } = common_vendor.toRefs(priceinv);
    function juMp() {
      let arr = JSON.stringify(specs.specs_data);
      common_vendor.wx$1.navigateTo({
        url: "/pages/specs/specs?sku=" + arr
      });
    }
    const specs = common_vendor.reactive({ specs_data: [] });
    common_vendor.watch(AccConfig_answer.sku_val, (newVal, oldVal) => {
      specs.specs_data = newVal;
      let SORT = newVal;
      let min_price = SORT.sort((A, B) => {
        return A.price - B.price;
      });
      priceinv.price = min_price[0].price;
      let STOCK = 0;
      newVal.forEach((item) => STOCK += item.stock);
      priceinv.stock = STOCK;
    });
    const cover = common_vendor.reactive({ goods_title: "", sto_image: [] });
    async function upImage() {
      const local = await new AccConfig_media.Upload().image(9);
      local.forEach((item) => {
        cover.sto_image.push({ image: item.tempFilePath });
      });
    }
    function deleteImg(index) {
      cover.sto_image.splice(index, 1);
    }
    function preView(image) {
      let arr = [];
      cover.sto_image.forEach((item) => {
        arr.push(item.image);
      });
      new AccConfig_media.Upload().preview(image, arr);
    }
    const video = common_vendor.reactive({ sto_video: "" });
    async function upVideo() {
      const local = await new AccConfig_media.Upload().image(1, "video");
      video.sto_video = local[0].tempFilePath;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: cover.goods_title,
        b: common_vendor.o(($event) => cover.goods_title = $event.detail.value),
        c: cover.sto_image.length > 0
      }, cover.sto_image.length > 0 ? {
        d: common_vendor.f(cover.sto_image, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.o(($event) => preView(item.image), index),
            c: common_vendor.o(($event) => deleteImg(index), index),
            d: index
          };
        })
      } : {}, {
        e: common_vendor.o(upImage),
        f: video.sto_video != ""
      }, video.sto_video != "" ? {} : {}, {
        g: video.sto_video === ""
      }, video.sto_video === "" ? {
        h: common_vendor.o(upVideo)
      } : {}, {
        i: video.sto_video != ""
      }, video.sto_video != "" ? {
        j: video.sto_video
      } : {}, {
        k: specs.specs_data.length > 0 ? true : false,
        l: common_vendor.unref(price),
        m: common_vendor.o(($event) => common_vendor.isRef(price) ? price.value = $event.detail.value : null),
        n: specs.specs_data.length > 0 ? true : false,
        o: common_vendor.unref(stock),
        p: common_vendor.o(($event) => common_vendor.isRef(stock) ? stock.value = $event.detail.value : null),
        q: specs.specs_data.length === 0
      }, specs.specs_data.length === 0 ? {} : {}, {
        r: specs.specs_data.length > 0
      }, specs.specs_data.length > 0 ? {
        s: common_vendor.f(specs.specs_data, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.f(item.att_data, (item_S, index_S, i1) => {
              return {
                a: common_vendor.t(item_S.att_val),
                b: index_S
              };
            }),
            c: common_vendor.t(item.stock),
            d: common_vendor.t(item.price),
            e: index
          };
        })
      } : {}, {
        t: common_vendor.o(juMp)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-admin/pages/goods-admin/goods.vue"]]);
wx.createPage(MiniProgramPage);
