# MMM-google-tts
Text to speech conversion module for MagicMirror². This module uses Google Text-To-Speech. It allows to have a wide range of languages available. However, it has a limit of the number of characters to translate. If you need more than 200 characters, I advise you to use [MMM-TTS](https://github.com/fewieden/MMM-TTS) instead.

## Dependencies

* Installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
* npm

## Installation

1. Clone this repo into `~/MagicMirror/modules` directory.
1. Configure your `~/MagicMirror/config/config.js`:

    ```
    {
        module: 'MMM-google-tts',
        position: 'top_right',
        config: {
            ...
        }
    }
    ```
## Config options

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `title` | `'An alert'` | The title of the notification. <br><br> **Possible values:** `text` or `html`
| `message` | `'A message alert'` | The message of the notification. This message will be the text to speech.
| `lang` | `en-GB` | If you want another language than default you can find suitable languageCode from [Google Document](https://cloud.google.com/speech/docs/languages) and then fill in the voice name here. |
| `timer` | `10000` | After the timer, the _video_ tag will be deleted from the DOM. If your text to speech is longer than 10s, increase this value. |
| `type` | `null` | If you want to display an alert or a notification, you need to change this value <br><br> **Possible values:** `alert` or `notification`
| `debug` | `false` | Display text to speech on the page. |

## For developers

To use MMM-google-tts in your module you have to send a socket notification like this `this.sendNotification('MMM-google-tts', 'This is a text to read. Hello World!');`.

If the payload is an array instead of a string, you need to specify at least these elements :
1. title
1. message
1. type (`alert` or `notification`)
1. timer (default : `10000`)

The element `message` will be pronounced by Google-TTS. And an alert will be displayed as the **alert** module of **MagicMirror²** does it.

You could use this module with [MMM-ModuleScheduler](https://github.com/ianperrin/MMM-ModuleScheduler):
```
    {
        module: "MMM-ModuleScheduler",
        config: {
            notification_schedule: [
                {notification: "MMM-google-tts", schedule: "45 6 * * *", payload: "Have a nice day. Courage."},
                {notification: "MMM-google-tts", schedule: "0 8 * * *", payload: "Do a barrel roll!"}
            ]
        }
    },
```
Be aware that the ``payload`` is a string and not an array.

## Inspiration
This module was created on the basis of the [MMM-TTS](https://github.com/fewieden/MMM-TTS) module of fewieden. The launch of the video for google-tts is based on the module [MMM-AlarmClock](https://github.com/fewieden/MMM-AlarmClock/blob/master/MMM-AlarmClock.js#L285)'s sound.
