var childs = document.getElementsByClassName('child');// получаем все блоки, участвующие в игре

for (let i = 0; i < childs.length; i++) {//вешаем событие для проверки, чтобы игра начиналась после нажатия на кнопку старт
    childs[i].onclick = function () {
        if (document.getElementById('timercount').innerHTML === '00:00.000') {
            alert('Нажмите СТАРТ');
        }
    };
}

function startGame() {//выполняемая функция при нажатии на старт
    var btn_start = document.getElementById('btn_start').value;//получение статуса по кнопке

    if (btn_start === 'Старт') {
        document.getElementById('timercount').innerHTML = '00:00.000';//сбрасываем счетчик
        document.getElementById('btn_start').value = 'Стоп';//меняем статус
        var masBlock = [];//пустой массив для блоков из певой строки
        for (let i = 0; i < childs.length; i++) {//помещаем полученные блоки
            masBlock.push(childs[i].outerHTML);// из первой строки в массив поэлементно
        }

        masBlock = shuffle(masBlock);//мешаем блок, функция ниже
        document.getElementById('block').innerHTML = masBlock.join('');//соединяем массив  в строку и вставляем обратно в DOM

        timer();// запускаем таймер
        for (let i = 0; i < childs.length; i++) {
            childs[i].style.backgroundColor = 'white';//перекрашиваем блоки в белый, на всякий случай
        }

        var masSelect = [];//пустой массив в помощь для проверки кликнутых блоков
        var classMassMain;// определил заранее переменную
        for (let i = 0; i < childs.length; i++) {//вешаем событие onclick на все блоки участвующие в игре
            childs[i].onclick = function () {
                if (document.getElementById('timercount').innerHTML === '00:00.000') {//проверка после остановки игры, что таймер на нуле
                    alert('Нажмите СТАРТ');
                    return;
                }
                if (document.getElementById('btn_start').value === 'Стоп') {//проверка статуса
                    classMassMain = this.classList;// получаем список классов блока на который кликнули

                    if (document.getElementsByClassName(this.classList[1] + ' select').length !== 2 && masSelect.length === 0) {//проверка игровой области. массив с цветами пуст и цвет кликнутого квадрата еще не выбран первый раз
                        this.style.backgroundColor = classMassMain[1];//красим блок в цвет из класса
                        this.classList.add('select');//добавляем метку что блок выбран
                        masSelect.push(classMassMain[1]);//добавляем в массим цвет кликнутого блока
                    } else if (document.getElementsByClassName(this.classList[1] + ' ' + this.classList[2]).length === 2) {//проверка на клик уже угаданного цвета
                        alert('Цвет уже угадан!');
                    } else if (this.classList[1] === classMassMain[1] && this.classList[2] === 'select') {//проверка на повторный клик первого блока с кликнутым цветом
                        alert('Не кликать на один и тот же квадрат!');
                    } else if (masSelect.indexOf(classMassMain[1]) >= 0) {//проверка есть ли совпадение в массиве с цветом кликнутого цвета
                        this.style.backgroundColor = classMassMain[1];//красим блок в цвет из класса
                        this.classList.add('select');//добавляем метку что блок выбран
                        masSelect = [];//очищаем массив с цветами кликнутых блоков
                        var selectClass = document.getElementsByClassName('select').length;
                        if (selectClass === 16) {//завершить игру если все цвета поучавстоввали в игре
                            alert('Игра окончена. Ваше время ' + document.getElementById('timercount').innerHTML);//модальное окно
                            document.getElementById('btn_start').value = 'Старт';//сброс статуса
                            for (let i = 0; i < selectClass.length; i++) {//удаляем класс выборки
                                selectClass[i].classList.remove('select');
                            }
                        }
                    } else {//условие если цвет не угадан

                        document.getElementsByClassName(masSelect[0] + ' select')[0].style.backgroundColor = "white";
                        document.getElementsByClassName(masSelect[0] + ' select')[0].classList.remove('select');
                        masSelect = [];
                    }
                }
            }
        }
    }
    if (btn_start === 'Стоп') {//действие при нажатии на стоп при активной игре. всё сбрасываем
        document.getElementById('btn_start').value = 'Старт';
        alert('Ваше время ' + document.getElementById('timercount').innerHTML + '. Оно будет сброшено.');
        for (let i = 0; i < childs.length; i++) {
            childs[i].style.backgroundColor = 'white';
            childs[i].classList.remove('select');
        }
    }


}


function shuffle(massive) { //название как в php
    var randomIndex, tempIndex; //текущий индекс, начинаем с начала
    var length=massive.length;
    for (var i = 0; i < length - 1; i++) {//перобор массива с начала
        randomIndex = Math.floor(Math.random() * (i + 1));//вычисляем рандомное число которое будет не больше длины массива
        tempIndex = massive[randomIndex]; //присваиваем значение из массива в рандомной позиции в переменную
        massive[randomIndex] = massive[i];//присваиваем значение из позиции i в рандомную
        massive[i] = tempIndex;// в позицию i сохраняем значение из рандомной позиции

    }
    return massive;//получаем массив на выходе
}

function timer() {//таймер

    var timerCount = document.getElementById('timercount').innerHTML;//получаем текущее значение таймера

    var massTime = timerCount.split(':');//разделяем на минуты и секунды
    var m = +massTime[0];//минуты
    var s = +massTime[1];//секунды
    const t = 0.005;//шаг

    if (m > 59) {//условие для завершения игры
        if (s >= 60) {
            alert('Начните игру заново');
            return;
        }

    } else {//иначе

        s = s + t;//увеливаем шаг
        if (s >= 60) {//условия для увеличения минут
            m = m + 1;
            s = 0.000;
        }
        if (m < 10) {//для отображения в формате 01, 02
            m = '0' + m
        }
        if (s < 10) {//для отображения в формате 01, 02
            var d = 0
        } else {
            d = '';
        }
    }
    document.getElementById('timercount').innerHTML = m + ':' + d + s.toFixed(3);
    if (document.getElementsByClassName('select').length === 16 || document.getElementById('btn_start').value === 'Старт') {//если угаданы все цвета или нажат стоп
        clearTimeout(timer);//сбросить таймер
        document.getElementById('timercount').innerHTML = '00:00.000';//сбросить таймер
    } else {
        setTimeout(timer, 1);//повторить еще раз функцию
    }


}