/**
 * Обработка событий
 */

let willBeClicked = document.querySelector(".willBeClicked");
willBeClicked.onclick = function() {
    alert("Кликнули на willBeClicked");
}

function willBeClickedAgain() {
    alert("Кликнули на willBeClicked еще раз");
}

let testInClick = document.querySelector(".testInClick");
testInClick.onclick = function() {
    alert("Кликнули на testInClick");
    willBeClicked.onclick = willBeClickedAgain;
}

//addEventListener и removeEventListener
let firstLi = document.querySelector("ul li:first-child");
//firstLi.removeEventListener("click", firstLiClick);

function firstLiClick() {
    firstLi.removeEventListener("click", firstLiClick);
    firstLi.addEventListener("click", firstLiClick2);
    alert("firstLi clicked first time");
}
function firstLiClick2() {
    firstLi.removeEventListener("click", firstLiClick2);
    firstLi.addEventListener("click", firstLiClick);
    alert("firstLi clicked first time again");
}
firstLi.addEventListener("click", firstLiClick);

/**
 * Слайдер/галерея
 */
let loopInterval;   //Глобальный loop указатель
let loopCount = 1;  //Счетчик смены картинок
let timer = 2000;   //Таймер переключения картинок

/* Первая версия без перехвата loopCount
function loopPics(images) {
    let picTarget = {
        target: images[loopCount]
    };
    changeBigPicture(picTarget);
    loopCount++;
    if (loopCount == images.length) {
        loopCount = 0;
    }
}

function init() {
    let images = document.querySelectorAll(".slider_pics img");
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener("click", changeBigPicture);
    }
    loopInterval = setInterval(loopPics, timer, images);
}

function changeBigPicture(event) {
    //console.log(event);
    let appBigPic = document.getElementById("big_picture");
    let clickedElement = event.target;
    //console.log(clickedElement);
    let src = clickedElement.getAttribute("src");
    console.log(src);
    appBigPic.src = src;
}*/

//2 версия с перехватом loopCount
//добавлены 2 защиты; 
function loopPics(images) {
    changeBigPicture(loopCount, images[loopCount].src);
    loopCount++;
    if (loopCount == images.length) {
        loopCount = 0;
    }
}

function init() {
    let images = document.querySelectorAll(".slider_pics img");// вот эта строка создает массив images который может содержать путь с ошибкой его и проверим)))
/////////////////////начало защита №1 ВНИМАНИЕ! ЕСЛИ ХОТИТЕ ПОЛНОСТЬЮ УВИДЕТЬ РАБОТУ ЗАЩИТЫ №2 ТО ЭТУ ЗАЩИТУ ОТКЛЮЧИТЕ!!!
	let images_temp = new Array();

	for (let i = 0; i < images.length; i++){
		if(images[i].naturalWidth>0){
			images_temp.push(images[i]);
		}
	}
	//а теперь чистим исходный массив, кладем туда проверенный массив и чистим память от проверки
	images = null; 
	images = images_temp;
	images_temp = null;
//////////////конец  защита №1	

    for (i = 0; i < images.length; i++) {
        images[i].addEventListener("click", function() {
            changeBigPicture(i, images[i].src);
        });
    }
    loopInterval = setInterval(loopPics, timer, images);
}

function changeBigPicture(index, src) {
    let appBigPic = document.getElementById("big_picture"); //перед тем, как передавать src в большую картинку проверим его защита №2
	//ЗАЩИТА №2
	
	let temp_img = document.createElement("img");
	temp_img.src = src;
	temp_img.onerror = function(){
		alert("Картинка по пути" + src + " не существует");
	}
	temp_img.onload = function(){
		appBigPic.src = src;	
		alert("Картинка по пути" + src + " загружена");
		
	}
	/*
    appBigPic.src = src;
    loopCount = index;
	}*/
}

window.onload = init;