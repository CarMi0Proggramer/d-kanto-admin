/* SIGNING OUT */
export async function signOut() {
    localStorage.removeItem("session-data");

    fetch("https://d-kanto-backend/admins/logOut",{
        method: "POST",
        credentials: "include" 
    }).catch( err => {
        if (err) {
            location.href = window.origin + "/src/pages/500.html"
        }
    })
}