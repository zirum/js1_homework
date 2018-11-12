function Container()
{
  this.id = "";
  this.className = "";
  this.htmlCode = "123";
}

Container.prototype.render = function()
{
   return this.htmlCode;
}

function Menu(my_id, my_class, my_items){
   Container.call(this);
   this.id = my_id;
   this.className = my_class;
   this.items = my_items;
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function(){
	var result = "<ul class='"+this.className+"' id='"+this.id+"'>";
	
	for(var item in this.items){
		if(this.items[item] instanceof MenuItem){
			result += this.items[item].render();
		}
	}
	
	result += "</ul>";
	
	return result;
}

Menu.prototype.remove = function(deleteItem){
	var result = "<ul class='"+this.className+"' id='"+this.id+"'>";
	
	for(var item in this.items){{
		if(this.items[item] instanceof MenuItem){
			if(this.items[item] instanceof MenuItem)
			//НЕ УСПЕЛ
			//IF(CLASSNAME == "delMePlease" )ТОГДА УДАЛЯЕМ ЭЛЕМЕНТ 
			//ИЗ СМАССИВА ПРИ ПОМОЩИ МЕТОДА SPLICE
		}
	}
}

function MenuItem(my_href, my_name, my_class_Name="menu-item"){
   Container.call(this);
   this.className = my_class_Name;
   this.href = my_href;
   this.itemName = my_name;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function(){
	return "<li class='"+this.className+"' href='"+ this.href +"'>" + this.itemName + "</li>";
}

var m_item1 = new MenuItem("/", "Главная");
var m_item2 = new MenuItem("/catalogue/", "Каталог");
var m_item3 = new MenuItem("/gallery/", "Галерея");
var m_item4 = new MenuItem("/remove_item/", "А меня удаляем", "delMePlease");
var m_items = {0: m_item1, 1: m_item4, 2: m_item2, 3: m_item3};

var menu = new Menu("my_menu", "My_class", m_items);
var div = document.write(menu.render());