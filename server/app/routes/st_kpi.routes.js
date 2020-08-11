module.exports = app => {
    const st_kpis = require("../controllers/st_kpi.controller.js");
  
    var router = require("express").Router();
  
    // Create a new KPI
    router.post("/", st_kpis.create);
  
    // Retrieve all KPIs
    router.get("/", st_kpis.findAll);
  
    // Retrieve all published KPIs
    router.get("/published", st_kpis.findAllPublished);
  
    // Retrieve a single KPI with id
    router.get("/:id", st_kpis.findOne);
  
    // Update a KPI with id
    router.put("/:id", st_kpis.update);
  
    // Delete a KPI with id
    router.delete("/:id", st_kpis.delete);
  
    // Create a new KPI
    router.delete("/", st_kpis.deleteAll);
  
    app.use('/api/st_kpis', router);
  };