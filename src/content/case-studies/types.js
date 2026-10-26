/**
 * @typedef {'image' | 'video' | 'gif'} MediaType
 * @typedef {'full' | 'contained' | 'pair'} MediaLayout
 *
 * @typedef {Object} MediaBlock
 * @property {MediaType} type
 * @property {string} src
 * @property {string} [alt]
 * @property {string} [caption]
 * @property {MediaLayout} [layout]
 *
 * @typedef {Object} CaseStudySection
 * @property {string} id
 * @property {string} [kicker]
 * @property {string} title
 * @property {string} [body]
 * @property {MediaBlock | MediaBlock[]} media
 *
 * @typedef {Object} CaseStudyListing
 * @property {string} number
 * @property {string} headline
 * @property {string} description
 * @property {string} image
 * @property {string} [video]
 * @property {number} [videoClipEnd]
 * @property {string[]} tags
 * @property {Object} [award]
 * @property {boolean} [external]
 * @property {boolean} [confidential]
 * @property {boolean} [deviceMockup]
 * @property {boolean} [showcase]
 * @property {'cover' | 'contain'} [imageFit]
 * @property {string} [imagePosition]
 *
 * @typedef {Object} CaseStudy
 * @property {string} slug
 * @property {string} title
 * @property {string} client
 * @property {number} year
 * @property {CaseStudyListing} listing
 * @property {Object} hiring
 * @property {string[]} tags
 * @property {string} overview
 * @property {string} [website]
 * @property {MediaBlock} [heroMedia]
 * @property {CaseStudySection[]} sections
 * @property {string[]} [gallery]
 * @property {string[]} [videos]
 * @property {Object[]} [awards]
 * @property {Object} outcomes
 * @property {{ nextSlug: string }} navigation
 */

export {};
