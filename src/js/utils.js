// src/js/utils.js

/**
 * Парсит строку с координатами и возвращает объект.
 * Поддерживает форматы: "51.5, -0.1", "51.5,-0.1", "[51.5, -0.1]"
 * @param {string} inputString
 * @returns {Object} { latitude, longitude }
 * @throws {Error} Если формат неверный или координаты вне допустимых пределов
 */
export function parseCoordinates(inputString) {
  // Заменяем длинное тире (из макета) на обычный минус для корректной работы parseFloat
  const normalizedString = inputString.replace(/−/g, "-").trim();

  // Регулярное выражение:
  // ^\[? - опциональная [ в начале
  // \s* - опциональные пробелы
  // (-?\d+(?:\.\d+)?) - первое число (широта)
  // \s*,\s* - запятая с опциональными пробелами
  // (-?\d+(?:\.\d+)?) - второе число (долгота)
  // \s*\]?$ - опциональная ] в конце
  const regex = /^\[?\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\]?$/;

  const match = normalizedString.match(regex);

  if (!match) {
    throw new Error(
      "Неверный формат. Введите координаты через запятую (например: 51.50851, -0.12572)",
    );
  }

  const lat = parseFloat(match[1]);
  const lon = parseFloat(match[2]);

  // Валидация географических пределов
  if (lat < -90 || lat > 90) {
    throw new Error("Широта должна быть в пределах от -90 до 90");
  }
  if (lon < -180 || lon > 180) {
    throw new Error("Долгота должна быть в пределах от -180 до 180");
  }

  return { latitude: lat, longitude: lon };
}
