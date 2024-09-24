// index db实例初始化
export function initIndexDB(data) {
  return new Promise((res, rej) => {
    const request = (window.indexedDB || window.webkitIndexedDB).open(
      data.storeName,
      data.version
    );
    request.onsuccess = (e) => {
      data.db = e.target.result;
      res(data);
    };
    request.onerror = (e) => {
      throw Error(e.target.result);
    };
    //数据库创建或者升级的时候都会触发
    request.onupgradeneeded = (e) => {
      data.db = e.target.result;
      let objectStore = null;
      if (!data.db.objectStoreNames.contains(data.storeName)) {
        //在数据库中创建表group,设置主键为id，属性中必须要有id的字段
        objectStore = data.db.createObjectStore(data.storeName, {
          keyPath: "id",
        });
        //创建索引indexName指向表中的name字段且设为唯一值，不能重复，属性中可以没有name属性，但是id必须要有
        objectStore.createIndex("indexName", "name", {
          unique: true,
        }); // 创建索引 可以让你搜索任意字段
      }
    };
  });
}
// 添加一条数据
export const addData = (db, storeName, obj) => {
  //readwrite 读写操作的权限
  const request = db
    .transaction(storeName, "readwrite")
    .objectStore(storeName)
    .add(obj);
  request.onsuccess = (e) => {
    //这里可以做一些操作，添加第一次之后数据还是相同的就要进行阻止或者清空，否则报错
    //readyState为done是添加完毕
  };
  request.onerror = (e) => {
    throw Error(e.target.result);
  };
};
// 检索某一项数据
export const getData = (db, storeName, key) => {
  return new Promise((res, rej) => {
    // transaction 第二个参数不写，默认是只读，key是当前属性的id值
    const request = db.transaction([storeName]).objectStore(storeName).get(key);
    request.onsuccess = (e) => {
      res(e.target.result);
    };
    request.onerror = (e) => {
      //   throw Error("读取失败：" + e.target.result);
      rej(e.target.result);
    };
  });
};
// 获取全数据
export const getAllData = (db, storeName) => {
  return new Promise((res, rej) => {
    // transaction 第二个参数不写，默认是只读
    const request = db.transaction(storeName).objectStore(storeName).getAll();
    request.onsuccess = (e) => {
      res(e.target.result);
    };
    request.onerror = (e) => {
      throw Error(e.target.result);
    };
  });
};
// 通过索引name获取数据
const getNameData = (db, storeName, name) => {
  // transaction 第二个参数不写，默认是只读
  const request = db
    .transaction([storeName])
    .objectStore(storeName)
    .index("indexName")
    .get(name);
  request.onsuccess = (e) => {
    console.log(e.target.result);
  };
  request.onerror = (e) => {
    throw Error(e.target.result);
  };
};

// update one data
export const updateData = (db, storeName, data) => {
  return new Promise((res, rej) => {
    const request = db
      .transaction([storeName], "readwrite")
      .objectStore(storeName)
      .put(data);
    request.onsuccess = (e) => {
      res(e.target.result);
    };
    request.onerror = (e) => {
      rej(e.target.result);
    };
  });
};
// delete data
export const deleteData = (db, storeName, key) => {
  const request = db
    .transaction([storeName], "readwrite")
    .objectStore(storeName)
    .delete(key); //key---id值
  request.onsuccess = (e) => {
    console.log(e.target.result, e.target);
  };
  request.onerror = (e) => {
    throw Error(e.target.result);
  };
};
