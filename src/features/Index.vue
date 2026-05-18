<script setup>
import {computed, ref} from "vue";
// ======== Setup Component ========
const rawCodes = import.meta.glob('../components/**/*.vue', {
  as: 'raw',
  eager: true
})
const codeMap = {}

for (const path in rawCodes) {
  const name = path.split('/').pop().replace('.vue', '').toLowerCase()
  codeMap[name] = rawCodes[path]
}
// ======== Setup Component ========

// ======== Setup Sidebar ========
const isSidebarCollapsed = ref(false)
const showSidebar = ref(true)

const containerPadLeft = computed(() => {
  if (showSidebar.value) {
    if (isSidebarCollapsed.value) {
      return 'p-[var(--m)_var(--m)_var(--m)_calc(var(--width-sidebar-collapse)+var(--m)*2)]'
    } else {
      return 'pl-[calc(var(--width-sidebar-expanded)+var(--m)*2)]'
    }
  } else {
    return 'pl-[var(--m)]'
  }
})

const navItems = [
  {type: 'link', to: '#accordion', svg: 'accordion', text: 'Accordion'},
  {type: 'link', to: '#badge', svg: 'badge', text: 'Badge'},
  {type: 'link', to: '#bottom-sheet', svg: 'bottom-sheet', text: 'Bottom Sheet'},
  {type: 'link', to: '#breadcrumb', svg: 'breadcrumb', text: 'Breadcrumb'},
  {type: 'link', to: '#button', svg: 'button', text: 'Button'},
  {type: 'link', to: '#card', svg: 'card', text: 'Card'},
  {type: 'link', to: '#chart', svg: 'chart', text: 'Chart'},
  {type: 'link', to: '#data', svg: 'data', text: 'Data'},
  {type: 'link', to: '#export', svg: 'export', text: 'Export'},
  {type: 'link', to: '#filter', svg: 'filter', text: 'Filter'},
  {type: 'link', to: '#form', svg: 'form', text: 'Form'},
  {type: 'link', to: '#loading', svg: 'loading', text: 'Loading'},
  {type: 'link', to: '#modal', svg: 'modal', text: 'Modal'},
  {type: 'link', to: '#no-data', svg: 'no-data', text: 'No Data'},
  {type: 'link', to: '#pagination', svg: 'pagination', text: 'Pagination'},
  {type: 'link', to: '#section-title', svg: 'section-title', text: 'Section Title'},
  {type: 'link', to: '#stepper', svg: 'stepper', text: 'Stepper'},
  {type: 'link', to: '#table', svg: 'table', text: 'Table'},
  {type: 'link', to: '#timeline', svg: 'timeline', text: 'Timeline'},
  {type: 'link', to: '#toast', svg: 'toast', text: 'Toast'},
  {type: 'link', to: '#toggle', svg: 'toggle', text: 'Toggle'},
  {type: 'link', to: '#tooltip', svg: 'tooltip', text: 'Tooltip'}
]
// ======== Setup Sidebar ========

// ======== Preview Modal ========
const showModal = ref(false)
// ======== Preview Toast ========
const isToastVisible = ref(false)

// ======== Preview Css ========
const cssCode = `@import "tailwindcss";

@font-face {
    font-family: Light;
    src: url("./assets/fonts/Poppins-Light.ttf");
}

@font-face {
    font-family: Regular;
    src: url("./assets/fonts/Poppins-Regular.ttf");
}

@font-face {
    font-family: Medium;
    src: url("./assets/fonts/Poppins-Medium.ttf");
}

@font-face {
    font-family: Bold;
    src: url("./assets/fonts/Poppins-Bold.ttf");
}

@keyframes skeleton-loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

@theme {
    --font-bold: 'Bold', ui-sans-serif;
    --font-medium: 'Medium', ui-sans-serif;
    --font-regular: 'Regular', ui-sans-serif;
    --font-light: 'Light', ui-sans-serif;
    --animate-skeleton: skeleton-loading 2s infinite;
    --shadow-box: var(--box-shadow);
}

@variant dark (&:where(.dark, .dark *));

:root {
    --bg-color: #ffffff;
    --transbg-color: rgba(255, 255, 255, 0.8);
    --sidebar-color: #F5F6FF; /* subtle indigo wash, nyambung sama primary */
    --sidebar-hover-color: #ECEEFF; /* indigo-tinted hover */
    --text-color: #212529;
    --transtext-color: rgba(33, 37, 41, 0.8);
    --link-color: #494b59;
    --translink-color: rgba(73, 75, 89, 0.15);
    --border-color: #dee2e6;
    --scrollthumb-color: #adb5bd;
    --primary-color: #4f46e5;
    --transprimary-color: rgba(79, 70, 229, 0.08);
    --second-primary-color: #7c3aed;
    --transsecond-primary-color: rgba(124, 58, 237, 0.08);
    --third-primary-color: #2563eb;
    --transthird-primary-color: rgba(37, 99, 235, 0.08);
    --danger-color: #dc2626;
    --transdanger-color: rgba(220, 38, 38, 0.08);
    --success-color: #16a34a;
    --transsuccess-color: rgba(22, 163, 74, 0.08);
    --warning-color: #d97706; /* amber-600, lebih clean dari orange */
    --transwarning-color: rgba(217, 119, 6, 0.08);
    --border: 1px solid var(--border-color);
    --box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.08);
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.08);
    -moz-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.08);
    --xxxx: 2.25rem;
    --xxx: 2rem;
    --xx: 1.75rem;
    --x: 1.5rem;
    --l: 1.25rem;
    --m: 1rem;
    --s: .875rem;
    --xs: .675rem;
    --xxs: .475rem;
    --radius-x: .775rem;
    --radius-l: .575rem;
    --radius-m: .375rem;
    --radius-s: .275rem;
    --width-sidebar-expanded: 253px;
    --width-sidebar-collapse: 75px;
    --height-container-header: 63px;
    --ideal-distance-to-header: calc(var(--height-container-header) + var(--m) * 2);
}

.dark {
    --bg-color: #0F172A;
    --transbg-color: #0F172Acc;
    --sidebar-color: #1E293B;
    --sidebar-hover-color: #334155;
    --text-color: #F1F5F9;
    --transtext-color: #F1F5F980;
    --link-color: #a8aabf;
    --translink-color: rgba(168, 170, 191, 0.15);
    --border-color: #334155;
    --scrollthumb-color: #475569;
    --primary-color: #818CF8;
    --transprimary-color: #818CF826;
    --second-primary-color: #A78BFA;
    --transsecond-primary-color: #A78BFA26;
    --third-primary-color: #60A5FA;
    --transthird-primary-color: #60A5FA26;
    --danger-color: #F87171;
    --transdanger-color: #F8717126;
    --success-color: #34D399;
    --transsuccess-color: #34D39926;
    --warning-color: #FBBF24;
    --transwarning-color: #FBBF2426;
    --border: 1px solid var(--border-color);
    --box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
}

@theme inline {
    /* ── Text / Background / Surface ── */
    --color-bg: var(--bg-color);
    --color-transbg: var(--transbg-color);
    --color-sidebar: var(--sidebar-color);
    --color-sidebar-hover: var(--sidebar-hover-color);
    --color-text: var(--text-color);
    --color-transtext: var(--transtext-color);
    --color-link: var(--link-color);
    --color-translink: var(--translink-color);
    --color-border: var(--border-color);
    --color-scrollthumb: var(--scrollthumb-color);

    /* ── Brand colors ── */
    --color-primary: var(--primary-color);
    --color-transprimary: var(--transprimary-color);
    --color-secondary: var(--second-primary-color);
    --color-transsecondary: var(--transsecond-primary-color);
    --color-tertiary: var(--third-primary-color);
    --color-transtertiary: var(--transthird-primary-color);

    /* ── Semantic colors ── */
    --color-danger: var(--danger-color);
    --color-transdanger: var(--transdanger-color);
    --color-success: var(--success-color);
    --color-transsuccess: var(--transsuccess-color);
    --color-warning: var(--warning-color);
    --color-transwarning: var(--transwarning-color);

    --color-surface: var(--bg-color);
    --color-line: var(--border-color);
}

::-webkit-scrollbar {
    width: 11px;
}

::-webkit-scrollbar-track {
    background: var(--border-color);
    border-radius: 25px;
}

::-webkit-scrollbar-thumb {
    background-color: var(--scrollthumb-color);
    border-radius: 25px;
}

hr {
    width: 100%;
    border: none;
    border-top: var(--border);
}

html {
    scroll-behavior: smooth;
    font-size: 15px;
}

body {
    font-size: var(--m);
    font-family: Regular, ui-sans-serif;
    color: var(--text-color);
    background-color: var(--bg-color);
    box-sizing: border-box;
}

.border-style-default {
    border: var(--border);
}

.padding-top-ideal-distance-to-header {
    padding-top: var(--ideal-distance-to-header) !important;
}

.margin-top-ideal-distance-to-header {
    margin-top: var(--ideal-distance-to-header) !important;
}`
</script>

<template>
  <BottomNav/>
  <Sidebar :isSidebarCollapsed="isSidebarCollapsed" @toggle="isSidebarCollapsed = !isSidebarCollapsed"
           :showSidebar="showSidebar" :navItems="navItems"/>
  <main :class="[`transition-all duration-300 w-full max-w-[1920px] box-border
                min-h-[100dvh] mx-auto pr-[var(--m)] pt-[var(--m)] pb-[var(--m)]`, containerPadLeft]">
    <ContentHeader @toggle-show="showSidebar = !showSidebar"/>
    <ContentSection>

      <!-- Style Css -->
      <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid max-w-[1000px]">
        <SectionTitle text="Style Css"/>
        <SyntaxHljs :code="cssCode" language="html">
        </SyntaxHljs>
      </div>

      <!-- App Layout -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="accordion">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="App Layout"/>
          <SyntaxHljs :code="codeMap.applayout" language="html">
          </SyntaxHljs>
        </div>
      </div>

      <!-- Bottom Nav -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="accordion">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Bottom Nav"/>
          <SyntaxHljs :code="codeMap.bottomnav" language="html">
          </SyntaxHljs>
        </div>
      </div>

      <!-- Content Footer -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="accordion">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Content Footer"/>
          <SyntaxHljs :code="codeMap.contentfooter" language="html">
          </SyntaxHljs>
        </div>
      </div>

      <!-- Content Header -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="accordion">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Content Header"/>
          <SyntaxHljs :code="codeMap.contentheader" language="html">
          </SyntaxHljs>
        </div>
      </div>

      <!-- Content Section -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="accordion">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Content Section"/>
          <SyntaxHljs :code="codeMap.contentsection" language="html">
          </SyntaxHljs>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="accordion">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Sidebar"/>
          <SyntaxHljs :code="codeMap.sidebar" language="html">
          </SyntaxHljs>
        </div>
      </div>

      <!-- Accordion -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="accordion">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Accordion"/>
          <SyntaxHljs :code="codeMap.accordion" language="html">
            <Accordion/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Badge -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="badge">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Badge"/>
          <SyntaxHljs :code="codeMap.badge" language="html">
            <div class="flex align-center flex-wrap gap-[var(--m)] pb-[var(--m)]">
              <Badge text="Message" variant="primary" :closable="true"/>
              <Badge text="Message" variant="warning" :closable="true"/>
              <Badge text="Message" variant="danger" :closable="true"/>
              <Badge text="Message" variant="success" :closable="true"/>
            </div>
            <div class="flex align-center flex-wrap gap-[var(--m)]">
              <Badge text="Message" variant="primary" :closable="false"/>
              <Badge text="Message" variant="warning" :closable="false"/>
              <Badge text="Message" variant="danger" :closable="false"/>
              <Badge text="Message" variant="success" :closable="false"/>
            </div>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Bottom Sheet -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="bottom-sheet">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Bottom Sheet"/>
          <SyntaxHljs :code="codeMap.bottomsheet" language="html">
            <BottomSheet>
              <template #trigger>
                <Button text="Open" type="outline"/>
              </template>
              <template #header>🖱</template>
              <template #default>
                <h1>Custom Content</h1>
                <p>Isi bebas</p>
              </template>
            </BottomSheet>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Breadcrumb -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="breadcrumb">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Breadcrumb"/>
          <SyntaxHljs :code="codeMap.breadcrumb" language="html">
            <Breadcrumb/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Button -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="button">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Button"/>
          <SyntaxHljs :code="codeMap.button" language="html">
            <div class="flex align-center gap-[var(--m)] flex-wrap">
              <Button text="Click"/>
              <Button text="Delete" variant="danger"/>
              <Button text="Outline" variant="primary" type="outline"/>
              <Button text="Badge" variant="success" type="badge"/>
              <Button text="Loading" variant="warning" :loading="true"/>
              <Button text="Disabled" :disabled="true"/>
            </div>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Card -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="card">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Card"/>
          <SyntaxHljs :code="codeMap.cardwrapper" language="html">
            <div
                class="grid grid-cols-[repeat(auto-fit,_minmax(325px,_1fr))] gap-[var(--x)_var(--l)] box-border max-[800px]:grid-cols-1">
              <CardWrapper replace-shadow-with-border>
                <div>
                  <div class="text-[length:var(--x)] font-medium">Ilham Rahmat Akbar</div>
                  <p>Fullstack Dev</p>
                  <small class="text-[length:var(--s)] font-light text-link">Jakarta</small>
                </div>
                <template #actions>
                  <a class="text-primary hover:font-medium hover:underline">Hire</a>
                  <a class="text-success hover:font-medium hover:underline">Contact</a>
                </template>
                <template #datetime>
                  <p class="text-link text-[length:var(--s))] font-light">5 min ago</p>
                </template>
              </CardWrapper>
            </div>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Chart -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="chart">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Chart"/>
          <SyntaxHljs :code="codeMap.chartbar" language="html">
            <ChartBar name="Revenue Bulanan"
                      :stats="[{ label: 'Jan', value: 450 }, { label: 'Feb', value: 590 }, { label: 'Mar', value: 800 }, { label: 'Apr', value: 320 }]"/>
          </SyntaxHljs>
          <SyntaxHljs :code="codeMap.chartdoughnut" language="html">
            <ChartDoughnut name="Transaksi"
                           :stats="[{ label: 'Penjualan', value: 500, color: '#6366f1' }, { label: 'Retur', value: 20, color: '#f59e0b' }, { label: 'Pending', value: 45, color: '#10b981' }]"/>
          </SyntaxHljs>
          <SyntaxHljs :code="codeMap.chartline" language="html">
            <ChartLine name="Pengunjung Bulanan"
                       :stats="[{ label: 'Jan', value: 120 }, { label: 'Feb', value: 380 }, { label: 'Mar', value: 210 }, { label: 'Apr', value: 540 }]"/>
          </SyntaxHljs>
          <SyntaxHljs :code="codeMap.chartpie" language="html">
            <ChartPie name="Distribusi Kategori"
                      :stats="[{ label: 'Elektronik', value: 500, color: '#6366f1' }, { label: 'Fashion', value: 320, color: '#f59e0b' }, { label: 'Makanan', value: 180, color: '#10b981' }, { label: 'Lainnya', value: 90 }]"/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Data -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="data">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Data"/>
          <SyntaxHljs :code="codeMap.datawrapper" language="html">
            <DataWrapper/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Export -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="export">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Export"/>
          <SyntaxHljs :code="codeMap.exportdocs" language="html">
            <ExportDocs export-excel-url="" export-pdf-url=""/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Filter -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="filter">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Filter"/>
          <SyntaxHljs :code="codeMap.filter" language="html">
            <Filter title="Sort By" :filters="['Ascending', 'Descending']" value="asc"/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Form -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="form">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Form Example"/>
          <SyntaxHljs :code="codeMap.formexample" language="html">
            <FormExample/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Loading -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="loading">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Loading"/>
          <SyntaxHljs :code="codeMap.loadingbar" language="html">
            <LoadingBar/>
          </SyntaxHljs>
          <SyntaxHljs :code="codeMap.loadingpulse" language="html">
            <LoadingPulse width="48px" height="48px" rounded="rounded-full"/>
          </SyntaxHljs>
          <SyntaxHljs :code="codeMap.loadingspinner" language="html">
            <LoadingSpinner/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- No Data -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="no-data">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="No Data"/>
          <SyntaxHljs :code="codeMap.nodata" language="html">
            <NoData/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Modal -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="modal">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Modal"/>
          <SyntaxHljs :code="codeMap.modal" language="html">
            <Button text="Trigger" @click="showModal = true"/>
            <Modal :isOpen="showModal" title="Konfirmasi" @close="showModal = false">
              <p>Ini adalah bagian konten modal.</p>
              <template #footer>
                <p>Ini bagian footer</p>
              </template>
            </Modal>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Pagination -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="pagination">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Pagination"/>
          <SyntaxHljs :code="codeMap.pagination" language="html">
            <Pagination :currentPage="12" :totalPages="14" :perPage="5"/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Section Title -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="stepper">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Section Title"/>
          <SyntaxHljs :code="codeMap.sectiontitle" language="html">
            <SectionTitle text="Section Title"/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Stepper -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="stepper">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Stepper"/>
          <SyntaxHljs :code="codeMap.stepper" language="html">
            <Stepper :steps="[{label: 'Resume'}, {label: 'Email'}, {label: 'Salary'}]"/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Table -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="table">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Table"/>
          <SyntaxHljs :code="codeMap.table" language="html">
            <Table :headers="['No', 'Title', 'Actions']" :items="[{title: 'Example 1'}]">
              <template #row="{ item, index }">
                <td class="min-h-[63px] h-[63px] text-center">{{ index + 1 }}.</td>
                <td class="min-h-[63px] h-[63px] fit whitespace-normal break-words min-w-[175px]">{{ item.title }}</td>
                <td class="min-h-[63px] h-[63px] flex items-center justify-around gap-[var(--s)]">
                  <a class="text-primary hover:underline cursor-pointer font-medium capitalize text-[var(--s)]">Save</a>
                  <div class="text-success hover:underline cursor-pointer font-medium capitalize text-[var(--s)]">Edit
                  </div>
                  <button class="text-warning hover:underline cursor-pointer font-medium capitalize text-[var(--s)]">
                    Delete
                  </button>
                </td>
              </template>
            </Table>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Timeline -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="timeline">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Timeline"/>
          <SyntaxHljs :code="codeMap.timeline" language="html">
            <Timeline
                :items="[{ title: 'Project Started', desc: '...', time: '2 hours ago', active: true }, { title: 'Project Started', desc: '...', time: '2 hours ago', active: true }]"/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Toast -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="toast">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Toast"/>
          <SyntaxHljs :code="codeMap.toast" language="html">
            <Button text="Trigger" @click="isToastVisible = true"/>
            <Toast :show="isToastVisible" message="Data Berhasil Disimpan!" type="success"
                   @close="isToastVisible = false"/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Toggle -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="toggle">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Toggle"/>
          <SyntaxHljs :code="codeMap.toggle" language="html">
            <Toggle/>
          </SyntaxHljs>
        </div>
      </div>

      <!-- Tooltip -->
      <div class="max-w-[1000px] padding-top-ideal-distance-to-header" id="tooltip">
        <div class="p-[var(--m)] shadow-[var(--box-shadow)] rounded-[var(--radius-m)] grid">
          <SectionTitle text="Tooltip"/>
          <SyntaxHljs :code="codeMap.tooltip" language="html">
            <Tooltip text="Java">
              <p class="cursor-pointer">Java</p>
            </Tooltip>
          </SyntaxHljs>
        </div>
      </div>

    </ContentSection>
    <ContentFooter/>
  </main>
</template>