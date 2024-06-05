const express = require("express");
const app = express();
const  router  =  express.Router();
app.use(router);
// view engine setup 
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const{login,singin,inscription,Convertevideo,invitConvertevideo,FFmpegconvert,registre,addUser,editUser,dellUser, GetDellUser,GetvalidUser,GetEditUser,GetAddUser,GPageUser,Getalluser,ValidUser,PageUser}=require('./routes/player');
const{addSite,EditeSite,DelSite,GetaddSite,GetEditSite,GetDellSite,GetallSite,PageSite,GPageSite,scale2sec,scale4sec,scale6sec,scale8sec,scale10sec,scale104sec
,scale106sec,scale108sec,MP41080P,MP4720P,MP4600P,scalAuto}=require("./routes/CreatSite");
const cors = require("cors");
const rtspStream = require('node-rtsp-stream');
const Recorder = require('node-rtsp-recorder').Recorder;
const Stream = require('node-rtsp-stream');
const multer=require("multer");
const  sqlite3  =  require('sqlite3').verbose();
const database = new sqlite3.Database("./my.db");
const ffmpegPath = require('ffmpeg-static');
const childProcess = require('child_process');
const Progress=require("progress");
const ffprobe=require("ffprobe");
const SocketIO=require("socket.io");
const fs=require("fs");
const server      = require('http').createServer(app);
const io          = require('socket.io')(server);
const storage =multer.diskStorage({
  destination:(req,file,cd)=>{
    cd(null,"uploads")

  },
  filename:(req,file,cd)=>{
    cd(null,file.originalname)
  }
})
const upload=multer({
  storage:storage
})

var corsOptions = {
  origin: "http://localhost:3001"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/",(req, res) => {
  res.render("index",{ message: "Welcome to bezkoder application." });
});
app.post("/SelecteStream",(req,res)=>{
  const user =req.body.user;
  res.render("SelecteStream",{message:"",user:user});
});
app.post("/LivestreaMPD",(req,res)=>{
  const user =req.body.user;
  res.render("LivestreaMPD",{message:"",user:user});
});
app.post("/Livestreame",async(req,res)=>{
  const user =req.body.user;
  let site="";
  await db.all(`SELECT * FROM camera`,{},(err,result)=>{
    for(var i in result){
      if(user==result[i].user) site=result[i].site
    }
 res.render("liveStreamCamera",{message:"",user:user,site:site});
  });
});

app.post("/livepar1",async(req,res)=>{
  const user =req.body.user;
  let site="";
    await db.all(`SELECT * FROM camera`,{},(err,result)=>{
    for(var i in result){
      if(user==result[i].user) site=result[i].site
    }
  res.render("liveStreamCamera",{message:"",user:user,site:site});
  
  })
});
app.post("/livepar4",async(req,res)=>{
  const user =req.body.user;
  let site="";
await  db.all(`SELECT * FROM camera`,{},(err,result)=>{
    for(var i in result){
      if(user==result[i].user) site=result[i].site
    }
  res.render("liveStreaming/liveStreamingCamera4",{message:"",user:user,site:site});
  });
});
app.post("/livepar9",async(req,res)=>{
  const user =req.body.user;
  let site="";
 await db.all(`SELECT * FROM camera`,{},(err,result)=>{
    for(var i in result){
      if(user==result[i].user) site=result[i].site
    }
  res.render("liveStreaming/liveStreamingCamera9",{message:"",user:user,site:site});
 });
});

app.get("/camera",(req, res) => {
  res.render("ipcamera",{ message: "Welcome to bezkoder application." });
});

app.get("/menu",(req, res) => {
  res.render("FFmpegconvert",{ message: "" });
});
app.get("/list",(req, res) => {
  res.render("affichecamera",{ message: "Welcome to bezkoder application." });
});
app.get("/list16",(req, res) => {
  res.render("affichecamera16",{ message: "Welcome to bezkoder application." });
});
app.get("/mp4box",(req, res) => {
  res.render("mp4box",{ message: "Welcome to bezkoder application." });
});
app.get('/login',login);
app.post('/',login);
app.get('/PageSite/:user',GPageSite);
app.get('/pageUser/:user',GPageUser);
app.post('/PageSite',PageSite);
app.get('/inscription',inscription);
app.post("/GetDellUser", GetDellUser);
app.post("/GetvalidUser", GetvalidUser);
app.post("/GetEditUser", GetEditUser);
app.post("/getmenu", FFmpegconvert);
app.post("/GetaddUser", GetAddUser);
app.post("/convertevideo", Convertevideo);
app.post("/invitConvertevideo", invitConvertevideo);
app.post('/GetpageUser',PageUser);
app.get('/Getalluser',Getalluser);
app.post("/validUser", ValidUser);
app.post('/signup',registre);
app.post('/singin',singin);
app.post('/adduser',addUser);
app.post('/editUser',editUser);
app.post('/dellUser',dellUser);
app.post('/addSite',addSite);
app.post('/EditSite',EditeSite);
app.post('/DelleteSite',DelSite);
app.post('/GetaddSite',GetaddSite);
app.post('/GetEditSite',GetEditSite);
app.post('/scale2sec',scale2sec);
app.post('/scale4sec',scale4sec);
app.post('/scale6sec',scale6sec);
app.post('/scale8sec',scale8sec);
app.post('/scale10sec',scale10sec);
app.post('/scale104sec',scale104sec);
app.post('/scale106sec',scale106sec);
app.post('/scale108sec',scale108sec);
app.post('/MP41080',MP41080P);
app.post('/MP4600',MP4600P);
app.post('/MP4720',MP4720P);
app.post('/scaleAuto',scalAuto);
app.post('/GetDellSite',GetDellSite);
app.get('/GetallSite',GetallSite);
app.get('/GetallSite',GetallSite);

const  CreateUsersTable  = () => {
  const  sqlQuery  =  `
      CREATE TABLE IF NOT EXISTS users (
      id integer PRIMARY KEY,
      user text,
      email text,
      site text,
      poste text,
      mobile text,
      validUser text,
      password text)`;

  return  database.run(sqlQuery);
}
const  CreateCameraTable  = () => {
  const  sqlQuery  =  `
      CREATE TABLE IF NOT EXISTS camera (
      id integer PRIMARY KEY,
      camera text,
      user text,
      password text,
      poste text,
      port text,
      ipcamera text,
      site text)`;

  return  database.run(sqlQuery);
}

CreateUsersTable();
CreateCameraTable();

const jobs={};
let videoForm="";
app.post("/convert",upload.single("videoFile"),async(req,res)=>{
  const jobid= Date.now().toString();
  const {WidthVideo,NomVideoOutput,bitrate}=req.body;
if(req.file){
  const inputfilepath=req.file.path;
  let NomVidOutput=NomVideoOutput.replaceAll(" ","_");
  if(NomVideoOutput==""||NomVideoOutput==null)  NomVidOutput="converted";
 const videoFormat=req.body.videoFormat;
  videoForm=videoFormat;
  const outputfilepath=`public/output/${NomVidOutput}_${jobid}.${videoFormat}`;
  console.log(outputfilepath);
  const {streams}=await ffprobe(inputfilepath,{
    path:"ffprobe"
  })
  const videostreams= streams.find((strem) =>  strem.codec_type=== "video")
  const totalduration=videostreams ? parseFloat(videostreams.duration):"0";
  const videoScale=WidthVideo.replace("x",":");
  console.log("this",totalduration,videoScale,WidthVideo);
  const bar =new Progress('[:bar] :percent :etas',{
    width:40,
    total:totalduration 
  });
  const child = childProcess.spawn(
        ffmpegPath,
        // note, args must be an array when using spawn
        [  
            '-i',
            `${inputfilepath}`,
            '-c:v',
    'libx264',
    '-strict',
    '-2',
    '-crf',
    '30',
    '-b:v',
    `${bitrate}`,
    '-vf',
    `scale=${videoScale}`,
    `${outputfilepath}`
        ],
    );
    
    child.on('error', () => {
      //   // catches execution error (bad file)
        console.log(`Error executing binary: ${ffmpegPath}`);
        io.emit("conversionFailed",jobid,);
    });
    child.stdout.on('data', (data) => {
        console.log(data.toString());
    });
    child.stderr.on('data', (data) => {
       console.log(data.toString());
        var result=gettime(data.toString())
         if(isNaN(result) || result==null) return;
          io.emit("conversionProress",{
            jobid:jobid,
            progress:result
          })
        
    });
    
    child.on('close', (code) => {
        console.log(`Process exited with code: ${code}`);
        if (code === 0) {
              bar.update(1);
              console.log("conversion complette");
              const dowloadurl=`/download/${NomVidOutput}_${jobid}`;
              jobs[jobid]={
                status:"finished",
              }
        io.emit("conversionfinished",{jobid,dowloadurl,progress:100})
              console.log(`FFmpeg finished successfully`);
        } else {
            console.log(`FFmpeg encountered an error, check the console output`);
        }
    });
}else{
  res.status(200).json({ message: "select File" });
  console.log({ message: "select File" })
}

})

app.get("/download/:jobid",(req,res)=>{
  const {jobid}=req.params;
  const job=jobid.split("_");
  const jobstatus=jobs[job[1]];
  console.log(jobstatus);
  if(!jobstatus){
    res.status(404).json({error:"not video download"});
  }else{
    const {status}=jobstatus;
    if(status==="finished"){
      const downloadlik=`public/output/${jobid}.${videoForm}`;
      res.download(downloadlik,(error)=>{
        console.log(error)
      })
    }
  }
  })

  app.get("/downloadVideo/:filelink",(req,res)=>{
    const {filelink}=req.params;
    console.log(filelink);
    res.download(filelink.replaceAll("@","/"),(error)=>{
      console.log(error)
    })  
  })
  app.get("/downloadVideo/:link",(req,res)=>{
    const link=req.params;
    const filelink=`public/output/${link.replaceAll("@","/")}`
    res.download(filelink,(error)=>{
     console.log(error)
   }) 
 })

 
 
// routes
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
});
//==============live I CAMERA===============
app.get('/camera/:camera/:port', (req, res) => {
    console.log(req.params.port);
    if (req.params.camera == 1) {
        var ip_address2 = "192.168.1.117"
        const username = "admin";
        const password = "admin123";
    } else if (req.params.camera == 2) {
        var ip_address2 = "192.168.1.10"
        const username = "admin";
        const password = "admin123";
    }
    stream = new Stream({
        streamUrl: 'rtsp://' + username2 + ':' + password2 + '@' + ip_address2 + ':554/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
        wsPort: req.params.port
    });
    res.send('OK');
});
// Stop the stream that produce using ffmpeg
app.get('/camera/stop/:port', (req, res) => {
    stream.stop() // This is not make ffmpeg to stop the processing stream 
    res.send('OK');
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//@desc     Camera Authentication
app.post("/GetsiteRECORD",async(req,res)=>{
  const {user}=req.body;
  const directoryPath = `public/recording/`;
  let json=[];
  await fs.readdir(directoryPath, [], (err, files) => {
    files.forEach((file) => {
      json.push({"record":file.split('.')[0],"link":`${directoryPath}/${file.split('.')[0]}/`});
    });
    console.log(json)
res.render('pageRecord',{record:json,user:user});

})

 
});
app.post("/GetlisteRECORD",async(req,res)=>{
  const {filelink,user,left}=req.body;
  console.log(filelink);
  let json = [],format="";
  var tab=filelink.split("/");
  var linkleft=""
 if(left=="oui"){
  for(var i=0; i<tab.length-3;i++ ){
    linkleft+=`${tab[i]}/`
  }
     filelinks=linkleft
  
}else{
  filelinks=filelink
}
console.log(filelinks)
if(filelinks== "public/"){ res.render("menu",{message:"",user:user});}
else{
  await fs.readdir(filelinks.replaceAll("//","/"), [], (err, files) => {
    files.forEach(file => {
      format=file.split('.')[1];
      json.push({"record":file.split('.')[0],"video":`${filelinks.replace("public","")}${file}`,"link":`${filelinks.replaceAll("//","/")}${file.split('.')[0]}/`,"back":`${filelinks}/`});
    });
if(format=="mp4")   res.render('pageVideoRecord',{record:json,user});
else res.render('PageListRecord',{record:json,user});
  });
}
});

app.get("/getsite/id:",async(req,res)=>{
  const directoryPath = 'public/recording/';
  const fileList = fs.readdirSync(directoryPath);
  console.log('Files and folders in the directory:', fileList);
  for(var i in filename){
  // var  listannee=fileList[i].plite("-")
   }
  res.render('pageSelctRecord',{record:fileList});

  console.log(req.params.id);
  res.status(200).json({id:req.params.id});
});
app.get("/CreatFolderSite",async(req,res)=>{
  try {
    db.all(`SELECT * FROM camera`,{},(err,result)=>{  
      res.status(200).json(result);
      const folderName=__dirname +`\\public\\recording`;
      let folder=""
      for(var i in result){
        folder=`${folderName}\\${result[i].site.replace(" ","_")}`;
        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder);
        }
        console.log(folder)
       }
       })
    } catch (err) {
    console.log(err);
    }
  })
  app.get("/CreatfolderCamera",async(req,res)=>{
    try {
      db.all(`SELECT * FROM camera`,{},(err,result)=>{   
        res.status(200).json(result);
        let folderName="", folder="";
        for(var i in result){
          folderName= __dirname +`\\public\\recording\\${result[i].site.replace(" ","_")}`
         folder= `${folderName}\\camera${result[i].camera.match(/\d+/)[0]}`;
          if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
            console.log(folder)
          }
         }
         })
      } catch (err) {
      console.log(err);
      }
    })
    app.get('/camera/:camera/:port', (req, res) => {
      console.log(req.params.port);
      if (req.params.camera == 1) {
          var ip_address2 = "192.168.1.12"
          const username = "admin";
          const password = "admin123";
      } else if (req.params.camera == 2) {
          var ip_address2 = "192.168.1.10"
          const username = "admin";
          const password = "admin123";
      }
      stream = new Stream({
          streamUrl: 'rtsp://' + username2 + ':' + password2 + '@' + ip_address2 + ':554/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif',
          wsPort: req.params.port
      });
      res.send('OK'); 
  });
  // Stop the stream that produce using ffmpeg
  app.get('/camera/stop/:port', (req, res) => {
      stream.stop() // This is not make ffmpeg to stop the processing stream 
      res.send('OK');
  });
  // set port, listen for requests
  //================LIVE RECORDING  CAMERA USE node-rtsp-recorder =============
     const user="admin";
     const password="admin123";
     app.get("/",(req,res)=>{  
     db.all(`SELECT * FROM camera`,{},(err,result)=>{
     var rec = new Recorder({
      url:`rtsp://admin:admin123@192.168.1.33:554/`,
      playlist: 'playlist.m3u8',
      timeLimit: 60, // time in seconds for each segmented video file
      folder: `public/recording/${result[0].site.replace(" ","_")}/`,
      name: `camera${result[0].camera.match(/\d+/)[0]}`,
      directoryPathFormat: 'DD-MM-YYYY',
      fileNameFormat: 'M-D-h-mm-ss', 
      ffmpegBinary: 'ffmpeg'
       })
      rec.startRecording();
      res.status(200).json(result);
    })
  })
  
       
function hmsToSeconds(hms){
  const parts =hms.split(":");
  return(parseFloat(parts[0])*3600+parseFloat(parts[1])*60+parseFloat(parts[2]))
}
 function gettime(el){
  var str="",tab,number=0,str2="";
  //console.log("this",el);
  str= el.replace("bitrate=","bitrate= ");
  var str=str.split(" ");
  for(var i in str){
    if(str[i]=="bitrate=")  str2=str[i-1] ;
  }
  str2= str2.replace("time=","");
  str2= str2.replace(".=",":");
  tab= str2.split(":");
  console.log(str2);
  number= parseInt(tab[0])*3600+parseInt(tab[1])*60+parseInt(tab[2]);
  return number;
// return numb;
}

global.db=database;