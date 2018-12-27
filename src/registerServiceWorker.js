/* eslint-disable no-console */

import { register } from 'register-service-worker'
import { MessageBox, Notification } from 'element-ui'


if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}/OneSignalSDKWorker.js`, {
        ready() {
            console.log(`%cService worker is active.`, `color:#F44336; font-weight: 700`)
        },
        registered(registration) {
            console.log(`%cService worker has been registered.`, `color:#E91E63; font-weight: 700`)
            window.$registration = registration

        },
        cached(registration) {
            console.log(`%cContent has been cached for offline use.`, `color:#9C27B0; font-weight: 700`)
        },
        updatefound(registration) {
            console.log(`%cNew content is downloading.`, `color:#3F51B5; font-weight: 700`)
        },
        updated(registration) {
            MessageBox.confirm('A new and improved version is available. Please reload browser your to get the latest update. &#x1F60A', 'New version found', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'info',
                roundButton: true,
                dangerouslyUseHTMLString: true
            }).then(() => {
                location.reload()
            }).catch(() => {})
        },
        offline() {
            console.log(`%cNo internet connection found. App is running in offline mode.`, `color:#795548; font-weight: 700`)
        },
        error(error) {
            console.log(`%cError during service worker registration.`, `color:#FF5722; font-weight: 700`)
        }
    })
}