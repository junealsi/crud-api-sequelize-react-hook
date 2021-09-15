const db = require("../model");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// add new tutorial
exports.addTutorial = (req, res) => {
  // validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // grab data for tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // save tutorial to postgres
  Tutorial.create(tutorial)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error. Could not save the tutorial.",
      });
    });
};

// fetch(search) all tutorials by title
exports.allTutorials = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error. Could not find the tutorial",
      });
    });
};

// fetch a single tutorial with an id
exports.oneTutorial = (req, res) => {
  const { id } = req.params;

  Tutorial.findByPk(id)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: `Tutorial with id ${id} not found.`,
      });
    });
};

// fetch all published tutorials
exports.publishedTutorials = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// update a tutorial by id
exports.updateTutorial = (req, res) => {
  const { id } = req.params;

  Tutorial.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Updated successfully." });
      res.send({ message: "Fail to update. Try again!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// delete a tutorial with id
exports.deleteTutorial = (req, res) => {
  const { id } = req.params;

  Tutorial.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Deleted successfully." });
      res.send({ message: "Can not delete the tutorial. Try again!" });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// delete all tutorials
exports.deleteAllTutorials = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false,
  }).then((nums) =>
    res
      .send({ message: `${nums} tutorials has been deleted.` })
      .catch((err) => res.status(500).send({ message: err.message }))
  );
};
