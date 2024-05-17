import courseModel from "../models/courses.js";

export default class Courses {
  constructor() {
    console.log(`Working with mongodb`);
  }

  getAll = async () => {
    return await courseModel.find().lean().populate("students");
  };

  getById = async (id) => {
    return await courseModel.findOne({ _id: id }).populate("students");
  };

  saveCourse = async (course) => {
    return await courseModel.create(course);
  };

  updateCourse = async (course) => {};
}
