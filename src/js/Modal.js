// src/js/Modal.js
import { parseCoordinates } from "./utils.js";

export default class Modal {
  constructor() {
    this.element = null;
  }

  /**
   * Открывает модальное окно и ждет ввода координат.
   * @returns {Promise<{latitude: number, longitude: number}>}
   */
  open() {
    return new Promise((resolve, reject) => {
      this._render();

      const form = this.element.querySelector(".modal-form");
      const input = this.element.querySelector(".modal-input");
      const errorText = this.element.querySelector(".modal-error");
      const cancelBtn = this.element.querySelector(".modal-btn-cancel");

      // Обработка кнопки "Отмена"
      cancelBtn.addEventListener("click", () => {
        this._close();
        reject(new Error("Ввод координат отменен пользователем."));
      });

      // Обработка отправки формы (Enter или кнопка ОК)
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        errorText.textContent = ""; // Очищаем старые ошибки

        try {
          // Пытаемся спарсить координаты
          const coords = parseCoordinates(input.value);
          this._close();
          resolve(coords); // Возвращаем успешный результат
        } catch (error) {
          // Если ошибка валидации - показываем ее в модалке
          errorText.textContent = error.message;
        }
      });
    });
  }

  _render() {
    this.element = document.createElement("div");
    this.element.className = "modal-overlay";
    this.element.innerHTML = `
      <div class="modal-window">
        <h2 class="modal-title">Что-то пошло не так</h2>
        <p class="modal-description">
          К сожалению, нам не удалось определить ваше местоположение, 
          пожалуйста, дайте разрешение на использование геолокации, 
          либо введите координаты вручную.
        </p>
        <p class="modal-subtitle">Широта и долгота через запятую</p>
        
        <form class="modal-form">
          <input 
            type="text" 
            class="modal-input" 
            placeholder="51.50851, -0.12572" 
            autocomplete="off"
          >
          <div class="modal-error"></div>
          
          <div class="modal-actions">
            <button type="button" class="modal-btn-cancel">Отмена</button>
            <button type="submit" class="modal-btn-ok">ОК</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(this.element);
  }

  _close() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
