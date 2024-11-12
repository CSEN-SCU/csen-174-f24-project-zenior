const baseUrl = 'https://content-out.bepress.com/v2/scholarcommons.scu.edu/';
const init = {
  method: 'GET', // or 'POST', 'PUT', etc.
  headers: {
      "Authorization" : process.env.DIGITAL_COMMONS_API_TOKEN, // Add any necessary authorization headers
  }
};


function writeResults(results){

  console.log(results)
  // Uncomment below to locally write json file of results for debug purposes
  // const fs = require('fs')
  // fs.writeFile("ScholarCommonsResults.json", JSON.stringify(results), (err) => { if(err) throw err;})
}


function getApi(endpoint) {
const endpointUrl = baseUrl + endpoint;
fetch(endpointUrl, init)
    .then(response => response.json())
    .then(data => writeResults(data))
    .catch(error => console.error('Error:', error));

}


function getTheses() {
  const queryUrl = baseUrl + "query?virtual_ancestor_link=http://scholarcommons.scu.edu/eng_senior_theses&select_fields=all&limit=1000";

  fetch(queryUrl, init)
    .then(response => response.json())
    .then(data => writeResults(data.results))
    .catch(error => console.error('Error:', error));


}
// postman?

function getFacultyPreviousProjects(faculty, n){
  const queryUrl = baseUrl + "query?virtual_ancestor_link=http://scholarcommons.scu.edu/eng_senior_theses&select_fields=all" + (n? "&limit=" + n : "") + "&configured_field_t_advisor=" + faculty;
  console.log(queryUrl);
  fetch(queryUrl, init)
    .then(response => response.json())
    .then(data => writeResults(data.results))
    .catch(error => console.error('Error:', error));

}
