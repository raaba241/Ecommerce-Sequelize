const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [Product]
    })
    res.json(tagData)
  } catch (err) {
    res.json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: { id: req.params.id },
      include: [Product]
    })

    res.json(tagData)
  } catch (err) {
    res.json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body)
    if(tagData){
      res.json({message: "Tag created"})
    } 
  } catch (err) {
    res.json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(tagData)
  } catch (err) {
    res.json(err)
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(tagData)
  }catch(err){
    res.json(err)
  }
  // delete on tag by its `id` value
});

module.exports = router;
