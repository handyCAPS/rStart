// @flow
export type linkCategories = {
  [id: string]: boolean
};
export type LinkItem = {
  id?: string,
  title: string,
  link: string,
  categories: string | linkCategories,
  description: string,
  excludeFromBestOf: boolean,
  imgLocation?: string
};

export type LinkStorageItem = LinkItem & {
  dateAdded: number,
  dateAltered?: string,
  clicks: number
};
