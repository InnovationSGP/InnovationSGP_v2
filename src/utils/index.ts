export const getMediaURL = (obj:any) => {
    const url = obj?._embedded?.['wp:featuredmedia']?.[0]?.source_url
    return url
}