const posts = require('./../models/post');

const createPost = async (req, res) => {
  try {
    const postData = req.body;
    postData.dateAdded = new Date();
    await posts.create(postData);
    return res.status(201).json(true);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const options = req.body;
    const startIndex = options.pageSize * options.pageIndex;
    const length = await posts.estimatedDocumentCount();
    const postsList = await posts.find()
      .sort({ $natural: -1 })
      .skip(startIndex)
      .limit(options.pageSize);

    const result = { postsList, length };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
};

const getPostByKeywords = async (req, res) => {
  try {
    const options = req.body.paginationData;
    const startIndex = options.pageSize * options.pageIndex;
    const keyword = new RegExp(req.body.keyword);
    const postsArr = await posts.find({ title: { $regex: keyword, $options: "i" } })
      .sort({ $natural: -1 });

    const length = postsArr.length;
    const postsList = postsArr.slice(startIndex, options.pageSize + startIndex);

    const result = { postsList, length };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
}

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await posts.findOne({ _id: postId }, { __v: false });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
}

const getSimilarPosts = async (req, res) => {
  try {
    const postId = req.params.id;
    const pattern = await posts.findOne({ _id: postId }, { _id: false }).select('text title');
    const similarPosts = await posts.find(
      { $text: { $search: `${pattern.title} ${pattern.text}` } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } })
      .skip(1)
      .limit(3);
    return res.status(200).json(similarPosts);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
}

const editPost = async (req, res) => {
  try {
    const { userId, title, text, _id } = req.body;
    const dateAdded = new Date();
    const updatedPost = await posts.findOneAndUpdate({ userId: userId, _id: _id }, { title, text, dateAdded }, { new: true });
    res.status(201).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.body.id;
    await posts.findOneAndDelete({ _id: id });
    return res.status(200).json(true);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
};

const test = async (req, res) => {
  try {
    res.status(200).json('Working!')
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong. Please try again later' });
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostByKeywords,
  getPostById,
  editPost,
  deletePost,
  getSimilarPosts,
  test
}