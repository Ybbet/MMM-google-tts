/* Magic Mirror
 * Module: MMM-TTS
 *
 * By fewieden https://github.com/fewieden/MMM-TTS
 *
 * MIT Licensed.
 */

/* eslint-env node */

const NodeHelper = require("node_helper");
const LightTTS = require("light-tts");

module.exports = NodeHelper.create({

    start() {
        console.log(`Starting node helper for: ${this.name}`);
    },

    socketNotificationReceived(notification, payload) {
        if (notification === "CONFIG") {
            this.config = payload;
        } else if (notification === "google-tts") {
            LightTTS.set_opts({
                api_name: "google",
                lang: this.config.lang
            });
            LightTTS.say(payload)   // speed normal = 1 (default), slow = 0.24
                .then(function (url) {
                    console.log(url); // https://translate.google.com/translate_tts?...
                })
                .catch(function (err) {
                    console.error(err.stack);
                });
            this.sendSocketNotification("HIDE", {});
        }
    }
});
