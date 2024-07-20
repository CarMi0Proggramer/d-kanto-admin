import { changeFilterSections, filterCurrent } from "../filters/filter";
import { detectPagination } from "../pagination/detect-pagination";
import { calculateSections, changeSections, current, products } from "../pagination/pagination";
import { changeSearchSections, searchCurrent } from "../search-box/search";

export function createPaginationPerOptions(options: CreateProductOptions) {
    if (options.searchOption) {
        detectPagination({
            add: true,
            arrProduct: options.arrProduct,
            searchOption: true,
            filterOption: false,
            current: searchCurrent,
        });
        changeSearchSections(
            calculateSections(options.arrProduct.length)
        );
    } else if (options.filterOption) {
        detectPagination({
            add: true,
            arrProduct: options.arrProduct,
            searchOption: false,
            filterOption: true,
            current: filterCurrent,
        });
        changeFilterSections(
            calculateSections(options.arrProduct.length)
        );
    } else {
        detectPagination({
            add: true,
            arrProduct: products,
            searchOption: false,
            filterOption: false,
            current: current,
        });
        changeSections(products.length);
    }
}