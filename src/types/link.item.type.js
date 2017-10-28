// @flow
export type LinkItem = {
  id?: string,
  title: string,
  link: string,
  categories: any,
  description: string,
  excludeFromBestOf: boolean,
  imgLocation?: string
};

export type LinkStorageItem = LinkItem & {
  dateAdded: number,
  dateAltered?: string,
  clicks: number
};
