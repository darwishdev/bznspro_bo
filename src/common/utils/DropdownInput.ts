import { account_types, entity_types, getValueOfLookupByLabel } from './Lookups';
import type { ValuesOfObject } from "@/types/types";


export const accountsDropdownRequest = (type: ValuesOfObject<typeof account_types> | 'all'): {
    accountTypeId: number;
} => {
    return { accountTypeId: type == 'all' ? 0 : parseInt(getValueOfLookupByLabel(account_types, type) as string) }
}

export const entitiesDropdownRequest = (type: ValuesOfObject<typeof entity_types> | 'all'): {
    entityTypeId: number;
} => {
    return { entityTypeId: type == 'all' ? 0 : parseInt(getValueOfLookupByLabel(entity_types, type) as string) }
}
