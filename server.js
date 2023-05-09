const express =  require('express');
const bcrypt  = require('bcrypt');
const app = express();

app.use(express.json());

const users = []

app.get('/users', (req,res) =>{
   res.json(users)
})

app.post('/users',async (req,res)=>{
   
    try{
        // const salt = await bcrypt.genSalt();
        const hashpassword = await bcrypt.hash(req.body.password,10);
        // console.log(salt);
        // console.log(hashpassword);
        const user = {name: req.body.name , password: hashpassword};
        users.push(user);
        console.log(user);
        res.status(201).send();
    }catch{
         res.status(500).send();
    }
}) 

app.post('/users/login',async(req,res)=>{
    const user = users.find(user=>user.name === req.body.name);
    if(user == null ){
        return res.status(400).send('cannot find user'); 
    }
    try{
       if(await bcrypt.compare(req.body.password,user.password)){
           res.send('sucess');
       } else{
        res.send('not allowed')
       }
    }catch{
        res.status(500).send()
    }
})
const PORT =  3000
app.listen(PORT);