<script setup lang="ts">
import Button from 'primevue/button';
import { useAuthStore } from 'v-dashkit/stores';
import type { AppFormProps } from 'v-dashkit/types';
import { ref } from 'vue';
import AppForm from 'v-dashkit/form/AppForm';
import supabase from '@/api/Supabase';
import { useI18n } from 'vue-i18n';
import type { UserResponse } from '@supabase/gotrue-js/dist/module/lib/types';
import apiClient from '@/api/ApiClient';
const authStore = useAuthStore()
await authStore.init()
const { t } = useI18n()

// const user = authStore.user
const user = JSON.parse(localStorage.getItem('user') as string)
const appFormElementRef = ref()
let userCreatedAt = new Date(user?.createdAt as string).toDateString()
console.log(user);

const updateUserPw = (req: { password: string, password_confirm: string }): Promise<any> => {
    return new Promise((resolve, reject) => {
        supabase.auth.updateUser({ password: req.password }).then((result: UserResponse) => {
            if (!result.error) {
                apiClient.userResetPassword({ userEmail: result.data.user.email, userPassword: req.password })
                    .then((apiClientResponse: any) => {
                        resolve(apiClientResponse)

                    }).catch((apiClientError) => {
                        reject(apiClientError)
                    });
            }
            else {
                reject(new Error('reset_pw_invalid'))
            }
        }).catch((err) => {
            reject(err)
        });
    })
}


const formProps: AppFormProps<any, any> = {
    title: 'Security',
    options: {
        isBulkCreateHidden: true,
        isFormTransparent: false,
        isSuccessNotificationHidden: false,
        successMessageSummary: 'password_reset_successfull',
        successMessageDetail: 'password_reset_successfull_details',
        isHeaderSubmitHidden: true
    },
    submitHandler: {
        endpoint: updateUserPw,
    },
    sections: {
        'Reset Password': {
            isTransparent: false,
            inputs: [
                {
                    $formkit: 'password',
                    prefixIcon: "password",
                    outerClass: "col-12 md:col-6",
                    validation: "required",
                    name: "password",
                    placeholder: t("enter your new password"),
                    label: t("password")
                },
                {
                    $formkit: 'password',
                    prefixIcon: "password",
                    outerClass: "col-12 md:col-6",
                    validation: "required|password|confirm",
                    name: "password_confirm",
                    placeholder: t("please re-enter your new password"),
                    label: t("confirm password")
                },
            ]
        }
    }
}

</script>

<template>
    <div class="my-3">
        <div class="w-full p-5 relative overflow-hidden border-round"
            style="background-image: linear-gradient(180deg, #c94b6287 0%, #ec4dbc84 100%); height: 30vh; border-bottom-left-radius: 0px !important; border-bottom-right-radius: 0px !important;">
            <!-- <img src="../assets/MelonLogo.svg" alt="" class="opacity-50 absolute logoPosition"> -->
        </div>
        <div class="w-full border-round-bottom p-5 relative userImage" style="background-color: var(--color-dialog);">
            <app-image :src="user!.userImage" preview alt="profile pic" class="absolute" style="top: -130px; left: 40px;" />
            <div class="ml-4 pt-5 mt-4 px-2">
                <h1 class="font-bold text-4xl">{{ user!.userName }}</h1>
                <h3 class="py-2">{{ user!.userEmail }}</h3>
                <ul class="flex flex-row p-0 m-0" style="list-style: disc; color: #898989;">
                    <li class="list-none mr-3">
                        <h3 class="text-white">{{ user!.userPhone }}</h3>
                    </li>
                    <li class="mx-2">
                        <h3 class="text-white">Joined at {{ userCreatedAt }}
                        </h3>
                    </li>
                </ul>
                <div class="py-4 flex buttons">
                    <router-link class="edit" :to="{ name: 'user_update', params: { id: user!.userId } }">
                        <Button label="Edit Personal Data" raised />
                    </router-link>
                    <!-- <Button label="Reset Password" raised class="mx-3" severity="Primary"
                        @click="resetPwDialog(responseData.user.userId)" /> -->
                </div>
            </div>
        </div>
    </div>

    <!-- User Owned Roles -->
    <div class="my-5 bg-card p-4 border-round">
        <h1 class="my-2">Owned Roles</h1>
        <div class="w-7 flex flex-wrap" v-if="user!.roles.length > 0">
            <h3 v-for="(role, index) in user!.roles" class="p-2 px-3 border-round my-1 mx-1" :key="index"
                style="color: #256029; background-color: #c8e6c9d3;">{{ role.roleName }}</h3>
        </div>
        <div v-else>
            <h1 class="text-primary text-center p-5 m-auto">There are no owned roles yet!</h1>
        </div>
    </div>


    <!-- <app-form ref="appFormElementRef" :options="formProps.options" :title="formProps.title"
    :sections="formProps.sections" :submitHandler="formProps.submitHandler" /> -->
    <app-form :context="formProps" />
</template>
<style>
.logoPosition {
    right: -20px;
    bottom: -15px;
    width: 13%;
    background: none;
}

@media screen and (max-width : 500px) {
    .logoPosition {
        right: -7px;
        bottom: -14px;
        width: 38%;
    }
}
</style>