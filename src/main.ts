import { clearAdminData, clearAdminErrors, showAdminErrors } from "./ts/sign-up/sign-up";

/* VARIABLES */
const signInForm = document.getElementById("sign-in-form") as HTMLFormElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const companyKey = document.getElementById("company-key") as HTMLInputElement;
const signInBtn = document.getElementById("sign-in-button") as HTMLButtonElement;

/* SIGN IN FUNCTION */
function signIn() {
    const data = {
        email: email.value,
        password: password.value,
        company_key: companyKey.value
    }

    /* SIGNING IN */
    fetch("http://localhost:3000/admins/signIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
    .then(async res => {
        const data = await res.json();
        if (res.ok) { 
            /* LOADING ADMIN PAGE */
            clearAdminErrors("sign-up-errors")
            clearAdminData([email, password, companyKey]);

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
            showAdminErrors(errArray, "sign-up-errors", signInForm, signInBtn); 
        } catch (err) {
            location.href = window.origin + "/src/pages/500.html";
        }
    })
}

/* ADDING EVENTS */
signInForm.addEventListener("submit", event => {
    event.preventDefault();
    signIn();
});