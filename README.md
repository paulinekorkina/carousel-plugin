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

## Использование

```
$('.container').myPlugin();
```
