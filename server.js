var path = require('path')
var express = require('express')

if (process.env.NODE_ENV === 'production') {
   module.exports = {
      app: function () {
         const app = express();
         const indexPath = path.join(__dirname, '/../index.html');
         const publicPath = express.static(path.join(__dirname, '../public'));

         app.use('/public', publicPath);
         app.get('/', function (_, res) { res.sendFile(indexPath) });

         return app;
      }
   };
} else {
   var webpack = require('webpack');
   var WebpackDevServer = require('webpack-dev-server');
   var config = require('./webpack.config');

   new WebpackDevServer(webpack(config), {
      publicPath: config.output.publicPath,
      hot: true,
      historyApiFallback: true
   }).listen(8080, 'localhost', function (err, result) {
      if (err) {
         return console.log(err);
      }

      console.log('Listening at http://localhost:8080/');
   });
}
