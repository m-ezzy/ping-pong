const master=document.getElementById("masterid");
const bar1back=document.getElementById("bar1back");
const bar2back=document.getElementById("bar2back");
const bar1=document.getElementById("bar1id");
const bar2=document.getElementById("bar2id");
const ball=document.getElementById("ballid");
const m=document.getElementById("message");

/*master div properties*/
let masterWidth=1200;
let masterHeight=600;

master.style.width=masterWidth+"px";
master.style.height=masterHeight+"px";

/*bars properties*/
let barsWidth=50;
let barsHeight=150;
let bar1Y=250;
let bar2Y=250;
let change=20;

bar1.style.width=barsWidth+"px";
bar1.style.height=barsHeight+"px";
bar1.style.left=0+"px";
bar1.style.top=bar1Y+"px";

bar2.style.width=barsWidth+"px";
bar2.style.height=barsHeight+"px";
bar2.style.left=masterWidth-barsWidth+"px";
bar2.style.top=bar2Y+"px";

bar1back.style.width=barsWidth+"px";
bar1back.style.height=masterHeight+"px";
bar1back.style.left=0+"px";
bar1back.style.top=0+"px";

bar2back.style.width=barsWidth+"px";
bar2back.style.height=masterHeight+"px";
bar2back.style.left=masterWidth-barsWidth+"px";
bar2back.style.top=0+"px";

/*ball properties*/
let radius=25;
let ballX=100;
let ballY=100;
let speedX=2;
let speedY=2;
let signX=1;
let signY=1;

ball.style.width=(radius*2)+"px";
ball.style.height=(radius*2)+"px";
ball.style.left=barsWidth+"px";
ball.style.top=0+"px";
ball.style.borderRadius=radius+"px";

let my=null;
let stopper=0;
let winnerNumber=null;

let player1up=false;
let player1down=false;
let player2up=false;
let player2down=false;

function startsGame(){
	clearInterval(my);
	my=setInterval(running,20);
}

function running(){
	barMoves();
	ballmoves();
	speedIncreaser();
	checksBallBorderTouch();
	checksBarBallTouch();
	resultPrinter();
}


function barMoves(){
	if(player1up){
		if(bar1Y>change) bar1Y=bar1Y-change;
		else bar1Y=0;
		bar1.style.top=bar1Y+"px";
	}
    if(player1down){
		if(bar1Y<masterHeight-barsHeight-change) bar1Y=bar1Y+change;
		else bar1Y=masterHeight-barsHeight;
		bar1.style.top=bar1Y+"px";
    }
    if(player2up){
		if(bar2Y>change) bar2Y=bar2Y-change;
		else bar2Y=0;
		bar2.style.top=bar2Y+"px";
	}
    if(player2down){
		if(bar2Y<masterHeight-barsHeight-change) bar2Y=bar2Y+change;
		else bar2Y=masterHeight-barsHeight;
		bar2.style.top=bar2Y+"px";
    }
}

document.body.addEventListener("keydown",keydown);
document.body.addEventListener("keyup",keyup);

function keydown(event){
    if(event.keyCode==81){ //q
	player1up=true;
    }
    if(event.keyCode==90){ //z
        player1down=true;
    }
    if(event.keyCode==79){ //o
        player2up=true;
	}
    if(event.keyCode==77){ //m
        player2down=true;
    }
}
function keyup(event){
    if(event.keyCode==81){ //q
		player1up=false;
	}
    if(event.keyCode==90){ //z
        player1down=false;
    }
    if(event.keyCode==79){ //o
        player2up=false;
	}
    if(event.keyCode==77){ //m
        player2down=false;
    }
}

function ballmoves(){
	ballX += speedX;
	ballY += speedY;
	ball.style.left=ballX+"px";
	ball.style.top=ballY+"px";
}

function checksBallBorderTouch(){
	if(ballY<=0 || ballY>=masterHeight-(radius*2)){
		signY=(signY==1)?-1:1;
		speedY=signY*speedY;
	}
}

function checksBarBallTouch(){
	if(ballX<=barsWidth){
		if(barsHeight+bar1Y>=ballY+radius && bar1Y<=ballY+radius){
			signX=(signX==1)?-1:1;
			speedX=signX*speedX;
		}
		else{
			winnerNumber=2;
		}
	}
	else if(ballX>=(masterWidth-barsWidth)-(radius*2)){
		if(barsHeight+bar2Y>=ballY+radius && bar2Y<=ballY+radius){
			signX=(signX==1)?-1:1;
			speedX=signX*speedX;
		}
		else{
			winnerNumber=1;
		}
	}
}

function speedIncreaser(){
	if(stopper==250){
		speedX=4*signX;
		speedY=4*signY;
	}
	else if(stopper==500){
		speedX=6*signX;
		speedY=6*signY;
	}
	else if(stopper==750){
		speedX=8*signX;
		speedY=8*signY;
	}
	else if(stopper==1000){
		speedX=10*signX;
		speedY=10*signY;
	}
	else if(stopper==1250){
		speedX=12*signX;
		speedY=12*signY;
	}
}

function resultPrinter(){
	if(winnerNumber!=null){
		clearInterval(my);
		m.style.width=masterWidth+"px";
		m.style.height=masterHeight+"px";
		m.style.opacity=0.5;
		m.innerHTML="Game Over. Player"+winnerNumber+" Wins!";
	}
	else if(stopper==100000){
		clearInterval(my);
	}
	stopper++;
}

/*
//    m=(y-ypre)/(x-xpre);
	if(x==50 || x==1150){
		x=x
	}
			
			
			x++;
		}
		else if(x==1150){
			if(bar2Y>=y-100 && bar2Y<=y){ //checks if bar2 managed to touch the ball in time
				//bounce code
				
				
			}
			
			
			x++;
		}
//		else{
//			x--;
//		}
		if(y==0 || y==550){
			y++;
		}
//		else if(y==0 && ypre<y){
//			y--;
//		}

		if(x<=1100 || y<=550){
			//bounce back at same angle
			x--;
			y--;
		}		

		if(count<=50){
			document.getElementById("ballid").style.top=count+"px";
			document.getElementById("ballid").style.right=count+"px";
		}
		else{
			document.getElementById("ballid").style.top=500-count+"px";
			document.getElementById("ballid").style.top=500-count+"px";
		}
*/