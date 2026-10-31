const CACHE_NAME = "remind-me-v1";

self.addEventListener("install", event => {
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
});

// Receive background push notifications
self.addEventListener("push", event => {
    let data = {
        title: "Remind Me 🫂",
        body: "Someone special is reminding you to take care! ❤️"
    };

    if (event.data) {
        data = event.data.json();
    }

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: "./icon.png",
            badge: "./icon.png",
            vibrate: [200, 100, 200]
        })
    );
});

// Notification click
self.addEventListener("notificationclick", event => {
    event.notification.close();

    event.waitUntil(
        clients.openWindow("./")
    );
});
