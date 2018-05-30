(function () {
    var module = {
        init: function () {
            var self = this;
            if (typeof (Worker) !== "undefined") {
                var worker = new Worker("./../work/Worker.js");
                var obj = {};
                var url = 'http://scd.51qcj.com:8200/api/common/xiucheren/business/info.jhtml';
    
                var data = "";
                obj.url = url;
                obj.requestM = "GET";
                obj.authToken = "";
                obj.data = "";
                var send = document.getElementById("send");
                send.onclick = function () {
                    worker.postMessage(obj);
                }
    
                worker.onmessage = function (event) {
                    document.getElementById("count").innerHTML=event.data.data.memberCount;
                }
            } else {
                alert("不支持webworker");
            }

        }
    }
    module.init();
})()