//1) Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию. Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
//2) Заполнить созданную таблицу буквами, отвечающими за шахматную фигуру, например К-король, Ф – ферзь и тп., причем все фигуры должны стоять на своих местах и быть соответственно черными и белыми.

function task_1_2(){
	let body = document.getElementsByTagName("body")[0];

		
	let board = document.createElement("div");
	//board.innerHTML = "style=	grid-template-columns: 1fr repeat(8, 1fr) 1fr; grid-template-rows: 1fr repeat(8, 1fr) 1fr;>";
	//это уже совсем дурацкие попытки были добавить стили гриду
	
	//вот по этой ссылке вроде как лист всех стилей которые можно добавить и гридов там нет
	//https://www.w3schools.com/jsref/dom_obj_style.asp
	
	//ява скрипт не работает с гридами не получилось добавить грид-стили и пришлось добавлять css файл
	//зато теперь знаю что сгенерированный хтмл-класс подхватывает стили из css файла
	
	board.className = "chess_board";
	
	body.appendChild(board);	
	
	let i = 0, j = 0;
	let cells = [//я не нашел как создавать многомерные массивы уже поздно хочу спать потом спрошу не получается создать многомерный массив иным способом бред какой-то читать некогда
		[0,1,2,3,4,5,6,7,8,9],
		[0,1,2,3,4,5,6,7,8,9],
		[0,1,2,3,4,5,6,7,8,9],
		[0,1,2,3,4,5,6,7,8,9],
		[0,1,2,3,4,5,6,7,8,9],
		[0,1,2,3,4,5,6,7,8,9],
		[0,1,2,3,4,5,6,7,8,9],
		[0,1,2,3,4,5,6,7,8,9],
		[0,1,2,3,4,5,6,7,8,9],
		[0,1,2,3,4,5,6,7,8,9]
		];
	let literals = [null, "a", "b", "c", "d", "e", "f", "g", "h", null];
	let whiteChess = [null, "&#9814", "&#9816", "&#9815", "&#9813", "&#9812", "&#9815", "&#9816", "&#9814", null];
	let blackChess = [null, "&#9820", "&#9822", "&#9821", "&#9819", "&#9818", "&#9821", "&#9822", "&#9820", null];
		
	//console.log(cells);
	for(i = 0; i<10; i++){
		for(j=0; j<10; j++){
			cells[i][j] = document.createElement("div");
			//cells[i][j].innerHTML = "cell "+i+" "+j;
			board.appendChild(cells[i][j]);
			cells[i][j].className = "cell_"+i+"_"+j;
			if((i+j)%2 == 0) cells[i][j].style.backgroundColor = "yellow";
			else cells[i][j].style.backgroundColor="brown";
			if(i==0 || i==9 || j==0 || j==9){
				cells[i][j].style.backgroundColor = "white";
				cells[i][j].style.border = "1px solid black";
			}
			if(i==0 || i==9){
				cells[i][j].innerHTML = literals[j];
			}
			if( (j==0 || j==9) && (i>0 && i<9 ) ){
				cells[i][j].innerHTML = 9-i;
			}
			if(i==1 && 0<j && j<9)cells[i][j].innerHTML = blackChess[j];
			if(i==2 && 0<j && j<9)cells[i][j].innerHTML = "&#9823";//пешки
			if(i==8 && 0<j && j<9)cells[i][j].innerHTML = whiteChess[j];
			if(i==7 && 0<j && j<9)cells[i][j].innerHTML = "&#9817";//пешки
		}
	}		
}
task_1_2();
