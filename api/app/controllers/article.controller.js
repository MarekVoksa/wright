const Article = require( '../models/article.model.js' );

const ObjectId = require( 'mongodb' ).ObjectId

const secret = require('../config/config.js').jwtSecret;
const jwt = require( 'jwt-simple' );

// CREATE ARTICLE

exports.create = ( req, res ) => {

  let cookie = req.cookies.wrightToken;

  if ( ! req.body.title ) {

    return res.status( 400 )
      .send( {

        message: "Title can not be empty."

      });

  }

  if ( ! cookie ) {

    return res.status( 401 )
      .send( {

        message: "You have to log in to post articles."

      });

  }

  const payload = jwt.decode( cookie, secret );

  const subtitle = req.body.subtitle || '';

  const article = new Article( {

    title: req.body.title,
    subtitle: subtitle,
    published: false,
    author: payload.id

  });

  //Article.deleteMany( {}, () => {});

  article.save()
    .then( ( data ) => {

      return res.status( 200 )
        .send( data );

    })
    .catch( ( err ) => {

      return res.status( 500 )
        .send( {

          message: err.message || "Error while creating the article."

        });

    });

};

// GET ALL ARTICLES

exports.getAll = ( req, res ) => {

  Article.find()
    .populate( 'author', 'name imageURL' )
    .where( 'published' ).equals( true )
    .then( ( articles ) => {

      return res.status( 200 )
        .send( articles );

    })
    .catch( ( err ) => {

      return res.status( 500 )
        .send( {

          message: err.message || "Error while retrieving articles."

        });

    });

};

// GET ARTICLE BY ID

exports.getOne = ( req, res ) => {

  Article.findById( req.params.articleId )
    .populate( 'author', 'name imageURL' )
    .then( ( article ) => {

      if ( ! article ) {

        return res.status( 404 )
          .send( {

            message: "Article with id " + req.params.articleId + " not found."

          });

      }

      return res.status( 200 )
        .send( article );

    })
    .catch( ( err ) => {

      if ( err.kind === 'ObjectId' ) {

        return res.status( 404 )
          .send( {

            message: "Article with id " + req.params.articleId + " not found."

          });

      }

      return res.status( 500 )
        .send( {

          message: "Error retrieving article with id " + req.params.articleId + "."

        });

    });

};

// UPDATE ARTICLE

exports.update = ( req, res ) => {

  if ( ! req.body.title ) {

    return res.status( 400 )
      .send( {

        message: "Title can not be empty."

      });

  }

  Article.findByIdAndUpdate( req.params.articleId, {

    title: req.body.title,
    subtitle: req.body.subtitle,
    components: req.body.components

  }, { new: true } )
    .populate( 'author', 'name imageURL' )
    .then( ( article ) => {

      if ( ! article ) {

        return res.status( 404 )
          .send( {

            message: "Article with id " + req.params.articleId + " not found."

          });

      }

      console.log( article );

      return res.status( 200 )
        .send( article );

    })
    .catch( ( err ) => {

      if ( err.kind === 'ObjectId' ) {

        return res.status( 404 )
          .send( {

            message: "Article with id " + req.params.articleId + " not found."

          });

      }

      return res.status( 500 )
        .send( {

          message: "Error updating article with id " + req.params.articleId + "."

        });

    });

};

// DELETE ARTICLE

exports.delete = ( req, res ) => {

  Article.findByIdAndRemove( req.params.articleId )
    .then( ( article ) => {

      if ( ! article ) {

        return res.status( 404 )
          .send( {

            message: "Article with id " + req.params.articleId + " not found."

          });

      }

      return res.status( 200 )
        .send( { message: "Article deleted." } );

    })
    .catch( ( err ) => {

      if ( err.kind === 'ObjectId' || err.name === 'NotFound' ) {

        return res.status( 404 )
          .send( {

            message: "Article with id " + req.params.articleId + " not found."

          });

      }

      return res.status( 500 )
        .send( {

          message: "Could not delete article with id " + req.params.articleId + "."

        });

    });

};


// ARTICLE CREATION

// CREATE COMPONENT

exports.createComponent = ( req, res ) => {

  let cookie = req.cookies.wrightToken;

  if ( ! req.body.type ) {

    return res.status( 400 )
      .send( {

        message: "Type or content can not be empty."

      });

  }

  if ( ! cookie ) {

    return res.status( 401 )
      .send( {

        message: "You have to log in to post articles."

      });

  }

  const payload = jwt.decode( cookie, secret );

  const component = {

    type: req.body.type,
    content: req.body.content

  };

  Article.findOneAndUpdate( { _id: req.params.articleId }, { $push: { components: component } }, { new: true } )
    .populate( 'author', 'name imageURL' )
    .then( ( article ) => {

      console.log( article );

      if ( ! article ) {

        return res.status( 404 )
          .send( {

            message: "Article with id " + req.params.articleId + " not found."

          });

      }

      return res.status( 200 )
        .send( article );

    })
    .catch( ( err ) => {

      if ( err.kind === 'ObjectId' ) {

        return res.status( 404 )
          .send( {

            message: "Article or component not found."

          });

      }

      return res.status( 500 )
        .send( {

          message: "Error updating article with id " + req.params.articleId + "."

        });

    });

};

// DELETE COMPONENT

exports.deleteComponent = ( req, res ) => {

  let cookie = req.cookies.wrightToken;

  if ( ! cookie ) {

    return res.status( 401 )
      .send( {

        message: "You have to log in to post articles."

      });

  }

  Article.findByIdAndUpdate( req.params.articleId, { $pull: { components: { _id: req.params.componentId } } }, { new: true } )
    .populate( 'author', 'name imageURL' )
    .then( ( article ) => {

      if ( ! article ) {

        return res.status( 404 )
          .send( {

            message: "Article with id " + req.params.articleId + " not found."

          });

      }

      return res.status( 200 )
        .send( article );

    })
    .catch( ( err ) => {

      if ( err.kind === 'ObjectId' ) {

        return res.status( 404 )
          .send( {

            message: "Article or component not found."

          });

      }

      return res.status( 500 )
        .send( {

          message: "Error updating article with id " + req.params.articleId + "."

        });

    });

};

// PUBLISH

exports.publish = ( req, res ) => {

  Article.findByIdAndUpdate( req.params.articleId, {

    published: true

  }, { new: true } )
    .populate( 'author', 'name imageURL' )
    .then( ( article ) => {

      if ( ! article ) {

        return res.status( 404 )
          .send( {

            message: "Article with id " + req.params.articleId + " not found."

          });

      }

      return res.status( 200 )
        .send( article );

    })
    .catch( ( err ) => {

      if ( err.kind === 'ObjectId' ) {

        return res.status( 404 )
          .send( {

            message: "Article with id " + req.params.articleId + " not found."

          });

      }

      return res.status( 500 )
        .send( {

          message: "Error publishing article with id " + req.params.articleId + "."

        });

    });

};

// GET BY USER

exports.getByAuthor = ( req, res ) => {

  Article.find( { author: { _id: req.params.authorId } } )
    .populate( 'author', 'name imageURL' )
    .then( ( article ) => {

      if ( ! article ) {

        return res.status( 404 )
          .send( {

            message: "Article with id " + req.params.articleId + " not found."

          });

      }

      return res.status( 200 )
        .send( article );

    })
    .catch( ( err ) => {

      if ( err.kind === 'ObjectId' ) {

        return res.status( 404 )
          .send( {

            message: "Article with id " + req.params.articleId + " not found."

          });

      }

      return res.status( 500 )
        .send( {

          message: "Error retrieving article with id " + req.params.articleId + "."

        });

    });

};

// GET BY USER

exports.getOwn = ( req, res ) => {

  const cookie = req.cookies.wrightToken;

  const payload = jwt.decode( cookie, secret );

  Article.find( { author: { _id: payload.id } } )
    .populate( 'author', 'name imageURL' )
    .then( ( article ) => {

      if ( ! article ) {

        return res.status( 404 )
          .send( {

            message: "Article with id " + req.params.articleId + " not found."

          });

      }

      return res.status( 200 )
        .send( article );

    })
    .catch( ( err ) => {

      if ( err.kind === 'ObjectId' ) {

        return res.status( 404 )
          .send( {

            message: "Article with id " + req.params.articleId + " not found."

          });

      }

      return res.status( 500 )
        .send( {

          message: "Error retrieving article with id " + req.params.articleId + "."

        });

    });

};
