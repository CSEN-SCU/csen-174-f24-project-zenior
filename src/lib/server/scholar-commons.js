

function getApi() {
fetch('https://content-out.bepress.com/v2/scholarcommons.scu.edu/eng_senior_theses/fields', {
    method: 'GET', // or 'POST', 'PUT', etc.
    headers: {
        "Authorization" : process.env.DIGITAL_COMMONS_API_TOKEN, // Add any necessary authorization headers
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
