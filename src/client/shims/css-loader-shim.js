module.exports = function (elem) {
  window["search-everywhere"] = window["search-everywhere"] || {};
  window["search-everywhere"].loadStyles = function (el) {
    el.appendChild(elem);
  };
};
