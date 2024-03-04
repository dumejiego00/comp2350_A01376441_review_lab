const router = require("express").Router();
const database = include("databaseConnection");
const dbModel = include("databaseAccessLayer");
//const dbModel = include('staticData');

router.get("/", async (req, res) => {
  console.log("page hit");

  try {
    const result = await dbModel.getAllRestaurants();
    res.render("index", { allRestaurants: result });

    //Output the results of the query to the Heroku Logs
    console.log(result);
  } catch (err) {
    res.render("error", { message: "Error reading from MySQL" });
    console.log("Error reading from mysql");
  }
});

router.get("/showReviews", async (req, res) => {
  console.log("show reviews");
  console.log(req.query);
  let restaurantId = req.query.id;
  try {
    const result = await dbModel.getReviews(restaurantId, restaurantId);
    res.render("showReviews", { allReviews: result });

    //Output the results of the query to the Heroku Logs
    console.log(result);
  } catch (err) {
    res.render("error", { message: "Error reading from MySQL" });
    console.log("Error reading from mysql");
  }
});

router.post("/addRestaurant", async (req, res) => {
  console.log("form submit");
  console.log(req.body);
  try {
    const success = await dbModel.addRestaurant(req.body);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to MySQL");
    }
  } catch (err) {
    res.render("error", { message: "Error writing to MySQL" });
    console.log("Error writing to MySQL");
    console.log(err);
  }
});

router.post("/addReview", async (req, res) => {
  console.log("form submit");
  console.log(req.body);
  try {
    const success = await dbModel.addReview(req.body, req.query.id);
    if (success) {
      res.redirect(`showReviews?id=${req.query.id}`);
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to MySQL");
    }
  } catch (err) {
    res.render("error", { message: "Error writing to MySQL" });
    console.log("Error writing to MySQL");
    console.log(err);
  }
});

router.get("/deleteRestaurant", async (req, res) => {
  console.log("delete user");
  console.log(req.query);
  let userId = req.query.id;
  if (userId) {
    const success = await dbModel.deleteRestaurant(userId);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to mysql");
      console.log(err);
    }
  }
});

router.get("/deleteReview", async (req, res) => {
  console.log("delete review");
  console.log(req.query);
  let reviewId = req.query.id;
  if (reviewId) {
    const success = await dbModel.deleteReview(reviewId);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to mysql");
      console.log(err);
    }
  }
});

module.exports = router;
