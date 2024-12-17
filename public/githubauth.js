async function GitHubAuth(){
    var select = confirm("获取数据需要授权登录到 GitHub\n按确定将开始登录\n按取消将重定向至 GitHub 仓库")
    var user_code = ""
    var device_code = ""
    var client_id = ""
    var interval = 0
    var exp_time = 0
    if (select == true){
        var urlencode = new URLSearchParams()

        urlencode.append("client_id",client_id)
        urlencode.append("scope","repo")

        fetch("https://github.com/login/device/code",
            method="POST" ,
            body=urlencode,
            headers={
                "Content-Type":"application/x-www-form-urlencoded",
                "Accept":"application/json"
            }
        )
        .then(response => response.json())
        .then(data => {

            device_code = data.device_code
            user_code = data.user_code
            interval = data.interval
            exp_time = data.expires_in
        })
        .catch()
        
        device_code = data[0]
        exp_time = Date.now() + data[1]
        interval = data[2]
        user_code = data[3]
        var status = await device_login(device_code=device_code,exp_time=exp_time,client_id=client_id,every_request_wait_time=interval*1000) 
        if (status[0]){

        }else{
            alert("登录失败 \n \n ${status[1]}")
        }
    }else{
        window.location.href="https://github.com/Hex-Dragon/PCL2/issues"
    }
    
    var authwindow = window.open("https://github.com/login/device","_blank", "width=600,height=400,menubar=no,toolbar=no,location=no")
    authwindow.document.title = `授权代码为：${user_code} 请在输入框输入此内容`
}



async function devicelogin(device_code:String,exp_time:Number,client_id:String,every_request_wait_time:number) {
    var url_query = new URLSearchParams()
    url_query.append("client_id",client_id)
    url_query.append("device_code",device_code)
    url_query.append("grant_type","urn:ietf:params:oauth:grant-type:device_code")
    var query_url = "https://github.com/login/oauth/access_token"
    while(exp_time - Date.now() <= 0){
        setTimeout(() =>
        fetch(query_url,{
            method:"POST",
            body:url_query,
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "Accept":"application/json"
            }
        }
        )
        .then(response => response.json())
        .then(data => {
            if(response.status == 401){
                if (data.error == "authorization_pending"){
                    continue
                }
                else if (data.error == "slow_down"){
                    setTimeout(() => {continue},every_request_wait_time+5*1000)
                }
                else if(data.error == "expired_token"){
                    return [false,"登录令牌已过期"]
                }
                else if (data.error == "access_denied"){
                    return [false,"登录时拒绝了授权请求"]
                }
            }

        }
        )
    ,every_request_wait_time)
        }
        return [false,"登录超时"]
        }
    