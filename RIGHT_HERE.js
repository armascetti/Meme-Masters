function show(req, res) {
  Taco.findById(req.params.id)
  .populate("owner")
  .then(taco => {
    res.render("tacos/show", {
      taco,
      title: "🌮 show"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}



function index(req, res) {
  // Find all tacos
  Taco.find({})
  // When we have all the tacos
  .then(tacos => {
    // Do something with the tacos
    res.render("tacos/index", {
      title: "🌮",
      tacos,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/tacos")
  })
}

