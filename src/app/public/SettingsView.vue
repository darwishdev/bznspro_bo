<script setup lang="ts">
import AppForm from 'v-dashkit/form/AppForm';
import type { SettingsUpdateRequest, SettingsUpdateResponse } from '@buf/ahmeddarwish_bzns-pro-api.bufbuild_es/bznspro/v1/public_setting_definitions_pb'
import type { AppFormProps, } from 'v-dashkit/types';
import apiClient from '@/api/ApiClient';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n()
const { settings } = await apiClient.settingsFindForUpdate({})
const FormProps = ref()

const mapFunction = (req: any) => {
  console.log(req);
  let settingsArray: any = Object.entries(req).map(([settingKey, settingValue]) => {
    return {
      settingKey: settingKey,
      settingValue: settingValue
    };
  });
  settingsArray = {
    settings: settingsArray
  }
  return settingsArray
}

const getSections = async () => {
  return new Promise<AppFormProps<SettingsUpdateRequest, SettingsUpdateResponse>>((resolve, reject) => {
    const settingsObject: any = {};
    const sections = [];

    for (const setting of settings) {

      console.log('settiibg', setting.settingType)
      settingsObject[setting.settingKey] = setting.settingValue;
      sections.push({
        $formkit: setting.settingType,
        // prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-6",
        label: t(setting.settingKey + 'Label'),
        name: setting.settingKey,
        value: setting.settingValue,
        placeholder: t(setting.settingKey + 'Placeholder')
      });
    }
    const props: AppFormProps<SettingsUpdateRequest, SettingsUpdateResponse> = {
      context: {
        title: "Settings",
        submitHandler: {
          endpoint: apiClient.settingsUpdate,
          mapFunction: mapFunction,
          redirectRoute: "home_view"
        },
        sections: {
          'settings_update': sections
        }
      }
    };
    FormProps.value = props.context
    console.log(FormProps.value);
    resolve(props);
  });
};

await getSections()
</script>

<template>
  <div>
    <app-form :context="FormProps" />
  </div>
</template>