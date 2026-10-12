document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        }
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const sections = document.querySelectorAll('.section-title, .skill-card, .project-card, .timeline-item, .service-card, .about-content p, .objective-text');

    // Add base reveal class
    sections.forEach(el => {
        el.classList.add('reveal-element');
        observer.observe(el);
    });

    // --- Project Gallery Modal Logic ---
    const projectsData = {
        'centro-assistenza': {
            title: 'Centro Assistenza Italiani',
            description: 'Captures d\'écran de l\'application mobile - Interface et fonctionnalités.',
            images: [
                'assets/projects/centro-assistenza/1.jpg',
                'assets/projects/centro-assistenza/2.jpg',
                'assets/projects/centro-assistenza/3.jpg',
                'assets/projects/centro-assistenza/4.jpg',
                'assets/projects/centro-assistenza/5.jpg',
                'assets/projects/centro-assistenza/6.jpeg',
                'assets/projects/centro-assistenza/7.jpeg',
                'assets/projects/centro-assistenza/8.jpeg',
                'assets/projects/centro-assistenza/9.jpeg'
            ]
        },
        'egrs': {
            title: 'eGRS – Gestion Redevance STEG',
            description: 'Captures d\'écran de l\'application mobile - Interface et fonctionnalités.',
            images: [
                'assets/projects/egrs/1.jpg',
                'assets/projects/egrs/2.jpg',
                'assets/projects/egrs/3.jpg',
                'assets/projects/egrs/4.jpg',
                'assets/projects/egrs/5.jpg',
                'assets/projects/egrs/6.jpeg',
                'assets/projects/egrs/7.jpeg',
                'assets/projects/egrs/8.jpeg'
            ]
        },
        'soscare': {
            title: 'IoT Platform – Smart Watch Medical Emergency System',
            description: 'Captures d\'écran de l\'application - Interface et fonctionnalités.',
            images: [
                'assets/projects/iot/1.png',
                'assets/projects/iot/2.png'
            ]
        },

        'wic': {
            title: 'WIC Doctor – Application mobile e-santé',
            description: 'Captures d\'écran de l\'application mobile - Interface et fonctionnalités.',
            images: [
                'assets/projects/wic/1.png',
                'assets/projects/wic/2.png',
                'assets/projects/wic/3.png',
                'assets/projects/wic/4.png',
                'assets/projects/wic/5.png',
                'assets/projects/wic/6.png',
                'assets/projects/wic/7.png',
                'assets/projects/wic/8.png',
                'assets/projects/wic/9.png',
                'assets/projects/wic/10.png',
                'assets/projects/wic/11.png',
                'assets/projects/wic/12.png'
            ]
        }
        // Add more projects here as needed
    };

    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('gallery-img');
    const modalTitle = document.getElementById('gallery-title');
    const modalDesc = document.getElementById('gallery-description');
    const currentImgSpan = document.getElementById('current-img');
    const totalImgSpan = document.getElementById('total-imgs');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const overlay = document.querySelector('.modal-overlay');

    let currentProject = null;
    let currentIndex = 0;

    const openModal = (projectId) => {
        currentProject = projectsData[projectId];
        if (!currentProject) return;

        currentIndex = 0;
        updateGallery();

        modal.style.display = 'flex';
        // Force reflow for transition
        modal.offsetHeight;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
    };

    const updateGallery = () => {
        if (!currentProject) return;

        // Fade out effect
        modalImg.style.opacity = '0';

        setTimeout(() => {
            modalImg.src = currentProject.images[currentIndex];
            modalTitle.textContent = currentProject.title;
            modalDesc.textContent = currentProject.description;
            currentImgSpan.textContent = currentIndex + 1;
            totalImgSpan.textContent = currentProject.images.length;
            modalImg.style.opacity = '1';
        }, 200);
    };

    const nextImage = () => {
        if (!currentProject) return;
        currentIndex = (currentIndex + 1) % currentProject.images.length;
        updateGallery();
    };

    const prevImage = () => {
        if (!currentProject) return;
        currentIndex = (currentIndex - 1 + currentProject.images.length) % currentProject.images.length;
        updateGallery();
    };

    // Event Listeners
    document.querySelectorAll('.gallery-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const projectId = trigger.getAttribute('data-project');
            openModal(projectId);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
});

