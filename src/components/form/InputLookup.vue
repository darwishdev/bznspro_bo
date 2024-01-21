
<script setup lang="ts">
import type { InputDropdownWithTypeProps } from '@/types/types';
import { useI18n } from 'vue-i18n';
import { getLookUpOptionsByType } from './Lookups'
const props = defineProps<InputDropdownWithTypeProps>();
const { t } = useI18n()
const options = getLookUpOptionsByType(props.context.typeName, t)
const placeholder = props.context.placeholder ? t(props.context.placeholder) : t(props.context.typeName)
</script>
<template>
    <FormKit type="dropdown" outerClass="w-full" @input="props.context.node.input" :placeholder="placeholder"
        :options="options" />
</template> 