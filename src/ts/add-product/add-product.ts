import {
    clearErrors,
    getErrorsArrMessages,
    showErrors,
} from "../errors/errors";
import {
    changeFilterFinalIndex,
    filterMatches,
} from "../filters/filter";
import { showAddSuccessMessage } from "../modals/success-messages";
import {
    changeLastIndex,
    products,
} from "../pagination/pagination";
import { calculateShowing } from "../pagination/products-showing";
import {
    changeSearchFinalIndex,
    finalIndex,
    searchMatches,
} from "../search-box/search";
import { updateListProduct } from "../update-product/update-list-product";
import { clearData } from "./clear-data";
import { createPaginationPerOptions } from "./create-pagination-per-options";

/* VARS */
const closeModalButton = document.getElementById(
    "close-add-product"
) as HTMLButtonElement;
const inputName = document.getElementById("name") as HTMLInputElement;
const price = document.getElementById("price") as HTMLInputElement;
const description = document.getElementById(
    "description"
) as HTMLTextAreaElement;
const category = document.getElementById("category") as HTMLSelectElement;
const urlimg = document.getElementById("product-img") as HTMLInputElement;
const stock = document.getElementById("add-product-stock") as HTMLInputElement;
const discardButton = document.getElementById("discard-button");
const arrElements = [inputName, price, description, category, urlimg, stock];

/* CRETING A PRODUCT */
export async function createProductForm(
    form: HTMLFormElement,
    buttonsContainer: HTMLDivElement,
    options: CreateProductOptions
) {
    await fetch("http://localhost:3000/products/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: inputName.value,
            price: Number(price.value) + 0.99,
            description: description.value,
            category: category.value,
            urlimg: urlimg.value,
            stock: Number(stock.value),
        }),
        credentials: "include",
    })
        .then(async (res) => {
            if (res.ok) {
                /* UPDATING PRODUCTS ARRAY */
                const product: Product = await res.json();
                products.push(product);

                /* ADDING NEW PRODUCT IF THERE'S AN OPTION */
                if (options.searchOption) {
                    searchMatches.push(product);
                } else if (options.filterOption) {
                    filterMatches.push(product);
                }

                /* GETTING CONTAINERS */
                let productContainers = document.querySelectorAll(
                    `tr[name="product-container"]`
                );

                if (productContainers.length < 6) {
                    /* CHANGING LAST INDEXS VALUES */
                    if (options.searchOption) {
                        changeSearchFinalIndex(finalIndex + 1);
                    } else if (options.filterOption) {
                        changeFilterFinalIndex(finalIndex + 1);
                    } else {
                        changeLastIndex(false, false, 1, "plus");
                    }
                    /* UPDATING PRODUCTS LIST */
                    updateListProduct(product);
                }

                createPaginationPerOptions(options);
                /* GETTING SHOWING AND CLEARING DATA */
                calculateShowing(options.initIndex, options.arrProduct);
                clearData({
                    closeModalButton: closeModalButton,
                    elements: arrElements,
                });
                clearErrors("errors-container");
                showAddSuccessMessage();
            } else if (res.status === 400) {
                return res.json().then((errorData) => {
                    throw new Error(JSON.stringify(errorData));
                });
            } else {
                location.href = window.origin + "src/pages/500.html";
            }
        })
        .catch((errors) => {
            try {
                /* GETTING USER ERRORS */
                errors = JSON.parse(errors.message);
                const err_messages = getErrorsArrMessages(errors);

                clearErrors("errors-container");
                showErrors(
                    err_messages,
                    "errors-container",
                    form,
                    buttonsContainer
                );
            } catch (err) {
                /* UNKNOWN ERROR */
                location.href = window.origin + "/src/pages/500.html";
            }
        });
}

/* CLEANING DATA WHEN TOUCHES DISCARD BUTTON */
if (discardButton instanceof HTMLButtonElement) {
    discardButton.addEventListener("click", () => {
        clearErrors("errors-container");
        clearData({
            discard: true,
            closeModalButton: closeModalButton,
            elements: arrElements,
        });
    });
}
