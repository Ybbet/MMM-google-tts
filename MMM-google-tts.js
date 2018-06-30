/* global Module Log */

/* Magic Mirror
 * Module: MMM-google-tts
 *
 * By fewieden https://github.com/fewieden/MMM-google-tts
 *
 * MIT Licensed.
 */

Module.register('MMM-google-tts', {
    googleTTS: '',

    defaults: {
        text: "MMM-google-tts",
        lang: "en-GB",
        debug: false
    },

    start() {
        Log.info(`Starting module: ${this.name}`);
        this.googleTTS = this.config.text;
        this.sendSocketNotification('CONFIG', this.config);
    },

    notificationReceived(notification, payload) {
        if (notification === "MMM-google-tts") {
            this.sendSocketNotification("google-tts", payload);
            this.googleTTS = payload;
            this.updateDom();
        }
    },

    socketNotificationReceived(notification) {
        if (notification === "HIDE") {
            this.googleTTS = this.config.text;
            this.updateDom();
        }
    },

    getDom() {
        const wrapper = document.createElement("div");
        if (this.config.debug === true) {
            wrapper.classList.add("thin", "small", "bright");
            wrapper.innerHTML = this.googleTTS;
        }
        return wrapper;
    }
});
