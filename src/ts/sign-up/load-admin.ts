const adminName = document.getElementById("admin-name") as HTMLSpanElement;
const adminEmail = document.getElementById("admin-email") as HTMLSpanElement;

/* LOADING ADMIN DATA */
export function setAdminData() {
    const adminData: {
        name: string,
        email: string
    } = JSON.parse(localStorage.getItem("session-data") as string);

    if (!adminData) {
        location.href = window.origin;
    }

    adminName.innerText = adminData.name;
    adminEmail.innerText = adminData.email;
}