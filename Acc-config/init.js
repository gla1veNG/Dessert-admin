let inIt = function(){
	return new Promise(async(resolve,reject)=>{
	// 声明 cloud 实例
	var res = new wx.cloud.Cloud({
		//用户端 AppID
	  resourceAppid: 'wxd3af48f8163d0a51',
		//用户端环境 ID
	  resourceEnv: 'dessert-user-2gv61nata72c4681',
	})
	//跨账号调用，必须等待 init 完成
	// init 过程中，用户端小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）未确定允许访问、并可自定义安全规则
	await res.init()
	
	// 完成后正常使用用户端的已授权的云资源
	await res.callFunction({
	  name: 'cloudbase_auth',
	  data: {},
	})
	resolve(res);
	})
}
export {inIt}