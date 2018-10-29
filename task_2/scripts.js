///прошу прощения - код может показатья корявым - спешу)
// но вначале нужна хотя бы такая реализация чтобы потом уже подумать о классах

class Product{
	constructor(_name,_price,_description,_button){
		this.name = _name;
		this.price = _price;
		this.description = _description;
		this.l_button=_button;
	}
}
	
	
let page_products = document.getElementsByClassName("c_product");
let js_products = new Array();

let name, price, description, l_button;

let basket = new Array(); //корзина
let page_price=document.getElementById("shopping-cost"); //указатель на цену на стрнанице
let page_products_quantity=document.getElementById("shopping-amount"); //указатель на количество товаров на стрнанице

let page_price_num=0;

function addProduct(product){
	basket.push(product); //длбавили в корзину товар
	page_products_quantity.innerHTML=basket.length;	
	page_price_num+=parseInt(product.price);
	page_price.innerHTML=page_price_num;	
}

for(let i=0; i<page_products.length; i++){
	name = page_products[i].getElementsByClassName("name")[0].innerHTML;
	price = page_products[i].getElementsByClassName("good-money")[0].innerHTML;
	description = page_products[i].getElementsByClassName("desc")[0].innerHTML;	
	l_button = page_products[i].getElementsByClassName("buy")[0];
	let product = null;
	product = new Product(name, price, description, l_button);
	js_products.push(product);
	
	l_button.addEventListener("click", function(){ 
		addProduct(product); //механизм работы такого синтаксиса хотелось бы обсудить куда девается и хроанится product - пронятно плохо он остается в обработчике событий?
	});
        
/*
	console.log(js_products[i].name, js_products[i].price, js_products[i].description, js_products[i].l_button);
	console.log(page_products[i]);
	console.log("");
	*/

}


