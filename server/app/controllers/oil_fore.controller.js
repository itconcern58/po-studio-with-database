const db = require("../models");

const frdcollection = db.frd;

// Create and Save a new KPI
exports.create = (req, res) => {
    // Validate request
      if (req.body.prod) {
   
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
      // Create a KPI
  const frd = new frdcollection ({
    timeon: 638,
    prod: 438,
    log_prod: 6.08221891,
    rec_prod: 0.002283105
  });

    // Save KPI in the database
    frd
      .save(frd)
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
  
   frdcollection.find(condition)
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
  
    frdcollection.findById(id)
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
  
    frdcollection.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
  
    frdcollection.findByIdAndRemove(id)
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
    frdcollection.deleteMany({})
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
  frdcollection.find({ published: true })
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
    /* const for_dat = new kpCollection({
       timeon: 31,
       prod: 1076,
       log_prod: 6.981005741,
       rec_prod: 0.000929368,
       yInterceptexp: 6.95962649,
       gradientexp: -0.001533,
       yIntercepthyp: 0.00084627,
       gradienthyp: 0.0000024
     
      });*/
  
    // Save KPI in the database
    /*for_dat
      .save(for_dat)
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
    const prod = req.query.prod;
    var condition = prod ? { prod: { $regex: new RegExp(prod), $options: "i" } } : {};
  
   forecollection.find(condition)
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
  
    forecollection.findById(id)
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
  
    forecollection.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
  
    forecollection.findByIdAndRemove(id)
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
    forecollection.deleteMany({})
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
  forecollection.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving kpis."
      });
    });
};*/