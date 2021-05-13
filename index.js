const express=require("express");
const sgMail=require("@sendgrid/mail");
const SgClient=require("@sendgrid/client");
const fs=require("fs");
const cors=require("cors");
const { default: axios } = require('axios');
////////// sendgrid api key ///////////
const api =  "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";
//const api=process.env.API_KEY;
/////// define port and express ///////////
const port =process.env.PORT || 5000;
const app = express();
/////////  middleware uses ////////////////
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//////// set ket in sendgrid client ///
SgClient.setApiKey(api);
sgMail.setApiKey(api);
///////////// final response message ////////////////
const ResponseMessage = {
  status: 200,
  message: "WARNING: Since SendGrid's API is take time to get bounce email so list of success and failer email result may be differ",
  data: {
      success: [],
      failure: [],
  },
};


  
 async function sendMail(data){
  //  /////////// get data which send by user ////////////
  try{
   let message=data.emailMessage;
   //// get the file data and encode the path of attachments into base64 ////////
   let attachments = data.attachments.map((value) => {
       const pathToAttachment = __dirname + "/" + value.path;
       const content = fs.readFileSync(pathToAttachment).toString("base64");
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
      to: "default@default.com",
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
    

   });
  
       
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
                subject:"message from globalshala",
                content:[{type:"text/html",value:message}]
            }
        });
        ////// use sleep function if you want to get accurate bounce emails
        //await sleep(60000);  /////////// to stop processing untill some emails get bounce 
        
        var results=await fetch(emails);    /////////// fetch bounce and sent emails seperately/////////
          return results;
      }catch(err){
          return err;
          
      }
      
  }
///// function definition to stop preccessing if you call it at line 83 //////////////
// function sleep(ms){
//   return new Promise(resolve=>setTimeout(resolve,ms));
  
// }

async function fetch(emails){
  var data=await axios.get("https://api.sendgrid.com/v3/suppression/bounces", {
  headers: {
    'Authorization':"Bearer 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",
    "accept": "application/json"
  }
})


//////// to delete all bounce emails /////////////////
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
app.get('/',(req,res)=>{
    res.send(GetResponse);
})
app.post("/", async(req, res) => {
  
    try {
 
      var ans=await sendMail(req.body);
      //   res.send(ans);
      return res.json(200,{
        message:ans
      });
    }
    catch (err) {
      return res.json(500, {
        message: "internal server error",
      });
    }
});

///// run express server /////////////
app.listen(port, ()=> {
    console.log(`SendGrid app listening at http://localhost:${port}`);
});

const GetResponse = `<pre>How To Use This API
    1. Method of request must be POST
    2. URL is https://globalshalamail.herokuapp.com/
    3. Set the headers of request as follows:
        a. 'Accept':'application/json, text/plain, /'
        b. 'Content-Type':'application/json'
    4. Set the body of request, for syntax check the /input formate/sample.txt</pre>`;
