import type {
    BlogCreateRequest , BlogCreateResponse , BlogUpdateRequest , BlogUpdateResponse
} from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/blog_blog_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';


const getSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {
    return {
        'blog_info': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-12",
                name: "blogName",
                validation: "required",
                placeholder: t("blogName"),
                label: t("blogName")
            },
            {
                $formkit: 'editorCustom',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "breif",
                label: t("breif")
            },
            {
                $formkit: 'editorCustom',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "content",
                label: t("content")
            },
            {
                $formkit: 'picker',
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "dateTime",
                validation: "required",
                label: t("createdAt"),
                placeholder: t("createdAt")
            },
            {
                $formkit: 'number',
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "views",
                number : 'integer',
                prefixIcon: "number",
                validation: "required|min:1",
                label: t("views"),
                placeholder: t("views")
            },
            {
                $formkit: 'dropdownCustom',
                outerClass: "col-12",
                name: "categoryId",
                validation: "required",
                options: 'categoriesInputList',
                requestValue: 2,
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
                    outerClass: "col-12 sm:col-6 md:col-3",
                    type: 'image',
                    name: 'blogImage',
                    value: "0.701566374267176.png",
                    // size: 500
                }
            },
        ],
        'blog_links' : [
            {
                $formkit: 'repeater',
                name: 'links',
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
                                name: "name",
                                placeholder: t("name"),
                                validation : "required",
                                label: t("name")
                            },
                            {
                                $formkit: 'url',
                                prefixIcon: "tools",
                                outerClass: "col-12 sm:col-6 md:col-5",
                                name: "url",
                                placeholder : "https://www.example.com...",
                                validation : "url",
                                label: t("url")
                            },
                        ]
                    }
                ],
              }
        ]
    };
};

const redirectRoute = 'blogs_list';

const map = (req : BlogCreateRequest) => {
    req.dateTime = new Date(req.dateTime).toLocaleString()
    console.log(req);
    return req
}

export const getBlogFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? BlogCreateRequest : BlogUpdateRequest, T extends 'create' ? BlogCreateResponse : BlogCreateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    context: {
                        title: "blog_create",
                        submitHandler: {
                            endpoint: apiClient.blogCreate,
                            redirectRoute,
                            mapFunction : map
                        },
                        sections: getSections(t)
                    }
                };
                setTimeout(() => r(formProps), 100);

                return;
            }

            const formProps = {
                context: {
                    title: "blog_update",
                    submitHandler: {
                        endpoint: apiClient.blogUpdate,
                        redirectRoute,
                        mapFunction : map
                    },
                    sections: getSections(t),
                    findHandler: {
                        endpoint: apiClient.blogFindForUpdate,
                        requestPropertyName: 'blogId'
                    }
                }
            };
            setTimeout(() => r(formProps), 100);
        });
    };
