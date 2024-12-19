class HTTPResponse{
    constructor(status,headers,response){
        this.status = status
        this.headers = headers
        this.response = response
    }

}

async function NetworkRequest(url,method,data,headers={"User-Agent":"GitView/1.0.0 Author/shimoranla","Accept":"application/json"}) {
    const ValidMethod = ["GET","HEAD","POST","PUT","DELETE","OPTIONS","PATCH"]
    if (url == undefined || method == undefined || data == undefined){
        if (method == undefined) throw ReferenceError("参数 method 的值不能是 undefined")
        if (url == undefined) throw ReferenceError("参数 url 的值不能是 undefined")
        if (data == undefined && (method == "POST" || method == "PUT")) throw ReferenceError("当请求方法为 POST 或 PUT 时，参数 data 的值不能为 undefined")
        if (!ValidMethod.includes(method.toUpperCase())) throw TypeError
        }    
    let req = new XMLHttpRequest()
    req.open(method=method,url=url)
    for (headername in headers){
        req.setRequestHeader(headername,headers[headername])
    }
    if ((method == "POST" || method == "PUT") && data != undefined){
        req.send(data)
    }else{
        req.send()
    }
    req.onreadystatechange = function(){
        return new HTTPResponse(req.status,req.getResponseHeader(),req.response)
    }
    req.abort = function(){
        console.debug("Request Aborted")
    }
    
}
