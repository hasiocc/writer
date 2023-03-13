import { assert } from 'chai';
import { hasData , save , removeAll , get} from '../../../main/ts/storage/LocalStorage';


describe('atomic.LocalStorageTest', () => {

  removeAll();
  it('localStorage沒有資料時', () => {
    assert.equal(hasData(), false, 'localStorage沒有資料時，要回傳false');
  });

  it('localStorage新增資料時', () => {
    save("test");
    assert.equal(hasData(), true, 'localStorage有資料時，要回傳true');
  });

  removeAll();
  it('localStorage新增後又刪除資料時', () => {
    save("test");
    removeAll();
    assert.equal(hasData(), false, 'localStorage新增後又刪除，要回傳false');
  });

  removeAll();
  it('localStorage新增後取出資料', () => {
    save("test");
    assert.equal(get(), "test", 'localStorage新增test,回傳要test');
  });

  removeAll();

});