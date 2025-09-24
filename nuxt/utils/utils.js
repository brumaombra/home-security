import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';

// Delay function
export const delay = ms => {
    if (typeof ms !== 'number' || ms < 0) throw new Error('Invalid delay value');
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Convert text to slug
export const textToSlug = text => {
    if (typeof text !== 'string') return '';
    return text.toLowerCase().replace(/\s+/g, '-');
};

// Convert slug to text
export const slugToText = slug => {
    if (typeof slug !== 'string') return '';
    const text = slug.replace(/-/g, ' ').trim(); // Replace hyphens with spaces
    return text.replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
};

// Handle theme toggle
export const toggleTheme = () => {
    const globalStore = useGlobalStore();
    const theme = globalStore.value.theme === 'dark' ? 'light' : 'dark';
    globalStore.value.theme = theme;
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark');
};

// Format just the date (e.g. "July 19, 2025")
export const formatDateLong = dateInput => {
    if (!dateInput) return '';

    // Convert to Date object safely
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';

    // Format in user's local timezone
    const { locale } = useI18n();
    return new Intl.DateTimeFormat(locale.value, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};

// Create the SEO metatags
export const createSEOMetatags = ({ title, description, url = '', image }) => {
    const urlTag = `https://brumaants.com${url}`; // Create the full URL
    const titleTag = title || 'BRUMA Ants';
    const descriptionTag = description || 'The best place for all your ant-related content!';
    const imageTag = image || 'https://brumaants.com/images/meta-image.jpg';

    return {
        // Title & Description
        title: titleTag,
        description: descriptionTag,

        // Canonical URL
        ogUrl: urlTag,
        canonical: urlTag,

        // Open Graph
        ogType: 'website',
        ogSiteName: 'BRUMA Ants',
        ogTitle: titleTag,
        ogDescription: descriptionTag,
        ogImage: imageTag,

        // Twitter Cards
        twitterCard: 'summary_large_image',
        twitterTitle: titleTag,
        twitterDescription: descriptionTag,
        twitterImage: imageTag
    };
};

// Create structured data schema for the page
export const createPageSchema = ({
    title,
    description,
    url = '/',
    image,
    datePublished,
    dateModified,
    author,
    authorUrl,
    isBlogPost = false,
    breadcrumbs = [],
    faqs = [],
    productBrand,
    productName,
    productDescription,
    productImage,
    reviewDescription,
    reviewRating,
    howToTitle,
    howToDescription,
    howToImage,
    howToTotalTime,
    howToSupply = [],
    howToTools = [],
    howToSteps = []
}) => {
    const fullUrl = `https://brumaants.com${url}`;
    const imageUrl = image || 'https://brumaants.com/images/meta-image.jpg';

    const schemas = [];

    // WebPage schema
    schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url: fullUrl,
        image: imageUrl,
        publisher: {
            '@type': 'Organization',
            name: 'BRUMA Ants',
            logo: {
                '@type': 'ImageObject',
                url: 'https://brumaants.com/images/bruma-ants-logo.png'
            }
        }
    });

    // Article schema (Only for blog posts)
    if (isBlogPost) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            description,
            image: imageUrl,
            url: fullUrl,
            datePublished: datePublished,
            dateModified: dateModified || datePublished,
            author: {
                '@type': 'Person',
                name: author,
                url: authorUrl
            },
            publisher: {
                '@type': 'Organization',
                name: 'BRUMA Ants',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://brumaants.com/images/bruma-ants-logo.png'
                }
            }
        });
    }

    // Product Review schema (Only if all product review data is provided)
    if (productName && productBrand && reviewDescription && reviewRating) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: productName,
            description: productDescription,
            image: productImage,
            brand: {
                '@type': 'Brand',
                name: productBrand
            },
            review: {
                '@type': 'Review',
                reviewRating: {
                    '@type': 'Rating',
                    ratingValue: String(reviewRating),
                    bestRating: '5',
                    worstRating: '0'
                },
                author: {
                    '@type': 'Person',
                    name: author
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'BRUMA Ants',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://brumaants.com/images/bruma-ants-logo.png'
                    }
                },
                datePublished: datePublished,
                reviewBody: reviewDescription
            }
        });
    }

    // FAQ schema
    if (Array.isArray(faqs) && faqs.length > 0) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer
                }
            }))
        });
    }

    // BreadcrumbList schema
    if (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
        schemas.push({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: breadcrumb.name,
                item: `https://brumaants.com${breadcrumb.item}`
            }))
        });
    }

    // HowTo schema
    if (howToTitle && howToDescription && Array.isArray(howToSteps) && howToSteps.length > 0) {
        const howToSchema = {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: howToTitle,
            description: howToDescription,
            image: [howToImage],
            totalTime: howToTotalTime,
            url: fullUrl,
            step: howToSteps.map((step, index) => ({
                '@type': 'HowToStep',
                position: index + 1,
                name: step.name,
                text: step.text,
                image: step.image
            }))
        };

        // Add supply if provided
        if (Array.isArray(howToSupply) && howToSupply.length > 0) {
            howToSchema.supply = howToSupply.map(supply => ({
                '@type': 'HowToSupply',
                name: supply.name
            }));
        }

        // Add tools if provided
        if (Array.isArray(howToTools) && howToTools.length > 0) {
            howToSchema.tool = howToTools.map(tool => ({
                '@type': 'HowToTool',
                name: tool.name
            }));
        }

        // Add author if available
        if (author) {
            howToSchema.author = {
                '@type': 'Person',
                name: author,
                url: authorUrl
            };
        }

        schemas.push(howToSchema);
    }

    // Return the JSON-LD scripts
    return {
        script: schemas.map((schema, index) => ({
            type: 'application/ld+json',
            key: `ld-json-schema-${index}`,
            children: JSON.stringify(schema)
        }))
    };
};