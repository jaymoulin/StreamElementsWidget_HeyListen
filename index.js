let audioUrl = '{audioUrl}';
let audioVolume = '{audioVolume}';
let channelName = '';
window.addEventListener('onWidgetLoad', function (obj) {
    channelName = obj.detail.channel.username.toLowerCase()
})

window.addEventListener('onEventReceived', function (obj) {
    if (obj.detail.listener !== "message") return;
    let data = obj.detail.event.data;
    if (data["displayName"] == "StreamElements") return;

    let message = data["text"];
    let words = message.split(" ").map(value => value.toLowerCase());
    if (!words.includes(channelName)) return;
    console.log("Playing audio", audioUrl);
    try {
        let audio = new Audio();
        audio.src = audioUrl;
        audio.volume = parseFloat(audioVolume) / 100;
        audio.play();
        new Promise((res) => {
            audio.onended = res;
            audio.onerror = (e) => {
                console.log(e);
                res()
            };
        });
    } catch (e) {
        console.log("Audio playback error:", e);
    }
});
