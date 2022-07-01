const axios = require("axios").default;
const express = require("express");
const { request } = require("express");

const app = express();
app.use(express.json());

var methodReq = "";
var apiReq = "";
var authReq = "";

app.listen(3000, () => {
  console.log("Server ejecutandose en el puerto 3000");
});

app.post("/", async (req, res) => {
  methodReq = req.body.method;
  apiReq = req.body.api;
  authReq = req.body.auth;

  console.log("Method: " + methodReq);
  console.log("Api: " + apiReq);
  console.log("Auth: " + authReq);

  try {
    let apiRes;
    if(!apiReq.toString().toUpperCase().includes("HTTP")){
      apiRes = {error:"El api debe contener http o https."};
    }
    else{
      apiRes = await ApiClient();
    }

    res.json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

async function ApiClient() {
  return new Promise((resolve, reject) => {
    const token = authReq.toString();
    console.log("Token: "+token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios({
      method: methodReq.toString(),
      url: apiReq.toString()
  }).then(({data})=> {return data;})
    .then(resolve)
    .catch(reject);
  });
}