/* ============================================
   MUHAMMAD HASSAN EHSAN - PORTFOLIO JS
   Modern, Animated, Interactive Portfolio
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // DOM ELEMENTS
    // ============================================
    const preloader = document.getElementById('preloader');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTop = document.getElementById('back-to-top');
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    const typewriterEl = document.getElementById('typewriter');
    const skillCatBtns = document.querySelectorAll('.skill-cat-btn');
    const skillGroups = document.querySelectorAll('.skill-group');
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialPrev = document.getElementById('testimonial-prev');
    const testimonialNext = document.getElementById('testimonial-next');
    const testimonialDots = document.getElementById('testimonial-dots');
    const timelineProgress = document.getElementById('timeline-progress');

    // ============================================
    // PRELOADER
    // ============================================
    window.addEventListener('load', () => {
        document.body.classList.add('preload-active');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);
});
setTimeout(() => {
    preloader.classList.add('hidden');
}, 3000);  // Fallback: always hide after 3 seconds
    // ============================================
    // CUSTOM CURSOR
    // ============================================
    if (window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
            cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor hover effects
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-card, .highlight-card, .cert-card, .testimonial-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(2)`;
                cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px) scale(1.5)`;
                cursorFollower.style.opacity = '0.8';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(1)`;
                cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px) scale(1)`;
                cursorFollower.style.opacity = '0.5';
            });
        });
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (currentScroll > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ============================================
    // MOBILE MENU
    // ============================================
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    mobileMenu.querySelector('.mobile-menu-bg').addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // ============================================
    // THEME TOGGLE
    // ============================================
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // ============================================
    // TYPEWRITER EFFECT
    // ============================================
    const roles = [
        'Digital Marketing Expert',
        'Creative Director',
        'Agency Co-Founder',
        'Brand Strategist',
        'Project Manager'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    if (typewriterEl) {
        setTimeout(typeWriter, 1500);
    }

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-num[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    }

    // Trigger counter animation when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.hero');
    if (heroSection) heroObserver.observe(heroSection);

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('.section-header, .service-card, .highlight-card, .timeline-item, .portfolio-item, .cert-card, .tool-item');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        revealObserver.observe(el);
    });

    // ============================================
    // SKILLS TABS
    // ============================================
    skillCatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-cat');

            skillCatBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            skillGroups.forEach(group => {
                group.classList.remove('active');
                if (group.getAttribute('data-cat') === cat) {
                    group.classList.add('active');
                }
            });

            // Animate skill bars for the active group
            setTimeout(animateSkillBars, 100);
        });
    });

    function animateSkillBars() {
        const activeGroup = document.querySelector('.skill-group.active');
        if (!activeGroup) return;

        const bars = activeGroup.querySelectorAll('.skill-bar-fill');
        bars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
    }

    // Observe skills section for initial animation
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });
        skillsObserver.observe(skillsSection);
    }

    // ============================================
    // PORTFOLIO FILTER
    // ============================================
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category');

                if (filter === 'all' || categories.includes(filter)) {
                    item.classList.remove('hidden');
                    item.classList.add('animate-in');
                    setTimeout(() => item.classList.remove('animate-in'), 500);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ============================================
    // TESTIMONIALS SLIDER
    // ============================================
    let currentSlide = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const totalSlides = testimonialCards.length;
    let slidesPerView = window.innerWidth > 768 ? 2 : 1;

    function createDots() {
        testimonialDots.innerHTML = '';
        const dotCount = Math.ceil(totalSlides / slidesPerView);
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            testimonialDots.appendChild(dot);
        }
    }

    function updateSlider() {
        const cardWidth = testimonialCards[0].offsetWidth + 24;
        testimonialTrack.style.transform = `translateX(-${currentSlide * cardWidth * slidesPerView}px)`;

        document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
        currentSlide = Math.max(0, Math.min(index, maxSlide));
        updateSlider();
    }

    function nextSlide() {
        const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
        currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
        updateSlider();
    }

    function prevSlide() {
        const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
        currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
        updateSlider();
    }

    testimonialNext.addEventListener('click', nextSlide);
    testimonialPrev.addEventListener('click', prevSlide);

    // Auto-slide
    let autoSlideInterval = setInterval(nextSlide, 5000);

    testimonialTrack.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    testimonialTrack.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    // Handle resize
    window.addEventListener('resize', () => {
        const newSlidesPerView = window.innerWidth > 768 ? 2 : 1;
        if (newSlidesPerView !== slidesPerView) {
            slidesPerView = newSlidesPerView;
            currentSlide = 0;
            createDots();
            updateSlider();
        }
    });

    createDots();

    // ============================================
    // TIMELINE PROGRESS
    // ============================================
    if (timelineProgress) {
        const timelineSection = document.getElementById('experience');
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const updateProgress = () => {
                        const rect = timelineSection.getBoundingClientRect();
                        const windowHeight = window.innerHeight;
                        const sectionHeight = timelineSection.offsetHeight;
                        const scrolled = (windowHeight - rect.top) / (windowHeight + sectionHeight);
                        const progress = Math.max(0, Math.min(1, scrolled));
                        timelineProgress.style.height = (progress * 100) + '%';
                    };
                    window.addEventListener('scroll', updateProgress);
                    updateProgress();
                    timelineObserver.disconnect();
                }
            });
        }, { threshold: 0.1 });
        timelineObserver.observe(timelineSection);
    }

    // ============================================
    // BACK TO TOP
    // ============================================
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // 3D TILT EFFECT FOR CARDS
    // ============================================
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ============================================
    // PARALLAX EFFECT
    // ============================================
    const parallaxElements = document.querySelectorAll('.hero-bg-shape, .section-bg-text');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach((el, index) => {
            const speed = 0.1 + (index * 0.05);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ============================================
    // MAGNETIC BUTTON EFFECT
    // ============================================
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ============================================
    // CERTIFICATION PROGRESS ANIMATION
    // ============================================
    const certProgressBars = document.querySelectorAll('.cert-progress-fill');
    const certsSection = document.getElementById('certifications');

    if (certsSection) {
        const certsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    certProgressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                    });
                    certsObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });
        certsObserver.observe(certsSection);
    }

    // ============================================
    // TEXT SCRAMBLE EFFECT FOR SECTION HEADERS
    // ============================================
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }

        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span style="color: var(--accent)">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }

        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    // Apply scramble effect to section titles on hover
    document.querySelectorAll('.section-title').forEach(title => {
        const originalText = title.innerText;
        const fx = new TextScramble(title);

        title.parentElement.addEventListener('mouseenter', () => {
            fx.setText(originalText);
        });
    });

    // ============================================
    // PARTICLE EFFECT ON HERO (Canvas)
    // ============================================
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';

    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 50;

        function resizeCanvas() {
            canvas.width = heroBg.offsetWidth;
            canvas.height = heroBg.offsetHeight;
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(233, 69, 96, ${p.opacity})`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[j].x - p.x;
                    const dy = particles[j].y - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(233, 69, 96, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        createParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
    }

    // ============================================
    // GLITCH EFFECT ON LOGO
    // ============================================
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            const text = logo.querySelector('.logo-text');
            const original = text.textContent;
            const glitchChars = '!<>-_\/[]{}—=+*^?#';
            let iterations = 0;

            const interval = setInterval(() => {
                text.textContent = original
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) return original[index];
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    })
                    .join('');

                if (iterations >= original.length) {
                    clearInterval(interval);
                    text.textContent = original;
                }
                iterations += 1/3;
            }, 30);
        });
    }

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c Muhammad Hassan Ehsan ', 'background: linear-gradient(135deg, #e94560, #ff6b81); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
    console.log('%c Digital Marketing Expert & Creative Director ', 'color: #e94560; font-size: 14px; font-weight: 600;');
    console.log('%c Looking under the hood? Let's connect! ', 'color: #a0a0b0; font-size: 12px;');
    console.log('%c thehassanehsan@gmail.com ', 'color: #e94560; font-size: 12px; font-weight: 600;');

})();
