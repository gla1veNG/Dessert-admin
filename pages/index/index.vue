<template>
	<view class="Top-view">
		<view :style=" 'height:' + Custom_height + 'px;' ">
			<view :style=" 'height:' + S_top + 'px;' "></view>
			<view :style=" ['height:' + S_height + 'px;','line-height:' + S_height + 'px;', 'padding-left:' + '16px;'] ">Dessert Oasis</view>
		</view>
		<!-- 订单收益板块 -->
		<view class="profit-view" :style=" 'top:' + Pro_height + 'px;'">
			<view class="profit-num">
				<text>累计收益(￥)</text>
				<text>3</text>
			</view>
			<view class="profit-sale">
				<view>
					<text>今日销售额</text>
					<text>20</text>
				</view>
				<view>
					<text>今日订单数</text>
					<text>20</text>
				</view>
				<view>
					<text>累计订单数</text>
					<text>40</text>
				</view>
			</view>
		</view>
	</view>
	<!-- 九宫格 -->
	<view class="Gong-ge" :style=" 'top:' + Profit_top + 'px;' ">
		<view v-for="(item,index) in plate" :key="index">
			<image :src="item.image" mode="aspectFit"></image>
			<text>{{item.name}}</text>
		</view>
	</view>
</template>

<script setup>
	import {onMounted,reactive, toRefs} from 'vue'
	//存储胶囊按钮位置数据
	const search_data = reactive({
		S_height:0,//胶囊按钮高度
		S_top:0,//胶囊按钮距离顶部高度
		Custom_height:0,//上两个的和
		Pro_height:0,//订单收益板块距离手机顶部的高度
		Profit_top:0,//九宫格距离手机顶部高度
		//九宫格的数据
		plate:[
			{
				image:'/static/detail/hengfu.svg',
				name:'横幅管理'
			},
			{
				image:'/static/detail/miaosha.svg',
				name:'秒杀管理'
			},
			{
				image:'/static/detail/shangpin.svg',
				name:'商品管理'
			},
			{
				image:'/static/detail/dingdan.svg',
				name:'订单管理'
			},
			{
				image:'/static/detail/fenlei.svg',
				name:'分类管理'
			},
		]
	})
	
	const {S_height,S_top,Custom_height,Pro_height,Profit_top,plate} = toRefs(search_data)
	onMounted(()=>{
		capSule(),
		proFit()
	})
	//获取胶囊按钮位置
	function capSule(){
		const but_data = wx.getMenuButtonBoundingClientRect();
		search_data.S_top = but_data.top;
		search_data.S_height = but_data.height;
		search_data.Custom_height = but_data.height + but_data.top;
		search_data.Pro_height = but_data.height + but_data.top + 20;
	}
	// 计算收益板块的高度
	function proFit(){
		const query = wx.createSelectorQuery()
		query.select('.profit-view').boundingClientRect()
		query.exec((res)=>{
			console.log(res);
			search_data.Profit_top = res[0].height + search_data.Pro_height + 10
		})
	}
</script>

<style>
page{background-color: #f4f4f4;}
.Top-view{
	height: 330rpx;
	position: relative;
	background-image: linear-gradient(to top, #9be15d 0%, #00e3ae 100%);
}
.profit-view{
	background-color: #FFFFFF;
	position: absolute;
	left: 20rpx;
	right: 20rpx;
	border-radius: 10rpx;
	padding: 20rpx;
}
.profit-num{
	display: flex;
	flex-direction: column;
	padding-bottom: 10rpx;
}
.profit-num text:nth-child(2){
	font-size: 40rpx;
	padding-top: 10rpx;
}
.profit-sale{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.profit-sale view{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.profit-sale view text:nth-child(1){
	color: #a7a7a7;
	padding-bottom: 10rpx;
}
.profit-sale view text:nth-child(2){
	font-weight: bold;
}
.Gong-ge{
	background-color: #FFFFFF;
	margin: 0 20rpx 20rpx 20rpx;
	border-radius: 10rpx;
	display: flex;
	flex-wrap: wrap;
	position: absolute;
	left: 0;
	right: 0;
	color: #555555;
}
.Gong-ge image{
	width: 55rpx;
	height: 55rpx;
	display: block;
	margin-bottom: 20rpx;
}
.Gong-ge view{
	width: calc(25% - 10rpx*2);
	margin: 20rpx 10rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

</style>
