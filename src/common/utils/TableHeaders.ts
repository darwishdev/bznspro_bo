import type { ITableHeader } from "v-dashkit/types";
import { FormateCurrency } from "v-dashkit/utils/currency";
import { TableHeaderText } from "v-dashkit/utils/table";
import { h } from 'vue'
export class TableHeaderPrice extends TableHeaderText implements ITableHeader {

    renderHtml = (value: any) => {
        const data = value[this.columnName]
        return h('span', FormateCurrency(data, 'ريال'))
    }
}

export class TableHeaderPercent extends TableHeaderText implements ITableHeader {
    renderHtml = (value: any) => {
        const data = value[this.columnName]
        return h('span', `${data}%`)
    }
}