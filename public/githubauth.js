import {IllegalArgumentException,InterruptedException} from "./Exception.js";


async function TextCode(blob,IsDecode=true) {
    if (IsDecode){
        let decode = new TextDecoder()
        return decode.decode(blob)
    }
    else {
        let encode = new TextEncoder()
        return encode.encode(blob)
    }
    
}

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

        resp = await NetworkRequest(url="",method="POST",data=urlencode)
        //device_code = data[0]
        exp_time = new Date().getTime() + data[1]
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



async function devicelogin(device_code,exp_time,client_id,every_request_wait_time) {
    let controller = new AbortController()
    let signle = controller.signal
    var url_query = new URLSearchParams()
    url_query.append("client_id",client_id)
    url_query.append("device_code",device_code)
    url_query.append("grant_type","urn:ietf:params:oauth:grant-type:device_code")
    var query_url = "https://github.com/login/oauth/access_token"
    while(exp_time - Date.now() <= 0 || signle.aborted){
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
                    
                }
                else if (data.error == "slow_down"){
                    setTimeout(() => {},every_request_wait_time+5*1000)
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
        if (signle.aborted) throw new InterruptedException("操作被中止")
        return 
        }
    