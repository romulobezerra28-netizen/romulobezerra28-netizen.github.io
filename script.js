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

 /* =========================
   PRESENTES / MODAL / PIX
========================== */

const giftModal =
  document.getElementById("giftModal");

const giftModalClose =
  document.getElementById("giftModalClose");

const giftModalOverlay =
  document.querySelector("[data-close-gift-modal]");

const giftModalChoice =
  document.getElementById("giftModalChoice");

const giftModalPix =
  document.getElementById("giftModalPix");

const giftModalTitle =
  document.getElementById("giftModalTitle");

const giftModalDescription =
  document.getElementById("giftModalDescription");

const giftSuggestedValue =
  document.getElementById("giftSuggestedValue");

const giftSuggestedButton =
  document.getElementById("giftSuggestedButton");

const giftSuggestedButtonValue =
  document.getElementById("giftSuggestedButtonValue");

const giftOtherValueButton =
  document.getElementById("giftOtherValueButton");

const giftCustomValue =
  document.getElementById("giftCustomValue");

const giftCustomInput =
  document.getElementById("giftCustomInput");

const giftCustomError =
  document.getElementById("giftCustomError");

const giftCustomContinue =
  document.getElementById("giftCustomContinue");

const giftPixGift =
  document.getElementById("giftPixGift");

const giftPixValue =
  document.getElementById("giftPixValue");

const giftCopyPix =
  document.getElementById("giftCopyPix");

const giftShowQr =
  document.getElementById("giftShowQr");

const giftQrContainer =
  document.getElementById("giftQrContainer");

const giftQr =
  document.getElementById("giftQr");

const giftModalBack =
  document.getElementById("giftModalBack");


/* =========================
   CARTÃO DE CRÉDITO
========================== */

const giftCardButton =
  document.getElementById("giftCardButton");

const giftCardAlternatives =
  document.getElementById("giftCardAlternatives");

const giftCardValues =
  document.getElementById("giftCardValues");


let selectedGift = "";

let selectedSuggestedValue = 50;

let selectedValue = 50;


/* =========================
   DADOS DO PIX
========================== */

const PIX_KEY =
  "05359541407";

const PIX_NAME =
  "EDIVANIA TENORIO CAVALCANTE DA SILVA";

const PIX_CITY =
  "ARAPIRACA";


/* =========================
   LINKS PAGBANK
========================== */

const PAGBANK_LINKS = {

  50:
    "https://pag.ae/825nx3XcG",

  80:
    "https://pag.ae/825nxUnxG",

  100:
    "https://pag.ae/825nyDs2P",

  120:
    "https://pag.ae/825nA8Aem",

  150:
    "https://pag.ae/825nAAaum",

  200:
    "https://pag.ae/825nB57w1",

  250:
    "https://pag.ae/825nBGkX8",

  300:
    "https://pag.ae/825nC7f-m",

  500:
    "https://pag.ae/825nCx-S8"

};


/* =========================
   VALORES DISPONÍVEIS
========================== */

const PAGBANK_VALUES =
  Object.keys(PAGBANK_LINKS)
    .map(Number)
    .sort(
      (a, b) => a - b
    );


/* =========================
   FORMATAR DINHEIRO
========================== */

function formatMoney(value) {

  return Number(value).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL"
    }
  );

}


/* =========================
   ENCONTRAR VALORES MAIS PRÓXIMOS
========================== */

function getClosestPagBankValues(
  value
) {

  return PAGBANK_VALUES
    .map(
      (availableValue) => ({
        value: availableValue,

        difference:
          Math.abs(
            availableValue -
            value
          )
      })
    )

    .sort(
      (a, b) => {

        if (
          a.difference !==
          b.difference
        ) {

          return (
            a.difference -
            b.difference
          );

        }

        return (
          a.value -
          b.value
        );

      }
    )

    .slice(0, 3)

    .map(
      (item) =>
        item.value
    )

    .sort(
      (a, b) =>
        a - b
    );

}


/* =========================
   ABRIR MODAL
========================== */

function openGiftModal(
  giftName,
  suggestedValue,
  description
) {

  selectedGift =
    giftName;

  selectedSuggestedValue =
    Number(suggestedValue) || 50;

  selectedValue =
    selectedSuggestedValue;


  giftModalTitle.textContent =
    giftName;

  giftModalDescription.textContent =
    description || "";


  giftSuggestedValue.textContent =
    formatMoney(
      selectedSuggestedValue
    );


  giftSuggestedButtonValue.textContent =
    formatMoney(
      selectedSuggestedValue
    );


  giftCustomInput.value =
    "";

  giftCustomInput.min =
    selectedSuggestedValue;

  giftCustomError.hidden =
    true;

  giftCustomValue.hidden =
    true;


  giftModalChoice.hidden =
    false;

  giftModalPix.hidden =
    true;


  giftQrContainer.hidden =
    true;

  giftQr.innerHTML =
    "";


  giftModal.hidden =
    false;

  document.body.style.overflow =
    "hidden";

}


/* =========================
   FECHAR MODAL
========================== */

function closeGiftModal() {

  giftModal.hidden =
    true;

  document.body.style.overflow =
    "";

}


/* =========================
   MOSTRAR ÁREA DE PAGAMENTO
========================== */

function showPix(value) {

  selectedValue =
    Number(value);


  giftPixGift.textContent =
    selectedGift;

  giftPixValue.textContent =
    formatMoney(
      selectedValue
    );


  giftModalChoice.hidden =
    true;

  giftModalPix.hidden =
    false;


  giftQrContainer.hidden =
    true;

  giftQr.innerHTML =
    "";


  updateCardOption();

}


/* =========================
   ATUALIZAR OPÇÃO DO CARTÃO
========================== */

function updateCardOption() {

  if (
    !giftCardButton ||
    !giftCardAlternatives ||
    !giftCardValues
  ) {

    return;

  }


  giftCardValues.innerHTML =
    "";

  giftCardAlternatives.hidden =
    true;


  const exactLink =
    PAGBANK_LINKS[
      selectedValue
    ];


  /* =========================
     EXISTE LINK EXATO
  ========================== */

  if (
    exactLink
  ) {

    giftCardButton.textContent =
      "💳 PAGAR COM CARTÃO";

    giftCardButton.disabled =
      false;

    giftCardButton.onclick =
      function () {

        window.open(
          exactLink,
          "_blank"
        );

      };

    return;

  }


  /* =========================
     NÃO EXISTE LINK EXATO
  ========================== */

  giftCardButton.textContent =
    "💳 VER VALORES DISPONÍVEIS";

  giftCardButton.disabled =
    false;


  giftCardButton.onclick =
    function () {

      giftCardAlternatives.hidden =
        false;

      giftCardAlternatives.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

    };


  const closestValues =
    getClosestPagBankValues(
      selectedValue
    );


  closestValues.forEach(
    function (value) {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";

      button.className =
        "gift-button gift-card-alternative-button";


      button.textContent =
        "PAGAR " +
        formatMoney(value) +
        " COM CARTÃO";


      button.addEventListener(
        "click",
        function () {

          window.open(
            PAGBANK_LINKS[value],
            "_blank"
          );

        }
      );


      giftCardValues.appendChild(
        button
      );

    }
  );

}


/* =========================
   BOTÕES PRESENTEAR
========================== */

const giftButtons =
  document.querySelectorAll(
    ".gift-button[data-gift]"
  );


giftButtons.forEach(
  (button) => {

    const giftName =
      button.dataset.gift;

    const value =
      Number(button.dataset.value);


    /*
     * Ignora botões especiais
     */

    if (
      button.id ===
      "giftCopyPix" ||

      button.id ===
      "giftShowQr" ||

      button.id ===
      "giftCustomContinue" ||

      button.id ===
      "giftCardButton" ||

      button.classList.contains(
        "gift-card-alternative-button"
      ) ||

      button.classList.contains(
        "gift-other-button"
      )
    ) {

      return;

    }


    button.addEventListener(
      "click",
      function () {

        const giftItem =
          button.closest(
            ".gift-item"
          );


        const descriptionElement =
          giftItem
            ? giftItem.querySelector("p")
            : null;


        const description =
          descriptionElement
            ? descriptionElement.textContent.trim()
            : "";


        openGiftModal(
          giftName,
          value,
          description
        );

      }
    );

  }
);


/* =========================
   USAR VALOR SUGERIDO
========================== */

giftSuggestedButton.addEventListener(
  "click",
  function () {

    showPix(
      selectedSuggestedValue
    );

  }
);


/* =========================
   ESCOLHER VALOR MAIOR
========================== */

giftOtherValueButton.addEventListener(
  "click",
  function () {

    giftCustomValue.hidden =
      false;

    giftCustomInput.focus();

  }
);


/* =========================
   CONFIRMAR OUTRO VALOR
========================== */

giftCustomContinue.addEventListener(
  "click",
  function () {

    const value =
      Number(
        giftCustomInput.value
      );


    if (
      !value ||
      value <
      selectedSuggestedValue
    ) {

      giftCustomError.hidden =
        false;

      giftCustomInput.focus();

      return;

    }


    giftCustomError.hidden =
      true;


    showPix(value);

  }
);


/* =========================
   FECHAR MODAL
========================== */

giftModalClose.addEventListener(
  "click",
  closeGiftModal
);


giftModalOverlay.addEventListener(
  "click",
  closeGiftModal
);


/* =========================
   VOLTAR
========================== */

giftModalBack.addEventListener(
  "click",
  function () {

    giftModalPix.hidden =
      true;

    giftModalChoice.hidden =
      false;

    giftQrContainer.hidden =
      true;

    giftQr.innerHTML =
      "";

  }
);


/* =========================
   ESC PARA FECHAR
========================== */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      !giftModal.hidden
    ) {

      closeGiftModal();

    }

  }
);


/* =========================
   COPIAR CHAVE PIX
========================== */

giftCopyPix.addEventListener(
  "click",
  async function () {

    try {

      await navigator.clipboard.writeText(
        PIX_KEY
      );


      const originalText =
        giftCopyPix.textContent;


      giftCopyPix.textContent =
        "✓ CHAVE PIX COPIADA";


      setTimeout(
        function () {

          giftCopyPix.textContent =
            originalText;

        },
        2500
      );


    } catch (error) {

      alert(
        "Não foi possível copiar automaticamente. Chave PIX: " +
        PIX_KEY
      );

    }

  }
);


/* =========================
   GERADOR DE PAYLOAD PIX
========================== */

function crc16(payload) {

  let crc =
    0xFFFF;


  for (
    let i = 0;
    i < payload.length;
    i++
  ) {

    crc ^=
      payload.charCodeAt(i) << 8;


    for (
      let bit = 0;
      bit < 8;
      bit++
    ) {

      if (
        crc & 0x8000
      ) {

        crc =
          (crc << 1) ^
          0x1021;

      } else {

        crc <<=
          1;

      }


      crc &=
        0xFFFF;

    }

  }


  return crc
    .toString(16)
    .toUpperCase()
    .padStart(4, "0");

}


function pixField(
  id,
  value
) {

  return (
    id +
    String(value.length)
      .padStart(2, "0") +
    value
  );

}


function createPixPayload(
  amount
) {

  const merchantAccountInformation =
    pixField(
      "00",
      "BR.GOV.BCB.PIX"
    ) +
    pixField(
      "01",
      PIX_KEY
    );


  let payload =
    pixField(
      "00",
      "01"
    );


  payload +=
    pixField(
      "26",
      merchantAccountInformation
    );


  payload +=
    pixField(
      "52",
      "0000"
    );


  payload +=
    pixField(
      "53",
      "986"
    );


  payload +=
    pixField(
      "54",
      Number(amount)
        .toFixed(2)
    );


  payload +=
    pixField(
      "58",
      "BR"
    );


  payload +=
    pixField(
      "59",
      PIX_NAME
        .substring(0, 25)
    );


  payload +=
    pixField(
      "60",
      PIX_CITY
        .substring(0, 15)
    );


  payload +=
    pixField(
      "62",
      pixField(
        "05",
        "***"
      )
    );


  payload +=
    "6304";


  payload +=
    crc16(payload);


  return payload;

}


/* =========================
   MOSTRAR QR CODE
========================== */

giftShowQr.addEventListener(
  "click",
  function () {

    const pixPayload =
      createPixPayload(
        selectedValue
      );


    giftQrContainer.hidden =
      false;


    giftQr.innerHTML =
      "";


    const qrImage =
      document.createElement(
        "img"
      );


    qrImage.alt =
      "QR Code para pagamento via PIX";


    qrImage.style.width =
      "220px";

    qrImage.style.height =
      "220px";


    qrImage.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
      encodeURIComponent(
        pixPayload
      );


    giftQr.appendChild(
      qrImage
    );

  }
);


/* =========================
   OUTRO VALOR
========================== */

const giftOtherButton =
  document.querySelector(
    ".gift-other-button"
  );


if (
  giftOtherButton
) {

  giftOtherButton.addEventListener(
    "click",
    function () {

      openGiftModal(
        "Outro valor",
        50,
        "Escolha o valor que deseja nos presentear."
      );

    }
  );

}


});
