"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_init = require("../../Acc-config/init.js");
const AccConfig_date = require("../../Acc-config/date.js");
const AccConfig_caTime = require("../../Acc-config/ca-time.js");
const AccConfig_media = require("../../Acc-config/media.js");
const _sfc_main = {
  __name: "seckill",
  setup(__props) {
    AccConfig_caTime.current();
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
      multiArray: AccConfig_date.date,
      //多列选择器数据
      muleiIndex: [0, 0, 0, 0, 0],
      //value 每一项的值
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
      },
      years: [{ "year": AccConfig_date.date[0][0].time, "month": AccConfig_date.date[1][0].time }],
      ban: false
      //判断设置的秒杀时间是否正确
    });
    async function upImage() {
      const local = await new AccConfig_media.Upload().image();
      common_vendor.wx$1.showLoading({ title: "正在上传", mask: true });
      const res = await new AccConfig_media.Upload().cloud(local[0].tempFilePath);
      Time.se_cover = res;
      common_vendor.wx$1.hideLoading();
    }
    function colStart(event) {
      const RES = event.detail;
      shAre(RES);
    }
    function colEnd(event) {
      const RES = event.detail;
      shAre(RES);
    }
    function shAre(RES) {
      if (RES.column === 0) {
        if (RES.value === 0) {
          Time.years[0].year = AccConfig_date.date[0][0].time;
        } else if (RES.value === 1) {
          Time.years[0].year = AccConfig_date.date[0][1].time;
        }
      } else if (RES.column === 1) {
        Time.years[0].month = AccConfig_date.date[RES.column][RES.value].time;
      }
      if (RES.column === 0 || RES.column === 1) {
        AccConfig_caTime.days(Time.years);
        Time.multiArray[2] = AccConfig_caTime.days(Time.years)[0];
      }
    }
    function changeStart(e) {
      const RES = e.detail.value;
      conFirm(RES, "start");
    }
    function changeEnd(e) {
      const RES = e.detail.value;
      conFirm(RES, "end");
    }
    function conFirm(RES, val) {
      const year = AccConfig_date.date[0][RES[0]].time;
      const month = AccConfig_date.date[1][RES[1]].time;
      const day = AccConfig_date.date[2][RES[2]].time;
      const time = AccConfig_date.date[3][RES[3]].time;
      const minute = AccConfig_date.date[4][RES[4]].time;
      const sele_res = year + "/" + month + "/" + day + " " + time + ":" + minute + ":00";
      if (val === "start") {
        Time.start = sele_res;
      } else {
        Time.end = sele_res;
      }
    }
    common_vendor.hooks.locale("zh-cn");
    common_vendor.watch([() => Time.start, () => Time.end], (newVal, oldVal) => {
      console.log(newVal);
      if (newVal[0] != "" && newVal[1] != "") {
        const start = common_vendor.hooks(newVal[0], "YYYY/MM/DD hh:mm:ss").unix();
        const end = common_vendor.hooks(newVal[1], "YYYY/MM/DD hh:mm:ss").unix();
        if (start >= end) {
          Time.end = "结束时间早于开始时间";
          Time.ban = false;
        } else if (start < end) {
          Time.ban = true;
        }
      }
    });
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
        k: Time.se_title,
        l: common_vendor.o(($event) => Time.se_title = $event.detail.value),
        m: Time.se_price,
        n: common_vendor.o(($event) => Time.se_price = $event.detail.value),
        o: common_vendor.t(Time.start),
        p: Time.multiArray,
        q: Time.muleiIndex,
        r: common_vendor.o(colStart),
        s: common_vendor.o(changeStart),
        t: common_vendor.t(Time.end),
        v: Time.multiArray,
        w: Time.muleiIndex,
        x: common_vendor.o(colEnd),
        y: common_vendor.o(changeEnd),
        z: common_vendor.o((...args) => _ctx.addTo && _ctx.addTo(...args)),
        A: show.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3d30ce32"], ["__file", "E:/Dessert/Dessert-admin/pages/seckill-admin/seckill.vue"]]);
wx.createPage(MiniProgramPage);
