// src/js/Geolocation.js

export default class GeolocationService {
  /**
   * Проверяет текущий статус разрешения на геолокацию
   * @returns {Promise<string>} 'granted', 'denied', или 'prompt'
   */
  async checkPermission() {
    if (!navigator.permissions) return "prompt"; // Если API нет, считаем что спросит

    try {
      const result = await navigator.permissions.query({ name: "geolocation" });
      return result.state;
    } catch (e) {
      return "prompt";
    }
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Геолокация не поддерживается."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }, // Увеличили таймаут
      );
    });
  }
}
