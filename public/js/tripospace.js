// TripoSpace Interactive UI Engine
document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  initCategoryScroll();
  initTaxToggle();
  initWishlistToggle();
  initMapViewToggle();
  initBookingCalculator();
  initFilterModal();
  initNavSearch();
});

// 1. Dark Mode (Syncs all theme toggle buttons across mobile and desktop)
function initDarkMode() {
  const toggleBtns = document.querySelectorAll(".theme-toggle-btn, #themeToggleBtn");
  if (!toggleBtns.length) return;

  const currentTheme = localStorage.getItem("tripospace_theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  
  document.documentElement.setAttribute("data-theme", currentTheme);
  document.documentElement.setAttribute("data-bs-theme", currentTheme);

  const updateIcons = (theme) => {
    toggleBtns.forEach((btn) => {
      btn.innerHTML = theme === "dark" ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });
  };

  updateIcons(currentTheme);

  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      document.documentElement.setAttribute("data-bs-theme", newTheme);
      localStorage.setItem("tripospace_theme", newTheme);
      updateIcons(newTheme);
    });
  });
}

// 2. Category Scroll Controls & Drag
function initCategoryScroll() {
  const track = document.getElementById("categoryTrack");
  const scrollLeftBtn = document.getElementById("scrollLeftBtn");
  const scrollRightBtn = document.getElementById("scrollRightBtn");
  const fadeLeft = document.getElementById("categoryFadeLeft");
  const fadeRight = document.getElementById("categoryFadeRight");

  if (!track || !scrollLeftBtn || !scrollRightBtn) return;

  scrollLeftBtn.addEventListener("click", () => {
    track.scrollBy({ left: -260, behavior: "smooth" });
  });

  scrollRightBtn.addEventListener("click", () => {
    track.scrollBy({ left: 260, behavior: "smooth" });
  });

  const checkScrollArrows = () => {
    const isAtStart = track.scrollLeft <= 5;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const isAtEnd = track.scrollLeft >= maxScroll - 5;

    if (fadeLeft) fadeLeft.classList.toggle("visible", !isAtStart);
    if (fadeRight) fadeRight.classList.toggle("visible", !isAtEnd);
  };

  track.addEventListener("scroll", checkScrollArrows, { passive: true });
  window.addEventListener("resize", checkScrollArrows);
  // Initial check after DOM and images settle
  setTimeout(checkScrollArrows, 100);

  // Mouse Drag-to-Scroll Support
  let isDown = false;
  let startX = 0;
  let scrollStart = 0;
  let hasMoved = false;

  track.addEventListener("mousedown", (e) => {
    // Only left click
    if (e.button !== 0) return;
    isDown = true;
    hasMoved = false;
    startX = e.pageX - track.offsetLeft;
    scrollStart = track.scrollLeft;
    track.classList.add("dragging");
  });

  window.addEventListener("mouseup", () => {
    if (isDown) {
      isDown = false;
      track.classList.remove("dragging");
      setTimeout(() => { hasMoved = false; }, 50);
    }
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX);
    if (Math.abs(walk) > 4) {
      hasMoved = true;
      e.preventDefault();
      track.scrollLeft = scrollStart - walk;
    }
  });

  // Prevent link navigation if dragging
  track.querySelectorAll(".category-pill").forEach(pill => {
    pill.addEventListener("click", (e) => {
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });
}

// 3. Tax Toggle (+18% GST Calculation) - Synchronizes desktop and mobile switches
function initTaxToggle() {
  const switches = [
    document.getElementById("taxToggleSwitch"),
    document.getElementById("taxToggleSwitchMobile")
  ].filter(Boolean);

  if (!switches.length) return;

  const updateTaxes = (isTaxOn) => {
    switches.forEach(s => { s.checked = isTaxOn; });
    const cards = document.querySelectorAll(".listing-card-modern");

    cards.forEach((card) => {
      const basePrice = parseFloat(card.dataset.price || 0);
      const priceValEl = card.querySelector(".price-val");
      const unitEl = card.querySelector(".price-unit");
      const taxEl = card.querySelector(".card-tax-calc");

      if (isTaxOn) {
        const totalWithTax = Math.round(basePrice * 1.18);
        if (priceValEl) priceValEl.textContent = "₹" + totalWithTax.toLocaleString("en-IN");
        if (unitEl) unitEl.textContent = " total after taxes";
        if (taxEl) taxEl.style.display = "inline";
      } else {
        if (priceValEl) priceValEl.textContent = "₹" + Math.round(basePrice).toLocaleString("en-IN");
        if (unitEl) unitEl.textContent = " / night";
        if (taxEl) taxEl.style.display = "none";
      }
    });
  };

  switches.forEach(sw => {
    sw.addEventListener("change", (e) => {
      updateTaxes(e.target.checked);
    });
  });
}

// 4. Wishlist AJAX Toggle with Animation
function initWishlistToggle() {
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".wishlist-btn");
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const listingId = btn.dataset.id;
    if (!listingId) return;

    try {
      const res = await fetch(`/wishlist/toggle/${listingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      if (data.success) {
        const icon = btn.querySelector("i");
        if (data.isSaved) {
          btn.classList.add("saved");
          icon.className = "fa-solid fa-heart";
          icon.style.color = "#ff385c";
        } else {
          btn.classList.remove("saved");
          icon.className = "fa-regular fa-heart";
          icon.style.color = "";
        }
      }
    } catch (err) {
      console.error("Failed to toggle wishlist:", err);
    }
  });
}

// 5. Explore Map / Grid View Toggle
function initMapViewToggle() {
  const toggleBtn = document.getElementById("mapViewToggleBtn");
  const gridContainer = document.getElementById("listingsGridContainer");
  const mapContainer = document.getElementById("exploreMapContainer");

  if (!toggleBtn || !gridContainer || !mapContainer) return;

  let mapInstance = null;

  toggleBtn.addEventListener("click", () => {
    const isMapShowing = mapContainer.style.display === "block";

    if (isMapShowing) {
      // Switch to Grid View
      mapContainer.style.display = "none";
      gridContainer.style.display = "flex";
      toggleBtn.innerHTML = "<i class=\"fa-solid fa-map\"></i> Show Map";
    } else {
      // Switch to Map View
      gridContainer.style.display = "none";
      mapContainer.style.display = "block";
      toggleBtn.innerHTML = "<i class=\"fa-solid fa-list\"></i> Show List";

      if (!mapInstance) {
        mapInstance = L.map("exploreLeafletMap").setView([20.5937, 78.9629], 3);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapInstance);

        const markers = [];
        const listingCards = document.querySelectorAll(".listing-card-modern");

        listingCards.forEach((card) => {
          const lat = parseFloat(card.dataset.lat);
          const lng = parseFloat(card.dataset.lng);
          const title = card.dataset.title;
          const price = card.dataset.price;
          const img = card.dataset.img;
          const id = card.dataset.id;

          if (lat && lng) {
            // Create price badge marker
            const priceIcon = L.divIcon({
              className: "map-price-marker",
              html: `<div style="background: white; color: #222; font-weight: 800; padding: 4px 8px; border-radius: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.25); border: 1px solid #ddd; font-size: 13px; white-space: nowrap;">₹${Number(price).toLocaleString("en-IN")}</div>`,
              iconSize: [60, 26],
            });

            const marker = L.marker([lat, lng], { icon: priceIcon }).addTo(mapInstance);
            const popupHtml = `
              <div style="width: 200px; padding: 4px;">
                <img src="${img}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;">
                <h6 style="font-size: 14px; font-weight: 700; margin: 0 0 4px 0; color: #222;">${title}</h6>
                <p style="margin: 0; font-size: 13px; font-weight: 800; color: #222;">₹${Number(price).toLocaleString("en-IN")} <span style="font-weight: 400; color: #717171;">/ night</span></p>
                <a href="/listings/${id}" style="display: block; margin-top: 8px; text-align: center; background: #ff385c; color: white; padding: 4px 8px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: 600;">View Details</a>
              </div>
            `;
            marker.bindPopup(popupHtml);
            markers.push([lat, lng]);
          }
        });

        if (markers.length > 0) {
          mapInstance.fitBounds(markers, { padding: [40, 40] });
        }
      } else {
        setTimeout(() => mapInstance.invalidateSize(), 100);
      }
    }
  });
}

// 6. Booking Calculator (Detail Page)
function initBookingCalculator() {
  const checkInInput = document.getElementById("bookingCheckIn");
  const checkOutInput = document.getElementById("bookingCheckOut");
  const guestSelect = document.getElementById("bookingGuests");
  const nightlyRateEl = document.getElementById("bookingNightlyRate");

  if (!checkInInput || !checkOutInput || !nightlyRateEl) return;

  const basePrice = parseFloat(nightlyRateEl.dataset.price || 0);

  // Set default dates (today & 3 days later)
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 1);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 4);

  const formatDate = (d) => d.toISOString().split("T")[0];

  if (!checkInInput.value) checkInInput.value = formatDate(defaultCheckIn);
  if (!checkOutInput.value) checkOutInput.value = formatDate(defaultCheckOut);

  checkInInput.min = formatDate(today);
  checkOutInput.min = formatDate(defaultCheckIn);

  const calculateTotal = () => {
    const checkIn = new Date(checkInInput.value);
    const checkOut = new Date(checkOutInput.value);

    let nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    if (isNaN(nights) || nights <= 0) nights = 1;

    const subtotal = basePrice * nights;
    const cleaningFee = 500;
    const serviceFee = Math.round(subtotal * 0.08);
    const taxes = Math.round((subtotal + cleaningFee + serviceFee) * 0.18);
    const grandTotal = subtotal + cleaningFee + serviceFee + taxes;

    const nightsLabelEl = document.getElementById("nightsCountLabel");
    const subtotalEl = document.getElementById("bookingSubtotal");
    const cleaningFeeEl = document.getElementById("bookingCleaningFee");
    const serviceFeeEl = document.getElementById("bookingServiceFee");
    const taxesEl = document.getElementById("bookingTaxes");
    const grandTotalEl = document.getElementById("bookingGrandTotal");

    if (nightsLabelEl) nightsLabelEl.textContent = `₹${basePrice.toLocaleString("en-IN")} × ${nights} ${nights === 1 ? "night" : "nights"}`;
    if (subtotalEl) subtotalEl.textContent = "₹" + subtotal.toLocaleString("en-IN");
    if (cleaningFeeEl) cleaningFeeEl.textContent = "₹" + cleaningFee.toLocaleString("en-IN");
    if (serviceFeeEl) serviceFeeEl.textContent = "₹" + serviceFee.toLocaleString("en-IN");
    if (taxesEl) taxesEl.textContent = "₹" + taxes.toLocaleString("en-IN");
    if (grandTotalEl) grandTotalEl.textContent = "₹" + grandTotal.toLocaleString("en-IN");
  };

  checkInInput.addEventListener("change", () => {
    const nextDay = new Date(checkInInput.value);
    nextDay.setDate(nextDay.getDate() + 1);
    checkOutInput.min = formatDate(nextDay);
    if (new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
      checkOutInput.value = formatDate(nextDay);
    }
    calculateTotal();
  });

  checkOutInput.addEventListener("change", calculateTotal);
  calculateTotal();

  // Reserve button click handler
  const reserveBtn = document.getElementById("bookingReserveBtn");
  if (reserveBtn) {
    reserveBtn.addEventListener("click", () => {
      const modal = new bootstrap.Modal(document.getElementById("reservationSuccessModal"));
      modal.show();
    });
  }
}

// 7. Filter Modal Controls
function initFilterModal() {
  const minSlider = document.getElementById("filterPriceMinSlider");
  const maxSlider = document.getElementById("filterPriceMaxSlider");
  const minInput = document.getElementById("filterPriceMinInput");
  const maxInput = document.getElementById("filterPriceMaxInput");

  if (!minSlider || !maxSlider || !minInput || !maxInput) return;

  minSlider.addEventListener("input", () => {
    minInput.value = minSlider.value;
  });

  maxSlider.addEventListener("input", () => {
    maxInput.value = maxSlider.value;
  });

  minInput.addEventListener("change", () => {
    minSlider.value = minInput.value;
  });

  maxInput.addEventListener("change", () => {
    maxSlider.value = maxInput.value;
  });
}

// 8. Navigation Search Submission
function initNavSearch() {
  const searchBars = document.querySelectorAll(".nav-search-bar");
  searchBars.forEach(bar => {
    const btn = bar.querySelector(".nav-search-btn");
    const input = bar.querySelector(".nav-search-input");

    if (btn && input) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
          window.location.href = `/listings?search=${encodeURIComponent(query)}`;
        } else {
          window.location.href = "/listings";
        }
      });
    }

    bar.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = input ? input.value.trim() : "";
      if (query) {
        window.location.href = `/listings?search=${encodeURIComponent(query)}`;
      } else {
        window.location.href = "/listings";
      }
    });
  });
}

