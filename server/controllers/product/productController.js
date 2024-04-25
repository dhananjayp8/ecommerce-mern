const categorydb = require("../../model/product/productCategoryModel");
const cloudinary = require("../../cloudinary/cloudinary");
//add category
exports.AddCategory = async (req, res) => {
  const { categoryname, description } = req.body;
  if (!categoryname || !description) {
    res.status(400).json({ error: "Fill all details" });
  }
  try {
    const existingcategory = await categorydb.findOne({
      categoryname: categoryname,
    });
    if (existingcategory) {
      res.status(400).json({ error: "This Category Already Exist" });
    } else {
      const addCategory = new categorydb({
        categoryname,
        description,
      });

      await addCategory.save();

      res.status(200).json(addCategory);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//get category

exports.GetCategory = async (req, res) => {
  try {
    const getAllcategory = await categorydb.find();
    res.status(200).json(getAllcategory);
  } catch (error) {
    res.status(400).json(error);
  }
};

//add products
