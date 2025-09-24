<template>
    <div class="fixed inset-0 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-tr from-gray-100 to-white">
        <div class="text-center max-w-md mx-auto">
            <h1 class="scale-150 sm:scale-200">404</h1>
            <div class="my-4 sm:my-8">
                <span class="text-4xl sm:text-6xl md:text-7xl text-gray-600 font-bold inline-block">
                    Error
                </span>
            </div>
            <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-600 mb-2 sm:mb-4">
                Page Not Found
            </h2>
            <p class="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                Sorry, the page you are looking for does not exist.
            </p>

            <!-- Go Back Home Button -->
            <div class="flex justify-center">
                <NuxtLink to="/">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded">
                        Go Back Home
                        <i class="fa-solid fa-home ml-2"></i>
                    </button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>