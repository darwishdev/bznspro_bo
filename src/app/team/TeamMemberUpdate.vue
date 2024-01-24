 
<script setup lang="ts">
import AppForm from 'v-dashkit/form/AppForm';
import { useI18n } from 'vue-i18n';
import { getTeamMembersFormProps } from './TeamForm'
const { t } = useI18n()

const formProps = await getTeamMembersFormProps(t, 'update')
</script>
<template>
    <app-form :context="formProps.context" />
</template>