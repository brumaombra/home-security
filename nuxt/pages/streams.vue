<script setup>
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { createSEOMetatags, createPageSchema } from '~/utils/utils.js';
import BlogBreadcrumb from '~/components/BlogBreadcrumb.vue';
import PostCard from '~/components/PostCard.vue';
import AudioPlayer from '~/components/ui/AudioPlayer.vue';
import YouTubeFacade from '~/components/ui/YouTubeFacade.vue';
import DiscordCard from '~/components/DiscordCard.vue';
import SurveyCard from '~/components/SurveyCard.vue';
import EcologiCard from '~/components/EcologiCard.vue';
import PageTitle from '~/components/ui/PageTitle.vue';
import SocialShareSidebar from '~/components/SocialShareSidebar.vue';
import ReadingProgress from '~/components/ReadingProgress.vue';
import BlogFAQSection from '~/components/BlogFAQSection.vue';
import BlogInfoSection from '~/components/BlogInfoSection.vue';
import LineDivider from '~/components/content/LineDivider.vue';
import TableOfContents from '~/components/TableOfContents.vue';
import ProductReviewCard from '~/components/ProductReviewCard.vue';

const { t, locale } = useI18n();
const localeHead = useLocaleHead();
const localePath = useLocalePath();
const route = useRoute();
const { slug } = route.params;
const fullURL = `https://brumaants.com/${slug}`; // Get base URL for sharing

// Fetch single post
const { data: post } = await useAsyncData(`post-${slug}-${locale.value}`, async () => {
    return await queryCollection('blog').path(route.path).first();
});

// Fetch related posts
const { data: relatedPosts } = await useAsyncData(`related-posts-${slug}-${locale.value}`, async () => {
    // Get all posts except current post
    const posts = await queryCollection('blog').select('title', 'description', 'image', 'categoryText', 'path').where('language', '=', locale.value).where('path', '<>', route.path).all();
    if (!posts || posts.length === 0) return [];

    // Shuffle array using Fisher-Yates algorithm
    for (let i = posts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [posts[i], posts[j]] = [posts[j], posts[i]];
    }

    // Return first 4 items
    return posts.slice(0, 4);
});

// Fetch related categories
const { data: relatedCategories } = await useAsyncData(`related-categories-${slug}-${locale.value}`, async () => {
    // Get all posts excluding current post's category
    const allPosts = await queryCollection('blog').select('categorySlug', 'categoryText', 'image').where('language', '=', locale.value).where('categorySlug', '<>', post.value?.categorySlug).all();
    if (!allPosts || allPosts.length === 0) return [];

    // Extract unique categories
    const categoriesList = allPosts.map(post => post.categorySlug);
    const uniqueCategories = categoriesList.filter((category, index, self) => category && self.indexOf(category) === index);
    const categoryCounts = uniqueCategories.map(category => {
        const firstPost = allPosts.find(post => post.categorySlug === category);
        return {
            name: firstPost?.categoryText || category,
            slug: category,
            count: categoriesList.filter(item => item === category).length,
            image: firstPost?.image
        };
    });

    // Shuffle categories using Fisher-Yates algorithm
    for (let i = categoryCounts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [categoryCounts[i], categoryCounts[j]] = [categoryCounts[j], categoryCounts[i]];
    }

    // Return first 4 categories
    return categoryCounts.slice(0, 4);
});

// Define SEO metadata
useSeoMeta(createSEOMetatags({
    title: `${post.value.title} - BRUMA Ants`,
    description: post.value?.description,
    url: useRoute().path,
    image: post.value?.image,
    type: 'article'
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
        title: post.value?.title,
        description: post.value?.description,
        url: useRoute().path,
        author: post.value?.author,
        authorUrl: post.value?.authorUrl,
        isBlogPost: true,
        image: post.value?.image,
        datePublished: post.value?.datePublished,
        dateModified: post.value?.dateModified,
        faqs: post.value?.faqs,
        breadcrumbs: [
            { name: t('seo.home.breadcrumb'), item: localePath('/') },
            { name: post.value?.title, item: useRoute().path }
        ],

        // Product schema
        productBrand: post.value?.productBrand,
        productName: post.value?.productName,
        productDescription: post.value?.productDescription,
        productImage: post.value?.productImage,
        reviewDescription: post.value?.reviewDescription,
        reviewRating: post.value?.reviewRating,

        // How-to schema
        howToTitle: post.value?.howToTitle,
        howToDescription: post.value?.howToDescription,
        howToImage: post.value?.howToImage,
        howToTotalTime: post.value?.howToTotalTime,
        howToSupply: post.value?.howToSupply,
        howToTools: post.value?.howToTools,
        howToSteps: post.value?.howToSteps
    })
});
</script>

<template>
    <!-- Reading progress bar under navbar -->
    <ReadingProgress />

    <!-- Main content wrapper -->
    <div class="relative max-w-4xl mx-auto px-1">
        <!-- Social Share Sidebar -->
        <SocialShareSidebar :title="post.title" :url="fullURL" />

        <!-- Breadcrumb -->
        <BlogBreadcrumb :postTitle="post.title" class="mb-5 sm:mb-7" data-aos="fade-up" />

        <!-- Article Header -->
        <article>
            <header class="mb-8">
                <!-- Title -->
                <div data-aos="fade-up" data-aos-delay="100">
                    <PageTitle>{{ post.title }}</PageTitle>
                </div>

                <!-- Category -->
                <div class="flex mb-8" data-aos="fade-up" data-aos-delay="200">
                    <NuxtLinkLocale :to="`/categories/${post.categorySlug}`">
                        <div v-if="post.categoryText" class="px-5 py-3 rounded-full text-md font-bold text-bruma-green shadow-2xl dark:shadow-none bg-white dark:bg-gray-100/10 transform transition-transform duration-200 hover:scale-105">
                            {{ post.categoryText }}
                        </div>
                    </NuxtLinkLocale>
                </div>

                <!-- Media -->
                <div data-aos="fade-up" data-aos-delay="300">
                    <!-- YouTube Video -->
                    <YouTubeFacade v-if="post.youtubeVideoId" :youtubeVideoId="post.youtubeVideoId" :title="post.title" />

                    <!-- Audio -->
                    <div v-else-if="post.audio">
                        <AudioPlayer :src="post.audio" :title="post.title" :image="post.image" />
                    </div>

                    <!-- Featured Image -->
                    <div v-else-if="post.image" class="relative w-full rounded-4xl overflow-hidden">
                        <NuxtImg :src="post.image" :alt="post.title" loading="lazy" class="w-full h-full object-cover" />
                    </div>
                </div>
            </header>

            <!-- Table of Contents -->
            <TableOfContents :content="post" class="mb-6 md:mb-8" data-aos="fade-up" data-aos-delay="350" />

            <!-- Article Content -->
            <div class="prose dark:prose-invert prose-lg max-w-none" data-aos="fade-up" data-aos-delay="400">
                <ContentRenderer :value="post" />
            </div>

            <!-- FAQ Section -->
            <div class="mt-12" data-aos="fade-up">
                <BlogFAQSection v-if="post.faqs && post.faqs?.length > 0" :faqs="post.faqs" />
            </div>

            <!-- Divider -->
            <LineDivider v-if="post.productBrand && post.productName && post.productImage && post.reviewDescription && post.reviewRating" data-aos="fade-up" />

            <!-- Product Review Section -->
            <div v-if="post.productBrand && post.productName && post.productImage && post.reviewDescription && post.reviewRating" data-aos="fade-up">
                <ProductReviewCard :product-brand="post.productBrand" :product-name="post.productName" :product-image="post.productImage" :review-description="post.reviewDescription" :review-author="post.author" :review-rating="post.reviewRating" />
            </div>

            <!-- Divider -->
            <LineDivider data-aos="fade-up" />

            <!-- Blog Info Section -->
            <BlogInfoSection :author="post.author" :author-url="post.authorUrl" :author-image-url="post.authorImageUrl" :date-published="post.datePublished" :date-modified="post.dateModified" />
        </article>

        <!-- Divider -->
        <LineDivider data-aos="fade-up" />

        <!-- Discord Section -->
        <DiscordCard data-aos="fade-up" />

        <!-- Divider -->
        <LineDivider data-aos="fade-up" />

        <!-- Ecologi Card -->
        <EcologiCard data-aos="fade-up" />

        <!-- Divider -->
        <LineDivider data-aos="fade-up" />

        <!-- Survey Card -->
        <SurveyCard data-aos="fade-up" />

        <!-- Divider -->
        <LineDivider data-aos="fade-up" />

        <!-- Related Posts -->
        <section v-if="relatedPosts?.length" data-aos="fade-up">
            <h2 class="text-2xl md:text-3xl font-extrabold mb-5 dark:text-gray-100">{{ t('common.readAlso') }}</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7">
                <NuxtLinkLocale :to="relatedPost.path" v-for="relatedPost in relatedPosts" :key="relatedPost.id">
                    <PostCard :image="relatedPost.image" :category="relatedPost.categoryText" :title="relatedPost.title" :description="relatedPost.description" class="group h-full" />
                </NuxtLinkLocale>
            </div>
        </section>

        <!-- Divider -->
        <LineDivider data-aos="fade-up" />

        <!-- Related Categories -->
        <section v-if="relatedCategories?.length" data-aos="fade-up">
            <!-- Title -->
            <h2 class="text-2xl md:text-3xl font-extrabold mb-5 dark:text-gray-100">{{ t('common.exploreCategories') }}</h2>

            <!-- Categories list -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-7">
                <NuxtLinkLocale v-for="category in relatedCategories" :key="category.slug" :to="`/categories/${category.slug}`">
                    <CategoryCard :name="category.name" :image="category.image" :count="category.count" />
                </NuxtLinkLocale>
            </div>

            <!-- Explore all categories button -->
            <div class="flex items-center justify-center mt-8 md:mt-10">
                <NuxtLinkLocale to="/categories">
                    <CallToActionButton :text="t('common.exploreAllCategories')" icon-end="fa-solid fa-bookmark" />
                </NuxtLinkLocale>
            </div>
        </section>
    </div>
</template>

<style>
.prose h1 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 2rem;
}

.prose h2 {
    font-size: 2.7rem;
    line-height: 2.8rem;
    font-weight: 700;
    margin-top: 3rem;
    margin-bottom: 2rem;
}

.prose h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.prose p {
    font-size: 1.2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    line-height: 1.625;
}

.prose p strong {
    font-weight: 800;
}

.prose ul,
.prose ol {
    font-size: 1.2rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    list-style-type: disc;
}

.prose li {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    list-style-position: outside;
}

.prose li strong {
    font-weight: 800;
}

.prose blockquote strong {
    font-weight: 800;
}

.prose img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.prose a {
    text-decoration: none;
    font-weight: 800;
    color: #4EAC49;
}

.prose hr {
    border: 0;
    height: 3px;
    background-color: #EEEEEE;
    width: 70%;
    margin: auto;
    margin-top: 3rem;
    margin-bottom: 3rem;
    border-radius: 5px;
}

.dark .prose hr {
    background-color: #FFFFFF1A;
}

.dark .prose {
    color: #FFF;
}

/* Mobile */
@media (max-width: 640px) {
    .prose p {
        font-size: 1rem;
    }

    .prose h2 {
        font-size: 2rem;
        margin-bottom: 0;
    }

    .prose h3 {
        font-size: 1.4rem;
        margin-bottom: 0;
    }

    .prose img {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }
}
</style>