export type linkItem = {
	id?: string;
	title: string;
	link: string;
	category: string;
	imgLocation: string;
};

export type linkStorageItem = linkItem & {
	dateAdded: string;
	dateAltered: string;
	clicks: number;
};
