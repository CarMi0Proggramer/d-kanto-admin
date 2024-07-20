//CLEAR DATA FUNCTION
export function clearData(options: ClearDataOptions) {
    for (const element of options.elements) {
        element.value = '';
    }

    if (options.discard) {
        return;
    }else{
        options.closeModalButton.click();
    }
}