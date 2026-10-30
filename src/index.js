// src/index.js
import "./css/style.css";
import GeolocationService from "./js/Geolocation.js";
import Modal from "./js/Modal.js";
import TextPost from "./js/Text.js";

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.querySelector(".input-field");
  const sendBtn = document.querySelector(".send-btn"); // Находим кнопку
  const timelineContainer = document.querySelector(".timeline");

  const geoService = new GeolocationService();
  const modal = new Modal();

  // Обработка удаления постов (без изменений)
  timelineContainer.addEventListener("post-remove", (e) => {
    if (e.detail && e.detail.element) {
      e.detail.element.remove();
    }
  });

  // ВЫНОСИМ ЛОГИКУ ОТПРАВКИ В ОТДЕЛЬНУЮ ФУНКЦИЮ
  const handleSendMessage = async () => {
    const text = inputField.value.trim();
    if (!text) return; // Если пусто — ничего не делаем

    inputField.value = ""; // Очищаем поле сразу

    let coords = null;

    try {
      coords = await geoService.getCurrentPosition();
    } catch (error) {
      try {
        coords = await modal.open();
      } catch (modalError) {
        return; // Пользователь отменил ввод
      }
    }

    const newPost = new TextPost(text, coords);

    if (timelineContainer.firstChild) {
      timelineContainer.insertBefore(
        newPost.element,
        timelineContainer.firstChild,
      );
    } else {
      timelineContainer.appendChild(newPost.element);
    }
  };

  // 1. Отправка по Enter
  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // 2. Отправка по клику на кнопку
  sendBtn.addEventListener("click", handleSendMessage);
});
