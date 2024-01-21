import type { FormKitNode } from '@formkit/core'
import { reply } from '@formkit/icons';
export const Debounce = (fn: Function, delay: number) => {
    let timer: any;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => { fn.apply(this, args); }, delay);
    };
}
// table options types
export type UnitValues = {
    unitBuy: number
    unitSell: number
}
export type InputUnitQtyProps = {
    context: {
        node: FormKitNode
        class?: string
        unitBuy: string
        unitSell: string
        unitRatio: number
    },
}



export type InputUnitPriceProps = {
    context: {
        node: FormKitNode
        class?: string
        unitBuy: string
        unitSell: string
        unitRatio: number
    },
}



export const UnitPriceParse = (totalPrice: number, cost: number, ratio: number): { unitBuyPrice: number, unitSellPrice: number, totalPrice: number } => {
    const unitSellQuantityWhole = totalPrice / cost
    const unitBuyQuantity = Math.floor(unitSellQuantityWhole / ratio)
    const unitSellQuantity = unitSellQuantityWhole - unitBuyQuantity * ratio
    const unitBuyPrice = unitBuyQuantity * ratio * cost
    const unitSellPrice = unitSellQuantity * cost
    return { unitBuyPrice, unitSellPrice, totalPrice };
};

export const UnitParseToWholeQty = (values: UnitValues, ratio: number): number => {
    return values.unitBuy * ratio + values.unitSell
};

export const UnitParseFromWholeQty = (wholQuantity: unknown, ratio: number): UnitValues => {
    if (!wholQuantity || (typeof wholQuantity != 'string' && typeof wholQuantity != 'number')) return { unitBuy: 0, unitSell: 0 }
    const wholeQuantityConverted = typeof wholQuantity == 'string' ? parseFloat(wholQuantity) : wholQuantity
    const unitBuy = Math.floor(wholeQuantityConverted / ratio)
    const unitSell = wholeQuantityConverted - (unitBuy * ratio)
    return { unitBuy, unitSell }
};



export const UnitSellShift = (values: UnitValues, ratio: number): { unitBuyQuantityIncreaseAmount: number, unitSellQuantity: number } => {
    if (values.unitSell < ratio) {
        return { unitBuyQuantityIncreaseAmount: 0, unitSellQuantity: values.unitSell }
    }
    const unitBuyQuantityIncreaseAmount = Math.floor(values.unitSell / ratio)
    const unitSellQuantity = values.unitSell - unitBuyQuantityIncreaseAmount * ratio
    return { unitBuyQuantityIncreaseAmount, unitSellQuantity };
};