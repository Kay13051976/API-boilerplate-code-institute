const API_KEY ="Q26nWaxQtERy3w8Srveh0WgpfFs";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        // Create our display status function and this will take in the parameter of data
        displayStatus(data)

        //to just see expiry date put this instead console.log(data.expiry);
    } else {

        // add an else clause to our if statement and throw an error if the response is not "okay"(test it by put 123 in the end of your API key then check key in JSHinterface)
        throw new Error(data.error);
        
    }
}

// Display status function
function displayStatus(data) {
    let heading = "API Key Status";
    let results = `<div class="key-status">${data.expiry}</div>`

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;

    resultsModal.show();
    //When you click on Check Key on the JSHinterface the API key status expiry date will display

}