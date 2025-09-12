<script>
document.addEventListener('DOMContentLoaded', () => {

  // Создаём оверлей
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    overflow: 'hidden'
  });
  document.body.appendChild(overlay);

  // Создаём картинку
  const img = document.createElement('img');
  img.src = 'https://i.imgur.com/tO4m7Mu.png'; // твоя картинка
  img.style.position = 'absolute';
  img.style.width = '200px';
  img.style.height = '200px';
  img.style.cursor = 'pointer';

  // Когда картинка загрузилась
  img.addEventListener('load', () => {
    overlay.appendChild(img);

    // Функция случайного перемещения картинки
    function moveImage() {
      const maxX = window.innerWidth - 200;
      const maxY = window.innerHeight - 200;
      img.style.left = Math.floor(Math.random() * maxX) + 'px';
      img.style.top = Math.floor(Math.random() * maxY) + 'px';
    }

    // Сначала в центр
    img.style.left = (window.innerWidth / 2 - 100) + 'px';
    img.style.top = (window.innerHeight / 2 - 100) + 'px';

    // Потом каждые 2 секунды рандом
    const moveInterval = setInterval(moveImage, 2000);

    // Таймер и движение мыши / тача
    let mouseMoves = 0;
    let startTime = Date.now();
    const minMoves = /Mobi|Android/i.test(navigator.userAgent) ? 1 : 5;

    document.addEventListener('mousemove', () => { mouseMoves++; });
    document.addEventListener('touchmove', () => { mouseMoves++; });

    // Клик по картинке
    img.addEventListener('click', () => {
      const timeSinceShow = Date.now() - startTime;

      if (mouseMoves >= minMoves && timeSinceShow >= 500) {
        clearInterval(moveInterval);
        overlay.remove();

        // --- Событие в Яндекс.Метрику ---
        if (typeof ym === 'function') {
          ym(88094270, 'reachGoal', 'valid_user');
        }
      } else {
        alert('Капча не пройдена, попробуйте ещё раз.');
      }
    });
  });

  // Ошибка загрузки
  img.addEventListener('error', () => {
    console.error('Ошибка загрузки картинки');
    overlay.remove();
  });

});
</script>

