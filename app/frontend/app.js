// ============ КОНФИГУРАЦИЯ ============
let currentLang = 'ru';
let isLoginMode = true;
let currentCarouselIndex = 0;
let tours = [];

// Переменные для карты
let worldData;
let svg, g, projection, path, zoom;
let currentScale = 1;
let currentTranslate = [0, 0];

// ============ МАППИНГ NUMERIC ID К БУКВЕННЫМ КОДАМ ============
const countryCodeMapping = {
    '840': 'USA', // США
    '124': 'CAN', // Канада
    '484': 'MEX', // Мексика
    '076': 'BRA', // Бразилия
    '032': 'ARG', // Аргентина
    '152': 'CHL', // Чили
    '604': 'PER', // Перу
    '170': 'COL', // Колумбия
    '862': 'VEN', // Венесуэла
    '643': 'RUS', // Россия
    '156': 'CHN', // Китай
    '356': 'IND', // Индия
    '392': 'JPN', // Япония
    '410': 'KOR', // Южная Корея
    '764': 'THA', // Таиланд
    '704': 'VNM', // Вьетнам
    '360': 'IDN', // Индонезия
    '036': 'AUS', // Австралия
    '554': 'NZL', // Новая Зеландия
    '276': 'DEU', // Германия
    '250': 'FRA', // Франция
    '826': 'GBR', // Великобритания
    '380': 'ITA', // Италия
    '724': 'ESP', // Испания
    '616': 'POL', // Польша
    '804': 'UKR', // Украина
    '642': 'ROU', // Румыния
    '528': 'NLD', // Нидерланды
    '056': 'BEL', // Бельгия
    '300': 'GRC', // Греция
    '620': 'PRT', // Португалия
    '752': 'SWE', // Швеция
    '578': 'NOR', // Норвегия
    '246': 'FIN', // Финляндия
    '208': 'DNK', // Дания
    '756': 'CHE', // Швейцария
    '040': 'AUT', // Австрия
    '792': 'TUR', // Турция
    '818': 'EGY', // Египет
    '710': 'ZAF', // ЮАР
    '566': 'NGA', // Нигерия
    '231': 'ETH', // Эфиопия
    '404': 'KEN', // Кения
    '012': 'DZA', // Алжир
    '504': 'MAR', // Марокко
    '729': 'SDN', // Судан
    '834': 'TZA', // Танзания
    '682': 'SAU', // Саудовская Аравия
    '364': 'IRN', // Иран
    '368': 'IRQ', // Ирак
    '586': 'PAK', // Пакистан
    '004': 'AFG', // Афганистан
    '398': 'KAZ', // Казахстан
    '860': 'UZB', // Узбекистан
    '496': 'MNG', // Монголия
    '376': 'ISR', // Израиль
    '400': 'JOR', // Иордания
    '760': 'SYR', // Сирия
    '422': 'LBN', // Ливан
    '784': 'ARE', // ОАЭ
    '462': 'MDV' // Мальдивы
};

// Функция получения буквенного кода
function getCountryCode(numericId) {
    return countryCodeMapping[String(numericId)] || null;
}


// ============ ПЕРЕВОДЫ ============
const translations = {
    ru: {
        // Header
        navHome: 'Главная',
        navTours: 'Туры',
        navDestinations: 'Направления',
        profileBtnText: 'Профиль',

        // Auth
        login: 'Авторизация',
        signup: 'Регистрация',
        email: 'Email',
        password: 'Пароль',
        loginSubtitle: 'Войдите чтобы продолжить',
        signupSubtitle: 'Создайте новый аккаунт',
        noAccount: 'Нет аккаунта?',
        haveAccount: 'Уже есть аккаунт?',
        loginSuccess: 'Вы успешно вошли!',
        signupSuccess: 'Регистрация успешна! Теперь войдите.',
        loading: 'Загрузка...',
        loggedOut: 'Вы вышли из аккаунта',

        // Profile
        labelEmail: 'Email:',
        labelUsername: 'Имя пользователя:',
        labelPassword: 'Пароль:',
        avatarBtnText: 'Поставить изображение',
        changePasswordText: 'Изменить пароль',
        toursTitle: 'Туры в желаемом',

        // Country info
        tours: 'туров',
        tour: 'тур',
        tours_2_4: 'тура',
        noInfo: 'Нет информации',

        // Messages
        fillAllFields: 'Заполните все поля!',
        usernameSaved: '✅ Имя пользователя сохранено!',
        enterNewPassword: 'Введите новый пароль:',
        passwordChanged: '✅ Пароль успешно изменен!',
        passwordTooShort: '❌ Пароль должен быть минимум 8 символов',
        imageUploaded: '✅ Изображение загружено!',
        imageError: '❌ Ошибка загрузки изображения',
        selectTour: 'Вы выбрали'
    },
    en: {
        // Header
        navHome: 'Home',
        navTours: 'Tours',
        navDestinations: 'Destinations',
        profileBtnText: 'Profile',

        // Auth
        login: 'Login',
        signup: 'Sign Up',
        email: 'Email',
        password: 'Password',
        loginSubtitle: 'Login to continue',
        signupSubtitle: 'Create new account',
        noAccount: "Don't have an account?",
        haveAccount: 'Already have an account?',
        loginSuccess: 'Login successful!',
        signupSuccess: 'Registration successful! Now login.',
        loading: 'Loading...',
        loggedOut: 'You have logged out',

        // Profile
        labelEmail: 'Email:',
        labelUsername: 'Username:',
        labelPassword: 'Password:',
        avatarBtnText: 'Upload image',
        changePasswordText: 'Change password',
        toursTitle: 'Featured Tours',

        // Country info
        tours: 'tours',
        tour: 'tour',
        tours_2_4: 'tours',
        noInfo: 'No information available',

        // Messages
        fillAllFields: 'Fill all fields!',
        usernameSaved: '✅ Username saved!',
        enterNewPassword: 'Enter new password:',
        passwordChanged: '✅ Password changed successfully!',
        passwordTooShort: '❌ Password must be at least 8 characters',
        imageUploaded: '✅ Image uploaded!',
        imageError: '❌ Error uploading image',
        selectTour: 'You selected'
    }
};

// ============ MOCK ДАННЫЕ ТУРОВ С ПРИВЯЗКОЙ К СТРАНАМ ============
const mockTours = [
    {
        id: 1,
        destination: 'Восхождение в Гималаях, Индия',
        country_code: 'IND',
        description: 'Покорение высочайших вершин Гималаев',
        price: 2500000,
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
        duration_days: 60,
        difficulty: 'Экстремальная',
        country_info: 'Индия - страна с частью Гималайского хребта, включая множество семитысячников.',
        tour_details: 'Экспедиция включает акклиматизацию в базовом лагере, прохождение ледников, установку высотных лагерей и штурм вершины.',
        legal_info: 'Требуется разрешение от правительства Индии. Обязательна страховка на высотные работы и эвакуацию вертолетом.',
        visa_info: 'Электронная виза e-Visa - $80 на 60 дней. Оформляется онлайн за 4 дня до прибытия.',
        preparation: 'Минимум 2 года подготовки: восхождения на 6000-7000м, тренировки выносливости. Медосмотр у кардиолога обязателен.'
    },
    {
        id: 2,
        destination: 'Рафтинг по Замбези, ЮАР',
        country_code: 'ZAF',
        description: 'Экстремальный сплав по бурным порогам',
        price: 320000,
        image_url: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=600&h=400&fit=crop',
        duration_days: 7,
        difficulty: 'Высокая',
        country_info: 'Южно-Африканская Республика - страна с уникальными природными достопримечательностями.',
        tour_details: 'Сплав по порогам 4-5 категории сложности. 23 порога. Перевороты рафта гарантированы.',
        legal_info: 'Медицинская страховка с покрытием экстремальных видов спорта обязательна. Подписание waiver перед сплавом.',
        visa_info: 'Для россиян виза не требуется при пребывании до 90 дней.',
        preparation: 'Умение плавать обязательно. Физическая подготовка - способность грести 6-8 часов.'
    },
    {
        id: 3,
        destination: 'Хели-ски на Аляске, США',
        country_code: 'USA',
        description: 'Фрирайд на нетронутых склонах с вертолета',
        price: 850000,
        image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop',
        duration_days: 10,
        difficulty: 'Экстремальная',
        country_info: 'Аляска - самый большой штат США, 70% территории покрыто горами и ледниками.',
        tour_details: 'Спуски с вертолета на высоту до 2500м. До 8 спусков в день по целинному снегу. Крутизна склонов 35-50°.',
        legal_info: 'Страховка от несчастных случаев обязательна ($200-400). Подписание документа об ознакомлении с рисками.',
        visa_info: 'Виза B1/B2 через посольство США. ESTA для россиян недоступна.',
        preparation: 'Уровень катания - эксперт. Опыт фрирайда минимум 5 лет. Прохождение лавинных курсов обязательно.'
    },
    {
        id: 4,
        destination: 'Дайвинг с акулами, ЮАР',
        country_code: 'ZAF',
        description: 'Погружение в клетке к большим белым акулам',
        price: 280000,
        image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
        duration_days: 5,
        difficulty: 'Средняя',
        country_info: 'Южно-Африканская Республика - страна с уникальной морской фауной.',
        tour_details: 'Погружения в районе Гансбай. 2-3 погружения в день в стальной клетке. Видимость акул 95%.',
        legal_info: 'Подписание waiver. Страховка дайвера с покрытием экстремальных погружений обязательна.',
        visa_info: 'Для россиян виза не требуется при пребывании до 90 дней.',
        preparation: 'Сертификат дайвера Open Water или выше. Минимум 20 погружений в логбуке.'
    },
    {
        id: 5,
        destination: 'Скайдайвинг, Новая Зеландия',
        country_code: 'NZL',
        description: 'Прыжки с парашютом над озером Вакатипу',
        price: 195000,
        image_url: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=600&h=400&fit=crop',
        duration_days: 5,
        difficulty: 'Средняя',
        country_info: 'Новая Зеландия - островное государство, мировая столица экстремального туризма.',
        tour_details: 'Прыжки с высоты 4500м над Квинстауном. Свободное падение 60 секунд. Тандем с инструктором.',
        legal_info: 'Медицинский осмотр перед прыжком. Ограничение по весу - до 100кг.',
        visa_info: 'Электронная виза NZeTA - $17. Туристический сбор IVL $25.',
        preparation: 'Специальной подготовки не требуется. Противопоказания: сердечные заболевания, эпилепсия.'
    },
    {
        id: 6,
        destination: 'Восхождение на Килиманджаро, Танзания',
        country_code: 'TZA',
        description: 'Покорение высочайшей вершины Африки 5895м',
        price: 420000,
        image_url: 'https://images.unsplash.com/photo-1621414050345-53db43f7e7ab?w=600&h=400&fit=crop',
        duration_days: 9,
        difficulty: 'Высокая',
        country_info: 'Танзания - страна в Восточной Африке с горой Килиманджаро.',
        tour_details: 'Маршрут Мачаме. 7 дней восхождения через 5 климатических зон. Штурм вершины ночью при -15°C.',
        legal_info: 'Разрешение $800 включено. Страховка с покрытием высоты до 6000м обязательна.',
        visa_info: 'Виза по прибытию - $50 на 90 дней. Можно оформить онлайн e-Visa.',
        preparation: 'Хорошая физическая форма. Прививки: желтая лихорадка обязательно.'
    },
    {
        id: 7,
        destination: 'Треккинг Инков, Перу',
        country_code: 'PER',
        description: 'Поход по тропе инков к Мачу-Пикчу',
        price: 350000,
        image_url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&h=400&fit=crop',
        duration_days: 7,
        difficulty: 'Средняя',
        country_info: 'Перу - родина цивилизации инков и древнего города Мачу-Пикчу.',
        tour_details: 'Классический маршрут 4 дня/3 ночи. 43км пешком через перевалы до 4200м.',
        legal_info: 'Разрешение лимитировано - 500 мест в день. Бронь за 6 месяцев. Без гида запрещено.',
        visa_info: 'Для россиян виза не нужна при пребывании до 90 дней.',
        preparation: 'Акклиматизация в Куско 2-3 дня. Способность идти 6-8 часов с рюкзаком 5-7кг.'
    },
    {
        id: 8,
        destination: 'Банджи-джампинг, Швейцария',
        country_code: 'CHE',
        description: 'Прыжок с плотины Верзаска 220 метров',
        price: 175000,
        image_url: 'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=600&h=400&fit=crop',
        duration_days: 3,
        difficulty: 'Высокая',
        country_info: 'Швейцария - альпийская страна с точными экстремальными развлечениями.',
        tour_details: 'Прыжок с плотины из фильма "Золотой Глаз". 7.5 секунд свободного падения. Высота 220м.',
        legal_info: 'Медосмотр обязателен. Ограничения: вес 45-115кг, возраст 14-100 лет.',
        visa_info: 'Шенгенская виза категории C - €80, срок оформления 10 дней.',
        preparation: 'Противопоказания: беременность, сердечные заболевания, травмы позвоночника.'
    },
    {
        id: 9,
        destination: 'Альпинизм в Каракоруме, Пакистан',
        country_code: 'PAK',
        description: 'Восхождение на К2 - вторую вершину мира',
        price: 3200000,
        image_url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&h=400&fit=crop',
        duration_days: 75,
        difficulty: 'Экстремальная',
        country_info: 'Пакистан - страна с концентрацией восьмитысячников в Каракоруме.',
        tour_details: 'Самая опасная вершина (8611м). Смертность 25%. Техническое лазание. Узкое окно - июль-август.',
        legal_info: 'Разрешение от Alpine Club - $12,000. Страховка $100,000. Депозит $500 за мусор.',
        visa_info: 'Туристическая виза через посольство - $60, срок 30 дней.',
        preparation: 'Обязателен опыт 8000м+. Медобследование. Опыт работы с кислородом. Тренировки 3 года.'
    },
    {
        id: 10,
        destination: 'Фрирайд в Шамони, Франция',
        country_code: 'FRA',
        description: 'Экстремальное катание у подножия Монблана',
        price: 520000,
        image_url: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=600&h=400&fit=crop',
        duration_days: 7,
        difficulty: 'Высокая',
        country_info: 'Франция - страна с высочайшими альпийскими вершинами Западной Европы.',
        tour_details: 'Внетрассовое катание Валле-Бланш (20км). Спуск с 3842м. Перепад высот 2800м.',
        legal_info: 'Обязательна лавинная страховка. Рекомендуется ARVA (лавинный датчик).',
        visa_info: 'Шенгенская виза C - €80. Срок оформления 5-10 дней.',
        preparation: 'Уровень - продвинутый/эксперт. Опыт фрирайда. Лавинный курс Level 1 желателен.'
    },
    {
        id: 11,
        destination: 'Сёрфинг Назаре, Португалия',
        country_code: 'PRT',
        description: 'Покорение гигантских волн до 30 метров',
        price: 390000,
        image_url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=400&fit=crop',
        duration_days: 10,
        difficulty: 'Экстремальная',
        country_info: 'Португалия - страна с самыми большими волнами в мире.',
        tour_details: 'Сёрфинг на волнах-гигантах в каньоне Назаре. Сезон: октябрь-март. Буксировка на джет-ски.',
        legal_info: 'Страховка экстремального спорта обязательна. Медосмотр сердца и легких.',
        visa_info: 'Шенгенская виза С - €80. Оформление 5-15 дней.',
        preparation: 'Профессиональный уровень. Опыт минимум 10 лет. Тренировки задержки дыхания.'
    },
    {
        id: 12,
        destination: 'Каякинг в фьордах, Норвегия',
        country_code: 'NOR',
        description: 'Экстремальный морской каякинг',
        price: 290000,
        image_url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&h=400&fit=crop',
        duration_days: 6,
        difficulty: 'Высокая',
        country_info: 'Норвегия - страна фьордов и северного сияния.',
        tour_details: 'Многодневный поход на морских каяках. Ночевки в палатках. Встречи с китами.',
        legal_info: 'Страховка морских видов спорта. Знание правил безопасности на воде.',
        visa_info: 'Шенгенская виза C - €80. Срок оформления 10-15 дней.',
        preparation: 'Опыт каякинга минимум 1 год. Умение плавать. Выносливость для гребли 20-30км/день.'
    }
];



// ============ ДАННЫЕ СТРАН ============
const countryNames = {
    ru: {
        'USA': 'США', 'CAN': 'Канада', 'MEX': 'Мексика', 'BRA': 'Бразилия', 'ARG': 'Аргентина',
        'CHL': 'Чили', 'PER': 'Перу', 'COL': 'Колумбия', 'VEN': 'Венесуэла', 'RUS': 'Россия',
        'CHN': 'Китай', 'IND': 'Индия', 'JPN': 'Япония', 'KOR': 'Ю. Корея', 'THA': 'Таиланд',
        'VNM': 'Вьетнам', 'IDN': 'Индонезия', 'AUS': 'Австралия', 'NZL': 'Н. Зеландия',
        'DEU': 'Германия', 'FRA': 'Франция', 'GBR': 'Великобритания', 'ITA': 'Италия',
        'ESP': 'Испания', 'POL': 'Польша', 'UKR': 'Украина', 'ROU': 'Румыния',
        'NLD': 'Нидерланды', 'BEL': 'Бельгия', 'GRC': 'Греция', 'PRT': 'Португалия',
        'SWE': 'Швеция', 'NOR': 'Норвегия', 'FIN': 'Финляндия', 'DNK': 'Дания',
        'CHE': 'Швейцария', 'AUT': 'Австрия', 'TUR': 'Турция', 'EGY': 'Египет',
        'ZAF': 'ЮАР', 'NGA': 'Нигерия', 'ETH': 'Эфиопия', 'KEN': 'Кения',
        'DZA': 'Алжир', 'MAR': 'Марокко', 'SDN': 'Судан', 'TZA': 'Танзания',
        'SAU': 'Саудовская Аравия', 'IRN': 'Иран', 'IRQ': 'Ирак', 'PAK': 'Пакистан',
        'AFG': 'Афганистан', 'KAZ': 'Казахстан', 'UZB': 'Узбекистан', 'MNG': 'Монголия',
        'ISR': 'Израиль', 'JOR': 'Иордания', 'SYR': 'Сирия', 'LBN': 'Ливан',
        'ARE': 'ОАЭ', 'MDV': 'Мальдивы'
    },
    en: {
        'USA': 'USA', 'CAN': 'Canada', 'MEX': 'Mexico', 'BRA': 'Brazil', 'ARG': 'Argentina',
        'CHL': 'Chile', 'PER': 'Peru', 'COL': 'Colombia', 'VEN': 'Venezuela', 'RUS': 'Russia',
        'CHN': 'China', 'IND': 'India', 'JPN': 'Japan', 'KOR': 'S. Korea', 'THA': 'Thailand',
        'VNM': 'Vietnam', 'IDN': 'Indonesia', 'AUS': 'Australia', 'NZL': 'New Zealand',
        'DEU': 'Germany', 'FRA': 'France', 'GBR': 'UK', 'ITA': 'Italy', 'ESP': 'Spain',
        'POL': 'Poland', 'UKR': 'Ukraine', 'ROU': 'Romania', 'NLD': 'Netherlands',
        'BEL': 'Belgium', 'GRC': 'Greece', 'PRT': 'Portugal', 'SWE': 'Sweden',
        'NOR': 'Norway', 'FIN': 'Finland', 'DNK': 'Denmark', 'CHE': 'Switzerland',
        'AUT': 'Austria', 'TUR': 'Turkey', 'EGY': 'Egypt', 'ZAF': 'South Africa',
        'NGA': 'Nigeria', 'ETH': 'Ethiopia', 'KEN': 'Kenya', 'DZA': 'Algeria',
        'MAR': 'Morocco', 'SDN': 'Sudan', 'TZA': 'Tanzania', 'SAU': 'Saudi Arabia',
        'IRN': 'Iran', 'IRQ': 'Iraq', 'PAK': 'Pakistan', 'AFG': 'Afghanistan',
        'KAZ': 'Kazakhstan', 'UZB': 'Uzbekistan', 'MNG': 'Mongolia', 'ISR': 'Israel',
        'JOR': 'Jordan', 'SYR': 'Syria', 'LBN': 'Lebanon',
        'ARE': 'UAE', 'MDV': 'Maldives'
    }
};


// ============ РАСШИРЕННАЯ ЯРКАЯ ПАЛИТРА (50 цветов!) ============
const vibrantMapColors = [
    // Синие океанические
    '#2E86AB', '#1B98E0', '#4CA6C5', '#00B4D8', '#5BB6D2',

    // Зеленые
    '#3FA55B', '#13CE66', '#5BC579', '#06FFA5', '#77E597',

    // Оранжевые/золотые
    '#F18F01', '#FF8C42', '#F9B149', '#FB5607', '#FFD391',

    // Фиолетовые
    '#6A4C93', '#8338EC', '#906AB9', '#A685E2', '#B688DF',

    // Красные/коралловые
    '#FF6B6B', '#FF006E', '#FF7F7F', '#E63946', '#FFA7A7',

    // Бирюзовые
    '#00C9A7', '#06FFC2', '#3ADDB9', '#2CE0F4', '#74F1CB',

    // Желтые
    '#FFD23F', '#FFBE0B', '#FFE279', '#FFC947', '#FFF2B3',

    // Индиго/голубые
    '#4056A1', '#3A86FF', '#667ABF', '#00D9C0', '#8C9EDD',

    // Розовые
    '#FF6B9D', '#FF85A6', '#FFA7C4', '#FF1A7E', '#FFBBD1',

    // Лаймовые
    '#A7F070', '#B8F584', '#C9FA98', '#DAFFAC', '#EBFFC0'
];

// ============ УМНОЕ РАСПРЕДЕЛЕНИЕ ЦВЕТОВ ============
// Используем хеш от ID страны для лучшего распределения
function getSmartColor(countryId, index) {
    // Создаем "хеш" из ID для распределения цветов
    const hash = String(countryId).split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0);
    }, 0);

    // Используем комбинацию хеша и индекса
    const colorIndex = (hash + index * 7) % vibrantMapColors.length;
    return vibrantMapColors[colorIndex];
}

const colorScale = d3.scaleOrdinal().range(vibrantMapColors);


// ============ ФУНКЦИЯ ПОДСЧЕТА ТУРОВ ПО СТРАНЕ ============
function getToursCountByCountry(countryCode) {
    return mockTours.filter(tour => tour.country_code === countryCode).length;
}

// ============ ФУНКЦИЯ СКЛОНЕНИЯ СЛОВА "ТУР" ============
function getTourWordForm(count, lang) {
    if (lang === 'en') {
        return count === 1 ? 'tour' : 'tours';
    }

    // Русский язык
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return 'туров';
    }

    if (lastDigit === 1) {
        return 'тур';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return 'тура';
    }

    return 'туров';
}

// ============ ФУНКЦИИ ЯЗЫКА ============
function toggleLanguage() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    updateAllTranslations();

    if (worldData) {
        updateCountryLabels();
    }
}

function updateAllTranslations() {
    const t = translations[currentLang];

    // Header
    document.getElementById('langText').textContent = currentLang === 'ru' ? 'EN' : 'RU';
    document.getElementById('navHome').textContent = t.navHome;
    document.getElementById('navTours').textContent = t.navTours;
    document.getElementById('navDestinations').textContent = t.navDestinations;
    document.getElementById('profileBtnText').textContent = t.profileBtnText;

    updateAuthModalText();
    updateProfileTranslations();
}

function updateAuthModalText() {
    const t = translations[currentLang];
    document.getElementById('modalTitle').textContent = isLoginMode ? t.login : t.signup;
    document.getElementById('modalSubtitle').textContent = isLoginMode ? t.loginSubtitle : t.signupSubtitle;
    document.getElementById('emailLabel').textContent = t.email;
    document.getElementById('passwordLabel').textContent = t.password;
    document.getElementById('submitBtn').textContent = isLoginMode ? t.login : t.signup;
    document.getElementById('toggleText').textContent = isLoginMode ? t.noAccount : t.haveAccount;
    document.getElementById('toggleLink').textContent = isLoginMode ? t.signup : t.login;
}

function updateProfileTranslations() {
    const t = translations[currentLang];

    if (document.getElementById('labelEmail')) {
        document.getElementById('labelEmail').textContent = t.labelEmail;
        document.getElementById('labelUsername').textContent = t.labelUsername;
        document.getElementById('labelPassword').textContent = t.labelPassword;
        document.getElementById('avatarBtnText').textContent = t.avatarBtnText;
        document.getElementById('changePasswordText').textContent = t.changePasswordText;
        document.getElementById('toursTitle').textContent = t.toursTitle;
    }
}

// ============ АВТОРИЗАЦИЯ ============
function checkAuth() {
    const username = localStorage.getItem('username');

    if (username) {
        updateProfileButton(username);
        return true;
    }
    return false;
}

function updateProfileButton(username) {
    const profileBtn = document.querySelector('.profile-btn');
    const avatar = localStorage.getItem('avatar');
    const firstLetter = username.charAt(0).toUpperCase();

    // Если есть загруженное фото - показываем его
    if (avatar) {
        profileBtn.innerHTML = `
            <img src="${avatar}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(255,255,255,0.3);">
            <span>${username}</span>
        `;
    } else {
        // Если нет фото - показываем первую букву
        profileBtn.innerHTML = `
            <div style="width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700;">
                ${firstLetter}
            </div>
            <span>${username}</span>
        `;
    }
}


function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('avatar');

    const profileBtn = document.querySelector('.profile-btn');
    const t = translations[currentLang];

    profileBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span id="profileBtnText">${t.profileBtnText}</span>
    `;

    alert(t.loggedOut);
}

function handleProfileClick() {
    if (checkAuth()) {
        openProfileModal();
    } else {
        openAuthModal();
    }
}

// ============ МОДАЛЬНОЕ ОКНО АВТОРИЗАЦИИ ============
function openAuthModal() {
    document.getElementById('authModal').classList.add('show');
    document.getElementById('mapContainer').classList.add('blurred');
}

function closeAuthModal() {
    document.getElementById('authModal').classList.remove('show');
    document.getElementById('mapContainer').classList.remove('blurred');
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    updateAuthModalText();
    document.getElementById('authForm').reset();
}

function handleAuthSubmit(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = document.getElementById('submitBtn');
    const t = translations[currentLang];

    if (!email || !password) {
        alert(t.fillAllFields);
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = t.loading;

    setTimeout(() => {
        if (isLoginMode) {
            const username = email.includes('@') ? email.split('@')[0] : email;

            localStorage.setItem('username', username);
            localStorage.setItem('email', email);

            alert(t.loginSuccess);
            closeAuthModal();
            checkAuth();

        } else {
            alert(t.signupSuccess);
            toggleAuthMode();
        }

        submitBtn.disabled = false;
        submitBtn.textContent = isLoginMode ? t.login : t.signup;
    }, 500);
}

// ============ МОДАЛЬНОЕ ОКНО ПРОФИЛЯ ============
function openProfileModal() {
    document.getElementById('profileModal').classList.add('show');
    document.getElementById('mapContainer').classList.add('blurred');

    loadProfileData();
    loadTours();
}

function closeProfileModal() {
    document.getElementById('profileModal').classList.remove('show');
    document.getElementById('mapContainer').classList.remove('blurred');
}

function loadProfileData() {
    const username = localStorage.getItem('username') || 'User';
    const email = localStorage.getItem('email') || 'user@example.com';
    const avatar = localStorage.getItem('avatar');

    document.getElementById('profileEmail').textContent = email;
    document.getElementById('profileUsernameInput').value = username;

    const firstLetter = username.charAt(0).toUpperCase();
    document.getElementById('profileAvatar').textContent = firstLetter;

    // Загрузка аватара если есть
    if (avatar) {
        const avatarImg = document.getElementById('profileAvatarImage');
        avatarImg.src = avatar;
        avatarImg.style.display = 'block';
    } else {
        document.getElementById('profileAvatarImage').style.display = 'none';
    }
}

// ============ РЕДАКТИРОВАНИЕ ИМЕНИ ПОЛЬЗОВАТЕЛЯ ============
function editUsername() {
    const input = document.getElementById('profileUsernameInput');
    input.focus();
    input.select();
}

function saveUsername() {
    const newUsername = document.getElementById('profileUsernameInput').value.trim();
    const t = translations[currentLang];

    if (newUsername && newUsername.length >= 3) {
        localStorage.setItem('username', newUsername);
        updateProfileButton(newUsername);

        // Обновляем аватар
        const firstLetter = newUsername.charAt(0).toUpperCase();
        document.getElementById('profileAvatar').textContent = firstLetter;

        // Показываем уведомление
        showNotification(t.usernameSaved);
    }
}

// ============ ЗАГРУЗКА АВАТАРА ============
function handleAvatarUpload(event) {
    const file = event.target.files[0];
    const t = translations[currentLang];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const avatarImg = document.getElementById('profileAvatarImage');
            const avatar = document.getElementById('profileAvatar');

            avatarImg.src = e.target.result;
            avatarImg.style.display = 'block';

            // Сохраняем в localStorage
            localStorage.setItem('avatar', e.target.result);

            // ✅ Обновляем аватар в header!
            const username = localStorage.getItem('username') || 'User';
            updateProfileButton(username);

            showNotification(t.imageUploaded);
        };

        reader.onerror = function() {
            showNotification(t.imageError);
        };

        reader.readAsDataURL(file);
    }
}


// ============ УВЕДОМЛЕНИЯ ============
function showNotification(message) {
    // Создаем временное уведомление
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 32px;
        background: rgba(102, 126, 234, 0.95);
        backdrop-filter: blur(20px);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ============ СМЕНА ПАРОЛЯ ============
function changePassword() {
    const t = translations[currentLang];
    const newPassword = prompt(t.enterNewPassword);

    if (newPassword && newPassword.length >= 8) {
        showNotification(t.passwordChanged);
    } else if (newPassword) {
        alert(t.passwordTooShort);
    }
}

// ============ ТУРЫ ============
function loadTours() {
    const carouselTrack = document.getElementById('carouselTrack');
    carouselTrack.innerHTML = '<div class="loading">Загрузка туров...</div>';

    setTimeout(() => {
        tours = mockTours;
        renderTourCards();
    }, 300);
}

function renderTourCards() {
    const carouselTrack = document.getElementById('carouselTrack');

    carouselTrack.innerHTML = tours.map(tour => `
        <div class="tour-card" onclick="selectTour(${tour.id})">
            <img
                src="${tour.image_url}"
                alt="${tour.destination}"
                class="tour-card-image"
                loading="lazy"
                crossorigin="anonymous"
                onerror="this.onerror=null; this.src='https://via.placeholder.com/400x300/667eea/ffffff?text=${encodeURIComponent(tour.destination)}'">
            <div class="tour-card-content">
                <div class="tour-card-destination">${tour.destination}</div>
                <div class="tour-card-price">${formatPrice(tour.price)}</div>
            </div>
        </div>
    `).join('');
}


function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    }).format(price);
}

function selectTour(tourId) {
    const tour = mockTours.find(t => t.id === tourId);
    if (!tour) return;

    // Закрываем модалку со странами если открыта
    const countryModal = document.getElementById('countryToursModal');
    if (countryModal) {
        closeCountryToursModal();
    }

    // Создаем детальное модальное окно
    const modal = document.createElement('div');
    modal.id = 'tourDetailModal';
    modal.className = 'tour-detail-modal';

    // Иконки SVG для блоков
    const icons = {
        details: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        visa: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 15h0M2 9.5h20"/></svg>',
        legal: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        prep: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>',
        country: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'
    };

    modal.innerHTML = `
        <div class="tour-detail-overlay" onclick="closeTourDetailModal()"></div>
        <div class="tour-detail-content">
            <button class="close-tour-detail" onclick="closeTourDetailModal()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <!-- Hero Section с картинкой и заголовком -->
            <div class="tour-hero">
                <img src="${tour.image_url}" alt="${tour.destination}" class="tour-hero-image">
                <div class="tour-hero-content">
                    <div class="tour-hero-title">
                        <h2>${tour.destination}</h2>
                        <div class="tour-tags">
                            <span class="tag tag-blur">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                ${tour.duration_days} ${currentLang === 'ru' ? 'дней' : 'days'}
                            </span>
                            <span class="tag tag-difficulty difficulty-${tour.difficulty.toLowerCase().split(' ')[0]}">
                                ${tour.difficulty}
                            </span>
                        </div>
                    </div>
                    <div class="tour-hero-price">
                        <span class="price-label">${currentLang === 'ru' ? 'Стоимость участия' : 'Tour Price'}</span>
                        <div class="price-value">${formatPrice(tour.price)}</div>
                    </div>
                </div>
            </div>

            <!-- Bento Grid - Сетка с информацией -->
            <div class="tour-grid-container">

                <!-- Блок 1: Описание (Широкий) -->
                <div class="info-card card-wide">
                    <div class="info-card-header">
                        <div class="info-icon">${icons.details}</div>
                        <div class="info-title">${currentLang === 'ru' ? 'О программе' : 'About Program'}</div>
                    </div>
                    <div class="info-text">${tour.tour_details}</div>
                </div>

                <!-- Блок 2: О стране (Обычный) -->
                <div class="info-card">
                    <div class="info-card-header">
                        <div class="info-icon">${icons.country}</div>
                        <div class="info-title">${currentLang === 'ru' ? 'Локация' : 'Location'}</div>
                    </div>
                    <div class="info-text">${tour.country_info}</div>
                </div>

                <!-- Блок 3: Подготовка (Широкий) -->
                <div class="info-card card-wide">
                    <div class="info-card-header">
                        <div class="info-icon">${icons.prep}</div>
                        <div class="info-title">${currentLang === 'ru' ? 'Подготовка' : 'Preparation'}</div>
                    </div>
                    <div class="info-text">${tour.preparation}</div>
                </div>

                <!-- Блок 4: Виза (Обычный) -->
                <div class="info-card">
                    <div class="info-card-header">
                        <div class="info-icon">${icons.visa}</div>
                        <div class="info-title">${currentLang === 'ru' ? 'Виза' : 'Visa Info'}</div>
                    </div>
                    <div class="info-text">${tour.visa_info}</div>
                </div>

                <!-- Блок 5: Юридическое (На всю ширину) -->
                <div class="info-card card-full">
                    <div class="info-card-header">
                        <div class="info-icon">${icons.legal}</div>
                        <div class="info-title">${currentLang === 'ru' ? 'Безопасность и документы' : 'Safety & Legal'}</div>
                    </div>
                    <div class="info-text" style="opacity: 0.6; font-size: 14px;">${tour.legal_info}</div>
                </div>

            </div>

            <!-- Футер с кнопкой -->
            <div class="tour-detail-footer">
                <button class="book-btn" onclick="alert('${currentLang === 'ru' ? 'Функция бронирования скоро появится!' : 'Booking coming soon!'}')">
                    ${currentLang === 'ru' ? 'Забронировать место' : 'Book Now'} →
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}


function closeTourDetailModal() {
    const modal = document.getElementById('tourDetailModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function scrollCarousel(direction) {
    const track = document.getElementById('carouselTrack');
    const cardWidth = 420;

    if (direction === 'left') {
        currentCarouselIndex = Math.max(0, currentCarouselIndex - 1);
    } else {
        currentCarouselIndex = Math.min(tours.length - 2, currentCarouselIndex + 1);
    }

    track.style.transform = `translateX(-${currentCarouselIndex * cardWidth}px)`;
}

// ============ КАРТА МИРА ============
async function loadMap() {
    try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
        const world = await response.json();
        worldData = topojson.feature(world, world.objects.countries);

        renderMap();
    } catch (error) {
        console.error('Error loading map:', error);
        alert('Ошибка загрузки карты');
    }
}

function renderMap() {
    // Очищаем контейнер
    const mapContainer = document.getElementById('worldMap');
    mapContainer.innerHTML = '';

    if (!worldData) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    svg = d3.select('#worldMap')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid slice');

    // ============ НАСТРОЙКА ВИДА (ФИКС) ============
    // Используем коэффициент 9.5 - это значительно уменьшит карту,
    // чтобы она вся влезла в экран с запасом
    const initialScale = width / 15;

    projection = d3.geoMercator()
        .center([200, 300]) // [10° в.д., 15° с.ш.] — Центр Африки (Чад/Нигер)
        .scale(initialScale)
        .translate([width / 2, height / 2]); // Помещаем точку центра ровно в середину экрана

    path = d3.geoPath().projection(projection);

    g = svg.append('g');

    // Настраиваем зум
    zoom = d3.zoom()
        .scaleExtent([1, 8])
        .translateExtent([[-500, -500], [width + 500, height + 500]]) // Даем немного свободы краям
        .on('zoom', (event) => {
            g.attr('transform', event.transform);

            // Коррекция маркеров при зуме
            if (event.transform.k > 1.5) {
                g.selectAll('.tour-marker-group').style('transform', `scale(${1 / Math.sqrt(event.transform.k)})`);
            } else {
                g.selectAll('.tour-marker-group').style('transform', null);
            }
        });

    svg.call(zoom);

    // ... дальше код добавления стран (g.selectAll('path')...) ОСТАВЬТЕ БЕЗ ИЗМЕНЕНИЙ


    // ... (Дальше идет код отрисовки стран и маркеров, который мы делали в прошлом шаге)
    // ОСТАВЬТЕ ЕГО БЕЗ ИЗМЕНЕНИЙ


    // 1. РИСУЕМ СТРАНЫ
    g.selectAll('path')
        .data(worldData.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', d => {
            // Проверяем, есть ли туры в этой стране
            const code = getCountryCode(d.id);
            const count = code ? getToursCountByCountry(code) : 0;
            // Если есть туры - добавляем спец класс 'has-tours'
            return count > 0 ? 'country-path has-tours' : 'country-path';
        })
        .attr('fill', '#1a2040') // Базовый цвет обычных стран
        .attr('stroke', '#2a3050')
        .attr('id', d => `country-${d.id}`) // ID для связки

        // Обработчики событий
        .on('click', function(event, d) {
            const code = getCountryCode(d.id);
            if (code && getToursCountByCountry(code) > 0) {
                // Открываем модалку только если есть туры
                const [x, y] = d3.pointer(event, document.body);
                openCountryToursModal(code, x, y);
            }
        })
        .on('mouseover', function(event, d) {
            // Подсветка страны
            const code = getCountryCode(d.id);
            const count = code ? getToursCountByCountry(code) : 0;

            // Показываем тултип (маленькую подсказку)
            showCountryTooltip(event, d, count);
        })
        .on('mousemove', moveCountryTooltip)
        .on('mouseout', hideCountryTooltip);

    // 2. РИСУЕМ МАРКЕРЫ (ПОВЕРХ СТРАН)
    // Фильтруем только страны с турами
    const countriesWithTours = worldData.features.filter(d => {
        const code = getCountryCode(d.id);
        return code && getToursCountByCountry(code) > 0;
    });

    // Для каждой такой страны добавляем группу маркера
    countriesWithTours.forEach(d => {
        const code = getCountryCode(d.id);
        const count = getToursCountByCountry(code);

        // Вычисляем центр страны для размещения маркера
        const centroid = path.centroid(d);

        // Если страна слишком маленькая или сложная, центроид может быть NaN
        if (!centroid || isNaN(centroid[0]) || isNaN(centroid[1])) return;

        // Создаем группу маркера в тех же координатах
        const markerGroup = g.append('g')
            .attr('class', 'tour-marker-group')
            .attr('transform', `translate(${centroid[0]}, ${centroid[1]})`);

        // Анимированное кольцо (радар)
        markerGroup.append('circle')
            .attr('class', 'tour-marker-pulse')
            .attr('r', 8);

        // Основной кружок
        markerGroup.append('circle')
            .attr('class', 'tour-marker-circle')
            .attr('r', 6);

        // Цифра (количество туров)
        markerGroup.append('text')
            .attr('class', 'tour-marker-text')
            .attr('y', 0.5) // Небольшая коррекция по вертикали
            .text(count);
    });

}







function updateCountryLabels() {
    g.selectAll('text').remove();

    g.selectAll('text')
        .data(worldData.features)
        .enter()
        .append('text')
        .attr('class', 'country-label')
        .attr('transform', d => {
            const centroid = path.centroid(d);
            return `translate(${centroid})`;
        })
        .text(d => {
            const numericId = d.id;
            const code = getCountryCode(numericId); // Получаем буквенный код
            const name = code ? countryNames[currentLang][code] : d.properties.name; // Используем перевод
            const area = d3.geoArea(d);

            if (area < 0.01) return '';
            if (area < 0.03 && name && name.length > 8) {
                return name.substring(0, 6) + '...';
            }
            return name || '';
        })
        .attr('font-size', d => {
            const area = d3.geoArea(d);
            if (area > 0.15) return '16px';
            if (area > 0.08) return '14px';
            if (area > 0.04) return '12px';
            if (area > 0.02) return '10px';
            if (area > 0.01) return '8px';
            return '0px';
        })
        .attr('font-weight', d => {
            const area = d3.geoArea(d);
            return area > 0.1 ? '700' : '600';
        });
}


// ============ INFO PANEL С КОЛИЧЕСТВОМ ТУРОВ ============
function showCountryInfo(d) {
    const numericId = d.id;
    const code = getCountryCode(numericId); // Получаем буквенный код
    const name = code ? (countryNames[currentLang][code] || d.properties.name) : d.properties.name;
    const toursCount = code ? getToursCountByCountry(code) : 0;
    const tourWord = getTourWordForm(toursCount, currentLang);

    document.getElementById('countryName').textContent = name;
    document.getElementById('countryToursCount').textContent = `${toursCount} ${tourWord}`;
    document.getElementById('countryInfoPanel').classList.add('show');
}


function hideCountryInfo() {
    document.getElementById('countryInfoPanel').classList.remove('show');
}

function zoomIn() {
    const newScale = Math.min(currentScale * 1.5, 8);
    svg.transition()
        .duration(300)
        .call(zoom.scaleTo, newScale);
}

function zoomOut() {
    const newScale = Math.max(currentScale / 1.5, 1);
    svg.transition()
        .duration(300)
        .call(zoom.scaleTo, newScale);
}

function resetZoom() {
    svg.transition()
        .duration(300)
        .call(zoom.transform, d3.zoomIdentity);
}

// ============ ИНИЦИАЛИЗАЦИЯ ============
window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadMap();
    updateAllTranslations();
});

// Добавляем стили для анимации уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);



// ============ МОДАЛЬНОЕ ОКНО С ТУРАМИ СТРАНЫ ============
let currentCountryCarouselIndex = 0;

function openCountryToursModal(countryCode, x, y) {
    const countryTours = mockTours.filter(tour => tour.country_code === countryCode);

    if (countryTours.length === 0) return;

    const countryName = countryNames[currentLang][countryCode] || countryCode;

    // Эффект размытия карты
    document.getElementById('mapContainer').classList.add('blurred');

    // Удаляем старое окно если есть
    const oldModal = document.getElementById('countryToursModal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.id = 'countryToursModal';
    modal.className = 'country-tours-modal';

    // Умное позиционирование
    const modalWidth = 500;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Центрируем по горизонтали относительно клика, но не даем уйти за край
    let modalX = x + 40;
    let modalY = y - 100; // Чуть выше клика

    // Если клик слишком близко к правому краю
    if (modalX + modalWidth > windowWidth - 20) {
        modalX = x - modalWidth - 40;
    }
    // Если клик слишком низко
    if (modalY + 450 > windowHeight) {
        modalY = windowHeight - 470;
    }
    // Если клик слишком высоко
    if (modalY < 20) {
        modalY = 20;
    }

    modal.style.left = `${Math.max(20, Math.min(modalX, windowWidth - modalWidth - 20))}px`;
    modal.style.top = `${modalY}px`;

    currentCountryCarouselIndex = 0;

    // Обновленный HTML с новыми SVG и структурой
    modal.innerHTML = `
        <div class="country-tours-header">
            <h3>${countryName}</h3>
            <button class="close-country-modal" onclick="closeCountryToursModal()">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                    <path d="M1 1L13 13M1 13L13 1"></path>
                </svg>
            </button>
        </div>
        <div class="country-tours-carousel">
            <button class="carousel-btn carousel-btn-left" onclick="scrollCountryCarousel('left')" ${countryTours.length <= 1 ? 'disabled' : ''}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                </svg>
            </button>
            <div class="carousel-wrapper">
                <div class="carousel-track" id="countryCarouselTrack">
                    ${countryTours.map(tour => `
                        <div class="tour-card" onclick="selectTour(${tour.id})">
                            <img src="${tour.image_url}" alt="${tour.destination}" class="tour-card-image" loading="lazy">
                            <div class="tour-card-content">
                                <div class="tour-card-destination">${tour.destination}</div>
                                <div class="tour-card-info">
                                    <div class="tour-card-duration">
                                        ${tour.duration_days} ${currentLang === 'ru' ? 'дней' : 'days'}
                                    </div>
                                    <div class="tour-card-price">${formatPrice(tour.price)}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <button class="carousel-btn carousel-btn-right" onclick="scrollCountryCarousel('right')" ${countryTours.length <= 1 ? 'disabled' : ''}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeCountryToursModal() {
    const modal = document.getElementById('countryToursModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    document.getElementById('mapContainer').classList.remove('blurred');
}

function scrollCountryCarousel(direction) {
    const track = document.getElementById('countryCarouselTrack');
    if (!track) return;

    const cards = track.querySelectorAll('.tour-card');
    const cardWidth = 350;

    if (direction === 'left') {
        currentCountryCarouselIndex = Math.max(0, currentCountryCarouselIndex - 1);
    } else {
        currentCountryCarouselIndex = Math.min(cards.length - 1, currentCountryCarouselIndex + 1);
    }

    track.style.transform = `translateX(-${currentCountryCarouselIndex * (cardWidth + 20)}px)`;
}








// ============ ТУЛТИПЫ (ПОДСКАЗКИ) ============
// ============ КОМПАКТНЫЕ ТУЛТИПЫ (НОВЫЕ) ============
const tooltip = d3.select('body').append('div')
    .attr('class', 'mini-tooltip') // Используем новый CSS класс
    .style('opacity', 0)
    .style('position', 'absolute') // Важно: absolute для привязки к странице
    .style('pointer-events', 'none') // Чтобы клики проходили сквозь него
    .style('z-index', '1500');

function showCountryTooltip(event, d, count) {
    const code = getCountryCode(d.id);
    const name = countryNames[currentLang][code] || 'Unknown';

    // Формируем HTML: только название и бейдж (если есть туры)
    let html = `<div class="tooltip-name">${name}</div>`;

    if (count > 0) {
        html += `
            <div class="tooltip-badge">
                <span class="tooltip-dot"></span>
                ${count} ${getTourWordForm(count, currentLang)}
            </div>
        `;
    }

    tooltip.html(html)
        .classed('has-tours', count > 0)
        .transition()
        .duration(200)
        .style('opacity', 1);

    updateTooltipPosition(event);

    // Подсветка страны при наведении
    if (count > 0) {
        d3.select(`#country-${d.id}`).style('filter', 'drop-shadow(0 0 10px #4facfe)');
    }
}

function moveCountryTooltip(event) {
    updateTooltipPosition(event);
}

// Функция для умного позиционирования над курсором
function updateTooltipPosition(event) {
    tooltip
        .style('left', (event.pageX) + 'px')
        .style('top', (event.pageY - 40) + 'px'); // Сдвиг на 40px вверх
}

function hideCountryTooltip(event, d) {
    tooltip.transition().duration(200).style('opacity', 0);
    // Убираем подсветку
    d3.select(`#country-${d.id}`).style('filter', null);
}




















