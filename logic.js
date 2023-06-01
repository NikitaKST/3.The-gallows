let answer = '';        //хранение ответа, словао ответ
let answerState = [];  //хранится состояние символов ответа неугаданное слова
let mistakesCount = 0; //количество совершенных ошибок
let lettersState;      // словарь возможных слов

startGame();

function startGame() { //функция запуска новой игры
  mistakesCount = 0; //обнуляем кол-во ошибок
  setDefaultKeyboard(); //сбрасываем состояние клавиатуры
  drawPerson(0); //начальное состояние игрового персонажа (передаем кол-во ошибок)
  drawBoard(lettersState); //приваивание массив с буквами
  generateWord(); // генерируем новое слово
}

function generateWord() { //функция которая генерирует новое число
  const randomValue = Math.floor(Math.random() * dictionary.length);//случайное число (умножаем на на длину слов в массиве)Math.floor округляем в меньшую сторону и присваеваем все значение в константу
  answer = dictionary[randomValue];//к переменной с хранением ответа приваиваем случайное слово
  answerState = new Array(answer.length).fill("*"); //присваиваем пустой массив с буквами слова заменяя их *
  drawAnswerState(answerState);//запускаем функцию текущее состояние слова на доске
}



function onKeyClick(letter) {//функция которая отвечает за кликнутую букву
  if(mistakesCount === 7){ //если ошибок 7 вывод в алерт игра окончена и запуск новой игры
    alert("Игра окончена. Загаданное слово - " + answer + "."); //выводим в окно
    startGame(); //запускаем новую игру
    return; //возвращаем значение, с 29 строки действие не будет выполняться
  }

  let letterFromState; //объект с буквой
  //ищем букву  
  for(let i = 0; i < lettersState.length; i++){ //перебираем букву с буквами в объекте
    if (lettersState[i].char === letter){ //если буквы равны
      letterFromState = lettersState[i]; //присвоили в переменную объект с буквой
    } 
  }

  
  //проверяем букву (она в объекте) что она не ошибочная (условие когда необходимо засчитать ошибку)
  if (!answer.includes(letter) && !letterFromState.error) { //ищем букву в слове и проверяем что онауже кликнутая
    mistakesCount++; //увеличиваем на 1
    letterFromState.error = true; 
  }


  
//проверяем наличие угаданных 
  if (answer.includes(letter) && !letterFromState.success) { //проверяем что буква есть и она еще не отмечалась
    letterFromState.success = true; //если есть неотмеченная буква то тру
    for(let i = 0; i < answer.length; i++){ //делаем перебор если букв несколько
      if (answer[i] === letter) {
        answerState[i] = letter;
      }
    }   
  }

  drawPerson(mistakesCount); //перерисовываем кол-во ошибок
  drawBoard(lettersState); //перерисовываем словарь слов
  drawAnswerState(answerState); // перерисовываем слово

  if(answerState.join("") === answer) { //заменяем пустую строку на слово
    winGame(); //запускаем функию выгрыша игры
  }
}
