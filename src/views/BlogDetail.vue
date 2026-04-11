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
          <span>{{ formatDate(post.created_at) }}</span>
          <span>👁 {{ post.view_count }} views</span>
        </div>
        <MdPreview
          v-if="post.content"
          :model-value="post.content"
          theme="dark"
          :code-foldable="false"
          code-theme="stackoverflow"
          class="blog-content prose prose-invert max-w-none"
        />
        <p v-else class="text-gray-500 italic">No content yet.</p>
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
import { MdPreview, config } from 'md-editor-v3'
import mermaid from 'mermaid'
import 'md-editor-v3/lib/style.css'

// 注册 mermaid 实例
config({
  editorExtensions: {
    mermaid: { instance: mermaid }
  }
})

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

<style scoped>
/* Container styling for the preview area */
.blog-content {
  padding: 2rem;
  background-color: rgba(17, 24, 39, 0.6);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.blog-content :deep(h1) { @apply text-3xl font-bold mt-8 mb-4; }
.blog-content :deep(h2) { @apply text-2xl font-semibold mt-8 mb-3; }
.blog-content :deep(h3) { @apply text-xl font-semibold mt-6 mb-2; }
.blog-content :deep(p) { @apply leading-relaxed mb-4; }
.blog-content :deep(a) { @apply text-blue-400 hover:underline; }
.blog-content :deep(code) { @apply bg-gray-700 px-1.5 py-0.5 rounded text-sm; }
.blog-content :deep(pre) { @apply bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4; }
.blog-content :deep(pre code) { @apply bg-transparent p-0; }
.blog-content :deep(blockquote) { @apply border-l-4 border-blue-500 pl-4 text-gray-400 italic my-4; }
.blog-content :deep(img) { @apply rounded-lg max-w-full my-4; }
.blog-content :deep(ul) { @apply list-disc list-inside mb-4; }
.blog-content :deep(ol) { @apply list-decimal list-inside mb-4; }
.blog-content :deep(table) { @apply w-full border-collapse mb-4; }
.blog-content :deep(th) { @apply bg-gray-700 px-4 py-2 text-left font-semibold; }
.blog-content :deep(td) { @apply border border-gray-700 px-4 py-2; }
.blog-content :deep(hr) { @apply border-gray-700 my-8; }

</style>

<style>
/* Global styles for md-editor-v3 code blocks (non-scoped to ensure they apply) */
.md-editor-code .md-editor-code-flag {
  display: none !important;
}
.md-editor-code-block {
  max-height: none !important;
  overflow-y: visible !important;
}
.md-editor-code pre {
  overflow-x: auto !important;
  overflow-y: hidden !important;
  margin: 0 !important;
}
</style>
