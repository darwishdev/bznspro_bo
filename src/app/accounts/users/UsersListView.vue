 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import { useNotificationStore } from 'v-dashkit/stores'
import type { UsersListRow , UsersListResponse } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_user_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderCount, TableHeaderLink, TableHeaderDate } from 'v-dashkit/utils/table'
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';

const no = useNotificationStore()

const op = () => {
    console.log("asdsad")
    no.showSuccess("asd", "asd")
}

const { t } = useI18n()

const { records, deletedRecords, options } = await apiClient.usersList({})
const dataKey = "userId"
const viewRouter: TableRouter = {
    name: "users_find",
    paramName: "id",
    paramColumnName: dataKey
}
const headers: Record<string, ITableHeader> = {
    'userId': new TableHeaderLink('userId', {
        sortable: true,
        isGlobalFilter: true,
        router: viewRouter
    }),
    'userName': new TableHeaderText('userName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "userName",
                placeholder: t("userName")
            }
        }
    }),
    'userEmail': new TableHeaderText('userEmail', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "Email",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "userEmail",
                placeholder: t("userEmail")
            }
        }
    }),
    'userPhone': new TableHeaderText('userPhone', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.STARTS_WITH,
            input: {
                $formkit: 'text',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "userPhone",
                placeholder: t("userPhone")
            }
        }
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


const tableProps: DataListProps<UsersListResponse, UsersListRow> = {
    context : {
        title: "users",
        dataKey: "userId",
        records: records,
        exportable: true,
        deletedRecords: deletedRecords,
        viewRouter: viewRouter,
        displayType: "card",
        fetchFn: apiClient.usersList as any,
        options: options! as any,
        headers
    }
}


</script>
<template>
    <Suspense timeout="0">
        <template #default>
            <DataList class=" usersList" :context="tableProps.context">
                <template #start="{ data }">
                    <div class="w-full h-full userImage userimg">
                            <app-image :src="data.userImage" class="userimg" />
                    </div>
                </template>
                <template #end="{ data }">
                    <div class="flex flex-column justiy-content-center mt-2">
                        <h1>{{ data.userName.split(" ")[0] }} </h1>
                        <!-- <h4>{{ $t('createdAt') }} : </h4>
                        <span class="text-center"> {{ data.createdAt }} </span> -->
                        <h3 class="hidden md:flex my-1">{{ data.userEmail }}</h3>
                        <h4 class="mt-2">{{ data.userPhone }}</h4>
                    </div>
                </template>
            </DataList>
        </template>
        <template #fallback>
            <h2>loading table component from users list</h2>
        </template>
    </Suspense>
</template>


<style>
.app-table.table-card tbody.p-datatable-tbody tr:not(.p-datatable-emptymessage) td.card-start {
    padding: 0;
}
.userimg img {
  width: 100%;
  height: 100%;
  max-width: 150px;
  min-width: 100px;
  border-radius: 6px 0 0 6px;
  background: none;
}
</style> 