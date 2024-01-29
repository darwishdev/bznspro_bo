import type {
    ProgramCreateRequest , ProgramCreateResponse , ProgramUpdateRequest , ProgramUpdateResponse
} from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/public_programs_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';


const getSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {
    return {
        '': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-7",
                name: "programName",
                validation: "required",
                placeholder: t("programName"),
                label: t("programName")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-12 sm:col-6 md:col-2",
                    type: 'image',
                    name: 'programImage',
                    value: "0.701566374267176.png",
                    // size: 500
                }
            },
            {
                $formkit: 'editorCustom',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-7",
                name: "breif",
                placeholder: t("breif"),
                validation: "required",
                label: t("breif")
            },
        ],
    };
};

const redirectRoute = 'programs_list';

export const getProgramsFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? ProgramCreateRequest : ProgramUpdateRequest, T extends 'create' ? ProgramCreateResponse : ProgramUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    context: {
                        title: "program_create",
                        submitHandler: {
                            endpoint: apiClient.programCreate,
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
                    title: "program_update",
                    submitHandler: {
                        endpoint: apiClient.programUpdate,
                        redirectRoute
                    },
                    sections: getSections(t),
                    findHandler: {
                        endpoint: apiClient.programFindForUpdate,
                        requestPropertyName: 'programId'
                    }
                }
            };
            setTimeout(() => r(formProps), 100);
        });
    };
