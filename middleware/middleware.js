
function passUserToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  next()
}

function isLoggedIn(req, res, next) {
  console.log("LOGGGGEEDDD INNNN")
console.log(req)
  if (req.isAuthenticated()) return next()
  res.redirect('/auth/google')
}


export {
  passUserToView, 
  isLoggedIn,
}