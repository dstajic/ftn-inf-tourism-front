import { KeyPoint } from "./keypoint.model";
import { User } from "../../users/model/user.model";
type TourStatus = 'u pripremi' | 'aktivna' | 'završena';

export interface Tour{

 id:number;
 name:string;
 description:string;
 dateTime:Date;
 maxGuests:number;
 status?:TourStatus;
 guide:User;
 guideID:number;
 keyPoints:KeyPoint[];
}