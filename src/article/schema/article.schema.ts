import mongoose from 'mongoose';
const { Schema } = mongoose;

enum SnsType {
  Facebook = 'facebook',
  Twitter = 'twitter',
  instagram = 'instagram',
  Threads = 'threads',
}

const articleSchema = new Schema(
  {
    contentId: Schema.Types.UUID,
    type: SnsType,
    title: String,
    hashtags: [String],
    viewCount: Number,
    likeCount: Number,
    shareCount: Number,
  },
  {
    timestamps: {
      createdAt: 'createdAt', //'createAt' 필드
      updatedAt: 'updatedAt', //'updateAt' 필드
    },
  },
);