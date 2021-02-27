import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as Yup from 'yup';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';


class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required()
        })

        try {
            await schema.validate(req.body, { abortEarly: false });
        } catch (err) {
            throw new AppError(err);
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({ email })

        if (userAlreadyExists) {
            throw new AppError("User Already Exists!")
        }

        const user = usersRepository.create({
            name,
            email
        })

        await usersRepository.save(user);

        return res.status(201).json(user)
    }
}

export { UserController };

