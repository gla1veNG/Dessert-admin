<template>
	<view class="sort-view">
		<!-- 左边 -->
		<view class="sort-left">
			<text v-for="(item,index) in sort" :key="index" :class="{addto:index === num}" @click="seLect(index,item.sort_name,item._id)">{{item.sort_name}}</text>
		</view>
		<!-- 右边 -->
		<view class="sort-right">
			<view class="Commodity" v-for="(item,index) in goods" :key="index">
				<view class="Com-image">
					<image :src="item.goods_cover" mode="aspectFill"></image>
				</view>
				<view class="Com-price">
					<text class="Com-title over-text">{{item.goods_title}}</text>
					<text class="stock-view">库存{{item.stock}}</text>
					<text class="Real-price">{{item.goods_price}}</text>
					<view class="Button-rig">
						<text class="shelf-true" v-if="item.shelves">下架</text>
						<text class="shelf-false" v-else>已下架</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	<view style="height: 100rpx;"></view>
	<!-- 底部 -->
	<view class="manage">
		<text>管理分类</text>
		<text>添加商品</text>
	</view>
</template>

<script setup>
	import {reactive,toRefs} from 'vue'
	import {onShow} from '@dcloudio/uni-app'
	import {inIt} from '@/Acc-config/init.js'
	
	//只要页面跳转一次就会执行
	onShow(()=>{
		gooDs();
	})
	
	const data = reactive({
		sort:[],//分类数据
		goods:[],//商品数据
		num:0,
		sort_name:'',
		sort_id:''
	})
	
	const {sort,goods,num} = toRefs(data)
	//请求数据库数据
	const field_obj = {goods_title:true,goods_cover:true,goods_price:true,stock:true,shelves:true};
	async function gooDs(){
		//请求分类的数据
		let DB = await inIt();
		const _ = DB.database().command;
		const res_sort = await DB.database().collection('goods_sort').where({quantity:_.gt(0)}).field({sort_name:true}).get();
		//请求商品数据
		const res_goods = await DB.database().collection('goods').where({category:res_sort.data[0].sort_name}).limit(10).field(field_obj).get();
		data.sort = res_sort.data;
		data.goods= res_goods.data;
		data.sort_name = res_sort.data[0].sort_name;
		data.sort_id = res_sort.data[0]._id;
	}
	
	//选中分类
	async function seLect(index,sort_name,id){
		data.num = index;
		data.sort_name = sort_name;
		data.sort_id = id;
		let DB = await inIt();
		const res_goods = await DB.database().collection('goods').where({category:sort_name}).limit(10).field(field_obj).get();
		data.goods = res_goods.data;
	}	
</script>

<style scoped>
.sort-view{
	display: flex;
}
.sort-left{
	width: 200rpx;
	text-align: center;
	background-color: #f6f6f6;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
}

.sort-left text{
	display: block;
	color: #5f5f5f;
	padding: 20rpx 0;
	border-bottom: 1px solid #FFFFFF;
	font-size: 28rpx;
}
.addto{
	background-color: antiquewhite;
	font-weight: bold;
}
/* 右边 */
.sort-right{
	margin: 0 20rpx 0 220rpx;
	flex: 1;
}
.Com-image image{
	display: block;
	width: 150rpx;
	height: 150rpx;
	border-radius: 10rpx;
}
.Commodity text{
	display: block;
}
.Commodity{
	display: flex;
	margin-bottom: 50rpx;
}
.Com-price{
	flex: 1;
	padding-left: 20rpx;
}
.Com-price view{
	display: flex;
	justify-content: flex-end;
}
.Com-price view text:nth-child(2){
	margin-left: 50rpx;
}
.Com-title{
	font-weight: bold;
}
.stock-view{
	padding: 10rpx 0;
	color: #c1c1c1;
	font-size: 26rpx;
}
.Real-price{
	color: #b1865b;
	font-weight: bold;
}
.Button-rig{
	padding-top: 20rpx;
}
.Button-rig text{
	border-radius: 7rpx;
	padding: 7rpx 20rpx;
	font-size: 26rpx;
}
.shelf-true{
	color: #FFFFFF;
	background-color: #E64340;
}
.shelf-false{
	background-color: #F8F8F8;
	color: rgba(0, 0, 0, 0.2);
}
/* 底部 */
.manage{
	position: fixed;
	bottom: 0;
	right: 0;
	left: 200rpx;
	display: flex;
	justify-content: space-between;
}
.manage text{
	width: 50%;
	text-align: center;
	padding: 20rpx 0;
}
.manage text:nth-child(1){
	background-color: antiquewhite;
}
.manage text:nth-child(2){
	background-color: aliceblue;
}
</style>