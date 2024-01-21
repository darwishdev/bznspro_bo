 

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
    'eventId': new TableHeaderLink('eventId', {
        sortable: true,
        isGlobalFilter: true,
        router: viewRouter
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
    //     filter: {
    //         matchMode: FilterMatchMode.CONTAINS,
    //         input: {
    //             $formkit: 'text',
    //             prefixIcon: "tools",
    //             outerClass: "col-12 sm:col-6 md:col-3",
    //             name: "eventImage",
    //             placeholder: t("eventImage")
    //         }
    //     }
    // }),

    'date': new TableHeaderText('date', {
        sortable: true,

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


const formSections: Record<string, AppFormSection> = {
    'event_info': {
        isTitleHidden: true,
        isTransparent: true,
        inputs: [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "eventName",
                validation: "required",
                placeholder: t("eventName"),
                label: t("eventName")
            },
            {
                $formkit: 'textarea',
                prefixIcon: "text",
                outerClass: "col-12 sm:col-6 md:col-7",
                name: "eventDescription",
                placeholder: t("eventDescription"),
                label: t("eventDescription")
            },
        ]
    }
}
const tableProps: DataListProps<EventsListResponse, EventsListRow> = {
    context: {
        formSections,
        title: "events",
        dataKey: "eventId",
        records: records,
        exportable: true,
        deletedRecords: deletedRecords,
        viewRouter: viewRouter,
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
                <template #start="{ data }">
                    <div class="permissions">
                        <h3>{{ $t('permissions') }}</h3>
                        <h2>{{ data.permissionsCount }}</h2>
                    </div>
                    <div class="users">
                        <h3>{{ $t('users') }}</h3>
                        <h2>{{ data.usersCount }} </h2>

                    </div>
                </template>
                <template #end="{ data }">
                    <h2 class="mt-2">{{ data.eventName }} </h2>
                    <h4>{{ $t('createdAt') }} : </h4>
                    <span class="text-center"> {{ new Date(data.createdAt).toDateString() }} </span>
                </template>
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