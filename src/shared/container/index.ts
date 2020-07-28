import { container } from 'tsyringe';
import IAppoitmentsRepository from '@modules/appointment/repositories/IAppointmentsRepository';
import AppoitmentsRepository from '@modules/appointment/infra/typeorm/repositories/AppointmentsRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);
