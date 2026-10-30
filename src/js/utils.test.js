// src/js/utils.test.js
import { parseCoordinates } from "./utils";

describe("Функция parseCoordinates (Парсер координат)", () => {
  // Успешные сценарии
  describe("Корректный ввод", () => {
    test("Должна обрабатывать строку с пробелом после запятой", () => {
      const result = parseCoordinates("51.50851, -0.12572");
      expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
    });

    test("Должна обрабатывать строку без пробела", () => {
      const result = parseCoordinates("51.50851,-0.12572");
      expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
    });

    test("Должна обрабатывать строку в квадратных скобках", () => {
      const result = parseCoordinates("[51.50851, -0.12572]");
      expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
    });

    test("Должна обрабатывать строку с длинным тире (как на макете)", () => {
      // Проверяем, что замена "−" на "-" работает
      const result = parseCoordinates("[51.50851, −0.12572]");
      expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
    });
  });

  // Сценарии с ошибками
  describe("Некорректный ввод (должен выбрасывать исключение)", () => {
    test("Должна выбрасывать ошибку, если введен только один текст", () => {
      expect(() => parseCoordinates("51.50851")).toThrow();
    });

    test("Должна выбрасывать ошибку, если разделитель не запятая", () => {
      expect(() => parseCoordinates("51.50851 -0.12572")).toThrow();
    });

    test("Должна выбрасывать ошибку, если введены буквы", () => {
      expect(() => parseCoordinates("широта, долгота")).toThrow();
    });

    test("Должна выбрасывать ошибку, если координаты выходят за пределы (валидация значений)", () => {
      // Широта больше 90 градусов
      expect(() => parseCoordinates("100.5, 20.3")).toThrow();
    });
  });
});
