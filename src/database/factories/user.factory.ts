import { User, UserDocument, UserSchema } from '../schemas/User.schema';
import * as bcryptjs from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';

export const UserFactory = {
  name: User.name,
  useFactory: () => {
    const schema = UserSchema;

    schema.pre<UserDocument>('save', async function () {
      this.password = await bcryptjs.hash(this.password, 8);
      this.uuid4 = uuid4();
    });

    return schema;
  },
};
