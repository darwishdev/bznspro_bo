 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import { useNotificationStore } from 'v-dashkit/stores'
import type { EventsListResponse, EventsListRow } from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/events_event_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderImage, TableHeaderCount, TableHeaderLink, TableHeaderDate } from 'v-dashkit/utils/table'
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, AppFormSection, ITableHeader } from 'v-dashkit/types';

const no = useNotificationStore()

const op = () => {
    console.log("asdsad")
    no.showSuccess("asd", "asd")
}
// import { convertDateRedable } from '@/utils/date/date';
const { t } = useI18n()

const { records, deletedRecords, options } = await apiClient.eventsList({})
const dataKey = "eventId"
const viewRouter: TableRouter = {
    name: "events_find",
    paramName: "id",
    paramColumnName: dataKey
}
const headers: Record<string, ITableHeader> = {
    'eventId': new TableHeaderText('eventId', {
        sortable: true,
        isGlobalFilter: true,
        // router: viewRouter
    }),
    'eventName': new TableHeaderText('eventName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "eventName",
                placeholder: t("eventName")
            }
        }
    }),
    'categoryName': new TableHeaderText('categoryName', {
        sortable: true,
        isGlobalFilter: true,
    }),
    'eventStartTime': new TableHeaderText('eventStartTime', {
        sortable: true,
        isGlobalFilter: true,
    }),
    'eventEndTime': new TableHeaderText('eventEndTime', {
        sortable: true,
        isGlobalFilter: true,
    }),
    'constructorName': new TableHeaderText('constructorName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "constructorName",
                placeholder: t("constructorName")
            }
        }
    }),
    // 'eventImage': new TableHeaderImage('eventImage', {
    //     sortable: true,
    //     isGlobalFilter: true,
    // }),

    'eventDate': new TableHeaderDate('eventDate', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.DATE_IS,
            input: {
                    $formkit: 'picker',
                    outerClass: "col-12 sm:col-6 md:col-3",
                    name: "eventDate",
                    placeholder: t("eventDate")
            }
        }
    }),
}

const tableProps: DataListProps<EventsListResponse, EventsListRow> = {
    context: {
        title: "events",
        dataKey: "eventId",
        records: records,
        exportable: true,
        deletedRecords: deletedRecords,
        displayType: "table",
        fetchFn: apiClient.eventsList as any,
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
        <template #fallback>
            <h2>loading table component from events list</h2>
        </template>
    </Suspense>
</template>

<style lang="scss">
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