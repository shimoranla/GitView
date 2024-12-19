class IllegalArgumentException extends Error {
    constructor(message){
        super(message)
        this.name = "AccessDeniedExeption"
        this.message = message
    }
}

class AccessDeniedException extends Error {
    constructor(message){
        super(message)
        this.name = "AccessDeniedExeption"
        this.message = message
    }
}

class RuntimeException extends Error {
    constructor(message) {
        super(message)
        this.name = "AccessDeniedExeption"
        this.message = message
    }
}

class InterruptedException extends Error {
    constructor(message){
        super(message)
        this.name = "InterruptedException"
        this.message
    }
}

class HTTPException extends Error {
    constructor(status,headers,response){
        var description = ""
        if (status == 400) description = "错误的请求"
        if (status == 401) description = "未经授权"
        if (status == 403) description = "已禁止"
        if (status == 404) description = "未找到"
        if (status == 405) description = "方法不允许"
        if (status == 406) description = "不接受"
        if (status == 407) description = "需要验证代理"
        if (status == 408) description = "请求超时"
        if (status == 409) description = "请求冲突"
        if (status == 410) description = "不再可用"
        if (status == 411) description = "长度未指定"
        if (status == 412) description = "前置未满足"
        if (status == 413) description = "请求体过长"
        if (status == 414) description = "URI 过长"
        if (status == 415) description = "不支持的媒体格式"
        if (status == 416) description = "范围不存在"
        if (status == 417) description = "无法满足"
        if (status == 418) description = "我是茶壶"
        if (status == 421) description = "错误的请求定向"
        if (status == 425) description = "太早了"
        if (status == 426) description = "协议需升级"
        if (status == 428) description = "需要前提条件"
        if (status == 429) description = "请求过多"
        if (status == 431) description = "请求头过大"
        if (status == 451) description = "因法律原因不可用"
        if (status == 500) description = "内部服务器错误"
        if (status == 501) description = "未实现"
        if (status == 502) description = "网关错误"
        if (status == 503) description = "服务不可用"
        if (status == 504) description = "网关超时"
        if (status == 505) description = "不支持的 HTTP 版本"
        if (status == 506) description = "内部配置错误"
        if (status == 510) description = "未扩展"
        if (status == 511) description = "需要网络认证" 
        // 非标准状态码
        if (status == 1000) description = "请求超时"
        if (status == 1001) description = "未能解析此远程名称"
        if (status == 1002) description = "权限不足" 
        if (status == 1004) description = "未能建立 SSL/TLS 连接"
        super(description)
        this.description = description
        this.status = status
        this.name = "HTTPException"
        this.headers = headers
        this.response = response
        
    }
}