const db = require("../models");
const st_kpicollection = db.st_kpis;

// Create and Save a new KPI
exports.create = (req, res) => {
    // Validate request
      if (req.body.company) {
   
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
      // Create a KPI
     const st_kpi = new st_kpicollection({
        company: "Company",
        asset: "Asset-1",
        field: "Field-ABAC",
        reservoir: "Res-AB",
        well: "Well-AB1",
        month: "May",
        plan_oil: 200,
        actual_oil: 193,
        plan_cumoil: 0.0209,
        actual_cumoil: 0.020,
        plan_capex: 0,
        actual_capex: 0,
        plan_opex: 0.00,
        actual_opex: 0.00,
        plan_cashflow: 0.20,
        actual_cashflow: 0.19
      });
  
    // Save KPI in the database
    st_kpi
      .save(st_kpi)
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
  
   st_kpicollection.find(condition)
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
  
    st_kpicollection.findById(id)
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
  
    st_kpicollection.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
  
    st_kpicollection.findByIdAndRemove(id)
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
    st_kpicollection.deleteMany({})
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
  st_kpicollection.find({ published: true })
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