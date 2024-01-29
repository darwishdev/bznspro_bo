 

<script setup lang="ts">
import DataList from 'v-dashkit/data/DataList';
import { useNotificationStore } from 'v-dashkit/stores'
import type { BlogsListResponse , BlogsListRow } from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/blog_blog_definitions_pb'
import apiClient from '@/api/ApiClient';
import { TableHeaderText, TableHeaderImage, TableHeaderDate } from 'v-dashkit/utils/table'
import { FilterMatchMode } from 'primevue/api';
import { useI18n } from 'vue-i18n'
import type { DataListProps, TableRouter, ITableHeader } from 'v-dashkit/types';

const { t } = useI18n()

const { records, deletedRecords, options } = await apiClient.blogsList({})
const dataKey = "blogId"

const headers: Record<string, ITableHeader> = {
    'blogName': new TableHeaderText('blogName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-4",
                name: "blogName",
                placeholder: t("blogName")
            }
        }
    }),
    'categoryName': new TableHeaderText('categoryName', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.CONTAINS,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-4",
                name: "categoryName",
                placeholder: t("categoryName")
            }
        }
    }),
    'views': new TableHeaderText('views', {
        sortable: true,
        isGlobalFilter: true,
        filter: {
            matchMode: FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
            input: {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-4",
                name: "views",
                placeholder: t("viewsMoreThan")
            }
        }
    }),
    'blogImage': new TableHeaderImage('blogImage', {
        isGlobalFilter: true,
    }),
    'dateTime': new TableHeaderDate('dateTime', {
        sortable: true,
        filter: {
            matchMode: FilterMatchMode.DATE_IS,
            input: {
                    $formkit: 'picker',
                    outerClass: "col-12 sm:col-6 md:col-4",
                    name: "dateTime",
                    placeholder: t("createdAt")
            }
        }
    }),
}

const tableProps: DataListProps<BlogsListResponse, BlogsListRow> = {
    context: {
        title: "blogs",
        dataKey: dataKey,
        records: records,
        exportable: true,
        deletedRecords: deletedRecords,
        displayType: "table",
        fetchFn: apiClient.blogsList as any,
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