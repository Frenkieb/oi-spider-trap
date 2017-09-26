// Add eventlistener for the popup.
document.addEventListener("click", (e) => {
    if (e.target.classList.contains('button')) {
        var creepy_id = e.target.id;

        // Report the action.
        browser.tabs.executeScript(null, {
            file: "/content_scripts/spider-trap-report.js"
        });

        var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {
              browser.tabs.sendMessage(tabs[0].id, {creepy_id: creepy_id});
        });
    }
});

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

// Get the url of the current tab.
var currentTab = '';
getActiveTab().then((tabs) => {
    currentTab = tabs[0];

    // Get the Index checker data for the current url.
    var xmlhttp = new XMLHttpRequest();
    var url = 'https://www.openindex.io/portal/api/snippet?url=' + encodeURI(currentTab.url);

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            myFunction(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(arr) {
        var out = "";
        var i;
        var keys = Object.keys(arr);

        for(i = 0; i < keys.length; i++) {
            out += keys[i] + ' - ' +  arr[keys[i]] + '<br>';
        }
        document.getElementById("index-checker-data").innerHTML = out;
    }
});

// Get the Classy options from openindex.
var xmlhttp = new XMLHttpRequest();
var url = "https://www.openindex.io/portal/api/modeltraining/categories?project=classy";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var classyData = JSON.parse(this.responseText);
        addClassyOptions(classyData);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function addClassyOptions(classyData) {
    var select = document.getElementById('classy');

    for(var i = 0; i < classyData.length; i++) {
        var option = document.createElement('option');
        option.value = classyData[i].id;
        option.text = classyData[i].name;
        option.className = 'classy';
        select.add(option);
    }
}
