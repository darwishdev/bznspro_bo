
 
<script setup lang="ts">
import { type InputUnitPriceProps, Debounce } from './UnitInput';
import InputNumber from 'primevue/inputnumber';
import { FormateCurrency } from 'v-dashkit/utils/currency'
import { ref } from 'vue';
const props = defineProps<InputUnitPriceProps>();
const { unitRatio } = props.context
const blockListners = ref(false)
const debounceDelay = 5
const showEditRef = ref(false)
const priceValueRef = ref<any>(props.context.node.value)
const debouncedEmmit = Debounce(() => {
    blockListners.value = true
    emitUpdate()
    blockListners.value = false
}, debounceDelay)
const emitUpdate = () => {
    props.context.node.input(priceValueRef.value)
}

const handleInput = (_: any) => {
    debouncedEmmit()
    showEditRef.value = false
}
</script>
<template>
    <div class="unit-qty pb-1">
        <div class="top">
            <div class="start">
                {{ props.context.unitBuy }}
            </div>
            <div class="end">
                {{ props.context.unitSell }}
            </div>
        </div>
        <div class="bottom" v-if="!showEditRef">
            <div class="price">
                {{ FormateCurrency(priceValueRef * unitRatio, 'ج.م') }}
            </div>
            <div class="price">
                {{ FormateCurrency(priceValueRef, 'ج.م') }}
            </div>
        </div>
        <div class="bottom" v-else>
            <InputNumber v-model="priceValueRef" @keypress.enter="handleInput"
                :placeholder="$t('new_price_form_small_unit')" :min="0" />

        </div>
        <div class="ratio w-full">
            <app-btn icon="pencil" @click="showEditRef = !showEditRef" class="w-full edit-btn" />
        </div>

    </div>
</template> 

<style lang="scss">
.unit-qty {
    position: relative;

    position: relative;

    & .ratio {
        position: absolute;
        top: 0;
        left: 0;

        & .app-btn {
            background: var(--color-background);
            border-radius: 50%;

        }

        width: 50px !important;
        height: 50px;
        transform: translate(-40%, -30%);
    }

    & .bottom {


        & .price {
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;


        }
    }
}
</style>