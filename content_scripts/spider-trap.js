var url = 'https://www.openindex.io/portal/api/urlfilter?url=' + encodeURI(window.location.href);
if (typeof jQuery != 'undefined') {
    jQuery.getJSON(url)
          .done(function( data ) {
              // If first postion of data.url equals '-' it's a spider trap.
              // https://www.martiniplaza.nl/evenementen/kalender/maand/1999/4 is a spider trap.
              if (data.url.substr(0,1) == '-') {
                  document.body.style.border = "5px solid red";
            }
        });
}
