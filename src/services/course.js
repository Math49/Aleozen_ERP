const { fetchData } = require("@/services/api");

export async function getAllCourses() {
    try {
        const res = await fetchData(`/courses`, {
            method: "GET",
        });
    
        const data = await res;

        const today = new Date();

        const filteredAndSortedCourses = data
            .filter((course) => new Date(course.start_date) > today)
            .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

        return filteredAndSortedCourses;
    } catch (error) {
        return null;
    }
}

export async function getNumberInscriptionsByCourseById(id) {
    try {
        const res = await fetchData(`/course/${id}/course-reservations-approved`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}

export async function getAllCourseReservations() {
    try {
        const res = await fetchData(`/course-reservations`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}

export async function getCourseById(id) {
    try {
        const res = await fetchData(`/courses/${id}`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}

export async function getCourseReservationById(id) {
    try {
        const res = await fetchData(`/course-reservations/${id}`, {
            method: "GET",
        });
    
        return await res;
    } catch (error) {
        return null;
    }
}

export async function updateCourseReservationById(id, data) {
    try {
        const res = await fetchData(`/course-reservations/${id}`, {
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