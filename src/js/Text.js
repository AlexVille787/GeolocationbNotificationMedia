// src/js/Text.js

export default class TextPost {
  constructor(text, coords, date = new Date()) {
    this.text = text;
    this.coords = coords;
    this.date = date;
    this.element = this._createElement();
  }

  _createElement() {
    const post = document.createElement("div");
    post.className = "post post-text";

    const formattedDate = this.date
      .toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", "");

    const formattedCoords = `[${this.coords.latitude.toFixed(
      5,
    )}, ${this.coords.longitude.toFixed(5)}]`;

    post.innerHTML = `
      <div class="post-header">
        <div class="post-text-content">${this.text}</div>
        <div class="post-actions">
          <div class="post-date">${formattedDate}</div>
          <button class="post-delete-btn" title="Удалить запись">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <div class="post-footer">
        <span class="post-coords">${formattedCoords}</span>
        <span class="post-icon">👁</span>
      </div>
    `;

    // Добавляем обработчик клика на кнопку удаления
    const deleteBtn = post.querySelector(".post-delete-btn");
    deleteBtn.addEventListener("click", () => {
      // Генерируем кастомное событие, чтобы index.js знал об удалении
      const event = new CustomEvent("post-remove", {
        bubbles: true, // Событие всплывает до контейнера timeline
        detail: { element: post }, // Передаем сам элемент карточки
      });
      post.dispatchEvent(event);
    });

    return post;
  }
}
