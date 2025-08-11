<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">{{ isEdit ? 'Edit Contact' : 'Add Contact' }}</h1>
    <form @submit.prevent="saveContact" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">First Name</label>
        <input
          v-model="contact.firstName"
          type="text"
          required
          class="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label class="block text-sm font-medium">Last Name</label>
        <input
          v-model="contact.lastName"
          type="text"
          required
          class="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label class="block text-sm font-medium">Email</label>
        <input
          v-model="contact.email"
          type="email"
          required
          class="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label class="block text-sm font-medium">Phone (Optional)</label>
        <input
          v-model="contact.phone"
          type="tel"
          class="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
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