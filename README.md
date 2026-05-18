# 🚀 Vue Boilerplate

Boilerplate **Vue 3 + Vite** yang scalable dan reusable untuk mempercepat development aplikasi web seperti **dashboard, admin panel, atau sistem berbasis CRUD**.

Dibangun dengan arsitektur modular berbasis fitur (**feature-based architecture**) serta kumpulan reusable component, composable, layout, dan utility yang siap digunakan.

---

## ✨ Fitur

- ⚡ Vue 3 + Vite
- 🎨 Tailwind CSS
- 🧩 Auto Import Components
- 📁 Struktur modular & scalable
- 🔐 Authentication (Login, Register, Forgot Password)
- 📦 Reusable Components
- 🪝 Custom Composables
- 📊 Chart Components
- 📄 Table, Pagination & Filter
- 🧭 Vue Router
- 🖼️ Image Cropper
- 🔔 Toast & Confirm
- 📱 Responsive Layout
- 🌙 Mudah dikustomisasi

---

## 🛠️ Tech Stack

- Vue 3
- Vite
- Tailwind CSS
- Vue Router
- Composition API
- `unplugin-vue-components`

---

## 📦 Instalasi

Clone repository:

```bash
git clone https://github.com/ilhamrhmtkbr/boilerplate-vue-plain.git
cd boilerplate-vue-plain
```

Install dependencies:

```bash
npm install
```

---

## 🧑‍💻 Menjalankan Project

Jalankan development server:

```bash
npm run dev
```

Aplikasi akan berjalan di:

```txt
http://localhost:5173
```

---

## 🏗️ Build Production

Build project:

```bash
npm run build
```

Preview hasil build:

```bash
npm run preview
```

---


## 📁 Struktur Project

```txt
.
├── public
│   ├── iamra-logo.svg
│   └── sprite.svg
│
├── src
│   ├── assets
│   │   └── fonts
│   │
│   ├── components
│   │   ├── common
│   │   ├── custom
│   │   ├── layouts
│   │   └── utils
│   │
│   ├── composables
│   │
│   ├── config
│   │
│   ├── features
│   │   ├── auth
│   │   ├── dashboard
│   │   ├── product
│   │   └── user
│   │
│   ├── router
│   ├── App.vue
│   ├── main.js
│   └── style.css
│
├── vite.config.js
├── package.json
└── README.md
```

---

## 🧱 Arsitektur Project

Project ini menggunakan pendekatan **feature-based architecture**, sehingga setiap fitur memiliki module masing-masing.

Contoh:

```txt
features/
├── auth/
├── dashboard/
├── product/
└── user/
```

Pendekatan ini mempermudah:

- maintenance project
- scalability
- reusable code
- pemisahan logic antar fitur

Reusable component disimpan di:

```txt
components/common/
```

Reusable logic/composition disimpan di:

```txt
composables/
```

---

## 🧩 Komponen yang Tersedia

### UI Components

- Accordion
- Badge
- Breadcrumb
- Button
- Modal
- Pagination
- Table
- Tooltip
- Timeline
- Toggle
- Toast
- Stepper

### Form Components

- Form Field
- Form Float
- Form Fieldset
- Form Image Cropper

### Data Visualization

- Chart Line
- Chart Bar
- Chart Pie
- Chart Doughnut

### Utilities

- Loading Spinner
- Loading Pulse
- Loading Bar
- Export Docs
- Filter
- No Data

---


## 📜 Scripts

```bash
npm run dev       # menjalankan development server
npm run build     # build production
npm run preview   # preview hasil build
```

---

## 🤝 Kontribusi

Pull request terbuka untuk improvement atau penambahan fitur.

Jika ada perubahan besar, disarankan membuat issue terlebih dahulu untuk diskusi.

---

## 📄 License

MIT License © 2026