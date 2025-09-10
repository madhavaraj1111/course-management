1.Project Setup

creation of CourseManagement folder.

inside that courseClient folder then in this npm install , npm install tailwindcss @tailwindcss/vite and in vite.config.js need to import the tailwindcss and add tailwindcss() plugin.

and remove unwanted boiler plate codes and boiler folder and files.Keeping the needed.

2.project structure

This is the main folders

course-management-system/
├── src/
│ ├── components/
│ ├── pages/
│ ├── layouts/
│ ├── store/
│ │ ├── slices/
│ │ └── middleware/
│ ├── hooks/
│ ├── utils/
│ ├── styles/
│ ├── routes/
│ └── assets/
│
├── .eslintrc.js
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md

---Files creation---

course-management-system/
├── src/
│ ├── components/
│ │ ├── Button.jsx
│ │ ├── Modal.jsx
│ │ ├── CourseCard.jsx
│ │ └── RichTextEditor.jsx
│ │
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── CourseList.jsx
│ │ ├── CourseDetail.jsx
│ │ ├── CourseCreate.jsx
│ │ └── NotFound.jsx
│ │
│ ├── layouts/
│ │ └── MainLayout.jsx
│ │
│ ├── store/
│ │ ├── index.js # Configure Redux store
│ │ ├── slices/
│ │ │ ├── coursesSlice.js
│ │ │ ├── progressSlice.js
│ │ │ └── uiSlice.js
│ │ └── middleware/
│ │ └── storageMiddleware.js
│ │
│ ├── hooks/
│ │ ├── useLocalStorage.js
│ │ └── useDebounce.js
│ │
│ ├── utils/
│ │ ├── storage.js # LocalStorage helpers
│ │ ├── validation.js # Form validation helpers
│ │ └── sanitize.js # HTML sanitization
│ │
│ ├── styles/
│ │ ├── globals.css
│ │ └── components.css
│ │
│ ├── routes/
│ │ └── AppRoutes.jsx
│ │
│ ├── assets/ # (images, icons, thumbnails)
│ │ └── logo.png
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── .eslintrc.js
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md

3.Setting React router navigation

npm install react-router-dom

Setting up of the AppRoutes for the pages

4.Setting the intial slices and store

Initializing the storage Middleware and connecting react and redux in main.jsx using Provider