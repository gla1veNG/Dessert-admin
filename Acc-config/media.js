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
export {Feedback}