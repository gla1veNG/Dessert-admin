"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "specs",
  setup(__props) {
    const show = common_vendor.ref(false);
    const sku_data = common_vendor.reactive({
      sku: [{ title: 1, att_data: [], price: "", stock: "", image: "" }]
    });
    const Sto_att = common_vendor.reactive({
      attobj: [{ att: "", title: 1 }, { att: "", title: 2 }, { att: "", title: 3 }]
    });
    const attribute = common_vendor.reactive({ selected: [] });
    function subMit() {
      const filter = Sto_att.attobj.filter((item) => item.att != "");
      const new_arr = [];
      filter.forEach((item) => {
        new_arr.push({ att: item.att, name: item.att, checked: true });
      });
      attribute.selected = JSON.parse(JSON.stringify(new_arr));
      show.value = false;
      calsku();
    }
    let new_att = [];
    function calsku() {
      let filter_arr = attribute.selected.filter((item) => item.checked);
      new_att = filter_arr.map((item) => {
        return { att_name: item.att, att_val: "" };
      });
      sku_data.sku.forEach((item) => {
        item.att_data = JSON.parse(JSON.stringify(new_att));
      });
    }
    function newSpecs() {
      let last_sku = sku_data.sku[sku_data.sku.length - 1];
      let last_sku_title = last_sku.title;
      last_sku_title++;
      const new_sku = { title: last_sku_title, att_data: [], price: "", stock: "", image: "" };
      last_sku.att_data = JSON.parse(JSON.stringify(new_att));
      sku_data.sku.push(new_sku);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => show.value = true),
        b: common_vendor.f(attribute.selected, (item, index, i0) => {
          return {
            a: item.att,
            b: item.checked,
            c: common_vendor.t(item.name),
            d: index
          };
        }),
        c: common_vendor.f(sku_data.sku, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title)
          }, sku_data.sku.length > 1 ? {} : {}, {
            b: item.att_data.length > 0
          }, item.att_data.length > 0 ? {
            c: common_vendor.f(item.att_data, (item_add, index_add, i1) => {
              return {
                a: common_vendor.t(item_add.att_name),
                b: "请输入" + item_add.att_name,
                c: item_add.add_val,
                d: common_vendor.o(($event) => item_add.add_val = $event.detail.value, index_add),
                e: index_add
              };
            })
          } : {}, {
            d: item.price,
            e: common_vendor.o(($event) => item.price = $event.detail.value, index),
            f: item.stock,
            g: common_vendor.o(($event) => item.stock = $event.detail.value, index),
            h: item.image === ""
          }, item.image === "" ? {} : {
            i: item.image
          }, {
            j: item.image != ""
          }, item.image != "" ? {} : {}, {
            k: index
          });
        }),
        d: sku_data.sku.length > 1,
        e: common_vendor.o(newSpecs),
        f: common_vendor.o(($event) => show.value = false),
        g: common_vendor.o(subMit),
        h: common_vendor.f(Sto_att.attobj, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.att,
            c: common_vendor.o(($event) => item.att = $event.detail.value, index),
            d: index
          };
        }),
        i: show.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-admin/pages/specs/specs.vue"]]);
wx.createPage(MiniProgramPage);
