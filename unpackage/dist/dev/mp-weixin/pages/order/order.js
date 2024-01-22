"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_init = require("../../Acc-config/init.js");
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const data = common_vendor.reactive({
      tab: [
        {
          name: "待付款",
          query: { pay_success: "not_pay" }
        },
        {
          name: "待发货",
          query: { pay_success: "success", deliver: "stay" }
        },
        {
          name: "已发货",
          query: { pay_success: "success", deliver: "already" }
        },
        {
          name: "退款/售后",
          query: {}
        }
      ]
    });
    const { tab } = common_vendor.toRefs(data);
    const re = common_vendor.ref(0);
    function swItch(index, query) {
      re.value = index;
      page_n.value = 0;
      res_order.order_data = [];
      getOrder(0, query);
    }
    common_vendor.onLoad(async () => {
      let DB = await AccConfig_init.inIt();
      const _ = DB.database().command;
      data.tab[3].query = { pay_success: "success", deliver: _.or("ref_pro", "ref_succ") };
      getOrder(0, data.tab[0].query);
    });
    const res_order = common_vendor.reactive({ order_data: [] });
    const { order_data } = common_vendor.toRefs(res_order);
    async function getOrder(sk = 0, query) {
      let DB = await AccConfig_init.inIt();
      const BASE = DB.database();
      const res = await BASE.collection("order_data").where(query).limit(10).skip(sk).get();
      res_order.order_data = [...res_order.order_data, ...res.data];
    }
    let loading = common_vendor.ref(false);
    let page_n = common_vendor.ref(0);
    common_vendor.onReachBottom(async () => {
      loading.value = true;
      page_n.value++;
      let sk = page_n.value * 10;
      await getOrder(sk, data.tab[re.value].query);
      loading.value = false;
    });
    const waybill = common_vendor.ref(false);
    const deliver_id = common_vendor.ref("");
    const deliver_index = common_vendor.ref(0);
    const deliver_on = common_vendor.ref("");
    async function deLiver() {
      if (deliver_on.value.split(" ").join("").length === 0)
        return false;
      waybill.value = false;
      common_vendor.wx$1.showLoading({ title: "发货中", mask: true });
      let DB = await AccConfig_init.inIt();
      const BASE = DB.database();
      await BASE.collection("order_data").doc(deliver_id.value).update({
        data: { deliver: "already", waybill_No: deliver_on.value }
      });
      res_order.order_data.splice(deliver_index.value, 1);
      common_vendor.wx$1.hideLoading();
      deliver_on.value = "";
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(tab), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index == re.value ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => swItch(index, item.query), index)
          };
        }),
        b: common_vendor.f(common_vendor.unref(order_data), (item, index, i0) => {
          return common_vendor.e({
            a: item.goods_image,
            b: common_vendor.t(item.goods_title),
            c: item.specs.length > 0
          }, item.specs.length > 0 ? {
            d: common_vendor.t(item.att_val)
          } : {}, {
            e: common_vendor.t(item.goods_price),
            f: common_vendor.t(item.buy_amount),
            g: common_vendor.t(item.subtotal),
            h: item.pay_success === "not_pay"
          }, item.pay_success === "not_pay" ? {} : {}, {
            i: item.pay_success === "success"
          }, item.pay_success === "success" ? common_vendor.e({
            j: item.deliver === "stay"
          }, item.deliver === "stay" ? {
            k: common_vendor.o(($event) => (waybill.value = true, deliver_id.value = item._id, deliver_index.value = index), index)
          } : {}, {
            l: item.deliver === "already"
          }, item.deliver === "already" ? {} : {}, {
            m: item.deliver === "ref_pro"
          }, item.deliver === "ref_pro" ? {
            n: common_vendor.o(($event) => _ctx.reFund(index, item.out_trade_no, item.subtotal, item._id), index)
          } : {}, {
            o: item.deliver === "ref_succ"
          }, item.deliver === "ref_succ" ? {} : {}) : {}, {
            p: index
          });
        }),
        c: common_vendor.unref(order_data).length === 0
      }, common_vendor.unref(order_data).length === 0 ? {} : {}, {
        d: waybill.value
      }, waybill.value ? {
        e: deliver_on.value,
        f: common_vendor.o(($event) => deliver_on.value = $event.detail.value),
        g: common_vendor.o(($event) => (waybill.value = false, deliver_on.value = "")),
        h: common_vendor.o(deLiver)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-admin/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
