let income = Number(localStorage.getItem("income")) || 0;
let expense = Number(localStorage.getItem("expense")) || 0;
let investment = Number(localStorage.getItem("investment")) || 0;

function save() {
  localStorage.setItem("income", income);
  localStorage.setItem("expense", expense);
  localStorage.setItem("investment", investment);
}

function update() {
  document.getElementById("income").innerHTML = "₹" + income;
  document.getElementById("expense").innerHTML = "₹" + expense;
  document.getElementById("investment").innerHTML = "₹" + investment;
  document.getElementById("balance").innerHTML =
    "₹" + (income - expense - investment);

  save();
}

function addIncome() {
  let amount = prompt("Enter Income");
  if (amount && !isNaN(amount)) {
    income += Number(amount);
    update();
  }
}

function addExpense() {
  let amount = prompt("Enter Expense");
  if (amount && !isNaN(amount)) {
    expense += Number(amount);
    update();
  }
}

function addInvestment() {
  let amount = prompt("Enter Investment");
  if (amount && !isNaN(amount)) {
    investment += Number(amount);
    update();
  }
}

update();
