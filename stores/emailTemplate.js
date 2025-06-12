import { defineStore } from 'pinia'
import { useToast } from '#imports'
import { $api } from '~/composables/api'
import { useCookie } from '#app'
import { useCommonStore } from '~/stores/common'
import { useRouter } from 'vue-router'
import { toast } from "vue3-toastify"; // ✅ ONLY THIS if using vue3-toastify

export const useEmailTemplateStore = defineStore('email', () => {
    const token = useCookie('auth_token')
    const common = useCommonStore()


    async function createTemplate(form, headerForm, footerForm) {
        common.validationError = null

        try {
            const formData = new FormData()

            // Add main template data
            formData.append('subject', form.subject)
            formData.append('body', form.body)
            formData.append('name', form.name)
            formData.append('key', form.key)
            formData.append('header', form.createHeader)
            formData.append('footer', form.createFooter)
            formData.append('placeholders', form.placeholders ? form.placeholders.split(',').map(p => p.trim()).filter(p => p).join(',') : '')

            // Add header data if enabled
            if (form.createHeader) {
                formData.append('header_text', headerForm.headerText)
                formData.append('header_text_color', headerForm.textColor)
                formData.append('header_background_color', headerForm.backgroundColor)
                if (headerForm.image) {
                    formData.append('header_image', headerForm.image)
                }
            }

            // Add footer data if enabled
            if (form.createFooter) {
                formData.append('footer_text', footerForm.footerText)
                formData.append('footer_text_color', footerForm.textColor)
                formData.append('footer_background_color', footerForm.backgroundColor)
                if (footerForm.topImage) {
                    formData.append('footer_top_image', footerForm.topImage)
                }
                if (footerForm.bottomImage) {
                    formData.append('footer_bottom_image', footerForm.bottomImage)
                }
            }

            await $api('/api/admin/email-templates', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })

            toast.success("Successfully!");

        } catch (err) {
            if (err.status === 422) {
                common.validationError = err.data.errors
                toast.error("Validation Error");


            } else {
                toast.error("Something went wrong.");

            }
            throw err
        }
    }

    return {
        createTemplate
    }
})