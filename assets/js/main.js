/* ============================================================
   PipelineWorks — site behaviour
   Swap these two constants when the real accounts are ready:
   ============================================================ */
var CAL_URL = "https://cal.com/pipelineworks/20min";          // TODO: replace with real Cal.com booking link
var FORMSPREE_ENDPOINT = "https://formspree.io/f/FORM_ID";     // TODO: replace FORM_ID with real Formspree form id

document.addEventListener("DOMContentLoaded", function () {
  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* ---- Booking CTAs -> scroll to contact section ---- */
  var contactSection = document.getElementById("contact");
  if (!contactSection) {
    var contactForm = document.querySelector(".lead-form");
    var contactFormSection = contactForm ? contactForm.closest("section") : null;
    if (contactFormSection) {
      contactFormSection.setAttribute("id", "contact");
      contactSection = contactFormSection;
    }
  }

  document.querySelectorAll(".js-book").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    el.setAttribute("href", "#contact");
  });
  var calFallback = document.querySelector(".js-cal-fallback");
  if (calFallback) { calFallback.setAttribute("href", "#contact"); }

  /* ---- "Order the audit" CTAs -> scroll to form, preselect interest ---- */
  var form = document.querySelector(".lead-form");
  var interestField = form ? form.querySelector('[name="interest"]') : null;
  document.querySelectorAll(".js-interest").forEach(function (el) {
    el.addEventListener("click", function (e) {
      var value = el.getAttribute("data-interest") || "general";
      var contact = document.querySelector("#contact");
      if (contact) {
        e.preventDefault();
        if (interestField) { interestField.value = value; }
        contact.scrollIntoView({ behavior: "smooth", block: "start" });
        var first = form ? form.querySelector("input, textarea") : null;
        if (first) { setTimeout(function () { first.focus(); }, 400); }
      }
    });
  });

  /* ---- Lead form -> Formspree (no backend) ---- */
  if (form) {
    form.setAttribute("action", FORMSPREE_ENDPOINT);
    form.setAttribute("method", "POST");
    var success = form.parentElement.querySelector(".form-success");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      fetch(FORMSPREE_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (res.ok) {
            form.style.display = "none";
            if (success) { success.classList.add("show"); }
          } else {
            form.submit(); // graceful fallback to normal POST
          }
        })
        .catch(function () { form.submit(); });
    });
  }
});
