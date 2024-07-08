import { Product } from "../../components/product";

/* OPTIONS */
export type LoadOptions = {
    inverse: boolean,
    deleteBackOption?: boolean,
    searchOptions: boolean,
    filterOption: boolean
}

/* ESTIMATING INIT AND LAST INDEXS */
export function calcInitLastIndex(arrProduct: Product[], initIndex:number, finalIndex:number, counter:number, options:LoadOptions) {
    /* GETTING VALUES */
    if (counter == 6) {
        initIndex = options.inverse ? finalIndex - 11 : finalIndex + 1;
        finalIndex = options.inverse ? finalIndex - 12 : finalIndex;
    } else if (options.deleteBackOption) {
        initIndex = options.inverse ? arrProduct.length - 5 : finalIndex + 1;
        finalIndex = options.inverse ? arrProduct.length  - 6 : finalIndex;
    } else {
        initIndex = options.inverse ? finalIndex + 1 - (6 + counter) : finalIndex + 1;
        finalIndex = options.inverse ? finalIndex - (6 + counter) : finalIndex;
    }

    /* CHECKING VALUES */
    if (initIndex <= 0) {
        initIndex = 1;
        finalIndex = 0;
    } else if (finalIndex == arrProduct.length && !options.inverse) {
        initIndex = finalIndex + 1 - counter;
        finalIndex = finalIndex - counter;
    }

    return {
        initIndex,
        finalIndex
    }
}