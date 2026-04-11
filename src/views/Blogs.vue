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
      <h1 class="text-4xl font-bold mb-12">Blog Posts</h1>
      
      <div class="space-y-8">
        <div v-for="post in posts" :key="post.Id" 
             class="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition cursor-pointer"
             @click="$router.push(`/blog/${post.slug}`)">
          <h2 class="text-2xl font-semibold mb-2">{{ post.title }}</h2>
          <p class="text-gray-400 mb-4">{{ post.summary || '' }}</p>
          <div class="flex items-center gap-4 text-sm text-gray-500">
            <span>{{ formatDate(post.created_at) }}</span>
            <span>👁 {{ post.view_count }} views</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBlogPosts } from '../api'

const posts = ref([])

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  try {
    const res = await getBlogPosts()
    posts.value = res.data.data.list
  } catch (error) {
    console.error('Failed to load blog posts:', error)
  }
})
</script>
