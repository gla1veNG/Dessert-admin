import moment from 'moment'
moment.locale('zh-cn');
import {date} from '@/Acc-config/date.js'


let current = ()=>{
	/*进入页面获取当前的年月日*/
	const C_year = moment().format('YYYY');//当前年
	const C_month = moment().format('MM');//当前月
	const C_day = moment().format('DD');//当前日
	
	/*获取明年的年月日*/
	const N_year = moment().add(1,'year').format('YYYY');
	
	/*获取今年和明年*/
	date[0] = [{time:C_year,name:C_year + '年'},{time:N_year,name:N_year + '年'}]
	
	/*获取从当年月开始计算：本月到12月*/
	for(let i = C_month; i<= 12;i++){
		date[1].push({time:Number(i),name:i + '月'})
	}
	/*获取今年每个月天数：当前月开始计算*/
	const Days = moment(C_year + '/' + C_month,'YYYY/MM').daysInMonth()//算出当前月的天数
	for(let i = C_day;i<= Days;i++){
		date[2].push({time:Number(i),name:i + '日'});
	}
}
//计算滚动时得到某年某月的天数
let days = (years)=>{
	const C_year = moment().format('YYYY');//当前年
	const C_month = moment().format('MM');//当前月
	const C_day = moment().format('DD');//当前日
	//如果在当前年月，那么 日 就从今天算起
	let INIT = years[0].year == C_year && years[0].month == C_month ? C_day : 1;
	
	const new_data = [];
	const Days = moment(years[0].year + '/' + years[0].month,'YYYY/MM').daysInMonth()//算出所选月的天数
	for(let i = Number(INIT);i<= Days;i++){
		new_data.push({time:Number(i),name:i + '日'});
	}
	return 	date.splice(2,1,new_data);
}
export {current,days}