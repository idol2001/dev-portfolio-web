<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-gray-900/80 backdrop-blur-sm z-50">
      <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="text-xl font-bold">Jacob Lee</div>
        <div class="space-x-6 hidden md:block">
          <router-link to="/" class="hover:text-blue-400 transition">Home</router-link>
          <router-link to="/about" class="hover:text-blue-400 transition">About</router-link>
          <router-link to="/skills" class="hover:text-blue-400 transition">Skills</router-link>
          <router-link to="/projects" class="hover:text-blue-400 transition">Projects</router-link>
          <router-link to="/blogs" class="hover:text-blue-400 transition">Blogs</router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="flex items-center justify-center min-h-screen px-4">
      <div class="text-center">
        <h1 class="text-5xl md:text-7xl font-bold mb-4">Jacob Lee</h1>
        <p class="text-xl md:text-2xl text-gray-300 mb-8">I'm a Full-Stack Developer</p>
        <div class="flex justify-center gap-4">
          <router-link to="/projects" class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition">
            View Projects
          </router-link>
          <router-link to="/about" class="border border-gray-400 hover:border-white px-6 py-3 rounded-lg transition">
            About Me
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>
