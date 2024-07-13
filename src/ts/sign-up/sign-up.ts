/* VARIABLES */
const signUpform = document.getElementById("sign-up-form") as HTMLFormElement;
const name = document.getElementById("name") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const companyKey = document.getElementById("company-key") as HTMLInputElement;
const createBtn = document.getElementById("create-account") as HTMLButtonElement;

/* SIGN UP FUNCTION */
export function signUp() {
    const data = {
        name: name.value,
        email: email.value,
        password: password.value,
        company_key: companyKey.value
    }

    /* SIGNING UP */
    fetch("https://d-kanto-backend/admins/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(async res => {
        const data = await res.json();
        if (res.ok) {
            /* CLEARING ERRORS AND DATA */
            clearAdminErrors("sign-up-errors")
            clearAdminData([name, email, password, companyKey]);

            /* SETTING DATA */
            localStorage.setItem("session-data", JSON.stringify(data));
            location.href = window.origin + "/src/pages/admin.html";
        }else if(400){
            throw new Error(JSON.stringify(data));
        }else{
            location.href = window.origin + "/src/pages/500.html";
        }
    })
    .catch(err =>{
        try {
            /* TRY READING THE ERRORS */
            const errors = JSON.parse(err.message);
            let errArray: string[] = [];
            
            if (errors instanceof Array) {
                for(let err of errors){
                    errArray.push(err.message);
                }
            }else{
                errArray.push(errors.message);
            }

            /* CLEARING AND SHOWING ERRORS */
            clearAdminErrors("sign-up-errors");
            showAdminErrors(errArray, "sign-up-errors", signUpform, createBtn); 
        } catch (err) {
            location.href = window.origin + "/src/pages/500.html";
        }
    })
}

/* ADDING EVENTS */
if (signUpform) {
    signUpform.addEventListener("submit", event => {
        event.preventDefault();
        signUp();
    })
}


/* ERRORS FUNCTION */
export function showAdminErrors(errors: string[], idElement: string, fatherElement: HTMLFormElement, beforeElement: HTMLElement) {
    const errorsContainer = document.createElement("div");
    errorsContainer.id = idElement;
    errorsContainer.classList.add("mb-4", "text-sm", "font-medium", "sm:col-span-2", "text-red-500");

    for (const err of errors) {
        const p = document.createElement("p");
        p.classList.add("mb-2");
        p.innerHTML = err;
        errorsContainer.appendChild(p);
    }
    fatherElement.insertBefore(errorsContainer, beforeElement);
}


export function clearAdminErrors(id: string) {
    const errorsContainer = document.getElementById(id);
    if (errorsContainer instanceof HTMLDivElement) {
        errorsContainer.remove();
    }
}

export function clearAdminData(elements: HTMLInputElement[]) {
    for (const el of elements) {
        el.value = '';
    }
}