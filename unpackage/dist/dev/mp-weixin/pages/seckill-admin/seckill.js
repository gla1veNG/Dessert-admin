"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_init = require("../../Acc-config/init.js");
const AccConfig_media = require("../../Acc-config/media.js");
const _sfc_main = {
  __name: "seckill",
  setup(__props) {
    common_vendor.onMounted(() => {
      getSeckill();
    });
    const show = common_vendor.ref(false);
    const data = common_vendor.reactive({
      seckill_goods: []
    });
    async function getSeckill() {
      let DB = await AccConfig_init.inIt();
      let res = await DB.database().collection("seckill").get();
      data.seckill_goods = res.data;
    }
    const Time = common_vendor.reactive({
      se_cover: "",
      //封面图
      se_title: "",
      //标题
      se_price: "",
      //秒杀价格
      start: "",
      //开始时间
      end: "",
      //结束时间
      re_goods: {
        title: "",
        //关联的商品标题
        goods_id: "",
        //关联的商品id
        video_url: "",
        //关联的商品短视频
        ori_price: ""
        //关联的商品原价
      }
    });
    async function upImage() {
      const local = await new AccConfig_media.Upload().image();
      common_vendor.wx$1.showLoading({ title: "正在上传", mask: true });
      const res = await new AccConfig_media.Upload().cloud(local[0].tempFilePath);
      Time.se_cover = res;
      common_vendor.wx$1.hideLoading();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: data.seckill_goods.length > 0
      }, data.seckill_goods.length > 0 ? {} : {}, {
        b: common_vendor.f(data.seckill_goods, (item, index, i0) => {
          return {
            a: item.cover,
            b: common_vendor.t(item.title),
            c: index
          };
        }),
        c: data.seckill_goods.length === 0
      }, data.seckill_goods.length === 0 ? {} : {}, {
        d: common_vendor.o(($event) => show.value = true),
        e: common_vendor.o(($event) => show.value = false),
        f: Time.se_cover === ""
      }, Time.se_cover === "" ? {
        g: common_vendor.o(upImage)
      } : {}, {
        h: Time.se_cover,
        i: Time.se_cover != ""
      }, Time.se_cover != "" ? {
        j: common_vendor.o(($event) => Time.se_cover = "")
      } : {}, {
        k: _ctx.se_title,
        l: common_vendor.o(($event) => _ctx.se_title = $event.detail.value),
        m: _ctx.se_price,
        n: common_vendor.o(($event) => _ctx.se_price = $event.detail.value),
        o: common_vendor.o((...args) => _ctx.addTo && _ctx.addTo(...args)),
        p: show.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3d30ce32"], ["__file", "E:/Dessert/Dessert-admin/pages/seckill-admin/seckill.vue"]]);
wx.createPage(MiniProgramPage);
