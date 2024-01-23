import type { AppFormSection, ITableHeader } from 'v-dashkit/types';
import type { FormKitNode } from '@formkit/core'

export type ListViewWithTypesProps = {
    typedId: number
    createForm?: Record<string, AppFormSection>,
    viewRouterName: string
    prependHeaders?: Record<string, ITableHeader>,
    appendHeaders?: Record<string, ITableHeader>,
}

export type TransactionUpdateBaseProps = {
    title?: string,
    rowClass?: (data: any) => Record<string, boolean>[],
    listRouterName: string
    prependHeaders?: Record<string, ITableHeader>,
    appendHeaders?: Record<string, ITableHeader>,
}

export type InputSelectOptionsArray = {
    label: string,
    value: number,
}[]



export type InputSelectOptionsObject<T extends string> = Record<(string | number), T>;
export type InputSelectOptions<T extends string> = InputSelectOptionsArray | InputSelectOptionsObject<T>
export type ValuesOfObject<T> = (T)[keyof T];
export type InputDropdownWithTypeProps = {
    context: {
        node: FormKitNode
        typeName: string
        inputName: string
        label?: string
        placeholder?: string
    },
}

export type CacheObject = { data: any, expiry: string }
export type InputDropdownCustomProps = {
    context: {
        node: FormKitNode
        options: InputSelectOptionsObject<any> | InputSelectOptionsArray | string | Promise<InputSelectOptionsArray>
        label?: string
        value?: any
        requestValue?: any
        cacheName?: string,
        cachePeriodInHours?: number,
        convertToFlat?: boolean
        translateLabel?: boolean,
        dropdownProps?: {
            filter?: boolean,
            showClear?: boolean,
            filterPlaceholder?: string,
            filterMatchMode?: string,
            optionLabel?: string,
            optionValue?: string,
            placeholder?: string
        }
        placeholder?: string
    },
}

