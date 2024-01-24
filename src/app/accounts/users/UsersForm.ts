import type {
    UserCreateRequest, UserCreateResponse, UserUpdateRequest, UserUpdateResponse , UsersListRow
} from '@buf/ahmeddarwish_mln-rms-core.bufbuild_es/rms/v1/users_user_definitions_pb'
import type { AppFormProps, AppFormSection } from 'v-dashkit/types';
import type { FormKitSchemaNode } from '@formkit/core';
import apiClient from '@/api/ApiClient';
import supabase from '@/api/Supabase';
import type { AuthResponse } from '@supabase/gotrue-js/dist/module/lib/types';

let roles : any = []
const roleOptions = async() => {
    const {options} = await apiClient.rolesInputList({}); 
    console.log(options);
    roles = options   
    return options
}

const getCreateSections = (t: Function , roles : any): Record<string, AppFormSection | FormKitSchemaNode[]> => {

    return {
        'user_info': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "userName",
                validation: "required",
                placeholder: t("userNamePlaceholder"),
                label: t("userNameLabel")
            },
            {
                $formkit: 'email',
                prefixIcon: "email",
                validation: "required",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "userEmail",
                placeholder: t("userEmailPlaceholder"),
                label: t("userEmailLabel")
            },
            {
                $formkit: 'text',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "userPhone",
                placeholder: t("userPhonePlaceholder"),
                label: t("userPhoneLabel")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-12 sm:col-6 md:col-2",
                    type: 'image',
                    name: 'userImage',
                    value: "0.701566374267176.png",
                    // size: 500
                }
            },
        ],
        'Passwords': [
            {
                $el: 'div',
                // if : '$get(invitation).value != true',
                attrs: {
                    class: 'w-full'
                },
                children: [
                    // {
                    //     $el: 'h1',
                    //     attrs: {
                    //         class: 'mx-2 my-3 title'
                    //     },
                    //     children: "Passwords"
                    // },
                    {
                        $el : 'div',
                        attrs: {
                            class: 'w-12 my-2 m-auto p-3 grid bg-card border-round'
                        },
                        children : [
                            {
                                $formkit: 'password',
                                outerClass: "col-6",
                                name: 'userPassword',
                                label: t("Passwords"),
                                placeholder: t("passwordPlaceholder"),
                                validation: 'required|length:8',
                            },
                            {
                                $formkit: 'password',
                                outerClass: "col-6",
                                name: 'userPassword_confirm',
                                label: t("ConfirmPasswords"),
                                placeholder: t("ConfirmPasswordsPlaceholder"),
                                validation: 'required|confirm',
                                // "validation-label": "Password confirmation"
                            },
                        ]
                    },
                ]
            },
        ],
        'User Roles': [
            {
                $formkit: 'taglist',
                outerClass: "col-12",
                closeOnSelect: false,
                name: 'roles',
                label: t("Roles"),
                multiple : true,
                placeholder: t("RolesPlaceholder"),
                "empty-message": "No roles found",
                options: roles,                
            },
        ],
        'security': {
            isTitleHidden: false,
            isTransparent: false,
            inputs: [
                {
                    $cmp: 'FormKit',
                    props: {
                        outerClass: "w-full",
                        type: 'permissions',
                        name: 'permissions',
                        toggleable: false
                    }
                },
            ]   
        }
    }

}
const getUpdateSections = (t: Function): Record<string, AppFormSection | FormKitSchemaNode[]> => {
    return {
        'user_info': [
            {
                $formkit: 'text',
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "userName",
                validation: "required",
                placeholder: t("userNamePlaceholder"),
                label: t("userNameLabel")
            },
            {
                $formkit: 'email',
                prefixIcon: "email",
                validation: "required",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "userEmail",
                placeholder: t("userEmailPlaceholder"),
                label: t("userEmailLabel")
            },
            {
                $formkit: 'text',
                prefixIcon: "number",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "userPhone",
                placeholder: t("userPhonePlaceholder"),
                label: t("userPhoneLabel")
            },
            {
                $cmp: 'FormKit',
                props: {
                    outerClass: "col-12 sm:col-6 md:col-2",
                    type: 'image',
                    name: 'userImage',
                    value: "0.701566374267176.png",
                    // size: 500
                }
            }
        ],
        'User Roles': [
            {
                $formkit: 'taglist',
                outerClass: "col-12",
                closeOnSelect: false,
                name: 'roles',
                label: 'roles',
                placeholder: 'Select User Roles',
                "empty-message": "No roles found",
                options: roleOptions,
            },
        ],
        'security': {
            isTitleHidden: false,
            isTransparent: false,
            inputs: [
                {
                    $cmp: 'FormKit',
                    props: {
                        outerClass: "w-full",
                        type: 'permissions',
                        name: 'permissions',
                        toggleable: false
                    }
                },
            ]
        }
    }

}

const userCreate = (req : UserCreateRequest): Promise<UserCreateResponse> => {
    return new Promise((resolve, reject) => {
        supabase.auth.signUp({email : req.userEmail , password : req.userPassword ,
             phone : req.userPhone}).then((result : AuthResponse) => {
            if (!result.error) {
            req.authUserId = result.data.user!.id
            apiClient.userCreate(req).then((apiClientResponse : UserCreateResponse) => {
                resolve(apiClientResponse)
            }).catch((apiClientError) => {
                console.log(apiClientError.message);
                
                reject(new Error(apiClientError))
            });
            }
            else{
                reject(new Error(result.error.message))
            }
        }).catch((err) => {
            reject(err)
        });
    })
}

// const userUpdate = (req : UserUpdateRequest): Promise<UserUpdateResponse> => {
//     return new Promise((resolve, reject) => {
//             apiClient.userUpdate(req)
//             .then((apiClientResponse : UserUpdateResponse) => {
//                 resolve(apiClientResponse)
//             }).catch((apiClientError) => {
//                 reject(apiClientError)
//             });
//     })
        
// }

const redirectRoute = 'users_list'

export const getUserFormProps = async <T extends 'create' | 'update'>(
    t: Function,
    formType: T
  ): Promise<
    AppFormProps<
      T extends 'create' ? UserCreateRequest : UserUpdateRequest,
      T extends 'create' ? UserCreateResponse : UserUpdateResponse
    >
  > => {
      
    console.log('from getUserFormProps');
    const RolesOptions = await roleOptions()
    console.log(RolesOptions);
    if (formType == 'create') {
      const formProps = {
        context : {
            title: 'user_create',
            submitHandler: {
              endpoint: userCreate,
              redirectRoute,
            },
            sections: getCreateSections(t , roles), // Await the getCreateSections function
        }
      };
      return formProps;
    }
  
    const formProps = {
        context : {
            title: 'user_update',
            submitHandler: {
                endpoint: apiClient.userUpdate,
                redirectRoute,
            },
            sections: getUpdateSections(t),
            findHandler: {
                endpoint: apiClient.userFindForUpdate,
                requestPropertyName: 'userId',
            },
      }
    };
  
    return formProps;
  };


