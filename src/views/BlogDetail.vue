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
      <article v-if="post" class="prose prose-invert max-w-none">
        <h1 class="text-4xl font-bold mb-4">{{ post.title }}</h1>
        <div class="flex items-center gap-4 text-gray-400 mb-8">
          <span>{{ formatDate(post.CreatedAt) }}</span>
          <span>👁 {{ post.view_count }} views</span>
        </div>
        <div class="text-gray-300" v-html="post.content"></div>
      </article>
      <div v-else class="text-center py-20">
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogPostBySlug } from '../api'

const route = useRoute()
const post = ref(null)

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(async () => {
  try {
    const res = await getBlogPostBySlug(route.params.slug)
    post.value = res.data.data
  } catch (error) {
    console.error('Failed to load blog post:', error)
  }
})
</script>
