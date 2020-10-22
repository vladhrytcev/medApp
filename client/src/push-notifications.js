const pushServerPublicKey = '';

function isPushNotificationSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

async function askUserPermission() {
  return await Notification.requestPermission();
}

function sendNotification() {

}

function registerServiceWorker() {
  return navigator.serviceWorker.register('../public/service-worker.js');
}

async function createNotificationSubscription() {
  const serviceWorker = await navigator.serviceWorker.ready;
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey
  });
}

function getUserSubscription() {
  return navigator.serviceWorker.ready
    .then(serviceWorker => serviceWorker.pushManager.getSubscription())
    .then(pushSubscription => pushSubscription);
}

export {
  isPushNotificationSupported,
  askUserPermission,
  registerServiceWorker,
  sendNotification,
  createNotificationSubscription,
  getUserSubscription
};
