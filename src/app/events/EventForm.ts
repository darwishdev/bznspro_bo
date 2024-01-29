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
                outerClass: "col-12 sm:col-6 md:col-",
                name: "eventName",
                validation: "required",
                placeholder: t("eventName"),
                label: t("eventName")
            },
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-",
                name: "eventLocation",
                placeholder: t("eventLocation"),
                validation: "required",
                label: t("eventLocation")
            },
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-",
                name: "eventLocationUrl",
                placeholder: t("eventLocationUrl"),
                label: t("eventLocationUrl")
            },
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-",
                name: "eventVideo",
                placeholder: t("eventVideo"),
                label: t("eventVideo")
            },
            {
                $formkit: 'editorCustom',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "eventBreif",
                label: t("eventBreif")
            },
            {
                $formkit: 'editorCustom',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "eventDescription",
                label: t("eventDescription")
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
                number : 'integer',
                prefixIcon: "number",
                validation: "required|min:1",
                label: t("eventHours"),
                placeholder: t("eventHours")
            },
            {
                $formkit: 'number',
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "price",
                number : 'float',
                prefixIcon: "dollar",
                validation: "required|min:1",
                label: t("price"),
                placeholder: t("price")
            },
            {
                $formkit: 'number',
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "discount",
                number : 'float',
                prefixIcon: "dollar",
                validation: "required|min:1",
                label: t("discount"),
                placeholder: t("discount")
            },
            {
                $formkit: 'number',
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "shabDiscount",
                number : 'float',
                prefixIcon: "dollar",
                validation: "required|min:1",
                label: t("shabDiscount"),
                placeholder: t("shabDiscount")
            },
            {
                $formkit: 'dropdownCustom',
                outerClass: "col-5",
                name: "categoryId",
                validation: "required",
                options: 'categoriesInputList',
                requestValue: 0,
                cacheName: 'categories',
                placeholder: t("categories"),
                label: t("categories")
            },
            {
                $formkit: 'chips',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-12",
                name: "tags",
                label: t("tags")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-12 sm:col-6 md:col-12",
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
                    outerClass: "col-12 sm:col-6 md:col-12",
                    type: 'image',
                    name: 'constructorImage',
                    value: "0.701566374267176.png",
                }
            },
        ],
        'eventGoals' : [
            {
                $formkit: 'chips',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-12",
                name: "eventGoals",
                label: t("eventGoals")
            },
        ],
        'eventPlan' : [
            {
                $formkit: 'repeater',
                name: 'eventPlan',
                outerClass: "w-full col-12 align-items-center",
                children: [
                    {
                        $el: 'div',
                        attrs: {
                            class: 'p-3 w-full flex grid'
                        },
                        children: [
                            {
                                $formkit: 'text',
                                prefixIcon: "tools",
                                outerClass: "col-12 sm:col-6 md:col-5",
                                name: "title",
                                placeholder: t("title"),
                                validation : "",
                                label: t("title")
                            },
                            {
                                $formkit: 'text',
                                prefixIcon: "tools",
                                outerClass: "col-12 sm:col-6 md:col-5",
                                name: "breif",
                                placeholder: t("breif"),
                                validation : "",
                                label: t("breif")
                            },
                        ]
                    }
                ],
              }
        ]
    };
};

const redirectRoute = 'events_list';

const mapFn = (req : EventCreateRequest) => {
    if(req.eventDate){
        req.eventDate = new Date(req.eventDate).toLocaleString()
    }
    console.log(req);
    return req as EventCreateRequest
}

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
                            redirectRoute,
                            mapFunction : mapFn
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
                        redirectRoute,
                        mapFunction : mapFn
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
