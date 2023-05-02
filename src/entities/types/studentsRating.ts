import {User} from "../User/User.entity";

export interface StudnetsRatingInterface {
  id: string;
  courseCompletion: number;
  courseEngagment: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: string[];
}

export interface StudentsRatingWithEmail extends Omit<StudnetsRatingInterface, 'id'> , Pick<User, 'email'> {};