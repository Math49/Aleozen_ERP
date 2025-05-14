const { fetchData } = require("@/services/api");

export async function getAllInterventionReservations() {
    try {
        const res = await fetchData(`/intervention-reservations`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}

export async function getInterventionReservationById(id) {
    try {
        const res = await fetchData(`/intervention-reservations/${id}`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}

export async function updateInterventionReservationById(id, data) {
    try {
        const res = await fetchData(`/intervention-reservations/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
        return await res;
    } catch (error) {
        return null;
    }
}

