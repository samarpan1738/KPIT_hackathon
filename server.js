const express=require('express')
const app=express()
const hbs = require('express-hbs');
const db=require('./db').db
//For session
const session=require('express-session')
// const uuid=require('uuid')
const FileStore = require('session-file-store')(session);
const TWO_HOURS=1000 * 60 * 60 * 2;
const path=require('path')
const {PORT= 3000,
        NODE_ENV='development',
        SESS_LIFETIME=TWO_HOURS,SESS_NAME='sid',
        SESS_SECRET='shhhhhhhhhh'
    } = process.env

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use(express.static(path.join(__dirname, 'public')))
app.use('html',express.static(path.join(__dirname, 'html')))
app.use(express.static(path.join(__dirname, 'css')))
app.use(express.static(path.join(__dirname, 'js')))
// Middleware for session
app.use(session({
    name:SESS_NAME,
    cookie:{
        maxAge:SESS_LIFETIME,
        sameSite:true,
    },
    resave:false,
    saveUninitialized:false,
    // genid:(req)=>{
    //     console.log("Were inside sessions middleware")
    //     console.log(req.sessionID)
    //     let token=uuid()
    //     console.log(`Generated uuid: ${token}`)
    //     return token
    // },
    store:new FileStore(),
    secret: SESS_SECRET
}))
//Users
let users=new Map();

// Routes

app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Origin", `http://localhost:${PORT}`);
    res.header("Access-Control-Allow-Credentials", "true"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cookie");
    next();
  });
  

app.get('/profile',(req,res,next)=>{
    console.log('profileeeeeeeeeeeeeeeeeee')
    console.log(req.headers)
    if(!req.session.userId)
        res.redirect('/login');
    else
        next();
},(req,res)=>{
    res.header("Access-Control-Allow-Origin", `http://localhost:${PORT}`);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cookie");
    const user=users.get(req.session.userId);
    console.log("---->"+user)
    res.json(user);
    // res.sendFile(path.join(__dirname+'/public/profile.html'))
})
app.get('/user/',(req,res,next)=>{
    console.log(req.headers)
    if(!req.session.userId)
        res.redirect('/login');
    else
        next();
},(req,res)=>{
    
    const user=users.get(req.session.userId);
    console.log(user)
    // res.json(user);
    res.sendFile(path.join(__dirname+'/public/profile.html'))
})

app.get('/login',(req,res,next)=>{
    if(req.session.userId)
        res.redirect(`/user`);
    else
        next();
},(req,res)=>{
    // console.log(req.session);
    // res.render('login');
    // res.sendFile('/public/index.html');
    res.sendFile(path.join(__dirname+'/public/login.html'));
})

app.get('/signup',(req,res,next)=>{
    if(req.session.userId)
        res.redirect('/user');
    else
        next();
},(req,res)=>{
    
    res.render('signup');
})
app.get('/location/dlf',
// (req,res,next)=>{
//     if(!req.session.userId)
//         res.redirect('/login');
//     else
//         next();
// },
(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/loc.html'))
})
app.post('/login',(req,res,next)=>{
    if(req.session.userId)
        res.redirect('/user');
    else
        next();
},(req,res)=>{
    
    let username=req.body.username;
    let password=req.body.password;
    let user={};
    var userRef = new Promise(function(resolve, reject) {
            let usersRef=db.collection('users').where('username','==',username).get()
            .then((snapshot)=>
            {
                let user={}
                if(snapshot.empty)
                {
                    console.log("Empty")
                    reject(new Error('Document/User DNE'))
                }

                snapshot.forEach(doc => {
                    user=doc.data()
                    user.id=doc.id
                });
                resolve(user)
            }).catch(err=>reject(err))
        });
    
           userRef.then(user=>{
            if(user.password && user.password==password)
            {
                console.log('sessions')
                req.session.userId=user.id;
                users.set(user.id,user)
                res.redirect(`/user`);
                
            }
        else
            res.redirect('/signup');
           }).catch(err =>console.log(err))
})

app.post('/signup',(req,res,next)=>{
    if(req.session.userId)
        res.redirect('/user');
    else
        next();
},(req,res)=>{
    
    let username=req.body.username;
    let password=req.body.password;
    let email=req.body.email
    let user={
        email:email,
        password:password,
        username:username
    }
    let setDoc =db.collection('users').doc().set(user)
    setDoc.then(()=>console.log("done")).catch((e)=>console.log('cannot add user'))
    res.redirect('/login')
    console.log(`Signed up ${username}`);
})

app.get('/logout',(req,res,next)=>{
    if(req.session.userId)
        next();
    else
        res.redirect('/login');
},(req,res)=>{
    users.delete(req.session.userId)
    req.session.destroy(function() {
        res.clearCookie('sid', { path: '/' }).status(200).redirect('login');;
      });
})


// 4 0 4 - H a n d l e r
app.use((req,res)=>
{
    res.sendFile(path.join(__dirname+'/public/404.html'));
})

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})