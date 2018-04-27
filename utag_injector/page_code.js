(function () {
  "use strict";
  var parseUtagPath = function (path) {
    path = path.replace(/utag\.js.*/,"");
    var path_split = path.replace(/\/$/,"").split("/");
    var env = path_split.pop(), profile = path_split.pop(), account = path_split.pop();
    return {"details": {"account": account, "profile": profile, "env": env}};
  };
  if (!window.utag) {
    window.tealiumTools.send({"noutag" : true});
    return;
  }
  try {
    var data = {}, utag_path = parseUtagPath(window.utag.cfg.path);

    if (window.__tealium_default_path && window.__tealium_default_path !== window.utag.cfg.path) {
      //TWC active
      data = parseUtagPath(window.__tealium_default_path);
    } else if (window._tt_env_switch) {
      data = parseUtagPath(window._tt_env_switch);
    } else {
      data = utag_path;
    }
    data['cur_' + utag_path.details.env] = true;
    data.loaded = true;
    data.domain = (/:\/\/(.*?)\//.exec(document.URL) || ['', document.domain])[1];

    //Remove Cookie if there
    var cookie_match = document.cookie.match(/utag_env_(.*?)_(.*?)=/);
    if (cookie_match) {
      document.cookie = "utag_env_" + cookie_match[1] + "_" + cookie_match[2] + "=;path=;domain=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
    }
    if (window._tt_env_switch) {
      data.redirect = !0;
    } else {
      data.normal = !0;
    }
    window.tealiumTools.send(data);
  } catch (e) {
    console.error(e);
    window.tealiumTools.send({"noutag" : true});
  }
}());
