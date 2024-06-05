const { captureRejectionSymbol } = require('events');
const fs = require('fs');
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs'); 
const SECRET_KEY = "secretkey23456";

module.exports = {
    login: (req, res) => {
        message = '';
        res.render('login', {
            message
        });
    },
    FFmpegconvert:(req,res)=>{
      const  message = '';
      const user=req.body.user;
      if(user=="admin"){
      res.render('menu', {
          message,user
      });
    }else{
      res.render('PageUtilisteur', {
        message,user
    });

    }
    },
    Convertevideo:(req,res)=>{
      const user=req.body.user;
      message = '';
      res.render('FFmpegconvert', {
          message,user
      });

    },
    invitConvertevideo:async(req,res)=>{
      try {
        message = '';
        res.render('FFmpegConvert2', {
            message
        });
      } catch (error) {
        console.log(error)
      }
    },
    singin:(req, res) => {
      const  email  =  req.body.email;
      const  password  =  req.body.password;
      findUserByEmail(email, (err, user)=>{
          if (err) return  res.status(500).send('Server error!');
          if (!user) return  res.render("login",{message:"User not found!"});
          const  result  =  bcrypt.compareSync(password, user.password);
          if(!result) return  res.render("login",{message:"Password not valid!"});
          const  expiresIn  =  24  *  60  *  60;
          const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
              expiresIn:  expiresIn
          });
          if(user.validUser=="non"){
            res.render("CompteNonactive",{user:user.user});
          }else if(user.validUser=="oui"){
          if(user.user=="admin"){
            res.render("menu",{user:user.user});
           }else{
            res.render("PageUtilisteur",{user:user.user});
           }
          }
         });
},
   inscription: (req, res) => {
        message = 'OK';
        res.render('inscription', {
            message
        });
    },
    password: (req, res) => {
        message = 'OK';
        res.render('password', {
            message
        });
    },
    PageUser:async(req,res)=>{
      const user=req.body.user;
      try {
        res.render('PageAdmin',{message:"",user:user});
        } catch (err) {
        console.log(err);
        }
  
    },
    registre:async (req, res) => {
    const{user,email,site,poste,password,password2}=req.body
    const validUser="non";
    if(password!==password2){
      res.render("inscription",{message:"error confermation password"});
      return;
    }
    const  passwords  =  bcrypt.hashSync(req.body.password);
    await findUserByEmail(email, (err, users)=>{
    if(err) {res.render("error",{msg:"error"})}
    if(users){res.render("error",{msg:"User Existe!"});}
    else{
    const sql=`INSERT INTO users (user,email,password,site,poste,validUser) VALUES (?,?,?,?,?,?)`
     db.run(sql,[user,email,passwords,site,poste,validUser],(err) =>{
                if(err) {  res.render("error",{msg:"error"})} ;
                findUserByEmail(email, (err, user)=>{
                if (err) {res.render("error",{msg:"error"})};  
                const  expiresIn  =  24  *  60  *  60;
                const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
                    expiresIn:  expiresIn
                });
                res.redirect('/login');
            });
        });
    }
  })
 },
 addUser:async (req, res) => {
  const{user,email,site,poste,validUser}=req.body
  const userAdmin="admin";
  console.log(req.body);
  const  password  =  bcrypt.hashSync(req.body.password);
  await findUserByEmail(email, (err, users)=>{
  if(err) {res.render("error",{msg:"error"})}
  if(users){res.render("error",{msg:"User Existe!"});}
  else{
  const sql=`INSERT INTO users (user,email,password,site,poste,validUser) VALUES (?,?,?,?,?,?)`
   db.run(sql,[user,email,password,site,poste,validUser],(err) =>{
              if(err) {  res.render("error",{msg:"error"})} ;
              findUserByEmail(email, (err, user)=>{
              if (err) {res.render("error",{msg:"error"})};  
              const  expiresIn  =  24  *  60  *  60;
              const  accessToken  =  jwt.sign({ id:  user.id }, SECRET_KEY, {
                  expiresIn:  expiresIn
              });
             
          });
      });
      res.redirect(`/pageUser/${userAdmin}`);
  }
})
},
 editUser:async (req, res) => {
        const{user,email,site,poste,validUser,id}=req.body;
        const userAdmin="admin";
        console.log(id);
        const  password  =  bcrypt.hashSync(req.body.password);
        const book = [user,email,password,site,validUser,poste,id];
        const sql = "UPDATE users SET  user =?, email =?, password =?, site =?, validUser =?, poste =? WHERE (id = ?)";
                    db.run(sql,book,err => {
                        if (err) {
                          return console.error(err.message);
                        }
                    const  expiresIn  =  24  *  60  *  60;
                    const  accessToken  =  jwt.sign({ id: id }, SECRET_KEY, {
                        expiresIn:  expiresIn
                    });
                  
                      console.dir(book);
                      res.redirect(`/pageUser/${userAdmin}`);
                
                      });  
             
    },
    ValidUser:async(req,res)=>{
        const{validUser,id}=req.body;
        const book=[validUser,id];
        const userAdmin="admin";
        try {
            const sql = "UPDATE users SET  validUser = ?  WHERE (id = ?)";
            db.run(sql,book ,err => {
                if (err) {
                  return console.error(err.message);
                }
              console.dir(book);   //  console.dir(book2);
              res.redirect(`/pageUser/${userAdmin}`);
            })
         } catch (error) {
          console.log(error)
         }
        },
    dellUser: (req, res) => {
        const id = req.body.id;
        const userAdmin="admin";
        const deleteUserQuery = 'DELETE FROM users WHERE id = "' + id + '"';
        db.run(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(200).send(err);
            }
            res.redirect(`/pageUser/${userAdmin}`);
        });
      }  
,Getalluser:async(req,res)=>{
    try {
      db.all(`SELECT * FROM users`,{},(err,result)=>{
          res.status(200).json(result);

         })
      } catch (err) {
      console.log(err);
      }
    }
    ,GetDellUser:async(req,res)=>{
      const id=req.body.id;
      const user=req.body.user
      try {
        db.get(`SELECT * FROM users WHERE id = ?`,[id], (err, result) => {
         res.render('Usersedit/delluser',{data:result,user:user});
        })
        } catch (err) {
        console.log(err);
        }
      
    }
    ,GetAddUser:async(req,res)=>{
      const user=req.body.user;
      try {
        res.render('Usersedit/adduser',{message: "",user:user,email:""});
        } catch (err) {
        console.log(err);
        }
    }
    ,GetvalidUser:async(req,res)=>{
      const id=req.body.id;
      const user=req.body.user;
    
      try {
        db.get(`SELECT * FROM users WHERE id = ?`,[id], (err, result) => {
        res.render('Usersedit/validuser',{data:result,user:user});
        });
        } catch (err) {
        console.log(err);
        }
    }
    ,GetEditUser:async(req,res)=>{
      const id=req.body.id;
      const user=req.body.user;
          try {
        db.get(`SELECT * FROM users WHERE id = ?`,[id], (err, result) => {
            res.render('Usersedit/edituser',{data:result,message :"",user:user});
            });
        } catch (err) {
        console.log(err);
        }
      
    },
   
  GPageUser:async(req,res)=>{
  const user=req.params.user;
      try {
        res.render('PageAdmin',{user:user});
        } catch (err) {
        console.log(err);
        }
    }  
  
}
const  findUserByEmail  = (email, cb) => {
    return  db.get(`SELECT * FROM users WHERE email = ?`,[email], (err, row) => {
            cb(err, row)
    });
  }
  
  const  createUser  = (user, cb) => {
    console.log(user);
     db.run('INSERT INTO users (user,email,password,site,poste,validUser) VALUES (?,?,?,?,?,?)',user, (err) => {
        cb(err)
    });
  }
