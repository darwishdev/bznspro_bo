import type {
    ProjectCreateRequest , ProjectUpdateRequest , ProjectCreateResponse , ProjectUpdateResponse
} from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/public_projects_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';


const getSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {
    return {
        '': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "projectName",
                validation: "required",
                placeholder: t("projectName"),
                label: t("projectName")
            },
            {
                $formkit: 'dropdownCustom',
                outerClass: "col-6",
                name: "categoryId",
                validation: "required",
                options: 'categoriesInputList',
                requestValue: 1,
                cacheName: 'projectCategories',
                placeholder: t("categories"),
                label: t("categories")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-12 sm:col-6 md:col-2",
                    type: 'image',
                    name: 'projectImage',
                    value: "0.701566374267176.png",
                    // size: 500
                }
            },
        ],
    };
};

const redirectRoute = 'projects_list';

export const getProjectsFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? ProjectCreateRequest : ProjectUpdateRequest, T extends 'create' ? ProjectCreateResponse : ProjectUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    context: {
                        title: "projects_create",
                        submitHandler: {
                            endpoint: apiClient.projectCreate,
                            redirectRoute
                        },
                        sections: getSections(t)
                    }
                };
                setTimeout(() => r(formProps), 100);

                return;
            }

            const formProps = {
                context: {
                    title: "projects_update",
                    submitHandler: {
                        endpoint: apiClient.projectUpdate,
                        redirectRoute
                    },
                    sections: getSections(t),
                    findHandler: {
                        endpoint: apiClient.projectFindForUpdate,
                        requestPropertyName: 'projectId'
                    }
                }
            };
            setTimeout(() => r(formProps), 100);
        });
    };
