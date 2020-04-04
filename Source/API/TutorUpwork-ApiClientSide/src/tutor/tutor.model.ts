import { Document, Schema, Model, model, Error } from "mongoose";
import { Expose, Exclude } from "class-transformer";

class Address {
  city: Number = 0;
  district: Number = 0;
}

class Comment {
  idAuthor: String = "";
  content: String = "";
  datetime: Date = new Date();
}

export class Tutor {
  constructor(body: any) {
    this.email = body.email;
    this.id = body.id;
    this.name = body.name || "Chưa cập nhật";
    this.avatar = body.avatar || "";
  }
  id: String = Date.now().toString();
  email: String = "";
  name: String = "Chưa cập nhật";
  intro: String = "";
  price: Number = 0;
  birthday: Date = new Date();
  gender: String = "Nam";
  address: Address = new Address();
  avatar: String = "";
  comments: Array<Comment> = [];
  contract: Array<String> = [];
  star: Number = 0;
  skills: Array<String> = [];
  successRate: Number = 0;
}

export interface ITutor extends Document {
  id: String;
  email: String;
  name: String;
  intro: String;
  price: Number;
  birthday: Date;
  gender: String;
  address: Address;
  avatar: String;
  comments: Array<Comment>;
  contracts: Array<String>;
  star: Number;
  skills: Array<String>;
  successRate: Number;
}

export const tutorSchema: Schema = new Schema({
  id: {
    type: String
  },
  email: {
    type: String,
    trim: true
  },
  name: { type: String },
  intro: { type: String },
  price: { type: Number },
  birthday: { type: Date },
  gender: { type: String },
  address: { city: Number, district: Number },
  avatar: { type: String },
  comments: [{ idAuthor: String, content: String, datetime: Date }],
  contracts: [String],
  star: { type: Number },
  skills: [String],
  successRate: Number
});

export const TutorModel: Model<ITutor> = model<ITutor>("Tutor", tutorSchema);
