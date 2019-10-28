import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      idade: Yup.number().required(),
      peso: Yup.number().required(),
      altura: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos dados' });
    }

    //const studentExists = await Student.findOne({ where: { name: req.body.name } });

    // if (studentExists) {
    //   return res.status(400).json({ error: 'Student already exists.' });
    // }
    const { id, name, email, idade, peso, altura } = await Student.create(req.body);
    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      idade: Yup.string().number(),
      peso: Yup.string().number(),
      altura: Yup.string().number()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, idade, peso, altura } = await Student.update(req.body);
    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
    });
  }
}

export default new StudentController();
