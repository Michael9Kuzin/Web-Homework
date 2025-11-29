// ---------- Глобальная переменная (видна везде) ----------
let items = []; // массив объектов задач — глобальный (демонстрация)

// ---------- Локальная переменная внутри функции ----------
function add_item(name, price, amount) {
    // name: string, minutes: number
    // локальная переменная
    const item = {
        id: Date.now(),        // уникальный id
        name: String(name),
        price: Number(price),
        amount: Number(amount),
        bought: false
    };
    items.push(item);       // используем глобальную переменную
    render_items();          // обновляем отображение
}

// Функция подсчёта общего времени
function get_total_price() {
    // reduce — применение операторов/циклов в функциональном стиле
    return items.reduce(function (sum, i) {
        if (i.bought) {
            return sum + i.price * i.amount;
        } else {
            return sum;
        }
    }, 0);
}

// Обработчик удаления (колбэк в событии)
function remove_item(id) {
    items = items.filter(function (i) {
        return i.id !== id;
    });
    render_items();
}

function buy_item(isBought, id) {
    items.forEach(function (i) {
        if (i.id == id) {
            if (isBought) {
                i.bought = false;
            } else {
                i.bought = true;
            }
        }
    });
    render_items();
}

// ---------- Работа с DOM: рендер задач ----------
function render_items() {
    const container = document.getElementById('item_list');
    container.innerHTML = ''; // очистка

    // создаём элементы через цикл forEach
    items.forEach(function (i) {
        // создаём div задачи
        const div = document.createElement('div');
        div.className = 'item';

        // внутренняя часть: название и время
        const info = document.createElement('div');
        info.textContent = i.name + ' — ' + i.price + '$ (' + i.amount + ' штук)';

        // кнопка Удалить (анонимная функция в обработчике)
        const btn_remove = document.createElement('button');
        btn_remove.textContent = 'Удалить позицию';
        btn_remove.addEventListener('click', function () {
            // анонимная функция как колбэк — вызывает удаление по id
            remove_item(i.id);
        });

        const btn_buy = document.createElement('button');
        if (!i.bought) { btn_buy.textContent = 'Купить позицию'; }
        else { btn_buy.textContent = 'Отменить покупку'; }
        
        btn_buy.addEventListener('click', function () {
            // анонимная функция как колбэк — вызывает удаление по id
            buy_item(i.bought, i.id);
        });

        div.appendChild(info);
        div.appendChild(btn_remove);
        div.appendChild(btn_buy);
        container.appendChild(div);
    });

    // показ общего времени
    const total = get_total_price();
    document.getElementById('total_price').textContent = total;
}

/* ---------- Подключение формы через DOM API ---------- */
document.getElementById('item_form').addEventListener('submit', function (event) {
    event.preventDefault(); // отменяем перезагрузку
    const name = document.getElementById('item_name').value.trim();
    const price = parseInt(document.getElementById('item_price').value, 10);
    const amount = parseInt(document.getElementById('item_amount').value, 10);

    if (!name || isNaN(price) || price <= 0 || isNaN(amount) || amount <= 0) {
        alert('Введите корректные данные');
        return;
    }

    add_item(name, price, amount);

    // очищаем поля (локальные переменные)
    document.getElementById('item_name').value = '';
    document.getElementById('item_price').value = '';
    document.getElementById('item_amount').value = '';
});

/* ---------- Пример использования jQuery (альтернативный рендер) ---------- */
//Это необязательно если хотите можете застилизовать
$(function() {
// добавим кнопку для демонстрации jQuery: подсветить все задачи
   const jqBtn = $('<button>Подсветить задачи</button>').on('click', function() {
     $('#item_list .item').fadeOut(100).fadeIn(300); // jQuery-анимация
   });
   $('body').append(jqBtn);
});
