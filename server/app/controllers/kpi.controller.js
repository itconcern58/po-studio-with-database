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
        company: "Company",
        asset: "Asset-1",
        field: "Field-ABAC",
        reservoir: "Res-AB",
        well: "Well-AB1",
        month: "Dec",
        plan_oil: 6510,
        actual_oil: 7339,
        plan_cumoil: 2.459,
        actual_cumoil: 2.485,
        plan_capex: 6.51,
        actual_capex: 7.34,
        plan_opex: 0.13,
        actual_opex: 0.15,
        plan_cashflow: 2.45,
        actual_cashflow: 2.77
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