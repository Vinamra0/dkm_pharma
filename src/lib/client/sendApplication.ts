export async function sendApplication(formData: FormData) {
    // Post to the app's local API route so application metadata stays with the app.
    const res = await fetch(`/api/applications`, {
        method: 'POST',
        body: formData,
    })

    const json = await res.json().catch(() => ({ success: false, message: 'Invalid JSON response' }))
    return { status: res.status, ok: res.ok, body: json }
}

export type SendApplicationResult = Awaited<ReturnType<typeof sendApplication>>
