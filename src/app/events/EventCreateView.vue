 
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
<style>
li.formkit-item{
    border: none !important;
    background-color: var(--color-card);
  }
  ul.formkit-controls , ul.formkit-controls button{
    background: none;
    color: white;
  }
  .formkit-controls>li>button:disabled {
    color: var(--fk-color-disabled);
    cursor: default;
  }
  [data-type="repeater"]>.formkit-fieldset {
    max-width: none;
    width: 100%;
    padding: 1.25em;
    background-color: var(--color-card) !important;
}
  
  [data-type=button] .formkit-input {
    background: var(--color-background) !important;
    width: 10rem;
  }
  .p-toolbar-group-end .formkit-track{
    margin-top: 2vh;
  }
</style>