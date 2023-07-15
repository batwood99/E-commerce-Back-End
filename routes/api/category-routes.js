const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while retrieving the categories.' });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!category) {
      res.status(404).json({ message: 'This category does not exist.' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while retrieving the category.' });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  if (!req.body.category_name) {
    res.status(400).json({ error: 'You must enter a category_name.' });
    return;
  }

  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating the category.' });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      if (result[0] === 0) {
        res.status(404).json({ message: 'This category does not exist.' });
        return;
      }
      res.status(200).json({ message: 'Category updated successfully.' });
    })
    .catch((err) => res.status(500).json({ error: 'An error occurred while updating the category.' }));
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      if (result === 0) {
        res.status(404).json({ message: 'This category does not exist.' });
        return;
      }
      res.status(200).json({ message: 'Category deleted successfully.' });
    })
    .catch((err) => res.status(500).json({ error: 'An error occurred while deleting the category.' }));
});

module.exports = router;
