//displaing controll
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expeseLabel: ".budget__expenses--value",
    percetageLabel: ".budget__expenses--percentage",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    gedDOMstrings: function () {
      return DOMstrings;
    },
    clearFields: function () {
      //fields is List
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );
      //Convert list to Array
      var fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (el, index, array) {
        el.value = "";
      });
      //   for (var i = 0; i < fieldsArr.length; i++) {
      //     fieldsArr[i].value = "";
      //   }
      fieldsArr[0].focus();
    },
    showbudget: function (budget) {
      document.querySelector(DOMstrings.budgetLabel).textContent =
        budget.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent =
        budget.totalInc;
      document.querySelector(DOMstrings.expeseLabel).textContent =
        budget.totalExp;
      if (budget.rate !== 0) {
        document.querySelector(DOMstrings.percetageLabel).textContent =
          budget.rate + "%";
      } else {
        document.querySelector(DOMstrings.percetageLabel).textContent =
          budget.rate;
      }
    },
    addListItem: function (item, type) {
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$DESCRIPTION$</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$DESCRIPTION$</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      html = html.replace("%id%", item.id);
      html = html.replace("$DESCRIPTION$", item.description);
      html = html.replace("%VALUE%", item.value);
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
  };
})();

//finace controll
var financeController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
    budget: 0,
    rate: 0,
  };

  return {
    findBudget: function () {
      calculateTotal("inc");
      calculateTotal("exp");
      data.budget = data.totals.inc - data.totals.exp;
      data.rate = Math.round((data.totals.exp / data.totals.inc) * 100);
    },
    inpbudget: function () {
      return {
        budget: data.budget,
        rate: data.rate,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },
    addItem: function (type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) {
        id = 1;
      } else {
        data.items[type][data.items[type].length - 1].id + 1;
      }
      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);
      return item;
    },
    seeData: function () {
      return data;
    },
  };
})();

//linking controll
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    var input = uiController.getInput();
    if (input.description !== "" && input.value !== "") {
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      uiController.addListItem(item, input.type);
      uiController.clearFields();
      financeController.findBudget();
      var budget = financeController.inpbudget();
      uiController.showbudget(budget);
    }
  };
  var setupEventListeners = function () {
    var DOM = uiController.gedDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  return {
    init: function () {
      console.log("Application started...");
      uiController.showbudget({
        budget: 0,
        rate: 0,
        totalInc: 0,
        totalExp: 0,
      });
      setupEventListeners();
    },
  };
})(uiController, financeController);
appController.init();
