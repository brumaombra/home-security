// Available color options
export const gradientColorsList = [
    '', 'purple-pink', 'indigo-purple', 'violet-fuchsia', 'blue-purple',
    'cosmic-purple', 'royal-sunset', 'mystic-ocean', 'aurora-purple', 'galaxy-burst',
    'lavender-dream', 'midnight-purple', 'neon-glow', 'royal-amethyst', 'purple-storm',
    'purple', 'blue', 'gray', 'danger', 'green', 'yellow', 'orange', 'red',
    'facebook-blue', 'twitter-dark', 'whatsapp-green', 'linkedin-blue', 'telegram-blue',
    'landing-page-background'
];

// Theme colors list
export const themeColorsList = [
    'purple-pink', 'indigo-purple', 'violet-fuchsia', 'blue-purple',
    'cosmic-purple', 'royal-sunset', 'mystic-ocean', 'aurora-purple', 'galaxy-burst',
    'lavender-dream', 'midnight-purple', 'neon-glow', 'royal-amethyst', 'purple-storm',
    'purple', 'blue', 'gray', 'green', 'yellow', 'orange', 'red'
];

// Background gradient definitions
const backgroundGradient = {
    // Custom colors
    'purple-pink': 'from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-500',
    'indigo-purple': 'from-indigo-500 to-purple-600 dark:from-indigo-500 dark:to-purple-600',
    'blue-purple': 'from-blue-500 to-purple-600 dark:from-blue-500 dark:to-purple-500',
    'violet-fuchsia': 'from-violet-500 to-fuchsia-600 dark:from-violet-500 dark:to-fuchsia-500',
    'cosmic-purple': 'from-purple-600 via-blue-600 to-indigo-800 dark:from-purple-500 dark:via-blue-500 dark:to-indigo-600',
    'royal-sunset': 'from-purple-400 via-pink-500 to-red-500 dark:from-purple-500 dark:via-pink-500 dark:to-red-500',
    'mystic-ocean': 'from-blue-600 via-purple-600 to-indigo-800 dark:from-blue-500 dark:via-purple-500 dark:to-indigo-600',
    'aurora-purple': 'from-purple-500 via-violet-500 to-purple-700 dark:from-purple-400 dark:via-violet-400 dark:to-purple-600',
    'galaxy-burst': 'from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-500 dark:to-pink-500',
    'lavender-dream': 'from-purple-300 via-purple-400 to-indigo-500 dark:from-purple-400 dark:via-purple-500 dark:to-indigo-500',
    'midnight-purple': 'from-slate-900 via-purple-900 to-slate-900 dark:from-slate-700 dark:via-purple-700 dark:to-slate-700',
    'neon-glow': 'from-purple-400 via-fuchsia-400 to-cyan-400 dark:from-purple-400 dark:via-fuchsia-400 dark:to-cyan-400',
    'royal-amethyst': 'from-purple-700 via-purple-500 to-indigo-600 dark:from-purple-600 dark:via-purple-500 dark:to-indigo-500',
    'purple-storm': 'from-indigo-600 via-purple-600 to-violet-600 dark:from-indigo-500 dark:via-purple-500 dark:to-violet-500',

    // Basic colors
    'purple': 'from-purple-500 to-indigo-600 dark:from-purple-500 dark:to-indigo-500',
    'blue': 'from-blue-500 to-cyan-600 dark:from-blue-500 dark:to-cyan-500',
    'gray': 'from-gray-400 via-gray-500 to-gray-600 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600',
    'danger': 'from-red-500 via-orange-500 to-pink-600 dark:from-red-500 dark:via-orange-500 dark:to-pink-500',
    'green': 'from-green-500 to-teal-600 dark:from-green-500 dark:to-teal-500',
    'yellow': 'from-yellow-500 to-orange-600 dark:from-yellow-500 dark:to-orange-500',
    'orange': 'from-orange-500 to-red-600 dark:from-orange-500 dark:to-red-500',
    'red': 'from-red-500 to-pink-600 dark:from-red-500 dark:to-pink-500',

    // Social platform colors
    'facebook-blue': 'from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-500 dark:via-blue-400 dark:to-indigo-500',
    'twitter-dark': 'from-slate-900 via-gray-800 to-black dark:from-slate-800 dark:via-gray-700 dark:to-gray-900',
    'whatsapp-green': 'from-green-500 via-emerald-500 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-500',
    'linkedin-blue': 'from-blue-700 via-blue-600 to-indigo-700 dark:from-blue-600 dark:via-blue-500 dark:to-indigo-600',
    'telegram-blue': 'from-sky-500 via-blue-500 to-cyan-500 dark:from-sky-400 dark:via-blue-400 dark:to-cyan-400'
};

// Text color definitions
const textColors = {
    // Custom colors
    'purple-pink': 'text-purple-700 dark:text-purple-200',
    'indigo-purple': 'text-indigo-700 dark:text-indigo-200',
    'blue-purple': 'text-blue-700 dark:text-blue-200',
    'violet-fuchsia': 'text-violet-700 dark:text-violet-200',
    'cosmic-purple': 'text-purple-700 dark:text-purple-200',
    'royal-sunset': 'text-purple-700 dark:text-purple-200',
    'mystic-ocean': 'text-blue-700 dark:text-blue-200',
    'aurora-purple': 'text-purple-700 dark:text-purple-200',
    'galaxy-burst': 'text-indigo-700 dark:text-indigo-200',
    'lavender-dream': 'text-purple-600 dark:text-purple-300',
    'midnight-purple': 'text-slate-700 dark:text-slate-200',
    'neon-glow': 'text-purple-700 dark:text-purple-200',
    'royal-amethyst': 'text-purple-800 dark:text-purple-100',
    'purple-storm': 'text-indigo-700 dark:text-indigo-200',

    // Basic colors
    'purple': 'text-purple-700 dark:text-purple-200',
    'blue': 'text-blue-700 dark:text-blue-200',
    'gray': 'text-gray-700 dark:text-gray-200',
    'danger': 'text-red-700 dark:text-red-200',
    'green': 'text-green-700 dark:text-green-200',
    'yellow': 'text-yellow-700 dark:text-yellow-200',
    'orange': 'text-orange-700 dark:text-orange-200',
    'red': 'text-red-700 dark:text-red-200',

    // Social platform colors
    'facebook-blue': 'text-blue-700 dark:text-blue-200',
    'twitter-dark': 'text-slate-700 dark:text-slate-200',
    'whatsapp-green': 'text-green-700 dark:text-green-200',
    'linkedin-blue': 'text-blue-800 dark:text-blue-100',
    'telegram-blue': 'text-sky-700 dark:text-sky-200'
};

// Soft background gradients (subtle, for backgrounds)
const softGradients = {
    // Custom colors
    'purple-pink': {
        default: 'from-purple-100 to-pink-100 dark:from-purple-800/60 dark:to-pink-800/60 border border-purple-200 dark:border-purple-600/50',
        outline: 'from-purple-100 to-pink-100 dark:from-purple-800/60 dark:to-pink-800/60 border border-purple-300 dark:border-purple-500/70',
        solid: 'from-purple-500 to-pink-600 border border-purple-500'
    },
    'indigo-purple': {
        default: 'from-indigo-100 to-purple-100 dark:from-indigo-800/60 dark:to-purple-800/60 border border-indigo-200 dark:border-indigo-600/50',
        outline: 'from-indigo-100 to-purple-100 dark:from-indigo-800/60 dark:to-purple-800/60 border border-indigo-300 dark:border-indigo-500/70',
        solid: 'from-indigo-500 to-purple-600 border border-indigo-500'
    },
    'blue-purple': {
        default: 'from-blue-100 to-purple-100 dark:from-blue-800/60 dark:to-purple-800/60 border border-blue-200 dark:border-blue-600/50',
        outline: 'from-blue-100 to-purple-100 dark:from-blue-800/60 dark:to-purple-800/60 border border-blue-300 dark:border-blue-500/70',
        solid: 'from-blue-500 to-purple-600 border border-blue-500'
    },
    'violet-fuchsia': {
        default: 'from-violet-100 to-fuchsia-100 dark:from-violet-800/60 dark:to-fuchsia-800/60 border border-violet-200 dark:border-violet-600/50',
        outline: 'from-violet-100 to-fuchsia-100 dark:from-violet-800/60 dark:to-fuchsia-800/60 border border-violet-300 dark:border-violet-500/70',
        solid: 'from-violet-500 to-fuchsia-600 border border-violet-500'
    },
    'cosmic-purple': {
        default: 'from-purple-100 via-blue-50 to-indigo-100 dark:from-purple-800/60 dark:via-blue-700/50 dark:to-indigo-800/60 border border-indigo-200 dark:border-indigo-600/50',
        outline: 'from-purple-100 via-blue-50 to-indigo-100 dark:from-purple-800/60 dark:via-blue-700/50 dark:to-indigo-800/60 border border-indigo-300 dark:border-indigo-500/70',
        solid: 'from-purple-600 via-blue-600 to-indigo-800 border border-indigo-500'
    },
    'royal-sunset': {
        default: 'from-purple-100 via-pink-50 to-red-100 dark:from-purple-800/60 dark:via-pink-700/50 dark:to-red-800/60 border border-purple-200 dark:border-purple-600/50',
        outline: 'from-purple-100 via-pink-50 to-red-100 dark:from-purple-800/60 dark:via-pink-700/50 dark:to-red-800/60 border border-purple-300 dark:border-purple-500/70',
        solid: 'from-purple-400 via-pink-500 to-red-500 border border-purple-500'
    },
    'mystic-ocean': {
        default: 'from-blue-100 via-purple-50 to-indigo-100 dark:from-blue-800/60 dark:via-purple-700/50 dark:to-indigo-800/60 border border-blue-200 dark:border-blue-600/50',
        outline: 'from-blue-100 via-purple-50 to-indigo-100 dark:from-blue-800/60 dark:via-purple-700/50 dark:to-indigo-800/60 border border-blue-300 dark:border-blue-500/70',
        solid: 'from-blue-600 via-purple-600 to-indigo-800 border border-blue-500'
    },
    'aurora-purple': {
        default: 'from-purple-100 via-violet-50 to-purple-100 dark:from-purple-800/60 dark:via-violet-700/50 dark:to-purple-800/60 border border-purple-200 dark:border-purple-600/50',
        outline: 'from-purple-100 via-violet-50 to-purple-100 dark:from-purple-800/60 dark:via-violet-700/50 dark:to-purple-800/60 border border-purple-300 dark:border-purple-500/70',
        solid: 'from-purple-500 via-violet-500 to-purple-700 border border-purple-500'
    },
    'galaxy-burst': {
        default: 'from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-800/60 dark:via-purple-700/50 dark:to-pink-800/60 border border-indigo-200 dark:border-indigo-600/50',
        outline: 'from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-800/60 dark:via-purple-700/50 dark:to-pink-800/60 border border-indigo-300 dark:border-indigo-500/70',
        solid: 'from-indigo-500 via-purple-500 to-pink-500 border border-indigo-500'
    },
    'lavender-dream': {
        default: 'from-purple-50 via-purple-25 to-indigo-50 dark:from-purple-800/50 dark:via-purple-700/40 dark:to-indigo-800/50 border border-purple-100 dark:border-purple-600/60',
        outline: 'from-purple-50 via-purple-25 to-indigo-50 dark:from-purple-800/50 dark:via-purple-700/40 dark:to-indigo-800/50 border border-purple-200 dark:border-purple-600/70',
        solid: 'from-purple-300 via-purple-400 to-indigo-500 border border-purple-300'
    },
    'midnight-purple': {
        default: 'from-slate-100 via-purple-50 to-slate-100 dark:from-slate-700/80 dark:via-purple-600/50 dark:to-slate-700/80 border border-slate-200 dark:border-slate-500',
        outline: 'from-slate-100 via-purple-50 to-slate-100 dark:from-slate-700/80 dark:via-purple-600/50 dark:to-slate-700/80 border border-slate-300 dark:border-slate-400/70',
        solid: 'from-slate-900 via-purple-900 to-slate-900 border border-slate-700'
    },
    'neon-glow': {
        default: 'from-purple-100 via-fuchsia-50 to-cyan-100 dark:from-purple-800/60 dark:via-fuchsia-700/50 dark:to-cyan-800/60 border border-purple-200 dark:border-purple-600/50',
        outline: 'from-purple-100 via-fuchsia-50 to-cyan-100 dark:from-purple-800/60 dark:via-fuchsia-700/50 dark:to-cyan-800/60 border border-purple-300 dark:border-purple-500/70',
        solid: 'from-purple-400 via-fuchsia-400 to-cyan-400 border border-purple-500'
    },
    'royal-amethyst': {
        default: 'from-purple-100 via-purple-50 to-indigo-100 dark:from-purple-800/60 dark:via-purple-700/50 dark:to-indigo-800/60 border border-purple-200 dark:border-purple-600/50',
        outline: 'from-purple-100 via-purple-50 to-indigo-100 dark:from-purple-800/60 dark:via-purple-700/50 dark:to-indigo-800/60 border border-purple-300 dark:border-purple-500/70',
        solid: 'from-purple-700 via-purple-500 to-indigo-600 border border-purple-700'
    },
    'purple-storm': {
        default: 'from-indigo-100 via-purple-50 to-violet-100 dark:from-indigo-800/60 dark:via-purple-700/50 dark:to-violet-800/60 border border-indigo-200 dark:border-indigo-600/50',
        outline: 'from-indigo-100 via-purple-50 to-violet-100 dark:from-indigo-800/60 dark:via-purple-700/50 dark:to-violet-800/60 border border-indigo-300 dark:border-indigo-500/70',
        solid: 'from-indigo-600 via-purple-600 to-violet-600 border border-indigo-600'
    },

    // Basic colors
    'purple': {
        default: 'from-purple-100 via-indigo-50 to-indigo-100 dark:from-purple-800/60 dark:via-indigo-700/50 dark:to-indigo-800/60 border border-purple-200 dark:border-purple-600/50',
        outline: 'from-purple-100 via-indigo-50 to-indigo-100 dark:from-purple-800/60 dark:via-indigo-700/50 dark:to-indigo-800/60 border border-purple-300 dark:border-purple-500/70',
        solid: 'from-purple-500 to-indigo-600 border border-purple-500'
    },
    'blue': {
        default: 'from-blue-100 via-cyan-50 to-cyan-100 dark:from-blue-800/60 dark:via-cyan-700/50 dark:to-cyan-800/60 border border-blue-200 dark:border-blue-600/50',
        outline: 'from-blue-100 via-cyan-50 to-cyan-100 dark:from-blue-800/60 dark:via-cyan-700/50 dark:to-cyan-800/60 border border-blue-300 dark:border-blue-500/70',
        solid: 'from-blue-500 to-cyan-600 border border-blue-500'
    },
    'gray': {
        default: 'from-gray-100 via-gray-50 to-gray-100 dark:from-gray-700/80 dark:via-gray-600/50 dark:to-gray-700/80 border border-gray-200 dark:border-gray-500/50',
        outline: 'from-gray-100 via-gray-50 to-gray-100 dark:from-gray-700/80 dark:via-gray-600/50 dark:to-gray-700/80 border border-gray-300 dark:border-gray-400/70',
        solid: 'from-gray-400 via-gray-500 to-gray-600 border border-gray-600'
    },
    'danger': {
        default: 'from-red-100 via-orange-50 to-pink-100 dark:from-red-800/60 dark:via-orange-700/50 dark:to-pink-800/60 border border-red-200 dark:border-red-600/50',
        outline: 'from-red-100 via-orange-50 to-pink-100 dark:from-red-800/60 dark:via-orange-700/50 dark:to-pink-800/60 border border-red-300 dark:border-red-500/70',
        solid: 'from-red-500 via-orange-500 to-pink-600 border border-red-500'
    },
    'green': {
        default: 'from-green-100 via-teal-50 to-teal-100 dark:from-green-800/60 dark:via-teal-700/50 dark:to-teal-800/60 border border-green-200 dark:border-green-600/50',
        outline: 'from-green-100 via-teal-50 to-teal-100 dark:from-green-800/60 dark:via-teal-700/50 dark:to-teal-800/60 border border-green-300 dark:border-green-500/70',
        solid: 'from-green-500 to-teal-600 border border-green-500'
    },
    'yellow': {
        default: 'from-yellow-100 via-orange-50 to-orange-100 dark:from-yellow-800/60 dark:via-orange-700/50 dark:to-orange-800/60 border border-yellow-200 dark:border-yellow-600/50',
        outline: 'from-yellow-100 via-orange-50 to-orange-100 dark:from-yellow-800/60 dark:via-orange-700/50 dark:to-orange-800/60 border border-yellow-300 dark:border-yellow-500/70',
        solid: 'from-yellow-500 to-orange-600 border border-yellow-500'
    },
    'orange': {
        default: 'from-orange-100 via-amber-50 to-amber-100 dark:from-orange-800/60 dark:via-amber-700/50 dark:to-amber-800/60 border border-orange-200 dark:border-orange-600/50',
        outline: 'from-orange-100 via-amber-50 to-amber-100 dark:from-orange-800/60 dark:via-amber-700/50 dark:to-amber-800/60 border border-orange-300 dark:border-orange-500/70',
        solid: 'from-orange-500 to-amber-600 border border-orange-500'
    },
    'red': {
        default: 'from-red-100 via-pink-50 to-pink-100 dark:from-red-800/60 dark:via-pink-700/50 dark:to-pink-800/60 border border-red-200 dark:border-red-600/50',
        outline: 'from-red-100 via-pink-50 to-pink-100 dark:from-red-800/60 dark:via-pink-700/50 dark:to-pink-800/60 border border-red-300 dark:border-red-500/70',
        solid: 'from-red-500 to-pink-600 border border-red-500'
    },

    // Social platform colors
    'facebook-blue': {
        default: 'from-blue-100 via-blue-50 to-indigo-100 dark:from-blue-800/60 dark:via-blue-700/50 dark:to-indigo-800/60 border border-blue-200 dark:border-blue-600/50',
        outline: 'from-blue-100 via-blue-50 to-indigo-100 dark:from-blue-800/60 dark:via-blue-700/50 dark:to-indigo-800/60 border border-blue-300 dark:border-blue-500/70',
        solid: 'from-blue-600 via-blue-500 to-indigo-600 border border-blue-600'
    },
    'twitter-dark': {
        default: 'from-slate-100 via-gray-50 to-gray-100 dark:from-slate-700/80 dark:via-gray-600/50 dark:to-gray-700/80 border border-slate-200 dark:border-slate-500/50',
        outline: 'from-slate-100 via-gray-50 to-gray-100 dark:from-slate-700/80 dark:via-gray-600/50 dark:to-gray-700/80 border border-slate-300 dark:border-slate-400/70',
        solid: 'from-slate-900 via-gray-800 to-black border border-slate-900'
    },
    'whatsapp-green': {
        default: 'from-green-100 via-emerald-50 to-teal-100 dark:from-green-800/60 dark:via-emerald-700/50 dark:to-teal-800/60 border border-green-200 dark:border-green-600/50',
        outline: 'from-green-100 via-emerald-50 to-teal-100 dark:from-green-800/60 dark:via-emerald-700/50 dark:to-teal-800/60 border border-green-300 dark:border-green-500/70',
        solid: 'from-green-500 via-emerald-500 to-teal-600 border border-green-500'
    },
    'linkedin-blue': {
        default: 'from-blue-100 via-blue-50 to-indigo-100 dark:from-blue-800/70 dark:via-blue-700/60 dark:to-indigo-800/70 border border-blue-300 dark:border-blue-600/60',
        outline: 'from-blue-100 via-blue-50 to-indigo-100 dark:from-blue-800/70 dark:via-blue-700/60 dark:to-indigo-800/70 border border-blue-400 dark:border-blue-500/80',
        solid: 'from-blue-700 via-blue-600 to-indigo-700 border border-blue-700'
    },
    'telegram-blue': {
        default: 'from-sky-100 via-blue-50 to-cyan-100 dark:from-sky-800/60 dark:via-blue-700/50 dark:to-cyan-800/60 border border-sky-200 dark:border-sky-600/50',
        outline: 'from-sky-100 via-blue-50 to-cyan-100 dark:from-sky-800/60 dark:via-blue-700/50 dark:to-cyan-800/60 border border-sky-300 dark:border-sky-500/70',
        solid: 'from-sky-500 via-blue-500 to-cyan-500 border border-sky-500'
    },

    // Custom
    'landing-page-background': {
        default: 'from-blue-100/80 to-violet-100/80 dark:from-[#101828] dark:to-[#181928]'
    }
};

// Get the list of available gradient colors
export const getAvailableColors = () => {
    return gradientColorsList;
};

// Get the background gradient for a given color
export const getBackgroundGradient = color => {
    return backgroundGradient[color] || backgroundGradient['cosmic-purple'];
};

// Get the text color for a given color
export const getTextColor = color => {
    return textColors[color] || textColors['cosmic-purple'];
};

// Get the soft gradient for a given color
export const getSoftGradient = (color, variant = 'default') => {
    const gradient = softGradients[color] || softGradients['cosmic-purple'];
    return gradient[variant] || gradient.default;
};