# MMM-google-tts
Text to speech conversion module for MagicMirror². This module uses Google Text-To-Speech. It allows to have a wide range of languages available. However, it has a limit of the number of characters to translate. If you need more than 200 characters, I advise you to use [MMM-TTS](https://github.com/fewieden/MMM-TTS) instead.

## Dependencies

* Installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
* npm
* [Google-tts-api](https://www.npmjs.com/package/google-tts-api)

## Installation

1. Clone this repo into `~/MagicMirror/modules` directory.
1. Run command `npm install` in `~/MagicMirror/modules/MMM-google-tts` directory.
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
## Config Options

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `text` | `'MMM-google-tts'` | Text to display in debug mode, while there's no text to speech. |
| `lang` | `en-GB` | If you want another language than default you can find suitable languageCode from [Google Document](https://cloud.google.com/speech/docs/languages) and then fill in the voice name here. |
| `speed` | `1` | How fast the speech should be. Speed normal = 1 (default), slow = 0.24 |
| `debug` | `false` | Display text to speech. |

## For Developers

To use MMM-google-tts in your module you have to send a socket notification like this `this.sendNotification('MMM-google-tts', 'This is a text to read. Hello World!');`.

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

## Inspiration
This module was created on the basis of the [MMM-TTS](https://github.com/fewieden/MMM-TTS) module of fewieden.
