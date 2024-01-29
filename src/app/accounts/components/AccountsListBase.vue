 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderCount, TableHeaderTag, TableHeaderHidden, TableHeaderLink } from 'v-dashkit/utils/table';
import { getLookUpOptionsByType, getValueOfLookupTpeByLabel } from '@/components/form/Lookups'
import { FilterMatchMode } from 'primevue/api';
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { AccountsListRequest } from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/accounts_account_definitions_pb';
import type { DataListProps, TableRouter, ITableHeader, AppFormSection } from 'v-dashkit/types';
import { useTableStore } from 'v-dashkit/stores';
import type { ListViewWithTypesProps } from '@/types/types';
import Menu from 'primevue/menu';
const { t } = useI18n()
const tableStore = useTableStore()

const props = defineProps<ListViewWithTypesProps<AccountsListRequest>>();
const { records, options } = await apiClient.accountsList({ accountTypeId: props.typedId })
const dataKey = "accountId"
const viewRouter: TableRouter = {
    name: props.viewRouterName,
    paramName: "id",
    paramColumnName: dataKey
}

const headers: Record<string, ITableHeader> = {
    'customerId': new TableHeaderLink('customerId', {
        sortable: true,
        isGlobalFilter: true,
        router: viewRouter
    }),
    'customerName': new TableHeaderText('customerName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "customerName",
                placeholder: t("customerName")
            }
        }
    }),
    'customerEmail': new TableHeaderText('customerEmail', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "Email",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "customerEmail",
                placeholder: t("customerEmail")
            }
        }
    }),
    'customerPhone': new TableHeaderText('customerPhone', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.STARTS_WITH,
            input: {
                $formkit: 'text',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-3",
                name: "customerPhone",
                placeholder: t("customerPhone")
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
    'transaction_create': {
        isTitleHidden: true,
        isTransparent: true,
        inputs: [

            {
                $formkit: 'lookup',
                outerClass: "col-12",
                name: "transactionTypeId",
                id: "transactionTypeId",
                validation: "required",
                typeName: 'transaction_types',
                placeholder: t("transactionType"),
                label: t("transactionType")
            },
            {
                $formkit: 'entity',
                if: transferTransactionCondition,
                outerClass: "col-12",
                name: "fromEntityId",
                validation: "required",
                typeName: 'transaction_types',
                placeholder: t("sender_warehouse"),
                label: t("sender_warehouse")
            },
            {
                $formkit: 'entity',
                outerClass: "col-12",
                name: "toEntityId",
                validation: "required",
                typeName: 'warehouse',
                placeholder: t("warehouse"),
                label: t("warehouse")
            },
            {
                $formkit: 'account',
                outerClass: "col-12",
                name: "fromAccountId",
                if: purchaseTransactionCondition,
                validation: "required",
                typeName: 'safe',
                placeholder: t("safe"),
                label: t("safe")
            },
            {
                $formkit: 'account',
                outerClass: "col-12",
                if: purchaseTransactionCondition,
                name: "toAccountId",
                validation: "required",
                typeName: 'supplier',
                placeholder: t("supplier"),
                label: t("supplier")
            },


        ]
    }
}

const tableProps: DataListProps<any, any> = {
    context: {
        formSections,
        title: "Transactions List",
        dataKey: dataKey,
        exportable: true,
        records,
        displayType: "table",
        viewRouter: viewRouter,
        fetchFn: apiClient.stockTransactionsList({ transactionTypeId: props.typedId }) as any,
        options: options! as any,
        headers
    }
}
const menuRefs = ref<Record<number, any>>({})

const toggle = (index: number, e: Event) => {
    console.log('tog', index, menuRefs.value[index])
    menuRefs.value[index].toggle(e);
};
</script>
<template>
    <!-- {{ lookups['transaction_types'] }} -->
    <data-list class="sm-column" :context="tableProps.context">
        <template v-slot:items.transactionType="{ data }">
            {{ $t(data.transactionType) }}
        </template>
        <template v-slot:actions="{ data }">
            <div class="actions-btns">
                <div class="flex">
                    <!-- <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria - haspopup="true" aria -
                        controls="overlay_menu" /> -->
                    <app-btn class="primary" icon="pencil" @click="(e: Event) => toggle(data[dataKey], e)"
                        :label="$t('actions')" />
                    <Menu :ref="(el: any) => menuRefs[data[dataKey]] = el" id="overlay_menu" :popup="true">
                        <template #start>
                            <app-btn class="w-full" icon="eye" :label="$t('view')" />
                            <app-btn class="w-full" icon="pencil" v-if="data.transactionStatus == 'open'"
                                :label="$t('update')" />
                            <app-btn class="w-full" icon="trash" v-if="data.transactionStatus == 'closed'"
                                :label="$t('cancel')" />
                            <app-btn class="w-full" :icon="tableStore.deleteRestoreVaraints.icon"
                                v-if="data.transactionStatus == 'open'"
                                :label="$t(tableStore.deleteRestoreVaraints.label)" />
                            <app-btn v-if="data.transactionStatus == 'comitted'" class="w-full" :label="$t('refund')"
                                icon="replay" />
                        </template>
                    </Menu>

                </div>
            </div>
        </template>
    </data-list>
</template>


<style   lang="scss"></style> 


