const { fetchData } = require("@/services/api");

export async function getAllTrainings() {
    try {
        const res = await fetchData(`/trainings`, {
            method: "GET",
        });
    
        const data = await res;

        const today = new Date();

        const filteredAndSortedTrainings = data
            .filter((training) => new Date(training.start_date) > today)
            .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

        return filteredAndSortedTrainings;
    } catch (error) {
        return null;
    }
}

export async function getNumberInscriptionsByTrainingById(id) {
    try {
        const res = await fetchData(`/training/${id}/training-reservations-approved`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}

export async function getAllTrainingReservations() {
    try {
        const res = await fetchData(`/training-reservations`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}

export async function getTrainingReservationById(id) {
    try {
        const res = await fetchData(`/training-reservations/${id}`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}

export async function updateTrainingReservationById(id, data) {
    try {
        const res = await fetchData(`/training-reservations/${id}`, {
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

export async function getTrainingById(id) {
    try {
        const res = await fetchData(`/trainings/${id}`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}

