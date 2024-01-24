 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import type { TestemonialsListResponse , TestemonialsListRow } from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/public_testemonials_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderImage } from 'v-dashkit/utils/table'
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';

const { t } = useI18n()

const { records, deletedRecords, options } = await apiClient.testemonialsList({})

const headers: Record<string, ITableHeader> = {
    'testemonialName': new TableHeaderText('testemonialName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "testemonialName",
                placeholder: t("testemonialName")
            }
        }
    }),
    'testemonialTitle': new TableHeaderText('testemonialTitle', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "testemonialTitle",
                placeholder: t("testemonialTitle")
            }
        }
    }),
    'testemonialImage': new TableHeaderImage('testemonialImage', {
        sortable: true,
        isGlobalFilter: true,
    }),
}

const tableProps: DataListProps<TestemonialsListResponse, TestemonialsListRow> = {
    context: {
        title: "testemonials",
        dataKey: "testemonialId",
        records: records,
        exportable: true,
        deletedRecords: deletedRecords,
        displayType: "table",
        fetchFn: apiClient.testemonialsList as any,
        options: options! as any,
        headers
    }
}


</script>
<template>
    <Suspense timeout="0">
        <template #default>
            <DataList class="sm-column" :context="tableProps.context">
            </DataList>
        </template>
    </Suspense>
</template>