/* SIGNING OUT */
export async function logOut() {
    localStorage.removeItem("session-data");

    fetch("https://d-kanto-backend.onrender.com/admins/logOut",{
        method: "POST",
        credentials: "include" 
    }).catch( err => {
        if (err) {
            location.href = window.origin + "/src/pages/500.html"
        }
    })
}