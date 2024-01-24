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
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "eventLocation",
                placeholder: t("eventLocation"),
                validation: "required",
                label: t("eventLocation")
            },
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "eventLocationUrl",
                placeholder: t("eventLocationUrl"),
                label: t("eventLocationUrl")
            },
            {
                $formkit: 'textarea',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "eventPlan",
                placeholder: t("eventPlan"),
                validation: "required",
                label: t("eventPlan")
            },
            {
                $formkit: 'textarea',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "eventGoals",
                placeholder: t("eventGoals"),
                validation: "required",
                label: t("eventGoals")
            },
            {
                $formkit: 'textarea',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "eventBrief",
                placeholder: t("eventBrief"),
                validation: "required",
                label: t("eventBrief")
            },
            {
                $formkit: 'textarea',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "eventDescription",
                placeholder: t("eventDescription"),
                validation: "required",
                label: t("eventDescription")
            },
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "eventVideo",
                placeholder: t("eventVideo"),
                label: t("eventVideo")
            },
            {
                $formkit: 'picker',
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "eventDate",
                validation: "required",
                label: t("eventDate"),
                placeholder: t("eventDate")
            },
            {
                $formkit: 'time',
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "eventStartTime",
                value : '23:00',
                label: t("eventStartTime"),
                placeholder: t("eventStartTime")
            },
            {
                $formkit: 'time',
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "eventEndTime",
                value : '23:00',
                label: t("eventEndTime"),
                placeholder: t("eventEndTime")
            },
            {
                $formkit: 'number',
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "eventHours",
                validation: "required|min:1",
                label: t("eventHours"),
                placeholder: t("eventHours")
            },
            {
                $formkit: 'dropdownCustom',
                outerClass: "col-6",
                name: "categoryId",
                validation: "required",
                options: 'categoriesInputList',
                requestValue: 0,
                cacheName: 'categories',
                placeholder: t("categories"),
                label: t("categories")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-12 sm:col-6 md:col-2",
                    type: 'image',
                    name: 'eventImage',
                    value: "0.701566374267176.png",
                    // size: 500
                }
            },
        ],
        'constructor_info' : [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "constructorName",
                placeholder: t("constructorName"),
                label: t("constructorName")
            },
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "constructorTitle",
                placeholder: t("constructorTitle"),
                label: t("constructorTitle")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-12 sm:col-6 md:col-2",
                    type: 'image',
                    name: 'constructorImage',
                    value: "0.701566374267176.png",
                    // size: 500
                }
            },
        ]
    };
};

const redirectRoute = 'events_list';

export const getEventFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? EventCreateRequest : EventUpdateRequest, T extends 'create' ? EventCreateResponse : EventUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    context: {
                        title: "event_create",
                        submitHandler: {
                            endpoint: apiClient.eventCreate,
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
            };
            setTimeout(() => r(formProps), 100);
        });
    };
