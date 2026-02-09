const time = document.getElementById("time");
const date = document.getElementById("date");

function updateTimer() {
    const CT = new Date();

    const hours = CT.getHours().toString().padStart(2, "0");
    const minutes = CT.getMinutes().toString().padStart(2, "0");
    const seconds = CT.getSeconds().toString().padStart(2, "0");
    time.textContent = `${hours}:${minutes}:${seconds}`;

    const WEEKDAY = CT.toLocaleString("en-us", { weekday: "long" })
    const MONTH = CT.toLocaleString("en-us", { month: "long" })
    const DAY = CT.toLocaleString("en-us", { day: "numeric" })
    const YEAR = CT.toLocaleString("en-us", { year: "numeric" })
    const FULL_DATE = `${WEEKDAY}, ${MONTH} ${DAY} ${YEAR}`;
    date.textContent = FULL_DATE;
}

updateTimer();
setInterval(updateTimer, 1000);
