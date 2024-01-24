
import type { InputSelectOptionsObject, ValuesOfObject } from "@/types/types";
import { ObjectKeys } from "v-dashkit/utils/object";
// convertion example 

export const order_types: InputSelectOptionsObject<'dinein' | 'takeaway'> = {
    1: "dinein",
    2: "takeaway",
}
export const item_types: InputSelectOptionsObject<'product' | 'ingredient'> = {
    1: "product",
    2: "ingredient",
}


export const payment_types: InputSelectOptionsObject<'cash' | 'visa'> = {
    1: "cash",
    2: "visa",
}

export const request_statuses: InputSelectOptionsObject<'pending' | 'confirmed' | 'refunded' | 'canceled'> = {
    1: "pending",
    2: "confirmed",
    3: "refunded",
    4: "canceled",
}

export const account_types: InputSelectOptionsObject<'customer' | 'supplier' | 'employee' | 'safe' | 'expenses'> = {
    1: "customer",
    2: "supplier",
    3: "employee",
    4: "safe",
    5: "expenses",
};

export const device_types: InputSelectOptionsObject<'printer' | 'pos'> = {
    1: "printer",
    2: "pos",
};

export const device_categories: InputSelectOptionsObject<'shisha' | 'food' | 'bar'> = {
    1: "shisha",
    2: "food",
    3: "bar",
};

export const transaction_types: InputSelectOptionsObject<'initial_balance' | 'purchase' | 'purchase_refund' | 'waste' | 'transfer' | 'stock_taking'> = {
    1: "initial_balance",
    2: "purchase",
    3: "purchase_refund",
    4: "waste",
    5: "transfer",
    6: "stock_taking",
};

export const transaction_types_arr = [
    { label: "initial_balance", value: 1 },
    { label: "purchase", value: 2 },
    { label: "purchase_refund", value: 3 },
    { label: "waste", value: 4 },
    { label: "transfer", value: 5 },
    { label: "stock_taking", value: 6 }
]


export const entry_relation_types: InputSelectOptionsObject<'direct_order' | 'transaction'> = {
    1: "direct_order",
    2: "transaction",
};

export const entity_types: InputSelectOptionsObject<'branch' | 'warehouse'> = {
    1: "branch",
    2: "warehouse",
};

export const statuses: InputSelectOptionsObject<'open' | 'closed' | 'committed' | 'canceled' | 'refunded'> = {
    1: "open",
    2: "closed",
    3: "committed",
    4: "canceled",
    5: "refunded",
};




export const translateLookupValuesAndSwitchKeys = <T extends string>(lookup: InputSelectOptionsObject<T>, t: Function): InputSelectOptionsObject<T> => {
    const keys = ObjectKeys(lookup)
    const translatedObject: InputSelectOptionsObject<T> = {}
    for (const key of keys) {
        const label = lookup[key]
        translatedObject[label] = t(label)
    }
    return translatedObject;
}
export const translateLookupValues = <T extends string>(lookup: InputSelectOptionsObject<T>, t: Function): InputSelectOptionsObject<T> => {
    const keys = ObjectKeys(lookup)
    const translatedObject: InputSelectOptionsObject<T> = {}
    for (const key of keys) {
        translatedObject[key] = t(lookup[key])
    }
    return translatedObject;
}
export const getValueOfLookupByLabel = <T extends string>(lookup: InputSelectOptionsObject<T>, label: T): (string | number) => {
    const keys = ObjectKeys(lookup)
    for (const key of keys) {
        if (lookup[key] === label) return key as string | number
    }
    return 0;
}

