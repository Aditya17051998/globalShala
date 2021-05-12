const express=require("express");
const sgMail=require("@sendgrid/mail");
const SgClient=require("@sendgrid/client");
const fs=require("fs");
const cors=require("cors");
const { default: axios } = require('axios');
////////// sendgrid api key ///////////
//const api = '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';
//const api = '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';
//const api =  "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";
const api=process.env.api_key;
/////// define port and express ///////////
const port = 5000;
const app = express();
/////////  middleware uses ////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//////// set ket in sendgrid client ///
SgClient.setApiKey(api);
///////////// final response message ////////////////
const ResponseMessage = {
  status: 200,
  message: "WARNING: Since SendGrid's API is Asynchronus in nature, so list of \
success and failure emails may not be accurate",
  data: {
      success: [],
      failure: [],
  },
};


  
 async function sendMail(data){
   /////////// get data which send by user ////////////
   let message=data.emailMessage;
   //// get the file data and encode the path of attachments into base64 ////////
   let attachments = data.attachments.map((value) => {
       const content = fs.readFileSync(value.path, "base64");
       return { content: content, filename: value.filename };
   });
   let personalizations=[];
   let emails=[];
   /////// get user details one by one and set it into personalizations //////////
   data.userData.map((singleUser)=>{
     if(emails.find((email)=>{return email==singleUser.email})){
     }else{
       emails.push(singleUser.email);
     }
     let tempData = {
      [singleUser.type]: [{ email: singleUser.email }],
      substitutions: {}
     };
     for (let value in singleUser) {
      if (value !== "email" && value !== "type") {
          tempData.substitutions[`{${value}}`] = singleUser[value];
      }
    }
   //////////  push user data into personalizations array ///////////////
    personalizations.push(tempData);
    

   })
      try{
            await axios({
            method:"post",
            url:"https://api.sendgrid.com/v3/mail/send",
            headers:{
                Authorization:"Bearer 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"
            },
            data:{
                personalizations:personalizations,
                from:{
                    email:"pachory1997@gmail.com",
                    name:"aadi"
                },
                attachments: attachments,
                subject:"hii there",
                content:[{type:"text/html",value:message}]
            }
        });
        ////// use sleep function if you want to get accurate bounce emails
        //await sleep(60000);  /////////// to stop processing untill some emails get bounce 
        var results=await fetch(emails);    /////////// fetch bounce and sent emails seperately/////////
        return results;
      }catch(err){
          console.log("error",err);
      }
      
  }
///// function definition to stop preccessing if you call it at line 83 //////////////
// function sleep(ms){
//   return new Promise(resolve=>setTimeout(resolve,ms));
  
// }

async function fetch(emails){
  var data=await axios.get("https://api.sendgrid.com/v3/suppression/bounces", {
  headers: {
    'Authorization': "Bearer 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",
    "accept": "application/json"
  }
})

////////// to delete all bounce emails /////////////////
const reqDelete = {
  body: { delete_all: true },
  method: "DELETE",
  url:"/v3/suppression/bounces",
};
SgClient.request(reqDelete);
//////////////// filtering bounce emails from all emails //////////////////
data.data.map((value)=>{
  var x=emails.findIndex((y)=>{return y==value.email});
  emails.splice(x,1);
})
/////// store success and failer emails seperately ////////////////
ResponseMessage.data.success = emails;
ResponseMessage.data.failure = data.data;

return ResponseMessage;
   
}

///////////// set server route /////////////
// app.get('/',(req,res)=>{
//     res.send("hello");
// })
app.post("/", async(req, res) => {
    let data={
      userData:[{
        email:"kushwahaa862@gmail.com",
        name:"aditya",
        status:"pass",
        type:"to"
      },
      {
        email:"ka@gmail.com",
        name:"adya",
        status:"pass",
        type:"to"
      },
      {
        email:"la@gmail.com",
        name:"adya",
        status:"pass",
        type:"to"
      }],
      emailMessage:"hi {name} , <b>your result is {status}</b>",
      attachments:[{filename:'krishna.jpg',path:__dirname+'/krishna.jpg'}]
    }
    try {
        let ans=await sendMail(req.body);
        res.send(ans);
    }
    catch (err) {
        res.send(err);
    }
});

///// run express server /////////////
app.listen(process.env.PORT || port, ()=> {
    console.log(`SendGrid app listening at http://localhost:${port}`);
});