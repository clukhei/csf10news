export interface Countries{
    name: string;
    flag: string;
    code: string;
}

export interface Articles{
    id: string
    country?: string;
    sourceName: string;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    expiry: number
    saved: string;

}