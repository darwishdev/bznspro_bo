
<script setup lang="ts">
import type { InputDropdownCustomProps, InputSelectOptionsArray, CacheObject } from '@/types/types';
import { useI18n } from 'vue-i18n';
import apiClient from '@/api/ApiClient';
import Dropdown, { type DropdownProps } from 'primevue/dropdown';
import { ref, onMounted } from 'vue';
import { h } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { ObjectKeys } from "v-dashkit/utils/object"
const { t } = useI18n()
const props = defineProps<InputDropdownCustomProps>();

const { options, dropdownProps } = props.context
const optionsRef = ref<any[]>([])
const loadingRef = ref(true)
const modelValueRef = ref<any>(null)

const defaultExpiryHours = 2
const defaultOptionLabel = props.context.convertToFlat ? undefined : 'label'
const defaultOptionValue = props.context.convertToFlat ? undefined : 'value'
const defaultFilterMatchMode = FilterMatchMode.CONTAINS
const initialOptionValue = dropdownProps?.optionValue ? dropdownProps?.optionValue as string : defaultOptionValue
const initialOptionLabel = dropdownProps?.optionLabel ? dropdownProps?.optionLabel as string : defaultOptionLabel

const checkExpiry = (date: string): boolean => {
    return new Date(date) > new Date()
}


const getExpiryByPeriod = (hours: number): Date => {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + hours); // Set expiration to two hours from now
    return expirationDate

}
const readCache = (): boolean => {
    const cachedOptions = localStorage.getItem(props.context.cacheName!)
    if (cachedOptions) {
        const cacheObj: CacheObject = JSON.parse(cachedOptions)
        optionsRef.value = cacheObj.data
        loadingRef.value = false
        console.log("cache found", checkExpiry(cacheObj.expiry))

        return checkExpiry(cacheObj.expiry)
    }
    return false
}
const writeCache = () => {
    if (!props.context.cacheName) return
    const expiry = getExpiryByPeriod(props.context.cachePeriodInHours!).toISOString()
    const cacheObj: CacheObject = {
        data: optionsRef.value,
        expiry
    }
    localStorage.setItem(props.context.cacheName!, JSON.stringify(cacheObj))
}
const handleSuccessResponse = (res: (InputSelectOptionsArray | { options: InputSelectOptionsArray })) => {
    optionsRef.value = 'options' in res ? res.options : res
    writeCache()
    loadingRef.value = false
}

const setDefaults = () => {
    if (!props.context.dropdownProps) {
        props.context.dropdownProps = {}
    }
    props.context.cachePeriodInHours = props.context.cachePeriodInHours ? props.context.cachePeriodInHours : defaultExpiryHours
    props.context.dropdownProps.optionLabel = initialOptionLabel
    props.context.dropdownProps.optionValue = initialOptionValue
    props.context.dropdownProps.placeholder = props.context.placeholder
    props.context.dropdownProps.filterMatchMode = defaultFilterMatchMode
}
onMounted(() => {
    setDefaults()
    if (props.context.cacheName) {
        console.log("cache found")
        // if (readCache()) return
    }
    if (typeof options == 'function') {
        const fn = options as Function
        fn(props.context.requestValue).then(handleSuccessResponse)
        return
    }
    if (typeof options == 'string') {
        if (options in apiClient) {
            const fn = apiClient[options as keyof typeof apiClient] as Function
            fn(props.context.requestValue).then(handleSuccessResponse)

        }
        return
    }
    const isArray = Array.isArray(options)
    if (!isArray) {
        const keys = ObjectKeys(options)
        const newOptions: any[] = []
        for (const key of keys) {
            newOptions.push(props.context.convertToFlat ? options[key] : {
                value: parseInt(key),
                label: options[key]
            })
        }
        handleSuccessResponse(newOptions)
        return
    }
    handleSuccessResponse(props.context.options as InputSelectOptionsArray)
})
const handleInput = (d: { value: any }) => {
    if (props.context.convertToFlat) {
        modelValueRef.value = d.value
    }
    props.context.node.input(d.value)
}
const renderDropDownInput = () => {
    const dropdownProps: DropdownProps = { ...props.context.dropdownProps }
    dropdownProps.modelValue = modelValueRef.value
    dropdownProps.options = optionsRef.value
    dropdownProps.placeholder = t(props.context.placeholder as string)
    dropdownProps.loading = loadingRef.value
    if (props.context.value) {
        modelValueRef.value = props.context.value
    }


    const translatedOption = (slotProps: any) => {
        if (initialOptionLabel) {
            return h('div', t(slotProps.option[initialOptionLabel]))
        }
        return h('div', t(slotProps.option))
    }
    const translatedValue = (slotProps: any) => {
        const inputValue = slotProps.value
        if (!inputValue) {
            const placeholder = slotProps.placeholder ? slotProps.placeholder : t('default_dropdown_placeholder')
            return h('div', placeholder)
        }
        const options = props.context.options as any
        return h('div', t(options[slotProps.value] as string))

    }

    return h(Dropdown, dropdownProps, {
        option: props.context.translateLabel ? translatedOption : undefined,
        value: props.context.translateLabel ? translatedValue : undefined
    })
}
</script>
<template>
    <component :is="renderDropDownInput" class="w-full" @change="handleInput" />
</template> 

<style lang="scss">
.p-dropdown,
.p-inputtext {
    background-color: var(--color-card);
    border: none;
    font-family: var(--font-family);
}
</style>