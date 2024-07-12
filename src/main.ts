import { clearAdminData, clearAdminErrors, showAdminErrors } from "./ts/sign-up/sign-up";

const signInForm = document.getElementById("sign-in-form") as HTMLFormElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const companyKey = document.getElementById("company-key") as HTMLInputElement;
const signInBtn = document.getElementById("sign-in-button") as HTMLButtonElement;

function signIn() {
    const data = {
        email: email.value,
        password: password.value,
        company_key: companyKey.value
    }

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
            clearAdminErrors("sign-up-errors")
            clearAdminData([email, password, companyKey]);

            sessionStorage.setItem("session-data", JSON.stringify(data));
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

            clearAdminErrors("sign-up-errors");
            showAdminErrors(errArray, "sign-up-errors", signInForm, signInBtn); 
        } catch (err) {
            location.href = window.origin + "/src/pages/500.html";
        }
    })
}

signInForm.addEventListener("submit", event => {
    event.preventDefault();
    signIn();
});