<script setup>
import { useI18n } from 'vue-i18n';
import { createSEOMetatags, createPageSchema } from '~/utils/utils.js';
import Card from '~/components/ui/Card.vue';
import PageTitle from '~/components/ui/PageTitle.vue';

const { t } = useI18n();
const localeHead = useLocaleHead();
const localePath = useLocalePath();

// Define SEO metadata
useSeoMeta(createSEOMetatags({
    title: t('seo.privacyPolicy.title'),
    description: t('seo.privacyPolicy.description'),
    url: useRoute().path
}));

// Define head metadata
useHead({
    // HTML attributes
    htmlAttrs: {
        lang: localeHead.value.htmlAttrs.lang, // Language
        dir: localeHead.value.htmlAttrs.dir // Text direction
    },

    // Hreflang attributes for different languages
    link: [...(localeHead.value.link || [])],

    // JSON-LD schema for the page
    ...createPageSchema({
        title: t('seo.privacyPolicy.title'),
        description: t('seo.privacyPolicy.description'),
        url: useRoute().path,
        breadcrumbs: [
            { name: t('seo.home.breadcrumb'), item: localePath('/') },
            { name: t('seo.privacyPolicy.breadcrumb'), item: localePath('/privacy-policy') }
        ]
    })
});
</script>

<template>
    <div class="space-y-8">
        <!-- Header Section -->
        <div class="text-center">
            <PageTitle>{{ t('privacyPolicy.title') }}</PageTitle>
            <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {{ t('privacyPolicy.intro') }}
            </p>
        </div>

        <!-- Main Content Card -->
        <Card class="max-w-5xl mx-auto">
            <div class="max-w-none">
                <!-- Website Information -->
                <div class="mb-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-l-4 border-green-600">
                    <p class="mb-2 font-semibold text-gray-800 dark:text-gray-100">
                        {{ t('privacyPolicy.websiteAddress') }}
                    </p>
                    <a href="https://brumaants.com" class="text-bruma-green font-bold hover:underline transition-all duration-200">
                        https://brumaants.com
                    </a>
                </div>

                <!-- Agreement Section -->
                <div class="mb-8">
                    <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {{ t('privacyPolicy.agreement') }}
                    </p>
                </div>

                <!-- Interpretation & Definitions Section -->
                <section class="mb-12">
                    <h2 class="text-3xl font-black text-bruma-green bg-clip-text mb-6">
                        {{ t('privacyPolicy.interpretationDefinitions') }}
                    </h2>

                    <div class="grid md:grid-cols-2 gap-8">
                        <!-- Interpretation -->
                        <div class="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                            <h3 class="text-xl font-bold text-bruma-green mb-4 flex items-center">
                                <i class="fas fa-lightbulb mr-3"></i>
                                {{ t('privacyPolicy.interpretation.title') }}
                            </h3>
                            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {{ t('privacyPolicy.interpretation.description') }}
                            </p>
                        </div>

                        <!-- Definitions -->
                        <div class="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                            <h3 class="text-xl font-bold text-bruma-green mb-4 flex items-center">
                                <i class="fas fa-book mr-3"></i>
                                {{ t('privacyPolicy.definitions.title') }}
                            </h3>
                            <div class="space-y-4">
                                <div class="flex items-start space-x-3">
                                    <div class="w-2 h-2 bg-bruma-green rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <strong class="text-gray-800 dark:text-gray-100">{{ t('privacyPolicy.definitions.cookiesTitle') }}:</strong>
                                        <span class="text-gray-700 dark:text-gray-300 ml-2">{{ t('privacyPolicy.definitions.cookies') }}</span>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-3">
                                    <div class="w-2 h-2 bg-bruma-green rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <strong class="text-gray-800 dark:text-gray-100">{{ t('privacyPolicy.definitions.deviceTitle') }}:</strong>
                                        <span class="text-gray-700 dark:text-gray-300 ml-2">{{ t('privacyPolicy.definitions.device') }}</span>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-3">
                                    <div class="w-2 h-2 bg-bruma-green rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <strong class="text-gray-800 dark:text-gray-100">{{ t('privacyPolicy.definitions.personalDataTitle') }}:</strong>
                                        <span class="text-gray-700 dark:text-gray-300 ml-2">{{ t('privacyPolicy.definitions.personalData') }}</span>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-3">
                                    <div class="w-2 h-2 bg-bruma-green rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <strong class="text-gray-800 dark:text-gray-100">{{ t('privacyPolicy.definitions.serviceTitle') }}:</strong>
                                        <span class="text-gray-700 dark:text-gray-300 ml-2">{{ t('privacyPolicy.definitions.service') }}</span>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-3">
                                    <div class="w-2 h-2 bg-bruma-green rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <strong class="text-gray-800 dark:text-gray-100">{{ t('privacyPolicy.definitions.serviceProviderTitle') }}:</strong>
                                        <span class="text-gray-700 dark:text-gray-300 ml-2">{{ t('privacyPolicy.definitions.serviceProvider') }}</span>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-3">
                                    <div class="w-2 h-2 bg-bruma-green rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <strong class="text-gray-800 dark:text-gray-100">{{ t('privacyPolicy.definitions.usageDataTitle') }}:</strong>
                                        <span class="text-gray-700 dark:text-gray-300 ml-2">{{ t('privacyPolicy.definitions.usageData') }}</span>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-3">
                                    <div class="w-2 h-2 bg-bruma-green rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <strong class="text-gray-800 dark:text-gray-100">{{ t('privacyPolicy.definitions.youTitle') }}:</strong>
                                        <span class="text-gray-700 dark:text-gray-300 ml-2">{{ t('privacyPolicy.definitions.you') }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Data Collection Section -->
                <section class="mb-12">
                    <h2 class="text-3xl font-black text-bruma-green bg-clip-text mb-6">
                        {{ t('privacyPolicy.dataCollection.title') }}
                    </h2>

                    <!-- Usage Data -->
                    <div class="mb-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border-l-4 border-blue-500">
                        <h3 class="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center">
                            <i class="fas fa-chart-line mr-3"></i>
                            {{ t('privacyPolicy.dataCollection.usageData.title') }}
                        </h3>
                        <div class="space-y-4">
                            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {{ t('privacyPolicy.dataCollection.usageData.description1') }}
                            </p>
                            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {{ t('privacyPolicy.dataCollection.usageData.description2') }}
                            </p>
                            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {{ t('privacyPolicy.dataCollection.usageData.description3') }}
                            </p>
                        </div>
                    </div>

                    <!-- Tracking & Cookies -->
                    <div class="mb-8 bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6 border-l-4 border-orange-500">
                        <h3 class="text-xl font-bold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
                            <i class="fas fa-cookie-bite mr-3"></i>
                            {{ t('privacyPolicy.dataCollection.trackingCookies.title') }}
                        </h3>
                        <div class="space-y-4">
                            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {{ t('privacyPolicy.dataCollection.trackingCookies.description1') }}
                            </p>
                            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {{ t('privacyPolicy.dataCollection.trackingCookies.description2') }}
                            </p>
                            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {{ t('privacyPolicy.dataCollection.trackingCookies.description3') }}
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Data Usage Section -->
                <section>
                    <h2 class="text-3xl font-black text-bruma-green bg-clip-text mb-6">
                        {{ t('privacyPolicy.dataUsage.title') }}
                    </h2>

                    <div class="space-y-6 mb-8">
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {{ t('privacyPolicy.dataUsage.description1') }}
                        </p>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {{ t('privacyPolicy.dataUsage.description2') }}
                        </p>
                        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {{ t('privacyPolicy.dataUsage.description3') }}
                        </p>
                    </div>

                    <!-- Google Analytics -->
                    <div class="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border-l-4 border-red-500">
                        <h3 class="text-xl font-bold text-red-600 dark:text-red-400 mb-4 flex items-center">
                            <i class="fab fa-google mr-3"></i>
                            {{ t('privacyPolicy.dataUsage.googleAnalytics.title') }}
                        </h3>
                        <div class="space-y-4">
                            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {{ t('privacyPolicy.dataUsage.googleAnalytics.description1') }}
                            </p>
                            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {{ t('privacyPolicy.dataUsage.googleAnalytics.description2') }}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </Card>
    </div>
</template>