
import { genesisIcons } from "@formkit/icons"
import InputDropDownCustom from "@/components/form/InputDropDownCustom.vue"
import EditorInput from "@/components/form/EditorInput.vue"
import InputUnitQty from "@/components/form/InputUnitQty.vue"
import InputUnitPrice from "@/components/form/InputUnitPrice.vue"

import { createInput } from '@formkit/vue'


import type { DefaultConfigOptions } from '@formkit/vue'
import { createProPlugin, inputs } from '@formkit/pro'
import "@formkit/themes/genesis"
import "@formkit/pro/genesis"

const pro = createProPlugin(import.meta.env.VITE_FORMKIT_TOKEN, inputs)

const dropdownCustomInput = createInput(InputDropDownCustom, {
    props: ['dropdownProps', 'options', 'placeholder', 'convertToFlat', 'requestValue', 'translateLabel', 'cacheName', 'cachePeriod'],
})
const richtextInput = createInput(EditorInput, {
    props: ['name', 'label'],
})
const unitQtyInput = createInput(InputUnitQty, {
    props: ['unitBuy', 'unitSell', 'unitRatio'],
})


const unitPriceInput = createInput(InputUnitPrice, {
    props: ['unitBuy', 'unitSell', 'unitRatio'],
})

const config: DefaultConfigOptions = {
    plugins: [pro as any],
    icons: { ...genesisIcons },
    inputs: {
        'dropdownCustom': dropdownCustomInput,
        'unitPrice': unitPriceInput,
        'unitQty2': unitQtyInput,
        'richtext': richtextInput
    },
    locale: 'en',
    theme: 'genesis'

}

export default config
