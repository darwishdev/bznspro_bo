 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import { useNotificationStore } from 'v-dashkit/stores'
import type { TeamMembersListResponse , TeamMembersListRow } from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/public_team_members_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderImage, TableHeaderDate } from 'v-dashkit/utils/table'
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';

const { t } = useI18n()

const { records, deletedRecords, options } = await apiClient.teamMembersList({})

const headers: Record<string, ITableHeader> = {
    'teamMemberName': new TableHeaderText('teamMemberName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "teamMemberName",
                placeholder: t("teamMemberName")
            }
        }
    }),
    'jobTitle': new TableHeaderText('jobTitle', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "jobTitle",
                placeholder: t("jobTitle")
            }
        }
    }),
    'teamMemberImage': new TableHeaderImage('teamMemberImage', {
        sortable: true,
        isGlobalFilter: true,
    }),
    
    'createdAt': new TableHeaderDate('createdAt', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.DATE_AFTER,
            input: {
                    $formkit: 'picker',
                    outerClass: "col-12 sm:col-6 md:col-3",
                    name: "createdAt",
                    placeholder: t("createdAt")
            }
        }
    }),
}

const tableProps: DataListProps<TeamMembersListResponse, TeamMembersListRow> = {
    context: {
        title: "projects",
        dataKey: "teamMemberId",
        records: records,
        exportable: true,
        deletedRecords: deletedRecords,
        displayType: "table",
        fetchFn: apiClient.teamMembersList as any,
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