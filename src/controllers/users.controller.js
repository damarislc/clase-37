import { userService, coursesService } from "../repositories/services.js";
import MailingService from "../services/mailing.js";

const getUsers = async (req, res) => {
  let users = await userService.getAll();
  if (!users)
    return res.status(500).send({
      status: "error",
      error: "Couldn't get users due to internal error",
    });
  res.send({ status: "success", payload: users });
};

const createUser = async (req, res) => {
  let { first_name, last_name, dni, email, birthDate, gender } = req.body;
  if (!first_name || !last_name || !dni || !email || !birthDate)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  //Muy importante! La inserción actual de la fecha de nacimiento está pensada para hacerse en el formato MM - DD - YYYY. De otra forma, arrojará un error.
  let result = await userService.createUser({
    first_name,
    last_name,
    email,
    dni,
    birthDate,
    gender,
  });
  if (!result)
    return res.status(500).send({ status: "success", payload: result });
  res.send({ status: "success", payload: result });
};

const registerUserToCourse = async (req, res) => {
  //logica a implementar
  const { uid, cid } = req.params;
  const course = await coursesService.getCourseById(cid);
  //if(!course)
  const user = await userService.getBy({ _id: uid });
  //if(!user)
  const courseExist = user.courses.some((c) => c._id.toString() === cid);
  //if(courseExist) ... res 400;
  user.courses.push(course._id);
  course.students.push(user._id);

  //correo
  const mailer = new MailingService();

  const result = await mailer.sendSimpleMail({
    from: "CoderTests",
    to: user.email,
    subject: "Curso registrado",
    html: `<div><h1>¡Felicidades!</h1>
        <p> Bienvenido al curso ${course.title}. Esperamos que lo pases muy bien y aprendas mucho</p>
        </div>`,
  });

  res.send({ status: "success", message: "User added to course" });
};

export default {
  getUsers,
  createUser,
  registerUserToCourse,
};
