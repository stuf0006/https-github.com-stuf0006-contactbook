<template>
  <div class="py-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Contact Book</h1>
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by first or last name..."
        class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
      />
    </div>
    <ul class="space-y-3">
      <li
        v-for="contact in filteredContacts"
        :key="contact.id"
        class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200"
      >
        <router-link
          :to="{ name: 'contact-details', params: { id: contact.id } }"
          class="text-blue-600 hover:text-blue-800 font-medium"
        >
          {{ contact.lastName }}, {{ contact.firstName }}
        </router-link>
      </li>
    </ul>
    <p v-if="!filteredContacts.length" class="text-gray-500 mt-4">No contacts found.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      contacts: []
    }
  },
  computed: {
    filteredContacts() {
      const query = this.searchQuery.toLowerCase()
      return this.contacts
        .filter(
          contact =>
            contact.firstName.toLowerCase().includes(query) ||
            contact.lastName.toLowerCase().includes(query)
        )
        .sort((a, b) => a.lastName.localeCompare(b.lastName))
    }
  },
  methods: {
    loadContacts() {
      const contacts = localStorage.getItem('contacts')
      this.contacts = contacts ? JSON.parse(contacts) : []
    }
  },
  created() {
    this.loadContacts()
  }
}
</script>