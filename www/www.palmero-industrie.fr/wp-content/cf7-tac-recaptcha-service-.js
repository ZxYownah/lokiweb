(function (tarteaucitron) {
    if (!tarteaucitron) {
        return;
    }
    tarteaucitron.services.recaptchacf7 = {
        "key": "recaptchacf7",
        "type": "api",
        "name": "reCAPTCHA v3",
        "uri": "https://policies.google.com/privacy",
        "needConsent": true,
        "cookies": ["nid"],
        "js": function () {
            "use strict";
            tarteaucitron.fallback(["g-recaptcha"], function (node) {
                if (node._inner) {
                    node.innerHTML = node._inner;
                }
            }, true);
            var scriptUrl = "https://www.google.com/recaptcha/api.js?render=" + wpcf7_recaptcha.sitekey;
            tarteaucitron.addScript(scriptUrl, '', function () {
                document.addEventListener("cf7-tac-recaptcha-loaded",(t=>{var e;wpcf7_recaptcha={...null!==(e=wpcf7_recaptcha)&&void 0!==e?e:{}};const c=wpcf7_recaptcha.sitekey,{homepage:n,contactform:a}=wpcf7_recaptcha.actions,o=t=>{const{action:e,func:n,params:a}=t;grecaptcha.execute(c,{action:e}).then((t=>{const c=new CustomEvent("wpcf7grecaptchaexecuted",{detail:{action:e,token:t}});document.dispatchEvent(c)})).then((()=>{"function"==typeof n&&n(...a)})).catch((t=>console.error(t)))};if(grecaptcha.ready((()=>{o({action:n})})),document.addEventListener("change",(t=>{o({action:a})})),"undefined"!=typeof wpcf7&&"function"==typeof wpcf7.submit){const t=wpcf7.submit;wpcf7.submit=function(e){o({action:a,func:t,params:[e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}]})}}document.addEventListener("wpcf7grecaptchaexecuted",(t=>{const e=document.querySelectorAll('form.wpcf7-form input[name="_wpcf7_recaptcha_response"]');for(let c=0;c<e.length;c++)e[c].setAttribute("value",t.detail.token)}))}));document.dispatchEvent(new CustomEvent("cf7-tac-recaptcha-loaded"));;
            });
        },
        "fallback": function () {
            "use strict";
            var id = "recaptchacf7";
            tarteaucitron.fallback(["g-recaptcha"], function (node) {
                node._inner = node.innerHTML;
                return tarteaucitron.engage(id);
            });
        }
    };
})(window.tarteaucitron);
