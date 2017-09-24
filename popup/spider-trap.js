// Add eventlistener for the popup.
document.addEventListener("click", (e) => {
    var creepy_id = e.target.id;
    var url = 'https://www.iana.org/domains/reserved';

    // Report the action.
    browser.tabs.executeScript(null, {
        file: "/content_scripts/spider-trap-report.js"
    });

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
          browser.tabs.sendMessage(tabs[0].id, {creepy_id: creepy_id, url: url});
    });
});
