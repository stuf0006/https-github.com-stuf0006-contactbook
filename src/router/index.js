import { createRouter, createWebHistory } from 'vue-router'
import ContactList from '../components/ContactList.vue'
import ContactDetails from '../components/ContactDetails.vue'
import ContactForm from '../components/ContactForm.vue'

const routes = [
  { path: '/', component: ContactList, name: 'home' },
  { path: '/contact/:id', component: ContactDetails, name: 'contact-details' },
  { path: '/add', component: ContactForm, name: 'add-contact' },
  { path: '/edit/:id', component: ContactForm, name: 'edit-contact' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router