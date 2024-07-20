/* SHOW ERRORS ON THE CONTAINER */
export function showErrors(errors: string[], idElement: string, fatherElement: HTMLElement, beforeElement: HTMLElement) {
    const errorsContainer = createErrorsContainer(errors, idElement);
    fatherElement.insertBefore(errorsContainer, beforeElement);
}

function createErrorsContainer(errors: string[],idElement: string) {
    const errorsContainer = document.createElement("div");
    errorsContainer.id = idElement;
    errorsContainer.classList.add("mb-4", "text-sm", "font-medium", "sm:col-span-2", "text-red-500");

    for (const err of errors) {
        const p = document.createElement("p");
        p.classList.add("mb-2");
        p.innerHTML = err;
        errorsContainer.appendChild(p);
    }

    return errorsContainer;
}

/* DELETE ERRORS CONTAINER */
export function clearErrors(idElement:string) {
    const errorsContainer = document.getElementById(idElement);
    if (errorsContainer instanceof HTMLDivElement) {
        errorsContainer.remove();
    }
}

export function getErrorsArrMessages(errors: any) {
    let err_messages = []
    for (const err of errors.message) {
        err_messages.push(err.message)
    }

    return err_messages;
}