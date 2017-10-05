// TODO: Add checkbox for TEST status.
// TODO: What to do with the index checker data? How to display?
// TODO: Styling of debug data.
// TODO: Can we work with browser notifications?

var currentTab = '';

function getActiveTab() {
  return browser.tabs.query({active: true, currentWindow: true});
}

// Get the url of the current tab, then we can do stuff.
getActiveTab().then((tabs) => {
    currentTab = tabs[0];

    // Get the Index checker data for the current url.
    var url = 'https://www.openindex.io/portal/api/snippet?url=' + encodeURI(currentTab.url);
    XMLHttpRequest_OI(url, printIndexCheckerData);

    // Get the Classy options from openindex.
    var url = 'https://www.openindex.io/portal/api/modeltraining/categories?project=classy';
    XMLHttpRequest_OI(url, addClassyOptions);

    // Bind onclick to spider trap buttons.
    var spider_trap_buttons = document.getElementsByClassName('button');
    for (var i=0;i<spider_trap_buttons.length;i++) {
        spider_trap_buttons[i].addEventListener('click', submitSpiderTrap, false);
    }
});

/**
 * Submit spider trap data to OI.
 */
function submitSpiderTrap() {
    var id = this.getAttribute('id');
    var url = 'https://www.openindex.io/portal/api/modeltraining/report?test=1&cat_id=' + id + '&url=' + currentTab.url;

    XMLHttpRequest_OI(url, printResponse);
}

/**
 * Prints index checker data.
 * @param  {array} arr
 */
function printIndexCheckerData(arr) {
    var out = "";
    var i;
    var keys = Object.keys(arr);

    for(i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = arr[keys[i]];
        if (key.indexOf('prob_') == 0) {
            key = key.replace('prob_', '');
            out += '<li>' + key + ' - ' +  value + '</li>';
        }
    }
    if ( out != '' ) {
        out = '<div id="index-checker-data"><ul>' + out + '</ul></div>';
    }
    document.getElementById('index-checker').innerHTML = out;
}

/**
 * Adds options to the classy <select>
 * @param {array} classyData
 */
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

/**
 * Submit classy data to OI.
 */
var classy_submit = document.getElementById('classy-submit');
classy_submit.addEventListener('click', (e) => {
    var selected = document.getElementById('classy');
    var url = "https://www.openindex.io/portal/api/modeltraining/report?test=1&cat_id=" + selected.value + "&url=https://www.iana.org/domains/reserved";
    XMLHttpRequest_OI(url, printResponse);
});

/**
 * Prints response from a request to OI.
 * @param  {string} text
 */
function printResponse(text) {
    document.getElementById('debug').innerHTML = text.code + ' - ' + text.msg + ' - ' + currentTab.url;
    document.getElementById('debug').style.display = 'block';
}

/**
 * Does a XMLHttpRequest and performs a callback.
 * @param       {string}   url
 * @param       {Function} callback
 */
function XMLHttpRequest_OI(url, callback){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            callback(response);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
