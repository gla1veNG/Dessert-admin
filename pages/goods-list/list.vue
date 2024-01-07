<template>
	<view class="select-goods">
		<view>
			<image src="../../static/detail/026.jpg" mode="aspectFill"></image>
		</view>
		<view>
			<text class="over-text line-clamp">这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题</text>
			<text>1.3￥</text>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
.select-goods{
	display: flex;
	height: 200rpx;
	margin: 20rpx;
}
.select-goods image{
	width: 200rpx;
	height: 200rpx;
	display: block;
	border-radius: 10rpx;
}
.select-goods view:nth-child(2){
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-weight: bold;
	padding: 10rpx 0 10rpx 15rpx;
}
.select-goods view text:nth-child(2){
	color: #1AAD19;
	font-size: 35rpx;
}
.line-clamp{
	-webkit-line-clamp: 2 !important;
}
</style>