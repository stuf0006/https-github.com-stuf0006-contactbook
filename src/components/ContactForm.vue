<template>
  <div class="py-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">{{ isEdit ? 'Edit Contact' : 'Add Contact' }}</h1>
    <form @submit.prevent="saveContact" class="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">First Name</label>
        <input
          v-model="contact.firstName"
          type="text"
          required
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          v-model="contact.lastName"
          type="text"
          required
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="contact.email"
          type="email"
          required
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Phone (Optional)</label>
        <input
          v-model="contact.phone"
          type="tel"
          class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
        />
      </div>
      <button
        type="submit"
        class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        {{ isEdit ? 'Update' : 'Add' }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contact: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      isEdit: false
    }
  },
  methods: {
    loadContact() {
      if (this.$route.name === 'edit-contact') {
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]')
        const contact = contacts.find(c => c.id === this.$route.params.id)
        if (contact) {
          this.contact = { ...contact }
          this.isEdit = true
        }
      }
    },
    saveContact() {
      let contacts = JSON.parse(localStorage.getItem('contacts') || '[]')
      if (this.isEdit) {
        contacts = contacts.map(c => (c.id === this.contact.id ? this.contact : c))
      } else {
        this.contact.id = Date.now().toString()
        contacts.push(this.contact)
      }
      localStorage.setItem('contacts', JSON.stringify(contacts))
      this.$router.push({ name: 'contact-details', params: { id: this.contact.id } })
    }
  },
  created() {
    this.loadContact()
  }
}
</script>