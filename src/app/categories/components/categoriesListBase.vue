<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import apiClient from '@/api/ApiClient';
import { useI18n } from 'vue-i18n'
import type { DataListProps, ITableHeader, TableRouter } from 'v-dashkit/types';
import type { ListViewWithTypesProps } from '@/types/types';
import { TableHeaderDate, TableHeaderLink, TableHeaderText } from 'v-dashkit/utils/table';
import { FilterMatchMode } from 'primevue/api';
const { t } = useI18n()
const props = defineProps<ListViewWithTypesProps>();
const { records, options } = await apiClient.categoriesList({ categoryTypeId: props.typedId })


const dataKey = "categoryId"
const viewRouter: TableRouter = {
    name: props.viewRouterName,
    paramName: "id",
    paramColumnName: dataKey
}
const headers: Record<string, ITableHeader> = {
    'categoryId': new TableHeaderLink('categoryId', {
        sortable: true,
        isGlobalFilter: true,
        router: viewRouter
    }),
    'categoryName': new TableHeaderText('categoryName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "categoryName",
                placeholder: t("categoryName")
            }
        }
    }),
    'categoryType': new TableHeaderDate('categoryType', {
        sortable: true,
        isGlobalFilter: true,
    }),
}


const tableProps: DataListProps<any, any> = {
    context: {
        formSections: props.createForm ? props.createForm : undefined,
        title: "categories_list",
        dataKey: dataKey,
        exportable: true,
        records,
        displayType: "card",
        viewRouter: viewRouter,
        fetchFn: apiClient.categoriesList({ categoryTypeId: props.typedId }) as any,
        options: options! as any,
        headers
    }
}


</script>
<template>
    <DataList class="sm-column" :context="tableProps.context">
        <template #start="{ data }">
            <div class="flex flex-column justify-content-center align-items-center">
                <h4>{{ $t('categoryId') }} </h4>
                <span class="text-center font-bold"> {{ data.categoryId }} </span>
            </div>
        </template>
        <template #end="{ data }">
            <div class="p-3 w-full text-center align-items-center m-auto" style="margin: auto; display: flex; justify-content: center;">
                <h1 >{{ data.categoryName }} </h1>
            </div>
            <!-- <h4>{{ $t('createdAt') }} </h4>
            <span class="text-center"> {{ new Date(data.createdAt).toDateString() }} </span> -->
        </template>
    </DataList>
</template>


<style   lang="scss">
.card-start,
.card-end,
.card-start>div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.card-start {
    background: var(--color-primary);
    gap: 5px;

    & h2,
    h3 {
        color: #fff !important;

    }

    & h2 {
        font-weight: 800;
        font-size: 32px;
    }
}
</style> 


