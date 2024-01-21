import type {
    RoleCreateRequest, RoleCreateResponse, RoleUpdateRequest, RoleUpdateResponse
} from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_role_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';





const getSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {
    return {
        'role_info': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "roleName",
                validation: "required",
                placeholder: t("roleName"),
                label: t("roleName")
            },
            {
                $formkit: 'textarea',
                prefixIcon: "text",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "roleDescription",
                placeholder: t("roleDescription"),
                label: t("roleDescription")
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

const redirectRoute = 'roles_list'

export const getRoleFormProps =
    async <T extends 'create' | 'update'>(
        t: Function,
        formType: T
    ): Promise<AppFormProps<T extends 'create' ? RoleCreateRequest : RoleUpdateRequest, T extends 'create' ? RoleCreateResponse : RoleUpdateResponse>> => {

        return new Promise(r => {
            if (formType == 'create') {
                const formProps = {
                    title: "role_create",
                    submitHandler: {
                        endpoint: apiClient.roleCreate,
                        redirectRoute
                    },
                    sections: getSections(t)
                }
                setTimeout(() => r(formProps), 100)

                return
            }

            const formProps = {
                title: "role_update",
                submitHandler: {
                    endpoint: apiClient.roleUpdate,
                    redirectRoute
                },
                sections: getSections(t),
                findHandler: {
                    endpoint: apiClient.roleFindForUpdate,
                    requestPropertyName: 'roleId'
                }
            }

            setTimeout(() => r(formProps), 100)
        })



    }


