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
let days = (years) => {
  const C_year = common_vendor.hooks().format("YYYY");
  const C_month = common_vendor.hooks().format("MM");
  const C_day = common_vendor.hooks().format("DD");
  let INIT = years[0].year == C_year && years[0].month == C_month ? C_day : 1;
  const new_data = [];
  const Days = common_vendor.hooks(years[0].year + "/" + years[0].month, "YYYY/MM").daysInMonth();
  for (let i = Number(INIT); i <= Days; i++) {
    new_data.push({ time: Number(i), name: i + "日" });
  }
  return AccConfig_date.date.splice(2, 1, new_data);
};
exports.current = current;
exports.days = days;
