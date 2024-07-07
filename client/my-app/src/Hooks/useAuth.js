
const useAuth = () => {
    // must return 3 things: isAuthenticated --> boolean, logout --> method to delete access token in local storage
    let isAuthenticated =  false;
    const token = localStorage.getItem("accessToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (token) { isAuthenticated = true }

    const logout = () => { localStorage.removeItem("accessToken") }

    return { isAuthenticated, logout, userInfo }
}

export default useAuth;