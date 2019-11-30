let db=require('./db').db
let users=db.collection('users').where('username','==','samar_1738').get().then((snapshot)=>
{
    if(snapshot.empty)
    {
        console.log("Empty")
        return
    }

    snapshot.forEach(doc => {
            console.log(doc.id,'=>',doc.data());
    });
 
})  .catch(
    err=>
    {
        console.log(err);
    }
)