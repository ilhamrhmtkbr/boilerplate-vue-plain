/**
 * formatText.js
 * Utilitas untuk merapikan teks dari format snake_case atau kebab-case
 * Contoh: "total_penjualan_harian" -> "Total Penjualan Harian"
 */

export const removeUnderscoreAndCapitalize = (str) => {
    if (!str || typeof str !== 'string') return ''

    return str
        // Ganti underscore (_) atau hyphen (-) dengan spasi
        .replace(/[_-]/g, ' ')
        // Pecah jadi array kata
        .split(' ')
        // Map tiap kata: ambil huruf pertama (UPPER) + sisa hurufnya (lower)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        // Gabungin lagi pakai spasi
        .join(' ')
}

/**
 * Versi alternatif kalau cuma mau huruf depan doang yang gede
 * Contoh: "status_pembayaran" -> "Status pembayaran"
 */
export const capitalizeFirstOnly = (str) => {
    if (!str) return ''
    const cleanStr = str.replace(/[_-]/g, ' ')
    return cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1).toLowerCase()
}
