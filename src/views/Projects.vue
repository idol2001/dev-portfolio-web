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

    <div class="pt-24 pb-12 px-4 max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold mb-12">Projects</h1>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in projects" :key="project.Id" 
             class="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition">
          <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ project.title }}</h3>
            <p class="text-gray-400 text-sm mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tech in parseTechStack(project.tech_stack)" :key="tech" 
                    class="bg-blue-600/30 text-blue-400 px-2 py-1 rounded text-xs">
                {{ tech }}
              </span>
            </div>
            <div class="flex gap-4">
              <a v-if="project.repo_url" :href="project.repo_url" target="_blank" 
                 class="text-gray-400 hover:text-white transition">
                <span>📦 Code</span>
              </a>
              <a v-if="project.demo_url" :href="project.demo_url" target="_blank" 
                 class="text-gray-400 hover:text-white transition">
                <span>🌐 Demo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProjects } from '../api'

const projects = ref([])

const parseTechStack = (techStack) => {
  try {
    return JSON.parse(techStack)
  } catch {
    return techStack.split(',').map(t => t.trim())
  }
}

onMounted(async () => {
  try {
    const res = await getProjects()
    projects.value = res.data.data
  } catch (error) {
    console.error('Failed to load projects:', error)
  }
})
</script>
