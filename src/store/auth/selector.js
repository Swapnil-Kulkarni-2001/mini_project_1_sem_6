export const isAuthenticatedSelector = state => state.auth.isAuthenticated;

export const userTypeSelector = state => state.auth.userType;

export const userEmailSelector = state => state.auth.userEmail;

export const userIdSelector = state => state.auth.userId;

export const userLocSelector = state => state.auth.userLoc;

export const userPassSelector = state => state.auth.userPass;

export const userAccessTokenSelector = state => state.auth.userAccessToken;

export const isLogoutLodingSelector = state => state.auth.isLogoutLoding;

export const profilePicSelector = state => state.auth.profilePic;

export const profilePicLoadingSelector = state => state.auth.profilePicLoading;
