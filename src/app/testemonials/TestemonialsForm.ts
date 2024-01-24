import type {
    TestemonialCreateRequest , TestemonialCreateResponse , TestemonialUpdateRequest , TestemonialUpdateResponse
} from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/public_testemonials_definitions_pb'
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
                name: "testemonialName",
                validation: "required",
                placeholder: t("testemonialName"),
                label: t("testemonialName")
            },
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "testemonialTitle",
                validation: "required",
                placeholder: t("testemonialTitle"),
                label: t("testemonialTitle")
            },
            {
                $formkit: 'textarea',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "breif",
                validation: "required",
                placeholder: t("breif"),
                label: t("breif")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-12 sm:col-6 md:col-2",
                    type: 'image',
                    name: 'testemonialImage',
                    value: "0.701566374267176.png",
                }
            },
        ],
    };
};

const redirectRoute = 'testemonials_list';

export const getTestemonialsFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? TestemonialCreateRequest : TestemonialUpdateRequest, T extends 'create' ? TestemonialCreateResponse : TestemonialUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    context: {
                        title: "testemonial_create",
                        submitHandler: {
                            endpoint: apiClient.testemonialCreate,
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
                    title: "testemonial_update",
                    submitHandler: {
                        endpoint: apiClient.testemonialUpdate,
                        redirectRoute
                    },
                    sections: getSections(t),
                    findHandler: {
                        endpoint: apiClient.testemonialFindForUpdate,
                        requestPropertyName: 'testemonialId'
                    }
                }
            };
            setTimeout(() => r(formProps), 100);
        });
    };
