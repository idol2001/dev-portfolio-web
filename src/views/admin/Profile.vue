<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Profile Management</h1>
    
    <form @submit.prevent="saveProfile" class="max-w-2xl space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Full Name</label>
        <input v-model="form.full_name" type="text" class="w-full px-3 py-2 border rounded-lg" />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">Slogan</label>
        <input v-model="form.slogan" type="text" class="w-full px-3 py-2 border rounded-lg" />
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-1">About</label>
        <textarea v-model="form.about" rows="6" class="w-full px-3 py-2 border rounded-lg"></textarea>
      </div>
      
      <div class="flex gap-4">
        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save
        </button>
        <span v-if="message" class="text-green-600 self-center">{{ message }}</span>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProfile, updateProfile } from '../../api'

const form = ref({
  full_name: '',
  slogan: '',
  about: ''
})

const message = ref('')

onMounted(async () => {
  try {
    const res = await getProfile()
    form.value = res.data.data
  } catch (error) {
    console.error('Failed to load profile:', error)
  }
})

const saveProfile = async () => {
  try {
    await updateProfile(form.value)
    message.value = 'Saved successfully!'
    setTimeout(() => message.value = '', 3000)
  } catch (error) {
    console.error('Failed to save profile:', error)
  }
}
</script>
