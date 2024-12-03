import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
    id:{type: mongoose.Schema.Types.ObjectId},
    username: {type: String, required: true},
    password: {type:String, required:true},
    
}, {versionKey: false});

const usuarios = mongoose.model("usuarios", usuariosSchema);

export default usuarios;