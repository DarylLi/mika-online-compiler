export function initIndexDB(data) {
  return new Promise((res, rej) => {
    const request = (window.indexedDB || window.webkitIndexedDB).open(
      data.storeName,
      data.version
    );
    request.onsuccess = (e) => {
      console.log("数据库打开成功", e.target.result);
      data.db = e.target.result;
      res(data);
    };
    request.onerror = (e) => {
      console.log("数据库启动报错", e);
      throw Error("数据库报错啦：" + e.target.result);
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
export const addData = (db, storeName, obj) => {
  console.log(db);
  //readwrite 读写操作的权限
  const request = db
    .transaction(storeName, "readwrite")
    .objectStore(storeName)
    .add(obj);
  request.onsuccess = (e) => {
    console.log("写入成功", e.target.result);
    //这里可以做一些操作，添加第一次之后数据还是相同的就要进行阻止或者清空，否则报错
    //readyState为done是添加完毕
  };
  request.onerror = (e) => {
    console.log("写入失败：", e);
    throw Error("写入失败：" + e.target.result);
  };
};
export const getData = (db, storeName, key) => {
  return new Promise((res, rej) => {
    // transaction 第二个参数不写，默认是只读，key是当前属性的id值
    const request = db.transaction([storeName]).objectStore(storeName).get(key);
    request.onsuccess = (e) => {
      console.log("读取成功", e.target.result);
      res(e.target.result);
    };
    request.onerror = (e) => {
      console.log("读取失败：", e);
      //   throw Error("读取失败：" + e.target.result);
      rej(e.target.result);
    };
  });
};

export const getAllData = (db, storeName) => {
  return new Promise((res, rej) => {
    // transaction 第二个参数不写，默认是只读
    const request = db.transaction(storeName).objectStore(storeName).getAll();
    request.onsuccess = (e) => {
      console.log("读取全部成功", e.target.result);
      res(e.target.result);
    };
    request.onerror = (e) => {
      console.log("读取全部失败：", e);
      throw Error("读取全部失败：" + e.target.result);
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
    console.log("读取索引成功", e.target.result);
  };
  request.onerror = (e) => {
    console.log("读取索引失败：", e);
    throw Error("读取索引失败：" + e.target.result);
  };
};

// 更新某一条数据
export const updateData = (db, storeName, data) => {
  return new Promise((res, rej) => {
    const request = db
      .transaction([storeName], "readwrite")
      .objectStore(storeName)
      .put(data);
    request.onsuccess = (e) => {
      //readyState为done是更新完毕，或者result会返回当前的id值可进行判断
      console.log(e.target.result, e.target);
      console.log("更新成功", e.target.result);
      res(e.target.result);
    };
    request.onerror = (e) => {
      console.log("更新失败：", e);
      rej(e.target.result);
      //   throw Error("更新失败：" + e.target.result);
    };
  });
};
// 删除某一条数据
export const deleteData = (db, storeName, key) => {
  const request = db
    .transaction([storeName], "readwrite")
    .objectStore(storeName)
    .delete(key); //key---id值
  request.onsuccess = (e) => {
    //readyState为done是更新完毕
    console.log(e.target.result, e.target);
    console.log("删除成功", e.target.result);
  };
  request.onerror = (e) => {
    console.log("删除失败：", e);
    throw Error("删除失败：" + e.target.result);
  };
};
// 使用指针遍历所有值使用id
const fORData = (db, storeName) => {
  const request = db
    .transaction([storeName], "readwrite")
    .objectStore(storeName);
  request.openCursor().onsuccess = (e) => {
    //readyState为done是更新完毕
    var cursor = event.target.result;
    if (cursor) {
      console.log(
        "当前的id值： " + cursor.key + " 和age值 " + cursor.value.age
      );
      cursor.continue();
    } else {
      console.log("结束遍历");
    }
  };
  request.onerror = (e) => {
    console.log("遍历所有值失败：", e);
    throw Error("遍历所有值失败：" + e.target.result);
  };
};
// 使用指针遍历所有值，使用name索引
const fORData1 = (db, storeName) => {
  const objectStore = db.transaction([storeName]).objectStore(storeName);
  var index = objectStore.index("indexName");
  const range = IDBKeyRange.bound(1, 10); //遍历id从1到10的数据
  index.openCursor(range).onsuccess = function (event) {
    var cursor = event.target.result;
    if (cursor) {
      console.log(
        "当前的name值： " + cursor.key + " 和age值 " + cursor.value.id
      );
      cursor.continue();
    } else {
      console.log("结束遍历");
    }
  };

  index.openCursor(range).onerror = (e) => {
    console.log("遍历所有值失败：", e);
    throw Error("遍历所有值失败：" + e.target.result);
  };
};
