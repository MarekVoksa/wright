const tokens = [];

exports.add = ( token, payload ) => {

  tokens[token] = payload;

}

exports.isValid = ( token ) => {

  if ( ! tokens[token] ) {

    return false;

  }

  if ( tokens[token].exp <= new Date() ) {

    const index = tokens.indexOf( token );

    tokens.splice( index, 1 );

    return false;

  } else {

    return true;

  }

}
