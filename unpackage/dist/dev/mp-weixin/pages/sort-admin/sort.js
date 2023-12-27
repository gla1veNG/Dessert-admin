"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_init = require("../../Acc-config/init.js");
const AccConfig_media = require("../../Acc-config/media.js");
const _sfc_main = {
  __name: "sort",
  setup(__props) {
    const show = common_vendor.ref(false);
    const data = common_vendor.reactive({ sort: [], sort_name: "" });
    const { sort, sort_name } = common_vendor.toRefs(data);
    common_vendor.onMounted(() => {
      getsort(), subMit();
    });
    async function getsort() {
      let DB = await AccConfig_init.inIt();
      const res = await DB.database().collection("goods_sort").limit(10).get();
      console.log(res);
      data.sort = res.data;
    }
    function subMit() {
      if (data.sort_name === "") {
        new AccConfig_media.Feedback("输入分类不能为空", "none").toast();
        return false;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(sort).length > 0
      }, common_vendor.unref(sort).length > 0 ? {} : {}, {
        b: common_vendor.f(common_vendor.unref(sort), (item, index, i0) => {
          return {
            a: common_vendor.t(item.sort_name),
            b: index
          };
        }),
        c: common_vendor.unref(sort).length === 0
      }, common_vendor.unref(sort).length === 0 ? {} : {}, {
        d: common_vendor.o(($event) => show.value = false),
        e: common_vendor.unref(sort_name),
        f: common_vendor.o(($event) => common_vendor.isRef(sort_name) ? sort_name.value = $event.detail.value : null),
        g: common_vendor.o(subMit),
        h: show.value,
        i: common_vendor.o(($event) => show.value = true)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a8b65ec7"], ["__file", "E:/Dessert/Dessert-admin/pages/sort-admin/sort.vue"]]);
wx.createPage(MiniProgramPage);
