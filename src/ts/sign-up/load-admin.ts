const adminName = document.getElementById("admin-name") as HTMLSpanElement;
const adminEmail = document.getElementById("admin-email") as HTMLSpanElement;

export function setAdminData() {
    const adminData: {
        name: string,
        email: string
    } = JSON.parse(sessionStorage.getItem("session-data") as string);

    if (!adminData) {
        location.href = window.origin;
    }

    adminName.innerText = adminData.name;
    adminEmail.innerText = adminData.email;
}