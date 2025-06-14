import { defineStore } from 'pinia'
import { useToast } from '#imports'
import { $api } from '~/composables/api'
import { useCookie } from '#app'
import { useCommonStore } from '~/stores/common'
import { useRouter } from 'vue-router'
import { toast } from "vue3-toastify";

export const useEmailTemplateStore = defineStore('email', () => {
    const token = useCookie('auth_token')
    const common = useCommonStore()

    const templates = ref([])
    const isLoading = ref(false)

    async function getTemplates() {
        isLoading.value = true
        common.validationError = null
        try {
            const res = await $api('/api/admin/email-templates', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })

            templates.value = res.data || []
        } catch (err) {
            toast.error('Failed to fetch templates.')
            console.error(err)
        } finally {
            isLoading.value = false
        }
    }

    async function createTemplate(form, headerForm, footerForm) {
        common.validationError = null

        try {
            const formData = new FormData()

            // Basic form data
            formData.append('subject', form.subject)
            formData.append('body', form.body)
            formData.append('name', form.name)
            formData.append('key', form.key)
            formData.append('header', form.createHeader)
            formData.append('footer', form.createFooter)

            // Handle placeholders as array
            if (form.placeholders && Array.isArray(form.placeholders)) {
                // Send as JSON string for backend to parse
                formData.append('placeholders', JSON.stringify(form.placeholders))
            } else {
                // Fallback for empty array
                formData.append('placeholders', JSON.stringify([]))
            }

            // Add header data if enabled
            if (form.createHeader) {
                formData.append('header_text', headerForm.headerText || '')
                formData.append('header_text_color', headerForm.textColor || '#000000')
                formData.append('header_background_color', headerForm.backgroundColor || '#ffffff')
                if (headerForm.image) {
                    formData.append('header_image', headerForm.image)
                }
            }

            // Add footer data if enabled
            if (form.createFooter) {
                formData.append('footer_text', footerForm.footerText || '')
                formData.append('footer_text_color', footerForm.textColor || '#ffffff')
                formData.append('footer_background_color', footerForm.backgroundColor || '#000000')
                if (footerForm.topImage) {
                    formData.append('footer_top_image', footerForm.topImage)
                }
                if (footerForm.bottomImage) {
                    formData.append('footer_bottom_image', footerForm.bottomImage)
                }
            }

            // Debug: Log what we're sending
            console.log('Sending form data:')
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value)
            }

            const response = await $api('/api/admin/email-templates', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })

            toast.success("Template created successfully!")
            return true

        } catch (err) {
            console.error('API Error:', err)

            if (err.status === 422) {
                common.validationError = err.data?.errors || {}
                toast.error("Validation Error - Please check your inputs")
            } else if (err.status === 401) {
                toast.error("Unauthorized - Please login again")
            } else if (err.status === 403) {
                toast.error("Forbidden - You don't have permission")
            } else if (err.status >= 500) {
                toast.error("Server Error - Please try again later")
            } else {
                toast.error(`Error: ${err.message || 'Something went wrong'}`)
            }
            return false


            throw err
        }
    }

    async function forceDeleteTemplate(id) {
        try {
            await $api(`/api/admin/email-templates/${id}`, {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            toast.success("Email Template deleted");
            await getTemplates();
        } catch (err) {
            toast.error("Failed to delete Email Template.");
        }
    }

    return {
        forceDeleteTemplate,
        createTemplate,
        getTemplates,
        templates,
        isLoading
    }
})