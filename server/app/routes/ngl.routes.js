module.exports = app => {
    const ngl_kpis = require("../controllers/ngl_kpi.controller.js");
  
    var router = require("express").Router();
  
    // Create a new KPI
    router.post("/", ngl_kpis.create);
  
    // Retrieve all KPIs
    router.get("/", ngl_kpis.findAll);
  
    // Retrieve all published KPIs
    router.get("/published", ngl_kpis.findAllPublished);
  
    // Retrieve a single KPI with id
    router.get("/:id", ngl_kpis.findOne);
  
    // Update a KPI with id
    router.put("/:id", ngl_kpis.update);
  
    // Delete a KPI with id
    router.delete("/:id", ngl_kpis.delete);
  
    // Create a new KPI
    router.delete("/", ngl_kpis.deleteAll);
  
    app.use('/api/ngl_kpis', router);
  };