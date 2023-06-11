//My home page
module.exports.home = (req, res) => {

    if (req.isAuthenticated()) {
        return res.render('home', { title: "Home" })
    }

    return res.redirect('/users/sign-in');

}