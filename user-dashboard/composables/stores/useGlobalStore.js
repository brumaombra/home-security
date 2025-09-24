export const useGlobalStore = () => useState('global', () => ({
    busy: false,

    // Events
    events: {
        results: [],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            total: 0,
            limit: 10
        }
    },

    // Streams
    streams: {
        results: [],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            total: 0,
            limit: 10
        }
    }
}));