// Mobile menu body scroll lock and overlay functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    // ==================== ACTIVE PAGE HIGHLIGHTING ====================
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    
    // Define dropdown pages for parent highlighting
    const dropdownPages = ['teacher.html', 'student.html', 'freeDemo.html'];
    
    // Get all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Highlight current page
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Direct page match
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
        
        // Check if current page is in a dropdown
        if (dropdownPages.includes(currentPage)) {
            const dropdownParent = document.querySelector('.nav-item.dropdown');
            if (dropdownParent && link.classList.contains('dropdown-toggle')) {
                dropdownParent.classList.add('active');
            }
        }
    });
    
    // ==================== MOBILE DROPDOWN FUNCTIONALITY ====================
    function setupMobileDropdowns() {
        // Disable Bootstrap's dropdown on mobile to avoid conflicts
        dropdownToggles.forEach(toggle => {
            toggle.removeAttribute('data-bs-toggle');
            // Clean any Bootstrap-applied state
            toggle.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');
            const menu = toggle.nextElementSibling;
            if (menu) {
                menu.classList.remove('show');
                menu.style.maxHeight = '0px';
                menu.style.paddingTop = '0';
                menu.style.paddingBottom = '0';
                menu.style.opacity = '0';
            }

            // Attach click handler
            toggle.__mobileHandler && toggle.removeEventListener('click', toggle.__mobileHandler);
            toggle.__mobileHandler = function(e) {
                e.preventDefault();
                e.stopPropagation();
                const dropdownMenu = toggle.nextElementSibling;
                const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

                // Close others
                dropdownToggles.forEach(other => {
                    if (other !== toggle) {
                        other.setAttribute('aria-expanded', 'false');
                        const otherMenu = other.nextElementSibling;
                        if (otherMenu) {
                            otherMenu.classList.remove('show');
                            otherMenu.style.maxHeight = '0px';
                            otherMenu.style.paddingTop = '0';
                            otherMenu.style.paddingBottom = '0';
                            otherMenu.style.opacity = '0';
                        }
                    }
                });

                if (!dropdownMenu) return;

                if (isExpanded) {
                    toggle.setAttribute('aria-expanded', 'false');
                    dropdownMenu.classList.remove('show');
                    dropdownMenu.style.maxHeight = '0px';
                    dropdownMenu.style.paddingTop = '0';
                    dropdownMenu.style.paddingBottom = '0';
                    dropdownMenu.style.opacity = '0';
                } else {
                    toggle.setAttribute('aria-expanded', 'true');
                    dropdownMenu.classList.add('show');
                    dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
                    dropdownMenu.style.paddingTop = '8px';
                    dropdownMenu.style.paddingBottom = '8px';
                    dropdownMenu.style.opacity = '1';
                }
            };
            toggle.addEventListener('click', toggle.__mobileHandler);
        });
    }

    function teardownMobileDropdowns() {
        // Restore Bootstrap's dropdown on desktop
        dropdownToggles.forEach(toggle => {
            toggle.setAttribute('data-bs-toggle', 'dropdown');
            toggle.removeEventListener('click', toggle.__mobileHandler);
            toggle.__mobileHandler = null;
            const menu = toggle.nextElementSibling;
            if (menu) {
                // Let Bootstrap handle visibility
                menu.style.maxHeight = '';
                menu.style.paddingTop = '';
                menu.style.paddingBottom = '';
                menu.style.opacity = '';
            }
        });
    }

    function applyDropdownMode() {
        if (window.innerWidth < 992) {
            setupMobileDropdowns();
        } else {
            teardownMobileDropdowns();
        }
    }

    applyDropdownMode();
    window.addEventListener('resize', function() {
        applyDropdownMode();
    });
    
    // ==================== MOBILE MENU FUNCTIONALITY ====================
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            setTimeout(() => {
                if (navbarCollapse.classList.contains('show')) {
                    document.body.classList.add('menu-open');
                } else {
                    document.body.classList.remove('menu-open');
                }
            }, 100);
        });
        
        // Close menu when clicking overlay
        navbarCollapse.addEventListener('click', function(e) {
            if (e.target === navbarCollapse) {
                navbarToggler.click();
            }
        });
        
        // Close menu when clicking on nav links (mobile) - but not on dropdown toggles
        const allNavLinks = navbarCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item');
        allNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
});
