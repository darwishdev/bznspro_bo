import type {
    ServiceCreateRequest , ServiceCreateResponse , ServiceUpdateRequest , ServiceUpdateResponse
} from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/public_services_definitions_pb'
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
                name: "serviceName",
                validation: "required",
                placeholder: t("serviceName"),
                label: t("serviceName")
            },
            {
                $formkit: 'textarea',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "breif",
                placeholder: t("breif"),
                validation: "required",
                label: t("breif")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-12 sm:col-6 md:col-2",
                    type: 'image',
                    name: 'serviceImage',
                    value: "0.701566374267176.png",
                    // size: 500
                }
            },
        ],
    };
};

const redirectRoute = 'services_list';

export const getServicesFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? ServiceCreateRequest : ServiceUpdateRequest, T extends 'create' ? ServiceCreateResponse : ServiceUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    context: {
                        title: "service_create",
                        submitHandler: {
                            endpoint: apiClient.serviceCreate,
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
                    title: "service_update",
                    submitHandler: {
                        endpoint: apiClient.serviceUpdate,
                        redirectRoute
                    },
                    sections: getSections(t),
                    findHandler: {
                        endpoint: apiClient.serviceFindForUpdate,
                        requestPropertyName: 'serviceId'
                    }
                }
            };
            setTimeout(() => r(formProps), 100);
        });
    };
