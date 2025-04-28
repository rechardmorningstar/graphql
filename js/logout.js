export function logout(){
    const logoutBtn = document.getElementById('logoutBtn')
    if (!logoutBtn) return;
    logoutBtn.addEventListener('click', ()=>{
        localStorage.removeItem('jwt')
        window.location.href = '/'; 
    })
}