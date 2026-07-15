let income = 10000;
let expense = 200;
let investment = 500;

const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const investmentEl = document.getElementById("investment");
const balanceEl = document.getElementById("balance");
const historyList = document.getElementById("historyList");

function updateUI() {
  const balance = income - expense - investment;

  incomeEl.textContent = "₹" + income;
  expenseEl.textContent = "₹" + expense;
  investmentEl.textContent = "₹" + investment;
  balanceEl.textContent = "₹" + balance;
}

function addHistory(text) {
  if (historyList.innerHTML.includes("No Transactions Yet")) {
    historyList.innerHTML = "";
  }

  const li = document.createElement("li");
  li.textContent = text;
  historyList.prepend(li);
}
function addIncome() {
  const amount = Number(prompt("Enter Income Amount"));

  if (!amount || amount <= 0) return;

  income += amount;
  addHistory("💰 Income +₹" + amount);
  updateUI();
}

function addExpense() {
  const amount = Number(prompt("Enter Expense Amount"));

  if (!amount || amount <= 0) return;

  expense += amount;
  addHistory("💸 Expense -₹" + amount);
  updateUI();
}

function addInvestment() {
  const amount = Number(prompt("Enter Investment Amount"));

  if (!amount || amount <= 0) return;

  investment += amount;
  addHistory("📈 Investment +₹" + amount);
  updateUI();
}

updateUI();
// Save Data
function saveData() {
  localStorage.setItem("income", income);
  localStorage.setItem("expense", expense);
  localStorage.setItem("investment", investment);
  localStorage.setItem("history", historyList.innerHTML);
}

// Load Data
function loadData() {
  if (localStorage.getItem("income")) {
    income = Number(localStorage.getItem("income"));
    expense = Number(localStorage.getItem("expense"));
    investment = Number(localStorage.getItem("investment"));
    historyList.innerHTML = localStorage.getItem("history");
  }

  updateUI();
}

// Auto Save Every Update
const oldUpdateUI = updateUI;
updateUI = function () {
  oldUpdateUI();
  saveData();
};

// Load when app starts
loadData();

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}
