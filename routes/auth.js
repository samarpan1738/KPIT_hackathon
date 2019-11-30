const router=require('express').Router
const session=require('express-session')
const uuid=require('uuid')
const FileStore = require('session-file-store')(session);


//Configuring sessions middleware

router.use(session({
    genid:(req)=>{
        console.log("Were inside sessions middleware")
        console.log(req.sessionID)
        let token=uuid()
        console.log(`Generated uuid: ${token}`)
        return token
    },
    store:new FileStore(),
    secret: 'shhhhhhhh',
    resave: false,
    saveUninitialized: true
}))

router.get('/',(req,res)=>{
    console.log("in /'s callback")
    console.log(`uuid actually set : ${req.sessionID}`)
    res.send('on homepage\n')
    
})

router.listen(4890,()=>{
    console.log("Server started at http://localhost:4890")
})
exports.auth=router