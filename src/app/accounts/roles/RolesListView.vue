 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import { useNotificationStore } from 'v-dashkit/stores'
import type { RolesListResponse, RolesListRow } from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_role_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderCount, TableHeaderLink, TableHeaderDate } from 'v-dashkit/utils/table'
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

const { records, deletedRecords, options } = await apiClient.rolesList({})
const dataKey = "roleId"
const viewRouter: TableRouter = {
    name: "roles_find",
    paramName: "id",
    paramColumnName: dataKey
}
const headers: Record<string, ITableHeader> = {
    'roleId': new TableHeaderLink('roleId', {
        sortable: true,
        isGlobalFilter: true,
        router: viewRouter
    }),
    'roleName': new TableHeaderText('roleName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "roleName",
                placeholder: t("roleName")
            }
        }
    }),
    'permissionsCount': new TableHeaderCount('permissionsCount', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                numbmper: true,
                name: "permissionsCount",
                validationVisibility: "live",
                placeholder: t("permissionsCountMoreThan")
            }
        }
    }),
    'usersCount': new TableHeaderCount('usersCount', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN,
            input: {
                $formkit: 'number',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                number: true,
                name: "usersCount",
                placeholder: t("usersCountMoreThan")
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


const formSections: Record<string, AppFormSection> = {
    'role_info': {
        isTitleHidden: true,
        isTransparent: true,
        inputs: [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "roleName",
                validation: "required",
                placeholder: t("roleName"),
                label: t("roleName")
            },
            {
                $formkit: 'textarea',
                prefixIcon: "text",
                outerClass: "col-12 sm:col-6 md:col-7",
                name: "roleDescription",
                placeholder: t("roleDescription"),
                label: t("roleDescription")
            },
        ]
    }
}
const tableProps: DataListProps<RolesListResponse, RolesListRow> = {
    context: {
        formSections,
        title: "roles",
        dataKey: "roleId",
        records: records,
        exportable: true,
        deletedRecords: deletedRecords,
        viewRouter: viewRouter,
        displayType: "card",
        fetchFn: apiClient.rolesList as any,
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
                    <h2 class="mt-2">{{ data.roleName }} </h2>
                    <h4>{{ $t('createdAt') }} : </h4>
                    <span class="text-center"> {{ new Date(data.createdAt).toDateString() }} </span>
                </template>
            </DataList>
        </template>
        <template #fallback>
            <h2>loading table component from roles list</h2>
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