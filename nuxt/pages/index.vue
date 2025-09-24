<script setup>
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { createSEOMetatags, createPageSchema } from '~/utils/utils.js';
import PageTitle from '~/components/ui/PageTitle.vue';
import HeaderCarousel from '~/components/HeaderCarousel.vue';
import AllPostsSection from '~/components/AllPostsSection.vue';
import SectionHeaderTitle from '~/components/SectionHeaderTitle.vue';
import CategoriesList from '~/components/CategoriesList.vue';
import DiscordCard from '~/components/DiscordCard.vue';
import CareGuidesSection from '~/components/CareGuidesSection.vue';
import ReviewsSection from '~/components/ReviewsSection.vue';
import PodcastsSection from '~/components/PodcastsSection.vue';
import TutorialsSection from '~/components/TutorialsSection.vue';

const { t } = useI18n();
const localeHead = useLocaleHead();
const localePath = useLocalePath();

// Define SEO metadata
useSeoMeta(createSEOMetatags({
    title: t('seo.home.title'),
    description: t('seo.home.description'),
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
        title: t('seo.home.title'),
        description: t('seo.home.description'),
        url: useRoute().path,
        breadcrumbs: [
            { name: t('seo.home.breadcrumb'), item: localePath('/') }
        ]
    })
});
</script>

<template>
    <div>
        <!-- Header -->
        <div class="mb-10">
            <!-- Page Title -->
            <PageTitle data-aos="fade-up">{{ t('home.title') }}</PageTitle>

            <!-- Page Subtitle -->
            <span class="block font-normal text-base md:text-2xl text-neutral-500 dark:text-gray-300" data-aos="fade-up" data-aos-delay="100">
                {{ t('home.subtitle') }}
            </span>
        </div>

        <!-- Main Content -->
        <div class="space-y-14 md:space-y-20">
            <!-- Header Carousel -->
            <div>
                <SectionHeaderTitle :title="t('home.latestArticles.title')"
                    :subtitle="t('home.latestArticles.subtitle')"
                    image-url="/images/icons/document-icon.svg"
                    :image-alt="t('common.documentImageAlt')"
                    class="mb-6 md:mb-8" data-aos="fade-up" data-aos-delay="200" />
                <HeaderCarousel data-aos="fade-up" data-aos-delay="300" />
            </div>

            <!-- Categories Section -->
            <div>
                <SectionHeaderTitle :title="t('home.categories.title')"
                    :subtitle="t('home.categories.subtitle')"
                    image-url="/images/icons/book-icon.svg"
                    :image-alt="t('common.bookImageAlt')"
                    class="mb-6 md:mb-8" data-aos="fade-up" data-aos-delay="400" />
                <CategoriesList data-aos="fade-up" data-aos-delay="500" />
            </div>

            <!-- Care Guides Section -->
            <div>
                <SectionHeaderTitle :title="t('home.careGuides.title')"
                    :subtitle="t('home.careGuides.subtitle')"
                    image-url="/images/icons/heart-icon.svg"
                    :image-alt="t('common.heartImageAlt')"
                    class="mb-6 md:mb-8" data-aos="fade-up" />
                <CareGuidesSection data-aos="fade-up" data-aos-delay="100" />
            </div>

            <!-- Discord Section -->
            <div>
                <DiscordCard data-aos="fade-up" />
            </div>

            <!-- Reviews Section -->
            <div>
                <SectionHeaderTitle :title="t('home.reviews.title')"
                    :subtitle="t('home.reviews.subtitle')"
                    image-url="/images/icons/box-icon.svg"
                    :image-alt="t('common.boxImageAlt')"
                    class="mb-6 md:mb-8" data-aos="fade-up" />
                <ReviewsSection data-aos="fade-up" data-aos-delay="100" />
            </div>

            <!-- Podcasts Section -->
            <div>
                <SectionHeaderTitle :title="t('home.podcasts.title')"
                    :subtitle="t('home.podcasts.subtitle')"
                    image-url="/images/icons/music-icon.svg"
                    :image-alt="t('common.musicImageAlt')"
                    class="mb-6 md:mb-8" data-aos="fade-up" />
                <PodcastsSection data-aos="fade-up" data-aos-delay="100" />
            </div>

            <!-- Tutorial Section -->
            <div>
                <SectionHeaderTitle :title="t('home.tutorials.title')"
                    :subtitle="t('home.tutorials.subtitle')"
                    image-url="/images/icons/hammer-icon.svg"
                    :image-alt="t('common.hammerImageAlt')"
                    class="mb-6 md:mb-8" data-aos="fade-up" />
                <TutorialsSection data-aos="fade-up" data-aos-delay="100" />
            </div>

            <!-- All Articles Section -->
            <div>
                <SectionHeaderTitle :title="t('home.allArticles.title')"
                    :subtitle="t('home.allArticles.subtitle')"
                    image-url="/images/icons/document-icon.svg"
                    :image-alt="t('common.documentImageAlt')"
                    class="mb-6 md:mb-8" data-aos="fade-up" />
                <AllPostsSection data-aos="fade-up" data-aos-delay="100" />
            </div>
        </div>
    </div>
</template>