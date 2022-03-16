import jwtDecode from 'jwt-decode';
// import { Cookies } from "react-cookie";

/**
 * Checks if user is authenticated
 */
const isAdminAuthenticated = () => {
    const user = getLoggedInUser();
    console.log({user});
    if (!user) {
        return false;
    }
    return user.role === 'MANAGER' ? true : 'other';
    // const decoded = jwtDecode(user.token);
    // const currentTime = Date.now() / 1000;
    // if (decoded.exp < currentTime) {
    //     console.warn('access token expired');
    //     return false;
    // }
    // else {
    //     return true;
    // }
}

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const userToken = localStorage.getItem("authtoken");
    if (!userToken) {
        return false;
    }
    const decoded = jwtDecode(userToken);
    return decoded;
    // const cookies = new Cookies(); s
    // const user = cookies.get("user");
}

export { isAdminAuthenticated, getLoggedInUser };