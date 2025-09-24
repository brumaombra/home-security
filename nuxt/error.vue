<script setup>
import { useI18n } from 'vue-i18n';
import PageTitle from '~/components/ui/PageTitle.vue';
import CallToActionButton from '~/components/CallToActionButton.vue';

const { t } = useI18n();
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-tr from-gray-100 to-white">
        <div class="text-center max-w-md mx-auto">
            <PageTitle class="scale-150 sm:scale-200">404</PageTitle>
            <div class="my-4 sm:my-8">
                <span class="text-4xl sm:text-6xl md:text-7xl text-gray-600 font-bold inline-block">
                    bug_report
                </span>
            </div>
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-600 mb-2 sm:mb-4">
                {{ t('error.title') }}
            </h2>
            <p class="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                {{ t('error.description') }}
            </p>

            <!-- Go Back Home Button -->
            <div class="flex justify-center">
                <NuxtLinkLocale to="/">
                    <CallToActionButton :text="t('error.goBackHome')" icon-end="fa-solid fa-home" />
                </NuxtLinkLocale>
            </div>
        </div>
    </div>
</template>