export const useGlobalStore = () => useState('global', () => ({
    availableLocales: [
        { code: 'en', iso: 'en-US', name: 'English', flag: 'gb' },
        { code: 'it', iso: 'it-IT', name: 'Italiano', flag: 'it' },
        { code: 'es', iso: 'es-ES', name: 'Español', flag: 'es' },
        { code: 'de', iso: 'de-DE', name: 'Deutsch', flag: 'de' },
        { code: 'fr', iso: 'fr-FR', name: 'Français', flag: 'fr' },
        { code: 'pt', iso: 'pt-PT', name: 'Português', flag: 'pt' },
        { code: 'ja', iso: 'ja-JP', name: '日本語', flag: 'jp' }
    ]
}));