<template>
  <MainLayout>
    <!-- Header Card -->
    <div class="mb-6">
      <Breadcrumb :items="breadcrumbItems" />
      <div class="flex items-center justify-between mt-4">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create New Email Template</h1>

      </div>
    </div>

    <!-- Main Content -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Main Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Subject Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
            <input
                v-model="form.subject"
                type="text"
                class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                placeholder="Enter email subject"
                :disabled="saving"
            />
            <p v-if="validationErrors?.subject" class="text-sm text-red-500 mt-1">{{ validationErrors.subject[0] }}</p>
          </div>

          <!-- Email Body Field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Body</label>
            <textarea
                v-model="form.body"
                rows="12"
                class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
                placeholder="Enter email body content"
                :disabled="saving"
            ></textarea>
            <p v-if="validationErrors?.body" class="text-sm text-red-500 mt-1">{{ validationErrors.body[0] }}</p>
          </div>

          <!-- Header/Footer Options -->


          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <input
                  v-model="form.createHeader"
                  type="checkbox"
                  id="createHeader"
                  class="w-4 h-4 text-blue-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                  :disabled="saving"
              />
              <div>
                <label for="createHeader" class="text-sm font-medium text-gray-700 dark:text-gray-300">Create Header for this Email Template</label>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Check to show template-specific header; otherwise, default header is used</p>
              </div>
            </div>

            <div class="flex items-center space-x-3">
              <input
                  v-model="form.createFooter"
                  type="checkbox"
                  id="createFooter"
                  class="w-4 h-4 text-blue-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                  :disabled="saving"
              />
              <div>
                <label for="createFooter" class="text-sm font-medium text-gray-700 dark:text-gray-300">Create Footer for this Email Template</label>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Check to show template-specific footer; otherwise, default footer is used</p>
              </div>
            </div>
          </div>

          <!-- Header Form -->
          <div v-if="form.createHeader" class="border border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-white dark:bg-gray-800/50">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Create Header</h3>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Header Image -->
              <div class="lg:col-span-2">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Header Image</label>
                <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center bg-white dark:bg-gray-800">
                  <input
                      ref="headerImageInput"
                      type="file"
                      accept="image/*"
                      @change="handleHeaderImageUpload"
                      class="hidden"
                      :disabled="saving"
                  />
                  <UButton
                      @click="$refs.headerImageInput?.click()"
                      variant="outline"
                      color="neutral"
                      size="sm"
                      :disabled="saving"
                  >
                    Choose File
                  </UButton>
                  <span class="ml-3 text-sm text-gray-500 dark:text-gray-400">
                    {{ headerForm.image ? headerForm.image.name : 'No file chosen' }}
                  </span>
                </div>
                <p v-if="validationErrors?.header_image" class="text-sm text-red-500 mt-1">{{ validationErrors.header_image[0] }}</p>
              </div>

              <!-- Color Controls -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Color</label>
                  <div class="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                    <input
                        v-model="headerForm.textColor"
                        type="color"
                        class="w-full h-full border-none"
                        :disabled="saving"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Background Color</label>
                  <div class="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                    <input
                        v-model="headerForm.backgroundColor"
                        type="color"
                        class="w-full h-full border-none"
                        :disabled="saving"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Header Text -->
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Header Text</label>
              <textarea
                  v-model="headerForm.headerText"
                  rows="6"
                  class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
                  placeholder="Enter header text content"
                  :disabled="saving"
              ></textarea>
              <p v-if="validationErrors?.header_text" class="text-sm text-red-500 mt-1">{{ validationErrors.header_text[0] }}</p>
            </div>
          </div>

          <!-- Footer Form -->
          <div v-if="form.createFooter" class="border border-gray-300 dark:border-gray-600 rounded-lg p-6 bg-white dark:bg-gray-800/50">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Create Footer</h3>

            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <!-- Footer Top Image -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Footer Top Image</label>
                <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center bg-white dark:bg-gray-800">
                  <input
                      ref="footerTopImage"
                      type="file"
                      accept="image/*"
                      @change="handleFooterTopImageUpload"
                      class="hidden"
                      :disabled="saving"
                  />
                  <UButton
                      @click="$refs.footerTopImage?.click()"
                      variant="outline"
                      color="neutral"
                      size="sm"
                      class="w-full mb-2"
                      :disabled="saving"
                  >
                    Choose File
                  </UButton>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    {{ footerForm.topImage ? footerForm.topImage.name : 'No file chosen' }}
                  </span>
                </div>
                <p v-if="validationErrors?.footer_top_image" class="text-sm text-red-500 mt-1">{{ validationErrors.footer_top_image[0] }}</p>
              </div>

              <!-- Footer Bottom Image -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Footer Bottom Image</label>
                <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center bg-white dark:bg-gray-800">
                  <input
                      ref="footerBottomImage"
                      type="file"
                      accept="image/*"
                      @change="handleFooterBottomImageUpload"
                      class="hidden"
                      :disabled="saving"
                  />
                  <UButton
                      @click="$refs.footerBottomImage?.click()"
                      variant="outline"
                      color="neutral"
                      size="sm"
                      class="w-full mb-2"
                      :disabled="saving"
                  >
                    Choose File
                  </UButton>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    {{ footerForm.bottomImage ? footerForm.bottomImage.name : 'No file chosen' }}
                  </span>
                </div>
                <p v-if="validationErrors?.footer_bottom_image" class="text-sm text-red-500 mt-1">{{ validationErrors.footer_bottom_image[0] }}</p>
              </div>

              <!-- Footer Color Controls -->
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Color</label>
                <div class="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <input
                      v-model="footerForm.textColor"
                      type="color"
                      class="w-full h-full border-none"
                      :disabled="saving"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Background Color</label>
                <div class="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                  <input
                      v-model="footerForm.backgroundColor"
                      type="color"
                      class="w-full h-full border-none"
                      :disabled="saving"
                  />
                </div>
              </div>
            </div>

            <!-- Footer Text -->
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Footer Text</label>
              <textarea
                  v-model="footerForm.footerText"
                  rows="6"
                  class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
                  placeholder="Enter footer text content"
                  :disabled="saving"
              ></textarea>
              <p v-if="validationErrors?.footer_text" class="text-sm text-red-500 mt-1">{{ validationErrors.footer_text[0] }}</p>
            </div>
          </div>
        </div>

        <!-- Right Column - Template Settings -->
        <div class="space-y-6">
          <!-- Template Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Template Name</label>
            <input
                v-model="form.name"
                type="text"
                class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                placeholder="e.g. Welcome Email"
                :disabled="saving"
            />
            <p v-if="validationErrors?.name" class="text-sm text-red-500 mt-1">{{ validationErrors.name[0] }}</p>
          </div>

          <!-- Template Key -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Template Key</label>
            <input
                v-model="form.key"
                @input="formatKey"
                type="text"
                class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                placeholder="e.g. welcome_email"
                :disabled="saving"
            />

            <p v-if="validationErrors?.key" class="text-sm text-red-500 mt-1">{{ validationErrors.key[0] }}</p>
          </div>

          <!-- Placeholders -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Placeholders</label>

            <textarea
                :value="form.placeholders"
                rows="12"
                class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
                placeholder="Enter placeholders separated by commas"
                :disabled="saving"
            ></textarea>
            <p v-if="validationErrors?.placeholders" class="text-sm text-red-500 mt-1">{{ validationErrors.placeholders[0] }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Card -->
    <div class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-6 p-4 sticky bottom-0">
      <div class="flex justify-end gap-3">
        <UButton
            color="neutral"
            size="md"
            @click="saveTemplate"
            :disabled="saving"
            :loading="saving"
        >
          Save Template
        </UButton>
        <UButton
            variant="outline"
            color="neutral"
            size="md"
            :to="'/email-templates'"
        >
          Cancel
        </UButton>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useToast } from '#imports'
import { useRouter } from 'vue-router'
import MainLayout from '~/layouts/Dashboard/MainLayout.vue'
import Breadcrumb from '~/components/dashboard/Breadcrumb.vue'
import { useEmailTemplateStore } from '~/stores/emailTemplate'
import { useCommonStore } from '~/stores/common'

// Toast, router, and stores
const toast = useToast()
const router = useRouter()
const emailStore = useEmailTemplateStore()
const commonStore = useCommonStore()

// Breadcrumb
const breadcrumbItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Email Templates', to: '/email-templates' },
  { label: 'Create', to: '/email-templates/create' }
]
function formatKey(event) {
  const value = event.target.value
      .toLowerCase()
      .replace(/\s+/g, '_')         // Replace spaces with underscores
      .replace(/[^a-z0-9_]/g, '')   // Remove all special characters except underscore
      .replace(/_+/g, '_');         // Collapse multiple underscores into one

  form.key = value;
}



// Form data
const form = reactive({
  subject: '',
  body: '',
  name: '',
  key: '',
  placeholders: '',
  createHeader: false,
  createFooter: false
})

// Header form data
const headerForm = reactive({
  header_image: null,
  header_text: '',
  header_text_color: '#000000',
  header_background_color: '#ffffff'
})

// Footer form data
const footerForm = reactive({
  footer_image: null,
  footer_bottom_image: null,
  footer_text: '',
  footer_text_color: '#ffffff',
  footer_background_color: '#000000'
})

// UI state
const saving = ref(false)
const headerImageInput = ref(null)
const footerTopImageInput = ref(null)
const footerBottomImageInput = ref(null)

// Computed validation errors
const validationErrors = computed(() => commonStore.validationError)

// Methods
const saveTemplate = async () => {
  saving.value = true
  commonStore.validationError = null // Clear previous errors

  // Prepare FormData for logging
  const formData = new FormData()
  formData.append('subject', form.subject)
  formData.append('body', form.body)
  formData.append('name', form.name)
  formData.append('key', form.key)
  formData.append('header', form.createHeader)
  formData.append('footer', form.createFooter)

  formData.append('placeholders', form.placeholders ? form.placeholders.split(',').map(p => p.trim()).filter(p => p).join(',') : '')
  if (form.createHeader) {
    formData.append('header_text', headerForm.headerText)
    formData.append('header_text_color', headerForm.textColor)
    formData.append('header_background_color', headerForm.backgroundColor)
    if (headerForm.image) formData.append('header_image', headerForm.image)
  }
  if (form.createFooter) {
    formData.append('footer_text', footerForm.footerText)
    formData.append('footer_text_color', footerForm.textColor)
    formData.append('footer_background_color', footerForm.backgroundColor)
    if (footerForm.topImage) formData.append('footer_top_image', footerForm.topImage)
    if (footerForm.bottomImage) formData.append('footer_bottom_image', footerForm.bottomImage)
  }

  try {
    await emailStore.createTemplate(form, headerForm, footerForm)
  } catch (error) {
    console.error('Error saving template:', error)
  } finally {
    saving.value = false
  }
}

const handleHeaderImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    headerForm.image = file
  }
}

const handleFooterTopImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    footerForm.topImage = file
  }
}

const handleFooterBottomImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    footerForm.bottomImage = file
  }
}

// SEO
useHead({
  title: 'Create Email Template'
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.7);
}

/* Focus states */
input:focus,
textarea:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Color input styling */
input[type="color"] {
  -webkit-appearance: none;
  border: none;
  cursor: pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
}
</style>