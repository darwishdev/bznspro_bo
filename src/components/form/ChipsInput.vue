
 
<script setup lang="ts">
import Chips from 'primevue/chips';
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
const chipsValue : any = ref(props.context.node.value)

const emitUpdate = () => {
    setTimeout(() => {
        props.context.node.input(chipsValue.value)
        console.log(chipsValue.value);
    }, 200);
}

</script>
<template>
    <div class="">
            <Chips id="chips" @update:model-value="emitUpdate"  v-model="chipsValue" />
    </div>
</template> 

<style lang="scss">

</style>