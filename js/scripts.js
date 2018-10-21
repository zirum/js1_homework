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

//Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.

function task_1(){
	number={
		edinici: 0,
		desiatki: 0,		
		sotni: 0,
		put_number: function(n=0){
			this.edinici=n-10*Math.floor(n/10);
			this.sotni=Math.floor(n/100);
			this.desiatki=Math.floor(n-this.sotni*100-this.edinici)/10;
		},
		
		number_2_string: function(){
			return ""+this.sotni+this.desiatki+this.edinici;
		},
		
		number_2_val: function(){
			return 100*this.sotni+10*this.desiatki+this.edinici;
		}
	};
	var a=input_n(999);
	number.put_number(a);
	console.log(typeof(number.number_2_string())+"   "+typeof(number.number_2_val()));
	console.log(number.number_2_string()+"   "+number.number_2_val());
	console.log(number);
}
task_1();

//2) Продолжаем работу с нашим интернет-магазином 2.1. В прошлом ДЗ Вы реализовали корзину на базе массивов. Какими объектами можно заменить элементы данных массивов? 2.2. Реализуйте такие объекты 2.3. Перенесите функционал подсчета корзины на объектно-ориентированную базу

function task_2(){
	class Product{
		constructor(_name,_price,_description,_image_source){
			this.name=_name;
			this.price=_price;
			this.description=_description;
			this.image_source=_image_source;
		}

	}
	let basket= new Array();
	let a=new Product("Мясорубка", 3456, "Bosh", "img/bosh.jpg");
	let b=new Product("Телевизор", 43765, "Samsung", "img/samsung.jpg");
	let c=new Product("Стиральная машина", 15300, "Indesit", "img/indesit.jpg");
	basket.push(a);
	basket.push(b);
	basket.push(c);
	let sum=0;
	let list="";
	for(let i in basket){
		sum += basket[i].price;
		list += basket[i].name+" "+basket[i].description+", ";
	}
	list=list.slice(0,-2);
	console.log("Все вместе, а именно: " + list + " стоит: " + sum + " рублей")
}
task_2();

//ps страничка с корзиной в процессе...














