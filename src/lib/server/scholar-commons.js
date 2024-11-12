

function writeResults(results){

  console.log(results)
  // Uncomment below to locally write json file of results for debug purposes
  // const fs = require('fs')
  // fs.writeFile("ScholarCommonsResults.json", JSON.stringify(results), (err) => { if(err) throw err;})
}

function getApi(endpoint) {
const baseUrl = 'https://content-out.bepress.com/v2/scholarcommons.scu.edu/';
const endpointUrl = baseUrl + endpoint;
fetch(endpointUrl, {
    method: 'GET', // or 'POST', 'PUT', etc.
    headers: {
        "Authorization" : process.env.DIGITAL_COMMONS_API_TOKEN, // Add any necessary authorization headers
    }
  })
    .then(response => response.json())
    .then(data => writeResults(data))
    .catch(error => console.error('Error:', error));

}
