module.exports = app => {
    const prd = require("../controllers/oil_prd.controller.js");
  
    var router = require("express").Router();
  
    // Create a new KPI
    router.post("/", prd.create);
  
    // Retrieve all KPIs
    router.get("/", prd.findAll);
  
    // Retrieve all published KPIs
    router.get("/published", prd.findAllPublished);
  
    // Retrieve a single KPI with id
    router.get("/:id", prd.findOne);
  
    // Update a KPI with id
    router.put("/:id", prd.update);
  
    // Delete a KPI with id
    router.delete("/:id", prd.delete);
  
    // Create a new KPI
    router.delete("/", prd.deleteAll);
  
    app.use('/api/prd', router);
  };