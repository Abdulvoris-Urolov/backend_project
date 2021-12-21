const { Category, update } = require("../models/category");
const slugify = require("slugify");

function createCategory(categories, parentId = null) {
  
  const categoryList = [];
  let category;
  if(parentId == null){
    category = categories.filter(cat => cat.parentId == undefined)
  }else{
    category = categories.filter(cat => cat.parentId == parentId)
  }

  for(let cate of category){
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategory(categories, cate._id)
    });
  }
  
  return categoryList;
};

const postCategory = (req, res) => {

  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),

  };

  if(req.file){
    categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

const getCategory = (req, res) => {
    Category.find({})
    .exec((error, categories) => {
        if(error) return res.status(400).json({error})
        if(categories){
          const categoryList = createCategory(categories);
           res.status(200).json({categoryList})
        }
    });
}

const updateCategories = async (req, res) => {
  const {name, parentId, type} = req.body;
  const updateCategories = [];
  if(name instanceof Array){
    console.log(JSON.stringify(name));
    for(let i=0; i<name.length; i++){
      const category = {
        name: name[i],
        type: type[i]
      };
      if(parentId[i] !==""){
        category.parentId = parentId[i];
      }

      const updatedCategory = await  Category.findOneAndUpdate({_id: _id[i]}, category, {new: true});
      updateCategories.push(updatedCategory);
    }
    return res.status(201).json({ updatedCategories });
  }else{
    const categtory = {
      name,
      type
    };
    if(parentId !==""){
      category.parentId = parentId;
    }
    const updatedCategory = await  Category.findOneAndUpdate({_id}, category, {new: true});
    return res.status(201).json({ updatedCategory });
  }
}

module.exports = {
    postcategory: postCategory,
    getCategory: getCategory,
    updateCategories: updateCategories,
};
