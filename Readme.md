# Слайдер на основі прототипів (SwipeCarousel)

## Опис

Цей слайдер реалізований за допомогою функціонального конструктора `SwipeCarousel`, керувати слайдами за допомогою кнопок та клавіатури, а також додавання індикаторів для навігації.

### Основні можливості:

- **Автоперемикання слайдів** за заданим інтервалом.
- **Ручне перемикання слайдів** через кнопки "вперед" та "назад" або клавіші зі стрілками.
- **Індикатори** для навігації між слайдами.
- **Кнопка паузи/відновлення** для контролю відтворення слайдів.

## Структура коду

```javascript
function SwipeCarousel(containerID = '#carousel', slideID = '.slide', interval = 2000, isPlaying = true) {
    this.container = document.querySelector(containerID);
    this.slides = this.container.querySelectorAll(slideID);
    this.INTERVAL = interval;
    this.isPlaying = isPlaying;
}
