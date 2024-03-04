const database = include("/databaseConnection");

async function getAllRestaurants() {
  let sqlQuery = `
		SELECT restaurant_id, name, description
		FROM restaurant;
	`;

  try {
    const results = await database.query(sqlQuery);
    console.log(results[0]);
    return results[0];
  } catch (err) {
    console.log("Error selecting from restaurant table");
    console.log(err);
    return null;
  }
}

async function getReviews(restaurantId) {
  let sqlQuery = `
		SELECT review_id, details, reviewer_name, rating
		FROM review
    WHERE restaurant_id = ${restaurantId}
	`;

  try {
    const results = await database.query(sqlQuery);
    console.log(results[0]);
    return results[0];
  } catch (err) {
    console.log("Error selecting from review table");
    console.log(err);
    return null;
  }
}

const passwordPepper = "SeCretPeppa4MySal+";
async function addRestaurant(postData) {
  let sqlInsertSalt = `
INSERT INTO restaurant (name, description,  password_salt)
VALUES (:name, :description, sha2(UUID(),512));
`;
  let params = {
    name: postData.name,
    description: postData.description,
  };
  console.log(sqlInsertSalt);
  try {
    const results = await database.query(sqlInsertSalt, params);
    let insertedID = results.insertId;
    let updatePasswordHash = `
UPDATE restaurant
SET password_hash = sha2(concat(:password,:pepper,password_salt),512)
WHERE restaurant_id = :userId;
`;
    let params2 = {
      password: postData.password,
      pepper: passwordPepper,
      userId: insertedID,
    };
    console.log(updatePasswordHash);
    const results2 = await database.query(updatePasswordHash, params2);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function addReview(postData, restaurantId) {
  let sqlInsertSalt = `
INSERT INTO review (restaurant_id, reviewer_name, details,  rating, password_salt)
VALUES (:restaurant_id, :reviewer_name, :details, :rating, sha2(UUID(),512));
`;
  let params = {
    restaurant_id: restaurantId,
    reviewer_name: postData.name,
    details: postData.details,
    rating: postData.rating,
  };
  console.log(sqlInsertSalt);
  try {
    const results = await database.query(sqlInsertSalt, params);
    let insertedID = results.insertId;
    let updatePasswordHash = `
UPDATE restaurant
SET password_hash = sha2(concat(:password,:pepper,password_salt),512)
WHERE restaurant_id = :userId;
`;
    let params2 = {
      password: postData.password,
      pepper: passwordPepper,
      userId: insertedID,
    };
    console.log(updatePasswordHash);
    const results2 = await database.query(updatePasswordHash, params2);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function deleteRestaurant(webUserId) {
  let sqlDeleteRestaurant = `
   DELETE FROM restaurant
   WHERE restaurant_id = :userID
   `;
  let params = {
    userID: webUserId,
  };
  console.log(sqlDeleteRestaurant);
  try {
    await database.query(sqlDeleteRestaurant, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
async function deleteReview(webUserId) {
  let sqlDeleteRestaurant = `
   DELETE FROM review
   WHERE review_id = :userID
   `;
  let params = {
    userID: webUserId,
  };
  console.log(sqlDeleteRestaurant);
  try {
    await database.query(sqlDeleteRestaurant, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  getAllRestaurants,
  addRestaurant,
  deleteRestaurant,
  getReviews,
  addReview,
  deleteReview
};
