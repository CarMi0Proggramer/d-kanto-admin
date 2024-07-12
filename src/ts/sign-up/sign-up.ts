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

    fetch("http://localhost:3000/admins/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(async res => {
        const data = await res.json();
        if (res.ok) {
            clearErrors("sign-up-errors")
            clearData([name, email, password, companyKey]);

            sessionStorage.setItem("session-data", JSON.stringify(data));
            location.href = window.origin + "/src/pages/admin.html";
        }else if(400){
            throw new Error(JSON.stringify(data));
        }else{
            alert("Internal error");
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

            clearErrors("sign-up-errors");
            showErrors(errArray, "sign-up-errors", signUpform, createBtn); 
        } catch (err) {
            console.log(err);
        }
    })
}

/* ADDING EVENTS */
signUpform.addEventListener("submit", event => {
    event.preventDefault();
    signUp();
})


/* ERRORS FUNCTION */
function showErrors(errors: string[], idElement: string, fatherElement: HTMLFormElement, beforeElement: HTMLElement) {
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


function clearErrors(id: string) {
    const errorsContainer = document.getElementById(id);
    if (errorsContainer instanceof HTMLDivElement) {
        errorsContainer.remove();
    }
}

function clearData(elements: HTMLInputElement[]) {
    for (const el of elements) {
        el.value = '';
    }
}