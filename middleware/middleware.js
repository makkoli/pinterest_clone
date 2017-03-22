// Gets login session for proper rendering
exports.getLoginSession = function(req, res, next) {
    res.locals.logged = req.session.passport == undefined ? false : true,
    res.locals.user = req.session.passport == undefined ? "" : req.session.passport.user.username,
    res.locals.displayName = req.session.passport == undefined ? "" : req.session.passport.user.displayName,
    res.locals.avatar = req.session.passport == undefined ? "" : req.session.passport.user.avatar;

    next();
};
