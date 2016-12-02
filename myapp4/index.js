var mongodb = require('mongodb');


mongodb.MongoClient
  .connect('mongodb://127.0.0.1:27017/example', function(err, db) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    var movie1 = {
      title: "Back to the Future",
      year: 1985,
      director: "R. Zemekis",
      rating: "PG",
    };
    var movie2 = {
      title: "Back to the Future II",
      year: 1989,
      director: "R. Zemeckis",
      rating: "PG",
    };
    var movie3 = {
      title: "Back to the Future III",
      year: 1990,
      director: "R. Zemeckis",
      rating: "PG",
    };

    db.collection('movies')
      .insert([movie1, movie2, movie3], function(err) {
        if (err) {
          console.log(err);
          process.exit(2);
        }

        db.collection('movies')
          .find({
            year: {
              "$gte": 1989
            }
          })
          .toArray(function(err, movies) {
            console.log("some movies");
            movies.forEach(function(movie) {
              console.log(movie);
            });

            db.collection('movies')
              .find()
              .toArray(function(err, movies) {
                console.log("all movies");
                movies.forEach(function(movie) {
                  console.log(movie);
                });
                process.exit(0);
              });
          });

      });

  });
