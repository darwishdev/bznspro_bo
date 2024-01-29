 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import { useNotificationStore } from 'v-dashkit/stores'
import type { ProgramsListResponse , ProgramsListRow } from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/public_programs_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderImage, TableHeaderDate } from 'v-dashkit/utils/table'
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';

const { t } = useI18n()

const { records, deletedRecords, options } = await apiClient.programsList({})
const dataKey = "programId"

const headers: Record<string, ITableHeader> = {
    'programName': new TableHeaderText('programName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "programName",
                placeholder: t("programName")
            }
        }
    }),
    'programImage': new TableHeaderImage('programImage', {
        sortable: true,
        isGlobalFilter: true,
    }),
}

const tableProps: DataListProps<ProgramsListResponse, ProgramsListRow> = {
    context: {
        title: "programs",
        dataKey: dataKey,
        records: records,
        exportable: true,
        deletedRecords: deletedRecords,
        displayType: "table",
        fetchFn: apiClient.programsList as any,
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