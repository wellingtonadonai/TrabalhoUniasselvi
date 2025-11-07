/* * JavaScript Moderno (Não Intrusivo)
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
    
    // FAQs (Todos os botões de toggle)
    const faqToggles = document.querySelectorAll('[id^="faq-toggle-"]');


    // --- 2. FUNÇÕES DE AÇÃO ---

    /**
     * Função reutilizável para confirmar e redirecionar chamadas.
     * @param {string} serviceName - Nome do serviço (ex: 'a polícia')
     * @param {string} phoneNumber - Número (ex: '190')
     */
    function makeEmergencyCall(serviceName, phoneNumber) {
        // Usamos um modal customizado em vez de confirm()
        // (Mas para este projeto, confirm() é aceitável se não tivermos um modal de confirmação)
        if (confirm(`Você será redirecionado para ligar para ${serviceName}. Deseja continuar?`)) {
            window.location.href = `tel:${phoneNumber}`;
        }
    }

    // Funções de atalho para chamadas
    const callEmergency = () => makeEmergencyCall('a polícia', '190');
    const call180 = () => makeEmergencyCall('a Central de Atendimento à Mulher', '180');
    const call181 = () => makeEmergencyCall('o Disque Denúncia', '181');

    // Funções do Modal
    const showHelpModal = () => helpModal?.classList.remove(CLASS_HIDDEN);
    const closeHelpModal = () => helpModal?.classList.add(CLASS_HIDDEN);

    const showSafetyPlan = () => {
        closeHelpModal(); // Fecha o modal
        safetyPlanSection?.classList.remove(CLASS_HIDDEN);
        safetyPlanSection?.scrollIntoView({ behavior: 'smooth' });
    };

    // Função de Saída Segura
    const safeExit = () => {
        // Redireciona para um site neutro em uma nova aba e apaga o histórico da aba atual
        window.open('https://www.google.com', '_blank');
        // Para maior segurança, poderia tentar apagar o conteúdo da página atual:
        // document.body.innerHTML = "Saindo...";
    };

    // Função "Mais Informações"
    const openMoreInfo = () => {
        // Link oficial do Gov.br
        window.open('https://www.gov.br/mulheres/pt-br/ligue180', '_blank');
    };


    // --- 3. MAPEAMENTO DE EVENTOS (ADD EVENT LISTENERS) ---

    // Saída Segura
    btnSaidaSeguraFlutuante?.addEventListener('click', safeExit);
    btnSaidaSeguraBanner?.addEventListener('click', safeExit);

    // Chamadas de Emergência (190)
    btnLigar190?.addEventListener('click', callEmergency);
    btnLigar190Footer?.addEventListener('click', callEmergency);
    btnModalLigar190?.addEventListener('click', callEmergency);

    // Chamadas 180
    btnLigar180?.addEventListener('click', call180);
    btnLigar180Footer?.addEventListener('click', call180);
    btnModalLigar180?.addEventListener('click', call180);

    // Chamada 181
    btnLigar181?.addEventListener('click', call181);

    // Modal
    btnModalAjuda?.addEventListener('click', showHelpModal);
    btnModalAjudaFooter?.addEventListener('click', showHelpModal);
    btnFecharModal?.addEventListener('click', closeHelpModal);
    btnModalPlanoSeguranca?.addEventListener('click', showSafetyPlan);
    btnModalMaisInfo?.addEventListener('click', openMoreInfo);

    // Lógica do FAQ (Accordion)
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetId = toggle.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const icon = toggle.querySelector('i.fas');

            if (!content) return;

            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            // Fecha os outros
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherTargetId = otherToggle.getAttribute('data-target');
                    document.getElementById(otherTargetId)?.classList.add(CLASS_HIDDEN);
                    otherToggle.setAttribute('aria-expanded', 'false');
                    otherToggle.querySelector('i.fas')?.classList.remove('rotate-180');
                }
            });

            // Abre/fecha o clicado
            content.classList.toggle(CLASS_HIDDEN);
            toggle.setAttribute('aria-expanded', !isExpanded);
            icon?.classList.toggle('rotate-180');
        });
    });

    // ======================================================
    // === NOVA LÓGICA PARA O CARROSSEL DE DEPOIMENTOS ===
    // ======================================================

    const carousel = document.getElementById('testimonial-carousel');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');

    // Verifica se os elementos do carrossel existem antes de executar
    if (carousel && prevButton && nextButton && dotsContainer) {
        
        const slides = carousel.children;
        const totalSlides = slides.length;
        let currentIndex = 0;

        // --- Criar os Dots (bolinhas) ---
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot', 'w-3', 'h-3', 'bg-teal-300', 'rounded-full', 'cursor-pointer');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        const dots = dotsContainer.children;

        // --- Função para ir para um slide ---
        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            carousel.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
            updateDots();
        }

        // --- Função para atualizar a bolinha ativa ---
        function updateDots() {
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove('active', 'bg-teal-600');
                dots[i].classList.add('bg-teal-300');
            }
            dots[currentIndex].classList.add('active', 'bg-teal-600');
            dots[currentIndex].classList.remove('bg-teal-300');
        }

        // --- Event Listeners dos botões ---
        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        // --- Iniciar o carrossel ---
        goToSlide(0); // Garante que o primeiro slide e dot estejam ativos ao carregar

    } // Fim do if (verificação do carrossel)

}); // Fim do 'DOMContentLoaded'