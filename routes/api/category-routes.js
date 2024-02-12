const router = require('express').Router();
const { canTreatArrayAsAnd } = require('sequelize/types/lib/utils');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    })
    res.json(categoryData)
  } catch (err) {
    res.json(err)
  }
})

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {

    const singleCatagory = await Category.findByPk(
      req.params.id, {
      include: [{ model: Product }]
    })
  } catch (err) {
    res.json(err)
  }

});

router.post('/', async (req, res) => {
  try {
    const postCatagory = await Category.create(req.body);
    res.json(postCatagory)
  } catch (err) {
    res.json(err)
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
  } catch (err) {
    res.json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
  }catch (err) {
    res.json(err);
  }
});

module.exports = router;
