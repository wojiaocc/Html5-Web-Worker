# Html5-Web-Worker
WebWorker 是运行在浏览器后台的JavaScript代码，不会影响页面代码，实现JavaScript多线程。

## 什么是 Web Worker？
当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本已完成。
web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。

## 浏览器支持
所有主流浏览器均支持 web worker，除了 Internet Explorer。

## 检测 Web Worker 支持
在创建 web worker 之前，请检测用户的浏览器是否支持它：
```JavaScript
if(typeof(Worker)!=="undefined")
  {
  // Yes! Web worker support!
  // Some code.....
  }
else
  {
  // Sorry! No Web Worker support..
  }
```

## 创建 Web Worker 对象
我们已经有了 web worker 文件，现在我们需要从 HTML 页面调用它。
下面的代码检测是否存在 worker，如果不存在，- 它会创建一个新的 web worker 对象，然后运行 "demo_workers.js" 中的代码：
```JavaScript
if(typeof(w)=="undefined")
  {
  w=new Worker("demo_workers.js");
  }
```
然后我们就可以从 web worker 发生和接收消息了。
向 web worker 添加一个 "onmessage" 事件监听器：
```JavaScript
w.onmessage=function(event){
document.getElementById("result").innerHTML=event.data;
};
```
当 web worker 传递消息时，会执行事件监听器中的代码。event.data 中存有来自 event.data 的数据。

向 web worker 添加一个 "postMessage" 信息发送事件：
```JavaScript
 var obj;
 w.postMessage(obj)
```

## 终止 Web Worker
当我们创建 web worker 对象后，它会继续监听消息（即使在外部脚本完成之后）直到其被终止为止。
如需终止 web worker，并释放浏览器/计算机资源，请使用 terminate() 方法：
```JavaScript
w.terminate();
```

## Web Workers 和 DOM
由于 web worker 位于外部文件中，它们无法访问下例 JavaScript 对象：
window 对象
document 对象
parent 对象

## Web Workers中的 jquery的使用
当我们创建Web Workers JS 文件时，若需要在代码中执行jq代码则可以引入jquery.nodom.js文件 ，代码如下：
```JavaScript
importScripts("./jquery.nodom.js");
```
文件存放在位于JS文件夹中
