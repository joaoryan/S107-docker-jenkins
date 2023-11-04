export type HttpResponse <B = any> = {
    statusCode: number,
    body: B,
    download?: string
    file?: {
        filePath: string;
        folderPath: string
    }
}

type Content = {
    body?: any
    query?: any
    headers?: any
    params?: any
}
export type HttpRequest <T = Content> = T
