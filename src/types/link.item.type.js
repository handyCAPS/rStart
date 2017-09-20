export type linkItem = {
	id?: string;
	title: string;
	link: string;
	categories: any;
	excludeFromBestOf: boolean;
	imgLocation?: string;
};

export type linkStorageItem = linkItem & {
	dateAdded: string;
	dateAltered?: string;
	clicks: number;
};
