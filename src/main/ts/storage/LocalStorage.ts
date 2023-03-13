
const localStorageItemKey = 'ai-writer-setting';

/**
 * 確認有無資料
 */
function hasData(): boolean {
  return localStorage.getItem(localStorageItemKey) !== null;
}

/**
 * 保存資料
 * @param item
 */
function save(item: string): void {
  localStorage.setItem(localStorageItemKey, item) !== null;
}

/**
 * 刪除全部資料
 */
function removeAll(): void {
  localStorage.removeItem(localStorageItemKey);
}

/**
 * 取出資料
 */
function get(): string {
  return localStorage.getItem(localStorageItemKey);
}

export {
  hasData,
  save,
  removeAll,
  get
}