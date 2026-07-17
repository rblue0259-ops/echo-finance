alert("Script Loaded");
// ========================================
// Echo Finance v3.0
// Premium Script
// Part 1
// ========================================

let income = 0;
let expense = 0;
let investment = 0;

let transactions = [];
let budget = 0;

// ---------- Dashboard ----------

const balance = document.getElementById("balance");
const incomeText = document.getElementById("income");
const expenseText = document.getElementById("expense");
const investmentText = document.getElementById("investment");

const history = document.getElementById("history");

// ---------- Buttons ----------

const fab = document.getElementById("fab");

const transactionModal =
document.getElementById("transactionModal");

const closeTransaction =
document.getElementById("closeTransaction");

const saveTransaction =
document.getElementById("saveTransaction");

const amount =
document.getElementById("amount");

const note =
document.getElementById("note");

const transactionType =
document.getElementById("transactionType");

// ---------- Update Dashboard ----------

function updateDashboard(){

const total =
income-expense-investment;

balance.innerHTML="₹"+total;

incomeText.innerHTML="₹"+income;

expenseText.innerHTML="₹"+expense;

investmentText.innerHTML="₹"+investment;

saveLocal();

}

// ---------- Date Time ----------

function updateDateTime(){

const now=new Date();

document.getElementById("liveDateTime").innerHTML=

now.toLocaleString();

}

setInterval(updateDateTime,1000);

updateDateTime();

// ---------- Open Modal ----------

fab.onclick=function(){

transactionModal.style.display="flex";

}

// ---------- Close Modal ----------

closeTransaction.onclick=function(){

transactionModal.style.display="none";

amount.value="";

note.value="";

}

// ========================================
// Echo Finance v3.0
// Premium Script
// Part 2
// ========================================

// ---------- Save Transaction ----------

saveTransaction.onclick = function () {

    const value = Number(amount.value);

    if (value <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    const type = transactionType.value;

    const description =
        note.value.trim() || "No Description";

    const data = {

        id: Date.now(),

        type: type,

        amount: value,

        note: description,

        date: new Date().toLocaleString()

    };

    transactions.unshift(data);

    if (type === "income") {

        income += value;

    }

    else if (type === "expense") {

        expense += value;

    }

    else {

        investment += value;

    }

    renderTransactions();

    updateDashboard();

    transactionModal.style.display = "none";

    amount.value = "";

    note.value = "";

    showToast("Transaction Added");

};

// ---------- Transaction History ----------

function renderTransactions() {

    history.innerHTML = "";

    if (transactions.length === 0) {

        history.innerHTML =
            "<li class='empty'>No Transactions Yet</li>";

        return;

    }

    transactions.forEach(function (item) {

        const li = document.createElement("li");

        li.innerHTML = `

<b>${item.type.toUpperCase()}</b>

<span>₹${item.amount}</span>

<br>

<small>${item.note}</small>

<br>

<small>${item.date}</small>

`;

        history.appendChild(li);

    });

}

// ---------- Local Storage ----------

function saveLocal() {

    const finance = {

        income,

        expense,

        investment,

        budget,

        transactions

    };

    localStorage.setItem(

        "echoFinance",

        JSON.stringify(finance)

    );

}

function loadLocal() {

    const finance = JSON.parse(

        localStorage.getItem("echoFinance")

    );

    if (!finance) return;

    income = finance.income || 0;

    expense = finance.expense || 0;

    investment = finance.investment || 0;

    budget = finance.budget || 0;

    transactions = finance.transactions || [];

    updateDashboard();

    renderTransactions();

}

loadLocal();

// ========================================
// Echo Finance v3.0
// Premium Script
// Part 3
// Reports • Budget • Settings • Manual Edit
// ========================================

// ---------- Reports ----------

const reportBtn = document.getElementById("reportBtn");
const reportModal = document.getElementById("reportModal");
const closeReport = document.getElementById("closeReport");

const reportIncome =
document.getElementById("reportIncome");

const reportExpense =
document.getElementById("reportExpense");

const reportInvestment =
document.getElementById("reportInvestment");

const reportBalance =
document.getElementById("reportBalance");

reportBtn.onclick = function(){

reportIncome.innerHTML="₹"+income;

reportExpense.innerHTML="₹"+expense;

reportInvestment.innerHTML="₹"+investment;

reportBalance.innerHTML=
"₹"+(income-expense-investment);

reportModal.style.display="flex";

}

closeReport.onclick=function(){

reportModal.style.display="none";

}

// ---------- Budget ----------

const budgetBtn =
document.getElementById("budgetBtn");

const budgetModal =
document.getElementById("budgetModal");

const saveBudget =
document.getElementById("saveBudget");

const budgetAmount =
document.getElementById("budgetAmount");

const budgetStatus =
document.getElementById("budgetStatus");

const closeBudget =
document.getElementById("closeBudget");

budgetBtn.onclick=function(){

budgetModal.style.display="flex";

}

closeBudget.onclick=function(){

budgetModal.style.display="none";

}

saveBudget.onclick=function(){

budget=Number(budgetAmount.value);

budgetStatus.innerHTML=
"Monthly Budget : ₹"+budget;

saveLocal();

showToast("Budget Saved");

}

// ---------- Settings ----------

const settingOpen =
document.getElementById("settingOpen");

const settingsModal =
document.getElementById("settingsModal");

const closeSettings =
document.getElementById("closeSettings");

settingOpen.onclick=function(){

settingsModal.style.display="flex";

}

closeSettings.onclick=function(){

settingsModal.style.display="none";

}

// ---------- Manual Finance Edit ----------

const manualEdit =
document.getElementById("manualEdit");

const manualModal =
document.getElementById("manualModal");

const saveManual =
document.getElementById("saveManual");

const closeManual =
document.getElementById("closeManual");

manualEdit.onclick=function(){

manualModal.style.display="flex";

document.getElementById("manualIncome").value=income;

document.getElementById("manualExpense").value=expense;

document.getElementById("manualInvestment").value=investment;

}

closeManual.onclick=function(){

manualModal.style.display="none";

}

saveManual.onclick=function(){

income=
Number(document.getElementById("manualIncome").value);

expense=
Number(document.getElementById("manualExpense").value);

investment=
Number(document.getElementById("manualInvestment").value);

updateDashboard();

manualModal.style.display="none";

showToast("Finance Updated");

}

// ---------- Toast ----------

function showToast(text){

const toast=
document.getElementById("toast");

toast.innerHTML=text;

toast.classList.add("show");

setTimeout(function(){

toast.classList.remove("show");

},2500);

    }

// Hide Loading Screen
window.addEventListener("load", function () {

    const loading = document.getElementById("loadingScreen");

    if (loading) {
        setTimeout(function () {
            loading.style.display = "none";
        }, 1000);
    }

});
