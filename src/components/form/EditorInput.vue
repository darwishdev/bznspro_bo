
 
<script setup lang="ts">
import Editor from 'primevue/editor';
import { ref } from 'vue';
import type { FormKitNode } from '@formkit/core';
type EditorInputProps = {
    context: {
        node: FormKitNode;
        name: string;
        label: string;
    };
};

const props = defineProps<EditorInputProps>();
const editorValue : any = ref(props.context.node.value)

const emitUpdate = () => {
    props.context.node.input(editorValue.value)
}

</script>
<template>
    <div class="">
        <Editor editorStyle="height: 250px" v-model="editorValue" @update:model-value="emitUpdate"></Editor>
    </div>
</template> 

<style lang="scss">

</style>