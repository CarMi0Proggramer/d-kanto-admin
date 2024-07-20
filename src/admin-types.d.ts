interface Product {
    readonly id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    urlimg: string;
    rating: number;
    stock: number;
}

type CreateProductOptions = {
    filterOption: boolean;
    searchOption: boolean;
    arrProduct: Product[];
    initIndex: number;
    finalIndex: number;
};

type ClearDataOptions = {
    discard?: boolean,
    elements: (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[],
    closeModalButton: HTMLButtonElement
}

type LoadOptions = {
    inverse: boolean,
    deleteBackOption?: boolean,
    searchOptions: boolean,
    filterOption: boolean
}

type PaginationOptions = {
    searchOption: boolean;
    filterOption: boolean;
};

type DetectPaginationOptions = {
    arrProduct: Product[];
    add: boolean;
    searchOption: boolean;
    filterOption: boolean;
    current: number;
};

type EstimatePageOptions = {
    current: number;
    searchOption: boolean;
    filterOption: boolean;
    especificPage?: number;
};

type GenerateRatingOptions = {
    preview: boolean
}

type FilterOptions = {
    type: "category",
    value: string[]
} | {
    type: "price",
    value: {
        from: number,
        to?: number
    }
} |
{
    type: "rating",
    value: number
}

type ChangePageOptions = {
    next: boolean;
    init: number;
    final: number;
    current: number;
    pages: number;
    sectionsNumber: number;
    arrProduct: Product[];
    searchOption: boolean;
    filterOption: boolean;
};

type CalculatePaginationOptions = {
    productsLength: number;
    pageNumber: number;
    searchOption: boolean;
    filterOption: boolean;
};