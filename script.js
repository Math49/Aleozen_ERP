document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("select");
  const hidden = document.getElementById("course");

  fetch("https://api.aleozen.mathis-mercier.mds-angers.yt/api/courses", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer 1|NpAMIxQBaeULfMlmSPS7vI0Gk5lwiu6OybV9u2Pq1865dd7a",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      select.innerHTML = "";

      data.forEach((item) => {
        if (item.status === "upcoming") {
          const option = document.createElement("option");
          option.value = item.course_id;
          option.textContent = item.title + " - " + item.start_date;
          select.appendChild(option);
        }
      });
      if (select.options.length === 0) {
        select.innerHTML =
          '<option value="">Aucune session disponible</option>';
      }
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des données :", error);
      select.innerHTML = '<option value="">Erreur de chargement</option>';
    });

  select.addEventListener("change", function () {
    hidden.value = select.value;
  });

  const submitButton = document.querySelector(".submit-course-btn")[0];

  submitButton.addEventListener("click", function (event) {
    if (select.value === "") {
      event.preventDefault(); // Empêche l'envoi du formulaire
      alert("Veuillez sélectionner une session avant de soumettre.");
    }

    // Si une session est sélectionnée, le formulaire sera soumis normalement
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("tel").value;
    const courseId = document.getElementById("course").value;

    const data = {
      firs_name: firstname,
      last_name: lastname,
      email: email,
      phone: phone,
      status: "pending",
      course_id: courseId,
    };

    fetch(
      "https://api.aleozen.mathis-mercier.mds-angers.yt/api/course-reservations",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 1|NpAMIxQBaeULfMlmSPS7vI0Gk5lwiu6OybV9u2Pq1865dd7a",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        }
    )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erreur lors de la réservation");
      }
    })
    .then((data) => {
      console.log("Réservation réussie :", data);
      alert("Réservation réussie !");
    })
    .catch((error) => {
      console.error("Erreur lors de la réservation :", error);
      alert("Erreur lors de la réservation");
    });
  });
});
