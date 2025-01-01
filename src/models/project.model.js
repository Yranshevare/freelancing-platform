import mongoose,{Schema} from "mongoose";

const ProjectSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: [{
        type: Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    ownerId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'completed'],
        default: 'pending'
    },
    
},{timeseries:true});

const project =  mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export default project