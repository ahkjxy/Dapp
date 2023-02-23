const DEPLOY_CONFIG_ENV = {
  "DEV": {
    API_BASE: 'https://xlytakeout.91zhiyou.com/',
    STATIC_CDN: '/starbucksgifts-dealer/',
  },
  "PROD": {
    API_BASE: 'https://xlytakeout.91zhiyou.com/',
    STATIC_CDN: '/starbucksgifts-dealer/',
  },
}

const DEV_ENV = process.env.DEV_MODE || 'PROD'
export const DEPLOY_CONFIG = DEPLOY_CONFIG_ENV[DEV_ENV]
export const API_BASE = DEPLOY_CONFIG_ENV[DEV_ENV]['API_BASE']
export const API_STAR = DEPLOY_CONFIG_ENV[DEV_ENV]['API_STAR']
export default {
  DEV_ENV,
  DEPLOY_CONFIG,
  API_BASE,
  API_STAR,
}