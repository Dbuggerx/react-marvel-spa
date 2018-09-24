// @flow

type ResourceItem = {
    resourceURI: string,
    name: string
}

type ResourceItemsWithType = ResourceItem & {
    type: string,
}

type Resources<T> = {
    available: number,
    returned: number,
    collectionURI: string,
    items: T[],
}

export type Hero = {
    id: number,
    name: string,
    description: string,
    modified: string,
    resourceURI: string,
    urls: {
        type: string,
        url: string,
    }[],
    thumbnail: {
        path: string,
        extension: string,
    },
    comics: Resources<ResourceItem>,
    stories: Resources<ResourceItemsWithType>,
    events: Resources<ResourceItem>,
    series: Resources<ResourceItem>,
};

export type HeroesResult = {
    code: number,
    status: string,
    copyright: string,
    attributionText: string,
    attributionHTML: string,
    data: {
        offset: number,
        limit: number,
        total: number,
        count: number,
        results: Hero[],
    },
    etag: string,
};
