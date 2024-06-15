import type { ICategory } from "./category";

export interface IFilter {
  _id: string;
  name: string;
  level: number;
  categories: ICategory[];
  user: string;
  black_list: string[];
  white_list: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}