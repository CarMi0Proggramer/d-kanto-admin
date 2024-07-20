import { filterMatches } from "../filters/filter";
import { products } from "../pagination/pagination";
import { searchMatches } from "../search-box/search";

export function updateProductArrays(
    options: CreateProductOptions,
    data: Product
) {
    products.push(data);
    if (options.searchOption) {
        searchMatches.push(data);
    } else if (options.filterOption) {
        filterMatches.push(data);
    }
}
