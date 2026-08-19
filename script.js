document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CONTADOR PARA O CASAMENTO
  ========================== */

  const weddingDate = new Date(
    "2026-09-12T19:30:00-03:00"
  ).getTime();


  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  const secondsElement =
    document.getElementById("seconds");


  function updateCountdown() {

    const now = new Date().getTime();

    const difference =
      weddingDate - now;


    if (difference <= 0) {

      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";

      return;
    }


    const days =
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      );


    const hours =
      Math.floor(
        (difference %
          (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      );


    const minutes =
      Math.floor(
        (difference %
          (1000 * 60 * 60)) /
        (1000 * 60)
      );


    const seconds =
      Math.floor(
        (difference %
          (1000 * 60)) /
        1000
      );


    daysElement.textContent =
      String(days).padStart(2, "0");


    hoursElement.textContent =
      String(hours).padStart(2, "0");


    minutesElement.textContent =
      String(minutes).padStart(2, "0");


    secondsElement.textContent =
      String(seconds).padStart(2, "0");
  }


  updateCountdown();

  setInterval(
    updateCountdown,
    1000
  );
  // =========================
  // MÚSICA
  // =========================

    // =========================
  // MÚSICA
  // =========================

  const musicButton =
    document.getElementById("musicButton");

  const backgroundMusic =
    document.getElementById("backgroundMusic");


  musicButton.addEventListener(
    "click",
    async function () {

      try {

        if (backgroundMusic.paused) {

          await backgroundMusic.play();

          musicButton.textContent =
            "❚❚ Pausar música";

        } else {

          backgroundMusic.pause();

          musicButton.textContent =
            "♫ Ouvir nossa música";

        }

      } catch (error) {

        console.error(
          "Não foi possível reproduzir a música:",
          error
        );

      }

    }
  );


  /* =========================
     ANIMAÇÕES AO ROLAR
  ========================== */

  const revealElements =
    document.querySelectorAll(".reveal");


  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    (element) => {

      observer.observe(
        element
      );

    }
  );


  /* =========================
     BOTÃO DE CONFIRMAÇÃO
  ========================== */

  const rsvpButton =
    document.getElementById(
      "rsvpButton"
    );


  rsvpButton.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      alert(
        "Em breve você poderá confirmar sua presença por aqui. ❤️"
      );

    }
  );

});
