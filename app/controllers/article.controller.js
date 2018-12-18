const Article = require( '../models/article.model.js' );


// CREATE ARTICLE

exports.create = ( req, res ) => {

  if ( ! req.body.title ) {

    return res.status( 400 ).send( {

      message: "Title can not be empty."

    });

  }

  const article = new Article( {

    title: req.body.title

  });

  article.save()
  .then( ( data ) => {

    res.send( data );

  }).catch( ( err ) => {

    res.status( 500 ).send( {

      message: err.message || "Error while creating the article."

    });

  });

};

// GET ALL ARTICLES

exports.getAll = ( req, res ) => {

  Article.find()
  .then( ( articles ) => {

    res.send( articles );

  }).catch( ( err ) => {

    res.status( 500 ).send( {

      message: err.message || "Error while retrieving articles."

    });

  });

};

// GET ARTICLE BY ID

exports.getOne = ( req, res ) => {

  Article.findById( req.params.articleId )
  .then( ( article ) => {

    if ( ! article ) {

      return res.status( 404 ).send( {

        message: "Article with id " + req.params.articleId + " not found."

      });

    }

    res.send( article );

  }).catch( ( err ) => {

    if ( err.kind === 'ObjectId' ) {

      return res.status( 404 ).send( {

        message: "Article with id " + req.params.articleId + " not found."

      });

    }

    return res.status( 500 ).send( {

      message: "Error retrieving article with id " + req.params.articleId + "."

    });

  });

};

// UPDATE ARTICLE

exports.update = ( req, res ) => {

  if ( ! req.body.title ) {

    return res.status( 400 ).send( {

      message: "Title can not be empty."

    });

  }

  Article.findByIdAndUpdate( req.params.articleId, {

    title: req.body.title

  }, { new: true } )
  .then( ( article ) => {

    if ( ! article ) {

      return res.status( 404 ).send( {

        message: "Article with id " + req.params.articleId + " not found."

      });

    }

    res.send( article );

  }).catch( ( err ) => {

    if ( err.kind === 'ObjectId' ) {

      return res.status( 404 ).send( {

        message: "Article with id " + req.params.articleId + " not found."

      });

    }

    return res.status( 500 ).send( {

      message: "Error updating article with id " + req.params.articleId + "."

    });

  });

};

// DELETE ARTICLE

exports.delete = ( req, res ) => {

  Article.findByIdAndRemove( req.params.articleId )
  .then( ( article ) => {

    if ( ! article ) {

      return res.status( 404 ).send( {

        message: "Article with id " + req.params.articleId + " not found."

      });

    }

    res.send( { message: "Article deleted." } );

  }).catch( ( err ) => {

    if ( err.kind === 'ObjectId' || err.name === 'NotFound' ) {

      return res.status( 404 ).send( {

        message: "Article with id " + req.params.articleId + " not found."

      });

    }

    return res.status( 500 ).send( {

      message: "Could not delete article with id " + req.params.articleId + "."

    });

  });

};
