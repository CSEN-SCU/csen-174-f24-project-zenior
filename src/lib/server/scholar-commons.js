const baseUrl = 'https://content-out.bepress.com/v2/scholarcommons.scu.edu/';

function writeResults(results){

  console.log(results)
  // Uncomment below to locally write json file of results for debug purposes
  // const fs = require('fs')
  // fs.writeFile("ScholarCommonsResults.json", JSON.stringify(results), (err) => { if(err) throw err;})
}

function getApi(endpoint) {
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


function getTheses() {
  const queryUrl = baseUrl + "query?virtual_ancestor_link=http://scholarcommons.scu.edu/eng_senior_theses&select_fields=all&limit=10";

  fetch(queryUrl, {
    method: 'GET', // or 'POST', 'PUT', etc.
    headers: {
        "Authorization" : process.env.DIGITAL_COMMONS_API_TOKEN, // Add any necessary authorization headers
    }
  })
    .then(response => response.json())
    .then(data => writeResults(data))
    .catch(error => console.error('Error:', error));


}
