let income=0;
let expense=0;
let investment=0;

function update(){
document.getElementById("income").innerHTML="₹"+income;
document.getElementById("expense").innerHTML="₹"+expense;
document.getElementById("investment").innerHTML="₹"+investment;
document.getElementById("balance").innerHTML="₹"+(income-expense-investment);
}

function addIncome(){
let amount=prompt("Enter Income");
if(amount){
income+=Number(amount);
update();
}
}

function addExpense(){
let amount=prompt("Enter Expense");
if(amount){
expense+=Number(amount);
update();
}
}

function addInvestment(){
let amount=prompt("Enter Investment");
if(amount){
investment+=Number(amount);
update();
}
}

update();
