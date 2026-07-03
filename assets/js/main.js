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

  /* ---- Booking CTAs -> Cal.com (single constant) ---- */
  document.querySelectorAll(".js-book").forEach(function (el) {
    el.setAttribute("href", CAL_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
  var calFallback = document.querySelector(".js-cal-fallback");
  if (calFallback) { calFallback.setAttribute("href", CAL_URL); }

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

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-q").forEach(function (q) {
    q.addEventListener("click", function () {
      q.parentElement.classList.toggle("open");
    });
  });

  /* ---- Schematic: stage tabs drive the caption ---- */
  var caption = document.querySelector(".stage-caption");
  var tabs = document.querySelectorAll(".stage-tab");
  function activate(tab) {
    tabs.forEach(function (t) { t.classList.remove("active"); });
    tab.classList.add("active");
    if (caption) {
      caption.innerHTML =
        '<span class="cap-label">' + tab.textContent + "</span>" +
        (tab.getAttribute("data-desc") || "");
    }
  }
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () { activate(tab); });
  });
  // Clicking a node inside the SVG activates the matching tab
  document.querySelectorAll(".schematic .node-hit").forEach(function (node) {
    node.addEventListener("click", function () {
      var i = parseInt(node.getAttribute("data-stage"), 10);
      if (tabs[i]) { activate(tabs[i]); }
    });
  });
  if (tabs.length) { activate(tabs[0]); }

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
