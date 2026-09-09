<template>
    <div
        ref="tablistRef"
        class="tabs"
        role="tablist"
        :aria-label="ariaLabel"
        @keydown="handleKeydown"
    >
        <button
            v-for="option in normalizedOptions"
            :key="String(option.value)"
            :ref="(element) => setTabRef(element, option.value)"
            class="tabs__item"
            :class="{ 'tabs__item--active': isActive(option.value) }"
            type="button"
            role="tab"
            :aria-selected="isActive(option.value)"
            :disabled="option.disabled"
            :tabindex="isActive(option.value) ? 0 : -1"
            @click="select(option)"
        >
            {{ option.label }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, type ComponentPublicInstance } from 'vue';

export interface TabOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}

const props = withDefaults(
    defineProps<{
        modelValue: string | number;
        options: ReadonlyArray<TabOption>;
        allLabel?: string;
        allValue?: string | number;
        showAll?: boolean;
        ariaLabel?: string;
    }>(),
    {
        allLabel: '全部',
        allValue: '',
        showAll: true,
        ariaLabel: '内容分类',
    }
);

const emit = defineEmits<{
    'update:modelValue': [value: string | number];
    change: [value: string | number, option: TabOption | null];
}>();

const tablistRef = ref<HTMLElement | null>(null);
const tabRefs = new Map<string | number, HTMLButtonElement>();

const normalizedOptions = computed<TabOption[]>(() => [
    ...(props.showAll ? [{ label: props.allLabel, value: props.allValue }] : []),
    ...props.options,
]);

const isActive = (value: string | number) => props.modelValue === value;

const select = (option: TabOption) => {
    if (option.disabled || isActive(option.value)) return;
    emit('update:modelValue', option.value);
    emit('change', option.value, option);
};

const setTabRef = (element: Element | ComponentPublicInstance | null, value: string | number) => {
    if (element instanceof HTMLButtonElement) tabRefs.set(value, element);
};

const handleKeydown = (event: KeyboardEvent) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const enabled = normalizedOptions.value.filter((option) => !option.disabled);
    if (!enabled.length) return;

    event.preventDefault();
    const current = Math.max(
        0,
        enabled.findIndex((option) => option.value === props.modelValue)
    );
    const nextIndex =
        event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? enabled.length - 1
              : (current + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length;
    const next = enabled[nextIndex];
    if (!next) return;
    select(next);
    tabRefs.get(next.value)?.focus();
};
</script>

<style scoped>
.tabs {
    display: flex;
    gap: 4px;
    max-width: 100%;
    padding: 4px;
    overflow-x: auto;
    border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
    border-radius: 8.8px;
    background: color-mix(in srgb, currentColor 5%, transparent);
    scrollbar-width: none;
}

.tabs::-webkit-scrollbar {
    display: none;
}

.tabs__item {
    flex: 0 0 auto;
    min-height: 35.2px;
    padding: 7.2px 12.8px;
    border: 0;
    border-radius: 6.4px;
    color: inherit;
    background: transparent;
    cursor: pointer;
    font: inherit;
    font-size: 12px;
    opacity: 0.6;
    transition:
        opacity var(--transition-fast),
        background var(--transition-fast),
        transform var(--transition-fast);
}

.tabs__item:hover:not(:disabled) {
    opacity: 0.9;
}

.tabs__item--active {
    background: color-mix(in srgb, currentColor 14%, transparent);
    opacity: 1;
}

.tabs__item:active:not(:disabled) {
    transform: scale(0.98);
}

.tabs__item:disabled {
    cursor: not-allowed;
    opacity: 0.3;
}
</style>
