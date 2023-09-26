const API_KEY = "Q26nWaxQtERy3w8Srveh0WgpfFs";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

async function postForm(e) {
    const form = new FormData(document.getElementById("checksform"));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });

    const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        throw new Error(data.error);
    }

}

function displayErrors(data) {
    let heading = `JSHint Results for ${data.file}`;
    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span>`
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span></div>, `;
            results += `column <span class="column">${error.col}</span></div>`;
            results += `<div class="error">${error.error}</div>`;

        }
    }
    //to display the modal
    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();

}

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
    //When you click on Check Key on the JSHinterface the API key expiry date status will display

}