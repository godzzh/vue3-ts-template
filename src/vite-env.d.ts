/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module '@/common/VModal/index.vue' {
  import type { DefineComponent } from 'vue'
  interface VModalProps {
    show: boolean
    title?: string
  }
  interface VModalEmits {
    (e: 'update:show', value: boolean): void
    (e: 'close'): void
  }
  const VModal: DefineComponent<VModalProps> & VModalEmits
  export default VModal
}

declare module '@/common/VImage/index.vue' {
  import type { DefineComponent } from 'vue'
  interface VImageProps {
    src?: string
    fallback?: string
    width?: string | number
    height?: string | number
    'object-fit'?: string
    alt?: string
  }
  const VImage: DefineComponent<VImageProps>
  export default VImage
}

declare module '@/common/VEcharts/index.vue' {
  import type { DefineComponent } from 'vue'
  interface VEchartsProps {
    options?: Record<string, unknown>
    autoPlay?: boolean
  }
  interface VEchartsEmits {
    (e: 'itemClick', params: unknown): void
  }
  const VEcharts: DefineComponent<VEchartsProps> & VEchartsEmits
  export default VEcharts
}
