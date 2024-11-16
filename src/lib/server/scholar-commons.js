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
// - n: Number of results to return. If not set, will return at most 100 results.
// Invariance: Will throw an error if facultyName is undefined.
// Example:
// const previousAdvisedProjects = await getFacultyPreviousProjects("Jane Doe", 10);
// Returns:
// Array of the 10 oldest theses that Jane Doe has advised. 
export async function getFacultyPreviousProjects(facultyName, n){
  if(facultyName === undefined){
    throw new Error("Faculty Required to be defined");
  }

  const queryUrl = baseUrl + "query?virtual_ancestor_link=http://scholarcommons.scu.edu/eng_senior_theses&select_fields=all" + (n? "&limit=" + n : "") + "&configured_field_t_advisor=" + facultyName;
  
  
  const response = await fetch(queryUrl, init)
  return  await validateResponse(response)

}



// Function returns n of the oldest previous theses with the filter keywords associated in the abstract
// Parameters:
// - filters: Array of keywords to filter results
// - n: Number of results to return. If not set, will return at most 100 results
// Example:
// const results = wait getThesesWithKeywordFilters(["AI", "Cloud", "HPC"])
// Returns:
// Array of 100 oldest theses that have "AI", "Cloud", or "HPC" in the abstract.
//!@todo: Do we need to remove dups? I.e say an abstract has AI and cloud, on the AI query it will return and the cloud query it will return.
export async function getThesesWithKeywordFilters(filters, n){

  const limitField = (n? '&limit='+ n : '');

  const queryUrl = baseUrl + 'query?virtual_ancestor_link=http://scholarcommons.scu.edu/eng_senior_theses&select_fields=all' + limitField;
  let results = []
  for(let i = 0; i < filters.length; i++){
    const requestUrl = queryUrl + "&abstract=" + filters[i]
    const response = await fetch(requestUrl, init)
    results[i] = await validateResponse(response)
  }
  return results

}