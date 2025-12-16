// ============ API CONFIGURATION ============
const API_BASE_URL = 'http://localhost:8000';

let allTours = [];
let filteredTours = [];
let currentLang = 'ru';
let isLoginMode = true;

// Временные значения фильтров
let tempFilters = {
    difficulty: '',
    duration: '',
    sort: 'default'
};

// ============ API CLASS ============
class TourAPI {
    static async getAllTours() {
        const response = await fetch(`${API_BASE_URL}/api/tours`);
        if (!response.ok) throw new Error('Failed to fetch tours');
        const data = await response.json();
        return data.tours;
    }

    static async getTourById(tourId) {
        const response = await fetch(`${API_BASE_URL}/api/tours/${tourId}`);
        if (!response.ok) throw new Error('Tour not found');
        return await response.json();
    }

    static async getToursByDifficulty(difficulty) {
        const response = await fetch(`${API_BASE_URL}/api/tours/category_difficulty/${difficulty}`);
        if (!response.ok) throw new Error('Failed');
        const data = await response.json();
        return data.tours;
    }

    static async getToursByDuration(days) {
        const response = await fetch(`${API_BASE_URL}/api/tours/category_durations/${days}`);
        if (!response.ok) throw new Error('Failed');
        const data = await response.json();
        return data.tours;
    }
}

class UserAPI {
    static async register(userData) {
        const response = await fetch(`${API_BASE_URL}/api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Registration failed');
        }
        return await response.json();
    }

    static async getUserByEmail(email) {
        const response = await fetch(`${API_BASE_URL}/api/users/email/${email}`);
        if (!response.ok) throw new Error('User not found');
        return await response.json();
    }

    static async deleteUser(userId) {
        const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete user');
        return true;
    }
}

// ============ AUTH & PROFILE LOGIC ============
function checkAuth() {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    if (username && email) {
        updateProfileButton(username);
        return true;
    }
    return false;
}

function updateProfileButton(username) {
    const profileBtn = document.getElementById('headerProfileBtn');
    const avatar = localStorage.getItem('avatar');
    const firstLetter = username.charAt(0).toUpperCase();

    if (avatar) {
        profileBtn.innerHTML = `
            <img src="${avatar}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(255,255,255,0.3);">
            <span>${username}</span>
        `;
    } else {
        profileBtn.innerHTML = `
            <div style="width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700;">
                ${firstLetter}
            </div>
            <span>${username}</span>
        `;
    }
}

// !!! ИСПРАВЛЕНО: Теперь корректно открывает модалки !!!
function handleProfileClick() {
    console.log('Profile clicked'); // Debug
    if (checkAuth()) {
        openProfileModal();
    } else {
        openAuthModal();
    }
}

function logout() {
    localStorage.clear();
    document.getElementById('headerProfileBtn').innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span id="profileBtnText">Профиль</span>
    `;
    closeProfileModal();
    alert('Вы вышли из аккаунта');
}

// ============ MODALS (AUTH & PROFILE) ============
function openAuthModal() {
    const modal = document.getElementById('authModal');
    // Заполняем HTML только если пусто
    if (!modal.innerHTML.trim()) {
        modal.innerHTML = `
            <button class="close-modal" onclick="closeAuthModal()">&times;</button>
            <div class="modal-header">
                <h2 class="modal-title" id="modalTitle">Авторизация</h2>
                <p class="modal-subtitle" id="modalSubtitle">Войдите чтобы продолжить</p>
            </div>
            <form id="authForm" onsubmit="handleAuthSubmit(event)">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Пароль</label>
                    <input type="password" id="password" required minlength="8">
                </div>
                <button type="submit" class="submit-btn" id="submitBtn">Войти</button>
            </form>
            <div class="toggle-mode">
                <span id="toggleText">Нет аккаунта?</span>
                <a onclick="toggleAuthMode()" id="toggleLink">Регистрация</a>
            </div>
        `;
    }
    modal.classList.add('show');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('show');
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    const title = document.getElementById('modalTitle');
    const btn = document.getElementById('submitBtn');
    const toggleLink = document.getElementById('toggleLink');

    if (isLoginMode) {
        title.textContent = 'Авторизация';
        btn.textContent = 'Войти';
        toggleLink.textContent = 'Регистрация';
    } else {
        title.textContent = 'Регистрация';
        btn.textContent = 'Зарегистрироваться';
        toggleLink.textContent = 'Войти';
    }
}

async function handleAuthSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        if (isLoginMode) {
            const user = await UserAPI.getUserByEmail(email);
            if (user) {
                localStorage.setItem('username', user.username);
                localStorage.setItem('email', user.email);
                localStorage.setItem('userId', user.id);
                closeAuthModal();
                checkAuth();
            } else {
                alert('Пользователь не найден');
            }
        } else {
            const username = email.split('@')[0];
            await UserAPI.register({ username, email, password });
            alert('Регистрация успешна! Теперь войдите.');
            toggleAuthMode();
        }
    } catch (error) {
        alert(error.message);
    }
}

function openProfileModal() {
    const modal = document.getElementById('profileModal');

    if (!modal.innerHTML.trim()) {
        modal.innerHTML = `
            <button class="close-modal" onclick="closeProfileModal()">&times;</button>
            <div class="profile-header">
                <div class="profile-avatar-section">
                    <div class="profile-avatar-wrapper">
                        <div class="profile-avatar" id="profileAvatar">U</div>
                        <img id="profileAvatarImage" class="profile-avatar-image" style="display: none;">
                    </div>
                    <input type="file" id="avatarInput" accept="image/*" style="display: none;" onchange="handleAvatarUpload(event)">
                    <button class="avatar-upload-btn" onclick="document.getElementById('avatarInput').click()">
                        Поставить изображение
                    </button>
                </div>
                <div class="profile-info-section">
                    <div class="profile-info-item">
                        <span class="profile-info-label">Email:</span>
                        <div class="profile-info-value" id="profileEmail">loading...</div>
                    </div>
                    <div class="profile-info-item">
                        <span class="profile-info-label">Имя:</span>
                        <div class="profile-info-value" id="profileUsername">loading...</div>
                    </div>
                    <button class="change-password-btn" onclick="logout()" style="background: rgba(255,255,255,0.1); margin-top: 10px;">
                        Выйти из аккаунта
                    </button>
                    <button class="delete-account-btn" onclick="deleteAccount()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Удалить аккаунт
                    </button>
                </div>
            </div>
        `;
    }

    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const avatar = localStorage.getItem('avatar');

    document.getElementById('profileEmail').textContent = email;
    document.getElementById('profileUsername').textContent = username;
    document.getElementById('profileAvatar').textContent = username.charAt(0).toUpperCase();

    if (avatar) {
        const img = document.getElementById('profileAvatarImage');
        img.src = avatar;
        img.style.display = 'block';
    }

    modal.classList.add('show');
}

function closeProfileModal() {
    document.getElementById('profileModal').classList.remove('show');
}

function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem('avatar', e.target.result);
            document.getElementById('profileAvatarImage').src = e.target.result;
            document.getElementById('profileAvatarImage').style.display = 'block';
            checkAuth();
        };
        reader.readAsDataURL(file);
    }
}

async function deleteAccount() {
    if (confirm('Вы уверены? Это действие необратимо.')) {
        const userId = localStorage.getItem('userId');
        try {
            await UserAPI.deleteUser(userId);
            logout();
        } catch (error) {
            alert('Ошибка: ' + error.message);
        }
    }
}

// ============ SELECT TOUR (ИСПРАВЛЕННЫЙ И ПОЛНЫЙ) ============
async function selectTour(tourId) {
    try {
        // Показываем индикатор загрузки
        const loading = document.createElement('div');
        loading.id = 'loadingModal';
        loading.className = 'loading-state';
        loading.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;color:white;font-size:20px;';
        loading.textContent = 'Загрузка тура...';
        document.body.appendChild(loading);

        const tour = await TourAPI.getTourById(tourId);
        loading.remove();

        const modal = document.createElement('div');
        modal.id = 'tourDetailModal';
        modal.className = 'tour-detail-modal';

        const icons = {
            details: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
            visa: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h0M2 9.5h20"/></svg>',
            legal: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
            prep: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>',
            country: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
        };

        // !!! ВОЗВРАЩЕНА ПОЛНАЯ СТРУКТУРА МОДАЛКИ (Bento Grid) !!!
        modal.innerHTML = `
            <div class="tour-detail-overlay" onclick="closeTourDetailModal()"></div>
            <div class="tour-detail-content">
                <button class="close-tour-detail" onclick="closeTourDetailModal()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <!-- Hero Section -->
                <div class="tour-hero">
                    <img src="${tour.image_url}" alt="${tour.destination}" class="tour-hero-image">
                    <div class="tour-hero-content">
                        <div class="tour-hero-title">
                            <h2>${tour.destination}</h2>
                            <div class="tour-tags">
                                <span class="tag tag-blur">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    ${tour.duration_days} дней
                                </span>
                                <span class="tag tag-difficulty difficulty-${tour.difficulty.toLowerCase()}">
                                    ${tour.difficulty}
                                </span>
                            </div>
                        </div>
                        <div class="tour-hero-price">
                            <span class="price-label">Стоимость участия</span>
                            <div class="price-value">${formatPrice(tour.price)} ₽</div>
                        </div>
                    </div>
                </div>

                <!-- Bento Grid Content -->
                <div class="tour-grid-container">

                    <!-- Блок 1: О программе (Широкий) -->
                    <div class="info-card card-wide">
                        <div class="info-card-header">
                            <div class="info-icon">${icons.details}</div>
                            <div class="info-title">О программе</div>
                        </div>
                        <div class="info-text">${tour.tour_details || tour.description}</div>
                    </div>

                    <!-- Блок 2: Локация -->
                    <div class="info-card">
                        <div class="info-card-header">
                            <div class="info-icon">${icons.country}</div>
                            <div class="info-title">Локация</div>
                        </div>
                        <div class="info-text">${tour.country_info || 'Информация о стране загружается...'}</div>
                    </div>

                    <!-- Блок 3: Подготовка (Широкий) -->
                    <div class="info-card card-wide">
                        <div class="info-card-header">
                            <div class="info-icon">${icons.prep}</div>
                            <div class="info-title">Подготовка</div>
                        </div>
                        <div class="info-text">${tour.preparation || 'Специальная подготовка не требуется.'}</div>
                    </div>

                    <!-- Блок 4: Виза -->
                    <div class="info-card">
                        <div class="info-card-header">
                            <div class="info-icon">${icons.visa}</div>
                            <div class="info-title">Виза</div>
                        </div>
                        <div class="info-text">${tour.visa_info || 'Уточняйте визовые требования.'}</div>
                    </div>

                    <!-- Блок 5: Безопасность (Полная ширина) -->
                    <div class="info-card card-full">
                        <div class="info-card-header">
                            <div class="info-icon">${icons.legal}</div>
                            <div class="info-title">Безопасность и документы</div>
                        </div>
                        <div class="info-text" style="opacity: 0.8; font-size: 15px;">${tour.legal_info || 'Страховка обязательна.'}</div>
                    </div>

                </div>

                <!-- Footer -->
                <div class="tour-detail-footer">
                    <button class="book-btn" onclick="alert('Функция бронирования скоро появится!')">
                        Забронировать место →
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);

    } catch (error) {
        console.error(error);
        alert('Ошибка загрузки тура');
    }
}

function closeTourDetailModal() {
    const modal = document.getElementById('tourDetailModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// ============ FILTERS & INIT (БЕЗ ИЗМЕНЕНИЙ) ============
async function loadAllTours() {
    try {
        allTours = await TourAPI.getAllTours();
        filteredTours = [...allTours];
        document.getElementById('totalTours').textContent = allTours.length;
        renderTours(filteredTours);
        updateResultsInfo();
    } catch (error) {
        document.getElementById('toursGrid').innerHTML = '<div class="no-results-state">Ошибка загрузки</div>';
    }
}

function renderTours(tours) {
    const grid = document.getElementById('toursGrid');
    if (!tours.length) {
        grid.innerHTML = '<div class="no-results-state">Нет туров</div>';
        return;
    }
    grid.innerHTML = tours.map(tour => `
        <div class="tour-card" onclick="selectTour(${tour.id})">
            <img src="${tour.image_url}" class="tour-card-image" onerror="this.src='https://via.placeholder.com/400'">
            <div class="tour-card-content">
                <div class="tour-card-destination">${tour.destination}</div>
                <div class="tour-card-meta">
                    <span class="tour-meta-badge difficulty-badge ${getDifficultyClass(tour.difficulty)}">
                        ${getDifficultyIcon(tour.difficulty)} ${tour.difficulty}
                    </span>
                    <span class="tour-meta-badge duration-badge">
                        ⏱️ ${tour.duration_days} дней
                    </span>
                </div>
                <div class="tour-card-price">${formatPrice(tour.price)} ₽</div>
            </div>
        </div>
    `).join('');
}

// ... ОСТАЛЬНЫЕ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (formatPrice, applyFilters и т.д.) ОСТАЮТСЯ ТЕМИ ЖЕ ...

// ============ HELPER FUNCTIONS ============
function formatPrice(price) { return new Intl.NumberFormat('ru-RU').format(price); }
function getDifficultyClass(d) { return d === 'Экстремальная' ? 'extreme' : d === 'Высокая' ? 'high' : 'medium'; }
function getDifficultyIcon(d) { return d === 'Экстремальная' ? '🔴' : d === 'Высокая' ? '🟡' : '🟢'; }
function toggleLanguage() { currentLang = currentLang === 'ru' ? 'en' : 'ru'; document.getElementById('langText').textContent = currentLang.toUpperCase(); }

function updateResultsInfo() { document.getElementById('resultsCount').textContent = filteredTours.length; }

// ============ INIT ============
window.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  loadAllTours();

  const btn = document.getElementById('headerProfileBtn');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleProfileClick();   // должен вызывать openProfileModal/openAuthModal
  });
});


// Dropdown logic
function toggleDropdown(type) {
    const dropdown = document.getElementById(type + 'Dropdown');
    const trigger = dropdown.previousElementSibling;
    document.querySelectorAll('.select-dropdown').forEach(dd => { if (dd.id !== type + 'Dropdown') { dd.classList.remove('show'); dd.previousElementSibling.classList.remove('active'); } });
    dropdown.classList.toggle('show');
    trigger.classList.toggle('active');
}
function selectOption(type, value, label) {
    tempFilters[type] = value;
    document.getElementById(type + 'Selected').textContent = label;
    document.querySelectorAll('.select-dropdown').forEach(dd => { dd.classList.remove('show'); dd.previousElementSibling.classList.remove('active'); });
}
function resetFilters() {
    tempFilters = { difficulty: '', duration: '', sort: 'default' };
    document.getElementById('difficultySelected').textContent = '🎯 Все уровни';
    document.getElementById('durationSelected').textContent = '⏱️ Любая длительность';
    document.getElementById('sortSelected').textContent = '⭐ Рекомендуемые';
    filteredTours = [...allTours];
    renderTours(filteredTours);
    updateResultsInfo();
}
async function applyFilters() {
    const { difficulty, duration, sort } = tempFilters;

    // Берём все туры локально и уже потом фильтруем, чтобы корректно работать с "до X дней"
    let filtered = [...allTours];

    // Фильтр по сложности (если выбран)
    if (difficulty) {
        filtered = filtered.filter(t => t.difficulty === difficulty);
    }

    // Фильтр по длительности "до X дней"
    if (duration) {
        const maxDays = parseInt(duration, 10);
        if (maxDays === 999) {
            // Экспедиции 30+ дней
            filtered = filtered.filter(t => t.duration_days >= 30);
        } else {
            filtered = filtered.filter(t => t.duration_days <= maxDays);
        }
    }

    // Сортировка
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sort === 'duration-asc') filtered.sort((a, b) => a.duration_days - b.duration_days);
    if (sort === 'duration-desc') filtered.sort((a, b) => b.duration_days - a.duration_days);

    filteredTours = filtered;
    renderTours(filteredTours);
    updateResultsInfo();
}
