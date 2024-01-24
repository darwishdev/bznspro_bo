import type {
    TeamMemberCreateRequest , TeamMemberCreateResponse , TeamMemberUpdateRequest , TeamMemberUpdateResponse
} from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/public_team_members_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';


const getSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {
    return {
        '': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "teamMemberName",
                validation: "required",
                placeholder: t("teamMemberName"),
                label: t("teamMemberName")
            },
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-6",
                name: "jobTitle",
                validation: "required",
                placeholder: t("jobTitle"),
                label: t("jobTitle")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-12 sm:col-6 md:col-2",
                    type: 'image',
                    name: 'teamMemberImage',
                    value: "0.701566374267176.png",
                }
            },
        ],
    };
};

const redirectRoute = 'team_members_list';

export const getTeamMembersFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? TeamMemberCreateRequest : TeamMemberUpdateRequest, T extends 'create' ? TeamMemberCreateResponse : TeamMemberUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    context: {
                        title: "team_member_create",
                        submitHandler: {
                            endpoint: apiClient.teamMemberCreate,
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
                    title: "team_member_update",
                    submitHandler: {
                        endpoint: apiClient.teamMemberUpdate,
                        redirectRoute
                    },
                    sections: getSections(t),
                    findHandler: {
                        endpoint: apiClient.teamMemberFindForUpdate,
                        requestPropertyName: 'teamMemberId'
                    }
                }
            };
            setTimeout(() => r(formProps), 100);
        });
    };
