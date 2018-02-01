const docHtml = document.querySelector('html');
docHtml.style.fontSize = window.innerWidth*100/1100 +'px';

const content_r = document.querySelector('.content_r');
const contntList = content_r.querySelector('.contntList');
content_r.style.height = window.innerHeight + 'px';

const logo = document.getElementById('logo');
//contntList.style.height = contntList.scrollHeight +'px';


//html根元素字体缩放;
window.onresize = function(){
	
	docHtml.style.fontSize = window.innerWidth*100/1100 +'px';   // 表示1100的设计图,使用100PX的默认值
	cstumScroll('M_idx_scrBody','scrlBlock','content_r','contntList');
	content_r.style.height = window.innerHeight + 'px';
	contntList.style.height = contntList.scrollHeight +'px';
}

document.onmousedown = function(){
        return false;
    }

//*****鼠标移动删除播放*******************************************************

const tionUl=document.querySelector('.tion_ul');
const tionLis=tionUl.getElementsByTagName('li');

for(var i=0;i<tionLis.length;i++){
	const icon=tionLis[i].querySelector('.icon');
//	console.log(icon)
	tionLis[i].onmouseover=function(){
//		alert(1)
	icon.style.display='block';
	}
	tionLis[i].onmouseout=function(){
		icon.style.display='none'
	}
}

//*******光盘弹出************************************************************
function discOut(){
	const boxUl = document.querySelector('.box_ul');
	const lis = boxUl.querySelectorAll('.imgBox');
	for(var i=0;i<lis.length;i++){
	const move=lis[i].querySelector('.move');
	const dicsImg = lis[i].querySelector('.dicsImg');
	const disc = lis[i].querySelector('.disc');
		move.onmouseover = dicsImg.onmouseover = function(){
				disc.style.filter = 'grayscale(0)';
				move.style.left= '1.2rem';
				move.style.transition='.5s';
			
		}
		move.onmouseout = dicsImg.onmouseout = function(){
				disc.style.filter = 'grayscale(1)';
				move.style.left = '.97rem';
				move.style.transition='.5s';
				
		}
	}
}


//*****左侧点击弹出二级菜单*************************************************************************************
const menuUl = document.getElementById('menu-ul');
const menuBox = Array.from(menuUl.children);

menuBox.forEach(e=>{
    let timer = null;
	if(e.children[1]){
		e.onmouseenter = e.children[1].onmouseenter =  function () {
			clearTimeout(timer);
			e.children[1].style.display = 'block';
			e.children[1].style.top=-(e.children[1].offsetHeight-e.offsetHeight+45)/400+'rem'
		}
		e.onmouseleave = e.children[1].onmouseleave =  function(){
			timer = setTimeout(function(){
				e.children[1].style.display = 'none';
			},100)
		}
	}
})


//*********loading */
loading()
function loading(){
	const disc = document.getElementById('disc');
	const loadTitle = document.getElementById('loadTitle');
	const main = document.querySelector('.M_idx_loading');
	const play = document.getElementById('audio');
	let wrap = document.getElementsByClassName('wrap')[0];
	wrap.style.zIndex = '-1';
	wrap.style.opacity = '0';

	let timer = null;
	let num = 0;

	timer = setInterval(function () {
		disc.style.transform = 'rotate('+1*num+'deg)';
		num ++;
	},20);

	setTimeout(function () {
		move({
			obj:loadTitle,
			attrs:{
				bottom:140,
				opacity:1
			},
			d:1200,
			fx:'bounceOut',
			cb:function () {
				move({
					obj:loadTitle,
					attrs:{
						bottom:140,
						opacity:1
					},
					d:800,
					fx:'bounceOut',
					cb:function () {
						move({
							obj:main,
							attrs:{
								opacity:0
							},
							d:1200,
							cb:function(){
								loadTitle.style.display="none";
								wrap.style.zIndex = '0';
							}
						});
					}
				});
				wrap.style.opacity = '1';				
			}
		});
	},2000)
}
//mini player
mini()

function mini(){
	const audioPlayer = document.querySelector('.M_idx_audioPlayer');
        const play = document.getElementById('play-wy');
        const prev = document.getElementById('prev-wy');
        const next = document.getElementById('next-wy');
        const audio = document.getElementById('audio-wy');
        const audioText = document.getElementById('musicName-wy').querySelector('span');
        let disX = 0;
        let disY = 0;
        let num = 0;
        let onOff = true;

        //初始化
        audioText.innerText = data[num].song + '-' + data[num].singer.name;
        audio.src = data[num%=12].src;
        console.log(audio.src);

        audioPlayer.onmousedown = function (ev) {
			if(ev.target == this || ev.target.id=='musicName-wy'){
				disX = ev.pageX - audioPlayer.offsetLeft;
				disY = ev.pageY - audioPlayer.offsetTop;
				document.onmousemove = function (ev) {
					let mX = ev.pageX;
					let mY = ev.pageY;
					audioPlayer.style.left = mX - disX + 'px';
					audioPlayer.style.top = mY - disY + 'px';
				}
				document.onmouseup = function(){
					document.onmousemove = document.onmouseup = null;
				}
			}
            return false;
        }
        play.onclick = function () {
            if(onOff){
                audio.src = data[num].src;
                audio.play();
                onOff = false;
            }else {
                audio.pause();
                onOff = true;
            }
        }
        prev.onclick = function () {
            num --;
            if(num < 0){
                num = 0;
            }
            if(!onOff){
                audio.src = data[num].src;
                audioText.innerText = data[num].song + '-' + data[num].singer.name;
                audio.play();
                onOff = false;
            }else {
                audio.src = data[num].src;
                audioText.innerText = data[num].song + '-' + data[num].singer.name;
                onOff = true;
            }

        }
        next.onclick = function () {
            num ++;
            if(num > 84){
                num = 84;
            }
            if(!onOff){
                audio.src = data[num].src;
                audioText.innerText = data[num].song + '-' + data[num].singer.name;
                audio.play();
                onOff = false;
            }else {
                audio.src = data[num].src;
                audioText.innerText = data[num].song + '-' + data[num].singer.name;
                onOff = true;
            }
        }
}

lrc();

 function lrc() {
//            audioText.style.left = 42 + 'px';
            timer = setInterval(function () {
                let audioLeft = audioText.getBoundingClientRect().right - audioPlayer.offsetLeft;
                num2 ++;
                audioText.style.left = -num2*1 + 237 + 'px';
                if(parseInt(audioLeft) <= parseInt(musicLeft) + 40){
//                  audioText2.style.display = 'inline-block';
//                    audioText2.style.left = 42 + 'px';
                    if(parseInt(audioLeft) <= parseInt(musicLeft)){
                        clearInterval(timer)
                            audioText2.style.left = 42 + 'px';
                        num2 = 0;
                        timer2 = setInterval(function () {
                            let audioLeft2 = audioText2.getBoundingClientRect().right - audioPlayer.offsetLeft;
                            num3 ++;
                            audioText2.style.left = -num3*1 + 42 + 'px';
                            if(parseInt(audioLeft2) <= parseInt(musicLeft) + 20){
//                                audioText.style.left = 237 + 'px'
                                clearInterval(timer2);
                                if(parseInt(audioLeft) <= parseInt(musicLeft)){
                                    num3 = 0;
                                    audioText2.style.left = '237px';
                                    audioText.style.left = '237px';
                                    lrc();
                                }
                            }
                        },30)
                    }
                }
            },30)
        }

