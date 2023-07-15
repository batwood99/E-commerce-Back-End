const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while retrieving the tags.' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tag) {
      res.status(404).json({ message: 'This tag does not exist.' });
    } else {
      res.status(200).json(tag);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while retrieving the tag.' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  if (!req.body.tag_name) {
    res.status(400).json({ error: 'You must enter a tag_name.' });
    return;
  }

  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while creating the tag.' });
  }
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const [rowsAffected, updatedTag] = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );
    if (rowsAffected === 0) {
      res.status(404).json({ message: 'This tag does not exist.' });
    } else {
      res.status(200).json(updatedTag);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while updating the tag.' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({ where: { id: req.params.id } });
    if (deletedTag === 0) {
      res.status(404).json({ message: 'This tag does not exist.' });
    } else {
      res.status(200).json({ message: 'Tag deleted successfully.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while deleting the tag.' });
  }
});

module.exports = router;
