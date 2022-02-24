interface IFilterPrice {
  minValue: number;
  maxValue: number;
}
interface IFilter {
  categoryParentId: number;
  categoryChildId: number;
  searchNameValue: string;
  price: IFilterPrice;
}

export interface IFilterParams {
  where: {
    take: number;
    skip: number;
    filter: IFilter;
    checkboxParams: { id: number; options: { id: number; name: string }[] }[];
    inputParams: {
      id: number;
      min: number;
      max: number;
    }[];
  };
}
