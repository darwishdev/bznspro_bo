import type {
    CategoryCreateRequest , CategoryCreateResponse , CategoryUpdateRequest , CategoryUpdateResponse
} from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/public_categories_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';

const getCreateSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {
    return {
        '': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "categoryName",
                validation: "required",
                placeholder: t("categoryNamePlaceholder"),
                label: t("categoryNameLabel")
            },
            {
                $formkit: 'dropdownCustom',
                outerClass: "col-6",
                name: "categoryTypeId",
                validation: "required",
                options: {
                    1: "projects",
                    2: "blogs",
                },
                translateLabel: true,
                cacheName: 'categoriesTypes',
                placeholder: t("categoryTypeIdsPlaceholder"),
                label: t("categoryTypeIdsPlaceholderLabel")
            },
        ],
    };
}

const redirectRoute = 'categories_list';

export const getCategoryFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? CategoryCreateRequest : CategoryUpdateRequest, T extends 'create' ? CategoryCreateResponse : CategoryUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                context : {
                    title: "category_create",
                    submitHandler: {
                        endpoint: apiClient.categoryCreate,
                        redirectRoute
                    },
                    sections: getCreateSections(t)
                }
                }
                setTimeout(() => r(formProps), 100)

                return
            }

            const formProps = {
                context : {
                    title: "category_update",
                    submitHandler: {
                        endpoint: apiClient.categoryUpdate,
                        redirectRoute
                    },
                    sections: getCreateSections(t),
                    findHandler: {
                        endpoint: apiClient.categoryFindForUpdate,
                        requestPropertyName: 'categoryId'
                    }
                }
            }
            setTimeout(() => r(formProps), 100)
        })
}


