export declare abstract class BaseModel {
  id: string;
  created: string;
  updated: string;
  constructor(data?: { [key: string]: any });
  /**
   * Loads `data` into the current model.
   */
  load(data: { [key: string]: any }): void;
  /**
   * Returns whether the current loaded data represent a stored db record.
   */
  get isNew(): boolean;
  /**
   * Robust deep clone of a model.
   */
  clone(): BaseModel;
  /**
   * Exports all model properties as a new plain object.
   */
  export(): {
    [key: string]: any;
  };
}

export declare class ListResult<M extends BaseModel> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Array<M>;
  constructor(
    page: number,
    perPage: number,
    totalItems: number,
    totalPages: number,
    items: Array<M>
  );
}
