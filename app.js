//displaing controll
var uiController = (function () {})();

//finace controll
var financeController = (function () {})();

//linking controll
var appController = (function (uiController, fnCotroller) {
  var ctrlAddItem = function () {};
  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);
