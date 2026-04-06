(function (global) {
  'use strict';

  var LOCALE_KEY = 'on-tap-locale';
  var localeListeners = [];

  var STRINGS = {
    vi: {
      skipLink: 'Bỏ qua điều hướng',
      docTitle: 'Ôn tập Flutter & Dart — Tài liệu',
      navOpenMenu: 'Mở menu',
      brandTitle: 'Ôn tập Flutter & Dart',
      brandTagline: 'Module 1–12 · ON_TAP_FLUTTER_CUOI_KY.md',
      sidebarCollapseHide: 'Ẩn mục lục bên trái',
      sidebarCollapseShow: 'Hiện mục lục bên trái',
      sidebarCollapseTitle: 'Ẩn / hiện mục lục',
      sidebarToggleMobile: 'Ẩn / hiện mục lục',
      searchLabel: 'Tìm kiếm',
      searchDocTitle: 'Tìm trong tài liệu',
      searchPlaceholder: 'Tìm kiếm…',
      themeToggleTitle: 'Đổi giao diện sáng/tối',
      langSwitchAria: 'Ngôn ngữ',
      langVi: 'Tiếng Việt',
      langEn: 'English',
      sidebarTocHint: 'Mục lục (theo mục ##)',
      tocAria: 'Mục lục',
      sidebarQuizHint: 'Kiểm tra trắc nghiệm',
      quizFieldsetLegend: 'Chọn một hoặc nhiều module',
      quizSelectAll: 'Tất cả',
      quizSelectNone: 'Bỏ chọn',
      quizModuleGroupAria: 'Module ôn tập',
      quizStart: 'Bắt đầu',
      footnote:
        'Tài liệu nhúng trong <code>index.html</code>. Câu hỏi: <code>quiz-data.json</code> (mở trang qua HTTP nếu không tải được file).',
      loadingText: 'Đang tải nội dung…',
      errorMdLine1: '<strong>Chưa có nội dung markdown.</strong>',
      errorMdHint:
        'Thiếu dữ liệu nhúng trong <code>index.html</code> (script <code>embedded-md-json</code>).',
      quizPanelTitleDefault: 'Kiểm tra',
      quizCloseTitle: 'Thoát',
      quizCloseAria: 'Thoát kiểm tra',
      quizFeedbackCorrectAnswer: 'Đáp án đúng',
      quizFeedbackExact: 'Chính xác',
      quizContinue: 'Tiếp tục',
      quizCompleteTitle: 'Hoàn thành',
      quizBackToDoc: 'Quay lại tài liệu',
      fabTopTitle: 'Lên đầu trang',
      fabTopAria: 'Lên đầu trang',
      quizLoadFailed:
        'Không tải được quiz-data.json. Hãy mở trang qua HTTP (vd Live Server) hoặc nhúng JSON vào #quiz-data-embed.',
      quizNoneSelected: 'Chưa chọn module nào.',
      quizAllSelected: 'Đã chọn tất cả — {n} câu.',
      quizSomeSelected: 'Đã chọn {m} module — {n} câu.',
      quizProgressFmt: 'Câu {i} / {total}',
      quizScoreCore: 'Đúng {c} / {n} câu',
      quizScoreWrong: ' · Sai hoặc xem lại: {w} lượt',
      quizTitleAll: 'Kiểm tra — tất cả module ({n} câu)',
      quizTitleOne: 'Kiểm tra — {name} ({n} câu)',
      quizTitleMulti: 'Kiểm tra — {m} module ({n} câu)',
      errorMarkdownParse: 'Lỗi phân tích markdown: ',
      errorMissingMd: 'Thiếu nội dung nhúng (EMBEDDED_MD).',
      articleEnLoadFailed:
        'Không tải được docs-en.md (mở trang qua HTTP hoặc đặt file cùng thư mục). Đang hiển thị bản tiếng Việt.',
    },
    en: {
      skipLink: 'Skip to content',
      docTitle: 'Flutter & Dart review — Docs',
      navOpenMenu: 'Open menu',
      brandTitle: 'Flutter & Dart review',
      brandTagline: 'Modules 1–12 · ON_TAP_FLUTTER_CUOI_KY.md',
      sidebarCollapseHide: 'Hide left table of contents',
      sidebarCollapseShow: 'Show left table of contents',
      sidebarCollapseTitle: 'Show / hide table of contents',
      sidebarToggleMobile: 'Show / hide table of contents',
      searchLabel: 'Search',
      searchDocTitle: 'Search in document',
      searchPlaceholder: 'Search…',
      themeToggleTitle: 'Toggle light/dark theme',
      langSwitchAria: 'Language',
      langVi: 'Vietnamese',
      langEn: 'English',
      sidebarTocHint: 'Table of contents (## headings)',
      tocAria: 'Table of contents',
      sidebarQuizHint: 'Multiple-choice quiz',
      quizFieldsetLegend: 'Choose one or more modules',
      quizSelectAll: 'All',
      quizSelectNone: 'Clear',
      quizModuleGroupAria: 'Review modules',
      quizStart: 'Start',
      footnote:
        'Article is embedded in <code>index.html</code>. Questions: <code>quiz-data.json</code> (serve over HTTP if the file fails to load).',
      loadingText: 'Loading content…',
      errorMdLine1: '<strong>No markdown content.</strong>',
      errorMdHint: 'Missing embedded data in <code>index.html</code> (<code>embedded-md-json</code> script).',
      quizPanelTitleDefault: 'Quiz',
      quizCloseTitle: 'Close',
      quizCloseAria: 'Exit quiz',
      quizFeedbackCorrectAnswer: 'Correct answer',
      quizFeedbackExact: 'Correct',
      quizContinue: 'Continue',
      quizCompleteTitle: 'Finished',
      quizBackToDoc: 'Back to docs',
      fabTopTitle: 'Back to top',
      fabTopAria: 'Back to top',
      quizLoadFailed:
        'Could not load quiz-data.json. Open the page over HTTP (e.g. Live Server) or embed JSON in #quiz-data-embed.',
      quizNoneSelected: 'No module selected.',
      quizAllSelected: 'All modules selected — {n} questions.',
      quizSomeSelected: '{m} modules selected — {n} questions.',
      quizProgressFmt: 'Question {i} of {total}',
      quizScoreCore: '{c} / {n} correct',
      quizScoreWrong: ' · Wrong or reviewed: {w}',
      quizTitleAll: 'Quiz — all modules ({n} questions)',
      quizTitleOne: 'Quiz — {name} ({n} questions)',
      quizTitleMulti: 'Quiz — {m} modules ({n} questions)',
      errorMarkdownParse: 'Markdown parse error: ',
      errorMissingMd: 'Missing embedded content (EMBEDDED_MD).',
      articleEnLoadFailed:
        'Could not load docs-en.md (serve over HTTP or keep the file next to index.html). Showing Vietnamese.',
    },
  };

  function getLocale() {
    var s = localStorage.getItem(LOCALE_KEY);
    return s === 'en' ? 'en' : 'vi';
  }

  function setLocale(loc) {
    var next = loc === 'en' ? 'en' : 'vi';
    localStorage.setItem(LOCALE_KEY, next);
    applyDomI18n();
    syncLangButtons();
    localeListeners.forEach(function (fn) {
      try {
        fn(next);
      } catch (e) {
        /* ignore */
      }
    });
  }

  function t(key, params) {
    var loc = getLocale();
    var table = STRINGS[loc] || STRINGS.vi;
    var s = table[key];
    if (s == null) s = STRINGS.vi[key];
    if (s == null) s = key;
    if (params && typeof s === 'string') {
      Object.keys(params).forEach(function (k) {
        s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), String(params[k]));
      });
    }
    return s;
  }

  function applyDomI18n() {
    document.documentElement.lang = getLocale();

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (key) el.innerHTML = t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (key) el.setAttribute('placeholder', t(key));
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria-label');
      if (key) el.setAttribute('aria-label', t(key));
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-title');
      if (key) el.setAttribute('title', t(key));
    });

    document.title = t('docTitle');
  }

  function syncLangButtons() {
    var loc = getLocale();
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      var active = btn.getAttribute('data-set-lang') === loc;
      btn.classList.toggle('lang-btn--active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function wireLangButtons() {
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      if (btn.dataset.langWired === '1') return;
      btn.dataset.langWired = '1';
      btn.addEventListener('click', function () {
        setLocale(btn.getAttribute('data-set-lang'));
      });
    });
    syncLangButtons();
  }

  function onLocaleChange(fn) {
    if (typeof fn === 'function') localeListeners.push(fn);
  }

  global.I18N = {
    LOCALE_KEY: LOCALE_KEY,
    getLocale: getLocale,
    setLocale: setLocale,
    t: t,
    applyDomI18n: applyDomI18n,
    wireLangButtons: wireLangButtons,
    onLocaleChange: onLocaleChange,
    syncLangButtons: syncLangButtons,
  };
})(window);
