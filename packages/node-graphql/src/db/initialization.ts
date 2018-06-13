import { User } from "./models/User";
import { UserRole } from "./enums";

export async function initialization() {
  await User.create({
    username: 'root',
    firstName: 'root',
    role: UserRole.ROOT,
    photo: 'https://www.shareicon.net/data/128x128/2017/01/06/868320_people_512x512.png'
  });
}
