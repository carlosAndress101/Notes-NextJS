import {Note} from '@prisma/client'
import { type } from 'os';

export type CreateNote = Omit<Note, 'id' | 'createdAt' | 'updateAt'>;

export type UpdateNote = Partial<CreateNote>;