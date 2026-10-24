
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // PART 1: FORM VALIDATION
    // =====================================

    function showError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);

        if (input && error) {
            input.classList.add("input-error");
            input.setAttribute("aria-invalid", "true");
            error.textContent = message;
        }
    }

    function clearError(inputId, errorId) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);

        if (input && error) {
            input.classList.remove("input-error");
            input.removeAttribute("aria-invalid");
            error.textContent = "";
        }
    }

    function isValidEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    // Registration Form
    const registrationForm = document.getElementById("registrationForm");

    if (registrationForm) {
        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("registerName").value.trim();
            const email = document.getElementById("registerEmail").value.trim();
            const password = document.getElementById("registerPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const success = document.getElementById("registrationSuccess");

            let valid = true;
            success.textContent = "";

            const fields = [
                ["registerName", "registerNameError"],
                ["registerEmail", "registerEmailError"],
                ["registerPassword", "registerPasswordError"],
                ["confirmPassword", "confirmPasswordError"]
            ];

            fields.forEach(function (field) {
                clearError(field[0], field[1]);
            });

            if (name === "") {
                showError("registerName", "registerNameError", "Please enter your name.");
                valid = false;
            }

            if (!isValidEmail(email)) {
                showError("registerEmail", "registerEmailError", "Please enter a valid email.");
                valid = false;
            }

            if (password.length < 8) {
                showError("registerPassword", "registerPasswordError", "Password must be at least 8 characters.");
                valid = false;
            }

            if (confirmPassword !== password || confirmPassword === "") {
                showError("confirmPassword", "confirmPasswordError", "Passwords do not match.");
                valid = false;
            }

            if (valid) {
                success.textContent = "Registration successful! Demo completed.";
                registrationForm.reset();
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const subject = document.getElementById("contactSubject").value;
            const message = document.getElementById("contactMessage").value.trim();
            const success = document.getElementById("contactSuccess");

            let valid = true;
            success.textContent = "";

            const fields = [
                ["contactName", "contactNameError"],
                ["contactEmail", "contactEmailError"],
                ["contactSubject", "contactSubjectError"],
                ["contactMessage", "contactMessageError"]
            ];

            fields.forEach(function (field) {
                clearError(field[0], field[1]);
            });

            if (name === "") {
                showError("contactName", "contactNameError", "Please enter your name.");
                valid = false;
            }

            if (!isValidEmail(email)) {
                showError("contactEmail", "contactEmailError", "Please enter a valid email.");
                valid = false;
            }

            if (subject === "") {
                showError("contactSubject", "contactSubjectError", "Please select a subject.");
                valid = false;
            }

            if (message === "") {
                showError("contactMessage", "contactMessageError", "Please write your message.");
                valid = false;
            }

            if (valid) {
                success.textContent = "Your message passed validation! This is a demo form.";
                contactForm.reset();
            }
        });
    }

    // =====================================
    // PART 2: FAQ ACCORDION
    // =====================================

    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            const faqItem = question.parentElement;
            const isOpen = faqItem.classList.contains("active");

            faqItem.classList.toggle("active");
            question.setAttribute("aria-expanded", String(!isOpen));
        });
    });

    // =====================================
    // PART 3: POPUP
    // =====================================

    const popup = document.getElementById("subscriptionPopup");
    const openButtons = document.querySelectorAll("[data-open-popup]");
    const closeButtons = document.querySelectorAll("[data-close-popup]");

    let previousFocus = null;

    function openPopup() {
        if (!popup) return;

        previousFocus = document.activeElement;

        popup.classList.add("show");
        popup.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        const closeButton = popup.querySelector("[data-close-popup]");

        if (closeButton) closeButton.focus();
    }

    function closePopup() {
        if (!popup) return;

        popup.classList.remove("show");
        popup.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        if (previousFocus && typeof previousFocus.focus === "function") {
            previousFocus.focus();
        }
    }

    openButtons.forEach(function (button) {
        button.addEventListener("click", openPopup);
    });

    closeButtons.forEach(function (button) {
        button.addEventListener("click", closePopup);
    });

    if (popup) {
        popup.addEventListener("click", function (event) {
            if (event.target === popup) closePopup();
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && popup.classList.contains("show")) {
                closePopup();
            }
        });
    }

    // Subscription Form
    const subscriptionForm = document.getElementById("subscriptionForm");

    if (subscriptionForm) {
        subscriptionForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("subscriberName").value.trim();
            const email = document.getElementById("subscriberEmail").value.trim();
            const message = document.getElementById("subscriptionMessage");

            if (name === "") {
                message.style.color = "#dc3545";
                message.textContent = "Please enter your name.";
                return;
            }

            if (!isValidEmail(email)) {
                message.style.color = "#dc3545";
                message.textContent = "Please enter a valid email.";
                return;
            }

            message.style.color = "#198754";
            message.textContent = "Subscription successful! Demo completed.";
            subscriptionForm.reset();
        });
    }

    // =====================================
    // PART 4: BACKGROUND COLOR AND TIME
    // =====================================

    const changeColorBtn = document.getElementById("changeColorBtn");
    const resetColorBtn = document.getElementById("resetColorBtn");

    const backgroundColors = [
        "#fffaf4", "#fff0dd", "#ffe8e8",
        "#e8f4ff", "#eaf8ec", "#f3eaff"
    ];

    let colorIndex = 0;

    if (changeColorBtn) {
        changeColorBtn.addEventListener("click", function () {
            colorIndex = (colorIndex + 1) % backgroundColors.length;
            document.body.style.backgroundColor = backgroundColors[colorIndex];
        });
    }

    if (resetColorBtn) {
        resetColorBtn.addEventListener("click", function () {
            colorIndex = 0;
            document.body.style.backgroundColor = backgroundColors[0];
        });
    }

    const currentDate = document.getElementById("currentDate");
    const currentTime = document.getElementById("currentTime");

    function updateDateTime() {
        if (!currentDate || !currentTime) return;

        const now = new Date();

        currentDate.textContent = now.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
        });

        currentTime.textContent = now.toLocaleTimeString("en-US");
    }

    if (currentDate && currentTime) {
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }

    // =====================================
    // PART 5: SOUND EFFECTS
    // =====================================

    let audioContext;

    function playSound() {
        try {
            const AudioClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioClass) return;

            if (!audioContext) audioContext = new AudioClass();
            if (audioContext.state === "suspended") audioContext.resume();

            const oscillator = audioContext.createOscillator();
            const volume = audioContext.createGain();

            oscillator.connect(volume);
            volume.connect(audioContext.destination);

            const now = audioContext.currentTime;

            oscillator.type = "sine";
            oscillator.frequency.value = 650;

            volume.gain.setValueAtTime(0.04, now);
            volume.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

            oscillator.start(now);
            oscillator.stop(now + 0.12);
        } catch (error) {
            console.log("Sound unavailable.");
        }
    }

    // =====================================
    // PART 6: INTERACTIVE MENU
    // =====================================

    const products = [
        {
            name: "Chicken Sandwich Combo",
            category: "burger",
            price: 3200,
            image: "images/sandwich.avif",
            description: "Crispy chicken with pickles and signature sauce."
        },
        {
            name: "Spicy Chicken Tenders",
            category: "chicken",
            price: 2400,
            image: "images/tenders.avif",
            description: "Tender chicken strips with Louisiana spices."
        },
        {
            name: "Chicken Wings",
            category: "chicken",
            price: 2100,
            image: "images/wings.avif",
            description: "Golden crispy wings with a spicy flavor."
        },
        {
            name: "Cajun Fries",
            category: "sides",
            price: 900,
            image: "images/fries.avif",
            description: "Crispy fries with Cajun seasoning."
        },
        {
            name: "Classic Biscuit",
            category: "sides",
            price: 450,
            image: "images/biscuit.avif",
            description: "Soft buttery biscuit with a golden crust."
        },
        {
            name: "Popeyes Special",
            category: "chicken",
            price: 2500,
            image: "images/pop.avif",
            description: "Delicious Louisiana-style crispy chicken."
        }
    ];

    const menuManager = {
        formatPrice: function (price) {
            return price.toLocaleString("en-US") + " ₸";
        }
    };

    const dynamicMenu = document.getElementById("dynamicMenu");
    const menuSearch = document.getElementById("menuSearch");
    const productCount = document.getElementById("productCount");
    const filterButtons = document.querySelectorAll(".menu-filter-btn");

    let selectedCategory = "all";

    function displayProducts(productList) {
        if (!dynamicMenu) return;

        dynamicMenu.innerHTML = "";

        if (productList.length === 0) {
            dynamicMenu.innerHTML = `
                <div class="col-12">
                    <p class="empty-menu-message">
                        No products found. Try another search!
                    </p>
                </div>
            `;
        }

        productList.forEach(function (product) {
            const card = document.createElement("div");
            card.className = "col-lg-4 col-md-6";

            card.innerHTML = `
                <div class="food-card">
                    <div class="food-image-box">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="food-card-body">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="food-card-bottom">
                            <span class="price">
                                ${menuManager.formatPrice(product.price)}
                            </span>
                            <span class="menu-portion">
                                ${product.category}
                            </span>
                        </div>
                    </div>
                </div>
            `;

            dynamicMenu.appendChild(card);
        });

        if (productCount) {
            productCount.textContent = productList.length + " products found";
        }
    }

    function filterByCategory(category) {
        switch (category) {
            case "chicken":
                return products.filter(product => product.category === "chicken");
            case "burger":
                return products.filter(product => product.category === "burger");
            case "sides":
                return products.filter(product => product.category === "sides");
            case "drinks":
                return products.filter(product => product.category === "drinks");
            default:
                return products;
        }
    }

    function updateMenu() {
        const searchText = menuSearch
            ? menuSearch.value.toLowerCase().trim()
            : "";

        const filtered = filterByCategory(selectedCategory).filter(function (product) {
            return product.name.toLowerCase().includes(searchText) ||
                   product.description.toLowerCase().includes(searchText);
        });

        displayProducts(filtered);
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectedCategory = button.dataset.category;

            filterButtons.forEach(function (otherButton) {
                otherButton.classList.remove("active", "btn-orange");
                otherButton.classList.add("btn-outline-dark");
            });

            button.classList.add("active", "btn-orange");
            button.classList.remove("btn-outline-dark");

            playSound();
            updateMenu();
        });
    });

    if (menuSearch) {
        menuSearch.addEventListener("input", updateMenu);
    }

    if (dynamicMenu) {
        displayProducts(products);
    }

    // =====================================
    // PART 7: STAR RATING
    // =====================================

    const ratingStars = document.querySelectorAll(".rating-star");
    const ratingMessage = document.getElementById("ratingMessage");

    ratingStars.forEach(function (star) {
        star.addEventListener("click", function () {
            const rating = Number(star.dataset.rating);

            ratingStars.forEach(function (item) {
                item.classList.toggle(
                    "selected",
                    Number(item.dataset.rating) <= rating
                );
            });

            const messages = {
                1: "Thank you! We will improve.",
                2: "Thanks for your honest feedback!",
                3: "Good! We appreciate your rating!",
                4: "Great! We are happy you enjoyed it!",
                5: "Amazing! Thank you for loving Popeyes!"
            };

            if (ratingMessage) {
                ratingMessage.textContent = messages[rating];
            }

            playSound();
        });
    });

    // =====================================
    // PART 8: KEYBOARD NAVIGATION
    // =====================================

    const navigationLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navigationLinks.forEach(function (link, index) {
        link.addEventListener("keydown", function (event) {
            let nextIndex;

            switch (event.key) {
                case "ArrowRight":
                    nextIndex = (index + 1) % navigationLinks.length;
                    break;

                case "ArrowLeft":
                    nextIndex = (index - 1 + navigationLinks.length) %
                                navigationLinks.length;
                    break;

                default:
                    return;
            }

            event.preventDefault();
            navigationLinks[nextIndex].focus();
        });
    });

    // =====================================
    // PART 9: MULTI-STEP ORDER FORM
    // =====================================

    const orderForm = document.getElementById("orderForm");

    if (orderForm) {

        const steps = [
            document.getElementById("orderStep1"),
            document.getElementById("orderStep2"),
            document.getElementById("orderStep3")
        ];

        const stepIndicator = document.getElementById("stepIndicator");
        const progressBar = document.getElementById("orderProgress");
        const errorMessage = document.getElementById("orderError");
        const orderSummary = document.getElementById("orderSummary");
        const orderSuccess = document.getElementById("orderSuccess");

        const customerName = document.getElementById("customerName");
        const customerPhone = document.getElementById("customerPhone");
        const orderProduct = document.getElementById("orderProduct");
        const orderQuantity = document.getElementById("orderQuantity");

        let currentStep = 0;

        // Higher-order function with callback
        function changeStep(stepNumber, callback) {
            currentStep = stepNumber;

            steps.forEach(function (step, index) {
                step.classList.toggle("d-none", index !== currentStep);
            });

            stepIndicator.textContent = "Step " + (currentStep + 1) + " of 3";

            const progress = ((currentStep + 1) / 3) * 100;
            progressBar.style.width = progress + "%";
            progressBar.setAttribute("aria-valuenow", Math.round(progress));

            errorMessage.textContent = "";

            if (typeof callback === "function") {
                callback();
            }
        }

        function validateFirstStep() {
            const name = customerName.value.trim();
            const phone = customerPhone.value.trim();
            const digits = phone.replace(/\D/g, "");

            if (name.length < 2) {
                errorMessage.textContent = "Please enter your full name.";
                customerName.focus();
                return false;
            }

            if (digits.length < 10 || digits.length > 11) {
                errorMessage.textContent = "Please enter a valid phone number.";
                customerPhone.focus();
                return false;
            }

            return true;
        }

        function validateSecondStep() {
            const price = Number(orderProduct.value);
            const quantity = Number(orderQuantity.value);

            if (!price) {
                errorMessage.textContent = "Please choose your meal.";
                orderProduct.focus();
                return false;
            }

            if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
                errorMessage.textContent = "Quantity must be between 1 and 20.";
                orderQuantity.focus();
                return false;
            }

            return true;
        }

        function displayOrderSummary() {
            const option = orderProduct.options[orderProduct.selectedIndex];
            const price = Number(orderProduct.value);
            const quantity = Number(orderQuantity.value);
            const total = price * quantity;

            const summaryItems = [
                ["Customer", customerName.value.trim()],
                ["Phone", customerPhone.value.trim()],
                ["Product", option.textContent.trim()],
                ["Quantity", quantity],
                ["Total Price", total.toLocaleString("en-US") + " ₸"]
            ];

            orderSummary.innerHTML = "";

            summaryItems.forEach(function (item) {
                const row = document.createElement("div");
                row.className = "order-summary-row";

                const label = document.createElement("strong");
                label.textContent = item[0] + ":";

                const value = document.createElement("span");
                value.textContent = item[1];

                row.appendChild(label);
                row.appendChild(value);

                orderSummary.appendChild(row);
            });
        }

        document.getElementById("nextStep1").addEventListener("click", function () {
            if (validateFirstStep()) {
                changeStep(1, function () {
                    orderProduct.focus();
                });
                playSound();
            }
        });

        document.getElementById("backStep2").addEventListener("click", function () {
            changeStep(0);
        });

        document.getElementById("nextStep2").addEventListener("click", function () {
            if (validateSecondStep()) {
                changeStep(2, displayOrderSummary);
                playSound();
            }
        });

        document.getElementById("backStep3").addEventListener("click", function () {
            changeStep(1);
        });

        orderForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!validateFirstStep()) {
                changeStep(0);
                return;
            }

            if (!validateSecondStep()) {
                changeStep(1);
                return;
            }

            orderForm.classList.add("d-none");
            orderSuccess.classList.remove("d-none");
            orderSuccess.classList.add("success-animation");

            stepIndicator.textContent = "Completed!";
            progressBar.style.width = "100%";
            progressBar.setAttribute("aria-valuenow", "100");

            playSound();

            // Demo only: no actual order is sent.
            console.log("Demo order completed.");
        });

        changeStep(0);
    }

});

// ========================================
// ASSIGNMENT 5 - DARK MODE AND ORDER LINK
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const navigation = document.querySelector(".navbar-nav");

    if (!navigation) {
        return;
    }

    // 1. Add Order link to navigation
    const orderLinkExists =
        navigation.querySelector('a[href="order.html"]');

    if (!orderLinkExists) {

        const orderItem = document.createElement("li");
        orderItem.className = "nav-item";

        const orderLink = document.createElement("a");
        orderLink.className = "nav-link";
        orderLink.href = "order.html";
        orderLink.textContent = "Order";

        orderItem.appendChild(orderLink);

        const contactButton = navigation.querySelector(".btn-orange");

        if (contactButton) {
            navigation.insertBefore(
                orderItem,
                contactButton.closest(".nav-item")
            );
        } else {
            navigation.appendChild(orderItem);
        }
    }

    // 2. Create theme button
    const themeItem = document.createElement("li");
    themeItem.className = "nav-item";

    const themeButton = document.createElement("button");

    themeButton.type = "button";
    themeButton.id = "themeToggle";
    themeButton.className = "theme-toggle-btn";
    themeButton.setAttribute("aria-label", "Toggle dark mode");

    themeItem.appendChild(themeButton);
    navigation.appendChild(themeItem);

    // 3. Apply theme
    function applyTheme(theme) {

        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            themeButton.textContent = "☀ Light";
            themeButton.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        } else {
            document.body.classList.remove("dark-mode");
            themeButton.textContent = "☾ Dark";
            themeButton.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );
        }
    }

    // 4. Remember selected theme
    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem("popeyesTheme") || "light";
    } catch (error) {
        savedTheme = "light";
    }

    applyTheme(savedTheme);

    // 5. Button event listener
    themeButton.addEventListener("click", function () {

        const isDark =
            document.body.classList.contains("dark-mode");

        const nextTheme = isDark ? "light" : "dark";

        applyTheme(nextTheme);

        try {
            localStorage.setItem("popeyesTheme", nextTheme);
        } catch (error) {
            console.log("Theme preference was not saved.");
        }

        // Button animation
        themeButton.classList.remove("theme-click");

        void themeButton.offsetWidth;

        themeButton.classList.add("theme-click");

    });

});

