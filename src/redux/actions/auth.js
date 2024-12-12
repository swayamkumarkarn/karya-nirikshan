export const USER_DATA = "USER_DATA";
export const LOGOUT = 'LOGOUT';

export const SAVE_USER_DATA = (payload) => {
    return {type : USER_DATA , payload};
}

export const logout = () => ({
    type: LOGOUT,
});