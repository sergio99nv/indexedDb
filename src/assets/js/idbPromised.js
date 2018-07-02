import idb from 'idb';



const dbPromise = idb.open('mascota', 2, upgradeDB => {
    // Note: we don't use 'break' in this switch statement,
    // the fall-through behaviour is what we want.
    switch (upgradeDB.oldVersion) {
      case 0:
      upgradeDB.createObjectStore('mascota', {keyPath: 'id'});
       
    }
  });


  dbPromise.then( (db)=>{
    const table =  "mascota"
    const tx = db.transaction(table, "readwrite");
    tx.objectStore(table).put({
        id: 2,
        data:{
         raza: "perro de perrera",
         nombre:"Perro truko"
        }
    })
    return tx;
  })

  
/* 
 * Obtener data
 */

 dbPromise.then((db)=>{
    const table = "mascota";
    const tx = db.transaction(table)
              .objectStore(table).getAll();
    return tx;
 }).then((data)=>{
      console.log(data)
 })

/* 
 * Obtener registo por Id 
 */
dbPromise.then((db)=>{
    const tx = db.transaction("mascota")
                .objectStore("mascota").get(2)
    return tx;
}).then((data)=>{
    console.log("filtrado x id", data)

}) 