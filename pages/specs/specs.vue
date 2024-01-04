<template>
	<!-- 顶部 -->
	<view class="attribute">
		<view class="edit">
			<text>请给商品规格设置合适的属性</text>
			<text @click="show = true">编辑</text>
		</view>
		<view class="checkbox">
			<checkbox-group style="display: flex;" @change="chEchange">
				<label v-for="(item,index) in attribute.selected" :key="index" @click="fInd(item.att,item.checked)">
					<checkbox :value="item.att" :checked="item.checked" color="#e96c56" />{{item.name}}
				</label>
			</checkbox-group>
		</view>
	</view>
	<!-- 规格生成 -->
	<view class="attribute gener" v-for="(item,index) in sku_data.sku" :key="index">
		<view class="edit specs-delete" >
			<text>规格{{item.title}}</text>
			<text v-if="sku_data.sku.length > 1" @click="deleteSku(index)">删除</text>
		</view>
		<view class="edit entry" v-if="item.att_data.length > 0" v-for="(item_add,index_add) in item.att_data" :key="index_add">
			<text>{{item_add.att_name}}</text>
			<input type="text" v-model="item_add.add_val" :placeholder=" '请输入' + item_add.att_name " placeholder-class="I-style" cursor-spacing="50" />
		</view>
		<view class="edit entry">
			<text>价格</text>
			<input type="text" v-model="item.price" placeholder="请输入价格" placeholder-class="I-style" cursor-spacing="50" />
			<text>￥</text>
		</view>
		<view class="edit entry">
			<text>库存</text>
			<input type="text" v-model="item.stock" placeholder="请输入库存" placeholder-class="I-style" cursor-spacing="50" />
			<text>件</text>
		</view>
		<!-- 上传图片 -->
		<view class="specs-image">
			<image src="/static/detail/shuxing-img.png" mode="aspectFill" v-if="item.image === '' " @click="upLoad(index)"></image>
			<image :src="item.image" mode="aspectFill" v-else></image>
			<image class="delete-img" src="/static/detail/shanchu.svg" mode="widthFix" v-if="item.image != ''" @click="dePicture(index)"></image>
		</view>
	</view>
	<!-- 添加规格 -->
	<view class="attribute gener new-specs" @click="newSpecs">
		<image src="/static/detail/jiahao.svg" mode="widthFix"></image>
		<text>规格</text>
	</view>
	<!-- 弹窗 -->
	<page-container :show="show" bindenter="onEnter">
		<view class="space-view">
			<view class="modify-sub">
				<image src="/static/detail/guanbi.svg" mode="widthFix" @click="show = false"></image>
				<text>修改属性</text>
				<text @click="subMit">提交</text>
			</view>
			<view class="att-input" v-for="(item,index) in Sto_att.attobj" :key="index">
				<text>属性{{item.title}}</text>
				<input type="text" v-model="item.att" placeholder="输入属性" placeholder-class="I-style" cursor-spacing="50" />
			</view>
		</view>
	</page-container>
</template>

<script setup>
import { Feedback } from '../../Acc-config/media';
	function onEnter() {}
	
	//控制弹窗弹出
	import {ref,reactive} from 'vue'
	const show = ref(false);
	
	//存储sku数据
	const sku_data = reactive({
		sku:[{title:1,att_data:[],price:'',stock:'',image:''}]
	})
	//创建的属性
	const Sto_att = reactive({
		attobj:[{att:'',title:1},{att:'',title:2},{att:'',title:3}]
	})
	//多选框的值
	const attribute = reactive({selected:[]})
	//提交属性
	function subMit(){
		// 如果用户重新设置属性，那么就要让规格归位，清空
		sku_data.sku = [{title:1,att_data:[],price:'',stock:'',image:''}]
		//过滤填写的规格
		const filter = Sto_att.attobj.filter(item=>item.att != '');
		const new_arr = [];
		filter.forEach(item =>{
			new_arr.push({att:item.att,name:item.att,checked:true});
		})
		attribute.selected = JSON.parse(JSON.stringify(new_arr));
		show.value = false;
		
		calsku();
	}
	//计算生成动态规格
	let new_att = [];
	function calsku(){
		let filter_arr = attribute.selected.filter(item =>item.checked);
		new_att = filter_arr.map(item => {return {att_name:item.att,att_val:''}});
		sku_data.sku.forEach(item =>{
			item.att_data = JSON.parse(JSON.stringify(new_att));
		})
	}
	//新增规格
	function newSpecs(){
			let num = sku_data.sku[sku_data.sku.length - 1].title;
			num++;
			const new_sku = {title:num,att_data:[],price:'',stock:'',image:''}
			sku_data.sku.push(new_sku);
			// 向att_data添加属性
			let filter_arr = attribute.selected.filter(item=>item.checked);
			let new_att = filter_arr.map(item=>{return{att_name:item.att,att_val:''}});
			sku_data.sku[sku_data.sku.length - 1].att_data = JSON.parse(JSON.stringify(new_att));
	}
	//删除规格
	function deleteSku(index){
		sku_data.sku.splice(index,1);
		sku_data.sku.forEach((item,index)=>{item.title = index + 1});
	}
	//更改多选框 checked 的值，选中和取消选中
	function chEchange(e){
		let value = e.detail.value;//只留下选中的
		attribute.selected.forEach((iteming,index)=>{
			let item = attribute.selected[index];
			if(value.includes(iteming.att)){
				item.checked = true;
			}else{
				item.checked = false;
			}
		})
	}
	//选中和取消选中重新计算规格数组
	function fInd(att,checked){
		if(checked){//选中
			sku_data.sku.forEach(item=>{
				item.att_data.push({att_name:att,att_val:''});
			})
		}else{//未选中
			sku_data.sku.forEach((item_a,index_a)=>{
				item_a.att_data.forEach((item_b,index_b)=>{
					if(item_b.att_name == att){
						sku_data.sku[index_a].att_data.splice(index_b,1);
					}
				})
			})
		}
	}
	import {Upload} from '@/Acc-config/media.js'
	//上传图片
	async function upLoad(index){
		try{
			let local =	await new Upload().image();
			wx.showLoading({title:'上传中',mask:true});
			let res = await new Upload().cloud(local[0].tempFilePath);
			sku_data.sku[index].image = res;
			wx.hideLoading();
		}catch(e){
			new Feedback('上传失败').toast();
		}
	}
	//删除图片
	function dePicture(index){
		sku_data.sku[index].image = '';
	}
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