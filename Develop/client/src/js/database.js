import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // connect to database
  const jateDb = await openDB("jate", 1);
  // create new transaction and choose db and data abilities
  const tx = jateDb.transaction("jate", "readwrite");
  // open object store
  const store = tx.objectStore("jate");
  // use .add method to store and pass in content
  const request = store.add({ content });
  // confirm request
  const result = await request;
  console.log("data saved to the database", restult);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // connect to database
  const jateDb = await openDB("jate", 1);
  // create transaction
  const tx = jateDb.transaction("jate", "readonly");
  // open object store
  const store = tx.objectStore("jate");
  // use get all to retreive data from database
  const request = store.getAll();
  // confirm request
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
