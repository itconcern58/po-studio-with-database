const db = require("../models");
const kpicollection = db.kpis;

// Create and Save a new KPI
exports.create = (req, res) => {
    // Validate request
      if (req.body.company) {
   
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
      // Create a KPI
     const kpi = new kpicollection({
        company: "EO",
        asset: "South",
        field: "MX",
        reservoir: "MXC",
        well: "RES-MXC",
        month: "Apr",
        plan_oil: 11938.68225,
        actual_oil: 9880,
        plan_cumoil: 1146745.83,
        actual_cumoil: 1111900,
        plan_capex: 119.3868225,
        actual_capex: 98.8,
        plan_opex: 114.674583,
        actual_opex: 111.19,
        plan_cashflow: 15883.15964,
        actual_cashflow: 13128.01,
        plan_st_oil: 0,
        actual_st_oil: 0,
        plan_st_cumoil: 0,
        actual_st_cumoil: 0,
        plan_st_capex: 0,
        actual_st_capex: 0,
        plan_st_opex: 0,
        actual_st_opex: 0,
        plan_st_cashflow: 0,
        actual_st_casflow: 0,
        plan_ngl: 0,
        actual_ngl: 0,
        plan_cumngl: 0,
        actual_cumngl: 0,
        plan_ngl_capex: 0,
        actual_ngl_capex: 0,
        plan_ngl_opex: 0,
        actual_ngl_opex: 0,
        plan_ngl_cashflow: 0,
        actual_ngl_casflow: 0,
        plan_gas: 9550.945802,
        actual_gas: 7904,
        plan_cumgas: 917396.6642,
        actual_cumgas: 889520,
        plan_gas_capex: 305.7988881,
        actual_gas_capex: 296.5066667,
        plan_gas_opex: 91.73966642,
        actual_gas_opex: 88.952,
        plan_gas_cashflow: 1850.083273,
        actual_gas_casflow: 1793.865333,
        timeon: 120,
        Days: 30,
        ln_timeon_LT: 4.787491743,
        ln_oil: 9.198267791,
        Slope_LT: null,
        Intercept_LT: null,
        ln_st_oil: null,
        Slope_ST: null,
        InterceptS_ST: null,
        ln_ngl: null,
        Slope_NGL: null,
        Intercept_NGL: null,
        LN_Gas: 8.975124239,
        slope_GAS: null,
        intercept_GAS: null,
        rec_prod: 0.000101215,
        rec_timeon: 0.008333333,
        ln_rec_prod: -9.198267791,
        ln_rec_timeon: -4.787491743   
});
  
    // Save KPI in the database
    kpi
      .save(kpi)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the KPI."
        });
      });
  };
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const company = req.query.company;
    var condition = company ? { company: { $regex: new RegExp(company), $options: "i" } } : {};
  
   kpicollection.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving kpis."
        });
      });
  }

// Find a single KPI with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    kpicollection.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found KPI with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving KPI with id=" + id });
      });
  };

// Update a KPI by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    kpicollection.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update KPI with id=${id}. Maybe KPI was not found!`
          });
        } else res.send({ message: "KPI was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating KPI with id=" + id
        });
      });
  };

// Delete a KPI with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    kpicollection.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete KPI with id=${id}. Maybe KPI was not found!`
          });
        } else {
          res.send({
            message: "KPI was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete KPI with id=" + id
        });
      });
  };

// Delete all KPIs from the database.
exports.deleteAll = (req, res) => {
    kpicollection.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} KPIs were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all kpis."
        });
      });
  };

// Find all published KPIs
exports.findAllPublished = (req, res) => {
  kpicollection.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving kpis."
      });
    });
};