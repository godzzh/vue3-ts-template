import { ref } from 'vue'
import { defineStore } from 'pinia'

const useSystemStore = defineStore('system', () => {

    const sysTheme = ref(false)

    const language = ref('CN')

    if (localStorage.getItem('language') === null) {
        localStorage.setItem('language', 'CN')
    }
    language.value = localStorage.getItem('language') || 'CN'

    const toggleLanguage = (lang: string) => {
        language.value = lang
        localStorage.setItem('language', lang)
    }

    const sysInfo = ref({
        title: 'AI视频推理平台',
        logo: "static/images/logo.jpg"
    })

    // sysTheme.value = localStorage.getItem('darkTheme') === 'yes' ? true : false

    const toggleTheme = () => {
        sysTheme.value = !sysTheme.value
        localStorage.setItem('darkTheme', sysTheme.value ? 'yes' : 'no')
    }

    return {
        sysTheme,
        toggleTheme,
        language,
        sysInfo,
        toggleLanguage
    }
})

export default useSystemStore
