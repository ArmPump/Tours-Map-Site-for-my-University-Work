// ============ API CONFIGURATION ============
const API_BASE_URL = 'http://localhost:8000';
let allTours = [];
let allCategories = []; // Храним категории
let currentEditingTourId = null;

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', async () => {
    if (checkAuth()) {
        await Promise.all([loadTours(), loadCategories()]); // Загружаем и туры, и категории
    }

    setTimeout(() => {
        document.getElementById('pageLoader').classList.add('hidden');
    }, 500);
});

// ============ AUTH ============
function checkAuth() {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    if (username && email === 'admin@zhukovsky.com') {
        return true;
    } else {
        alert('⛔ Доступ только для администратора!');
        window.location.href = 'index.html';
        return false;
    }
}

// ============ DATA LOADING ============
async function loadTours() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tours`);
        if (!response.ok) throw new Error('Failed to fetch tours');
        const data = await response.json();
        allTours = data.tours;
        renderToursTable(allTours);
        updateStats();
    } catch (error) {
        console.error('Error loading tours:', error);
        alert('Ошибка загрузки туров');
    }
}

async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        allCategories = data.categories || data; // Адаптация под формат ответа
        renderCategorySelect();
    } catch (error) {
        console.error('Error loading categories:', error);
        // Если категорий нет, создадим дефолтную (или просто выведем ошибку)
    }
}

// ============ RENDERING ============
function renderCategorySelect() {
    const select = document.getElementById('category_id');
    if (!select) return;

    select.innerHTML = '<option value="">Выберите категорию</option>';
    allCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        select.appendChild(option);
    });
}

function renderToursTable(tours) {
    const tbody = document.getElementById('toursTableBody');
    tbody.innerHTML = '';

    tours.forEach(tour => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>
                <div class="tour-cell">
                    <img src="${tour.image_url}" alt="${tour.destination}" class="tour-img">
                    <div>
                        <div class="tour-name">${tour.destination}</div>
                        <div class="tour-location">${tour.description ? tour.description.substring(0, 30) : ''}...</div>
                    </div>
                </div>
            </td>
            <td><span class="badge" style="background: rgba(255,255,255,0.1)">${tour.country_code}</span></td>
            <td><span class="badge badge-price">${tour.price.toLocaleString()} ₽</span></td>
            <td>${getDifficultyBadge(tour.difficulty)}</td>
            <td><span class="badge badge-duration">${tour.duration_days} дн.</span></td>
            <td>
                <div class="action-btns">
                    <button class="icon-btn" onclick="openEditModal(${tour.id})">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="icon-btn delete" onclick="deleteTour(${tour.id})">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function getDifficultyBadge(diff) {
    let color = '#fff';
    if (diff === 'Легкая') color = '#2ed573';
    if (diff === 'Средняя') color = '#ffa502';
    if (diff === 'Высокая') color = '#ff4757';
    if (diff === 'Экстремальная') color = '#a29bfe';

    return `<span class="badge" style="color: ${color}; border: 1px solid ${color}40">${diff}</span>`;
}

function updateStats() {
    document.getElementById('totalTours').textContent = allTours.length;

    const totalValue = allTours.reduce((sum, tour) => sum + tour.price, 0);
    document.getElementById('totalValue').textContent = (totalValue / 1000000).toFixed(1) + 'M ₽';

    const uniqueCountries = new Set(allTours.map(t => t.country_code)).size;
    document.getElementById('totalCountries').textContent = uniqueCountries;
}

// ============ SEARCH ============
function filterTours() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allTours.filter(tour =>
        tour.destination.toLowerCase().includes(term) ||
        tour.country_code.toLowerCase().includes(term)
    );
    renderToursTable(filtered);
}

// ============ MODAL LOGIC ============
const modal = document.getElementById('tourModal');

function openCreateModal() {
    currentEditingTourId = null;
    document.getElementById('modalTitle').textContent = 'Добавить новый тур';
    document.getElementById('modalSubmitBtn').textContent = 'Создать';
    document.getElementById('tourForm').reset();
    modal.classList.add('show');
}

function openEditModal(id) {
    const tour = allTours.find(t => t.id === id);
    if (!tour) return;

    currentEditingTourId = id;
    document.getElementById('modalTitle').textContent = 'Редактировать тур';
    document.getElementById('modalSubmitBtn').textContent = 'Сохранить';

    document.getElementById('destination').value = tour.destination;
    document.getElementById('country_code').value = tour.country_code;
    document.getElementById('price').value = tour.price;
    document.getElementById('duration_days').value = tour.duration_days;
    document.getElementById('difficulty').value = tour.difficulty;
    document.getElementById('image_url').value = tour.image_url;
    document.getElementById('description').value = tour.description;
    document.getElementById('category_id').value = tour.category_id || '';
    document.getElementById('country_info').value = tour.country_info || '';
    document.getElementById('tour_details').value = tour.tour_details || '';
    document.getElementById('visa_info').value = tour.visa_info || '';
    document.getElementById('legal_info').value = tour.legal_info || '';
    document.getElementById('preparation').value = tour.preparation || '';


    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// ============ CRUD OPERATIONS ============
async function handleTourSubmit(event) {
    event.preventDefault();

    // Собираем данные в точном соответствии с TourCreate (Pydantic)
    const tourData = {
        destination: document.getElementById('destination').value,
        country_code: document.getElementById('country_code').value.toUpperCase(),
        price: Number(document.getElementById('price').value),
        duration_days: Number(document.getElementById('duration_days').value),
        difficulty: document.getElementById('difficulty').value,
        image_url: document.getElementById('image_url').value || null,
        description: document.getElementById('description').value || null,
        category_id: Number(document.getElementById('category_id').value), // Важно!
        country_info: document.getElementById('country_info').value || null,
        tour_details: document.getElementById('tour_details').value || null,
        visa_info: document.getElementById('visa_info').value || null,
        legal_info: document.getElementById('legal_info').value || null,
        preparation: document.getElementById('preparation').value || null
    };

    if (!tourData.category_id) {
        alert('Пожалуйста, выберите категорию!');
        return;
    }

    try {
        if (currentEditingTourId) {
            alert('Редактирование пока создает копию (нет endpoint update).');
            await createTour(tourData);
        } else {
            await createTour(tourData);
        }

        closeModal();
        loadTours();
    } catch (error) {
        console.error(error);
        alert('Ошибка: ' + error.message);
    }
}

async function createTour(data) {
    const response = await fetch(`${API_BASE_URL}/api/tours/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const err = await response.json();
        // Красивый вывод ошибки валидации Pydantic
        if (err.detail && Array.isArray(err.detail)) {
             const msg = err.detail.map(e => `${e.loc.join('.')}: ${e.msg}`).join('\n');
             throw new Error(msg);
        }
        throw new Error(err.detail || 'Ошибка создания');
    }
}

async function deleteTour(id) {
    if (!confirm('Вы уверены, что хотите удалить этот тур?')) return;

    try {
        const response = await fetch(`${API_BASE_URL}/api/tours/delete?tour_id=${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Ошибка удаления');

        loadTours();
    } catch (error) {
        alert(error.message);
    }
}
