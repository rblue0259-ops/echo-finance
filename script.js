let income = 0;
let expense = 0;
let investment = 0;
let transactions = [];

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const investmentEl = document.getElementById("investment");
const historyEl = document.getElementById("history");

function loadData() {
  income = Number(localStorage.getItem("income")) || 0;
  expense = Number(localStorage.getItem("expense")) || 0;
  investment = Number(localStorage.getItem("investment")) || 0;
  transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  updateUI();
}

function saveData() {
  localStorage.setItem("income", income);
  localStorage.setItem("expense", expense);
  localStorage.setItem("investment", investment);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateUI() {
  incomeEl.textContent = "₹" + income;
  expenseEl.textContent = "₹" + expense;
  investmentEl.textContent = "₹" + investment;
  balanceEl.textContent = "₹" + (income - expense - investment);

  historyEl.innerHTML = "";

  if (transactions.length === 0) {
    historyEl.innerHTML = "<li>No Transactions Yet</li>";
    return;
  }

  transactions.slice().reverse().forEach((item) => {
    const li = document.createElement("li");
    li.textContent =
      item.type.toUpperCase() + " • ₹" + item.amount + " • " + item.note;
    historyEl.appendChild(li);
  });
}

function addTransaction(type, amount, note) {
  amount = Number(amount);

  if (!amount || amount <= 0) return;

  if (type === "income") income += amount;
  if (type === "expense") expense += amount;
  if (type === "investment") investment += amount;

  transactions.push({
    type,
    amount,
    note
  });

  saveData();
  updateUI();
}

const fab = document.getElementById("fab");
const modal = document.getElementById("modal");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

fab.onclick = () => {
  modal.style.display = "flex";
};

cancelBtn.onclick = () => {
  modal.style.display = "none";
};

saveBtn.onclick = () => {
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  const note = document.getElementById("note").value || "No Note";

  addTransaction(type, amount, note);

  document.getElementById("amount").value = "";
  document.getElementById("note").value = "";

  modal.style.display = "none";
};

document.getElementById("clearBtn").onclick = () => {
  if (confirm("Clear all data?")) {
    income = 0;
    expense = 0;
    investment = 0;
    transactions = [];
    saveData();
    updateUI();
  }
};

loadData();
