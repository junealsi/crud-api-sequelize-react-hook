module.exports = (app) => {
  const tutorial = require("../controllers/tutorial.controller");

  const router = require("express").Router();

  // add new
  router.post("/", tutorial.addTutorial);
  // all tutorials
  router.get("/", tutorial.allTutorials);
  // published tutorial
  router.get("/published", tutorial.publishedTutorials);
  // one tutorial
  router.get("/:id", tutorial.oneTutorial);
  // update
  router.put("/:id", tutorial.updateTutorial);
  // delete one tutorial
  router.delete("/:id", tutorial.deleteTutorial);
  // delete all
  router.delete("/", tutorial.deleteAllTutorials);

  app.use("/api/tutorials", router);
};
