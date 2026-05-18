<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi.js'
import { useToast } from '@/composables/useToast.js'
import { useConfirm } from '@/composables/useConfirm.js'
import { usePagination } from '@/composables/usePagination.js'

const router                                                       = useRouter()
const { get, del, loading }                                        = useApi()
const { showToast }                                                = useToast()
const { showConfirm }                                              = useConfirm()
const { currentPage, perPage, totalPages, setTotal, reset }        = usePagination()

const users        = ref([])
const search       = ref('')
const roleFilter   = ref('')

const ROLE_OPTIONS = [
  { label: 'Admin',     value: 'admin' },
  { label: 'User',      value: 'user' },
  { label: 'Moderator', value: 'moderator' },
]

// ── Fetch ──────────────────────────────────────────────────────────
async function fetchUsers() {
  // TODO: Uncomment saat API siap
  // try {
  //   const res = await get('/users', {
  //     page:     currentPage.value,
  //     per_page: perPage.value,
  //     search:   search.value,
  //     role:     roleFilter.value,
  //   })
  //   users.value = res.data.data
  //   setTotal(res.data.meta.total)   // Laravel pagination
  // } catch {
  //   showToast('Gagal memuat data user', 'danger')
  // }

  // Mock Data — hapus setelah API siap
  users.value = [
    { id: 1, name: 'Andi Wijaya',    email: 'andi@mail.com',   role: 'admin',     status: 'active' },
    { id: 2, name: 'Budi Santoso',   email: 'budi@mail.com',   role: 'user',      status: 'active' },
    { id: 3, name: 'Citra Dewi',     email: 'citra@mail.com',  role: 'moderator', status: 'inactive' },
    { id: 4, name: 'Doni Kurniawan', email: 'doni@mail.com',   role: 'user',      status: 'active' },
    { id: 5, name: 'Eka Putri',      email: 'eka@mail.com',    role: 'user',      status: 'active' },
  ]
  setTotal(users.value.length)
}

async function handleDelete(id) {
  const ok = await showConfirm('Hapus User', 'Yakin ingin menghapus user ini? Tindakan tidak bisa dibatalkan.')
  if (!ok) return
  try {
    // await del(`/users/${id}`)
    showToast('User berhasil dihapus', 'success')
    fetchUsers()
  } catch {
    showToast('Gagal menghapus user', 'danger')
  }
}

function handleSearch() {
  reset()
  fetchUsers()
}

function onPageChange(page) {
  currentPage.value = page
  fetchUsers()
}

function onPerPageChange(pp) {
  perPage.value = pp
  reset()
  fetchUsers()
}

onMounted(fetchUsers)
</script>

<template>
  <div class="grid gap-[var(--m)]">

    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-[var(--m)]">
      <div>
        <SectionTitle text="Manajemen User" />
        <Breadcrumb />
      </div>
      <Button text="+ Tambah User" variant="primary" @click="router.push('/user/create')" />
    </div>

    <!-- Filter Row -->
    <div class="flex flex-wrap items-center gap-[var(--m)]">

      <!-- Search Input -->
      <div class="flex items-center gap-[var(--xxs)]
                  border border-line rounded-[var(--radius-s)]
                  px-[var(--xs)] py-[var(--xxs)] bg-surface
                  w-full max-w-[300px] focus-within:border-primary transition-colors">
        <svg class="max-w-[var(--m)] max-h-[var(--m)] shrink-0 fill-none stroke-link"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="6"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          v-model="search"
          type="text"
          placeholder="Cari nama / email..."
          class="outline-none border-none bg-transparent text-text
                 placeholder:text-link text-[length:var(--s)] w-full"
          @keyup.enter="handleSearch"
        />
      </div>

      <!-- Filter Role -->
      <Filter
        title="Filter Role"
        :filters="ROLE_OPTIONS"
        :value="roleFilter"
        @update:value="(val) => { roleFilter = val; handleSearch() }"
      />

      <!-- Reset -->
      <Button
        v-if="search || roleFilter"
        text="Reset Filter"
        variant="danger"
        type="outline"
        @click="() => { search = ''; roleFilter = ''; handleSearch() }"
      />
    </div>

    <!-- Table Card -->
    <CardWrapper replace-shadow-with-border>
      <LoadingPulse v-if="loading" height="300px" />

      <template v-else>
        <NoData v-if="!users.length" />

        <template v-else>
          <Table
            :headers="['No', 'Nama', 'Email', 'Role', 'Status', 'Aksi']"
            :items="users"
          >
            <template #row="{ item, index }">
              <td class="text-center px-[var(--xs)] py-[var(--s)]">
                {{ (currentPage - 1) * perPage + index + 1 }}
              </td>
              <td class="px-[var(--xs)] py-[var(--s)] font-medium whitespace-normal min-w-[150px]">
                {{ item.name }}
              </td>
              <td class="px-[var(--xs)] py-[var(--s)] text-link">{{ item.email }}</td>
              <td class="px-[var(--xs)] py-[var(--s)] capitalize">{{ item.role }}</td>
              <td class="px-[var(--xs)] py-[var(--s)]">
                <span :class="[
                  'px-[var(--xs)] py-[2px] rounded-full text-[length:var(--xs)] font-medium',
                  item.status === 'active' ? 'bg-transsuccess text-success' : 'bg-transdanger text-danger'
                ]">
                  {{ item.status === 'active' ? 'Aktif' : 'Nonaktif' }}
                </span>
              </td>
              <td class="action px-[var(--xs)] py-[var(--s)]">
                <div class="flex items-center gap-[var(--m)] text-[length:var(--s)]">
                  <router-link :to="`/user/${item.id}`"      class="text-primary hover:underline">Detail</router-link>
                  <router-link :to="`/user/${item.id}/edit`" class="text-warning hover:underline">Edit</router-link>
                  <span class="text-danger cursor-pointer hover:underline" @click="handleDelete(item.id)">Hapus</span>
                </div>
              </td>
            </template>
          </Table>

          <Pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            :perPage="perPage"
            @update:currentPage="onPageChange"
            @update:perPage="onPerPageChange"
          />
        </template>
      </template>
    </CardWrapper>

  </div>
</template>
