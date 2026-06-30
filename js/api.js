
// ===============================
// Prinso Mart API Service
// ===============================

async function apiRequest(endpoint, method = "GET", data = null) {
    try {
        const token = localStorage.getItem(APP_CONFIG.authStorage);

        const options = {
            method,
            headers: {
                "Content-Type": "application/json"
            }
        };

        if (token) {
            options.headers.Authorization = `Bearer ${token}`;
        }

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_URL}${endpoint}`, options);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Something went wrong");
        }

        return result;

    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

// ===============================
// Authentication
// ===============================

const AuthAPI = {

    register(data) {
        return apiRequest("/auth/register", "POST", data);
    },

    login(data) {
        return apiRequest("/auth/login", "POST", data);
    },

    forgotPassword(data) {
        return apiRequest("/auth/forgot-password", "POST", data);
    }

};

// ===============================
// Products
// ===============================

const ProductAPI = {

    getProducts() {
        return apiRequest("/products");
    },

    getProduct(id) {
        return apiRequest(`/products/${id}`);
    }

};

// ===============================
// Orders
// ===============================

const OrderAPI = {

    getOrders() {
        return apiRequest("/orders");
    }

};
