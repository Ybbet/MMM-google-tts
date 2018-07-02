/* global Module Log */

/* Magic Mirror
 * Module: MMM-google-tts
 *
 * By Ybbet https://github.com/Ybbet/MMM-google-tts
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
        lang: "en-GB",
        debug: false,
        timer: 10000,
        type: null,
        title: "An alert",
        message: "A message alert",
    },

    start() {
        Log.info(`Starting module: ${this.name}`);
        this.sendSocketNotification("CONFIG", this.config);
    },

    notificationReceived(notification, payload) {
        if (notification === "MMM-google-tts") {
            this.sendSocketNotification("google-tts", payload);
            this.textFired = true;
            if (payload instanceof Object) {
                this.config.type = (payload.type) ? payload.type : this.config.type;
                this.config.title = (payload.title) ? payload.title : this.config.title;
                this.config.message = (payload.message) ? payload.message : this.config.message;
            } else {
                this.config.message = payload;
            }
            console.log(payload);
            setInterval(() => {
                this.resetGoogleTTS();
            }, this.config.timer);
            this.updateDom(300);
        }
    },

    socketNotificationReceived(notification) {
        if (notification === "HIDE") {
            this.googleTTS = this.config.message;
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
            wrapper.innerHTML = this.config.message;
        } else if (this.textFired) {
            const video = document.createElement("video");
            // <video autoplay="" controls="" style="height: 40px; width: 66%;"></video>
            video.setAttribute("id", "MMM-google-tts-Player");
            video.setAttribute("autoplay", "autoplay");
            video.setAttribute("controls", "controls");
            video.setAttribute("playsinline", "playsinline");
            video.setAttribute("style", "height: 20px; width: 66%;");
            const source = document.createElement("source");
            source.src = this.urlGoogleTTS + "tl=" + this.config.lang + "&client=tw-ob&q=" + this.config.message;
            source.setAttribute("type", "audio/mpeg");
            video.appendChild(source);

            console.log(video);
            // You have to allow autoplay video/audio in your browser.
            // Whitout that, the video will not be loaded and you will have an error your console log.
            video.load();
            video.play();
            wrapper.appendChild(video);

            console.log("MMM-google-tts type : " + this.config.type);
            if (this.config.type === "alert" || this.config.type === "notification") {
                this.sendNotification("SHOW_ALERT", {type: this.config.type, title: this.config.title, message: this.config.message, timer: (this.config.timer + 1000)});
            }
        } else {
            const reset = document.createElement("div");
            wrapper.appendChild(reset);
        }
        return wrapper;
    }
});
