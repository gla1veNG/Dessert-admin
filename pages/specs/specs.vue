<template>
	<!-- 顶部 -->
	<view class="attribute">
		<view class="edit">
			<text>请给商品规格设置合适的属性</text>
			<text @click="show = true">编辑</text>
		</view>
		<view class="checkbox">
			<checkbox-group style="display: flex;">
				<label>
					<checkbox color="#e96c56" />口味
				</label>
			</checkbox-group>
		</view>
	</view>
	<!-- 规格生成 -->
	<view class="attribute gener">
		<view class="edit specs-delete">
			<text>规格1</text>
			<text>删除</text>
		</view>
		<view class="edit entry">
			<text>口味</text>
			<input type="text" placeholder="请输入口味" placeholder-class="I-style" cursor-spacing="50" />
		</view>
		<view class="edit entry">
			<text>价格</text>
			<input type="text" placeholder="请输入价格" placeholder-class="I-style" cursor-spacing="50" />
			<text>￥</text>
		</view>
		<view class="edit entry">
			<text>库存</text>
			<input type="text" placeholder="请输入库存" placeholder-class="I-style" cursor-spacing="50" />
			<text>件</text>
		</view>
		<!-- 上传图片 -->
		<view class="specs-image">
			<image src="/static/detail/shuxing-img.png" mode="aspectFill"></image>
			<!-- <image src="/static/detail/026.jpg" mode="aspectFill"></image> -->
			<image class="delete-img" src="/static/detail/shanchu.svg" mode="widthFix"></image>
		</view>
	</view>
	<!-- 添加规格 -->
	<view class="attribute gener new-specs">
		<image src="/static/detail/jiahao.svg" mode="widthFix"></image>
		<text>规格</text>
	</view>
	<!-- 弹窗 -->
	<page-container :show="show" bindenter="onEnter">
		<view class="space-view">
			<view class="modify-sub">
				<image src="/static/detail/guanbi.svg" mode="widthFix" @click="show = false"></image>
				<text>修改属性</text>
				<text>提交</text>
			</view>
			<view class="att-input">
				<text>属性1</text>
				<input type="text" placeholder="输入属性" placeholder-class="I-style" cursor-spacing="50" />
			</view>
		</view>
	</page-container>
</template>

<script setup>
	function onEnter() {}
	
	//控制弹窗弹出
	import {ref} from 'vue'
	const show = ref(false);
</script>

<style>
	page {
		background-color: #ededed;
	}

	.attribute {
		background-color: #f7f7f7;
		margin: 20rpx;
		padding: 20rpx 20rpx 0 20rpx;
		border-radius: 8rpx;
	}

	.edit {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.edit text:nth-child(1) {
		color: #a8a8a8;
	}

	.edit text:nth-child(2) {
		color: #616990;
	}

	.checkbox {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding-top: 20rpx;
	}

	.checkbox label {
		padding: 0 40rpx 20rpx 0;
	}

	/* 规格生成*/
	.gener {
		background-color: #FFFFFF !important;
	}

	.specs-delete text:nth-child(1) {
		color: #333333 !important;
		font-weight: bold;
	}

	.specs-delete {
		padding-bottom: 20rpx;
	}

	.entry {
		padding: 30rpx 0;
		border-bottom: 1rpx solid #f1f1f1;
	}

	.entry text {
		color: #333333 !important;
	}

	.entry text:nth-child(1) {
		flex: 1;
	}

	.entry input {
		padding: 0 20rpx;
		text-align: right;
	}

	.I-style {
		color: #a8a8a8;
	}

	.specs-image {
		display: flex;
		justify-content: space-between;
	}

	.specs-image image {
		display: block;
		width: 150rpx;
		height: 150rpx;
		border-radius: 8rpx;
		padding: 20rpx 0;
	}

	.delete-img {
		width: 40rpx !important;
		height: 40rpx !important;
	}

	/* 新增规格 */
	.new-specs image {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}

	.new-specs {
		display: flex;
		align-items: center;
		color: #5f698c;
		padding: 30rpx !important;
	}

	/* 修改属性 */
	.att-input {
		display: flex;
		align-items: center;
		padding: 40rpx 0;
		border-bottom: 1rpx solid #e7e7e7;
	}

	.att-input text {
		flex: 1;
	}

	.att-input input {
		text-align: right;
	}

	/* 底部提交 */
	.Submit {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin: 10rpx 20rpx 68rpx 20rpx;
	}

	.Submit text {
		padding: 15rpx 60rpx;
		border-radius: 10rpx;
	}

	.Submit text:nth-child(1) {
		background-color: #f7f7f7;
		color: #ce6b4e;
		margin-right: 30rpx;
	}

	.Submit text:nth-child(2) {
		background-color: #ed6b51;
		color: #FFFFFF;
	}
</style>