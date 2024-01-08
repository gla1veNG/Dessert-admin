<template>
	<view class="sort-Header sort-position" v-if="data.seckill_goods.length > 0">
		<text>秒杀封面图</text>
		<text>标题</text>
		<text>操作</text>
	</view>
	<view style="height: 90rpx;"></view>
	<view class="sort-Header sort-table" v-for="(item,index) in data.seckill_goods" :key="index">
		<image :src="item.cover" mode="aspectFill"></image>
		<text>{{item.title}}</text>
		<text class="sort-but">删除</text>
	</view>
	<!-- 没有数据的提示 -->
	<view class="Tips" v-if="data.seckill_goods.length === 0">目前没有任何横幅数据</view>
	<!-- 底部 -->
	<view style="height:300rpx;"></view>
	<view class="newly-added-view">
		<view class="newly-added" @click="show = true">创建秒杀</view>
	</view>
	<!-- 弹窗 -->
	<page-container :show="show" position="bottom" bindenter="onEnter">
		<view class="space-view">
			<view class="modify-sub modify-padding">
				<image src="/static/detail/guanbi.svg" mode="widthFix" @click="show = false"></image>
				<text>创建秒杀</text>
				<text>提交</text>
			</view>
			<view class="upload-cover">
				<image src="/static/detail/miaosha-img.jpg" mode="aspectFill" v-if="Time.se_cover === ''" @click="upImage"></image>
				<image :src="Time.se_cover" mode="aspectFill"></image>
				<image src="/static/detail/shanchu-goods.svg" mode="widthFix" v-if="Time.se_cover != ''" @click="Time.se_cover = ''"></image>
			</view>
			<view class="seckill-input">
				<input type="text" v-model="se_title" placeholder="请输入标题" placeholder-class="input-color" cursor-spacing="50" />
				<input type="number" v-model="se_price" placeholder="请输入秒杀价格" placeholder-class="input-color" cursor-spacing="50" />
			</view>
			<!-- 设置时间 -->
			<view class="pick-Outer">
				<view class="pick-view Underline">
					<view>
						<text>设置开始时间</text>
						<picker class="flex-left" mode="multiSelector">
							<view>
								<text class="pick-time">2024-01-08 00:00:00</text>
								<image src="/static/detail/xiangyou-jiantou.svg" mode=""></image>
							</view>
						</picker>
					</view>
				</view>
				<!-- 结束时间 -->
				<view class="pick-view">
					<view class="pick-view">
						<view>设置结束时间</view>
						<picker class="flex-left" mode="multiSelector">
							<view>
								<text class="pick-time">2024-01-10 00:00:00</text>
								<image src="/static/detail/xiangyou-jiantou.svg" mode=""></image>
							</view>
						</picker>
					</view>
				</view>
			</view>
			<!-- 关联商品 -->
			<view class="relation relation-back" @click="addTo">
				<text>关联商品</text>
				<text class="over-text">添加</text>
			</view>
			<view style="height: 50rpx;"></view>
		</view>
	</page-container>
</template>

<script setup>
	import {
		inIt
	} from '@/Acc-config/init.js'
	import {
		ref,
		onMounted,
		reactive,
		toRefs
	} from 'vue'

	function onEnter() {}

	onMounted(() => {
		getSeckill();
	})
	
	const show = ref(false);
	const data = reactive({
		seckill_goods: []
	})
	//获取数据
	async function getSeckill() {
		let DB = await inIt();
		let res = await DB.database().collection('seckill').get();
		data.seckill_goods = res.data;
	}
	
	const Time = reactive({
		se_cover:'',//封面图
		se_title:'',//标题
		se_price:'',//秒杀价格
		start:'',//开始时间
		end:'',//结束时间
		re_goods:{
			title:'',//关联的商品标题
			goods_id:'',//关联的商品id
			video_url:'',//关联的商品短视频
			ori_price:'',//关联的商品原价
		}
	})
	//上传封面图
	import {Feedback,Upload} from '@/Acc-config/media.js'
	async function upImage(){
		const local = await new Upload().image();
		wx.showLoading({title:'正在上传',mask:true});
		const res = await new Upload().cloud(local[0].tempFilePath);
		Time.se_cover = res;
		wx.hideLoading();
		
	} 
</script>

<style scoped>
	.sort-table text:nth-child(2) {
		color: #333333 !important;
		background-color: initial !important;
		border-radius: 0 !important;
		padding: 0 !important;
		font-size: 30rpx !important;
	}

	.modify-padding {
		padding-bottom: 60rpx !important;
	}

	.relation-back {
		background-color: #f7f7f7 !important;
		color: #000000 !important;
	}

	.over-text {
		color: #ed6b51 !important;
	}

	.upload-cover {
		position: relative;
	}

	.upload-cover image:nth-child(1) {
		width: 100%;
		height: 380rpx;
		display: block;
	}

	.upload-cover image:nth-child(2) {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 6rpx;
		right: 6rpx;
	}

	.seckill-input input {
		padding: 20rpx;
		background-color: #f7f7f7;
		margin-top: 30rpx;
		border-radius: 7rpx;
	}

	/deep/ .input-color {
		color: #cccccc;
	}

	.pick-Outer {
		background-color: #f7f7f7;
		margin-top: 30rpx;
		padding: 0 20rpx;
		border-radius: 7rpx;
	}

	.pick-view {
		padding: 20rpx 0;
	}

	.pick-view image {
		display: block;
		width: 30rpx;
		height: 30rpx;
		margin-left: 20rpx;
	}

	.pick-view view:nth-child(1) {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.flex-left {
		flex: 1;
	}

	.flex-left view {
		justify-content: flex-end !important;
	}

	.Underline {
		border-bottom: 1rpx solid #ededed;
	}

	.pick-time {
		font-size: 27rpx;
	}
</style>