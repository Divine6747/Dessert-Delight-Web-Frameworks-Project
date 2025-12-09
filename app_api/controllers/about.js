const mongoose = require('mongoose');
const About = mongoose.model('About');

// GET all data from the abouts collection
const aboutList = (req, res) => {
  About.find()
    .then(abouts => {
      res.status(200).json(abouts);
    })
    .catch(err => {
      res.status(500).json({ message: "Error fetching about data", error: err });
    });
};

// GET one about by ID 
const aboutReadOne = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "About ID required" });
  }
  About.findById(req.params.id)
    .then(about => {
      if (!about) return res.status(404).json({ message: "About not found" });
      res.status(200).json(about);
    })
    .catch(err => {
      res.status(500).json({ message: "Error fetching about data", error: err });
    });
};

module.exports = { 
  aboutList, 
  aboutReadOne 
};
