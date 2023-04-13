
const getUserImage = (
db.posts.aggregate( [
    {
      $lookup:
        {
          from: "Users",
          localField: "is",
          foreignField: "userId",
          as: "userImage"
        }
   }
  ])
)