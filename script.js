// Echo Finance Premium - Part 1

let income = 10000;
let expense = 200;
let investment = 500;

const balance = document.getElementById("balance");
const incomeBox = document.getElementById("income");
const expenseBox = document.getElementById("expense");
const investmentBox = document.getElementById("investment");

const history = document.getElementById("history");

const fab = document.getElementById("fab");
const modal = document.getElementById("modal");

const amount = document.getElementById("amount");
const type = document.getElementById("type");
const note = document.getElementById("note");

function updateUI() {
    balance.textContent = "₹" + (income - expense - investment);
    incomeBox.textContent = "₹" + income;
    expenseBox.textContent = "₹" + expense;
    investmentBox.textContent = "₹" + investment;
}

function addHistory(text) {
    if (history.innerHTML.includes("No Transactions Yet")) {
        history.innerHTML = "";
    }

    const li = document.createElement("li");
    li.textContent = text;
    history.prepend(li);
}

updateUI();
