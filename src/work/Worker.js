importScripts("./../../js/jquery.nodom.js");

onmessage = function(e){
    var eventData= e.data;
    if(eventData.requestM=="GET"){
        new httpRequest(eventData.url,eventData.authToken,eventData.data).POST(function(data) {
            postMessage(data)
        },function(data){
        })
    }else if(eventData.requestM=="GET"){
        new httpRequest(eventData.url,eventData.authToken,eventData.data).GET(function(data) {
            postMessage(data)
        },function(data){
        })
    }
}

var httpRequest=function(url,authToken,data){
    this.url=url;
    this.authToken=authToken;
    this.data=data;
}


httpRequest.prototype.POST=function(callback,error){
    jQuery.support.cors = true;
    var self=this;
    return  $.ajax({
        type: "POST",
        url: self.url,
        timeout : 60000,
        data: JSON.stringify(self.data),
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'ProxyAuthorization': 'Bearer ' + self.authToken||""
            // 'ProxyAuthorization': 'Bearer ' + authToken||""
        },
        dataType: "json",
        contentType: "application/json; charset=utf8",
        cache:false
        }).done(function(data) {
            if(typeof callback==="function"){
                callback.call(self,data)
            }
        }).fail(function(err,status){            

            if(status == 'timeout') {
                self.GET().abort();    // 超时后中断请求
                if(typeof error==="function"){
                    error.call(null,err,status)
                }
              }
        })
}
httpRequest.prototype.GET=function(callback,error){
    jQuery.support.cors = true;
    var self=this;
    return  $.ajax({
        type: "GET",
        url: self.url,
        timeout : 60000,
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'ProxyAuthorization': 'Bearer ' + self.authToken||""
            // 'ProxyAuthorization': 'Bearer ' + authToken||""
        },
        dataType: "json",
        contentType: "application/json; charset=utf8",
        cache:false
        }).done(function(data) {
            if(typeof callback==="function"){
                callback.call(self,data)
            }
        }).fail(function(err,status){            
            if(status == 'timeout') {
                self.GET().abort();    // 超时后中断请求
                if(typeof error==="function"){
                    error.call(null,err,status)
                }
              }
        })
}