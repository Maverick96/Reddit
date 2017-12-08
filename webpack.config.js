module.exports = {
    entry : __dirname + '/js/index.js',
    output : {
        path : __dirname,
        filename : 'bundle.js'
    },
   module : {
       rules : [
           {
               test : /\.js$/,
               use : 'babel-loader',
               exclude : [
                   /node_modules/
               ]
           }
       ]
   },
   watch : true
}