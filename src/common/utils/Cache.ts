import type { CacheObject } from "@/types/types"
import { checkExpiry, getExpiryByPeriod } from "v-dashkit/utils/date"

export const readCache = (cacheName: string): any => {
    const cachedOptions = localStorage.getItem(cacheName)
    if (cachedOptions) {
        const cacheObj: CacheObject = JSON.parse(cachedOptions)
        const expired = checkExpiry(cacheObj.expiry)
        const result = { data: cacheObj.data, expired }

        return result.data
    }
    return null
}
export const writeCache = (data: any, cacheName: string, periodInHours: number = 1000) => {
    const expiry = getExpiryByPeriod(periodInHours).toISOString()
    const cacheObj: CacheObject = {
        data,
        expiry
    }
    localStorage.setItem(cacheName!, JSON.stringify(cacheObj))
}