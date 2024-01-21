import type { ITableHeader } from "v-dashkit/types"
import { ObjectKeys } from "v-dashkit/utils/object"
import { TableHeaderText } from "v-dashkit/utils/table"
import { resolveComponent, h } from 'vue'
import { UnitPriceParse, FormateCurrency } from 'v-dashkit/utils/currency';
import { UnitParseFromWholeQty } from '@/components/form/UnitInput'
export class TableHeaderUnitInput2 extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {
        const formkitComp = resolveComponent('FormKit')
        return h(formkitComp, {
            type: "unitQty2",
            innerClass: "justify-content-center",
            unitBuy: value['unitBuy'],
            unitSell: value['unitSell'],
            unitRatio: value['unitRatio'],
            key: value['itemCode'],
            value: value['quantity'],
            onInput: (v: any) => {

                console.log('transaction')
                console.log(value['transactionPrice'])
                value.valuation = v * value['transactionPrice']
                value.quantity = v
            }
        })
    }
}

export class TableHeaderUnitPrice extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {
        const formkitComp = resolveComponent('FormKit')
        return h(formkitComp, {
            type: "unitPrice",
            innerClass: "justify-content-center",
            unitBuy: value['unitBuy'],
            unitSell: value['unitSell'],
            unitRatio: value['unitRatio'],
            value: value['transactionPrice'],
            onInput: (v: any) => {
                console.log("holan", ObjectKeys(value), v)
                value['transactionPrice'] = v
                value.valuation = v * value['quantity']
            }
        })
    }
}



export class TableHeaderUnitPriceTotal extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {
        const unitPrice = resolveComponent('UnitHeader')
        const { unitBuyPrice, unitSellPrice, totalPrice } = UnitPriceParse(value['valuation'], value['transactionPrice'], value['unitRatio'])
        return h(unitPrice, {

            headers: [
                {
                    label: value['unitBuy'],
                    value: unitBuyPrice,
                    is_currency: true


                },
                {
                    label: value['unitSell'],
                    value: unitSellPrice,
                    is_currency: true

                },
                {
                    label: 'total',
                    value: totalPrice,
                    background: 'var(--color-background)',
                    is_currency: true

                }
            ]
        })
    }
}


export class TableHeaderExpectedQty extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {
        const unitPrice = resolveComponent('UnitHeader')
        const values = UnitParseFromWholeQty(value['expectedQuantity'], value['unitRatio'])
        return h(unitPrice, {

            headers: [
                {
                    label: value['unitBuy'],
                    value: values.unitBuy
                },
                {
                    label: value['unitSell'],
                    value: values.unitSell
                }
            ]
        })
    }
}



export class TableHeaderDiffrenceQty extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {
        const unitPrice = resolveComponent('UnitHeader')
        const values = UnitParseFromWholeQty((value['quantity'] - value['expectedQuantity']), value['unitRatio'])

        let className = value['quantity'] > 0 ? 'border ' : ''
        const shortage = value['quantity'] < value['expectedQuantity']
        const over = value['quantity'] > value['expectedQuantity']

        className += shortage ? 'danger-border' : over ? 'success-border' : ''
        console.log(className, 'className', 'shorage', shortage, 'ove', over, 'qnt', value['quantity'])
        return h(unitPrice, {
            class: className,
            headers: [
                {
                    label: value['unitBuy'],
                    value: values.unitBuy
                },
                {
                    label: value['unitSell'],
                    value: values.unitSell
                }
            ]
        })
    }
}


export class TableHeaderDiffrencePrice extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {
        const diffrence = value['quantity'] - value['expectedQuantity']

        const shortage = diffrence < 0
        const over = diffrence > 0
        const className = value['quantity'] > 0
            ?
            shortage ? 'text-danger' : over ? 'text-success' : ''
            : ''

        const diffrenceAmount = diffrence * value['transactionPrice']

        return h('div', {
            class: className,
        }, FormateCurrency(diffrenceAmount))
    }
}

