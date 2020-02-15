
const fetch = require('node-fetch');
export const authTwitch = async () => {
  const response = await fetch('https://id.twitch.tv/oauth2/authorize?client_id=e2oo0q2wfiu9x3r0fzkh7cornp3652&redirect_uri=http://localhost:3000&response_type=code&scope=user:edit' , {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin    https://cors-anywhere.herokuapp.com/

  })
  console.log(response);
  console.log(JSON.stringify(response))
  return JSON.stringify(response);
}

