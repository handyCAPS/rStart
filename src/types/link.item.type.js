export type LinkItem = {
  id?: string,
  title: string,
  link: string,
  categories: Array<any>,
  description: string,
  excludeFromBestOf: boolean,
  imgLocation?: string
};

export type LinkStorageItem = LinkItem & {
  dateAdded: string,
  dateAltered?: string,
  clicks: number
};
