function GitHubAuth(){
    var select = confirm("获取数据需要授权登录到 GitHub\n按确定将开始登录\n按取消将重定向至 GitHub 仓库")
    var user_code = ""
    var device_code = ""
    
    if (select == true){
        var urlencode = "client_id=&scope=repo"
        fetch(method="POST",body=urlencode,headers={"Content-Type":"application/x-www-form-urlencoded"})
        .then(response => response.split("&"))

        response
        
    }else{
        window.location.href="https://github.com/Hex-Dragon/PCL2/issues"
    }
    clipboardData.setData("Text", user_code)
    var authwindow = window.open("https://github.com/login/device","_blank", "width=600,height=400,menubar=no,toolbar=no,location=no")
    authwindow.document.title = `授权代码为：${user_code} 请在输入框粘贴此内容`
}