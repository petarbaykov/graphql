import { PaginationInput } from '../schema/pagination.schema'

type paginationOptions = {
  model: any,
  populate?: string,
  filter?: any,
}

export class PaginationService<T> {
  //TODO define proper model type
  private paginationOptions: paginationOptions
  constructor(paginationOptions: paginationOptions) {
    this.paginationOptions = paginationOptions
  }

  async getPaginatedItems({ page, limit }: PaginationInput) {
    const skip = (page - 1) * limit

    const { model, filter = {}, populate = '' } = this.paginationOptions

    const [items, totalItems] = await Promise.all([
      model.find(filter).skip(skip).limit(limit).populate(populate).lean(),
      model.countDocuments(),
    ])
    const totalPages = Math.ceil(totalItems / limit)

    return {
      page,
      totalPages,
      totalItems,
      items,
    }
  }
}