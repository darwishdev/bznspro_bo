<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import en from '../locales/en.json';
import ar from '../locales/ar.json';
import InputText from 'primevue/inputtext';
import type { Ref } from 'vue';

import { ref, onMounted } from 'vue';
import Button from 'primevue/button';

const products = ref();
const editingRows = ref([]);
const English : Record<string , string> = en
const Arabic : Record<string , string> = ar

const translations : Ref<Array<translationTable>> = ref([]) 
type translationTable = {
    key : string
    englishTr : string
    arabicTr : string
}

onMounted(() => {
    console.log(en);
    let TranslationKeys = Object.keys(en)
    console.log(TranslationKeys);
    TranslationKeys.forEach((Key : string) => {
        translations.value.push({key : Key , englishTr : English[Key] , arabicTr : Arabic[Key]})
    });
    console.log(translations.value);
});
const downloadJSON = (locale : string) => {
    let result : any = {}
    if(locale == 'en'){
        result = translations.value.reduce((acc, { key, englishTr }) => {
        acc[key] = englishTr;
        return acc;
        }, {});
    }
    else{
        result = translations.value.reduce((acc, { key, arabicTr }) => {
        acc[key] = arabicTr;
        return acc;
        }, {});
    }
    console.log(result , 'result');
    const jsonContent = JSON.stringify(result);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    document.body.appendChild(link);
    link.click();
  
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
const onRowEditSave = (event) => {
    let { newData, index } = event;
    console.log(newData , 'newData');
    translations.value[index] = newData

};
</script>
<template>
    <div class="m-auto flex justify-content-center">
        <Button label="Export English" class="py-3 px-5 mx-3 my-3" @click="downloadJSON('en')" />
        <Button label="Export Arabic" class="py-3 px-5 my-3" @click="downloadJSON('ar')" />
    </div>
    <div v-if="translations" class="p-fluid">
    <DataTable v-model:editingRows="editingRows" :value="translations" editMode="row" dataKey="key" @row-edit-save="onRowEditSave"
    :pt="{
        table: { style: 'min-width: 50rem' },
        column: {
            bodycell: ({ state }) => ({
                style:  state['d_editing']&&'padding-top: 0.6rem; padding-bottom: 0.6rem' 
            })
        }
    }"
    >
        <Column field="key" header="key" style="width: 20%">
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" />
            </template>
        </Column>
        <Column field="englishTr" header="English Translation" style="width: 20%">
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" />
            </template>
        </Column>
        <Column field="arabicTr" header="Arabic Translation" style="width: 20%">
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" />
            </template>
        </Column>
        <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
    </DataTable>
    </div>
</template>