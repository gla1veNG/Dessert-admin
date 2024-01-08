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
				<text @click="subMit">提交</text>
			</view>
			<view class="upload-cover">
				<image src="/static/detail/miaosha-img.jpg" mode="aspectFill" v-if="banner_cover === ''" @click="upImage"></image>
				<image :src="banner_cover" mode="aspectFill"></image>
				<image src="/static/detail/shanchu-goods.svg" mode="widthFix" v-if="banner_cover != ''" @click="banner_cover = ''"></image>
			</view>
			<view class="relation relation-back" @click="addTo">
				<text>关联商品</text>
				<text class="over-text">{{re_goods.title === '' ? '添加' : re_goods.title}}</text>
			</view>
		</view>
	</page-container>
</template>

<script setup>
	import {ref,onMounted,reactive,toRefs,watch} from 'vue'
	import {inIt} from '@/Acc-config/init.js'
	function onEnter(){}
	
	const show = ref(false);
	
	onMounted(()=>{
		getBannner();
	})
	
	const data = reactive({
		banner_data:[],
		banner_cover:'',
		re_goods:{
			title:'',
			goods_id:'',
			video_url:''
		}
		
	})
	
	const {banner_data,banner_cover,re_goods} = toRefs(data);
	
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
	//去选择关联商品
	function addTo(){
		wx.navigateTo({
			url:'/pages/goods-list/list'
		})
	}
	//监听关联商品
	import {select_goods} from '@/Acc-config/answer.js'
	watch(select_goods,(newVal,oldVal)=>{
		data.re_goods.title = newVal.goods_title;
		data.re_goods.goods_id = newVal.goods_id;
		data.re_goods.video_url = newVal.video_url;
	})
	//提交关联商品到数据库的校验
	function subMit(){
		switch(true){
			case data.banner_cover === '' : new Feedback('请上传封面图').toast()
			break;
			
			case data.re_goods.title === '' : new Feedback('请关联一个商品').toast()
			break;
			
			default: database();
		}
	}
	//提交关联商品到数据库
	async function database(){
		let obj = {banner_cover:data.banner_cover,goods_id:data.re_goods.goods_id,video_url:data.re_goods.video_url};
		try{
			let DB = await inIt();
			await DB.database().collection('banner').add({data:obj});
			getBannner();
		}catch(e){
			console.log(e);
		}
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