export const toTitleCase = (str) => {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Formats the experience range.
 *
 * @param {number} minExp - The minimum experience.
 * @param {number} maxExp - The maximum experience.
 * @returns {string} The formatted experience range.
 */
export const formatExperience = (minExp, maxExp) => {
    if (minExp === maxExp && !!minExp) {
        return `${minExp} year`;
    } else if (minExp && maxExp) {
        return `${minExp} - ${maxExp} years`;
    } else {
        return 'Not Specified';
    }
}