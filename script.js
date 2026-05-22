document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const mainHeader = document.querySelector('.main-header');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('a');
    const patrocinioForm = document.getElementById('patrocinioForm');
    const formFeedback = document.getElementById('formFeedback');
    const revealElements = document.querySelectorAll('.reveal');

    /* ==========================================================================
       1. HEADER STICKY EFFECTS
       ========================================================================== */
    const handleScroll = () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    /* ==========================================================================
       2. MOBILE MENU TOGGLE
       ========================================================================== */
    const toggleMenu = () => {
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu on click of link (for mobile scrolling experience)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================================================
       3. INTERSECTION OBSERVER (SCROLL REVEAL ANIMATION)
       ========================================================================== */
    if ('IntersectionObserver' in window) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Animates only once
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(elem => {
            revealObserver.observe(elem);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(elem => {
            elem.classList.add('active');
        });
    }

    /* ==========================================================================
       4. FORM SUBMISSION (CORPORATE LEAD CAPTURE)
       ========================================================================== */
    if (patrocinioForm) {
        patrocinioForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values for visual validation
            const nome = document.getElementById('nome').value;
            const empresa = document.getElementById('empresa').value;
            const email = document.getElementById('email').value;
            
            // Change button state
            const submitBtn = patrocinioForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processando solicitação...';
            
            // Simulating API Call / Submission delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                // Show success message
                formFeedback.className = 'form-feedback success';
                formFeedback.innerHTML = `
                    <i class="fa-solid fa-circle-check"></i>
                    <strong>Obrigado, ${nome}!</strong> <br> 
                    A equipe comercial da Cia dos Ventos enviará o book com as cotas de patrocínio corporativo para o e-mail <strong>${email}</strong> em até 24 horas.
                `;
                formFeedback.classList.remove('hide');
                
                // Reset form
                patrocinioForm.reset();
                
                // Smooth scroll to feedback message
                formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1500);
        });
    }
});
