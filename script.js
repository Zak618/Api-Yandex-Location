// Функция для поиска ближайшей станции метро по адресу
function findNearestMetro() {
    // Получаем значение адреса из поля ввода с идентификатором 'address'
    const address = document.getElementById('address').value;

    // Получаем элемент для вывода результата поиска с идентификатором 'result'
    const result = document.getElementById('result');
    
    // Устанавливаем текст "Загрузка..." в элемент вывода результата
    result.innerHTML = '<span class="loading">Загрузка...</span>';
  
    // Создаем новый экземпляр XMLHttpRequest для асинхронного обмена данными с сервером
    const xhr = new XMLHttpRequest();

    // Инициализируем новый запрос с методом POST и адресом обработчика 'find_nearest_metro.php'
    xhr.open('POST', 'find_nearest_metro.php', true);

    // Устанавливаем заголовок 'Content-Type' для передачи данных формы
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    // Функция-обработчик, вызываемая при изменении состояния запроса
    xhr.onreadystatechange = function() {
        // Проверяем, что запрос завершен (readyState === 4) и статус HTTP-ответа равен 200 (успешно)
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Если ответ не пустой, выводим его содержимое в элементе 'result'
            if (xhr.responseText) {
                result.innerHTML = xhr.responseText;
            } else {
                // Если ответ пустой, выводим сообщение об ошибке
                result.innerHTML = '<span class="error">Не удалось получить результат. Попробуйте еще раз.</span>';
            }
        } else if (xhr.readyState === 4) {
            // Если запрос завершен, но статус HTTP-ответа не равен 200, выводим сообщение об ошибке
            result.innerHTML = '<span class="error">Произошла ошибка. Попробуйте еще раз.</span>';
        }
    };
  
    // Функция-обработчик, вызываемая в случае ошибки сети
    xhr.onerror = function() {
        // Выводим сообщение об ошибке
        result.innerHTML = '<span class="error">Произошла ошибка. Попробуйте еще раз.</span>';
    };
  
    // Отправляем запрос с данными формы (адрес)
    xhr.send('address=' + encodeURIComponent(address));
}