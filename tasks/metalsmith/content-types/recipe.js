// Schema for Recipes
module.exports = {
  name: {
    singular: 'Recipe',
    plural: 'Recipes'
  },
  slug: {
    singular: 'recipe',
    plural: 'recipes'
  },
  contentfulId: 'recipe',
  contentfulFilenameField: 'fields.slug',
  collection: {
    sort: 'date',
    reverse: true
  },
  createPage: true,
  pagination: {
    perPage: 10
  }
}
