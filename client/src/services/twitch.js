


export async function authTwitch() {
      // Default options are marked with *
  const response = await fetch("https://id.twitch.tv/oauth2/authorize?"
    + "client_id=e2oo0q2wfiu9x3r0fzkh7cornp3652&"
    + "redirect_uri=http://localhost:5000&response_type=token&"
    + "scope=user:edit"
    , {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify() // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}