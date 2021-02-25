import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveysController {

    async create(req: Request, res: Response) {
        const { title, description } = req.body;

        const surverysRepository = getCustomRepository(SurveysRepository)

        const survery = surverysRepository.create({
            title, description
        })

        await surverysRepository.save(survery)

        return res.status(201).json(survery)
    }

    async show(req: Request, res: Response) {
        const surverysRepository = getCustomRepository(SurveysRepository)

        const all = await surverysRepository.find();

        return res.json(all);

    }
}

export { SurveysController };

