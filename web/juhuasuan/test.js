// JavaScript Document
(function(win,doc){
	win.onload=win.onresize=function(){
	doc.documentElement.style.fontSize = doc.documentElement.clientWidth*(20/320)+'px';
	var rem = parseFloat(doc.documentElement.style.fontSize);
	
	
	var iNow = 1;
	var oBox = doc.querySelector('.banner');
	var oUl = doc.querySelector('.banner ul');
	var aLi = oUl.children;
	
	
	var x = -16;
	var bOk = false;
	oUl.addEventListener('touchstart',function(ev){
		if(bOk)return;
		bOk = true;
		oUl.style.WebkitTransition = 'none';
		var downX = ev.targetTouches[0].pageX/rem;
		var disX = downX-x;
		function fnMove(ev){
			x = ev.targetTouches[0].pageX/rem-disX;
			oUl.style.WebkitTransform='translate3d('+x+'rem,0rem,0rem)';
			oUl.style.transform='translate3d('+x+'rem,0rem,0rem)';
		};
		function fnEnd(ev){
			document.removeEventListener('touchmove',fnMove,false);
			document.removeEventListener('touchend',fnEnd,false);
			
			var upX = ev.changedTouches[0].pageX/rem;
			var dis = Math.abs(upX-downX);
			if(dis>8){
				//要变
				if(downX>upX){
					//下一张
					iNow++;
				}else{
					//上一张
					iNow--;
				}
			}else{
				//不变
			}
			
			oUl.style.WebkitTransition = '.4s all ease';
			
			x = -iNow*(aLi[0].offsetWidth/rem);
			oUl.style.WebkitTransform='translate3d('+x+'rem,0rem,0rem)';
			oUl.style.transform='translate3d('+x+'rem,0rem,0rem)';
			
			
			function traEnd(){
				oUl.removeEventListener('transitionend',traEnd,false);
				oUl.style.WebkitTransition = 'none';
				if(iNow==0){
					iNow = 5;
				}else if(iNow==6){
					iNow=1;
				}
				x = -iNow*(aLi[0].offsetWidth/rem);
				oUl.style.WebkitTransform='translate3d('+x+'rem,0rem,0rem)';
				oUl.style.transform='translate3d('+x+'rem,0rem,0rem)';
				bOk = false;
			};
			oUl.addEventListener('transitionend',traEnd,false);
		};
		doc.addEventListener('touchmove',fnMove,false);
		doc.addEventListener('touchend',fnEnd,false);
		ev.preventDefault();
	},false);
};

})(window,document);