/* global Module Log */

/* Magic Mirror
 * Module: MMM-google-tts
 *
 * By fewieden https://github.com/fewieden/MMM-google-tts
 *
 * MIT Licensed.
 */

Module.register("MMM-google-tts", {
    googleTTS: "",
    /** @member {?Timeout} timer - Fires resetGoogleTTS */
    timer: null,
    /** @member {boolean} textFired - Flag that indicates if there is a alarm firing right now. */
    textFired: false,

    urlGoogleTTS: "http://translate.google.com/translate_tts?",

    defaults: {
        text: "MMM-google-tts",
        lang: "en-GB",
        debug: false,
        timer: 10000
    },

    start() {
        Log.info(`Starting module: ${this.name}`);
        this.sendSocketNotification("CONFIG", this.config);
    },

    notificationReceived(notification, payload) {
        if (notification === "MMM-google-tts") {
            this.sendSocketNotification("google-tts", payload);
            this.textFired = true;
            this.config.text = payload;
            console.log(payload);
            setInterval(() => {
                this.resetGoogleTTS();
            }, this.config.timer);
            this.updateDom(300);
        }
    },

    socketNotificationReceived(notification) {
        if (notification === "HIDE") {
            this.googleTTS = this.config.text;
            this.updateDom();
        }
    },

    resetGoogleTTS() {
        this.textFired = false;
        this.updateDom(300);

    },
    getDom() {
        const wrapper = document.createElement("div");
        if (this.config.debug === true) {
            wrapper.classList.add("thin", "small", "bright");
            wrapper.innerHTML = this.config.text;
        } else if (this.textFired) {
            const video = document.createElement("video");
            // <video autoplay="" controls="" style="height: 40px; width: 66%;"></video>
            video.src = this.urlGoogleTTS + "tl=" + this.config.lang + "&client=tw-ob&q=" + this.config.text;
            video.setAttribute("id", "MMM-google-tts-Player");
            video.setAttribute("autoplay", "");
            video.setAttribute("controls", "");
            video.setAttribute("style", "height: 40px; width: 66%;");

            console.log(video);
            video.load();
            video.play();
            wrapper.appendChild(video);

        } else {
            let video = document.getElementById("MMM-google-tts-Player");
            if (wrapper.contains(video)) {
                video.pause();
            }
            wrapper.removeChild(video);
        }
        return wrapper;
    }
});
