## Подключение
```
<link rel="stylesheet" href="myplugin.css">
<script src="myplugin.js"></script>
```

## Требования к разметке
Контейнер дожен содержать список ul, слайды (с любым содержимым) вложены в пункты списка li. Например:
```
<div class="container">
  <ul>
    <li>
      <img src="1.jpg" alt="">
    </li>
    <li>
      <img src="2.jpg" alt="">
    </li>
  </ul>
</div>
```

Для добавления кнопок пагинации следует использовать span внутри контейнера с классом myplugin-pagination:

```
<div class="myplugin-pagination">
  <span></span>
  <span></span>
  <span></span>
</div>
```
Данная разметка должна быть внутри контейнера, содержащего список ul со слайдами.

## Использование
```
$('.container').myPlugin();
```

## Опции

### Автопрокрутка

По умолчанию автопрокрутка включена. Для ее отключения используйте следующую опцию:

```
$('.container-new').myPlugin({
  'autoScroll' : false
});
```

### Количество слайдов

По умолчанию одновременно показывается один слайд. Чтобы изменить это количество, используйте опцию slideCount:

```
$('.container-new').myPlugin({
  'slideCount' : 3
});
```

## Демо
[https://paulinekorkina.github.io/carousel-plugin/](https://paulinekorkina.github.io/carousel-plugin/)