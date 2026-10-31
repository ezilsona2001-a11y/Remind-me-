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

// DAILY REMINDERS
const reminders = [
    { hour: 8, minute: 0, title: "Breakfast Time 🍳", message: "Please don't skip breakfast. ❤️" },
    { hour: 13, minute: 0, title: "Lunch Time 🍱", message: "Have your lunch on time!" },
    { hour: 16, minute: 0, title: "Take a Break ☕", message: "Relax for a little while. 🫂" },
    { hour: 20, minute: 0, title: "Dinner Time 🍽️", message: "Eat well and stay healthy. ❤️" },
    { hour: 22, minute: 0, title: "Sleep Time 🌙", message: "Good night! Sweet dreams. 💗" }
];

// ENABLE NOTIFICATIONS
async function enableReminders() {
    if (!("Notification" in window)) {
        alert("Notifications are not supported.");
        return;
    }

    const permission = await Notification.requestPermission();

    if (permission === "granted") {
        alert("Notifications enabled! ❤️");
        startWaterReminder();
        checkDailyReminders();
    } else {
        alert("Please allow notifications.");
    }
}

// WATER REMINDER
function startWaterReminder() {
    setInterval(() => {
        new Notification("Drink Water 💧", {
            body: "Please drink some water. Take care! ❤️"
        });
    }, 60 * 60 * 1000);
}

// CHECK DAILY REMINDERS
function checkDailyReminders() {
    setInterval(() => {
        const now = new Date();

        reminders.forEach(reminder => {
            const key = `remind-${now.toDateString()}-${reminder.hour}`;

            if (
                now.getHours() === reminder.hour &&
                now.getMinutes() === reminder.minute &&
                !localStorage.getItem(key)
            ) {
                new Notification(reminder.title, {
                    body: reminder.message
                });

                localStorage.setItem(key, "done");
            }
        });
    }, 30000);
}
