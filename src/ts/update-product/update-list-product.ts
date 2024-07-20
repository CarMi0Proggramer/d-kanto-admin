import { createProduct } from "../../components/product";
import { updateModals } from "../modals/flowbite-modals";
import { updateDeleteEvent } from "./update-delete-event";

const productBox = document.getElementById("product-box") as HTMLTableSectionElement;

/* UPDATING PRODUCT LIST */
export function updateListProduct(product: Product) {
    const firstProduct = productBox.firstChild;
    const newProduct = createProduct(product);

    updateDeleteEvent(newProduct);
    productBox.insertBefore(newProduct, firstProduct);
    updateModals();
}
