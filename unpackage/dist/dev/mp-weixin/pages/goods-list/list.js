"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_init = require("../../Acc-config/init.js");
if (!Math) {
  Loading();
}
const Loading = () => "../public-view/loading.js";
const _sfc_main = {
  __name: "list",
  setup(__props) {
    common_vendor.onMounted(() => {
      goods();
    });
    const data = common_vendor.reactive({
      list: []
    });
    let obj = { goods_title: true, goods_cover: true, goods_price: true, video_ur: true, seckill: true };
    async function goods() {
      let DB = await AccConfig_init.inIt();
      const res = await DB.database().collection("goods").where({ shelves: true }).limit(10).field(obj).get();
      data.list = res.data;
    }
    let page_n = common_vendor.ref(0);
    let loading = common_vendor.ref(false);
    common_vendor.onReachBottom(async () => {
      loading.value = true;
      page_n.value++;
      let sk = page_n.value * 10;
      let DB = await AccConfig_init.inIt();
      const res_goods = await DB.database().collection("goods").where({ shelves: true }).limit(10).skip(sk).field({ obj }).get();
      data.list = [...data.list, ...res_goods.data];
      loading.value = false;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(data.list, (item, index, i0) => {
          return {
            a: item.goods_cover,
            b: common_vendor.t(item.goods_title),
            c: common_vendor.t(item.goods_price),
            d: index
          };
        }),
        b: data.list.length === 0
      }, data.list.length === 0 ? {} : {}, {
        c: common_vendor.unref(loading)
      }, common_vendor.unref(loading) ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d1eee676"], ["__file", "E:/Dessert/Dessert-admin/pages/goods-list/list.vue"]]);
wx.createPage(MiniProgramPage);
