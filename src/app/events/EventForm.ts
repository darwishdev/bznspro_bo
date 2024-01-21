import type {
    EventCreateRequest, EventCreateResponse, EventUpdateRequest, EventUpdateResponse
} from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/events_event_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';





const getSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {
    return {
        'event_info': [
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
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "eventDescription",
                placeholder: t("eventDescription"),
                label: t("eventDescription")
            }

        ],
        'security': {
            isTitleHidden: true,
            isTransparent: true,
            inputs: [
                {
                    $cmp: 'FormKit',
                    props: {
                        outerClass: "w-full",
                        type: 'permissions',
                        name: 'permissions',

                        toggleable: false

                    }
                }
            ]
        }
    }

}

const redirectRoute = 'events_list'

export const getEventFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? EventCreateRequest : EventUpdateRequest, T extends 'create' ? EventCreateResponse : EventUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    title: "event_create",
                    submitHandler: {
                        endpoint: apiClient.eventCreate,
                        redirectRoute
                    },
                    sections: getSections(t)
                }
                setTimeout(() => r(formProps), 100)

                return
            }

            const formProps = {
                title: "event_update",
                submitHandler: {
                    endpoint: apiClient.eventUpdate,
                    redirectRoute
                },
                sections: getSections(t),
                findHandler: {
                    endpoint: apiClient.eventFindForUpdate,
                    requestPropertyName: 'eventId'
                }
            }

            setTimeout(() => r(formProps), 100)
        })



    }


