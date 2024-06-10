const { captureRejectionSymbol } = require('events');
const fs = require('fs');
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs'); 
const SECRET_KEY = "secretkey23456";
module.exports = {
    PageSite:async(req,res)=>{
      const user=req.body.user;
        const message="ok";
        res.render('PageSite', {
            message,user
        });
    },
    GPageSite:async(req,res)=>{
      const user=req.params.user;
        const message="ok";
        res.render('PageSite', {
            message,user
        });
    },
  
    addSite:async (req, res) => {
    const{camera,ipcamera,port,poste,site,user,password}=req.body
    const userAdmin="admin";
    console.log(camera,ipcamera,port,poste,site,user,password);
    await findByCamera(ipcamera, (err, ipcameras)=>{
    if(err) {res.render("error",{msg:"error"})}
    if(ipcameras){res.render("error",{msg:"camera ip Existe!"});}
    else{
    const sql=`INSERT INTO camera (camera,ipcamera,port,poste,site,user,password) VALUES (?,?,?,?,?,?,?)`
     db.run(sql,[camera,ipcamera,port,poste,site,user,password],(err) =>{
                if(err) {  res.render("error",{msg:"error"})} ;
                res.redirect(`/pageSite/${userAdmin}`);
        });
    }
  })
 },
 //---------------------*MDIFIE*--------------------------//

 EditeSite: (req, res) => {
    const{camera,ipcamera,port,poste,site,user,password,id}=req.body
        const book = [camera,ipcamera,port,poste,site,user,password,id];
        const userAdmin="admin";
  const sql = `UPDATE camera SET  camera =?,ipcamera =?,port =?,poste =?,site =?,
  user =?,password =?  WHERE (id = ?)`;
              db.run(sql,book ,err => {
                  if (err) {
                    return console.error(err.message);
                  }
                console.dir(book);   //  console.dir(book2);
               res.redirect(`/pageSite/${userAdmin}`);
                });  
},
//---------------------*supprime*--------------------------//
DelSite: (req, res) => {
const id = req.body.id;
const userAdmin="admin";
let deleteUserQuery = 'DELETE FROM camera WHERE id = "' + id + '"';
db.run(deleteUserQuery, (err, result) => {
    if (err) {
        return res.status(200).send(err);
    }
    res.redirect(`/pageSite/${userAdmin}`);
});
},
GetaddSite:async(req,res)=>{
  const user=req.body.user;
    try {
      res.render('SiteEdit/addSite',{message: "",user:user});
      } catch (err) {
      console.log(err);
      }
  }
  ,GetEditSite:async(req,res)=>{
    const id=req.body.id;
    const user=req.body.user
    try {
      db.get(`SELECT * FROM camera WHERE id = ?`,[id], (err, result) => {
          res.render('SiteEdit/editSite',{data:result,message :"",user:user});
          });
      } catch (err) {
      console.log(err);
      }
    
  }
  ,GetDellSite:async(req,res)=>{
    const id=req.body.id;
    const user=req.body.user
    try {
      db.get(`SELECT * FROM camera WHERE id = ?`,[id], (err, result) => {
       res.render('SiteEdit/dellSite',{data:result,message:"",user:user});
      })
      } catch (err) {
      console.log(err);
      }
    
  },
 
GetallSite:async(req,res)=>{
    try {
      db.all(`SELECT * FROM camera`,{},(err,result)=>{
          res.status(200).json(result);

         })
      } catch (err) {
      console.log(err);
      }
    },
scalAuto:(req,res)=>{
      const user=req.body.user;
      res.render("scalMPD/scaleAuto",{message:"",user:user});
    },
 scale2sec:(req,res)=>{
      const user=req.body.user;
      res.render("scalMPD/main/scale2sec",{message:"",user:user});
    },
  scale4sec:(req,res)=>{
      const user=req.body.user;
      res.render("scalMPD/main/scale4sec",{message:"",user:user});
    },
  scale6sec:(req,res)=>{
      const user=req.body.user;
      res.render("scalMPD/main/scale6sec",{message:"",user:user});
    }, 
    scale8sec:(req,res)=>{
      const user=req.body.user;
      res.render("scalMPD/main/scale8sec",{message:"",user:user});
    },
    scale10sec:(req,res)=>{
      const user=req.body.user;
      res.render("scalMPD/main/scale10sec",{message:"",user:user});
    },
    scale104sec:(req,res)=>{
      const user=req.body.user;
      res.render("scalMPD/main10/scale104sec",{message:"",user:user});
    },
    scale106sec:(req,res)=>{
      const user=req.body.user;
      res.render("scalMPD/main10/scale106sec",{message:"",user:user});
    },
    scale108sec:(req,res)=>{
      const user=req.body.user;
      res.render("scalMPD/main10/scale108sec",{message:"",user:user});
    },
    MP4600P:(req,res)=>{
      const user=req.body.user;
      res.render("scalMPD/MP4/MP4600P",{message:"",user:user});
    },
    MP4720P:(req,res)=>{
      const user=req.body.user;
      res.render("scalMPD/MP4/MP4720P",{message:"",user:user});
    },
    MP41080P:(req,res)=>{
      const user=req.body.user;
      res.render("scalMPD/MP4/MP41080P",{message:"",user:user});
    },
    MP415000P:(req,res)=>{
      const user=req.body.user;
      res.render("scalMPD/MP4/MP415000P",{message:"",user:user});
    },
    }
   const  findByCamera = (ipcamera, cb) => {
    return  db.get(`SELECT * FROM camera WHERE ipcamera = ?`,[ipcamera], (err, row) => {
            cb(err, row)
    });
  }
