// Round the percentage to two decimal places
export const roundPercentage = value => {
    if (!value || isNaN(value)) return 0;
    return Math.round(value * 100) / 100;
};