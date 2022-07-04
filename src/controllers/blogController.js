import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import blogModel from '../models/blogModels';
import { fileUpload } from '../config/multer';



export const getBlogs = catchAsync(async (req, res, next) => {
  const blogs = await blogModel.find();
  res.status(200).json({
    status: 'success',
    results: blogs.length,
    data: {
      blogs
    }
  });
});

export const getBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const blog = await blogModel.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      blog
    }
  });
});

export const deleteBlog = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const blog = await blogModel.deleteOne({ _id: id });

  if (!blog) {
    return next(new AppError('No Blog found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

export const createBlog = catchAsync(async (req, res, next) => {
  
  if (req.file) {
    req.body.image = await fileUpload(req);
  } else {
    req.body.image =
    'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80';
  }
  const blog = await blogModel.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      blog
    }
  });
});

export const updateBlog = catchAsync(async (req, res, next) => {
  const blog = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!blog) {
    return next(new AppError('No Blog found with that ID', 404));
  }
  if (req.file) {
    req.body.image = await fileUpload(req);
  } else {
    req.body.image =
      'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80';
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: blog
    }
  });
});
