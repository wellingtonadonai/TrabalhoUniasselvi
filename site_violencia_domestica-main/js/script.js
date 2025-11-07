/* 
 * JavaScript Moderno (Não Intrusivo)
 * Espera o HTML carregar antes de executar qualquer código.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONSTANTES E SELETORES ---
    const CLASS_HIDDEN = 'hidden';

    // Modal
    const helpModal = document.getElementById('helpModal');
    const btnModalAjuda = document.getElementById('btn-modal-ajuda');
    const btnModalAjudaFooter = document.getElementById('btn-modal-ajuda-footer');
    const btnFecharModal = document.getElementById('btn-fechar-modal');
    const btnModalPlanoSeguranca = document.getElementById('btn-modal-plano-seguranca');
    const btnModalLigar190 = document.getElementById('btn-modal-ligar-190');
    const btnModalLigar180 = document.getElementById('btn-modal-ligar-180');
    const btnModalMaisInfo = document.getElementById('btn-modal-mais-info');

    // Plano de Segurança
    const safetyPlanSection = document.getElementById('safetyPlan');

    // Botões de Ligação
    const btnLigar190 = document.getElementById('btn-ligar-190');
    const btnLigar190Footer = document.getElementById('btn-ligar-190-footer');
    const btnLigar180 = document.getElementById('btn-ligar-180');
    const btnLigar180Footer = document.getElementById('btn-ligar-180-footer');
    const btnLigar181 = document.getElementById('btn-ligar-181');

    // Botões de Saída Segura
    const btnSaidaSeguraFlutuante = document.getElementById('btn-saida-segura-flutuante');
    const btnSaidaSeguraBanner = document.getElementById('btn-saida-segura-banner');

    // FAQ Accordion
    const faqToggles = document.querySelectorAll('[id^="faq-toggle-"]');

    // Carrossel
    const carousel = document.getElementById('testimonial-carousel');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');

    // --- 2. FUNÇÕES DE AÇÃO ---

    /** Confirma e redireciona chamadas de emergência */
    function makeEmergencyCall(serviceName, phoneNumber) {
        if (confirm(`Você será redirecionado para ligar para ${serviceName}. Deseja continuar?`)) {
            window.location.href = `tel:${phoneNumber}`;
        }
    }

    const callEmergency = () => makeEmergencyCall('a polícia', '190');
    const call180 = () => makeEmergencyCall('a Central de Atendimento à Mulher', '180');
    const call181 = () => makeEmergencyCall('o Disque Denúncia', '181');

    /** Exibe modal de ajuda */
    const showHelpModal = () => helpModal?.classList.remove(CLASS_HIDDEN);
    const closeHelpModal = () => helpModal?.classList.add(CLASS_HIDDEN);

    /** Toggle Plano de Segurança com scroll suave */
    const toggleSafetyPlan = () => {
        if (!safetyPlanSection) return;

        // Fecha modal se estiver aberto
        if (helpModal && !helpModal.classList.contains(CLASS_HIDDEN)) {
            helpModal.classList.add(CLASS_HIDDEN);
        }

        // Alterna visibilidade
        safetyPlanSection.classList.toggle(CLASS_HIDDEN);

        // Scroll suave se estiver visível
        if (!safetyPlanSection.classList.contains(CLASS_HIDDEN)) {
            safetyPlanSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    /** Saída segura do site */
    const safeExit = () => {
        window.open('https://www.google.com', '_blank');
        document.body.innerHTML = "Saindo...";
    };

    /** Abre mais informações em outra aba */
    const openMoreInfo = () => {
        window.open('https://www.gov.br/mulheres/pt-br/ligue180', '_blank');
    };

    // --- 3. EVENTOS ---

    // Saída Segura
    btnSaidaSeguraFlutuante?.addEventListener('click', safeExit);
    btnSaidaSeguraBanner?.addEventListener('click', safeExit);

    // Chamadas
    btnLigar190?.addEventListener('click', callEmergency);
    btnLigar190Footer?.addEventListener('click', callEmergency);
    btnModalLigar190?.addEventListener('click', callEmergency);

    btnLigar180?.addEventListener('click', call180);
    btnLigar180Footer?.addEventListener('click', call180);
    btnModalLigar180?.addEventListener('click', call180);

    btnLigar181?.addEventListener('click', call181);

    // Modal
    btnModalAjuda?.addEventListener('click', showHelpModal);
    btnModalAjudaFooter?.addEventListener('click', showHelpModal);
    btnFecharModal?.addEventListener('click', closeHelpModal);

    if (btnModalPlanoSeguranca) {
        btnModalPlanoSeguranca.addEventListener('click', toggleSafetyPlan);
    } else {
        console.error('Botão Plano de Segurança não encontrado!');
    }

    btnModalMaisInfo?.addEventListener('click', openMoreInfo);

    // FAQ Accordion
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetId = toggle.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const icon = toggle.querySelector('i.fas');
            if (!content) return;

            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            // Fecha outros
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherTargetId = otherToggle.getAttribute('data-target');
                    document.getElementById(otherTargetId)?.classList.add(CLASS_HIDDEN);
                    otherToggle.setAttribute('aria-expanded', 'false');
                    otherToggle.querySelector('i.fas')?.classList.remove('rotate-180');
                }
            });

            // Alterna visibilidade
            content.classList.toggle(CLASS_HIDDEN);
            toggle.setAttribute('aria-expanded', !isExpanded);
            icon?.classList.toggle('rotate-180');
        });
    });

    // --- 4. CARROSSEL DE DEPOIMENTOS ---
    if (carousel && prevButton && nextButton && dotsContainer) {

        const slides = carousel.children;
        const totalSlides = slides.length;
        let currentIndex = 0;
        let autoPlayInterval;

        // Criação dos dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot', 'w-3', 'h-3', 'bg-teal-300', 'rounded-full', 'cursor-pointer', 'transition-all', 'duration-300');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        const dots = dotsContainer.children;

        // Função para trocar de slide
        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            carousel.style.transition = 'transform 0.6s ease-in-out';
            carousel.style.transform = `translateX(-${index * 100}%)`;

            currentIndex = index;
            updateDots();
        }

        // Atualiza dots ativos
        function updateDots() {
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove('bg-teal-600');
                dots[i].classList.add('bg-teal-300');
            }
            dots[currentIndex].classList.add('bg-teal-600');
        }

        // Botões
        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            restartAutoPlay();
        });

        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            restartAutoPlay();
        });

        // Troca automática
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 8000);
        }

        function restartAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        goToSlide(0);
        startAutoPlay();
    }

}); // Fim do DOMContentLoaded
