const redis = require("redis");
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

const pagination = (model) => async (req, res, next) => {
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 3;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Executing query
  const results = await model.findAndCountAll({
    limit: limit,
    offset: startIndex,
  });

  // Pagination result
  const pagination = {};

  if (endIndex < results.count) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    pagination,
    data: results,
    limit,
  };
  next();
};

module.exports = pagination;
