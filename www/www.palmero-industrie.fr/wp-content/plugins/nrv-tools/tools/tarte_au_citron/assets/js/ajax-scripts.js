// console.log(nrvtac_ajaxurl);
function listenCookieChange(callback, interval = 1000){
  let lastCookie = nrv_get_Cookie(tac_nrv_vars.cookieName);
  setInterval(()=> {
    let cookie = nrv_get_Cookie(tac_nrv_vars.cookieName);
    if (cookie !== lastCookie) {
      try {
        callback({oldValue: lastCookie, newValue: cookie});
      } finally {
        lastCookie = cookie;
      }
    }
  }, interval);
}

function nrv_get_Cookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

listenCookieChange(({oldValue, newValue})=> {
   jQuery(document).ready(function($){
     $.ajax({
       url: nrvtac_ajaxurl,
       type: "POST",
       data: {
         'action': 'nrv_tac_save_user_prefs',
         'cookie': newValue
       }
     });
   });
}, 1000);
