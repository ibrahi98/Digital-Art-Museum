/* ========== Language overlay ========== */
function setLanguage(lang) {
    const overlay = document.getElementById('language-choice');
    if (overlay) overlay.style.display = 'none';
    try { localStorage.setItem('site-lang', lang); } catch (e) {}

    if (lang === 'en') {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        const t = document.getElementById('main-title');
        if (t) t.textContent = "Welcome to the Global Digital Art Museum";
    } else {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        const t = document.getElementById('main-title');
        if (t) t.textContent = "مرحبا بكم في متحف الفن الرقمي العالمي";
    }
}

/* ========== On DOM ready ========== */
document.addEventListener('DOMContentLoaded', function() {

    // hide language overlay if set
    try {
        const lang = localStorage.getItem('site-lang');
        if (lang) {
            const overlay = document.getElementById('language-choice');
            if (overlay) overlay.style.display = 'none';
            setLanguage(lang);
        }
    } catch (e) {}

    /* ====== Gallery: create swiper slides dynamically (gallery.html) ====== */
    const wrapper = document.getElementById('swiper-wrapper');
    if (wrapper) {
        let html = '';
        for (let i = 1; i <= 20; i++) {
            const src = `images/gallery/art${i}.jpg`;
            html += `
            <div class="swiper-slide">
              <div class="slide-inner">
                <img data-src="${src}" class="w-100 lazyimg" alt="Artwork ${i}" style="height:420px;object-fit:cover;display:block;border-radius:12px;cursor:pointer;" loading="lazy">
              </div>
            </div>
          `;
        }
        wrapper.innerHTML = html;
        setTimeout(initSwiper, 50);
    }

    /* ====== Click on .art-card or swiper slide to open image modal ====== */
    document.body.addEventListener('click', function(e) {
        const card = e.target.closest('.art-card');
        if (card && card.querySelector('img')) {
            const src = card.querySelector('img').src;
            openImageModal(src);
            return;
        }

        if (e.target && e.target.matches('.lazyimg, .slide-inner img')) {
            const src = e.target.getAttribute('data-src') || e.target.src;
            openImageModal(src);
            return;
        }
    });

    /* ====== LOGIN FORM VALIDATION ====== */
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(ev) {
            ev.preventDefault();

            const emailInput = document.getElementById('login-email');
            const passInput = document.getElementById('login-password');

            $(".error-text").remove();

            let valid = true;

            if (!emailInput.value.trim()) {
                $(emailInput).after('<div class="text-danger error-text small">يرجى إدخال البريد الإلكتروني.</div>');
                valid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
                $(emailInput).after('<div class="text-danger error-text small">البريد الإلكتروني غير صالح.</div>');
                valid = false;
            }

            if (!passInput.value || passInput.value.length < 6) {
                $(passInput).after('<div class="text-danger error-text small">كلمة المرور يجب أن تكون 6 أحرف على الأقل.</div>');
                valid = false;
            }

            if (valid) {
                showToast('تم تسجيل الدخول بنجاح (محاكاة)', 'success');
                loginForm.reset();
                setTimeout(() => window.location.href = 'index.html', 800);
            }
        });
    }

    /* ====== REGISTER FORM VALIDATION ====== */
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(ev) {
            ev.preventDefault();

            const nameInput = document.getElementById('reg-name');
            const emailInput = document.getElementById('reg-email');
            const passInput = document.getElementById('reg-password');
            const pass2Input = document.getElementById('reg-password2');

            $(".error-text").remove();

            let valid = true;

            if (!nameInput.value.trim()) {
                $(nameInput).after('<div class="text-danger error-text small">يرجى إدخال الاسم.</div>');
                valid = false;
            }

            if (!emailInput.value.trim()) {
                $(emailInput).after('<div class="text-danger error-text small">يرجى إدخال البريد الإلكتروني.</div>');
                valid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
                $(emailInput).after('<div class="text-danger error-text small">البريد الإلكتروني غير صالح.</div>');
                valid = false;
            }

            if (!passInput.value || passInput.value.length < 6) {
                $(passInput).after('<div class="text-danger error-text small">كلمة المرور يجب أن تكون 6 أحرف على الأقل.</div>');
                valid = false;
            }

            if (!pass2Input.value) {
                $(pass2Input).after('<div class="text-danger error-text small">يرجى تأكيد كلمة المرور.</div>');
                valid = false;
            } else if (passInput.value !== pass2Input.value) {
                $(pass2Input).after('<div class="text-danger error-text small">كلمة المرور غير متطابقة.</div>');
                valid = false;
            }

            if (valid) {
                showToast('تم إنشاء الحساب (محاكاة)', 'success');
                registerForm.reset();
                setTimeout(() => window.location.href = 'login.html', 900);
            }
        });
    }

    /* ====== CONTACT FORM VALIDATION ====== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(ev) {
            ev.preventDefault();
            const n = document.getElementById('contact-name').value.trim();
            const e = document.getElementById('contact-email').value.trim();
            const m = document.getElementById('contact-message').value.trim();
            $(".error-text").remove();

            let valid = true;
            if (!n) {
                $("#contact-name").after('<div class="text-danger error-text small">يرجى إدخال الاسم.</div>');
                valid = false;
            }
            if (!e) {
                $("#contact-email").after('<div class="text-danger error-text small">يرجى إدخال البريد الإلكتروني.</div>');
                valid = false;
            }
            if (!m) {
                $("#contact-message").after('<div class="text-danger error-text small">يرجى إدخال الرسالة.</div>');
                valid = false;
            }

            if (valid) {
                showToast('تم إرسال الرسالة — سنرد عليك قريباً (محاكاة)', 'success');
                contactForm.reset();
            }
        });
    }

    /* ====== Modal buttons: load content via Ajax ====== */
    const btn1 = document.getElementById('openModal1');
    const btn2 = document.getElementById('openModal2');

    if (btn1) {
        btn1.addEventListener('click', function() {
            loadModalContent('ajaxModal1', 'modal1.html');
        });
    }

    if (btn2) {
        btn2.addEventListener('click', function() {
            loadModalContent('ajaxModal2', 'modal2.html');
        });
    }

}); // end DOMContentLoaded

/* ========== Open image in bootstrap modal ====== */
function openImageModal(src) {
    const modalImg = document.getElementById('modal-image');
    if (!modalImg) { window.open(src, '_blank'); return; }

    modalImg.src = src;

    const modalEl = document.getElementById('imageModal');
    const bsModal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    bsModal.show();
}

/* ========== Swiper init (for gallery) ====== */
function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    new Swiper('.mySwiper', {
        loop: true,
        centeredSlides: false,
        slidesPerView: 4,
        spaceBetween: 24,
        speed: 700,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 12 },
            576: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 24 }
        }
    });
}

/* ========== Toast utility (Bootstrap 5 toasts) ====== */
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const id = 't' + Date.now();
    const bgClass = (type === 'success') ? 'bg-success text-white' : (type === 'danger') ? 'bg-danger text-white' : 'bg-secondary text-white';
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div id="${id}" class="toast ${bgClass} align-items-center text-wrap" role="alert" aria-live="polite" aria-atomic="true" data-bs-delay="3000">
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>`;
    container.appendChild(wrapper);
    const bsToast = new bootstrap.Toast(document.getElementById(id));
    bsToast.show();
    document.getElementById(id).addEventListener('hidden.bs.toast', function() { wrapper.remove(); });
}

/* ========== Load Ajax content into modals correctly ====== */
function loadModalContent(modalId, url) {
    const modalContent = document.getElementById(modalId + 'Content');
    const modalEl = document.getElementById(modalId);

    if (!modalContent || !modalEl) return;

    modalContent.innerHTML = 'جارٍ التحميل...';

    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'html',
        success: function(data) {
            modalContent.innerHTML = data;
        },
        error: function() {
            modalContent.innerHTML = '<p class="text-danger">حدث خطأ أثناء تحميل المحتوى.</p>';
        }
    });

    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
}