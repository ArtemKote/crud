import { INewsItem } from '@/types/news';

/**
 * Класс для работы с хранилищем
 */
export class NewsStorage {
  private readonly storageKey: string;

  constructor(storageKey: string = 'newsList') {
    this.storageKey = storageKey;
  }

  // Получить все новости из localStorage
  getNewsList(): INewsItem[] {
    try {
      const newsList = localStorage.getItem(this.storageKey);
      return newsList ? JSON.parse(newsList) : [];
    } catch (error) {
      console.error('Ошибка при чтении из localStorage:', error);
      return [];
    }
  }

  // Обновить список новостей в localStorage
  updateNewsList(newsList: INewsItem[]): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(newsList));
    } catch (error) {
      console.error('Ошибка при записи в localStorage:', error);
    }
  }

  // Добавить новую новость
  addNews(newNews: Omit<INewsItem, 'id'>): INewsItem {
    const newsList = this.getNewsList();
    const newsWithId = {
      ...newNews,
      id: Date.now().toString(),
    };
    const updatedList = [...newsList, newsWithId];
    this.updateNewsList(updatedList);
    return newsWithId;
  }

  // Обновить существующую новость
  updateNews(id: string, updatedNews: Partial<INewsItem>): INewsItem | null {
    const newsList = this.getNewsList();
    const index = newsList.findIndex(item => item.id === id);

    if (index === -1) return null;

    const updatedItem = {
      ...newsList[index],
      ...updatedNews,
    };

    const updatedList = [...newsList.slice(0, index), updatedItem, ...newsList.slice(index + 1)];

    this.updateNewsList(updatedList);
    return updatedItem;
  }

  // Удалить новость
  deleteNews(id: string): boolean {
    const newsList = this.getNewsList();
    const updatedList = newsList.filter(item => item.id !== id);

    if (updatedList.length === newsList.length) return false;

    this.updateNewsList(updatedList);
    return true;
  }

  // Очистить все новости
  clearAllNews(): void {
    localStorage.removeItem(this.storageKey);
  }
}
