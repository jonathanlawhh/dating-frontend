export const getSuggestions = function (profileData) {
    const runtime = useRuntimeConfig()
    return fetch(runtime.public.endpointUrl, {
        body: JSON.stringify(profileData),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}