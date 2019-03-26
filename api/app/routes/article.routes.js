
module.exports = ( app ) => {

  const articles = require( '../controllers/article.controller.js' );

  app.post( '/api/articles', articles.create );

  app.get( '/api/articles', articles.getAll );

  app.get( '/api/articles/:articleId', articles.getOne );

  app.put( '/api/articles/:articleId', articles.update );

  app.delete( '/api/articles/:articleId', articles.delete );

  app.get( '/api/user/:authorId/articles', articles.getByAuthor );

  // ARTICLE CREATION

  app.get( '/api/myarticles', articles.getOwn );

  app.post( '/api/articles/:articleId/components', articles.createComponent );

  app.delete( '/api/articles/:articleId/components/:componentId', articles.deleteComponent );

  app.put( '/api/articles/:articleId/publish', articles.publish );

}
