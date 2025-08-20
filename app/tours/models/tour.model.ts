import { KeyPoint } from "./keypoint.model";
import { User } from "../../users/model/user.model";
export interface Tour{

 id:number;
 name:Text;
 description:number;
 DateTime:Date;
 maxGuests:number;
 status?:Text;
 guide:User;
 guideID:number;
 keyPoints:KeyPoint[];
}