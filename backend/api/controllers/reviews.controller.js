import ReviewsDao from "../../dao/reviewsDAO.js";

export default class ReviewsController {
  static async apiAddReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id;
      const review = req.body.text;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }
      const date = new Date();

      const reviewResponse = await ReviewsDao.addReview(restaurantId, userInfo, review, date);
      res.json({ status: 'success' });
    
    } catch (e) {
      res.status(500).json({ error: e.message });
    } 
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const userId = req.body.user_id
      const reviewId = req.body.review_id;
      const text = req.body.text;
      const date = new Date();

      const reviewResponse = await ReviewsDao.updateReview(reviewId, userId, text, date);
      
      if (reviewResponse.error) {
        res.status(400).json({ error });
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review"
        )
      }
      res.json({ status: 'success' });
    
    } catch (e) {
      res.status(500).json({ error: e.message });
    } 
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.query.id;
      const userId = req.body.user_id;
      const reviewResponse = await ReviewsDao.deleteReview(reviewId, userId);
      res.json({ status: 'success' });

    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}