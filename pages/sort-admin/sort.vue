<template>
	<view class="sort-Header sort-position">
		<text>分类</text>
		<text>操作</text>
	</view>
	<!-- 撑出距离 -->
	<view style="height: 90rpx;"></view>
	<view class="sort-Header sort-table">
		<text class="occupy">膨化食品</text>
		<text class="sort-but">删除</text>
	</view>
	<!-- 弹窗 -->
	<page-container :show="show" position="bottom" bindenter="onEnter" bindclickoverlay="clickoverlay">
		<view class="space-view">
			<view class="modify-sub" @click="show = false">
				<image src="/static/detail/guanbi.svg" mode="widthFix"></image>
			</view>
			<view class="att-input">
				<input type="text" placeholder="请输入分类" placeholder-class="I-style" cursor-spacing="50"/>
			</view>
			<view class="newly-added classif">提交</view>
		</view>
	</page-container>
	<!-- 底部新增分类按钮 -->
	<view style="height: 300rpx;"></view>
	<view class="newly-added-view">
		<view class="newly-added" @click="show = true">新增分类</view>
	</view>
</template>

<script setup>
	function onEnter(e){
		console.log(e);
	}
	function clickoverlay(e){
		console.log(e);
	}
	
	// 控制弹窗弹出
	import {ref,onMounted} from 'vue'
	import {inIt} from '@/Acc-config/init.js'
	
	const show = ref(false);
	
	onMounted(()=>{
		getsort()
	})
 	async function getsort(){
		let DB = await inIt()
		 console.log(DB);
		 let res = await DB.database().collection('men').add({
			 data:{
				 m:1
			 }
		 })
		 console.log(res)
	}
</script>

<style scoped>
.I-style{
	color: #cccccc;
}
.att-input{
	background-color: #f7f7f7;
	padding: 20rpx;
	border-radius: 7rpx;
}
.classif{
	margin: 60rpx 0 !important;
}
.modify-sub{
	padding-bottom: 60rpx !important;
}

</style>