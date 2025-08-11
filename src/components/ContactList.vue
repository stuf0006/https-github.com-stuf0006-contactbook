<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Contacts</h1>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search by first or last name"
      class="w-full p-2 mb-4 border rounded"
    />
    <ul class="space-y-2">
      <li v-for="contact in filteredContacts" :key="contact.id" class="p-2 bg-white rounded shadow">
        <router-link :to="{ name: 'contact-details', params: { id: contact.id } }">
          {{ contact.lastName }}, {{ contact.firstName }}
        </router-link>
      </li>
    </ul>
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