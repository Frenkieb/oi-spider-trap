function listener(request, sender, sendResponse) {
    if (typeof jQuery != 'undefined') {
        var current_url = window.location.href;
        var url = 'https://www.openindex.io/portal/api/modeltraining/report?test=1&cat_id=' + request.creepy_id + '&url=' + current_url;
        
        jQuery.getJSON(url)
            .done(function( data ) {
                browser.runtime.sendMessage({msg: data.code + ' - ' + data.msg, url: current_url });
            });
      }
     browser.runtime.onMessage.removeListener(listener);
}

// Assign listener() as a listener for messages from the extension.
browser.runtime.onMessage.addListener(listener);
