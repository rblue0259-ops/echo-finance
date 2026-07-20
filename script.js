// ==========================================
// Echo Finance v4.0
// Premium Banking System
// Part 1
// ==========================================

// ---------- Finance Data ----------

let finance = {

income:0,

expense:0,

investment:0,

budget:0,

goal:0,

transactions:[],

banks:{

PNB:0,

SBI:0,

Cash:0,

UPI:0

}

};

// ---------- Dashboard ----------

const balance =
document.getElementById("balance");

const income =
document.getElementById("income");

const expense =
document.getElementById("expense");

const investment =
document.getElementById("investment");

const bankPNB =
document.getElementById("bankPNB");

const bankSBI =
document.getElementById("bankSBI");

const bankCash =
document.getElementById("bankCash");

// ---------- History ----------

const history =
document.getElementById("history");

// ---------- Modal ----------

const fab =
document.getElementById("fab");

const transactionModal =
document.getElementById("transactionModal");

const closeTransaction =
document.getElementById("closeTransaction");

const saveTransaction =
document.getElementById("saveTransaction");

// ---------- Inputs ----------

const transactionType =
document.getElementById("transactionType");

const transactionBank =
document.getElementById("transactionBank");

const amount =
document.getElementById("amount");

const note =
document.getElementById("note");

// ---------- Live Time ----------

function liveTime(){

const now=new Date();

document.getElementById("liveDateTime").innerHTML=

now.toLocaleString();

}

setInterval(liveTime,1000);

liveTime();

// ---------- Dashboard Update ----------

function updateDashboard(){

income.innerHTML="₹"+finance.income;

expense.innerHTML="₹"+finance.expense;

investment.innerHTML="₹"+finance.investment;

const total=

finance.income-

finance.expense-

finance.investment;

balance.innerHTML="₹"+total;

bankPNB.innerHTML=
"₹"+finance.banks.PNB;

bankSBI.innerHTML=
"₹"+finance.banks.SBI;

bankCash.innerHTML=
"₹"+finance.banks.Cash;

saveData();

}

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
// ==========================================
// Echo Finance v4.0
// Part 2
// Transaction + Bank System + Local Storage
// ==========================================

// ---------- Save Transaction ----------

saveTransaction.onclick = function () {

const value = Number(amount.value);

if(value<=0){

alert("Enter Valid Amount");

return;

}

const type = transactionType.value;

const bank = transactionBank.value;

const description = note.value.trim() || "No Description";

// Update Finance

if(type==="income"){

finance.income+=value;

finance.banks[bank]+=value;

}

else if(type==="expense"){

finance.expense+=value;

finance.banks[bank]-=value;

}

else{

finance.investment+=value;

finance.banks[bank]-=value;

}

// Save Transaction

finance.transactions.unshift({

id:Date.now(),

type:type,

bank:bank,

amount:value,

note:description,

date:new Date().toLocaleString()

});

// Refresh

renderHistory();

updateDashboard();

transactionModal.style.display="none";

amount.value="";

note.value="";

showToast("Transaction Saved");

};

// ---------- Transaction History ----------

function renderHistory(){

history.innerHTML="";

if(finance.transactions.length===0){

history.innerHTML=`
<li class="empty">
No Transactions Yet
</li>
`;

return;

}

finance.transactions.forEach(function(item){

history.innerHTML+=`

<li>

<div>

<b>${item.type.toUpperCase()}</b>

<br>

<small>${item.bank}</small>

<br>

<small>${item.note}</small>

</div>

<div>

₹${item.amount}

</div>

</li>

`;

});

}

// ---------- Local Storage ----------

function saveData(){

localStorage.setItem(

"echoFinanceV4",

JSON.stringify(finance)

);

}

function loadData(){

const data=

localStorage.getItem("echoFinanceV4");

if(!data)return;

finance=JSON.parse(data);

updateDashboard();

renderHistory();

}

loadData();

// ---------- Toast ----------

function showToast(text){

const toast=document.getElementById("toast");

toast.innerHTML=text;

toast.classList.add("show");

setTimeout(function(){

toast.classList.remove("show");

},2500);

    }
// ==========================================
// Echo Finance v4.0
// Part 3
// Reports • Budget • Goal • Portfolio
// ==========================================

// ---------- Reports ----------

const reportBtn = document.getElementById("reportBtn");
const reportModal = document.getElementById("reportModal");
const closeReport = document.getElementById("closeReport");

if(reportBtn){

reportBtn.onclick=function(){

document.getElementById("reportIncome").innerHTML="₹"+finance.income;

document.getElementById("reportExpense").innerHTML="₹"+finance.expense;

document.getElementById("reportInvestment").innerHTML="₹"+finance.investment;

document.getElementById("reportBalance").innerHTML=
"₹"+(finance.income-finance.expense-finance.investment);

reportModal.style.display="flex";

}

}

if(closeReport){

closeReport.onclick=function(){

reportModal.style.display="none";

}

}

// ---------- Budget ----------

const budgetBtn=document.getElementById("budgetBtn");
const budgetModal=document.getElementById("budgetModal");

const budgetAmount=document.getElementById("budgetAmount");
const budgetStatus=document.getElementById("budgetStatus");

const saveBudget=document.getElementById("saveBudget");
const closeBudget=document.getElementById("closeBudget");

if(budgetBtn){

budgetBtn.onclick=function(){

budgetModal.style.display="flex";

}

}

if(closeBudget){

closeBudget.onclick=function(){

budgetModal.style.display="none";

}

}

if(saveBudget){

saveBudget.onclick=function(){

finance.budget=Number(budgetAmount.value);

budgetStatus.innerHTML=
"Monthly Budget : ₹"+finance.budget;

saveData();

showToast("Budget Saved");

}

}

// ---------- Savings Goal ----------

const goalBtn=document.getElementById("goalBtn");
const goalModal=document.getElementById("goalModal");

const goalAmount=document.getElementById("goalAmount");
const goalStatus=document.getElementById("goalStatus");

const saveGoal=document.getElementById("saveGoal");
const closeGoal=document.getElementById("closeGoal");

if(goalBtn){

goalBtn.onclick=function(){

goalModal.style.display="flex";

}

}

if(closeGoal){

closeGoal.onclick=function(){

goalModal.style.display="none";

}

}

if(saveGoal){

saveGoal.onclick=function(){

finance.goal=Number(goalAmount.value);

goalStatus.innerHTML=
"Target : ₹"+finance.goal;

saveData();

showToast("Goal Saved");

}

}

// ---------- Portfolio ----------

const portfolioBtn=document.getElementById("portfolioBtn");
const portfolioModal=document.getElementById("portfolioModal");
const closePortfolio=document.getElementById("closePortfolio");

if(portfolioBtn){

portfolioBtn.onclick=function(){

document.getElementById("portfolioTotal").innerHTML=
"₹"+finance.investment;

document.getElementById("portfolioProfit").innerHTML=
"₹0";

document.getElementById("portfolioValue").innerHTML=
"₹"+finance.investment;

portfolioModal.style.display="flex";

}

}

if(closePortfolio){

closePortfolio.onclick=function(){

portfolioModal.style.display="none";

}

}
// ==========================================
// Echo Finance v4.0
// Part 4 (FINAL)
// Theme • Search • Loading • Clear History
// ==========================================

// ---------- Dark / Light Mode ----------

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

themeToggle.onclick = function () {

document.body.classList.toggle("light");

localStorage.setItem(
"echoTheme",
document.body.classList.contains("light")
? "light"
: "dark"
);

showToast("Theme Changed");

};

}

if(localStorage.getItem("echoTheme")=="light"){

document.body.classList.add("light");

}

// ---------- Search Transaction ----------

const searchOpen =
document.getElementById("searchOpen");

const searchModal =
document.getElementById("searchModal");

const closeSearch =
document.getElementById("closeSearch");

const searchInput =
document.getElementById("searchInput");

const searchResult =
document.getElementById("searchResult");

if(searchOpen){

searchOpen.onclick=function(){

searchModal.style.display="flex";

searchInput.value="";

searchResult.innerHTML="";

};

}

if(closeSearch){

closeSearch.onclick=function(){

searchModal.style.display="none";

};

}

if(searchInput){

searchInput.onkeyup=function(){

const keyword=this.value.toLowerCase();

searchResult.innerHTML="";

finance.transactions
.filter(item=>

item.note.toLowerCase().includes(keyword) ||

item.bank.toLowerCase().includes(keyword) ||

item.type.toLowerCase().includes(keyword)

)

.forEach(item=>{

searchResult.innerHTML+=`

<li>

<b>${item.type.toUpperCase()}</b>

<br>

${item.bank}

<br>

₹${item.amount}

<br>

<small>${item.note}</small>

</li>

`;

});

};

}

// ---------- Clear History ----------

const clearHistory =
document.getElementById("clearHistory");

if(clearHistory){

clearHistory.onclick=function(){

if(confirm("Clear all transactions?")){

finance.transactions=[];

finance.income=0;

finance.expense=0;

finance.investment=0;

finance.banks.PNB=0;

finance.banks.SBI=0;

finance.banks.Cash=0;

finance.banks.UPI=0;

renderHistory();

updateDashboard();

showToast("History Cleared");

}

};

}

// ---------- Loading Screen ----------

window.addEventListener("load",function(){

const loading=

document.getElementById("loadingScreen");

if(loading){

setTimeout(function(){

loading.style.display="none";

},1200);

}

});

// ---------- Chart ----------

const chartCanvas =
document.getElementById("financeChart");

if(chartCanvas){

new Chart(chartCanvas,{

type:"doughnut",

data:{

labels:["Income","Expense","Investment"],

datasets:[{

data: [
    finance.income,
    finance.expense,
    finance.investment
]
backgroundColor: [
    "#22c55e",
    "#ef4444",
    "#3b82f6"
]

}]

},

options:{

responsive:true,

plugins:{

legend:{

labels:{

color:"#ffffff"

}

}

}

}

});

}

// ---------- Finish ----------

renderHistory();

updateDashboard();

console.log("Echo Finance v4.0 Loaded Successfully");
