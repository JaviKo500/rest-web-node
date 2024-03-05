import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
   PORT: get('PORT').asPortNumber(),
   PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
}