<script setup>
/**
 * Contoh pemakaian 3 form component + validasi VeeValidate + Yup
 *
 * Install:
 *   npm install vee-validate yup
 */

import { useForm } from 'vee-validate'
import * as yup from 'yup'

import FormFieldset from './FormFieldset.vue'
import FormFloat    from './FormFloat.vue'
import FormField    from './FormField.vue'
import Button from "./Button.vue";
import CardWrapper from "./CardWrapper.vue";
import FormImageCropper from "./FormImageCropper.vue";

// ── Schema validasi (persis kayak React + Yup) ────────────
const schema = yup.object({
  username: yup.string().required('Username wajib diisi').min(3, 'Minimal 3 karakter'),
  password: yup.string().required('Password wajib diisi').min(8, 'Minimal 8 karakter'),
  email:    yup.string().required('Email wajib diisi').email('Format email tidak valid'),
  image: yup.mixed().required('Foto wajib diupload'),
  role:     yup.string().required('Role wajib dipilih'),
  gender:   yup.string().required('Gender wajib dipilih'),
  hobbies:  yup.array().min(1, 'Pilih minimal 1 hobi'),
  agree:    yup.boolean().oneOf([true], 'Harus setuju dulu'),
  resume:   yup.mixed().required('Resume wajib diupload'),
  dob:      yup.string().required('Tanggal lahir wajib diisi'),
  bio:      yup.string().required('Bio wajib diisi').max(300, 'Maksimal 300 karakter'),
})

// ── useForm dari VeeValidate (mirip useForm React Hook Form) ──
const { defineField, handleSubmit, errors } = useForm({ validationSchema: schema })

// defineField = register field ke VeeValidate
const [username] = defineField('username')
const [password] = defineField('password')
const [email]    = defineField('email')
const [role]     = defineField('role')
const [gender]   = defineField('gender')
const [hobbies]  = defineField('hobbies', { initialValue: [] })
const [agree]    = defineField('agree', { initialValue: false })
const [resume]   = defineField('resume')
const [dob]      = defineField('dob')
const [bio]      = defineField('bio')

const onSubmit = handleSubmit((values) => {
  console.log('Submit:', values)
})

// ── Options ───────────────────────────────────────────────
const roleOptions = [
  { label: 'Frontend Dev', value: 'frontend' },
  { label: 'Backend Dev',  value: 'backend' },
  { label: 'Fullstack Dev', value: 'fullstack' },
]

const genderOptions = [
  { label: 'Laki-laki', value: 'male' },
  { label: 'Perempuan', value: 'female' },
]

const hobbyOptions = [
  { label: 'Coding',   value: 'coding' },
  { label: 'Gaming',   value: 'gaming' },
  { label: 'Reading',  value: 'reading' },
  { label: 'Traveling', value: 'traveling' },
]
</script>

<template>
  <div class="grid gap-[var(--x)] p-[var(--l)]">

    <!-- ── 1. Fieldset Legend style ───────────────────── -->
    <CardWrapper>
      <h3 class="font-medium text-[length:var(--l)]">Login — Fieldset Style</h3>

      <FormFieldset v-model="username" label="Username" :error="errors.username" />
      <FormFieldset v-model="password" label="Password" type="password" :error="errors.password" />

      <Button text="Submit" @click="onSubmit"/>
    </CardWrapper>

    <!-- ── 2. Float like Google style ────────────────── -->
    <CardWrapper>
      <h3 class="font-medium text-[length:var(--l)]">Login — Float Label Style</h3>

      <FormFloat v-model="email" id="email" label="Email" :error="errors.email" />
      <FormFloat v-model="password" id="password" label="Password" type="password" :error="errors.password" />

      <Button text="Submit" @click="onSubmit"/>
    </CardWrapper>

    <!-- ── 3. Regular full-featured form ─────────────── -->
    <CardWrapper>
      <h3 class="font-medium text-[length:var(--l)]">Register — Regular Style</h3>

      <FormField v-model="username" id="reg-username" label="Username"       :error="errors.username" />
      <FormField v-model="email"    id="reg-email"    label="Email"    type="email"    :error="errors.email" />
      <FormField v-model="password" id="reg-password" label="Password" type="password" :error="errors.password" />
      <FormField v-model="dob"      id="dob"          label="Date of Birth" type="date" :error="errors.dob" />
      <FormImageCropper v-model="image" label="Foto Profil" :error="errors.image" />
      <FormField
        v-model="role"
        id="role"
        label="Role"
        type="select"
        :options="roleOptions"
        :error="errors.role"
      />

      <FormField
        v-model="gender"
        id="gender"
        label="Gender"
        type="radio"
        :options="genderOptions"
        :error="errors.gender"
      />

      <FormField
        v-model="hobbies"
        id="hobbies"
        label="Hobbies"
        type="checkbox"
        :options="hobbyOptions"
        :error="errors.hobbies"
      />

      <FormField
        v-model="agree"
        id="agree"
        label="Saya setuju dengan syarat & ketentuan"
        type="checkbox"
        :error="errors.agree"
      />

      <FormField
        v-model="resume"
        id="resume"
        label="Resume"
        type="file"
        accept=".pdf,.doc,.docx"
        :error="errors.resume"
      />

      <FormField
        v-model="bio"
        id="bio"
        label="Bio"
        type="textarea"
        placeholder="Ceritakan tentang dirimu..."
        :rows="4"
        :error="errors.bio"
      />

      <Button text="Submit" @click="onSubmit"/>
    </CardWrapper>
  </div>
</template>
