import { confirmDeleteButton, validateDelete } from "../delete-product/delete-product";

export function updateDeleteEvent(container: HTMLTableRowElement) {
    let deleteBtn = container.querySelector(`button[name="delete-product"]`);
    if (deleteBtn instanceof HTMLButtonElement) {
        deleteBtn.addEventListener("click", () => {
            /* ACCEPTING DELETE */
            if (confirmDeleteButton instanceof HTMLButtonElement) {
                confirmDeleteButton.onclick = () => {
                    const productContainers = document.querySelectorAll(
                        `tr[name="product-container"]`
                    );
                    validateDelete(productContainers);
                }
            }
        });
    }
}