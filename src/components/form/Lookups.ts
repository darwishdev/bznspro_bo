import type { InputSelectOptions } from "@/types/types"
export const lookups: Record<string, InputSelectOptions[]> = {
    order_types: [
        { label: "dinein", value: 1 },
        { label: "takeaway", value: 2 }
    ],
    payment_types: [
        { label: "cash", value: 1 },
        { label: "visa", value: 2 }
    ],
    account_types: [
        { label: "customer", value: 1 },
        { label: "supplier", value: 2 },
        { label: "employee", value: 3 },
        { label: "safe", value: 4 },
        { label: "expenses", value: 5 }
    ],
    device_types: [
        { label: "printer", value: 1 },
        { label: "pos", value: 2 }
    ],
    device_categories: [
        { label: "shisha", value: 1 },
        { label: "food", value: 2 },
        { label: "bar", value: 3 }
    ],
    transaction_types: [
        { label: "initial_balance", value: 1 },
        { label: "purchase", value: 2 },
        { label: "purchase_refund", value: 3 },
        { label: "waste", value: 4 },
        { label: "transfer", value: 5 },
        { label: "stock_tking", value: 6 }
    ],
    entry_relation_types: [
        { label: "direct_order", value: 1 },
        { label: "transaction", value: 2 }
    ],
    entity_types: [
        { label: "branch", value: 1 },
        { label: "warehouse", value: 2 }
    ]
}
export const getLookUpOptionsByType = (type: keyof typeof lookups, t: Function): InputSelectOptions[] => {
    return lookups[type].map((option: InputSelectOptions) => {
        option.label = t(option.label)
        return option
    })
}


export const getValueOfLookupTpeByLabel = (lookupType: keyof typeof lookups, label: string, t: Function) => {
    console.log(lookups[lookupType][0], 'from inside')
    const item = lookups[lookupType].find(obj => (obj.label === t(label) || obj.label === label));
    return item ? item.value : null;
};

