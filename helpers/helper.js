const axios = require("axios").default;

async function ApiClient({auth, method, api}) {
  return new Promise((resolve, reject) => {
    const token = auth.toString();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios({
      method: method.toString(),
      url: api.toString()
  }).then(({data})=> {return data;})
    .then(resolve)
    .catch(reject);
  });
}

module.exports={ApiClient}