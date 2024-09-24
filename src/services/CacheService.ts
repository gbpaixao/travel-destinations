export class CacheService {
  constructor() { }

  async getOrSetItem<T>(itemName: string, fetchData: Promise<T>) {
    const cachedData = localStorage.getItem(itemName);
    if (cachedData) return JSON.parse(cachedData);
    const data = await fetchData
    localStorage.setItem(itemName, JSON.stringify(data));
    return data
  }

  async resetCache() {
    localStorage.clear()
  }
}