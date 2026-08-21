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

  const musicButton =
  document.getElementById("musicButton");

const backgroundMusic =
  document.getElementById("backgroundMusic");


// =========================
// SINCRONIZA O BOTÃO
// =========================

backgroundMusic.addEventListener(
  "play",
  function () {

    musicButton.textContent =
      "❚❚ Pausar música";

    musicButton.classList.add("playing");

  }
);


backgroundMusic.addEventListener(
  "pause",
  function () {

    musicButton.textContent =
      "♫ Ouvir nossa música";

    musicButton.classList.remove("playing");

  }
);


// =========================
// TENTA INICIAR AUTOMATICAMENTE
// =========================

// =========================
// TENTA INICIAR AUTOMATICAMENTE
// =========================

let musicInteractionAttempted = false;

async function tryStartMusic() {

  if (
    musicInteractionAttempted ||
    !backgroundMusic.paused
  ) {
    return;
  }

  musicInteractionAttempted = true;

  try {

    await backgroundMusic.play();

  } catch (error) {

    console.log(
      "Autoplay bloqueado pelo navegador."
    );

  }

}


// Primeira tentativa ao abrir
window.addEventListener(
  "load",
  function () {

    tryStartMusic();

  }
);


// Segunda tentativa na primeira interação
document.addEventListener(
  "click",
  function () {

    tryStartMusic();

  },
  { once: true }
);


document.addEventListener(
  "touchstart",
  function () {

    tryStartMusic();

  },
  { once: true }
);

// =========================
// CONTROLE MANUAL
// =========================

musicButton.addEventListener(
  "click",
  async function () {

    try {

      if (backgroundMusic.paused) {

        await backgroundMusic.play();

      } else {

        backgroundMusic.pause();

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
   FORMULÁRIO DE CONFIRMAÇÃO
========================== */

const rsvpForm =
  document.getElementById("rsvpForm");

const attendanceInputs =
  document.querySelectorAll(
    'input[name="attendance"]'
  );

const companionGroup =
  document.getElementById("companionGroup");

const companionInputs =
  document.querySelectorAll(
    'input[name="companion"]'
  );

const companionNameGroup =
  document.getElementById(
    "companionNameGroup"
  );

const companionName =
  document.getElementById(
    "companionName"
  );

const rsvpSuccess =
  document.getElementById(
    "rsvpSuccess"
  );


attendanceInputs.forEach(
  (input) => {

    input.addEventListener(
      "change",
      function () {

        if (
          this.value === "sim"
        ) {

          companionGroup.hidden =
            false;

        } else {

          companionGroup.hidden =
            true;

          companionNameGroup.hidden =
            true;

          companionInputs.forEach(
            (radio) => {
              radio.checked = false;
            }
          );

          companionName.value =
            "";

        }

      }
    );

  }
);


companionInputs.forEach(
  (input) => {

    input.addEventListener(
      "change",
      function () {

        if (
          this.value ===
          "acompanhante"
        ) {

          companionNameGroup.hidden =
            false;

          companionName.required =
            true;

        } else {

          companionNameGroup.hidden =
            true;

          companionName.required =
            false;

          companionName.value =
            "";

        }

      }
    );

  }
);


rsvpForm.addEventListener(
  "submit",
  async function (event) {

    event.preventDefault();


    const formData =
      new FormData(rsvpForm);


    const data = {

      nome:
        formData.get("guestName") || "",

      presenca:
        formData.get("attendance") || "",

      acompanhante:
        formData.get("companionName") || "",

      mensagem:
        formData.get("guestMessage") || ""
    };


    const submitButton =
      rsvpForm.querySelector(
        'button[type="submit"]'
      );


    submitButton.disabled =
      true;

    submitButton.textContent =
      "ENVIANDO...";


    try {

      await fetch(
        "https://script.google.com/macros/s/AKfycby3d7q2qH_R-u7NGoh2u-y1Y00pKuUF2u9fV8JxtXy9fQqDEVkwlcfJDT8e5kSGYj8/exec",
        {

          method: "POST",

          mode: "no-cors",

          headers: {
            "Content-Type":
              "text/plain"
          },

          body:
            JSON.stringify(data)

        }
      );


      rsvpForm.hidden =
        true;

      rsvpSuccess.hidden =
        false;

      rsvpSuccess.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });


    } catch (error) {

      console.error(
        "Erro ao enviar confirmação:",
        error
      );


      submitButton.disabled =
        false;

      submitButton.textContent =
        "ENVIAR CONFIRMAÇÃO";


      alert(
        "Não foi possível enviar sua confirmação. Tente novamente."
      );

    }

  }
);

});
