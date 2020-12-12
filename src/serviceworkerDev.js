const swDev = () => {
  /* To get permission to show notifications */
  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  //const vapidPublicKey = webpush.generateVAPIDKeys();
  const vapidPublicKey =
    "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

  let swURL = `${process.env.PUBLIC_URL}/serviceworker.js`;
  navigator.serviceWorker.register(swURL).then((res) => {
    //console.warn("response ", res);

    /* To get permission to show notifications */
    return res.pushManager.getSubscription().then((subscription) => {
      return res.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });
    });
  });
};

export default swDev;
