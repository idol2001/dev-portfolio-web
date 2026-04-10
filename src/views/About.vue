<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
    <nav class="fixed top-0 w-full bg-gray-900/80 backdrop-blur-sm z-50">
      <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold">Jacob Lee</router-link>
        <div class="space-x-6 hidden md:block">
          <router-link to="/" class="hover:text-blue-400 transition">Home</router-link>
          <router-link to="/about" class="hover:text-blue-400 transition">About</router-link>
          <router-link to="/skills" class="hover:text-blue-400 transition">Skills</router-link>
          <router-link to="/projects" class="hover:text-blue-400 transition">Projects</router-link>
          <router-link to="/blogs" class="hover:text-blue-400 transition">Blogs</router-link>
        </div>
      </div>
    </nav>

    <div class="pt-24 pb-12 px-4 max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">About Me</h1>
      <div class="prose prose-invert max-w-none" v-html="profile.about"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProfile } from '../api'

const profile = ref({ about: 'Loading...' })

onMounted(async () => {
  try {
    const res = await getProfile()
    profile.value = res.data.data
  } catch (error) {
    console.error('Failed to load profile:', error)
  }
})
</script>
