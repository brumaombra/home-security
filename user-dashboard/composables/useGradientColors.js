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
    'purple-pink': 'from-purple-500 to-pink-600',
    'indigo-purple': 'from-indigo-500 to-purple-600',
    'blue-purple': 'from-blue-500 to-purple-600',
    'violet-fuchsia': 'from-violet-500 to-fuchsia-600',
    'cosmic-purple': 'from-purple-600 via-blue-600 to-indigo-800',
    'royal-sunset': 'from-purple-400 via-pink-500 to-red-500',
    'mystic-ocean': 'from-blue-600 via-purple-600 to-indigo-800',
    'aurora-purple': 'from-purple-500 via-violet-500 to-purple-700',
    'galaxy-burst': 'from-indigo-500 via-purple-500 to-pink-500',
    'lavender-dream': 'from-purple-300 via-purple-400 to-indigo-500',
    'midnight-purple': 'from-slate-900 via-purple-900 to-slate-900',
    'neon-glow': 'from-purple-400 via-fuchsia-400 to-cyan-400',
    'royal-amethyst': 'from-purple-700 via-purple-500 to-indigo-600',
    'purple-storm': 'from-indigo-600 via-purple-600 to-violet-600',

    // Basic colors
    'purple': 'from-purple-500 to-indigo-600',
    'blue': 'from-blue-500 to-cyan-600',
    'gray': 'from-gray-400 via-gray-500 to-gray-600',
    'danger': 'from-red-500 via-orange-500 to-pink-600',
    'green': 'from-green-500 to-teal-600',
    'yellow': 'from-yellow-500 to-orange-600',
    'orange': 'from-orange-500 to-red-600',
    'red': 'from-red-500 to-pink-600',

    // Social platform colors
    'facebook-blue': 'from-blue-600 via-blue-500 to-indigo-600',
    'twitter-dark': 'from-slate-900 via-gray-800 to-black',
    'whatsapp-green': 'from-green-500 via-emerald-500 to-teal-600',
    'linkedin-blue': 'from-blue-700 via-blue-600 to-indigo-700',
    'telegram-blue': 'from-sky-500 via-blue-500 to-cyan-500'
};

// Text color definitions
const textColors = {
    // Custom colors
    'purple-pink': 'text-purple-700',
    'indigo-purple': 'text-indigo-700',
    'blue-purple': 'text-blue-700',
    'violet-fuchsia': 'text-violet-700',
    'cosmic-purple': 'text-purple-700',
    'royal-sunset': 'text-purple-700',
    'mystic-ocean': 'text-blue-700',
    'aurora-purple': 'text-purple-700',
    'galaxy-burst': 'text-indigo-700',
    'lavender-dream': 'text-purple-600',
    'midnight-purple': 'text-slate-700',
    'neon-glow': 'text-purple-700',
    'royal-amethyst': 'text-purple-800',
    'purple-storm': 'text-indigo-700',

    // Basic colors
    'purple': 'text-purple-700',
    'blue': 'text-blue-700',
    'gray': 'text-gray-700',
    'danger': 'text-red-700',
    'green': 'text-green-700',
    'yellow': 'text-yellow-700',
    'orange': 'text-orange-700',
    'red': 'text-red-700',

    // Social platform colors
    'facebook-blue': 'text-blue-700',
    'twitter-dark': 'text-slate-700',
    'whatsapp-green': 'text-green-700',
    'linkedin-blue': 'text-blue-800',
    'telegram-blue': 'text-sky-700'
};

// Soft background gradients (subtle, for backgrounds)
const softGradients = {
    // Custom colors
    'purple-pink': {
        default: 'from-purple-100 to-pink-100 border border-purple-200',
        outline: 'from-purple-100 to-pink-100 border border-purple-300',
        solid: 'from-purple-500 to-pink-600 border border-purple-500'
    },
    'indigo-purple': {
        default: 'from-indigo-100 to-purple-100 border border-indigo-200',
        outline: 'from-indigo-100 to-purple-100 border border-indigo-300',
        solid: 'from-indigo-500 to-purple-600 border border-indigo-500'
    },
    'blue-purple': {
        default: 'from-blue-100 to-purple-100 border border-blue-200',
        outline: 'from-blue-100 to-purple-100 border border-blue-300',
        solid: 'from-blue-500 to-purple-600 border border-blue-500'
    },
    'violet-fuchsia': {
        default: 'from-violet-100 to-fuchsia-100 border border-violet-200',
        outline: 'from-violet-100 to-fuchsia-100 border border-violet-300',
        solid: 'from-violet-500 to-fuchsia-600 border border-violet-500'
    },
    'cosmic-purple': {
        default: 'from-purple-100 via-blue-50 to-indigo-100 border border-indigo-200',
        outline: 'from-purple-100 via-blue-50 to-indigo-100 border border-indigo-300',
        solid: 'from-purple-600 via-blue-600 to-indigo-800 border border-indigo-500'
    },
    'royal-sunset': {
        default: 'from-purple-100 via-pink-50 to-red-100 border border-purple-200',
        outline: 'from-purple-100 via-pink-50 to-red-100 border border-purple-300',
        solid: 'from-purple-400 via-pink-500 to-red-500 border border-purple-500'
    },
    'mystic-ocean': {
        default: 'from-blue-100 via-purple-50 to-indigo-100 border border-blue-200',
        outline: 'from-blue-100 via-purple-50 to-indigo-100 border border-blue-300',
        solid: 'from-blue-600 via-purple-600 to-indigo-800 border border-blue-500'
    },
    'aurora-purple': {
        default: 'from-purple-100 via-violet-50 to-purple-100 border border-purple-200',
        outline: 'from-purple-100 via-violet-50 to-purple-100 border border-purple-300',
        solid: 'from-purple-500 via-violet-500 to-purple-700 border border-purple-500'
    },
    'galaxy-burst': {
        default: 'from-indigo-100 via-purple-50 to-pink-100 border border-indigo-200',
        outline: 'from-indigo-100 via-purple-50 to-pink-100 border border-indigo-300',
        solid: 'from-indigo-500 via-purple-500 to-pink-500 border border-indigo-500'
    },
    'lavender-dream': {
        default: 'from-purple-50 via-purple-25 to-indigo-50 border border-purple-100',
        outline: 'from-purple-50 via-purple-25 to-indigo-50 border border-purple-200',
        solid: 'from-purple-300 via-purple-400 to-indigo-500 border border-purple-300'
    },
    'midnight-purple': {
        default: 'from-slate-100 via-purple-50 to-slate-100 border border-slate-200',
        outline: 'from-slate-100 via-purple-50 to-slate-100 border border-slate-300',
        solid: 'from-slate-900 via-purple-900 to-slate-900 border border-slate-700'
    },
    'neon-glow': {
        default: 'from-purple-100 via-fuchsia-50 to-cyan-100 border border-purple-200',
        outline: 'from-purple-100 via-fuchsia-50 to-cyan-100 border border-purple-300',
        solid: 'from-purple-400 via-fuchsia-400 to-cyan-400 border border-purple-500'
    },
    'royal-amethyst': {
        default: 'from-purple-100 via-purple-50 to-indigo-100 border border-purple-200',
        outline: 'from-purple-100 via-purple-50 to-indigo-100 border border-purple-300',
        solid: 'from-purple-700 via-purple-500 to-indigo-600 border border-purple-700'
    },
    'purple-storm': {
        default: 'from-indigo-100 via-purple-50 to-violet-100 border border-indigo-200',
        outline: 'from-indigo-100 via-purple-50 to-violet-100 border border-indigo-300',
        solid: 'from-indigo-600 via-purple-600 to-violet-600 border border-indigo-600'
    },

    // Basic colors
    'purple': {
        default: 'from-purple-100 via-indigo-50 to-indigo-100 border border-purple-200',
        outline: 'from-purple-100 via-indigo-50 to-indigo-100 border border-purple-300',
        solid: 'from-purple-500 to-indigo-600 border border-purple-500'
    },
    'blue': {
        default: 'from-blue-100 via-cyan-50 to-cyan-100 border border-blue-200',
        outline: 'from-blue-100 via-cyan-50 to-cyan-100 border border-blue-300',
        solid: 'from-blue-500 to-cyan-600 border border-blue-500'
    },
    'gray': {
        default: 'from-gray-100 via-gray-50 to-gray-100 border border-gray-200',
        outline: 'from-gray-100 via-gray-50 to-gray-100 border border-gray-300',
        solid: 'from-gray-400 via-gray-500 to-gray-600 border border-gray-600'
    },
    'danger': {
        default: 'from-red-100 via-orange-50 to-pink-100 border border-red-200',
        outline: 'from-red-100 via-orange-50 to-pink-100 border border-red-300',
        solid: 'from-red-500 via-orange-500 to-pink-600 border border-red-500'
    },
    'green': {
        default: 'from-green-100 via-teal-50 to-teal-100 border border-green-200',
        outline: 'from-green-100 via-teal-50 to-teal-100 border border-green-300',
        solid: 'from-green-500 to-teal-600 border border-green-500'
    },
    'yellow': {
        default: 'from-yellow-100 via-orange-50 to-orange-100 border border-yellow-200',
        outline: 'from-yellow-100 via-orange-50 to-orange-100 border border-yellow-300',
        solid: 'from-yellow-500 to-orange-600 border border-yellow-500'
    },
    'orange': {
        default: 'from-orange-100 via-amber-50 to-amber-100 border border-orange-200',
        outline: 'from-orange-100 via-amber-50 to-amber-100 border border-orange-300',
        solid: 'from-orange-500 to-amber-600 border border-orange-500'
    },
    'red': {
        default: 'from-red-100 via-pink-50 to-pink-100 border border-red-200',
        outline: 'from-red-100 via-pink-50 to-pink-100 border border-red-300',
        solid: 'from-red-500 to-pink-600 border border-red-500'
    },

    // Social platform colors
    'facebook-blue': {
        default: 'from-blue-100 via-blue-50 to-indigo-100 border border-blue-200',
        outline: 'from-blue-100 via-blue-50 to-indigo-100 border border-blue-300',
        solid: 'from-blue-600 via-blue-500 to-indigo-600 border border-blue-600'
    },
    'twitter-dark': {
        default: 'from-slate-100 via-gray-50 to-gray-100 border border-slate-200',
        outline: 'from-slate-100 via-gray-50 to-gray-100 border border-slate-300',
        solid: 'from-slate-900 via-gray-800 to-black border border-slate-900'
    },
    'whatsapp-green': {
        default: 'from-green-100 via-emerald-50 to-teal-100 border border-green-200',
        outline: 'from-green-100 via-emerald-50 to-teal-100 border border-green-300',
        solid: 'from-green-500 via-emerald-500 to-teal-600 border border-green-500'
    },
    'linkedin-blue': {
        default: 'from-blue-100 via-blue-50 to-indigo-100 border border-blue-300',
        outline: 'from-blue-100 via-blue-50 to-indigo-100 border border-blue-400',
        solid: 'from-blue-700 via-blue-600 to-indigo-700 border border-blue-700'
    },
    'telegram-blue': {
        default: 'from-sky-100 via-blue-50 to-cyan-100 border border-sky-200',
        outline: 'from-sky-100 via-blue-50 to-cyan-100 border border-sky-300',
        solid: 'from-sky-500 via-blue-500 to-cyan-500 border border-sky-500'
    },

    // Custom
    'landing-page-background': {
        default: 'from-blue-100/80 to-violet-100/80'
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