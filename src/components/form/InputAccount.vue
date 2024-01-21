
<script setup lang="ts">
import type { InputDropdownWithTypeProps } from '@/types/types';
import { useI18n } from 'vue-i18n';
import apiClient from '@/api/ApiClient';
import { onMounted } from 'vue';
import { getValueOfLookupTpeByLabel } from './Lookups'
import { ref } from 'vue';
const { t } = useI18n()
const props = defineProps<InputDropdownWithTypeProps>();
const optionsRef = ref<[]>([])
const placeholder = props.context.placeholder ? t(props.context.placeholder) : t(props.context.typeName)
const localStoragePrefix = 'accounts-input'
const cacheName = `${localStoragePrefix}-${props.context.typeName}`
const loadingRef = ref(true)
onMounted(() => {
    const cachedOptions = localStorage.getItem(cacheName)
    if (cachedOptions) {
        optionsRef.value = JSON.parse(cachedOptions)
        loadingRef.value = false
    }
    const accountTypeId = props.context.typeName === 'all' ? 0 : getValueOfLookupTpeByLabel('account_types', props.context.typeName, t)
    if (accountTypeId != null) {
        apiClient.accountsInputList({ accountTypeId }).then(
            (res: any) => {
                optionsRef.value = res.options
                localStorage.setItem(cacheName, JSON.stringify(res.options))
                loadingRef.value = false
            })
    }
})
</script>
<template>
    <FormKit type="dropdown" outerClass="w-full" @input="props.context.node.input" :placeholder="placeholder"
        :options="optionsRef" />
</template> 