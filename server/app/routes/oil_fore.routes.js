module.exports = app => {
    const frd = require("../controllers/oil_fore.controller.js");
  
    var router = require("express").Router();
  
    // Create a new KPI
    router.post("/", frd.create);
  
    // Retrieve all KPIs
    router.get("/", frd.findAll);
  
    // Retrieve all published KPIs
    router.get("/published", frd.findAllPublished);
  
    // Retrieve a single KPI with id
    router.get("/:id", frd.findOne);
  
    // Update a KPI with id
    router.put("/:id", frd.update);
  
    // Delete a KPI with id
    router.delete("/:id", frd.delete);
  
    // Create a new KPI
    router.delete("/", frd.deleteAll);
  
    app.use('/api/frd', router);
  };