// Schema for Categories
module.exports = {
  name: {
    singular: 'Category',
    plural: 'Categories'
  },
  slug: {
    singular: 'category',
    plural: 'categories'
  },
  contentfulId: 'category',
  contentfulFilenameField: 'fields.slug',
  collection: {
    sort: 'title',
    reverse: false
  },
  createPage: false,
  template: 'collection.pug'
}
