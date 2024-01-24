 
<script setup lang="ts">
import AppForm from 'v-dashkit/form/AppForm';
import { useI18n } from 'vue-i18n';
import { getEventFormProps } from './EventForm'
const { t } = useI18n()

const formProps = await getEventFormProps(t, 'create')
</script>
<template>
    <app-form :context="formProps.context" />
</template>