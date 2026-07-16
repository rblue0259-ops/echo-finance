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
fab.addEventListener("click", () => {
    modal.style.display = "flex";
});

function closeModal() {
    modal.style.display = "none";
    amount.value = "";
    note.value = "";
}

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function saveTransaction() {
    const value = Number(amount.value);

    if (!value || value <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    const category = type.value;
    const description = note.value || "No Note";

    if (category === "income") {
        income += value;
        addHistory("💰 +" + value + " • " + description);
    } else if (category === "expense") {
        expense += value;
        addHistory("💸 -" + value + " • " + description);
    } else {
        investment += value;
        addHistory("📈 +" + value + " • " + description);
    }

    updateUI();
    closeModal();
    }
const clearBtn = document.getElementById("clearBtn");

if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        history.innerHTML = "<li>No Transactions Yet</li>";

        localStorage.removeItem("echoFinanceData");
    });
}

function getCurrentMonthKey() {
    const now = new Date();
    return now.getFullYear() + "-" + (now.getMonth() + 1);
}

const currentMonthKey = getCurrentMonthKey();

function saveData() {
    const data = {
    month: currentMonthKey,
    income,
    expense,
    investment,
    history: history.innerHTML
};

    localStorage.setItem("echoFinanceData", JSON.stringify(data));
}

function loadData() {
    const data = JSON.parse(localStorage.getItem("echoFinanceData"));

    if (!data) return;

    income = data.income;
    expense = data.expense;
    investment = data.investment;
    history.innerHTML = data.history;

    updateUI();
}

const oldUpdateUI = updateUI;

updateUI = function () {
    oldUpdateUI();
    saveData();
};

loadData();
updateUI();
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

saveBtn.addEventListener("click", saveTransaction);

cancelBtn.addEventListener("click", closeModal);

window.addEventListener("DOMContentLoaded", function () {

    function updateDateTime() {
        const now = new Date();

        const months = [
            "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sep","Oct","Nov","Dec"
        ];

        const day = now.getDate();
        const month = months[now.getMonth()];
        const year = now.getFullYear();

        let hour = now.getHours();
        const minute = String(now.getMinutes()).padStart(2, "0");

        const ampm = hour >= 12 ? "PM" : "AM";

        hour = hour % 12;
        if (hour === 0) hour = 12;

        const el = document.getElementById("liveDateTime");

        if (el) {
            el.textContent = `📅 ${day} ${month} ${year} • 🕘 ${hour}:${minute} ${ampm}`;
        }
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

});
