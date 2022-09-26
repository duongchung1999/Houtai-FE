import { BaseEntity } from "./baseEntity";

export class PageList<T> extends BaseEntity{
    public pageIndex?: number = undefined;
    public pageSize?: number = undefined;
    public totalCount?: number = undefined;
    public totalPages?: number = undefined;
    public items?: T[] = undefined;
    public hasPrevPages?: boolean = undefined;
    public hasNextPages?: boolean = undefined;
}