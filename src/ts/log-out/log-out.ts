/* SIGNING OUT */
export async function logOut() {
    localStorage.removeItem("session-data");

    fetch("http://localhost:3000/admins/logOut",{
        method: "POST",
        credentials: "include" 
    }).catch( err => {
        if (err) {
            location.href = window.origin + "/src/pages/500.html"
        }
    })
}