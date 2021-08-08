(function (w, d) {
    var timer;
    function loadImg() {
        if ($id('albumarea')) {
            var fathernode = $id('albumarea');
            var request = new XMLHttpRequest();
            request.open("GET", "imgs/photolist", true);
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    var elements = request.responseText.split("\n");
                    for (let x of elements) {
                        if (x.match(/\.(jpe?g|png|gif)$/)) {
                            fetchImg(x, fathernode)
                        }
                    }
                }
            };
            request.send();
        } else {
            main.innerText = 'No image';
        }

    }


    function fetchImg(img_name, fathernode) {
        var div = d.createElement('DIV');
        div.classList.add('card');
        var img = new cImg();
        img.src = 'imgs/' + img_name;
        img.classList.add('card-img');
        div.appendChild(img);
        fathernode.appendChild(div);
    }


    cImg = function (src) {
        this.self = d.createElement('IMG');
        this.self.src = src;
        let cImg = this;
        this.self.addEventListener("click", function () {
            cImg.show()
        });
        return this.self
        // try{
        //     let list = $("#"+node+" [data-dismiss=\"modal\"]").self;
        //     for(let el of list){
        //         el.addEventListener("click",function (e) {
        //             if(e) e.preventDefault();
        //             modal.hide();
        //         })
        //     }
        // }catch (e) {
        //     console.log(e);
        // }
    };




    cImg.prototype.show = function () {
        let backdrop = $id('bs.backdrop');
        if (backdrop === null) {
            backdrop = d.createElement('div');
            backdrop.id = "bs.backdrop";
            backdrop.classList.add("c-solid");
            //shawdow
            let backdropshadow = d.createElement('div');
            backdropshadow.id = "bs.backdropshadow";
            backdropshadow.className = "modal-backdrop show";
            // big look of img
            let dd = d.createElement('DIV');
            dd.id = "bs.backdropfont";
            dd.classList.add("container-fluid");
            dd.classList.add("c-center");
            dd.style.zIndex = 1050;
            dd.style.position = "relative";
            let img = d.createElement('img');
            img.src = this.self.src;
            img.classList.add("c-responsive");
            d.body.appendChild(backdrop);
            backdrop.appendChild(backdropshadow);
            backdrop.appendChild(dd);
            dd.appendChild(img);
            backdrop.addEventListener("click", this.hide);
        }
    };

    cImg.prototype.hide = function () {
        let backdrop = $id('bs.backdrop');
        if (backdrop !== null) {
            // d.body.removeChild(backdrop)
            fade(backdrop,function () {
                d.body.removeChild(backdrop)
            })
        }
    };

    function fade(element, callback) {
        if(timer) clearInterval(timer);
        if (typeof callback !== "function") {
            callback = function () {};
        }
        element.classList.remove('c-solid');  // initial opacity
        element.classList.add('c-transparency');
        // 用法
        sleep(500).then(() => {
            callback()
        })

    }
    w['loadImg'] = loadImg;
    w['cImg'] = cImg;

})(window, document);


