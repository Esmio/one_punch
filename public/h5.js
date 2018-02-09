//运动事件监听
window.onload = function() {
    var shake = true
    var music = true
    var input = document.querySelector('#name')
    var save = document.querySelector('#save')
    var again = document.querySelector('#again')
    var audio = document.querySelector('#audio')
    var bgMusic = document.querySelector('#bgMusic');
    var shakeEle = document.querySelector('#shake');
    var preSave = document.getElementById('pre-save');    
    var nickname = '';
    var randomSign = {};
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    }
    //获取加速度信息
    //通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
    //而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
    var SHAKE_THRESHOLD = 5000;
    var last_update = 0;
    var x, y, z, last_x = 0, last_y = 0, last_z = 0;
    function deviceMotionHandler(eventData) {
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        if ((curTime - last_update) > 10) {
            var diffTime = curTime - last_update;
            last_update = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
            if (speed > SHAKE_THRESHOLD) {
                if(input.value && shake) {
                    nickname = input.value;
                    loading()
                }               
            }
            last_x = x;
            last_y = y;
            last_z = z;
        }
    }
    //随机数组
    var arr = [
        {
            img: '1.png',
            info: '你好我是你好我是你好我是你好我是你好我是你好我1',
            link: '#',
        },
        {
            img: '2.png',
            info: '你好我是你好我是你好我是你好我是你好我是你好我2',
            link: '#',
        },
        {
            img: '3.png',
            info: '你好我是你好我是你好我是你好我是你好我是你好我3',
            link: '#',
        },
        {
            img: '4.png',
            info: '你好我是你好我是你好我是你好我是你好我是你好我4',
            link: '#',
        },
        {
            img: '5.png',
            info: '你好我是你好我是你好我是你好我是你好我是你好我5',
            link: '#',
        }, {
            img: '6.png',
            info: '你好我是你好我是你好我是你好我是你好我是你好我6',
            link: '#',
        }
    ]
    let lots = [
        {
            lot: "富",
            py: "fù",
            sign: "金玉满堂，广结善缘；富到流油说的就是你的汪年。"
        },
        {
            lot: "断",
            py: "duàn",
            sign: "斩断羁绊，不念曾经；新春伊始，善缘自来。"
        },
        {
            lot: "旺",
            py: "wàng",
            sign: "旺旺旺旺旺旺旺旺旺，汪年旺一整年。"
        },
        {
            lot: "美",
            py: "měi",
            sign: "完美主义的你，一个有颜值的旺年是必须的。"
        },
        {
            lot: "财",
            py: "cái",
            sign: "财源滚滚随春到，投对机遇就有财。"
        },
        {
            lot: "乐",
            py: "lè",
            sign: "旺年一把逍遥乐，不羡神仙不羡仙。"
        }, {
            lot: "赞",
            py: "zàn",
            sign: "金你一发言，八方点赞；点赞神签请收好。"
        },
        {
            lot: "瘦",
            py: "shòu",
            sign: "你先瘦一步，保重留给别人。"
        },
        {
            lot: "浪",
            py: "làng",
            sign: "反正有大把时光，干嘛不去见见远方。"
        }, {
            lot: "业",
            py: "yè",
            sign: "升职速度如火箭，坐稳系好安全带。"
        },
        {
            lot: "运",
            py: "yùn",
            sign: "get 赚钱新技能，超额完成小目标。"
        },
        {
            lot: "康",
            py: "kāng",
            sign: "健康指数爆表，重返青春年少。"
        }, {
            lot: "型",
            py: "xíng",
            sign: "线条腹肌马甲线，旺年越练越有型。"
        },
        {
            lot: "爱",
            py: "ài",
            sign: "你爱的都爱你，爱你的一直爱你。"
        },
        {
            lot: "食",
            py: "shí",
            sign: "爱与美食不可辜负，人生那么难，吃饱了再说。"
        }, {
            lot: "空",
            py: "kōng",
            sign: "烦恼忧愁清仓1折起已被抢购一空。"
        },
        {
            lot: "任",
            py: "rèn",
            sign: "旺年的你，做你想做的，有钱，任性。"
        },
        {
            lot: "放",
            py: "fàng",
            sign: "不要浪费时间在错的路上，新的一年，活出自己。"
        }, {
            lot: "醉",
            py: "zuì",
            sign: "喝最烈的酒，过最灿烂的人生，新年旺出精彩。"
        },
        {
            lot: "勇",
            py: "yǒng",
            sign: "黑即白的世界，放飞枷锁勇敢做自己。"
        },
        {
            lot: "宝",
            py: "bǎo",
            sign: "不管多少岁，每天都是宝宝。"
        }, {
            lot: "喜",
            py: "xǐ",
            sign: "把不开心都留在鸡年，旺年就天天开心"
        },
        {
            lot: "康",
            py: "kāng",
            sign: "加班熬夜不怕，汪年身体健康。"
        },
        {
            lot: "怼",
            py: "duì",
            sign: "怼天怼地怼老板，生娃升职生大财。"
        }, {
            lot: "不",
            py: "bù",
            sign: "不加班不长肉不起早，不想干的都不干。"
        },
        {
            lot: "升",
            py: "shēng",
            sign: "职加薪当老板，财务自由旺整年。"
        },
        {
            lot: "棒",
            py: "bàng",
            sign: "你最棒你最棒你最棒你最棒你最棒你最棒了！"
        }, {
            lot: "哈",
            py: "hā",
            sign: "旺年每天都哈哈哈哈哈哈哈红红火火恍恍惚"
        },
    ]
    function getRandomSign(arr) {
        var random = Math.floor(Math.random() * arr.length)
        return arr[random]
    }
    function _putTextToSign(lot, py, sign, nick) {
        var nickDom = document.querySelector('#nick'),
            signDom = document.querySelector('#sign'),
            lotDom = document.querySelector('#lot'),
            pyDom = document.querySelector('#py');
        var nickPre = document.querySelector('#pre-nick'),
            signPre = document.querySelector('#pre-sign'),
            lotPre = document.querySelector('#pre-lot'),
            pyPre = document.querySelector('#pre-py');
        nickDom.innerText = nick;
        signDom.innerText = sign;
        lotDom.innerText = lot;
        pyDom.innerText = py;
        nickPre.innerText = nick;
        signPre.innerText = sign;
        lotPre.innerText = lot;
        pyPre.innerText = py;
    }
    function _emptySign() {
        var nickDom = document.querySelector('#nick'),
            signDom = document.querySelector('#sign'),
            lotDom = document.querySelector('#lot'),
            pyDom = document.querySelector('#py');
        var nickPre = document.querySelector('#pre-nick'),
            signPre = document.querySelector('#pre-sign'),
            lotPre = document.querySelector('#pre-lot'),
            pyPre = document.querySelector('#pre-py');
        nickDom.innerText = '';
        signDom.innerText = '';
        lotDom.innerText = '';
        pyDom.innerText = '';
        nickPre.innerText = '';
        signPre.innerText = '';
        lotPre.innerText = '';
        pyPre.innerText = '';
    }
    function _renderRandomList(arr){
        _arr = arr.slice()
        var ran = Math.floor(Math.random() * _arr.length)
        //var newArr = []
        var list = document.getElementById('list');
        for (var i = _arr.length; i > 0; i--) {
            var r = Math.floor(Math.random() * i)
            var n = _arr.splice(r, 1)
            // newArr.push(n[0])
            var item = _renderItem(n[0].img, n[0].link);
            $(list).append(item)
        }
    }
    function _renderItem2(img, info, link) {
        return '<div class="item">' + 
            '<div class="logo">' + img + '</div>' +
            '<div class="info">' + info + '</div>' +
            '<div class="link">' +
                '<a href="' + link + '">查看秘诀</a>' +
            '</div>' +
        '</div>'
    }

    function _renderItem(img, link) {
        return '<div class="item-wraper"><div class="item" style="background:url(./partners/' + img + ') no-repeat .1rem center; background-size:100%;">' +
            '<a class="abutton" href="' + link + '"></a>' +
        '</div></div>'
    }
    
    // html2canvas
    function getScreenShoot(ele) {
        var canvas = document.createElement("canvas");
        canvas.width = ele.offsetWidth;
        canvas.height = ele.offsetHeight;
        html2canvas(ele, {
            canvas: canvas,
            onrendered: function (canvas) {                
                var myImage = canvas.toDataURL("image/png");
                var print = document.getElementById('print');
                print.setAttribute("src", myImage)
                print.setAttribute("width", window.offsetWidth)
                print.setAttribute("height", window.offsetHeight)
                preSave.style.display = 'none'; 
            }
        })
    }
    // new QRCode(document.getElementById("qrcode"), "http://www.runoob.com");
    // 加载第二页
    function loading(){
        var loading = document.getElementById('loading');
        var rokid1 = document.getElementById('rokid1');
        var rokid2 = document.getElementById('rokid2');
        var list = document.getElementById('list');        
        loading.style.display = 'flex'
        $(shakeEle).removeClass('active');
        var timer = setTimeout(function() {
            loading.style.display = 'none'
            rokid1.style.display = 'none'
            rokid2.style.display = 'flex'
            randomSign = getRandomSign(lots);
            _putTextToSign(randomSign.lot, randomSign.py, randomSign.sign, nickname)
            $(list).empty();
            _renderRandomList(arr);
            shake=false
            clearTimeout(timer)
        }, 3000);
    }
    $(again).on('click', function(){
        var rokid1 = document.getElementById('rokid1');
        var rokid2 = document.getElementById('rokid2');
        var timer2 = setTimeout(function() {
            rokid2.style.display = 'none';
            rokid1.style.display = 'flex';
            shake = true;
            $(shakeEle).addClass('active');   
            _emptySign()         
            clearTimeout(timer2)
        }, 400);
    })
    $(save).on('click', function() {
        var rokid2 = document.getElementById('rokid2');
        rokid2.style.display = 'none';            
        preSave.style.display = 'block';
        audio.style.display = 'none';
        bgMusic.pause()
        var qrcode = document.getElementById("qrcode")
        new QRCode('qrcode', {
            text: location.href,
            width: qrcode.clientWidth - 15,
            height: qrcode.clientHeight - 15,
        })
        getScreenShoot(document.getElementById('pre-save')) 
    })
    $(audio).on('click', function() {
        music = !music  
        music ? $(this).addClass('active') : $(this).removeClass('active')      
        music ? bgMusic.play() : bgMusic.pause()
    })
}