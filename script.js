document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile nav if open
            const mobileNav = document.querySelector('.main-nav');
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        });
    });

    // --- Fade-in on Scroll Effect ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start 50px before it hits the bottom of viewport
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- Pricing Tab Switching ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const pricingContents = document.querySelectorAll('.pricing-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            pricingContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and its corresponding content
            button.classList.add('active');
            const targetId = button.dataset.target;
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    mobileNavToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const expanded = mainNav.classList.contains('active');
        mobileNavToggle.setAttribute('aria-expanded', expanded);
    });

    // Close mobile nav when clicking outside (optional, but good UX)
    document.addEventListener('click', (event) => {
        if (!mainNav.contains(event.target) && !mobileNavToggle.contains(event.target) && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileNavToggle.setAttribute('aria-expanded', false);
        }
    });

    // Handle submenu in mobile view
    const navItemsWithSubmenu = document.querySelectorAll('.main-nav ul li');
    navItemsWithSubmenu.forEach(item => {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            item.addEventListener('click', (e) => {
                // Only toggle if in mobile view (nav is active)
                if (mainNav.classList.contains('active')) {
                    e.stopPropagation(); // Prevent closing nav immediately
                    item.classList.toggle('open');
                    const submenuHeight = submenu.scrollHeight; // Get actual height
                    submenu.style.maxHeight = item.classList.contains('open') ? `${submenuHeight}px` : '0';
                }
            });
        }
    });
});

// --- Modal Functions (Global scope for onclick attributes) ---
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore background scrolling
    }
}

// Close modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');

    if (event.target == loginModal) {
        closeModal('loginModal');
    }
    if (event.target == registerModal) {
        closeModal('registerModal');
    }
});

