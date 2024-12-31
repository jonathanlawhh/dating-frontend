import '@mdi/font/css/materialdesignicons.css'

import '@/styles/main.scss'
import {createVuetify} from 'vuetify'

const appTheme = {
    dark: true,
    colors: {
        primary: '#e82971',
        secondary: '#f39314'
    },
    options: {
        customProperties: true
    }
}

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        theme: {
            defaultTheme: 'appTheme',
            themes: {
                appTheme,
            },
        },
    })
    app.vueApp.use(vuetify)
})

