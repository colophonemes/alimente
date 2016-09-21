const minimatch = require('minimatch')
const debug = require('debug')('post-category-collections')  // DEBUG=post-category-collections
const paths = require('../../helpers/file-paths') // helper to get build system paths
const camelCase = require('camel-case')

/**
 * Post Category Collections (Metalsmith plugin)
 *
 * Creates collections from Post Categories
 *
 * @param {Object}   opts - plugin options
 * @param {Function} collectionsPlugin - a reference to the metalsmith-collections plugin
 * @param {Function} paginationPlugin - a reference to the metalsmith-pagination plugin
 *
 */
function postCategoryCollectionsPlugin (options) {
  const filter = minimatch.filter('posts/**/*.html')
  // main plugin returned to Metalsmith
  return function postCategoryCollections (files, metalsmith, done) {
    const collections = options.collections
    const pagination = options.pagination
    // add post categories as separate collections
    Object.keys(files).filter(filter).forEach((file) => {
      const category = files[file].category.fields
      collections[camelCase(category.slug)] = {
        pattern: `posts/${category.slug}/**`,
        sortBy: 'date',
        reverse: true
      }
      pagination[`collections.${camelCase(category.slug)}`] = {
        perPage: 10,
        layout: 'collection.pug',
        first: `${category.slug}/index.html`,
        path: `${category.slug}/:num/index.html`,
        pageMetadata: {
          title: category.title,
          slug: category.slug,
          contentType: 'post',
          collectionSlug: 'collection'
        }
      }
    })
    // first call the collections plugin
    options.collectionsPlugin(collections)(files, metalsmith, () => {
      // then call the pagination plugin
      options.paginationPlugin(pagination)(files, metalsmith, done)
    })
    // tell Metalsmith that we're done
    done()
  }
}

module.exports = postCategoryCollectionsPlugin
// require this plugin in ./tasks/metalsmith using:
// const postCategoryCollections = require(paths.lib('metalsmith/plugins/post-category-collections.js'))
