import mongoose,{Schema} from "mongoose";

const ProjectSchema = new Schema({},{})

const project =  mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export default project