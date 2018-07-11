import idb from 'idb';



const dbPromise = idb.open('mascotasDb', 2, upgradeDB => {
    // Note: we don't use 'break' in this switch statement,
    // the fall-through behaviour is what we want.
    switch (upgradeDB.oldVersion) {
      case 0:

      const  storeUser =  upgradeDB.createObjectStore('user', {keyPath: 'userId'});
      storeUser.createIndex('tipo', 'tipo');

      
      const  storeMascota =  upgradeDB.createObjectStore('mascotas', {keyPath: 'id'});
      storeMascota.createIndex('raza', 'raza');

      
       
    }
  });


  //insertar data
  /*dbPromise.then( (db)=>{
  
    const tx = db.transaction("mascotas", "readwrite");
    var x = 0;
    
    while(x++<=100){
        tx.objectStore("mascotas").add({
            id: x,
            tipo: "normal",
            nombre:"pepe"
            
        })
    }
        
    return tx;
  }) */
 
  
/* 
 * Obtener data
 */

 dbPromise.then((db)=>{
     
    const tx = db.transaction("mascotas")
    const data =  tx.objectStore("mascotas").getAll();

              
    return data;
 }).then((data)=>{
     // console.log("data all", data)
 })

/* 
 * Obtener registo por Id 
 */
dbPromise.then((db)=>{
    const tx = db.transaction("mascotas")
    const data =  tx.objectStore("mascotas").get(2)

    return data;
}).then((data)=>{
     //console.log("filtrado x id", data)

}) 


//cursor
/*dbPromise.then((db)=>{
  const tx = db.transaction("mascotas")
  tx.objectStore("mascotas").openCursor().then(function cursorIterate(cursor){
      if(!cursor) return false;

      console.log(cursor.value)
      return cursor.continue().then(cursorIterate)
  })

  tx.complete().then( ()=> console.log("done"))
})*/


//cursor PREV
/*
dbPromise.then((db)=>{
    const tx = db.transaction("mascotas")
    tx.objectStore("mascotas").openCursor(null, "prev")
    .then(function(cursor){

        return cursor.advance(100);
    })
    .then(function cursorIterate(cursor){
        if(!cursor) return false;
  
        console.log(cursor.value)

         
        return cursor.continue().then(cursorIterate)
    })
  
   
  }) */