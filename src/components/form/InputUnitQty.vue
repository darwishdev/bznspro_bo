
 
<script setup lang="ts">
import { UnitParseFromWholeQty, UnitParseToWholeQty, type InputUnitQtyProps, type UnitValues, Debounce } from './UnitInput';
import InputNumber from 'primevue/inputnumber';
import { ref } from 'vue';
const props = defineProps<InputUnitQtyProps>();
const { unitRatio } = props.context
const blockListners = ref(false)
const debounceDelay = 5
const values = UnitParseFromWholeQty(props.context.node.value, unitRatio)
const uniyBuyRef = ref<number>(values.unitBuy)
const unitSellRef = ref<number>(values.unitSell)
const debouncedEmmit = Debounce(() => {
    blockListners.value = true
    emitUpdate()
    blockListners.value = false
}, debounceDelay)
const emitUpdate = () => {
    const totalQuantity = UnitParseToWholeQty({ unitBuy: uniyBuyRef.value, unitSell: unitSellRef.value }, unitRatio)
    props.context.node.input(totalQuantity)
}

const handleInput = (_: any) => {
    emitUpdate()
}
</script>
<template>
    <div class="unit-header input">
        <div class="top">
            <div>
                {{ props.context.unitBuy }}
            </div>
            <div>
                {{ props.context.unitSell }}
            </div>
        </div>
        <div class="bottom">
            <InputNumber v-model="uniyBuyRef" @blur="handleInput" :min="0" />
            <InputNumber v-model="unitSellRef" :min="0" @blur="handleInput" :max="unitRatio - 1" />
        </div>
        <div class="ratio w-full">
            <div class="ratio-label"><small>1/{{ unitRatio }}</small></div>
        </div>

    </div>
</template> 

<style lang="scss">
.unit-header.input {
    max-width: 200px;

    & .p-inputtext {
        width: 100%;
        text-align: center;
        padding: .5rem 0 .5rem;
    }

    & .top {
        &>div {
            line-height: 1.4rem;
        }
    }

    & .ratio {
        height: 40px;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -40%);

        & .ratio-label {
            width: 40px;
            height: 40px;
            background: var(--color-background);
            border-radius: 50%;
            text-align: center;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;

            & small {
                font-size: 10px;
                font-weight: 600;
            }
        }

    }

}
</style>