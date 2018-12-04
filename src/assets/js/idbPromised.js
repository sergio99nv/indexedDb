import idb from 'idb';



const dbFoodVersion = 3;

const dbPromise = idb.open("foodDb", dbFoodVersion, (db)=>{
        switch(db.oldVersion){
            case 0 :
                const foodTypes = db.createObjectStore('foodTypes', {keyPath:'foodTypeId'} )
                const foods= db.createObjectStore('foods', {keyPath:'foodId'} )
                foods.createIndex('foodTypeId', 'foodTypeId' );
                foods.createIndex('dias', 'dias' );

              case 1 :
                
               
        }

});

dbPromise.then( (db)=>{
        const tx = db.transaction(['foodTypes', 'foods'], 'readwrite');
        
        tx.objectStore('foodTypes').put({
                foodTypeId: 1,
                name:'breakFast' ,
                startHour:'8:00',
                endHour:  '11:59 ' 
        });

        tx.objectStore('foodTypes').put({
                foodTypeId:2,
                name:'lunch',
                startHour: '12:00',
                endHour:  '16:99'
         });

         tx.objectStore('foodTypes').put( {
                foodTypeId:3,
                name:'dinner',
                startHour: '5:00',
                endHour: '22:00' 
          });

        

         

        tx.objectStore('foods').put({
                foodId:1,
                foodTypeId: 1,
                price:45,
                name:"huevos revultos",
                dias: [5,6,2]
        });//

        tx.objectStore('foods').put({
                foodId:2,
                foodTypeId: 1,
                price:23,
                name:"baleadeas",
                dias: [2,3,4]
        });

        tx.objectStore('foods').put({
                foodId:3,
                foodTypeId: 2,
                price:99,
                name:"carne a la plancha 2",
                dias: [1,2,7]
        });



        return tx;
}).then((r)=>{
       
}).catch((err)=>{
        console.log(err)
})


 

const foodType =   async()=> {
        const foodType =  await   dbPromise.then((db)=>{
                const tx = db.transaction('foodTypes', 'readwrite');
        
                const res = tx.objectStore('foodTypes')
                                .get(1);
        
                 return res;
                
        }) 

         //console.log(foodType.foodTypeId, "HOLA")

         const foods =  await    dbPromise.then((db)=>{
                const tx = db.transaction('foods', 'readwrite');

                const res = tx.objectStore('foods')
                                .get(foodType.foodTypeId);
                
                return res;

         }) 

         console.log(foods, "vvvvvvvv")
         //return x;
        
}

// foodType().then( (rp)=>console.log(rp))

  dbPromise.then((db)=>{
        const tx = db.transaction('foods', 'readwrite');

        const store = tx.objectStore('foods')
                         
        
        store.index("dias").openCursor(null, "next")
        .then((cursor)=>{
                return cursor;
        }).then( function loppData(cursor){
                if(!cursor) return;
                const dias = cursor.value.dias;
                const existe = dias.includes(7)
                console.log(existe, "yaf")

                return cursor.continue().then(loppData)
        })

 }) 


// foodType.then( (res) => console.log(res) );

//  dbPromise.then((db)=>{
//       return  foodType.then( (res)=>{
                
//                 const tx = db.transaction(['foodTypes','foods'], 'readwrite');
//                  const food = tx.objectStore('foods')
//                                .index('foodTypeId').getAll(res.foodTypeId);
                
//                 return food;
//         })
         
// }).then((res)=>{
//         res.forEach((i)=>{
//                 console.log(i)

//         })
       
// }) 

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

 
 