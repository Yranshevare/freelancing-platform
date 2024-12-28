import mongoose,{Schema} from "mongoose";

const skillSchema = new Schema({},{})

const Skill =  mongoose.models.Skill || mongoose.model('Skill', skillSchema);
export default Skill