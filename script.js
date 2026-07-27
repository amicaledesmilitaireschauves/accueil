/**
 * AMC - Amicale des Militaires Chauves
 * Script de gestion de l'authentification et protection des pages
 */

// ============================================
// CONFIGURATION - Modifier ici le mot de passe
// ============================================
const MEMBER_PASSWORD = "AMC2026";

// ============================================
// Liste des pages protégées (à modifier si besoin)
// ============================================
const PROTECTED_PAGES = [
    'actualites.html',
    'goodies.html',
    'photos.html',
    'evenements.html',
    'test-calvitie.html'
];

// ============================================
// Vérification du mot de passe
// ============================================
function checkPassword() {
    const inputPassword = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');
    const loginBtn = document.querySelector('.login-btn');

    // Animation de chargement
    loginBtn.innerHTML = '<span>Vérification...</span><i class="fas fa-spinner fa-spin"></i>';

    setTimeout(() => {
        if (inputPassword === MEMBER_PASSWORD) {
            // Mot de passe correct - stockage en session
            sessionStorage.setItem('amc_authenticated', 'true');
            sessionStorage.setItem('amc_login_time', new Date().toISOString());

            // Redirection vers la page principale
            window.location.href = 'main.html';
        } else {
            // Mot de passe incorrect
            errorMsg.classList.add('show');
            loginBtn.innerHTML = '<span>ACCÉDER AU SITE</span><i class="fas fa-arrow-right"></i>';

            // Animation d'erreur
            const container = document.querySelector('.login-container');
            container.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                container.style.animation = '';
            }, 500);

            // Effacer le champ et refocus
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
        }
    }, 800);
}

// ============================================
// Vérification de l'authentification au chargement
// ============================================
function checkAuth() {
    // Vérifie si l'utilisateur est authentifié
    const isAuthenticated = sessionStorage.getItem('amc_authenticated') === 'true';

    // Si non authentifié et ce n'est pas la page de login
    if (!isAuthenticated && !window.location.href.includes('index.html')) {
        window.location.href = 'index.html';
    }

    // Si authentifié et sur la page de login
    if (isAuthenticated && window.location.href.includes('index.html')) {
        window.location.href = 'main.html';
    }

    // Protection des pages protégées
    const currentPage = window.location.pathname.split('/').pop();
    if (PROTECTED_PAGES.includes(currentPage) && !isAuthenticated) {
        window.location.href = 'index.html';
    }
}

// ============================================
// Déconnexion
// ============================================
function logout() {
    sessionStorage.removeItem('amc_authenticated');
    sessionStorage.removeItem('amc_login_time');
    window.location.href = 'index.html';
}

// ============================================
// Événement: Touche Entrée
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');

    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }

    // Exécuter la vérification d'authentification
    checkAuth();
});

// ============================================
// Animation shake (CSS dynamique)
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// ============================================
// Gestion du menu mobile
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

// ============================================
// Protection contre les outils développeur
// ============================================
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// ============================================
// Auto-logout après 30 minutes d'inactivité
// ============================================
let inactivityTime = function() {
    let time;
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function logout() {
        sessionStorage.removeItem('amc_authenticated');
        sessionStorage.removeItem('amc_login_time');
        if (!window.location.href.includes('index.html')) {
            alert('Session expirée. Veuillez vous reconnecter.');
            window.location.href = 'index.html';
        }
    }

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(logout, 30 * 60 * 1000); // 30 minutes
    }
};

// Lancer le timer d'inactivité
inactivityTime();

// Script du jeu : /////////////////////////////////////////////////////////////////////////////////////////

 // Tableau des images dans l'ordre
        const images = [
            "img2.png",
            "img3.png",
            "img4.png",
            "img1.png",
        ];

        let currentIndex = 0;
        let clickCounter = 0;

        // Fonction pour changer d'image
        function changeImage() {
            // Avance à l'image suivante (boucle)
            currentIndex = (currentIndex + 1) % images.length;
            
            // Met à jour l'image
            document.getElementById('clickImage').src = images[currentIndex];
            
            // Incrémente le compteur
            clickCounter++;
            
            // Met à jour l'affichage
            updateDisplay();
        }

        // Fonction pour réinitialiser le jeu
        function resetGame() {
            currentIndex = 0;
            clickCounter = 0;
            document.getElementById('clickImage').src = images[0];
            updateDisplay();
        }

        // Fonction pour mettre à jour l'affichage
        function updateDisplay() {
            // Met à jour le compteur de clics
            document.getElementById('clickCount').textContent = clickCounter;
            
            // Met à jour le numéro d'image (1 à 4)
            document.getElementById('imageNumber').textContent = currentIndex + 1;
            
            // Met à jour la barre de progression
            const progress = ((currentIndex + 1) / images.length) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
            
            // Met à jour les indicateurs
            for (let i = 0; i < images.length; i++) {
                const indicator = document.getElementById('ind' + i);
                if (i === currentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            }
        }

        // Initialisation
        updateDisplay();
