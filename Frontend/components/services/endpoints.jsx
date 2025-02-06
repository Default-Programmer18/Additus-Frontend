const BASE_URL = "http://localhost:8000"

// AUTH ENDPOINTS
export const endpoints = {
    auth: {
        login: `${BASE_URL}/auth/login`,
        register: `${BASE_URL}/auth/register`,
        verifyPhone: `${BASE_URL}/auth/verify-phone`,
    },
    gyms: {
        nearby: `${BASE_URL}/gyms/nearby`,
        details: `${BASE_URL}/gyms/details`,
    },
    user: {
        profile: `${BASE_URL}/user/profile`,
        updateProfile: `${BASE_URL}/user/update`,
    }
}