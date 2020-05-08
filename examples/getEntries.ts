/*
* Example to get content list by contentful model.
* 컨텐트풀 모델 별 컨텐츠 목록을 가져오는 예시 코드.
*/

import { createClient, Entry, EntryCollection } from 'contentful'
import { Article, Cat, Sale } from 'model/proto'

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID as string,
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID as string,
  host: process.env.REACT_APP_CONTENTFUL_HOST as string,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN as string,
})

function getContents<T>(contentType: string, queries?: unknown): Promise<T[]> {
  return client
    .getEntries(Object.assign({ content_type: contentType }, queries))
    .then((response: EntryCollection<unknown>) => {
      return response.items.map((entry: Entry<unknown>) => {
        const result: T = entry.fields as T
        return result
      })
    })
}

export function requestArticles(): Promise<Article[]> {
  return getContents<Article>('article')
    .then((article: Article[]) => article)
}

export function requestCats(): Promise<Cat[]> {
  return getContents<Cat>('cat')
    .then((cat: Cat[]) => cat)
}

export function requestSales(): Promise<Sale[]> {
  return getContents<Sale>('sale')
    .then((sale: Sale[]) => sale)
}
