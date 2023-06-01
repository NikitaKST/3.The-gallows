// Изначально рисовать пустую виселицу
// - 1 добавляется голова
// - 1 добавляется тело
// - 1 добавляется левая рука
// - 1 добавляется правая рука
// - 1 добавляется левая нога
// - 1 добавляется правая нога
// - 1 game over

const canvas = document.getElementsByTagName("canvas")[0]; // метод который находит первый элемент с тегом canvas на странице и сохраняет его в переменную canvas.
const canvasContext = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 220;

function drawPerson(errorsCount) {
  canvasContext.clearRect(0, 0, 100, canvas.height); // очищает область холста
  canvasContext.fillRect(5, 140, 80, 10); //вертикальный прямоугольник
  canvasContext.fillRect(7, 10, 5, 130); //горизонтальный прямоугольник
  canvasContext.lineWidth = 3; //толщину линии для последующих рисунков

  canvasContext.beginPath(); //новый путь на холсте.
  canvasContext.strokeStyle = 'black'; //цвет линии для последующих рисунков
  if(errorsCount > 0) { //если нет ошибок
    // стойка
    canvasContext.fillRect(10, 15, 40, 3); //веревка
    canvasContext.fillRect(40, 15, 2, 10);
  }

  if(errorsCount > 1) { //если ошибок больше 1
    // голова
    canvasContext.arc(41, 40, 15, 0, 360); //метод для создания окружности

    canvasContext.moveTo(35, 33); //метод для перемещения "кисточки" 
    canvasContext.arc(35, 35, 1, 0, 360); //левый глаз

    canvasContext.moveTo(47, 33);//перемещаем "кисточку" на новое место 
    canvasContext.arc(47, 35, 1, 0, 360);//правый глаз

    canvasContext.moveTo(49, 50); //снова перемещаем
    canvasContext.arc(41, 55, 10, -(Math.PI * 0.2), Math.PI + (Math.PI * 0.2), true); //дуга
  }

  if(errorsCount > 2) {
    // тело
    canvasContext.moveTo(41, 55); //перемещаем
    canvasContext.lineTo(41, 95); //тело 
  }

  if(errorsCount > 3) { 
    // левая рука
    canvasContext.moveTo(41, 60);
    canvasContext.lineTo(30, 80);
  }

  if(errorsCount > 4) {
    // правая рука
    canvasContext.moveTo(41, 60);
    canvasContext.lineTo(52, 80);
  }

  if(errorsCount > 5) {
    // левая нога
    canvasContext.moveTo(41, 95);
    canvasContext.lineTo(30, 120);
  }

  if(errorsCount > 6) {
    // правая нога
    canvasContext.moveTo(41, 95);
    canvasContext.lineTo(52, 120);
  }
  canvasContext.stroke();//метод. выводит все что было нарисовано выше
}

function drawBoard(lettersState) { //рисует доску для игры
  canvasContext.font = "35px serif"; //задает шрифт 
  const leftPadding = 120; //от левого края до первой буквы
  const lettersInLine = 8; //количество букв в одной линии
  canvasContext.lineWidth = 2;  //подчеркивание
  canvasContext.clearRect(leftPadding - 10, 0, canvas.width - leftPadding, canvas.height - 60); //очищает область для отрисовки доски
  
  for(let i = 0; i < lettersState.length; i++) {//перебирает массив с буквами
    const currentLetter = lettersState[i]; //задает текущую букву
    const yPosition = 35 * Math.floor((i / lettersInLine) + 1); //поз. по вертикали
    const xPosition = leftPadding + i % lettersInLine * 35; // поз. по горизонтали
    canvasContext.fillText(currentLetter.char, xPosition, yPosition); //тек. буква на доске

    if(currentLetter.success) { //если правильно обводил букву зел. кругом
      canvasContext.beginPath();
      canvasContext.strokeStyle = 'green';
      canvasContext.moveTo(xPosition + 25, yPosition - 10);
      canvasContext.arc(xPosition + 10, yPosition - 8, 15, 0, 360);
      canvasContext.stroke();
    }

    if(currentLetter.error) { //если не правильно зачеркивает
      canvasContext.beginPath();
      canvasContext.strokeStyle = 'red';
      canvasContext.moveTo(xPosition, yPosition - 15);
      canvasContext.lineTo(xPosition + 15, yPosition);
      canvasContext.moveTo(xPosition + 15, yPosition - 15);
      canvasContext.lineTo(xPosition, yPosition);
      canvasContext.stroke();
    }
  }
}

function setDefaultKeyboard() {//устанавливает на доске клавиатуру по умолчанию, вызывая функцию drawBoard(lettersState)
  lettersState = JSON.parse(JSON.stringify(defaultKeyboard));
  drawBoard(lettersState);
}

function drawAnswerState(answerState) {//текущее состояние слова на доске на опред месте
  const xPosition = 100;
  const yPosition = 180;
  canvasContext.clearRect(xPosition, yPosition-30, canvas.width - xPosition, 40);
  canvasContext.font = "40px serif";
  canvasContext.fillText(answerState.join(''), xPosition, yPosition);
}

function winGame() {
  setTimeout(() => {
    alert("Победа 🎉");
    startGame();
  });
}

//Функция winGame() выводит сообщение о победе в игре, затем вызывает функцию startGame(). Сообщение выводится через 1 секунду после окончания игры с помощью setTimeout().

document.addEventListener("keydown", (e) => {
  const key = e.key.toLocaleLowerCase();
  if(lettersState.map(key => key.char).includes(key)) {
    onKeyClick(key);
  }

  if(['escape', 'enter'].includes(key)){
    startGame();
  }
});


//Данный код добавляет обработчик события "keydown" на объект документа. Когда пользователь нажимает клавишу на клавиатуре, этот обработчик запускается и срабатывают две проверки.

//В первой проверке код получает значение клавиши, которую нажал пользователь, и проверяет, есть ли такая буква в массиве lettersState, который содержит информацию о состоянии клавиш на клавиатуре. Если такая буква есть, то вызывается функция onKeyClick, которая отмечает букву как правильно угаданную или неправильно угаданную.

//Во второй проверке код проверяет, нажата ли клавиша "Escape" или "Enter". Если да, то игра начинается заново с помощью вызова функции startGame.

//В целом, данный код отвечает за обработку нажатий клавиш на клавиатуре во время игры.