import typeorm from 'typeorm';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    profilePicture: {
      type: String,
      nullable: true,
      default: null,
    },
    description: {
      type: String,
      default: '',
    },
  },
});

export default User;
