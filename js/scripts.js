	function input_n(n){
		var inp=parseInt(prompt("Введите целое значение от 0 до " + n,n));
		if(inp<0 || inp>n){
			alert("Введенное значение лежит вне промежутка [0.."+n+"]");
			input_n();
		}
		else return inp;
	}
	
	function input_n_hallo(n,hallo){
		var inp=parseInt(prompt(hallo + n,n));
		if(inp<0 || inp>n){
			alert("Введенное значение лежит вне промежутка [0.."+n+"]");
			input_n();
		}
		else return inp;
	}


//1) С помощью цикла while вывести все простые числа в промежутке от 0 до 100
function task_1(){
	function is_simple(integer){
		
		if(integer<=1)return false;//число 1 простым не считается
		
		let sqrtFloor=Math.floor(Math.sqrt(integer));//достаточно проверить целые множители размером меньше либо равными корню из проверяемого числа
		
		for(let i=2;i<=sqrtFloor;i++){
			if(integer%i==0)return false;
		}
		return true;//выполняется если не нашел ни одного множителя и не вышел в блоке с условием
	}
	
	let num=0;
	let interval=input_n(100);
	let index=1;
	while(num<=interval){
		if(is_simple(num)){
			console.log(index+" - ое простое число равно " + num);
			index++;
		}
		num++;
	}
	
	
	
}



/*
2) С помощью цикла do…while написать функцию для вывода чисел от 0 до 10, чтобы результат выглядел так:
0 – это ноль
1 – нечетное число
2 – четное число
3 – нечетное число
…
10 – четное число
*/
function task_2(){
	let i=0;
	do{
		if(i==0){console.log(i + " - это ноль");i++;continue;}//оптимальнее было вынести печать нуля за скобки чтобы проверка на ноль не выполнялась 10 раз но от меня явно хотят этой строки
		if(i%2==1)console.log(i + " - нечетное число");
		else if(i%2==0)console.log(i + " - четное число");
		i++;
	}while(i<=10);
	
}



/*
3) * Вывести с помощью цикла for числа от 0 до 9, НЕ используя тело цикла. То есть выглядеть должно вот так:
for(…){// здесь пусто
*/
function task_3_v1(){
	let i;
	for(i=0;i<10;console.log(i++)){};
}

function task_3_v2(){
	let i, a=new Array();
	for(i=0;i<10;a.push(i++) ){};
	console.log(...a);
	
}

function task_3_v3(){
	let i, str, a=new Array();
	for(i=0;i<10;a.push(i++) ){};
	str=a.join(", ");
	console.log(str);
	
}


/*
4) * Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:

x
xx
xxx
xxxx
xxxxx
*/

function task_4(){
	let i, a=new Array(), str;
	for(i=0;i<20;i++){
		a.push("x");
		str=null;
		str=a.join('');
		console.log(str);
	};
		
}

/*
5) * Начиная с этого урока, мы начинаем работать с функционалом одностраничного интернет-магазина. Предположим, что у нас есть сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров. Товары в корзине хранятся в массиве (пока в виде чисел, которые равны стоимости товара).
5.1) Организуйте такой массив для хранения товаров в корзине
5.2) Организуйте функцию countBasketPrice (или иное название), которая будет считать стоимость корзины.
*/
function task_5(){
	let good, basket=new Array();
	let goods_n, price, sum_price=0;
	goods_n=input_n_hallo(100,"Введите количество товаров которые вы хотите купить от 0 до ");
	for(let i=0;i<goods_n;i++){
		price=input_n_hallo(1000000,"Введите стоимость "+(i+1)+"-го из " + goods_n + " товаров в диапазоне цен от 0 до " );
		basket.push(price);
		//sum_price+=price;
	}
	//alert("Общая стоимость всех товаров в вашей корзине равна " + sum_price +" включая НДС");
	
	function countBasketPrice(basketArray){
		let sum_price=0;
		for(let i in basketArray){
			sum_price+=basketArray[i];
		}
		return sum_price;
	}
	sum_price=countBasketPrice(basket);
	alert("Общая стоимость всех товаров в вашей корзине равна " + sum_price +" включая НДС");
	
}

task_1();
task_2();
task_3_v1();
task_3_v2();
task_3_v3();
task_4();
task_5();


















