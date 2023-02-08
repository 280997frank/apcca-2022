export interface IReqPagination {
  page: number;
  limit: number;
}

export interface IReqPaginationWithID {
  id: string;
  page: number;
  limit: number;
}

export interface IResPagination<T> {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
  data: T;
}

export type TResPaginationWoData = Omit<IResPagination<undefined>, "data">;
