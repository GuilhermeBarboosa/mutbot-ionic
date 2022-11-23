import { SortDirection } from "@angular/material/sort";

export interface ListParams {
    pageable: boolean;
    orderBy: string;
    orderType: SortDirection;
    pageIndex?: number;
    pageSize?: number;
}
