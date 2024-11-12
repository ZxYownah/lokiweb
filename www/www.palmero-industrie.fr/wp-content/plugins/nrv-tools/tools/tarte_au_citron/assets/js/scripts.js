var tac_nrv_vars = JSON.parse(NRV_tac);

var tac_init = {
  "siteIcon": tac_style['ba-site-icon-url'],
  "siteName" : tac_nrv_vars.siteName,
  "arrowColor" : tac_nrv_vars.arrowColor,
  "connection" : tac_nrv_vars.connection,

  "privacyUrl": tac_nrv_vars.privacyUrl, /* Privacy policy url */

  "hashtag": tac_nrv_vars.hashtag, /* Open the panel with this hashtag */
  "cookieName": tac_nrv_vars.cookieName, /* Cookie name */

  "orientation": tac_nrv_vars.orientation.toLowerCase(), /* Banner position (top - bottom) */

  "showAlertSmall": tac_nrv_vars.showAlertSmall, /* Show the small banner on bottom right */
  "cookieslist": tac_nrv_vars.cookieslist, /* Show the cookie list */

  "showIcon": tac_nrv_vars.showIcon, /* Show cookie icon to manage cookies */
  "iconSrc": tac_style['ba-cookie-icon'], /* Customize the icon */
  "iconPosition": tac_nrv_vars.iconPosition, /* BottomRight, BottomLeft, TopRight and TopLeft */

  "adblocker": tac_nrv_vars.adblocker, /* Show a Warning if an adblocker is detected */

  "DenyAllCta" : tac_nrv_vars.DenyAllCta, /* Show the deny all button */
  "AcceptAllCta" : tac_nrv_vars.AcceptAllCta, /* Show the accept all button when highPrivacy on */
  "highPrivacy": tac_nrv_vars.highPrivacy, /* HIGHLY RECOMMANDED Disable auto consent */

  "handleBrowserDNTRequest": tac_nrv_vars.handleBrowserDNTRequest, /* If Do Not Track == 1, disallow all */

  "removeCredit": tac_nrv_vars.removeCredit, /* Remove credit link */
  "moreInfoLink": tac_nrv_vars.moreInfoLink, /* Show more info link */

  "useExternalCss": tac_nrv_vars.useExternalCss, /* If false, the tarteaucitron.css file will be loaded */
  "useExternalJs": tac_nrv_vars.useExternalJs, /* If false, the tarteaucitron.js file will be loaded */

  "readmoreLink": tac_nrv_vars.readmoreLink, /* Change the default readmore link */

  "mandatory": tac_nrv_vars.mandatory /* Show a message about mandatory cookies */
}

tarteaucitron.init(tac_init);

//console.log(tarteaucitron.services);
// add class to use external link to open preferences window
setTimeout( function(){
	if (jQuery && tarteaucitron) {
		jQuery('.tarteaucitronManager').click(()=>{
			if (tarteaucitron.userInterface) {
				tarteaucitron.userInterface.openPanel();
			}
		});					
	}
}, 2000);
