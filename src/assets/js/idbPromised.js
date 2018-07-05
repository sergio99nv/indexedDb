import idb from 'idb';



const dbPromise = idb.open('mascota', 2, upgradeDB => {
    // Note: we don't use 'break' in this switch statement,
    // the fall-through behaviour is what we want.
    switch (upgradeDB.oldVersion) {
      case 0:
      upgradeDB.createObjectStore('mascota', {keyPath: 'id'});
      case 1:
      upgradeDB.createObjectStore('mascotaDos', {autoIncrement
        : 'id'});
      
       
    }
  });


  //insertar data
 /* dbPromise.then( (db)=>{
  
    const tx = db.transaction("mascota", "readwrite");
    var x = 100;
    while(++x<200){
        tx.objectStore("mascota").put({
            id: x,
            data:{
            raza: "lagarto ",
            nombre:"lagarto"
         }
       })
    }     
    return tx;
  })
*/
  
/* 
 * Obtener data
 */

 dbPromise.then((db)=>{
     
    const tx = db.transaction("mascota")
    const data =  tx.objectStore("mascota").getAll();

              
    return data;
 }).then((data)=>{
     // console.log("data all", data)
 })

/* 
 * Obtener registo por Id 
 */
dbPromise.then((db)=>{
    const tx = db.transaction("mascota")
    const data =  tx.objectStore("mascota").get(2)

    return data;
}).then((data)=>{
     //console.log("filtrado x id", data)

}) 


//cursor
/*dbPromise.then((db)=>{
  const tx = db.transaction("mascota")
  tx.objectStore("mascota").openCursor().then(function cursorIterate(cursor){
      if(!cursor) return false;

      console.log(cursor.value)
      return cursor.continue().then(cursorIterate)
  })

  tx.complete().then( ()=> console.log("done"))
})*/


//cursor PREV
dbPromise.then((db)=>{
    const tx = db.transaction("mascota")
    tx.objectStore("mascota").openCursor(null, "prev")
    .then(function(cursor){

        return cursor.advance(100);
    })
    .then(function cursorIterate(cursor){
        if(!cursor) return false;
  
        console.log(cursor.value)

         
        return cursor.continue().then(cursorIterate)
    })
  
   
  })