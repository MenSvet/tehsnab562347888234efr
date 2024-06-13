// Хранение текущей даты
let currentDate = new Date();
let selectedDate = null; // Хранение выбранной даты для загрузки изображений
let images = {}; // Объект для хранения изображений, привязанных к датам

// Функция для аутентификации
function authenticate() {
  const password = document.getElementById('passwordInput').value;
  if (password === '2525') {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('calendarContainer').style.display = 'block';
    showCalendar();
  } else {
    alert('Неверный пароль! Попробуйте еще раз.');
  }
}

// Массив с названиями месяцев
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

// Функция для отображения календаря на странице
function showCalendar() {
  let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  document.getElementById('monthYear').textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  
  let daysContainer = document.getElementById('daysContainer');
  daysContainer.innerHTML = '';
  
  for (let i = 1; i <= lastDay.getDate(); i++) {
    let dayElement = document.createElement('div');
    dayElement.textContent = i;
    dayElement.onclick = () => selectDate(i); // Добавляем обработчик клика для выбора даты

    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${i}`;
    if (images[dateKey]) {
      images[dateKey].forEach(imageSrc => {
        let img = document.createElement('img');
        img.src = imageSrc;
        img.onclick = () => openModal(imageSrc);
        dayElement.appendChild(img);
      });
    }

    daysContainer.appendChild(dayElement);
  }
}

// Функция для выбора даты
function selectDate(day) {
  selectedDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
  document.getElementById('selectedDate').textContent = `${day} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  document.getElementById('imageUploadForm').style.display = 'block';
}

// Функция для загрузки изображений
function uploadImages() {
  const imageInput = document.getElementById('imageInput');
  if (imageInput.files) {
    const files = Array.from(imageInput.files);
    const dateKey = selectedDate;

    images[dateKey] = images[dateKey] || [];

    files.slice(0, 5).forEach(file => {
      const reader = new FileReader();
      reader.onload = function(e) {
        if (images[dateKey].length < 5) {
          images[dateKey].push(e.target.result);
          showCalendar();
        }
      }
      reader.readAsDataURL(file);
    });
  }
}

// Функция для открытия модального окна с изображением
function openModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modal.style.display = "block";
  modalImg.src = imageSrc;
}

// Функция для закрытия модального окна
function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.style.display = "none";
}

// Обработчики кнопок для переключения месяцев
document.getElementById('prevBtn').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  showCalendar();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  showCalendar();
});
