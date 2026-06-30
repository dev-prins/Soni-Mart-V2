const API = {

    baseUrl: CONFIG.API_URL,

    async request(endpoint, options = {}) {

        const token = localStorage.getItem("token");

        const headers = {
            "Content-Type": "application/json",
            ...options.headers
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(
            `${this.baseUrl}${endpoint}`,
            {
                ...options,
                headers
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Request Failed");
        }

        return data;
    },

    get(endpoint) {
        return this.request(endpoint);
    },

    post(endpoint, body) {
        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(body)
        });
    },

    put(endpoint, body) {
        return this.request(endpoint, {
            method: "PUT",
            body: JSON.stringify(body)
        });
    },

    delete(endpoint) {
        return this.request(endpoint, {
            method: "DELETE"
        });
    }

};
