/**
 * Creating a cookie
 * @method setCookie
 * @param  {string}     name  [description]
 * @param  {mixed}      value [description]
 * @param  {int}        days  [description]
 * @return {[type]}           [description]
 */
function setCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}


/**
 * Get a cookie
 * @method getCookie
 * @param  {string}   name [description]
 * @return {[type]}        [description]
 */
function getCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}


/**
 * Delete a cookie
 * @method deleteCookie
 * @param  {string}     name [description]
 * @return {[type]}          [description]
 */
function deleteCookie(name) {
    createCookie(name, "", -1);
}


/**
 * Edit the url, set or replace the query parameters
 * @method setUrlParam
 * @param  {string}        paramName
 * @param  {string}        paramValue
 * @param  {string}        url
 * @return string
 */
function setUrlParam(paramName, paramValue, url = window.location.href){
    if(paramValue === null){
      paramValue = '';
    }

    var pattern = new RegExp('\\b('+paramName+'=).*?(&|#|$)');

    if(url.search(pattern) >= 0){
      return url.replace(pattern, '$1' + paramValue + '$2');
    }

    url = url.replace(/[?#]$/,'');
    if(url.indexOf('?') > 0){
      separator = "&";
    }else{
      separator = "?";
    }
    return url + separator + paramName + '=' + paramValue;
}


/**
 * Edit the URL, set one or multiple query params
 * @method setUrlParams
 * @param  {Object}    Params
 * @param  {string}    url
 */
function setUrlParams(Params, url = window.location.href){
  if(typeof Params != 'object'){
    console.error("Params should be an object. function setUrlParams(Params, url = window.location.href){...}");
  }else{
    for(let [key, value] of Object.entries(Params)){
      url = setUrlParam(key, value, url);
    }
  }
  return url;
}


/**
 * Check if the name is a filename pattern
 * @method checkFileName
 * @param  {string}      name
 * @return {boolean}
 */
function checkFileName(name){
  let reg = new RegExp('^[A-Za-z0-9-_,\s]+[.]{1}[A-Za-z]{2,4}$');
  return reg.test(name);
}


/**
 * Convert a time string in seconds
 * @method nrv_tools_convert_to_seconds
 * @param  {string} time - Accepts examples: 1d > 24h > 1140m > 86400
 * @return {number} - Integer representing the time in seconds
 */
function nrv_tools_convert_to_seconds(time) {
    time = time.replace(/\s/g, '').toLowerCase().trim();

    if(nrv_tools_is_numeric(time)){
        return parseInt(time);
    }

    const regex = /^(\d+d)?(\d+h)?(\d+m)?(\d+s)?/;
    const matches = time.match(regex);

    const days = matches[1] ? parseInt(matches[1]) : 0;
    const hours = matches[2] ? parseInt(matches[2]) : 0;
    const minutes = matches[3] ? parseInt(matches[3]) : 0;
    const seconds = matches[4] ? parseInt(matches[4]) : 0;

    return days * 24 * 3600 + hours * 3600 + minutes * 60 + seconds;
}

function nrv_tools_is_numeric(value) {
    return /^\d+$/.test(value);
}

(function($){
	$('.nrv-tools-toggle-show').change(function(){
		let id = $(this).attr('id');
		let conditionnal_show_elements = $('.nrv-tools-conditionnal-show');
		for(let i=0; i<conditionnal_show_elements.length; i++){
			let target_element = $(conditionnal_show_elements[i]).data('condition-element');
			let target_value = $(conditionnal_show_elements[i]).data('check-value');
			if(target_element == id && $(this).val() == target_value){
				$(conditionnal_show_elements[i]).show();
			}else{
				$(conditionnal_show_elements[i]).hide();
			}
		}
	});
})(jQuery)