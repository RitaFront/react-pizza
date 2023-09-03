import { IListSort } from '../../component/Sort';

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  sort: IListSort;
  valueSearch: string;
}
