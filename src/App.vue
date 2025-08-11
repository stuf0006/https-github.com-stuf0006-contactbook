<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-blue-600 text-white p-4">
      <router-link to="/" class="text-lg font-semibold mr-4">Contact Book</router-link>
      <router-link to="/add" class="text-lg font-semibold">Add Contact</router-link>
    </nav>
    <div class="container mx-auto p-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>