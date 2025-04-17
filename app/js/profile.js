import { logout } from "./logout.js";

export function Profile(){
    const header = document.getElementById('hdr');
    let btn = document.createElement('button');
    btn.id = 'logoutBtn';
    btn.innerHTML = /*html*/ `<i class="fa-solid fa-right-from-bracket"></i> logout`;
    header.appendChild(btn)

    logout()

    const app = document.getElementById('app')
    app.innerHTML = '';
    const p = document.createElement('p')
    p.innerText = 'working on it'
    app.append(p)
}