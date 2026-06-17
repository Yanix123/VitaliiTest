// IItem — a catalog movie with how many times it has been favorited
export interface IItem {
  id: string
  title: string
  description: string | null
  imageUrl: string | null
  favoriteCount: number
}

// IItemsRes — paginated list response
export interface IItemsRes {
  items: IItem[]
  total: number
}
