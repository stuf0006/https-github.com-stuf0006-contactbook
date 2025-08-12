<template>
  <div class="py-6">
    <div v-if="contact" class="bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ contact.firstName }} {{ contact.lastName }}</h1>
      <div class="space-y-3">
        <p class="text-gray-700"><strong>Email:</strong> {{ contact.email }}</p>
        <p class="text-gray-700"><strong>Phone:</strong> {{ contact.phone || 'N/A' }}</p>
      </div>
      <div class="mt-6 flex space-x-3">
        <router-link
          :to="{ name: 'edit-contact', params: { id: contact.id } }"
          class="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
        >
          Edit
        </router-link>
        <button
          @click="deleteContact"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
    <div v-else class="text-gray-500">
      <p>Contact not found.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contact: null
    }
  },
  methods: {
    loadContact() {
      const contacts = JSON.parse(localStorage.getItem('contacts') || '[]')
      this.contact = contacts.find(c => c.id === this.$route.params.id)
    },
    deleteContact() {
      let contacts = JSON.parse(localStorage.getItem('contacts') || '[]')
      contacts = contacts.filter(c => c.id !== this.$route.params.id)
      localStorage.setItem('contacts', JSON.stringify(contacts))
      this.$router.push({ name: 'home' })
    }
  },
  created() {
    this.loadContact()
  }
}
</script>