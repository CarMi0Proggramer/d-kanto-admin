import { changeFilterFinalIndex, filterLast } from "../filters/filter";
import { changeLastIndex, lastIndex } from "../pagination/pagination";
import { changeSearchFinalIndex, finalIndex } from "../search-box/search";

export function changeIndexPerOption(options: CreateProductOptions) {
    if (options.searchOption) {
        changeSearchFinalIndex(finalIndex + 1);
    } else if (options.filterOption) {
        changeFilterFinalIndex(filterLast + 1);
    } else {
        changeLastIndex(lastIndex + 1);
    }
}