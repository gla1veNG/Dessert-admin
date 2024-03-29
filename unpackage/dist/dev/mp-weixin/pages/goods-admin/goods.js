"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_answer = require("../../Acc-config/answer.js");
const AccConfig_media = require("../../Acc-config/media.js");
const AccConfig_init = require("../../Acc-config/init.js");
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
    common_vendor.onMounted(async () => {
      let DB = await AccConfig_init.inIt();
      const res = await DB.database().collection("goods_sort").field({ _openid: false }).get();
      sortdata.sortArray = res.data;
    });
    const sortdata = common_vendor.reactive({
      sortArray: [],
      sort_value: "",
      sort_id: ""
      //分类的id，用于提交数据时对选中的分类下的quantity++
    });
    const { sortArray, sort_value } = common_vendor.toRefs(sortdata);
    function changeEnd(e) {
      sortdata.sort_value = sortdata.sortArray[e.detail.value].sort_name;
      sortdata.sort_id = sortdata.sortArray[e.detail.value]._id;
    }
    const detail = common_vendor.reactive({ sto_detail: [] });
    async function upDetail() {
      const local = await new AccConfig_media.Upload().image(9);
      local.forEach((item) => {
        detail.sto_detail.push({ image: item.tempFilePath });
      });
    }
    function deleteDeta(index) {
      detail.sto_detail.splice(index, 1);
    }
    function previewDeta(image) {
      let arr = [];
      detail.sto_detail.forEach((item) => {
        arr.push(item.image);
      });
      new AccConfig_media.Upload().preview(image, arr);
    }
    function subMit() {
      switch (true) {
        case cover.goods_title == "":
          new AccConfig_media.Feedback("请填写标题").toast();
          break;
        case cover.sto_image.length == 0:
          new AccConfig_media.Feedback("请上传图片").toast();
          break;
        case sortdata.sort_value == "":
          new AccConfig_media.Feedback("请选择分类").toast();
          break;
        case priceinv.price == "":
          new AccConfig_media.Feedback("请输入价格").toast();
          break;
        case priceinv.stock == "":
          new AccConfig_media.Feedback("请输入库存").toast();
          break;
        case detail.sto_detail.length == 0:
          new AccConfig_media.Feedback("请上传详情图").toast();
          break;
        default:
          database();
      }
    }
    async function database() {
      common_vendor.wx$1.showLoading({ title: "上传中", mask: true });
      let res_banner = await new AccConfig_media.Upload().multi(cover.sto_image, "image");
      let res_detail = await new AccConfig_media.Upload().multi(detail.sto_detail, "image");
      let res_video = video.sto_video == "" ? "" : await new AccConfig_media.Upload().cloud(video.sto_video);
      let obj = {
        goods_title: cover.goods_title,
        goods_banner: res_banner,
        goods_cover: res_banner[0].image,
        video_url: res_video,
        category: sortdata.sort_value,
        goods_price: Number(priceinv.price),
        stock: Number(priceinv.stock),
        sku: specs.specs_data.length == 0 ? false : true,
        goods_details: res_detail,
        sold: 0,
        shelves: true,
        seckill: false
      };
      try {
        let DB = await AccConfig_init.inIt();
        const res = await DB.database().collection("goods").add({ data: obj });
        if (specs.specs_data.length > 0) {
          await DB.database().collection("sku_data").add({ data: { sku_id: res._id, sku: specs.specs_data } });
        }
        const _ = DB.database().command;
        await DB.database().collection("goods_sort").doc(sortdata.sort_id).update({ data: { quantity: _.inc(1) } });
        new AccConfig_media.Feedback("上传成功", "success").toast();
      } catch (e) {
        console.log(e);
        new AccConfig_media.Feedback("提交失败").toast();
      }
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
      }, video.sto_video != "" ? {
        g: common_vendor.o(($event) => video.sto_video = "")
      } : {}, {
        h: video.sto_video == ""
      }, video.sto_video == "" ? {
        i: common_vendor.o(upVideo)
      } : {}, {
        j: video.sto_video != ""
      }, video.sto_video != "" ? {
        k: video.sto_video
      } : {}, {
        l: common_vendor.t(common_vendor.unref(sort_value)),
        m: common_vendor.unref(sortArray),
        n: common_vendor.o(changeEnd),
        o: specs.specs_data.length > 0 ? true : false,
        p: common_vendor.unref(price),
        q: common_vendor.o(($event) => common_vendor.isRef(price) ? price.value = $event.detail.value : null),
        r: specs.specs_data.length > 0 ? true : false,
        s: common_vendor.unref(stock),
        t: common_vendor.o(($event) => common_vendor.isRef(stock) ? stock.value = $event.detail.value : null),
        v: specs.specs_data.length == 0
      }, specs.specs_data.length == 0 ? {} : {}, {
        w: specs.specs_data.length > 0
      }, specs.specs_data.length > 0 ? {
        x: common_vendor.f(specs.specs_data, (item, index, i0) => {
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
        y: common_vendor.o(juMp),
        z: detail.sto_detail.length > 0
      }, detail.sto_detail.length > 0 ? {
        A: common_vendor.f(detail.sto_detail, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.o(($event) => previewDeta(item.image), index),
            c: common_vendor.o(($event) => deleteDeta(index), index),
            d: index
          };
        })
      } : {}, {
        B: common_vendor.o(upDetail),
        C: common_vendor.o(subMit)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-admin/pages/goods-admin/goods.vue"]]);
wx.createPage(MiniProgramPage);
