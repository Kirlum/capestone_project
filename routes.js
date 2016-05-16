Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('home');
});


// Router.route('/input', function () {
//   if (Session.get("recentPat")) {
//       this.render('input_scan');
//     } else {
//       this.render('input_pat')
//     }
// });

Router.route('/input_pat', function() {
  this.render('input_pat');
});

Router.route('/input_scan', function() {
  this.render('input_scan');
});

Router.route('/guide', function () {
  this.render('guide');
});
