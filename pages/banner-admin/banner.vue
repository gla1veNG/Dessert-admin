<template>
	<view class="sort-Header sort-position" v-if="banner_data.length > 0">
		<text>横幅图片</text>
		<text>操作</text>
	</view>
	<view style="height: 90rpx;"></view>
	<view class="sort-Header sort-table" v-for="(item,index) in banner_data" :key="index">
		<image :src="item.banner_cover" mode="aspectFill"></image>
		<text class="sort-but">删除</text>
	</view>
	<!-- 没有数据的提示 -->
	<view class="Tips" v-if="banner_data.length === 0">目前没有任何横幅数据</view>
	<!-- 底部 -->
	<view style="height:300rpx;"></view>
	<view class="newly-added-view">
		<view class="newly-added" @click="show = true">新增横幅</view>
	</view>
	<!-- 弹窗 -->
	<page-container :show="show" position="bottom" bindenter="onEnter">
		<view class="space-view">
			<view class="modify-sub modify-padding">
				<image src="/static/detail/guanbi.svg" mode="widthFix" @click="show = false"></image>
				<text>新增横幅</text>
				<text>提交</text>
			</view>
			<view class="upload-cover">
				<image src="/static/detail/miaosha-img.jpg" mode="aspectFill" v-if="banner_cover === ''" @click="upImage"></image>
				<image :src="banner_cover" mode="aspectFill"></image>
				<image src="/static/detail/shanchu-goods.svg" mode="widthFix" v-if="banner_cover != ''" @click="banner_cover = ''"></image>
			</view>
			<view class="relation relation-back">
				<text>关联商品</text>
				<text class="over-text">添加</text>
			</view>
		</view>
	</page-container>
</template>

<script setup>
	import {ref,onMounted,reactive,toRefs} from 'vue'
	import {inIt} from '@/Acc-config/init.js'
	function onEnter(){}
	
	const show = ref(false);
	
	onMounted(()=>{
		getBannner();
	})
	
	const data = reactive({
		banner_data:[],
		banner_cover:''
		
	})
	
	const {banner_data,banner_cover} = toRefs(data);
	
	//获取数据
	async function getBannner(){
		let DB = await inIt();
		let res = await DB.database().collection('banner').get();
		data.banner_data = res.data;
	}
	//上传轮播图
	import {Feedback,Upload} from '@/Acc-config/media.js'
	async function upImage(){
		const local = await new Upload().image();
		wx.showLoading({title:'正在上传',mask:true});
		const res = await new Upload().cloud(local[0].tempFilePath);
		data.banner_cover = res;
		wx.hideLoading();
		
	} 
</script>

<style scoped>
.modify-padding{
	padding-bottom: 60rpx !important;
}
.upload-cover{
	position: relative;
}
.upload-cover image:nth-child(1){
	width: 100%;
	height: 380rpx;
	display: block;
}
.upload-cover image:nth-child(2){
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	top: 6rpx;
	right: 6rpx;
}
.relation-back{
	background-color: #f7f7f7 !important;
	color: #000000 !important;
}
.over-text{
	color: #ed6b51 !important;
}
</style>