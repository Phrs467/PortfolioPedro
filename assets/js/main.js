/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            if(sectionsClass) sectionsClass.classList.add('active-link')
        }else{
            if(sectionsClass) sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});

sr.reveal('.home__data, .sobre__img-wrapper, .projeto__header',{});
sr.reveal('.home__img, .sobre__content, .projeto__screenshots',{delay: 400});
sr.reveal('.home__social-icon',{ interval: 200});
sr.reveal('.servicos__card, .certificacoes__img, .contact__input',{interval: 200});

/*==================== LIGHTBOX ====================*/
(function() {
    // Criar o lightbox no DOM
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox__overlay"></div>
        <div class="lightbox__container">
            <button class="lightbox__close" aria-label="Fechar"><i class='bx bx-x'></i></button>
            <button class="lightbox__prev" aria-label="Anterior"><i class='bx bx-chevron-left'></i></button>
            <button class="lightbox__next" aria-label="Próxima"><i class='bx bx-chevron-right'></i></button>
            <div class="lightbox__img-wrapper">
                <img class="lightbox__img" src="" alt="">
            </div>
            <p class="lightbox__caption"></p>
            <div class="lightbox__dots"></div>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lb = document.getElementById('lightbox');
    const lbImg = lb.querySelector('.lightbox__img');
    const lbCaption = lb.querySelector('.lightbox__caption');
    const lbDots = lb.querySelector('.lightbox__dots');
    const lbClose = lb.querySelector('.lightbox__close');
    const lbPrev = lb.querySelector('.lightbox__prev');
    const lbNext = lb.querySelector('.lightbox__next');

    let images = [];
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        lb.classList.add('lightbox--active');
        document.body.style.overflow = 'hidden';
        updateLightbox();
    }

    function closeLightbox() {
        lb.classList.remove('lightbox--active');
        document.body.style.overflow = '';
    }

    function updateLightbox() {
        const item = images[currentIndex];
        lbImg.style.opacity = '0';
        lbImg.style.transform = 'scale(0.95)';
        setTimeout(() => {
            lbImg.src = item.src;
            lbImg.alt = item.alt;
            lbCaption.textContent = item.caption;
            lbImg.style.opacity = '1';
            lbImg.style.transform = 'scale(1)';
        }, 200);
        // Dots
        lbDots.innerHTML = images.map((_, i) =>
            `<span class="lightbox__dot ${i === currentIndex ? 'lightbox__dot--active' : ''}" data-index="${i}"></span>`
        ).join('');
        lbDots.querySelectorAll('.lightbox__dot').forEach(dot => {
            dot.addEventListener('click', () => openLightbox(parseInt(dot.dataset.index)));
        });
        // Prev/next visibility
        lbPrev.style.display = images.length > 1 ? 'flex' : 'none';
        lbNext.style.display = images.length > 1 ? 'flex' : 'none';
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
    }

    // Coletar todas as imagens dos cards de projeto
    function collectImages() {
        images = [];
        document.querySelectorAll('.projeto__screen').forEach(screen => {
            const img = screen.querySelector('img');
            const label = screen.querySelector('.projeto__screen-label');
            if (img) {
                images.push({
                    src: img.src,
                    alt: img.alt,
                    caption: label ? label.textContent : img.alt
                });
            }
        });
    }

    // Adicionar listeners de clique nos screenshots
    function initScreenshots() {
        collectImages();
        document.querySelectorAll('.projeto__screen').forEach((screen, idx) => {
            screen.style.cursor = 'zoom-in';
            screen.addEventListener('click', () => openLightbox(idx));
        });
    }

    // Eventos do lightbox
    lbClose.addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox__overlay').addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', prevImage);
    lbNext.addEventListener('click', nextImage);

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (!lb.classList.contains('lightbox--active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // Inicializar após o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScreenshots);
    } else {
        initScreenshots();
    }
})();
