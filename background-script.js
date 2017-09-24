/**
 * Display notification
 * @param  {object} message
 */
function notify(message) {
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL('icons/spider-48.png'),
    "title": 'Reported: ' + message.url,
    "message": message.msg
  });
}

// Assign `notify()` as a listener to messages from the content script.
browser.runtime.onMessage.addListener(notify);
