export async function http<T>(request: RequestInfo, method: string = 'GET', body: any = null, headers: HeadersInit = {}): Promise<T> {
    try {
        const response = await fetch(request, {
            method, body, headers,
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(...data.messages || 'error');//data message
        }
        return data;
    } catch (e) {
        throw e;
    }

}

