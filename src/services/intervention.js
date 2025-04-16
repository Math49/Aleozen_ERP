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