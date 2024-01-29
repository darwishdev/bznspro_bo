 

<script setup lang="ts">
import { ref } from 'vue'
import DataList from 'v-dashkit/data/DataList';
import type { EventRequestsListResponse, EventRequestsListRow } from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/events_request_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderDate, TableHeaderTag } from 'v-dashkit/utils/table'
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import { TableHeaderPrice } from '@/common/utils/TableHeaders'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';
import Menu from 'primevue/menu';
const { t } = useI18n()

const { records, deletedRecords } = await apiClient.eventRequestsList({})
const dataKey = "eventId"
const viewRouter: TableRouter = {
    name: "requests_find",
    paramName: "id",
    paramColumnName: dataKey
}
const headers: Record<string, ITableHeader> = {
    'eventRequestId': new TableHeaderText('eventRequestId', {
        sortable: true,
        isGlobalFilter: true,
        // router: viewRouter
    }),
    'userEmail': new TableHeaderText('userEmail', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "userEmail",
                placeholder: t("userEmail")
            }
        }
    }),
    'userPhone': new TableHeaderText('userPhone', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "userPhone",
                placeholder: t("userPhone")
            }
        }
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
    'categoryName': new TableHeaderText('categoryName', {
        sortable: true,
    }),
    'requestStatus': new TableHeaderTag('requestStatus', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "requestStatus",
                placeholder: t("requestStatus")
            }
        }
    }),
    'price': new TableHeaderPrice('price', {
        sortable: true,
    }),
    'discount': new TableHeaderText('discount', {
        sortable: true,
    }),
    'discountAmount': new TableHeaderPrice('discountAmount', {
        sortable: true,
    }),
    'finalPrice': new TableHeaderPrice('finalPrice', {
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

const tableProps: DataListProps<EventRequestsListResponse, EventRequestsListRow> = {
    context: {
        title: "events",
        dataKey: "eventId",
        records: records,
        exportable: true,
        deletedRecords: deletedRecords,
        viewRouter: viewRouter,
        displayType: "table",
        fetchFn: apiClient.eventRequestsList as any,
        options: {
            "title": "event_requests_list",
            "description": "event_requests_description",
            "deleteRestoreHandler": {
                "endpoint": "eventRequestDeleteRestore",
                "requestProperty": "event_requestIds"
            }
        } as any,
        headers
    }
}

const menuRefs = ref<Record<number, any>>({})

const toggle = (index: number, e: Event) => {
    menuRefs.value[index].toggle(e);
};

const updateRequestStatus = (eventRequestId: number, newRequestStatus: number) => {
    console.log(eventRequestId);
    apiClient.eventRequestUpdate({ eventRequestId: eventRequestId, requestStatusId: newRequestStatus }).then((result) => {
        location.reload()
    }).catch((err) => {
        console.log(err);
    });
}


</script>
<template>
    <Suspense timeout="0">
        <template #default>
            <DataList class="sm-column" :context="tableProps.context">
                <template v-slot:actions="{ data }">
                    <div class="actions-btns">
                        <div class="flex">
                            <app-btn class="primary" icon="pencil" @click="(e: Event) => toggle(data[dataKey], e)"
                                :label="$t('actions')" />
                            <Menu :ref="(el: any) => menuRefs[data[dataKey]] = el" id="overlay_menu" :popup="true">
                                <template #start>
                                    <app-btn class="w-full" icon="check"
                                        @click="updateRequestStatus(data.eventRequestId, 2)"
                                        v-if="data.requestStatusId == 1" :label="$t('confirm_request')" />
                                    <app-btn class="w-full" icon="close"
                                        @click="updateRequestStatus(data.eventRequestId, 1)"
                                        v-if="data.requestStatusId != 1" :label="$t('pend_request')" />
                                    <app-btn class="w-full" @click="updateRequestStatus(data.eventRequestId, 3)"
                                        icon="trash" v-if="data.requestStatusId != 2 || data.requestStatus !== 'confirmed'"
                                        :label="$t('cancel')" />
                                </template>
                            </Menu>
                        </div>
                    </div>
                </template>
            </DataList>
        </template>
    </Suspense>
</template>
