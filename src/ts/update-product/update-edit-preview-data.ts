import { generateRating } from "../../components/product";

const enum CATEGORY_TYPES {
    TV = "TV",
    PC = "PC",
    GA = "GA",
    CL = "CL",
    FU = "FU",
    BK = "BK",
    SF = "SF",
    TL = "TL",
}

export function findCategory(category: string, inverse: boolean) {
    if (inverse) {
        switch (category) {
            case "Clothes":
                return CATEGORY_TYPES.CL;
            case "Furniture":
                return CATEGORY_TYPES.FU;
            case "Gaming/Console":
                return CATEGORY_TYPES.GA;
            case "PC":
                return CATEGORY_TYPES.PC;
            case "TV/Monitors":
                return CATEGORY_TYPES.TV;
            case "Books":
                return CATEGORY_TYPES.BK;
            case "Software":
                return CATEGORY_TYPES.SF;
            case "Toiletries":
                return CATEGORY_TYPES.TL;
            default:
                return "";
        }
    } else {
        switch (category) {
            case CATEGORY_TYPES.CL:
                return "Clothes";
            case CATEGORY_TYPES.FU:
                return "Furniture";
            case CATEGORY_TYPES.GA:
                return "Gaming/Console";
            case CATEGORY_TYPES.PC:
                return "PC";
            case CATEGORY_TYPES.TV:
                return "TV/Monitors";
            case CATEGORY_TYPES.BK:
                return "Books";
            case CATEGORY_TYPES.SF:
                return "Software";
            case CATEGORY_TYPES.TL:
                return "Toiletries";
            default:
                return "";
        }
    }
}

export let currentProductId: number;

/* UPDATING PREVIEW OR EDIT DRAWER COMPONENTS */
export async function updateEditPreviewData(
    container: HTMLTableRowElement,
    nameContainer: HTMLInputElement | HTMLHeadingElement,
    urlImgContainer: HTMLInputElement | HTMLImageElement,
    categoryContainer: HTMLSelectElement | HTMLElement,
    priceContainer: HTMLInputElement | HTMLHeadingElement,
    descriptionContainer: HTMLTextAreaElement | HTMLElement,
    stockContainer: HTMLInputElement | null,
    ratingContainer?: HTMLElement
) {
    /* GETTING ORIGINAL PRODUCT */
    let originalProduct: Product = await getProductById(
        Number(container.dataset.id)
    );

    /* SETTING NAME */
    if (nameContainer instanceof HTMLInputElement) {
        nameContainer.value = originalProduct.name;
    } else {
        nameContainer.innerText = originalProduct.name;
    }

    /* SETTING IMAGE */
    if (urlImgContainer instanceof HTMLInputElement) {
        urlImgContainer.value = originalProduct.urlimg;
    } else {
        urlImgContainer.src = originalProduct.urlimg;
    }

    /* SETTING CATEGORY */
    if (categoryContainer instanceof HTMLSelectElement) {
        categoryContainer.value = originalProduct.category;
    } else {
        categoryContainer.innerText = findCategory(
            originalProduct.category,
            false
        );
    }

    /* SETTING PRICE */
    if (priceContainer instanceof HTMLInputElement) {
        priceContainer.value = String(originalProduct.price).replace(".99", "");
    } else {
        priceContainer.innerText = String(originalProduct.price);
    }

    /* SETTING DESCRIPTION */
    if (descriptionContainer instanceof HTMLTextAreaElement) {
        descriptionContainer.value = originalProduct.description;
    } else {
        descriptionContainer.innerText = originalProduct.description;
    }

    /* SETTING STOCK */
    if (stockContainer != null) {
        stockContainer.value = String(originalProduct.stock);
    }

    /* SETTING RATING */
    if (ratingContainer) {
        ratingContainer.innerHTML = generateRating(originalProduct.rating, {
            preview: true,
        });
    }

    currentProductId = originalProduct.id;
}

/* GETTING PRODUCT BY ID FROM DATABASE */
async function getProductById(id: number) {
    let product: Product = await fetch(`http://localhost:3000/products/${id}`,{
        credentials: "include"
    })
        .then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                return data;
            } else if (res.status === 404) {
                location.href = window.origin + "/src/pages/404.html";
            } else {
                location.href = window.origin + "/src/pages/500.html";
            }
        })
        .catch((err) => {
            if (err) {
                location.href = window.origin + "/src/pages/500.html";
            }
        });

    return product;
}
