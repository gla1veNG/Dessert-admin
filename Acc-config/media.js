//及时反馈
class Feedback{
	constructor(title,icon="error"){
		this.title = title;
		this.icon = icon;
	}
	//消息提示框
	toast(){
		wx.showToast({
				title:this.title,
				icon:this.icon,
				mask:true,
				duration:800
		})
	}
}

//媒体处理
// 媒体处理
class Upload{
	constructor(){}
	
	// 上传本地图片
	image(count = 1, type = 'image'){
		return new Promise((resolve,reject)=>{
			wx.chooseMedia({
			  count,
			  mediaType: [type],
			  sourceType: ['album']
			})
			.then(res=>{
				resolve(res.tempFiles)
			})
			.catch(err=>{
				reject(err)
			})
		})
	}
	
	// 上传图片或者视频到云存储
	async cloud(route){
		let imgion = route.lastIndexOf('.')
		let eximg = route.slice(imgion);
		let cloudpath = `${Date.now()}-${Math.floor(Math.random(0,1)*10000000)}${eximg}`;
		return new Promise((resolve,reject)=>{
			
		})
	}
}
export {Feedback,Upload}