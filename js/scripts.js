const FIELD_SIZE_X = 22;    //Размер поля по оси Х
const FIELD_SIZE_Y = 17;    //Размер поля по оси Y

let gameIsRunning = false;  //Игра на старте не запущена

let snake = []; //Сама змейка
let snakeSpeed = 200;   //Скорость движения змейки
let snakeDirection = "y+";  //Текущее направление змейки
let snakeTimer; //Таймер змейки

let foodTimer;  //Таймер еды
let foodCreationSpeed = 1000;   //Скорость появления еды
let numberOfFood = [3, 0];  //Количество еды. 0 элемент-макс количество, 1 элемент - количество на поле

////ДОБАВЛЕНО
let numberOfWALLS = [5, 0];  //Количество стен. 0 элемент-макс количество, 1 элемент - количество на поле
let wall = [];
let wallCount = 5;
let wallCurrentIndex = 0;
let wallDeleteIndex = 0;
////КОНЕЦ ДОБАВЛЕНО

let score = 0;  //Очки
////ДОБАВЛЕНО
let score_page = document.getElementById("snake_score");  //поле на странице со счетом игры
////КОНЕЦ ДОБАВЛЕНО

/**
 * Инициализация игрового пространства
 */
function init() {
    prepareGameField();
	createWall();

    //Обработчики на кнопки Старт и Новая игра
    document.getElementById("snake_start").addEventListener("click", startGame);
    document.getElementById("snake_renew").addEventListener("click", renewGame);

    //Событие-прослушка клавиатуры
    addEventListener("keydown", changeSnakeDirection);
}

/**
 * Функция подготовки игрового поля
 */
function prepareGameField() {
    let gameTable = document.createElement("table");
    gameTable.setAttribute("class", "game-table");

    //Цикл генерирующий ячейки игрового поля
    for (let y = 0; y < FIELD_SIZE_Y; y++) {
        let row = document.createElement("tr");
        row.setAttribute("class", "game-table-row row-" + y);

        for (let x = 0; x < FIELD_SIZE_X; x++) {
            let cell = document.createElement("td");
            cell.setAttribute("class", "game-table-cell cell-" + x + "-" + y);

            row.appendChild(cell);
        }

        gameTable.appendChild(row);
    }

    document.getElementById("snake_field").appendChild(gameTable);
}

/**
 * Генерация змейки 
 * Змейка будет состоять из двух элементов (два блока - голова и туловище)
 * Змейка по центру
 * Класс ячейки змейки - snake-unit
 */
function respawn() {
    let startCoordX = Math.floor(FIELD_SIZE_X / 2);
    let startCoordY = Math.floor(FIELD_SIZE_Y / 2);

    let snakeHead = document.getElementsByClassName("cell-" + startCoordX + "-" + startCoordY)[0];
    let prevSnakeHeadAttr = snakeHead.getAttribute("class");
    snakeHead.setAttribute("class", prevSnakeHeadAttr + " snake-unit");

    let snakeTail = document.getElementsByClassName("cell-" + startCoordX + "-" + (startCoordY - 1))[0];
    let prevSnakeTailAttr = snakeTail.getAttribute("class");
    snakeTail.setAttribute("class", prevSnakeTailAttr + " snake-unit");

    //Добавляем в массив ссылки на ячейки хвоста и головы
    snake.push(snakeTail);
    snake.push(snakeHead);
}

function moveSnake() {
    if (gameIsRunning == true) {
        //Соберем классы головы змейки
        let snakeHeadClasses = snake[snake.length - 1].getAttribute("class").split(" ");
        //console.log(snakeHeadClasses);
        //Сдвигаем голову на 1
        let newUnit;    //Переменная новой ячейки для головы
        let snakeCoords = snakeHeadClasses[1].split("-");
        //console.log(snakeCoords);
        let coordX = parseInt(snakeCoords[1]);
        let coordY = parseInt(snakeCoords[2]);
		
		//добавлено сквозь стенку
		if(coordX>=FIELD_SIZE_X-1 && snakeDirection == "x+")coordX=-1;
		if(coordX<=0 && snakeDirection == "x-")coordX=FIELD_SIZE_X;
		if(coordY<=0 && snakeDirection == "y-")coordY=FIELD_SIZE_Y;
		if(coordY>=FIELD_SIZE_Y-1 && snakeDirection == "y+")coordY=-1;
		/////coordX=-1;coordY=-1; - это потому что единица добавится потом и будет 0
		//конец добавлено
		
        if (snakeDirection == "y+") {
            newUnit = document.getElementsByClassName("cell-" + coordX + "-" + (coordY + 1))[0];
        } else if (snakeDirection == "y-") {
            newUnit = document.getElementsByClassName("cell-" + coordX + "-" + (coordY - 1))[0];
        } else if (snakeDirection == "x-") {
            newUnit = document.getElementsByClassName("cell-" + (coordX - 1) + "-" + coordY)[0];
        } else if (snakeDirection == "x+") {
            newUnit = document.getElementsByClassName("cell-" + (coordX + 1) + "-" + coordY)[0];
        }

        //проверяем, что newUnit - это не часть змейки
	    //также проверяем, что змейка не дошла до границы
        if (!isNamedUnit(snake, newUnit) && !isNamedUnit(wall, newUnit) && newUnit != undefined) {
            //Добавляем новую часть змейки
            newUnit.setAttribute("class", newUnit.getAttribute("class") + " snake-unit");
            snake.push(newUnit);
			//console.log(snake+"  "+newUnit);
			//console.log("+++"+snake.length);

            //если змейка не ела, подчищаем хвост
		    if(!haveFood(newUnit)){
                let removeSnake = snake.splice(0, 1)[0];    //Находим удаляемый элемент
				//console.log(removeSnake);
                let classes = removeSnake.getAttribute("class").split(" ");
				//console.log(classes);
                //удаление маркирующего класса snake-unit
				//точнее присвоение только первых двух классов без третьего=snake-unit
                removeSnake.setAttribute("class", classes[0] + " " + classes[1]);
            } else {
                numberOfFood[1]--;
            }
        } else {
            finishTheGame();
        }
    }
}

/**
 * Проверяем элемент на принадлежность змейке
 * @param array unit 
 */
 /*был оригинал
function isSnakeUnit(unit){
	let check = false;
	
	if(snake.includes(unit)){
		check = true;
	}
	
	return check;
}
*/
//Добавлено, модифицировали
function isNamedUnit(name, unit){
	let check = false;
	
	if(name.includes(unit)){
		check = true;
	}
	
	return check;
}
//конец добавлено

/**
 * Функция размещения еды на поле
 */
function createFood() {
    if (numberOfFood[1] < numberOfFood[0]) {
        let foodCreated = false;
        while (!foodCreated) {
            //Выбираем случайную клетку
            let foodX = Math.floor(Math.random() * (FIELD_SIZE_X));
            let foodY = Math.floor(Math.random() * (FIELD_SIZE_Y));

            let foodCell = document.getElementsByClassName("cell-" + foodX + "-" + foodY)[0];
            let foodCellClasses = foodCell.getAttribute("class").split(" ");

            //Если тут нет змейки, то размещаем еду
            if (!(foodCellClasses.includes("snake-unit") || foodCellClasses.includes("food-unit") || foodCellClasses.includes("wall-unit"))) {
                //ставим в выбранную ячейку едук
                foodCell.setAttribute("class", foodCellClasses.join(" ") + " food-unit");
                foodCreated = true;
                numberOfFood[1]++;
            }
        }
    }            
}

///////////////// ДОБАВЛЕНО
function createWall() {
	for(let i=0; i<wallCount; i++){
		let flag_wall_created = false;
		while(!flag_wall_created){
			let wallX = Math.floor(Math.random() * (FIELD_SIZE_X));
			let wallY = Math.floor(Math.random() * (FIELD_SIZE_Y));

			let wallCell = document.getElementsByClassName("cell-" + wallX + "-" + wallY)[0];
			let wallCellClasses = wallCell.getAttribute("class").split(" ");

			//Если тут нет змейки или еще чего,, то размещаем стену
			if (!(wallCellClasses.includes("snake-unit") || wallCellClasses.includes("food-unit") || wallCellClasses.includes("wall-unit"))) {
				//ставим в выбранную ячейку стену
				wallCell.setAttribute("class", wallCellClasses.join(" ") + " wall-unit");
				wall[wallCurrentIndex]=wallCell;
				wallCurrentIndex++;
				if(wallCurrentIndex>=wallCount)wallCurrentIndex=0;
				flag_wall_created=true;
			}
		}
	}
}

function modifyWall() {
	//чистим крайний элемент стены; 
	wallDeleteIndex=wallCurrentIndex+1;
	if(wallDeleteIndex >= wallCount){
		wallDeleteIndex = 0;
	}
	
	let removeWall = wall[wallDeleteIndex];//.splice(0, 1)[0];    //Находим удаляемый элемент
	//console.log(wallDeleteIndex+"   "+wall[wallDeleteIndex].getAttribute("class"));
	
	//чистим класс по этому адресу;
	let classes = wall[wallDeleteIndex].getAttribute("class").split(" ");
	wall[wallDeleteIndex].setAttribute("class", classes[0] + " " + classes[1]);
	
	//добавляем стену
	let flag_wall_modifyed = false;
	while(!flag_wall_modifyed){
		let wallX = Math.floor(Math.random() * (FIELD_SIZE_X));
		let wallY = Math.floor(Math.random() * (FIELD_SIZE_Y));

		let wallCell = document.getElementsByClassName("cell-" + wallX + "-" + wallY)[0];
		let wallCellClasses = wallCell.getAttribute("class").split(" ");

		//Если тут нет змейки или еще чего,, то размещаем стену
		if (!(wallCellClasses.includes("snake-unit") || wallCellClasses.includes("food-unit") || wallCellClasses.includes("wall-unit"))) {
			//ставим в выбранную ячейку стену
			wallCell.setAttribute("class", wallCellClasses.join(" ") + " wall-unit");
			wall[wallCurrentIndex]=wallCell;
			wallCurrentIndex++;
			if(wallCurrentIndex>=wallCount)wallCurrentIndex=0;
			flag_wall_modifyed=true;
		}
	}
//console.log(wallCurrentIndex+"  "+wallDeleteIndex);
}
          

///////////////////КОНЕЦ ДОБАВЛЕНО

/**
 * Проверяем встречу с едой
 */
function haveFood(unit){
	let check = false;
	
	let unitClasses = unit.getAttribute("class").split(" ");
	
	//змейка нашла еду
	if(unitClasses.includes("food-unit")){
		check = true;

		unit.setAttribute("class", unitClasses[0] + " " + unitClasses[1] + " " + unitClasses[3]);
		
		//создаём новую еду
		createFood();
		
		//увеличиваем очки
		score++;
		//Добавлено
		score_page.innerHTML = "Счёт: " + score;
		// Конец добавлено
		modifyWall();
	}

	return check;
}

function changeSnakeDirection(e) {
    //console.log(e.keyCode);
    switch(e.keyCode) {
        case 38:    //Если нажата клавиша вверх
            if (snakeDirection != "y+") {
                snakeDirection = "y-";
            }
            break;
        case 39:    //Если нажата клавиша вправо
            if (snakeDirection != "x-") {
                snakeDirection = "x+";
            }
            break;
        case 40:    //Если нажата клавиша вниз
            if (snakeDirection != "y-") {
                snakeDirection = "y+";
            }
            break;
        case 37:    //Если нажата клавиша влево
            if (snakeDirection != "x+") {
                snakeDirection = "x-";
            }
            break;
    }
}

/**
 * Старт игры
 */
function startGame() {
    gameIsRunning = true;
    respawn();

    snakeTimer = setInterval(moveSnake, snakeSpeed);
    foodTimer = setInterval(createFood, foodCreationSpeed);    
}

/**
 * Перезагрузки игры
 * */
function renewGame() {
    location.reload();
}

/**
 * Информация об остановке игры
 */
function finishTheGame() {
    gameIsRunning = false;

    alert("Игра окончена!");
}

window.onload = init;