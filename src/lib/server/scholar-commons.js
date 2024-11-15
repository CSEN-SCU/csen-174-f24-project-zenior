'use server'

const baseUrl = 'https://content-out.bepress.com/v2/scholarcommons.scu.edu/';
const init = {
  method: 'GET', // or 'POST', 'PUT', etc.
  headers: {
      "Authorization" : process.env.DIGITAL_COMMONS_API_TOKEN, // Add any necessary authorization headers
  }
};


async function validateResponse(response){
  if(!response.ok){
    throw new Error('Response status: ${response.status}')
  }

  const resultJson = await response.json();

  return resultJson.results
}


// Function returns n  of the oldest previous theses that a faculty advisor has advised
// Parameters:
// - facultyName: Name of faculty to search for
// - callback: Function to be invoked when data has returned from scholar commons.
// - n: Number of results to return. If not set, will return at most 100 results.
// Invariance: Will throw an error if facultyName is undefined.
// Example:
// const previousAdvisedProjects = await getFacultyPreviousProjects("Jane Doe", 10);
// Returns:
// Array of the 10 oldest theses that Jane Doe has advised. 
async function getFacultyPreviousProjects(facultyName, callback, n){
  if(facultyName === undefined){
    throw new Error("Faculty Required to be defined");
  }

  const queryUrl = baseUrl + "query?virtual_ancestor_link=http://scholarcommons.scu.edu/eng_senior_theses&select_fields=all" + (n? "&limit=" + n : "") + "&configured_field_t_advisor=" + facultyName;
  
  
  const response = await fetch(queryUrl, init)
  return  await validateResponse(response)

}


async function getThesesWithKeywordFilters(filters, callback, n){

  const limitField = (n? "&limit=" + n : "");
  let abstractField = "";
  let titleField = "";
  for(let i = 0;  i < filters.length; i++){
    abstractField = abstractField + "&abstract=" + filters[i];
    titleField = titleField + "&title=" + filters[i];
  }

  const queryUrl = baseUrl + "query?virtual_ancestor_link=http://scholarcommons.scu.edu/eng_senior_theses&select_fields=all"+ abstractField + titleField + limitField;
  console.log(queryUrl)
  const response = await fetch(queryUrl, init)
  return  await validateResponse(response)

}