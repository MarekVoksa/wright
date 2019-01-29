module.exports = ( app ) => {

  const articles = require( '../controllers/article.controller.js' );

  app.post( '/api/articles', articles.create );

  app.get( '/api/articles', articles.getAll );

  app.get( '/api/articles/:articleId', articles.getOne );

  app.put( '/api/articles/:articleId', articles.update );

  app.delete( '/api/articles/:articleId', articles.delete );

}
