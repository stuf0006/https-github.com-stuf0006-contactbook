<template>
  <div v-if="contact">
    <h1 class="text-2xl font-bold mb-4">{{ contact.firstName }} {{ contact.lastName }}</h1>
    <p><strong>Email:</strong> {{ contact.email }}</p>
    <p><strong>Phone:</strong> {{ contact.phone || 'N/A' }}</p>
    <div class="mt-4 space-x-2">
      <router-link :to="{ name: 'edit-contact', params: { id: contact.id } }" class="px-4 py-2 bg-blue-600 text-white rounded">
        Edit
      </router-link>
      <button @click="deleteContact" class="px-4 py-2 bg-red-600 text-white rounded">
        Delete
      </button>
    </div>
  </div>
  <div v-else>
    <p>Contact not found.</p>
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