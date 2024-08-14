// Array to hold reminders
let reminders = [];

// Function to add a new reminder
function addReminder(title, description, time) {
    const reminderTime = new Date(time).getTime();
    const now = new Date().getTime();

    if (reminderTime > now) {
        const timeoutId = setTimeout(() => {
            alert(`Reminder: ${title}`);
            deleteReminder(reminderTime);
        }, reminderTime - now);

        reminders.push({ title, description, time: reminderTime, timeoutId });
        displayReminders();
    } else {
        alert("Please set a future time for the reminder.");
    }
}

// Function to display active reminders
function displayReminders() {
    const reminderList = document.getElementById('reminder-list');
    reminderList.innerHTML = '';

    reminders.forEach(reminder => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${reminder.title}</strong><br>
                <small>${new Date(reminder.time).toLocaleString()}</small><br>
                <small>${reminder.description}</small>
            </div>
            <div>
                <button onclick="editReminder('${reminder.time}')">Edit</button>
                <button onclick="deleteReminder('${reminder.time}')">Delete</button>
            </div>
        `;
        reminderList.appendChild(li);
    });
}

// Function to delete a reminder
function deleteReminder(time) {
    reminders = reminders.filter(reminder => {
        if (reminder.time == time) {
            clearTimeout(reminder.timeoutId);
            return false;
        }
        return true;
    });
    displayReminders();
}

// Function to edit a reminder
function editReminder(time) {
    const reminder = reminders.find(reminder => reminder.time == time);
    if (reminder) {
        document.getElementById('reminder-title').value = reminder.title;
        document.getElementById('reminder-description').value = reminder.description;
        document.getElementById('reminder-time').value = new Date(reminder.time).toISOString().slice(0, -8);

        deleteReminder(time);
    }
}

// Event listener for adding a reminder
document.getElementById('add-reminder').addEventListener('click', () => {
    const title = document.getElementById('reminder-title').value;
    const description = document.getElementById('reminder-description').value;
    const time = document.getElementById('reminder-time').value;

    if (title && time) {
        addReminder(title, description, time);
        document.getElementById('reminder-title').value = '';
        document.getElementById('reminder-description').value = '';
        document.getElementById('reminder-time').value = '';
    } else {
        alert("Please fill in all fields.");
    }
});

// Periodically update the reminder list
setInterval(displayReminders, 60000);
