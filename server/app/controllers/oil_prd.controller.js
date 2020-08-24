const db = require("../models");
const prdcollection = db.prd;

// Create and Save a new KPI
exports.create = (req, res) => {
    // Validate request
      if (req.body.prod) {
   
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
      // Create a KPI
     const prd = new prdcollection({
      timeon: 1549,
      prod: null,
      log_prod: null,
      rec_prod: null,
      short_prod: 0,
      reserves_Exp: null,
      reserves_Hyp: null,
      reserves_Har: null,
      yInterceptexp: 6.95962649,
      gradientexp: -0.001533,
      yIntercepthyp: 0.0000024,
      gradienthyp: 0.00084692,
      yIntercepthar: 0.0000024,
      gradienthar: 0.00084627,
      b: 0.05
    });
  
    // Save KPI in the database
    prd
      .save(prd)
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
    const oil = req.query.prod;
    var condition = oil ? { oil: { $regex: new RegExp(oil), $options: "i" } } : {};
  
   prdcollection.find(condition)
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
  
    prdcollection.findById(id)
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
  
    prdcollection.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
  
    prdcollection.findByIdAndRemove(id)
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
    prdcollection.deleteMany({})
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
  prdcollection.find({ published: true })
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