const modules = import.meta.glob('./*.ts', { eager: true }) as Record<string, any>

let api = {}

for (let key in modules) {
    api = Object.assign({ ...modules[key] }, api)
}

export default api
