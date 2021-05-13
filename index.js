// const express=require("express");
// const sgMail=require("@sendgrid/mail");
// const SgClient=require("@sendgrid/client");
// const fs=require("fs");
// const cors=require("cors");
// const { default: axios } = require('axios');
// ////////// sendgrid api key ///////////
// //const api = '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';
// //const api = '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';
// const api =  "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";
// //const api=process.env.API_KEY;
// /////// define port and express ///////////
// const port =process.env.PORT || 5000;
// const app = express();
// /////////  middleware uses ////////////////
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

// //////// set ket in sendgrid client ///
// SgClient.setApiKey(api);
// ///////////// final response message ////////////////
// const ResponseMessage = {
//   status: 200,
//   message: "WARNING: Since SendGrid's API is Asynchronus in nature, so list of \
// success and failure emails may not be accurate",
//   data: {
//       success: [],
//       failure: [],
//   },
// };


  
//  async function sendMail(data){
//    /////////// get data which send by user ////////////
//    let message=data.emailMessage;
//    //// get the file data and encode the path of attachments into base64 ////////
//    let attachments = data.attachments.map((value) => {
//        const content = fs.readFileSync(value.path, "base64");
//        return { content: content, filename: value.filename };
//    });
//    let personalizations=[];
//    let emails=[];
//    /////// get user details one by one and set it into personalizations //////////
//    data.userData.map((singleUser)=>{
//      if(emails.find((email)=>{return email==singleUser.email})){
//      }else{
//        emails.push(singleUser.email);
//      }
//      let tempData = {
//       [singleUser.type]: [{ email: singleUser.email }],
//       substitutions: {}
//      };
//      for (let value in singleUser) {
//       if (value !== "email" && value !== "type") {
//           tempData.substitutions[`{${value}}`] = singleUser[value];
//       }
//     }
//    //////////  push user data into personalizations array ///////////////
//     personalizations.push(tempData);
    

//    })
//       try{
//             await axios({
//             method:"post",
//             url:"https://api.sendgrid.com/v3/mail/send",
//             headers:{
//                 Authorization:`Bearer ${api}`
//             },
//             data:{
//                 personalizations:personalizations,
//                 from:{
//                     email:"pachory1997@gmail.com",
//                     name:"aadi"
//                 },
//                 attachments: attachments,
//                 subject:"hii there",
//                 content:[{type:"text/html",value:message}]
//             }
//         });
//         ////// use sleep function if you want to get accurate bounce emails
//         //await sleep(60000);  /////////// to stop processing untill some emails get bounce 
//         var results=await fetch(emails);    /////////// fetch bounce and sent emails seperately/////////
//         return results;
//       }catch(err){
//           console.log("error",err);
//           return err;
          
//       }
      
//   }
// ///// function definition to stop preccessing if you call it at line 83 //////////////
// // function sleep(ms){
// //   return new Promise(resolve=>setTimeout(resolve,ms));
  
// // }

// async function fetch(emails){
//   var data=await axios.get("https://api.sendgrid.com/v3/suppression/bounces", {
//   headers: {
//     'Authorization': `Bearer ${api}`,
//     "accept": "application/json"
//   }
// })

// ////////// to delete all bounce emails /////////////////
// const reqDelete = {
//   body: { delete_all: true },
//   method: "DELETE",
//   url:"/v3/suppression/bounces",
// };
// SgClient.request(reqDelete);
// //////////////// filtering bounce emails from all emails //////////////////
// data.data.map((value)=>{
//   var x=emails.findIndex((y)=>{return y==value.email});
//   emails.splice(x,1);
// })
// /////// store success and failer emails seperately ////////////////
// ResponseMessage.data.success = emails;
// ResponseMessage.data.failure = data.data;

// return ResponseMessage;
   
// }

// ///////////// set server route /////////////
// // app.get('/',(req,res)=>{
// //     res.send("hello");
// // })
// app.post("/", async(req, res) => {
//     let data={
//       userData:[{
//         email:"kushwahaa862@gmail.com",
//         name:"aditya",
//         status:"pass",
//         type:"to"
//       },
//       {
//         email:"ka@gmail.com",
//         name:"adya",
//         status:"pass",
//         type:"to"
//       },
//       {
//         email:"la@gmail.com",
//         name:"adya",
//         status:"pass",
//         type:"to"
//       }],
//       emailMessage:"hi {name} , <b>your result is {status}</b>",
//       attachments:[{filename:'krishna.jpg',path:__dirname+'/krishna.jpg'}]
//     }
//     try {
//         let ans=await sendMail(req.body);
//         res.send(ans);
//     }
//     catch (err) {
//       return res.json(500, {
//         message: "internal server error",
//       });
//     }
// });

// ///// run express server /////////////
// app.listen(port, ()=> {
//     console.log(`SendGrid app listening at http://localhost:${port}`);
// });
// const express=require("express");
// const sgMail=require("@sendgrid/mail");
// const SgClient=require("@sendgrid/client");
// const fs=require("fs");
// const cors=require("cors");
// const { default: axios } = require('axios');
// ////////// sendgrid api key ///////////
// //const api = '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';
// //const api = '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';
// const api =  "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";
// //const api=process.env.API_KEY;
// /////// define port and express ///////////
// const port =process.env.PORT || 5000;
// const app = express();
// /////////  middleware uses ////////////////
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

// //////// set ket in sendgrid client ///
// SgClient.setApiKey(api);
// sgMail.setApiKey(api);
// sgMail.setSubstitutionWrappers("{", "}");
// ///////////// final response message ////////////////
// const ResponseMessage = {
//   status: 200,
//   message: "WARNING: Since SendGrid's API is Asynchronus in nature, so list of \
// success and failure emails may not be accurate",
//   data: {
//       success: [],
//       failure: [],
//   },
// };


  
//  function sendMail(data){
//   //  /////////// get data which send by user ////////////
//    let message=data.emailMessage;
//    //// get the file data and encode the path of attachments into base64 ////////
//    let attachments = data.attachments.map((value) => {
//        const content = fs.readFileSync(value.path, "base64");
//        return { content: content, filename: value.filename };
//    });
//    let personalizations=[];
//    let emails=[];
//    /////// get user details one by one and set it into personalizations //////////
//    data.userData.map((singleUser)=>{
//      if(emails.find((email)=>{return email==singleUser.email})){
//      }else{
//        emails.push(singleUser.email);
//      }
//      let tempData = {
//       to: "default@default.com",
//       [singleUser.type]: [{ email: singleUser.email }],
//       substitutions: {}
//      };
//      for (let value in singleUser) {
//       if (value !== "email" && value !== "type") {
//           tempData.substitutions[`{${value}}`] = singleUser[value];
//       }
//     }
//    //////////  push user data into personalizations array ///////////////
//     personalizations.push(tempData);
    

//    });
  
//        try{
//             await axios({
//             method:"post",
//             url:"https://api.sendgrid.com/v3/mail/send",
//             headers:{
//                 Authorization:"Bearer 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"
//             },
//             data:{
//                 personalizations:personalizations,
//                 from:{
//                     email:"pachory1997@gmail.com",
//                     name:"aadi"
//                 },
//                 attachments: attachments,
//                 subject:"hii there",
//                 content:[{type:"text/html",value:message}]
//             }
//         });
//         ////// use sleep function if you want to get accurate bounce emails
//         //await sleep(60000);  /////////// to stop processing untill some emails get bounce 
//         //let data = await sgMail.send(msg);
//     //RetriveInvalidEmails(res, Emails);
//      // var results=await fetch(emails);    /////////// fetch bounce and sent emails seperately/////////
//           return ResponseMessage;
//       }catch(err){
//           console.log("error",err);
//           return err;
          
//       }
      
//   }
// ///// function definition to stop preccessing if you call it at line 83 //////////////
// // function sleep(ms){
// //   return new Promise(resolve=>setTimeout(resolve,ms));
  
// // }

// async function fetch(emails){
//   var data=await axios.get("https://api.sendgrid.com/v3/suppression/bounces", {
//   headers: {
//     'Authorization':"Bearer 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",
//     "accept": "application/json"
//   }
// })


// //////// to delete all bounce emails /////////////////
// const reqDelete = {
//   body: { delete_all: true },
//   method: "DELETE",
//   url:"/v3/suppression/bounces",
// };
// SgClient.request(reqDelete);
// //////////////// filtering bounce emails from all emails //////////////////
// data.data.map((value)=>{
//   var x=emails.findIndex((y)=>{return y==value.email});
//   emails.splice(x,1);
// })
// /////// store success and failer emails seperately ////////////////
// ResponseMessage.data.success = emails;
// ResponseMessage.data.failure = data.data;

// return ResponseMessage;
   
// }

// ///////////// set server route /////////////
// app.get('/',(req,res)=>{
//     res.send("hello");
// })
// app.post("/", async(req, res) => {
//   /////////// get data which send by user ////////////
//   // let message=req.body.emailMessage;
//   // //// get the file data and encode the path of attachments into base64 ////////
//   // let attachments = req.body.attachments.map((value) => {
//   //     const content = fs.readFileSync(value.path, "base64");
//   //     return { content: content, filename: value.filename };
//   // });
//   // let personalizations=[];
//   // let emails=[];
//   // /////// get user details one by one and set it into personalizations //////////
//   // req.body.userData.map((singleUser)=>{
//   //   if(emails.find((email)=>{return email==singleUser.email})){
//   //   }else{
//   //     emails.push(singleUser.email);
//   //   }
//   //   let tempData = {
//   //    to: "default@default.com",
//   //    [singleUser.type]: [{ email: singleUser.email }],
//   //    substitutions: {}
//   //   };
//   //   for (let value in singleUser) {
//   //    if (value !== "email" && value !== "type") {
//   //        tempData.substitutions[`{${value}}`] = singleUser[value];
//   //    }
//   //  }
//   // //////////  push user data into personalizations array ///////////////
//   //  personalizations.push(tempData);
   

//   // });

//     try {
//     //   await axios({
//     //     method:"post",
//     //     url:"https://api.sendgrid.com/v3/mail/send",
//     //     headers:{
//     //         Authorization:"Bearer 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"
//     //     },
//     //     data:{
//     //         personalizations:personalizations,
//     //         from:{
//     //             email:"pachory1997@gmail.com",
//     //             name:"aadi"
//     //         },
//     //         attachments: attachments,
//     //         subject:"hii there",
//     //         content:[{type:"text/html",value:message}]
//     //     }
//     // });
//       //var ans=sendMail(req.body);
//       //   res.send(ans);
//       return res.json(200,{
//         message:ResponseMessage
//       });
//     }
//     catch (err) {
//       return res.json(500, {
//         message: "internal server error",
//       });
//     }
// });

// ///// run express server /////////////
// app.listen(port, ()=> {
//     console.log(`SendGrid app listening at http://localhost:${port}`);
// });
const express = require("express");
var sgMail = require("@sendgrid/mail");
const fs = require("fs");
const path = require("path");
const async = require("async");
const sgClient = require("@sendgrid/client");
const port = 8000 || process.env.port;
const app = express();
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//for substitution
sgMail.setSubstitutionWrappers("{", "}");
// const API_KEY1 = process.env.sendGrid_API_Key;
const API_KEY1 =
  "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";
sgMail.setApiKey(API_KEY1);
sgClient.setApiKey(API_KEY1);
//funtion to retrieve email which not sent successfully
//Since SendGrid API is Asynchronus, so this may not work expected
const RetriveInvalidEmails = (res, Emails) => {
  const request = {
    method: "GET",
    url: "/v3/suppression/bounces",
  };
  const reqDelete = {
    body: { delete_all: true },
    method: "DELETE",
    url: request.url,
    json: true,
  };
  sgClient
    .request(request)
    .then(async ([response, body]) => {
      console.log(response.statusCode);
      console.log(body);
      await body.map(async (data) => {
        let x = await Emails.findIndex((i) => {
          return i == data.email;
        });
        console.log(x);
        if (x !== -1) {
          Emails.splice(x, 1);
          console.log(Emails);
        }
      });
      sgClient.request(reqDelete);
      console.log("hello");
      return res.json(200, {
        status: 200,
        message:
          "WARNING: Since SendGrid's API is Asynchronus in nature, so list of success and failure emails may not be accurate",
        data: {
          success: Emails,
          failure: body,
        },
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};
//handle post request send by user
app.post("/", async (req, res) => {
  console.log(req.body);
  let attachments = req.body.attachements.map((file) => {
    console.log(file);
    const pathToAttachment = __dirname + "/" + file.path;
    const attachment = fs.readFileSync(pathToAttachment).toString("base64");
    return {
      content: attachment,
      filename: file.filename,
    };
  });
  let Emails = [];
  let personalizations = [];
  let htmlcontent = req.body.content;
  req.body.Data.map((data) => {
    if (
      Emails.find((i) => {
        return i == data.email;
      })
    ) {
    } else {
      Emails.push(data.email);
    }
    let temp = {
      to: "default@default.com",
      [data.type]: { email: data.email },
      substitutions: {},
    };
    for (let i in data) {
      console.log(i);
      if (i !== "email" && i !== "type") {
        temp.substitutions[i] = data[i];
      }
    }
    console.log(temp.substitutions);
    //push data into personalizations
    personalizations.push(temp);
  });
  const msg = {
    personalizations: personalizations,
    from: "pachory1997@gmail.com",
    subject: "Globalshala backend task",
    html: htmlcontent,
    attachments: attachments,
  };
  try {
    let data = await sgMail.send(msg);
    RetriveInvalidEmails(res, Emails);
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "internal server error",
    });
  }
});
//server setup

app.get("/", (req, res, next) => {
  res.send(GetResponse);
});
app.listen(process.env.PORT || port, () => {
  console.log(`SendGrid app listening at http://localhost:${port}`);
});
//Get Response
const GetResponse = `<pre>How To Use This API
  1. Method of request must be POST
  2. URL is https://vkswhyglobalshalaintern.herokuapp.com/
  3. Set the headers of request as follows:
      a. 'Accept':'application/json, text/plain, /'
      b. 'Content-Type':'application/json'
  4. Set the body of request, for syntax check the sample.txt</pre>`;
