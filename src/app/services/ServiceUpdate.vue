 
<script setup lang="ts">
import AppForm from 'v-dashkit/form/AppForm';
import { useI18n } from 'vue-i18n';
import { getServicesFormProps } from './ServicesForm'
const { t } = useI18n()

const formProps = await getServicesFormProps(t, 'update')
</script>
<template>
    <app-form :context="formProps.context" />
</template>