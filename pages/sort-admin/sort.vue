<template>
	<view class="sort-Header sort-position" v-if = "sort.length > 0">
		<text>分类</text>
		<text>操作</text>
	</view>
	<!-- 撑出距离 -->
	<view style="height: 90rpx;"></view>
	<view class="sort-Header sort-table" v-for="(item,index) in sort" :key="index">
		<text class="occupy">{{item.sort_name}}</text>
		<text class="sort-but">删除</text>
	</view>
	<!-- 没有数据的提示 -->
	<view class="Tips" v-if="sort.length === 0">目前没有任何分类数据</view>
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
	import {ref,onMounted,reactive,toRefs} from 'vue'
	import {inIt} from '@/Acc-config/init.js'
	
	const show = ref(false);
	const data = reactive({sort:[]});
	const {sort} = toRefs(data);
	
	onMounted(()=>{
		getsort()
	})
	//请求数据库
 	async function getsort(){
		let DB = await inIt()
		const res = await DB.database().collection('goods_sort').limit(10).get()
		console.log(res);
		data.sort = res.data;
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