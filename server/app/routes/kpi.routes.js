module.exports = app => {
    const kpis = require("../controllers/kpi.controller.js");
  
    var router = require("express").Router();
  
    // Create a new KPI
    router.post("/", kpis.create);
  
    // Retrieve all KPIs
    router.get("/", kpis.findAll);
  
    // Retrieve all published KPIs
    router.get("/published", kpis.findAllPublished);
  
    // Retrieve a single KPI with id
    router.get("/:id", kpis.findOne);
  
    // Update a KPI with id
    router.put("/:id", kpis.update);
  
    // Delete a KPI with id
    router.delete("/:id", kpis.delete);
  
    // Create a new KPI
    router.delete("/", kpis.deleteAll);
  
    app.use('/api/kpis', router);
  };