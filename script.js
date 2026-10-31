// LIVE CLOCK
function updateClock() {
    const now = new Date();

    document.getElementById("time").textContent =
        now.toLocaleTimeString("en-IN");

    document.getElementById("date").textContent =
        now.toDateString();
}

setInterval(updateClock, 1000);
updateClock();


// CARING MESSAGES
const messages = [
    "Have you drunk enough water? 💧",
    "Please don't skip your meals. ❤️",
    "Take a little break. You deserve it! 🫂",
    "Don't forget to smile today! 😊",
    "Your health is important. Take care! 💗",
    "Eat well and stay happy! 🥰",
    "You are special. Never forget that! ❤️"
];


// NOTIFICATION BUTTON
const button = document.createElement("button");

button.textContent = "🔔 Enable My Reminders";

button.style.cssText = `
    display:block;
    width:100%;
    padding:16px;
    margin-top:20px;
    border:none;
    border-radius:15px;
    background:linear-gradient(135deg,#e88ab5,#b99ae8);
    color:white;
    font-size:16px;
    font-weight:bold;
`;

document.querySelector(".love-message")
    .appendChild(button);


// ENABLE NOTIFICATIONS
button.addEventListener("click", async function () {

    if (!("Notification" in window)) {
        alert("Your browser does not support notifications.");
        return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {

        new Notification("Remind Me 🫂", {
            body: "Someone cares about you! Take care of yourself. ❤️"
        });

        button.textContent = "❤️ Reminders Enabled";

        startReminders();

    } else {
        alert("Please allow notifications in browser settings.");
    }
});


// WATER REMINDER
let reminderStarted = false;

function startReminders() {

    if (reminderStarted) return;

    reminderStarted = true;

    setInterval(() => {

        if (Notification.permission === "granted") {

            new Notification("Water Time 💧", {
                body: "Hey! Drink some water. Stay hydrated! ❤️"
            });

        }

    }, 60 * 60 * 1000);
}


// RANDOM CARING MESSAGE
setInterval(() => {

    const message = messages[
        Math.floor(Math.random() * messages.length)
    ];

    console.log("Remind Me 🫂: " + message);

}, 30 * 60 * 1000);