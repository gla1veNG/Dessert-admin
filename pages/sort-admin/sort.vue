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
	<page-container :show="true" position="bottom" bindenter="onEnter">
		<view style="height: 900rpx;">111</view>
	</sort-Header >
	<!-- 底部新增分类按钮 -->
	<view style="height: 300rpx;"></view>
	<view class="newly-added-view">
		<view class="newly-added">新增分类</view>
	</view>
</template>

<script setup>
	function onEnter(e){
		console.log(e);
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