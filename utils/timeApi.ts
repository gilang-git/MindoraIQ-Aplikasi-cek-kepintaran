export interface ServerTimeData {
  time: string;
  date: string;
  dayOfWeek: string;
  timeZone: string;
}

const TIME_API_URL = 'https://timeapi.io/api/time/current/zone?timeZone=Asia/Jakarta';

export async function fetchServerTime(): Promise<ServerTimeData> {
  try {
    const response = await fetch(TIME_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    return {
      time: data.time || '',
      date: data.date || '',
      dayOfWeek: data.dayOfWeek || '',
      timeZone: data.timeZone || 'Asia/Jakarta',
    };
  } catch {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
      time: `${hours}:${minutes}`,
      date: `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`,
      dayOfWeek: dayNames[now.getDay()],
      timeZone: 'Asia/Jakarta',
    };
  }
}
