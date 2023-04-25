<?php

// Проверяем, что текущий запрос является POST-запросом и содержит поле 'address'
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['address']))  {
    // Получаем и обрабатываем значение поля 'address'
    $address = htmlspecialchars($_POST['address']);

    // Устанавливаем API-ключ Яндекс.Карт
    $apiKey = 'ccb7ac7b-a876-4c17-9007-49d5160ba7e3';
    
    // Формируем URL-адрес для запроса координат указанного адреса
    $url = "https://geocode-maps.yandex.ru/1.x/?apikey=$apiKey&geocode=" . urlencode($address) . "&format=json";

    // Отправляем запрос и получаем ответ в виде строки JSON
    $response = file_get_contents($url);

    // Разбираем JSON-ответ и преобразуем его в ассоциативный массив
    $data = json_decode($response, true);

    // Извлекаем координаты (широту и долготу) указанного адреса
    $coordinates = $data['response']['GeoObjectCollection']['featureMember'][0]['GeoObject']['Point']['pos'];

    // Разделяем координаты на широту и долготу
    list($longitude, $latitude) = explode(' ', $coordinates);

    // Формируем URL-адрес для запроса ближайшей станции метро с использованием полученных координат
    $url_metro = "https://geocode-maps.yandex.ru/1.x/?apikey=$apiKey&geocode=$longitude,$latitude&kind=metro&format=json";

    // Отправляем запрос и получаем ответ в виде строки JSON
    $response_metro = file_get_contents($url_metro);

    // Разбираем JSON-ответ и преобразуем его в ассоциативный массив
    $data_metro = json_decode($response_metro, true);

    // Извлекаем название ближайшей станции метро
    $nearest_metro = $data_metro['response']['GeoObjectCollection']['featureMember'][0]['GeoObject']['name'];

    // Выводим результат в виде строки "Ближайшая станция метро: {название станции}"
    echo "Ближайшая станция метро: " . $nearest_metro;
}
?>