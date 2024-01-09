"use strict";
const common_vendor = require("../common/vendor.js");
const AccConfig_date = require("./date.js");
common_vendor.hooks.locale("zh-cn");
let current = () => {
  const C_year = common_vendor.hooks().format("YYYY");
  const C_month = common_vendor.hooks().format("MM");
  const C_day = common_vendor.hooks().format("DD");
  const N_year = common_vendor.hooks().add(1, "year").format("YYYY");
  AccConfig_date.date[0] = [{ time: C_year, name: C_year + "年" }, { time: N_year, name: N_year + "年" }];
  for (let i = C_month; i <= 12; i++) {
    AccConfig_date.date[1].push({ time: Number(i), name: i + "月" });
  }
  const Days = common_vendor.hooks(C_year + "/" + C_month, "YYYY/MM").daysInMonth();
  for (let i = C_day; i <= Days; i++) {
    AccConfig_date.date[2].push({ time: Number(i), name: i + "日" });
  }
};
exports.current = current;
