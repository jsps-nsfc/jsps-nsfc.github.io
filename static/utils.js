(function (w,d){

    function $id(id) {
        return d.getElementById(id);
    }
    function $(selector) {
        return d.querySelector(selector);
    }
    function $_(selector) {
        return d.querySelectorAll(selector);
    }
    function $ajax(args) {
        // args:
        // {
        // url:'URL',
        // method: 'GET/POST',
        // success: function
        // loading
        // }

        var request = new XMLHttpRequest();
        request.open(method= args.method,url= args.url,true);
        request.onloadstart = function(){
            if (args.loading)
                args.loading(request);
        };
        request.onreadystatechange = function(){
            if (request.readyState === 4 && request.status === 200){
                args.success(request);
            }else{
                if(request.status !== 200)
                    throw "Cannot connect"
            }
        };
        request.send()
    }

    function $js(filename,callback){
        if (typeof (callback) !== "function"){
            callback = function () {}
        }
        $ajax({
            url:filename,
            method: "GET",
            success:function (rq) {
                eval(rq.responseText);
                callback();
            }
        })
    }

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    w['$id']=$id;
    w['$']=$;
    w['$_']=$_;
    w['$ajax'] = $ajax;
    w['$js'] = $js;
    w['main'] = $id("main");
    w['sleep'] = sleep
})(window,document);