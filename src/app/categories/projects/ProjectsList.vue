 

<script setup lang="ts">
import CategoriesListBase from '../components/categoriesListBase.vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

</script>
<template>
    <div>
        <CategoriesListBase :typedId="1" viewRouterName="project_find" />
    </div>
</template>