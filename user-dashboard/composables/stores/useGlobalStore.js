export const useGlobalStore = () => useState('global', () => ({
    busy: false,

    // Events
    events: {
        results: [],
        pagination: {
            total: 0,
            currentPage: 1,
            totalPages: 1,
            limit: 10,
            hasMore: false
        }
    },

    // Streams
    streams: {
        results: [],
        pagination: {
            total: 0,
            currentPage: 1,
            totalPages: 1,
            limit: 10,
            hasMore: false
        }
    }
}));