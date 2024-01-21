import type { ITableHeader } from "v-dashkit/types";

export const witTranslation = (t: Function, header: ITableHeader) => {
    if (header.filter) {
        if (typeof header.filter.input == 'object') {
            if ('placeholder' in header.filter.input) {
                header.filter.input = t(header.filter.input)
            }
        }
    }
    return header
}