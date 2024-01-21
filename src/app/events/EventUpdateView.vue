 <script setup lang="ts">
import AppForm from 'v-dashkit/form/AppForm';
import { useI18n } from 'vue-i18n';
import { getRoleFormProps } from './RoleForm'
const { t } = useI18n()

const formProps = await getRoleFormProps(t, 'update')
</script>
<template>
    <app-form :context="formProps" />
</template>